import React, { useState, useEffect } from "react";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import {
  avtar,
  avtar2,
  avtar3,
  mapIcon,
  PhoneFillWhite,
  PhoneIcons,
} from "../../assets/image";
import { MapIcon } from "lucide-react";
import GiveRating from "../../modals/GiveRating";
import { businessUserDetails } from "../../apis/business/Profile";
import { useLocation } from "react-router-dom";
import moment from "moment";

const UserReviewDetails = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUserDetail = async () => {
    const apiData = {
      userId: id,
    };
    try {
      const res = await businessUserDetails(apiData);
      setUserDetails(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserDetail();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />

        <section className="py-28 bg-[#F7F7F7] px-6">
          <div className="container mx-auto mt-14">

            <div className="grid grid-cols-2 gap-5">
              <div className="md:col-span-1 col-span-2 notranslate">
                <div className="my_pro bg-white shadow-md rounded-xl p-5 mb-5  hover:shadow-lg">
                  <div className="pro_img size-32 rounded-full overflow-hidden mx-auto mt-5">
                    <img
                      className="w-full h-full"
                      src={userDetails?.imagePath}
                      alt=""
                    />
                  </div>
                  <div className="pro_hd text-center">
                    <h3 className="font-bold text-xl mt-2 text-gray-800">
                      {userDetails?.fullName}
                    </h3>
                    <h3 className="font-semibold text-sm mt-2 text-gray-800">
                      {userDetails?.email}
                    </h3>
                    {/* <p className="text-main_gray text-sm">{userDetails?.email}</p> */}
                  </div>
                </div>

                <div className="my_pro bg-white shadow-md rounded-xl p-5 mb-5  hover:shadow-lg flex justify-between">
                  <div className="flex items-center">
                    <span>
                      <img src={PhoneIcons} alt="" />
                    </span>
                    {userDetails?.contactNumber}
                  </div>
                  <div className="bg-[#303030] h-[1.75rem] w-[1.75rem] flex items-center justify-center rounded-md">
                    <img src={PhoneFillWhite} alt="" />
                  </div>
                </div>

                <div className="my_pro bg-white shadow-md rounded-xl p-5 hover:shadow-lg relative">
                  <div className="flex items-start gap-2">
                    <div className="w-[5.125rem] h-[5.125rem] rounded-md overflow-hidden shrink-0">
                      <img
                        src={mapIcon}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="lg:flex block  items-end gap-4 w-full justify-between">
                      <div >
                        <p className="font-semibold text-lg">
                          {userDetails?.address1}
                        </p>
                        <p className="text-sm text-gray-600">
                          {userDetails?.address2}
                        </p>
                        <p className="text-sm text-gray-600">
                          {userDetails?.city}, {userDetails?.state}
                        </p>
                      </div>
                      <button className="bg-[#303030] py-2 px-3 text-white text-sm font-semibold rounded-md shrink-0 mt-3 lg:mt-0">
                        View on Map
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="md:col-span-1 col-span-2">
                <div className="crd bg-white p-4 rounded-xl shadow-md mb-4">
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-dark_link">
                        Rating & Review
                      </h2>
                      {/* <p className="underline text-xs">23 Review</p> */}
                    </div>
                    <button
                      className="bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium items-center"
                      onClick={openModal}
                    >
                      {" "}
                      Give Rating{" "}
                    </button>
                  </div>
                  {userDetails?.reviewlist?.map((user) => (
                    <div className="">
                      <div className="bg-[#F7F7F7] p-3 rounded-md mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-[3rem] w-[3rem] rounded-full bg-gray-200 overflow-hidden">
                              <img
                                src={user?.reviewedToImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold">
                                {user?.reviewedToFullName}
                              </h2>
                              <p className="text-gray-500">
                                {user?.reviewedByState},{" "}
                                {user?.reviewedByCountry}
                              </p>
                            </div>
                          </div>
                          <button className="w-[2.125rem] h-[2.125rem] rounded-md bg-white flex items-center justify-center text-white">
                            <svg
                              width="19"
                              height="17"
                              viewBox="0 0 19 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.8182 0.5C12.0045 0.5 10.4275 1.30585 9.5 2.65631C8.57245 1.30585 6.99545 0.5 5.18182 0.5C3.80801 0.501576 2.49092 1.04 1.51949 1.99717C0.548054 2.95433 0.00159998 4.25208 0 5.60571C0 8.09049 1.57182 10.6765 4.67227 13.2907C6.093 14.4835 7.62765 15.5379 9.25473 16.4392C9.33013 16.4791 9.4144 16.5 9.5 16.5C9.5856 16.5 9.66987 16.4791 9.74527 16.4392C11.3724 15.5379 12.907 14.4835 14.3277 13.2907C17.4282 10.6765 19 8.09049 19 5.60571C18.9984 4.25208 18.4519 2.95433 17.4805 1.99717C16.5091 1.04 15.192 0.501576 13.8182 0.5ZM9.5 15.401C8.08277 14.5952 1.03636 10.3472 1.03636 5.60571C1.03751 4.52276 1.47463 3.48449 2.2518 2.71873C3.02898 1.95297 4.08273 1.52227 5.18182 1.52114C6.93327 1.52114 8.40405 2.44272 9.02068 3.92678C9.05972 4.02043 9.12613 4.10052 9.21148 4.15689C9.29683 4.21326 9.39725 4.24335 9.5 4.24335C9.60275 4.24335 9.70317 4.21326 9.78852 4.15689C9.87387 4.10052 9.94028 4.02043 9.97932 3.92678C10.596 2.44272 12.0667 1.52114 13.8182 1.52114C14.9173 1.52227 15.971 1.95297 16.7482 2.71873C17.5254 3.48449 17.9625 4.52276 17.9636 5.60571C17.9636 10.3472 10.9172 14.5952 9.5 15.401Z"
                                fill="#303030"
                                fill-opacity="0.7"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="border-t pt-4 ">
                          <div className="flex items-center justify-between mb-2">
                            <h1 className="font-semibold text-sm"></h1>
                           
                          </div>
                          <div
                            className={`w-[2.125rem] h-[2.125rem] rounded-md flex items-center justify-center text-white 
                          ${user?.rate >= 1 && user?.rate <= 3
                                ? "bg-red-500"
                                : user?.rate >= 4 && user?.rate <= 6
                                  ? "bg-yellow-500"
                                  : user?.rate >= 7 && user?.rate <= 8
                                    ? "bg-blue-500"
                                    : user?.rate >= 9 && user?.rate <= 10
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                              }`}
                          >
                            {user?.rate}
                          </div>

                          <div className="flex items-center text-sm text-gray-600 my-2 gap-2">
                            <span>
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.3242 1.01562H10.1562V0.40625C10.1562 0.181898 9.97438 0 9.75 0C9.52562 0 9.34375 0.181898 9.34375 0.40625V1.01562H3.65625V0.40625C3.65625 0.181898 3.47438 0 3.25 0C3.02562 0 2.84375 0.181898 2.84375 0.40625V1.01562H1.67578C0.75174 1.01562 0 1.76737 0 2.69141V11.3242C0 12.2483 0.75174 13 1.67578 13H11.3242C12.2483 13 13 12.2483 13 11.3242V2.69141C13 1.76737 12.2483 1.01562 11.3242 1.01562ZM1.67578 1.82812H2.84375V2.23438C2.84375 2.45873 3.02562 2.64062 3.25 2.64062C3.47438 2.64062 3.65625 2.45873 3.65625 2.23438V1.82812H9.34375V2.23438C9.34375 2.45873 9.52562 2.64062 9.75 2.64062C9.97438 2.64062 10.1562 2.45873 10.1562 2.23438V1.82812H11.3242C11.8002 1.82812 12.1875 2.21538 12.1875 2.69141V3.65625H0.8125V2.69141C0.8125 2.21538 1.19976 1.82812 1.67578 1.82812ZM11.3242 12.1875H1.67578C1.19976 12.1875 0.8125 11.8002 0.8125 11.3242V4.46875H12.1875V11.3242C12.1875 11.8002 11.8002 12.1875 11.3242 12.1875Z"
                                  fill="#303030"
                                />
                              </svg>
                            </span>
                            <p className="text-gray-600 font-medium text-xs">
                              {" "}
                              {moment(user?.reviewedOn).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              {/* {moment(user?.reviewedOn).format("hh:mm A")} */}
                            </p>
                          </div>
                          <p className="text-gray-600 text-xs break-words	">
                            {user?.reviewDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        <Footer_two />
      </div>
      <GiveRating isOpen={isOpen} closeModal={closeModal} id={id} />
    </>
  );
};

export default UserReviewDetails;
