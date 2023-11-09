import GraButton from "@/components/common/Buttons";
import Image from "next/image";
import { useState, useEffect } from "react";
import Myoption from "../../components/ui/optionbar";

import { toast } from "react-toastify";
import { API_URL, BYIELDZ_ADDRESS } from "@/config";
import { ethers } from "ethers";
import { useWeb3Context } from "@/context/Web3Context";
import axios from "axios";
import Head from "next/head";

const myround = (amount: string) => {
  //in: String
  const samount =
    Math.round((parseFloat(amount) + Number.EPSILON) * 10000) / 10000;
  return samount.toString(); //out: string 100.0020030442 -> 100.002
};
const LockYZ = () => {
  const [selected, setSelected] = useState<string>("40 Days");
  const [point, setPoint] = useState<boolean>(false);
  const [stakeAmount, setstakeAmount] = useState<string>("");
  const [yzBalance, setyzBalance] = useState<string>("0");
  const {
    provider,
    web3Provider,
    address,
    network,
    yzContract,
    byzContract,
    sContract,
  } = useWeb3Context();

  const handleChange = (event) => {
    const val = event.target.value;
    setstakeAmount(val);
  };

  useEffect(() => {
    if (web3Provider) {
      getBalance();
    }
  }, [web3Provider]);

  const getBalance = async () => {
    const yzBalance = ethers.utils.formatUnits(
      await yzContract.balanceOf(address)
    );
    setyzBalance(yzBalance.toString());
  };

  const onStake = async () => {
    console.log("on stake");
    if (parseFloat(stakeAmount) <= 0 || stakeAmount == "") {
      toast.error("Enter the correct stake amount !");
      return;
    }
    const sAmount = ethers.utils.parseEther(stakeAmount);
    const stakeApprove = await yzContract.approve(BYIELDZ_ADDRESS, sAmount);
    const [lockPeriod, rate] = selected == "40 Days" ? [40, 12] : [20, 11];
    // const rate = selected == "40 Days" ? 12: 11;

    try {
      const stake = await byzContract.stake(sAmount, lockPeriod);
      await stake.wait();
      byzContract.on("Stake", (sender, amount, lockPeriod, timestamp) => {
        const stakeData = {
          address: sender,
          amount: amount.toString(),
          stakeTime: timestamp.toString(),
          rate: rate,
          lockTime: parseInt(lockPeriod) * 24 * 60 * 60 + parseInt(timestamp),
        };
        console.log(stakeData);
        axios
          .post(`${API_URL}yieldz/stakeyz`, stakeData)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
        toast.success("Success Staking!");
        getBalance();
        setstakeAmount("");
        setyzBalance((parseInt(yzBalance) - parseInt(stakeAmount)).toFixed(5));
      });
    } catch (error) {
      console.log(error);
    }

    // console.log(stake)
  };
  return (
    <>
      <Head>
        <title>STAKE VPUMPY TOKEN</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex justify-center w-[100%] mt-[55px] pb-[40px]">
        <div className="flex justify-center align-middle border-[1px] bg-[#1C1C1C]/[.6]  border-white/10 backdrop-blur-md rounded-2xl w-[100%] pb-[20px] max-w-[1060px]">
          <div className="py-[15px] px-[30px] ">
            {/* Page title */}
            <h2 className="text-white text-[32px] font-bold px-3 text-center mb-10">STAKE VPUMPY TOKEN</h2>
            <div className="flex justify-center font-bold text-[28px]">
              <Image
                className="z-[-9999] mx-7 max-[460px]:m-auto"
                src="./icon/yieldz_small.svg"
                alt="slider pannel"
                width={60}
                height={36.38}
              />
              <h4 className="my-auto">{yzBalance} VM</h4>
            </div>
            <div className="min-[658px]:flex min-[658px]:justify-between max-[666px]:grid-col-3 align-middle py-[25px] border-[1px] rounded-xl bg-white/5  border-white/10 m-3 max-md:w-[100%] max-md:mx-0">
              <div className="col-span-1 min-[460px]:flex flex-row items-center justify-center content-center max-[658px]:mb-7">
                <Image
                  className="z-[-9999] mx-7 max-[460px]:m-auto"
                  src="./icon/yieldz_small.svg"
                  alt="slider pannel"
                  width={40}
                  height={36.38}
                />
                <div className="flex max-[460px]:m-auto max-[460px]:justify-center ">
                  <h2 className="text-white mr-3 text-[20px] my-auto uppercase font-bold text-center leading-3">
                    VM
                  </h2>
                  <input
                    type="number"
                    className="w-[150px] rounded-md text-[#47fd80]  border-[1px] border-white/30 px-3 text-center text-[20px] my-auto uppercase font-bold leading-3 bg-[rgba(0,0,0,0)] mr-5"
                    value={stakeAmount}
                    onChange={(e) => handleChange(e)}
                    disabled={!web3Provider}
                  ></input>
                </div>
              </div>

            </div>

            <div className="flex justify-center my-2 max-md:mb-[20px]">
              <GraButton
                className="w-[184px] h-[50px] font-semibold text-[22px]"
                onClick={onStake}
                disabled={!web3Provider}
              >
                Stake now
              </GraButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockYZ;
