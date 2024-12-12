import React, { useState, useEffect } from "react";
import Footer_two from "../layout/Footer_two";
import { Link } from "react-router-dom";
import Header_two from "../layout/Header_two";
import { DoubleArrow } from "../../assets/image";
import { useNavigate } from "react-router-dom";
import { businessUserSubscription,businessSubscriptionList } from "../../apis/business/Profile";
import { useSelector } from "react-redux";

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const { purchaseToken } = useSelector((state) => state?.authSlice?.user)
  const [activeTab, setActiveTab] = useState("Bronze");
  const [planList, setPlanList] = useState([])
 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleNavigate = () => {
    navigate("/business-home");
  };

 
  const handleBusinessSubscription = async() => {
    try {
      const res = await businessSubscriptionList();
      setPlanList(res.data.data)

      } catch (error) {
      console.log(error)
    }
  }

  const handleUserSubscription = async (planType) => {
    try {
      const apiData = {
        IsSubscribed: true,
        SubscriptionPlan: planType,
        PurchaseToken: purchaseToken
      }
      const res = await businessUserSubscription(apiData)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    handleBusinessSubscription()
  },[]);

  return (
    <>
      <Header_two />
      <section className="py-32">
        
        <div className="container mx-auto">
          <h1 className="text-3xl text-center font-semibold pt-4 pb-3">
            Subscription
          </h1>
          <p className="text-center text-lg pb-10">
            Please Choose any Subscription plan
          </p>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div
                onClick={handleNavigate}
                className="border border-gray-300 rounded-xl p-6"
              >
                <span className="text-md font-medium text-[#797979]">
                  Bronze
                </span>
                <h4 className="text-2xl font-semibold text-gray my-3">Free</h4>
                <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                  7 Day free trial
                </span>

                <hr className="my-4" />

                <div className="flex flex-col gap-4 h-36">
                  <p className="flex items-start mb-0 gap-3">
                    <span className="text-gray text-lg ">
                      For customers and workers, Profile making
                    </span>
                  </p>
                </div>

                <div className="mt-5">
                  <button className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-xl p-6">
                <span className="text-md font-medium text-[#797979]">
                  Silver
                </span>
                <h4 className="text-2xl font-semibold text-gray my-3">
                  $490.00
                </h4>
                <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                  Only 4 Leads a Month
                </span>
                <hr className="my-4" />

                <div className="flex flex-col gap-4 h-36">
                  <p className="flex 
                  items-start mb-0 gap-3">
                    <span className="text-gray text-lg ">
                      Workers will get access to communicating with customers
                      and scheduling
                    </span>
                  </p>
                </div>
                <div className="mt-5">
                  <button onClick={() => handleUserSubscription('silver_plan')} className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-xl p-6">
                <span className="text-md font-medium text-[#797979]">Gold</span>
                <h4 className="text-2xl font-semibold text-gray my-3">
                  $990.00
                </h4>
                <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                  Only 6 Leads a Month
                </span>

                <hr className="my-4" />

                <div className="flex flex-col gap-4 h-36">
                  <p className="flex items-start mb-0 gap-3">
                    <span className="text-gray text-lg ">
                      Workers will gold access to messaging, scheduling,
                      contruct signing
                    </span>
                  </p>
                </div>

                <div className="mt-5">
                  <button onClick={() => handleUserSubscription('gold_plan')} className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-xl p-6">
                <span className="text-md font-medium text-[#797979]">
                  Platinum
                </span>
                <h4 className="text-2xl font-semibold text-gray my-3">
                  $1,950.00
                </h4>
                <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                  Unumited leads
                </span>

                <hr className="my-4" />

                <div className="flex flex-col gap-4 h-36">
                  <p className="flex items-start mb-0 gap-3">
                    <span className="text-gray text-lg ">
                      Workers will be able to ga n all access. Messaging,
                      scheduling, contract sigring, Estimating and invoicing,
                      requesting and CCOI• ng payments, Mt age.
                    </span>
                  </p>
                </div>

                <div className="mt-5">
                  <button onClick={() => handleUserSubscription('platinum_plan')} className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-span-3">
              <div className=" tab-bar-2 ms-auto justify-center items-center !border-0 transition-all flex">
                <button className={
                    activeTab === "Bronze"
                      ? "active !rounded-none !w-fit !px-7 !text-lg"
                      : " !rounded-none !w-fit !px-7 !text-lg"
                  }
                  onClick={() => handleTabClick("Bronze")}
                >
                  {" "}
                  Bronze{" "}
                </button>

                <button className={
                    activeTab === "Gold"
                      ? "active !rounded-none !w-fit !px-7 !text-lg"
                      : " !rounded-none !w-fit !px-7 !text-lg"
                  }
                  onClick={() => handleTabClick("Gold")}
                >
                  Gold
                </button>

                <button
                  className={
                    activeTab === "Platinum"
                      ? "active !rounded-none !w-fit !px-7 !text-lg"
                      : " !rounded-none !w-fit !px-7 !text-lg"
                  }
                  onClick={() => handleTabClick("Platinum")}
                >
                  Platinum
                </button>
              </div>
            </div> */}

          {/* <div className="tab-content py-5 transition-all col-span-3">
              {activeTab === "Bronze" && (
                <>
                  <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-4">
                    <div className="border border-gray-300 rounded-xl p-6">
                      <span className="text-md font-medium text-[#797979]">
                        Monthly
                      </span>
                      <h4 className="text-2xl font-semibold text-gray my-3">
                        $17,99/month
                      </h4>
                      <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                        1 week free trial
                      </span>

                      <div className="pt-5">
                        <p className="text-[#797979] text-lg mb-1">
                          then $17.99 per month
                        </p>
                        <p className="text-[#797979] text-lg mb-0">
                          Cancel anytime .Everywhere
                        </p>
                      </div>
                      <hr className="my-4" />

                      <div className="flex flex-col gap-4">
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet , adipisicing elit. Optio
                            dolor assumenda
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, elit. Optio
                            dolor assumenda et excepturi id
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Optio{" "}
                          </span>
                        </p>
                      </div>

                      <div className="mt-5">
                        <button className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="border border-gray-300 rounded-xl p-6">
                      <span className="text-md font-medium text-[#797979]">
                        Monthly
                      </span>
                      <h4 className="text-2xl font-semibold text-gray my-3">
                        $17,99/month
                      </h4>
                      <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                        1 week free trial
                      </span>

                      <div className="pt-5">
                        <p className="text-[#797979] text-lg mb-1">
                          then $17.99 per month
                        </p>
                        <p className="text-[#797979] text-lg mb-0">
                          Cancel anytime .Everywhere
                        </p>
                      </div>
                      <hr className="my-4" />

                      <div className="flex flex-col gap-4">
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet , adipisicing elit. Optio
                            dolor assumenda
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, elit. Optio
                            dolor assumenda et excepturi id
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Optio{" "}
                          </span>
                        </p>
                      </div>

                      <div className="mt-5">
                        <button className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="border border-gray-300 rounded-xl p-6">
                      <span className="text-md font-medium text-[#797979]">
                        Monthly
                      </span>
                      <h4 className="text-2xl font-semibold text-gray my-3">
                        $17,99/month
                      </h4>
                      <span className="bg-[#EDEDED] py-2 px-3 rounded-full text-sm text-medium text-[#797979]">
                        1 week free trial
                      </span>

                      <div className="pt-5">
                        <p className="text-[#797979] text-lg mb-1">
                          then $17.99 per month
                        </p>
                        <p className="text-[#797979] text-lg mb-0">
                          Cancel anytime .Everywhere
                        </p>
                      </div>
                      <hr className="my-4" />

                      <div className="flex flex-col gap-4">
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet , adipisicing elit. Optio
                            dolor assumenda
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, elit. Optio
                            dolor assumenda et excepturi id
                          </span>
                        </p>
                        <p className="flex items-start mb-0 gap-3">
                          <img src={DoubleArrow} alt="" />
                          <span className="text-gray text-lg ">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Optio{" "}
                          </span>
                        </p>
                      </div>

                      <div className="mt-5">
                        <button className="border border-[#303030] bg-white text-[#303030] py-3 px-3 w-full rounded-lg font-semibold">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                </>
              )}

              {activeTab === "Gold" && <>
                Gold
              </>}
              {activeTab === "Platinum" && <>
                Platinum
              </>}
            </div> */}
        </div>
      </section>
      <Footer_two></Footer_two>
    </>
  );
};

export default SubscriptionPlan;
