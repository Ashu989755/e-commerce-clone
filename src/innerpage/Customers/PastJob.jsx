import React, { useState, useEffect, useRef } from "react";
import Footer_two from "../layout/Footer_two";
import Header_two from "../layout/Header_two";
import {
  avtar,
  calendar,
  CLockFill,
  clockGray,
  messageWhite,
  tickGreen,
} from "../../assets/image";
import { avatar } from "@material-tailwind/react";
import SendPayment from "../../modals/SendPayment";
import { customerjobDetail } from "../../apis/customer/profile";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { businessMyReviewList } from "../../apis/business/Profile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import SecureLS from "secure-ls";
import { createSignalRConnection, } from "../../signalR/signalR";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


const mapContainerStyle = {
  width: "100%",
  height: "400px",
};


const PastJob = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const navigate = useNavigate();
  //   const ls = new SecureLS();
  //   const chatToken = ls.get("token");
  // console.log(chatToken);


  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [userId, setId] = useState("");
  const [myReview, setMyReview] = useState([]);
  const [status, setStatus] = useState("");
  const [connection, setConnection] = useState(null);
  const [liveLocation, setLiveLocation] = useState({ latitude: null, longitude: null });
  const [serviceProviderLocation, setServiceProviderLocation] = useState({ lat: 30.6977211, lng: 76.6759107 });
