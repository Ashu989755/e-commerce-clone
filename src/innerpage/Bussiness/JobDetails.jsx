import React, { useEffect, useState } from "react";
import { calendar, CLockFill, messageWhite } from "../../assets/image";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import { businessJobDetails } from "../../apis/business/Profile";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { businessMyReviewList } from "../../apis/business/Profile";
import { businessAcceptRejectStatus } from "../../apis/business/Profile";
import Reject_Booking from "../../modals/Reject_Booking";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import SecureLS from "secure-ls";
import { useSelector } from "react-redux";
import { useLiveTracking } from "../../components/Tracking_Layout";
import { toast } from "react-toastify";
import SendEstimates from "../../modals/SendEstimates ";
import Estimates from "../../modals/Estimates";
import ChooseDocuments from "../../modals/ChooseDocuments";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { connection } = useLiveTracking();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.authSlice);
  const ls = new SecureLS();
  const chatToken = ls.get("token");

  const [jobDetail, setJobDetail] = useState("");
  console.log(jobDetail, "=============");

  const [userId, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [myReview, setMyReview] = useState([]);
  const [status, setStatus] = useState("");
  const [isOpen3, setIsOpen3] = useState(false);

  const longitude = user?.longitude;
  const latitude = user?.latitude;
  const pendingBookingCount = user?.latitude;

  const bookingId = user?.bookingId;
  console.log(bookingId);

  const handleOpenModal = (userId) => {
    setIsOpen3(true);
  };

  const closeModal = () => setIsOpen3(false);

  const handleJobDetails = async () => {
    try {
      const apiData = {
        bookingId: id,
      };
      const response = await businessJobDetails(apiData);
      setJobDetail(response?.data?.data);
      setId(response?.data?.data?.userId);
      setStatus(response?.data?.data.bookingStatus);
      // dispatch(
      //   updateUser({
      //     user: response.data.data,
      //     user: response.data.data,
      //   })
      // );
      if (jobDetail.bookingStatus === 6) {
      } else if (jobDetail.bookingStatus === 6) {
        toast.success("Job has been completed");
      } else {
        console.log("first");
      }
    } catch (error) {
      console.log(error, "ERROR:");
    }
  };

  const handleMyReviewList = async () => {
    if (!userId) return;
    try {
      const apiData = {
        userId: userId,
      };

      const res = await businessMyReviewList(apiData);
      setMyReview(res?.data?.data);
      console.log(res, "RESPONSE REVIEW LIST:");
    } catch (error) {
      console.log(error, "ERROR:");
    }
  };

  useEffect(() => {
    handleJobDetails();
  }, [id]);

  useEffect(() => {
    handleMyReviewList();
  }, [userId]);

  const handleAccept = async (status) => {
    console.log(status, "=====");
    // if (pendingBookingCount > 0) {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const apiData = {
        bookingId: jobDetail?.bookingId,
        status: status,
        utcDateTime: new Date().toISOString(),
      };

      console.log(apiData);
      const res = await businessAcceptRejectStatus(apiData);
      // setStatus(newStatus);
      handleJobDetails();
    } catch (error) {
      console.log(error, "=========");
    } finally {
      setIsLoading(false);
    }
    // }
    // else {
    //   toast.error("Please Update Your Plan")
    // }
  };

  const handleViewEstimates = (bookingId) => {
    navigate(`/current-job/estimate/${bookingId}`);
  };

  const handleNavigate = (jobDetail) => {
    navigate("/send-estimates", { state: jobDetail });
  };
  const handleMessage = (jobDetail) => {
    navigate("/business/message", { state: jobDetail });
  };

  // useEffect(() => {
  //   if (!connection) return;

  //   const intervalId = setInterval(() => {
  //     const messageArgs = [userId, bookingId, latitude, longitude];
  //     console.log("Sending tracking data:", messageArgs);

  //     TrackUser(connection, messageArgs)
  //       .then(() => {
  //         console.log("Tracking request sent successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Error during live tracking:", error);
  //       });
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [connection, userId, bookingId, latitude, longitude]);

  useEffect(() => {
    if (connection) {
      connection.on("SomeEvent", (args) => {
        console.log("Received event:", args);
      });
    }

    return () => {
      if (connection) {
        connection.off("SomeEvent");
      }
    };
  }, [connection]);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const renderAcceptButtonText = () => {
    switch (status) {
      case 2:
        return "Accepted";
      case 4:
        return "On My Way";
      case 6:
        return "Your job has been started";
      case 7:
        return "Your job has been Completed";

      default:
        return "Accept";
    }
  };
  const getAcceptButtonColor = (status) => {
    switch (status) {
      case 2:
        return "bg-green-500";
      case 4:
        return "bg-green-600";
      // case 5:
      //   return "bg-green-500";
      case 6:
        return "bg-green-500";
      case 7:
        return "bg-red-600";

      default:
        return "bg-[#303030]";
    }
  };

  const [SendExtimates, setSendExtimates] = useState(false);
  const openSendExtimates = () => {
    setSendExtimates(true);
  };
  const closeSendExtimates = () => {
    setSendExtimates(false);
  };

  const [Extimates, setExtimates] = useState(false);

  const openExtimates = (jobDetail) => {
    setExtimates(true);
  };
  const closeExtimates = () => {
    setExtimates(false);
  };

  // const [ChooseDocuments, setChooseDocuments] = useState(false);

  // const openChooseDocuments = () => {
  //   setChooseDocuments(true);
  // };
  // const closeChooseDocuments = () => {
  //   setChooseDocuments(false);
  // };

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />
        <section className="py-20 px-6">
          <div className="container mx-auto pt-5">
            <h3 className="font-bold text-xl flex items-center mt-6">
              Job History
              <span>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 20L17 14L11 8"
                    stroke="#3C3C3C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="text-lg font-normal">Past Job</span>
            </h3>

            {/* <div
              className={`${getAcceptButtonColor(
                status
              )} font-sm mt-2 text-white font-medium  w-[50%] flex items-center justify-center p-2 rounded-md `}
            >
              {renderAcceptButtonText()}
            </div> */}
            <div
              key={jobDetail?.userId}
              className="grid grid-cols-2 gap-4 mt-9"
            >
              <div className="lg:col-span-1 col-span-2">
                {jobDetail?.bookingStatus === 7 && (
                  <div className="bg-red-600 w-full text-white text-center text-sm p-1 border rounded-md">
                    Your Job has been Completed
                  </div>
                )}
                <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-[4rem] h-[4.375rem] overflow-hidden bg-gray-100 rounded-md">
                        <img
                          src={jobDetail?.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-semibold text-gray mb-1">
                          {jobDetail?.name}
                        </h6>
                        <p className="text-xs text-gray-600 flex items-center gap-2 mb-1">
                          <span className=""></span>
                          {jobDetail?.address?.address1},
                          {jobDetail?.address?.address2},
                          {jobDetail?.address?.state}
                        </p>
                        <div className="flex justify-between">
                          <p className="text-xs text-gray-600 flex items-center gap-2 mb-1">
                            <span className=""></span>
                            {jobDetail?.contactNumber}
                          </p>
                          {jobDetail?.hourlyPrice !== null && (
                            <p className="font-semibold text-sm text-gray-900 flex items-center gap-2 mb-1">
                              ${jobDetail?.hourlyPrice}/hr
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-[2.5rem] h-[2.5rem] bg-black rounded-md flex items-center justify-center ms-auto">
                        <button onClick={() => handleMessage(jobDetail)}>
                          <img src={messageWhite} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 border-t pt-3">
                    <div className="flex font-sm text-gray-500 font-medium gap-2">
                      <img src={calendar} alt="" className="opacity-60" />

                      {moment
                        .utc(jobDetail?.openingDate || jobDetail?.bookingDate)
                        .tz(userTimeZone)
                        .format("DD-MMMM-YYYY")}
                      {/* .format("h:mm A")} */}
                    </div>
                    {jobDetail.hourlyPrice !== null ? (
                      <>
                        <p className="text-xs text-gray-600 flex text-left gap-1 mb-2">
                          <span className="mt-1">
                            <img src={CLockFill} alt="" />
                          </span>
                          <span>
                            {moment
                              .utc(jobDetail?.openingDate)
                              .tz(userTimeZone)
                              .format("h:mm A")}
                            TO{" "}
                            {moment
                              .utc(jobDetail?.closingDate)
                              .tz(userTimeZone)
                              .format("h:mm A")}
                          </span>
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-600 flex text-left gap-1">
                        <span className="mt-1">
                          <img src={CLockFill} alt="" />
                        </span>
                        <span>
                          {moment
                            .utc(jobDetail?.bookingDate)
                            .tz(userTimeZone)
                            .format("h:mm A")}
                        </span>
                      </p>
                    )}
                  </div>
                  {jobDetail.bookingPaymentType === 2 ? (
                    <div className="font-sm bg-green-400 mt-2 text-sm text-white   w-full flex items-center justify-center p-1 rounded-md">
                      <p>Payment will be made outside the app</p>
                    </div>
                  ) : (
                    <div className="font-sm  bg-green-400 mt-2 text-sm text-white font-medium  w-full flex items-center justify-center p-2 rounded-md">
                      <p>Payment will be made inside the app</p>
                    </div>
                  )}
                </div>

                {jobDetail.hourlyPrice !== null ? (
                  <>
                    <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                      <p className="font-bold text-gray mb-3">Service Images</p>
                      <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 ">
                        <div class="snap-start scroll-mx-6 shrink-0 w-[50%]">
                          {jobDetail?.bookedImages?.map((user) => (
                            <img src={user} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                      <p className="font-bold text-gray">Service Type</p>

                      <div class="flex items-center flex-wrap gap-3 pt-3">
                        {jobDetail?.bookedServices?.map((service) => (
                          <span class="inline-flex items-center rounded-full bg-[#F5F4F6] px-4 py-2 text-sm font-medium text-gray-600 me">
                            {" "}
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                      <p className="font-bold text-gray">Receipt</p>
                      <div className="flex justify-between items-center mb-2 mt-3">
                        <p className="text-md text-gray-700">
                          Total Time:{" "}
                          {jobDetail?.totalHour
                            ? jobDetail?.totalHour
                            : "-----"}
                        </p>
                        <p className="text-md text-gray-700 text-right">
                          $
                          {jobDetail?.hourlyPrice
                            ? jobDetail?.hourlyPrice
                            : "-----"}
                          /per hour
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-md text-gray-700">
                          Requested Amount
                        </p>
                        <p className="text-md text-gray-700 text-right">
                          $
                          {jobDetail?.totalAmount
                            ? jobDetail?.totalAmount
                            : "-----"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-md text-gray font-semibold">
                          Total Amount
                        </p>
                        <p className="text-md text-gray font-semibold text-right">
                          $
                          {jobDetail?.totalAmount
                            ? jobDetail?.totalAmount
                            : "-----"}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                      <p className="font-bold text-gray">Description</p>

                      <div class="flex items-center flex-wrap gap-3 pt-3">
                        <span class="inline-flex items-center rounded-full bg-[#F5F4F6] px-4 py-2 text-sm font-medium text-gray-600 me">
                          {" "}
                          {jobDetail?.description}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-4 mt-4">
                  {jobDetail?.bookingStatus === 1 &&
                    jobDetail?.estimateStatus !== 2 && (
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          className="bg-[#F05151] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                          onClick={handleOpenModal}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAccept(2)}
                          type="button"
                          className="bg-[#303030] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                        >
                          Accept
                        </button>
                      </div>
                    )}
                  {jobDetail?.bookingStatus === 3 && (
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        className="bg-[#F05151] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                        onClick={handleOpenModal}
                      >
                        Rejected
                      </button>
                    </div>
                  )}

                  {jobDetail?.bookingStatus === 2 &&
                    jobDetail.bookingType !== 1 ? (
                    <div className="p-2">
                      <button
                        onClick={() => handleAccept(4)}
                        type="button"
                        className={`rounded-lg px-3 py-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center ${isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#303030]"
                          }`}
                        disabled={isLoading}
                      >
                        On My Way
                      </button>
                    </div>
                  ) : null}
                  {jobDetail?.bookingStatus === 4 &&
                    jobDetail?.estimateStatus !== 2 && (
                      <div className="p-2">
                        <button
                          onClick={() => handleAccept(5)}
                          type="button"
                          className="bg-[#303030] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                        >
                          Arrived
                        </button>
                      </div>
                    )}
                  <div></div>
                  {jobDetail?.isSendEstimate && (
                    <>
                      <div className="flex  gap-3">
                        {jobDetail?.estimateStatus === 2 &&
                          jobDetail.bookingStatus === 1 &&
                          jobDetail.bookingStatus !== 7 &&
                          jobDetail?.bookingPaymentType === 1 && (
                            <button
                              onClick={openSendExtimates}
                              type="button"
                              className="bg-[#303030] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                            >
                              Request Payment
                            </button>
                          )}
                        <button
                          onClick={() =>
                            handleViewEstimates(jobDetail?.bookingId)
                          }
                          type="button"
                          className="bg-transparent rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-black border border-black text-sm w-full justify-center"
                        >
                          View Estimate
                        </button>
                      </div>
                    </>
                  )}
                  {jobDetail?.bookingType === 0 ? 
                  (
                   ((jobDetail?.bookingStatus === 5 ) 
                    || (jobDetail?.bookingStatus === 1 &&
                      jobDetail?.estimateStatus === 2) ) 
                      && (
                      <div className="p">
                        <button
                          onClick={() => handleAccept(6)}
                          type="button"
                          className="bg-green-500 rounded-lg px-3 py-4 mb font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                        >
                          Start Job
                        </button>
                      </div>
                    )
                  ) : (jobDetail?.bookingStatus === 1 &&
                    jobDetail?.estimateStatus === 2) ||
                    (jobDetail.bookingStatus === 2 &&
                      jobDetail.estimateStatus === 2) ? (
                    <div className="p">
                      <button
                        onClick={() => handleAccept(6)}
                        type="button"
                        className="bg-green-500 rounded-lg px-3 py-4 mb font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                      >
                        Start Job
                      </button>
                    </div>
                  ) : null}
                  {jobDetail?.bookingStatus === 6 &&
                    jobDetail?.estimateStatus !== 1 && (
                      <button
                        onClick={() => handleAccept(7)}
                        type="button"
                        className="bg-red-500 rounded-lg px-3 py-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                      >
                        Complete Job
                      </button>
                    )}

                  {jobDetail?.bookingStatus === 7 && (
                    <div className="p-2">
                      <button
                        onClick={() =>
                          navigate("/business/user-rating", {
                            state: jobDetail,
                          })
                        }
                        type="button"
                        className="bg-[#303030] rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                      >
                        Rate Now
                      </button>
                    </div>
                  )}
                  {jobDetail?.bookingType === 0 ? (
                    <div className="p-2">
                      {(jobDetail?.bookingStatus === 5 ||
                        jobDetail?.bookingStatus === 1 || jobDetail?.bookingStatus === 6) &&
                        (jobDetail?.currentPlan === "platinum_plan" ||
                          jobDetail?.currentPlan === "gold_plan") &&
                        jobDetail?.isSendEstimate !== true &&
                        jobDetail?.bookingStatus !== 3 && (
                          // <button onClick={() => handleNavigate(jobDetail)} type="button" className="bg-[#303030] rounded-lg px-3
                          // py-4 mb-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center">
                          //   Send Estimates
                          // </button>
                          <button
                            type="button"
                            className="bg-white border border-black rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center
                       text-[#303030] text-sm w-full justify-center"
                            onClick={() => openExtimates(jobDetail)}
                          >
                            Send Estimates
                          </button>
                        )}
                    </div>
                  ) : (
                    <div className="p-2">
                      {jobDetail?.bookingStatus === 2 &&
                        jobDetail?.bookingType === 1 &&
                        jobDetail?.estimateStatus !== 2
                        &&
                        (jobDetail?.currentPlan === "platinum_plan" ||
                          jobDetail?.currentPlan === "gold_plan")
                        &&
                        (
                          <button
                            type="button"
                            className="bg-white border border-black rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center
                       text-[#303030] text-sm w-full justify-center"
                            onClick={() => openExtimates(jobDetail)}
                          >
                            Send Estimates
                          </button>
                        )}
                    </div>
                  )}

                  {(jobDetail?.isAccept === true ||
                    jobDetail.estimateStatus === 2) &&
                    jobDetail?.currentPlan === "platinum_plan" &&
                    jobDetail?.isSendContract !== true &&
                    (jobDetail?.contractStatus ?? 0) < 1 &&
                    jobDetail?.bookingStatus <= 5 && (
                      <div className="p">
                        <button
                          onClick={() => handleMessage(jobDetail)}
                          type="button"
                          className="bg-[#303030] rounded-lg px-3 py-4 mb-2 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                        >
                          Send Contract
                        </button>
                      </div>
                    )}
                </div>
              </div>
              <div className="lg:col-span-1 col-span-2">
                <div className="crd bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
                  <div className="flex items-center border-b pb-3 mb-3">
                    <h2 className="text-xl font-bold text-dark_link">
                      Overall Rating{" "}
                      <span className="bg-[#4578DA] text-white px-3 py-1 rounded-md text-sm">
                        {jobDetail?.reviewCount}
                      </span>
                    </h2>
                  </div>

                  <div className="">
                    {myReview?.map((item) => (
                      <div className="bg-[#F7F7F7] p-3 rounded-md mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-[3rem] w-[3rem] rounded-full bg-gray-200 overflow-hidden">
                              <img
                                src={item?.reviewedByImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold">
                                {item?.reviewedByFullName}
                              </h2>
                              <p className="text-gray-500">
                                {item?.reviewedByState},{" "}
                                {item?.reviewedByCountry}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`font-semibold w-10 h-7 inline-flex justify-center items-center rounded-md text-white
                    ${item?.rate >= 1 && item?.rate <= 3
                                ? "bg-red-500"
                                : item?.rate >= 4 && item?.rate <= 6
                                  ? "bg-yellow-500"
                                  : item?.rate >= 7 && item?.rate <= 8
                                    ? "bg-blue-500"
                                    : item?.rate >= 9 && item?.rate <= 10
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                              }`}
                          >
                            {" "}
                            {item?.rate}{" "}
                          </div>
                        </div>
                        <div className="border-t pt-4 ">
                          <div className="flex items-center justify-between mb-2">
                            <h1 className="font-semibold text-sm">
                              {item?.name}
                            </h1>

                            <p className="text-gray-600 font-medium text-xs">
                              Posted{" "}
                              {moment(item?.reviewedOn).format("hh:mm A")}
                            </p>
                          </div>
                          <p className="text-gray-600 text-xs">
                            {item?.reviewDesc}
                          </p>
                        </div>
                      </div>
                    ))}
                    {/* <div className="bg-[#F7F7F7] p-3 rounded-md mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[3rem] w-[3rem] rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src={avtar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="font-semibold">Allucard</h2>
                          <p className="text-gray-500">Berlin, Germany</p>
                        </div>
                      </div>
                      <div className="w-[2.125rem] h-[2.125rem] rounded-md bg-[#F8CF42] flex items-center justify-center text-white">
                        {" "}
                        4{" "}
                      </div>
                    </div>
                    <div className="border-t pt-4 ">
                      <div className="flex items-center justify-between mb-2">
                        <h1 className="font-semibold text-sm">
                          Poor Work Experience
                        </h1>
                        <p className="text-gray-600 font-medium text-xs">
                          7:03 PM
                        </p>
                      </div>
                      <p className="text-gray-600 text-xs">
                        Lorem ipsum dolor sit amet consectetur. Phasellus
                        aliquet vitae velit vitae cursus est pharetra eu.
                        Potenti nec dapibus volutpat sit dui eget leo. Turpis
                        leo in tortor orci laoreet porta pellentesque turpis in.{" "}
                      </p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Reject_Booking isOpen={isOpen3} closeModal={closeModal} userId={id} />
        <Footer_two />

        <SendEstimates
          isOpen={SendExtimates}
          closeModal={closeSendExtimates}
          jobDetail={jobDetail}
        />
        <Estimates
          isOpen={Extimates}
          closeModal={closeExtimates}
          state={jobDetail}
          handleJobDetails={handleJobDetails}
        />
      </div>
    </>
  );
};

export default JobDetails;
