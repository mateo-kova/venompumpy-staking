import GraButton from "@/components/common/Buttons";
import { useState} from "react";
import Head from "next/head";

const LockYZ = () => {
  const [stakeAmount, setstakeAmount] = useState<string>("");
  const [yzBalance, setyzBalance] = useState<string>("0");
  const handleChange = (event) => {
    const val = event.target.value;
    setstakeAmount(val);
  };

  const onStake = async () => {
  };
  return (
    <>
      <Head>
        <title>STAKE VPUMPY</title>
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
              <img
                className="z-[-9999] mx-7 max-[460px]:m-auto rounded-full"
                src="./icon/vpumpylogo.jpg"
                alt="slider pannel"
                width={60}
                height={36.38}
              />
              <h4 className="my-auto">{yzBalance} VP</h4>
            </div>
            <div className="min-[658px]:flex min-[658px]:justify-between max-[666px]:grid-col-3 align-middle py-[25px] border-[1px] rounded-xl bg-white/5  border-white/10 m-3 max-md:w-[100%] max-md:mx-0">
              <div className="col-span-1 min-[460px]:flex flex-row items-center justify-center content-center max-[658px]:mb-7">
                <img
                  className="z-[-9999] mx-7 max-[460px]:m-auto rounded-full"
                  src="./icon/vpumpylogo.jpg"
                  alt="slider pannel"
                  width={40}
                  height={36.38}
                />
                <div className="flex max-[460px]:m-auto max-[460px]:justify-center ">
                  <h2 className="text-white mr-3 text-[20px] my-auto uppercase font-bold text-center leading-3">
                    VP
                  </h2>
                  <input
                    type="number"
                    className="w-[150px] rounded-md text-[#47fd80]  border-[1px] border-white/30 px-3 text-center text-[20px] my-auto uppercase font-bold leading-3 bg-[rgba(0,0,0,0)] mr-5"
                    value={stakeAmount}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
              </div>

            </div>

            <div className="flex justify-center my-2 max-md:mb-[20px]">
              <GraButton
                className="w-[184px] h-[50px] font-semibold text-[22px]"
                onClick={onStake}
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