console.log(userDetails,"==============")

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  useEffect(() => {
    const initializeConnection = async () => {
      // const token = chatToken.replace(/^Bearer\s/, "");
      const conn = createSignalRConnection();
      await conn.start();
      setConnection(conn);
      console.log("Connected to SignalR");

      if (conn) {
        conn.on("TrackBusinessResponse", (args) => {
          console.log("TrackBusinessResponse event triggered");
          console.log("Received args:", args);

          if (args.data) {
            const { latitude, longitude } = args.data;
            setLiveLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
          }

        });

        conn.onclose((err) => {
          console.error("SignalR connection closed: ", err);
        });
      }
    };

    initializeConnection();

    return () => {
      if (connection) connection.stop();
    };
  }, []);


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleJobDetail = async () => {
    try {
      const apiData = {
        bookingId: id,
      };
      const response = await customerjobDetail(apiData);
      const { latitude, longitude } = response?.data?.data?.address || {};
      setUserDetails(response?.data?.data);
      setId(response?.data?.data?.userId);
      setStatus(response?.data?.data.bookingStatus);
      if (latitude && longitude) {
        setServiceProviderLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      }
      // dispatch(
      //   updateUser({
      //     user: response.data.data,
      //   })
      // );
    } catch (error) {
      console.log(error, "ERROR:");
    }
  };

  useEffect(() => {
    handleJobDetail();
  }, []);

  const handleMyReviewLists = async () => {
    if (!userId) return;
    try {
      const apiData = {
        userId: userId,
      };

      const res = await businessMyReviewList(apiData);
      setMyReview(res?.data?.data);
      // console.log(res, "RESPONSE REVIEW LIST:");
    } catch (error) {
      console.log(error, "ERROR:");
    }
  };

  useEffect(() => {
    handleMyReviewLists();
  }, [userId]);

  const handleNavigate = (bookingId) => {
    navigate(`/current-job/estimate/${bookingId}`);
  }

  const renderAcceptButtonText = () => {
    switch (status) {
      case 2:
        return "Accepted";
      case 4:
        return "On My Way";
      case 5:
        return "New Business is arrived";
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
      case 5:
        return "bg-green-500";
      case 6:
        return "bg-green-500";
      case 7:
        return "bg-red-600";

      default:
        return "bg-[#303030]";
    }
  };



  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleMessage = (jobDetail) => {
    navigate("/message", { state: jobDetail })
  }
  const handleViewEstimates = (bookingId) => {
    navigate(`/current-job/estimate/${bookingId}`);
  };

  return (
    <>
      <Header_two />
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto pt-5">
          <h3 className="font-bold text-xl flex items-center mt-6">
            Job Detail
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
            <span className="text-lg font-normal">job</span>
          </h3>
          <div
            className={`${getAcceptButtonColor(
              status
            )} font-sm mt-2 text-white font-medium  w-[50%] flex items-center justify-center p-2 rounded-md `}
          >
            {renderAcceptButtonText()}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-9">
            <div className="col-span-1">
              <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Profile picture */}
                    <div className="w-[4rem] h-[4.375rem] overflow-hidden bg-gray-100 rounded-md">
                      <img src={userDetails?.image} alt="" />
                    </div>
                    {/* Profile details */}
                    <div>
                      <h6 className="text-sm font-semibold text-gray mb-1">
                        {userDetails?.name}
                      </h6>
                      <p className="text-xs text-gray-600 flex items-center gap-2 mb-1">
                        <span className="">
                          <svg
                            width="7"
                            height="9"
                            viewBox="0 0 7 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.37487 0C1.51419 0 0 1.52469 0 3.39924C0 6.06276 3.05763 8.81291 3.18775 8.9284C3.23918 8.97444 3.30577 8.99993 3.3748 9C3.44383 9.00007 3.51046 8.97472 3.56199 8.92878C3.69211 8.81291 6.74974 6.06276 6.74974 3.39924C6.74974 1.52469 5.23555 0 3.37487 0ZM3.37487 5.2498C2.34103 5.2498 1.49994 4.4087 1.49994 3.37487C1.49994 2.34103 2.34103 1.49994 3.37487 1.49994C4.4087 1.49994 5.2498 2.34103 5.2498 3.37487C5.2498 4.4087 4.4087 5.2498 3.37487 5.2498Z"
                              fill="#303030"
                            />
                          </svg>
                        </span>
                        {userDetails?.address?.address1},{" "}
                        {userDetails?.address?.address2},{" "}
                        {userDetails?.address?.city},{" "}
                        {userDetails?.address?.state}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-2 mb-1">
                        <span className="">
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.44854 6.26413C6.90485 5.79911 6.35307 5.51743 5.81605 5.98175L5.49538 6.26238C5.26076 6.46609 4.82454 7.41791 3.13797 5.47774C1.45174 3.54004 2.45519 3.23834 2.69016 3.03638L3.01258 2.7554C3.54679 2.29003 3.34519 1.70419 2.9599 1.10114L2.72738 0.735866C2.34034 0.134219 1.91887 -0.260908 1.38325 0.203761L1.09384 0.456642C0.857116 0.629094 0.19541 1.18965 0.0349002 2.25456C-0.158273 3.53231 0.451101 4.99551 1.84722 6.60096C3.24158 8.20711 4.60679 9.01387 5.89999 8.99982C6.97474 8.98823 7.6238 8.41152 7.82681 8.20184L8.11727 7.94861C8.65148 7.48429 8.31958 7.01154 7.77553 6.54546L7.44854 6.26413Z"
                              fill="#303030"
                            />
                          </svg>
                        </span>
                        {userDetails?.contactNumber}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-[2.5rem] h-[2.5rem] bg-black rounded-md flex items-center justify-center ms-auto">
                      <button onClick={() => handleMessage(userDetails)}>
                        <img src={messageWhite} alt="" /></button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 border-t pt-3">
                  {userDetails.hourlyPrice !== null ? (
                    <>
                      <div className="flex font-sm text-gray-500 font-medium gap-2">
                        <img src={calendar} alt="" className="opacity-60" />

                        {moment
                          .utc(userDetails?.openingDate)
                          .tz(userTimeZone)
                          .format("DD-MMMM-YYYY")}
                        {/* .format("h:mm A")} */}
                      </div>
                      <p className="text-xs text-gray-600 flex text-left gap-1">
                        <span className="mt-1">
                          <img src={CLockFill} alt="" />
                        </span>
                        <span>
                          {moment
                            .utc(userDetails?.openingDate)
                            .tz(userTimeZone)
                            .format("h:mm A")}
                          TO{" "}
                          {moment
                            .utc(userDetails?.closingDate)
                            .tz(userTimeZone)
                            .format("h:mm A")}
                        </span>
                      </p>
                      {/* <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                     <p className="font-bold text-gray mb-3">Description</p>
                     <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 ">
                      {userDetails?.description}
                     </div>
                   </div> */}
                    </>
                  ) : (
                    <p className="text-xs text-gray-600 flex text-left gap-1">
                      <span className="mt-1">
                        <img src={CLockFill} alt="" />
                      </span>
                      <span>
                        {moment
                          .utc(userDetails?.bookingDate)
                          .tz(userTimeZone)
                          .format("h:mm A")}

                      </span>
                    </p>
                  )}
                </div>
              </div>
              {userDetails.hourlyPrice === null ? (
                <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                  <p className="font-bold text-gray mb-3">Description</p>
                  <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 ">
                    {userDetails?.description}
                  </div>
                </div>
              ) : (
                <>
                  <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                    <p className="font-bold text-gray mb-3">Service Images</p>
                    <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 ">
                      {userDetails?.bookedImages?.map((images) => (
                        <div class="snap-start scroll-mx-6 shrink-0 w-[50%]">
                          <img src={images} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                    <p className="font-bold text-gray">Service Type</p>
                    {userDetails?.bookedServices?.map((service) => (
                      <div class="flex items-center flex-wrap gap-3 pt-3">
                        <span class="inline-flex items-center rounded-full bg-[#F5F4F6] px-4 py-2 text-sm font-medium text-gray-600 me">
                          {" "}
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2>Live Location</h2>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={
                          liveLocation.latitude && liveLocation.longitude
                            ? { lat: liveLocation.latitude, lng: liveLocation.longitude }
                            : serviceProviderLocation
                        }
                        zoom={14}
                      >
                        {liveLocation.latitude && liveLocation.longitude && (
                          <Marker
                            position={{
                              lat: liveLocation.latitude,
                              lng: liveLocation.longitude,
                            }}
                          />
                        )}
                      </GoogleMap>
                    ) : (
                      <p>Loading map...</p>
                    )}
                  </div>
                  <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                    <p className="font-bold text-gray">Receipt</p>

                    <div className="flex justify-between items-center border-b">
                      <p className="text-md text-gray-700 font-medium p-3 ">
                        Requested Time
                      </p>
                      <p className="text-md text-gray text-gray-700 text-right">
                        ${userDetails?.totalHour}
                      </p>
                    </div>
                    {userDetails.estimateDetails?.estimateStatus === 2 && (
                      <div className="flex justify-between items-center border-b">
                        <p className="text-md text-gray-700 font-medium p-3 ">
                          Estimated Time
                        </p>
                        <p className="text-md text-gray text-gray-700 text-right">
                          {userDetails?.estimateDetails?.totalHour} hr
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center border-b">
                      <p className="text-md text-gray-700 font-medium p-3 ">
                        Requested Amount
                      </p>
                      <p className="text-md text-gray text-gray-700 text-right">
                        ${userDetails?.totalAmount}
                      </p>
                    </div>

                    {userDetails.estimateDetails?.estimateStatus === 2 && (
                      <div className="flex justify-between items-center border-b">
                        <p className="text-md text-gray-700 font-medium p-3 ">
                          Estimate Amount
                        </p>
                        <p className="text-md text-gray text-gray-700 text-right">
                          ${userDetails?.estimateDetails?.grandEstimateTotal}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-md text-gray font-semibold p-3 ">
                        Total Amount
                      </p>
                      <p className="text-md text-gray font-semibold text-right">
                        $
                        {userDetails?.totalAmount &&
                          userDetails?.estimateDetails?.grandEstimateTotal
                          ? (
                            parseFloat(userDetails.totalAmount) +
                            parseFloat(
                              userDetails.estimateDetails.grandEstimateTotal
                            )
                          ).toFixed(2)
                          : userDetails?.totalAmount}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {userDetails?.isSendEstimate && (
                <button
                  onClick={() => handleViewEstimates(userDetails?.bookingId)}
                  type="button"
                  className="bg-transparent rounded-lg px-3 py-4 mb-4 font-semibold flex gap-2 items-center text-black border border-black text-sm w-full justify-center"
                >
                  View Estimate
                </button>
              )}

              {userDetails?.bookingStatus === 7 ? (
                <button
                  className="rounded-lg  px-3.5 py-3.5 font-semibold text-white shadow-sm hover:bg-white-500 w-full border border-slate-500 bg-black	 mt-2"
                  onClick={() => navigate("/business/user-rating", { state: userDetails })}
                >
                  Rate Now
                </button>
              )
                : (
                  // <button
                  //   className="rounded-lg  px-3.5 py-3.5 font-semibold text-gray-900 shadow-sm hover:bg-white-500 w-full border border-slate-500	 mt-2"
                  //   // onClick={openModal}
                  //   onClick={() => handleNavigate(userDetails?.bookingId)}
                  // >
                  //   View Estimate
                  // </button>
                  ""
                )
              }

            </div>
            <div className="col-span-1">
              <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                <div className="flex gap-14  border-b pb-3 mb-3">
                  <div className="flex items-center ">
                    <h2 className="text-xl font-bold text-dark_link">
                      Overall Rating{" "}
                      <span className="bg-[#4578DA] text-white px-3 py-1 rounded-md text-sm">
                        {userDetails?.rating}
                      </span>
                    </h2>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 border-b">
                    {userDetails?.reviewCount} Reviews
                  </p>
                </div>
                <div className="">
                  {myReview?.length > 0 ? (
                    myReview?.map((item) => (
                      <div className="bg-[#F7F7F7] p-3 rounded-md mb-4 p-4">
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
                              {moment.utc(item?.reviewedOn).tz(userTimeZone).format("hh:mm A")}
                            </p>
                          </div>
                          <p className="text-gray-600 text-xs">
                            {item?.reviewDesc}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="font-bold text-gray-800 p-12">
                      NO Review Found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
      <SendPayment isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default PastJob;
