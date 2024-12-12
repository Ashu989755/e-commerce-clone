import React, { useState, useEffect, useRef } from "react";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import {
  avtar4,
  CalendarOutline,
  CallFill,
  CLockFill,
  LocationFill,
} from "../../assets/image";
import { businessMarketPlace } from "../../apis/business/Profile";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { businessAddAvailabilityStatus } from "../../apis/business/Profile";
import { customerProfile } from "../../apis/customer/profile";
import { businessAcceptRejectStatus } from "../../apis/business/Profile";
import moment from "moment-timezone";
import Reject_Booking from "../../modals/Reject_Booking";
import { toast } from "react-toastify";
import RejectJob_Request from "../../modals/RejectJob_Request";
import Estimates from "../../modals/Estimates";

const MarketPlace = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Hourly");
  const [loading, setLoading] = useState(false);
  const [marketPlace, setMarketPlace] = useState([]);

  const [available, setAvailable] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [userId, setSelectedUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  console.log(userDetails, "============");

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setIsOpen3(true);
  };
  const closeModal = () => setIsOpen3(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUserProfile = async () => {
    setLoading(true);
    try {
      const res = await customerProfile();
      setLoading(false);
      // if (res?.data?.isAvailable !== undefined) {

      setAvailable(res.data.data.isAvailable ? true : false);

      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleMarketPlaceData = async () => {
    setLoading(true);
    try {
      const res = await businessMarketPlace();
      setMarketPlace(res?.data?.data);
      setUserDetails(res?.data?.data[0]);
    } catch (error) {
      console.log(error, "error:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMarketPlaceData();
  }, []);

  const handleToggle = (e) => {
    setAvailable(e.target.checked);
    handleAddAvailabilityStatus(e.target.checked);
  };

  const handleAddAvailabilityStatus = async (status) => {
    try {
      const apiData = { isAvailable: status };
      await businessAddAvailabilityStatus(apiData);
      handleUserProfile();
      handleMarketPlaceData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/job-details/${id}`);
  };

  const handleAccept = async (id) => {
    try {
      const apiData = {
        bookingId: id,
        status: 2,
        utcDateTime: new Date().toISOString(),
      };

      console.log(apiData);
      const res = await businessAcceptRejectStatus(apiData);
      toast.success(res?.data?.message);
      navigate("/business-home");
    } catch (error) {
      console.log(error, "=========");
    }
  };

  const handleNavigateToEstimates = () => {
    navigate("/send-estimates", { state: userDetails });
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const [Extimates, setExtimates] = useState(false);
  const openExtimates = () => {
    setExtimates(true);
  };
  const closeExtimates = () => {
    setExtimates(false);
  };


  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="pt-10 flex  gap-3 ">
              <h1 className="text-2xl font-bold">Market Place</h1>
              <label className="inline-flex cursor-pointer mt-1 ">
                <input
                  type="checkbox"
                  // value=""
                  className="sr-only peer"
                  checked={available}
                  onChange={handleToggle}
                />
                <div
                  className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 
                 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                   after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
                    after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"
                ></div>
                <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {available ? "Online" : "Offline"}
                </span>
              </label>

              {/* Conditionally show the tabs if hourlyPrice is not null */}
              {Array.isArray(marketPlace) &&
                marketPlace.some((item) => item.hourlyPrice !== null) && (
                  <div className="tab-bar ms-auto justify-end items-center !border-0 transition-all">
                    <p className="text-main_gray font-semibold">Sort by:</p>
                    <button
                      className={
                        activeTab === "Hourly"
                          ? "active !rounded-xl !w-fit !px-7 !text-sm"
                          : "shadow-md !rounded-xl !w-fit !px-7 !text-sm bg-white"
                      }
                      onClick={() => handleTabClick("Hourly")}
                    >
                      Hourly Jobs
                    </button>

                    <button
                      className={
                        activeTab === "Consultations"
                          ? "active !rounded-xl !w-fit !px-7 !text-sm"
                          : "shadow-md !rounded-xl !w-fit !px-7 !text-sm bg-white"
                      }
                      onClick={() => handleTabClick("Consultations")}
                    >
                      Consultations
                    </button>
                  </div>
                )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size="5rem" style={{ color: "black" }} />
                </Box>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 mt-9 mb-5">
                {Array.isArray(marketPlace) && marketPlace.length > 0 ? (
                  marketPlace.map((item) => {
                    const isHourly =
                      activeTab === "Hourly" && item.bookingType === 0;
                    const isConsultation =
                      activeTab === "Consultations" && item.bookingType === 1;
                    const shouldDisplay =
                      item.hourlyPrice === null || isHourly || isConsultation;

                    if (shouldDisplay) {
                      return (
                        <div
                          className="lg:col-span-4 col-span-12"
                          key={item.bookingId}
                        >
                          <div className="bg-[#fff] rounded-xl shadow-lg w-full p-4">
                            <div
                              onClick={() => handleNavigate(item?.bookingId)}
                            >
                              <div className="flex justify-between items-start border-b pb-4">
                                <div className="flex start-center gap-3">
                                  <div className="w-[5rem] h-[5.3rem] rounded-lg overflow-hidden shrink-0">
                                    <img
                                      src={item?.image}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-start justify-between">
                                      <h4 className="text-md font-semibold text-gray-800 mb-1">
                                        {item?.name}
                                      </h4>
                                      {/* <span
                                        className={`font-semibold w-10 h-7 inline-flex justify-center items-center rounded-md text-white
                                ${
                                  item?.ratingCount >= 1 &&
                                  item?.ratingCount <= 3
                                    ? "bg-red-500"
                                    : item?.ratingCount >= 4 &&
                                      item?.ratingCount <= 6
                                    ? "bg-yellow-500"
                                    : item?.ratingCount >= 7 &&
                                      item?.ratingCount <= 8
                                    ? "bg-blue-500"
                                    : item?.ratingCount >= 9 &&
                                      item?.ratingCount <= 10
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                                      >
                                        {item?.ratingCount}
                                      </span> */}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <p className="text-xs text-gray-600 flex items-center gap-1">
                                        <span>
                                          <img src={LocationFill} alt="" />
                                        </span>
                                        {item?.address?.state},{" "}
                                        {item?.address?.country}
                                      </p>

                                      <p className="text-xs text-gray-600 flex items-center gap-1">
                                        <span>
                                          <img src={CallFill} alt="" />
                                        </span>
                                        {item?.contactNumber}
                                      </p>

                                      <div className="flex items-start justify-between">
                                      {/* <p className="text-xs text-gray-600 flex items-center gap-1">
                                        <span>
                                          <img src={CalendarOutline} alt="" />
                                        </span>
                                        {moment(item?.bookingDate).format(
                                          "MMMM DD YYYY"
                                        )}
                                      </p> */}

                                      {item.bookingType === 0 ? (
                                    <p className="text-xs text-gray-600 flex text-left gap-1">
                                      <span className="">
                                        <img src={CLockFill} alt="" />
                                      </span>
                                      <span>
                                        {moment
                                           (item?.openingDate).format( "MMMM DD YYYY")}
                                       
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-xs text-gray-600 flex text-left gap-1">
                                      <span className="">
                                        <img src={CLockFill} alt="" />
                                      </span>
                                      <span>
                                        {moment
                                          .utc(item?.bookingDate)
                                          
                                          .format("MMMM DD YYYY")}
                                      </span>
                                    </p>
                                  )}

                                    </div>
                                      
                                    </div>
                                  </div>
                                </div>

                                <div className="text-end">
                                  <span
                                    className={`font-semibold w-10 h-7 inline-flex justify-center items-center rounded-md text-white
                                ${
                                  item?.ratingCount >= 1 &&
                                  item?.ratingCount <= 3
                                    ? "bg-red-500"
                                    : item?.ratingCount >= 4 &&
                                      item?.ratingCount <= 6
                                    ? "bg-yellow-500"
                                    : item?.ratingCount >= 7 &&
                                      item?.ratingCount <= 8
                                    ? "bg-blue-500"
                                    : item?.ratingCount >= 9 &&
                                      item?.ratingCount <= 10
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                                  >
                                    {item?.ratingCount}
                                  </span>
                                  <h1 className="font-semibold font-lg mt-3 mb-1">
                                  </h1>
                                  {item.bookingType === 0 ? (
                                    <p className="text-xs text-gray-600 flex text-left gap-1">
                                      <span className="">
                                        <img src={CLockFill} alt="" />
                                      </span>
                                      <span>
                                        {moment
                                          .utc(item?.openingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}  TO{" "}  {moment
                                          .utc(item?.closingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-xs text-gray-600 flex text-left gap-1">
                                      <span className="">
                                        <img src={CLockFill} alt="" />
                                      </span>
                                      <span>
                                        {moment
                                          .utc(item?.bookingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              {item?.currentPlan === "platinum_plan" ? (
                                <button
                                  type="button"
                                  className="border-[#303030] border rounded-lg px-4 py-2 font-semibold"
                                  onClick={handleNavigateToEstimates}
                                >
                                  Send Estimates
                                </button>
                              ) : (
                                // Spacer div to keep the layout consistent
                                <div className="w-[138px] h-[40px]"></div>
                              )}

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  className="bg-[#F05151] border-black rounded-lg px-4 py-3.5 font-semibold "
                                  onClick={() =>
                                    handleOpenModal(item?.bookingId)
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 11 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_2083_18876)">
                                      <path
                                        d="M0.852908 11.0006L11.002 0.851562L10.1514 0.00097159L0.00231672 10.15L0.852908 11.0006Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M10.1494 11.001L11 10.1504L0.850957 0.00134783L0.000366124 0.851939L10.1494 11.001Z"
                                        fill="white"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2083_18876">
                                        <rect
                                          width="11"
                                          height="11"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  className="bg-[#303030] rounded-lg px-4 py-3.5 font-semibold flex"
                                  onClick={() => handleAccept(item?.bookingId)}
                                >
                                  <svg
                                    width="13"
                                    height="10"
                                    viewBox="0 0 13 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.9468 1.42196L4.88651 9.4822C4.81552 9.5532 4.70056 9.5532 4.62973 9.4822L0.0531228 4.90542C-0.0177076 4.83476 -0.0177076 4.7198 0.0531228 4.64881L1.16518 3.53675C1.23617 3.46592 1.35113 3.46592 1.42196 3.53675L4.75829 6.87292L11.5781 0.0531228C11.6492 -0.0177076 11.7639 -0.0177076 11.8349 0.0531228L12.9468 1.16518C13.0177 1.23601 13.0177 1.3508 12.9468 1.42196Z"
                                      fill="white"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null; // If the item should not be displayed
                  })
                ) : (
                  <p className="col-span-12 text-center text-gray-700 font-bold p-9">
                    No items available.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer_two />
      </div>

      <Reject_Booking
        isOpen={isOpen3}
        closeModal={closeModal}
        userId={userId}
      />

      <RejectJob_Request isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default MarketPlace;
