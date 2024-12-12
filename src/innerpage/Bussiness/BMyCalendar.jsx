import React, { useEffect, useState } from "react";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  calendar,
  clockGray,
  servicesIcon,
  tickGreen,
} from "../../assets/image";
import { Link } from "react-router-dom";
import { businessJobList } from "../../apis/business/Profile";
import { businessBookingDates } from "../../apis/business/Profile";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";


const formatDateToLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BMyCalendar = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(new Date());
  const [availableDates, setAvailableDates] = useState(new Set());
  const [jobList, setJobList] = useState([]);
  const [status, setStatus] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const handleJobList = async (selectedDate) => {
    try {
      const apiData = {
        date: selectedDate,
      };
      const res = await businessJobList(apiData);
      setJobList(res?.data?.data);
      setStatus(res?.data?.data[0]?.bookingStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const onCalendarChange = (newDate) => {
    setValue(newDate);
    const formattedDate = formatDateToLocal(newDate);
    handleJobList(formattedDate);
  };

  const handleBookingDate = async () => {
    
    try {
      const apiData = {
        utcDateTime: new Date().toISOString(),
      };
      const res = await businessBookingDates(apiData);

      if (Array.isArray(res?.data?.data)) {
        setUserDetails(res.data.data);
        const availableSet = new Set(
          res.data.data.map((dateString) => {
            const date = new Date(dateString);

            date.setHours(0, 0, 0, 0);
            return date.toISOString().split("T")[0];
          })
        );
        setAvailableDates(availableSet);
      } else {
        console.error("Expected an array from the API response", res.data.data);
        setUserDetails([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleBookingDate();

    const currentDate = formatDateToLocal(new Date());
    handleJobList(currentDate);
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      if (availableDates.has(formattedDate)) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 bg-black rounded-full mt-1"></div>{" "}
          </div>
        );
      }
    }
    return null;
  };

  const renderButtonText = () => {
    switch (status) {
      case 4:
        return "On My Way";
        break;
      case 5:
        return "Arrived";
        break;
      case 6:
        return "Start Job";
        break;
      case 7:
        return "Complete Job";
        break;
      default:
        return "";
    }
  };

  const handleNavigate = (id) => {
    navigate(`/job-details/${id}`);
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4 py-16">
              <div className="lg:col-span-1 col-span-2">
                <div className="crd bg-white p-4 rounded-xl shadow-md sticky top-[9.375rem]">
                  <div className="w-full">
                    <Calendar
                      onChange={onCalendarChange}
                      value={value}
                      tileContent={tileContent}
                      className="!w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 col-span-2">
                <div className="crd bg-white p-6 rounded-xl shadow-md">
                  <div class="flex justify-between items-center pb-3 border-b">
                    <h3 class="text-slate-800 font-semibold text-xl">
                      Job History
                    </h3>
                  </div>

                  {/* Empty state */}

                  {/* Job history card */}

                  {jobList?.length > 0 ? (
                    jobList?.map((item) => (
                      <div
                        className="flex flex-wrap gap-2 pt-6 w-full"
                        onClick={() => handleNavigate(item?.bookingId)}
                      >
                        {/* <div className="flex items-center">
                        <div className="w-[4rem] h-[4.375rem] rounded-md overflow-hidden shrink-0 me-4">
                          <img
                            src={item?.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-[calc(100%-5rem)]">
                          <div className="flex items-center justify-between">
                            <h5 className="text-zinc-900 font-semibold">
                              {item?.name}
                            </h5>
                            <p className="text-zinc-600 mt-1 font-sm">
                              {item?.description}
                            </p>

                            <h5></h5>
                            {item && item.hourlyPrice == null ? (
                              <h4 className="font-semibold text-white flex items-center gap-3 bg-[#4578DA] px-4 py-2 rounded-bl-xl rounded-tr-xl absolute right-1 text-xs">
                                Consultation
                              </h4>
                            ) : null}
                          </div>

                          <div className="flex items-start justify-between">
                            <div className="flex items-center flex-wrap gap-3">
                              {item?.bookedServices?.map((service, index) => (
                                <div className="btt flex gap-1 px-3 py-1 bg-[#F5F4F6] rounded-full text-xs">
                                  <img src={servicesIcon} alt="" />
                                  <span></span>
                                  {service}
                                </div>
                              ))}
                            </div>
                            {item?.hourlyPrice ? (
                              <div className="font-semibold text-gray">
                                ${item?.hourlyPrice}/Per Hour
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="border-b w-full"></div>
                      {item?.hourlyPrice === null ? (
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#F6F6F6] w-[2.125rem] h-[2.125rem] rounded-md flex items-center justify-center">
                              <img src={calendar} alt="" />
                            </div>

                            <div>
                              <p className="text-sm">
                                <span className="text-gray font-medium">
                                  {moment(item?.bookingDate).format(
                                    "DD-MMMM-YYYY"
                                  )}
                                </span>
                                ,
                                <span className="text-gray">
                                  {moment(item?.bookingDate).format("dddd")}
                                </span>
                              </p>
                              <p className="text-sm font-semibold mt-1 mr-2">
                                <span className="text-gray-500">
                                  {moment
                                    .utc(item?.bookingDate)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#F6F6F6] w-[2.125rem] h-[2.125rem] rounded-md flex items-center justify-center">
                              <img src={calendar} alt="" />
                            </div>

                            <div>
                              <p className="text-sm">
                                <span className="text-gray font-medium">
                                  {moment(item?.openingDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                                ,
                                <span className="text-gray">
                                  {moment(item?.openingDate).format("dddd")}
                                </span>
                              </p>
                              <p className="text-sm font-semibold mt-1 mr-2">
                                <span className="text-gray-500">
                                  {moment
                                    .utc(item?.openingDate)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}
                                </span>{" "}
                                -{" "}
                                <span className="text-gray-500">
                                  {moment
                                    .utc(item?.closingDate)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex font-sm text-[#30DD9F] font-medium gap-2">
                            <img src={tickGreen} alt="" />
                            {renderButtonText()}
                          </div>
                        </div>
                      )} */}

                        {/* Upcoming jobs card */}
                        <div className="flex flex-wrap gap-4 w-full">
                          <div className="crd bg-white p-6 rounded-xl shadow-md w-full relative border border-gray-100">
                            <div className="flex items-center">
                              <div className="w-[4rem] h-[4.375rem] rounded-md overflow-hidden shrink-0 me-4">
                                <img
                                  src={item?.image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {item && item.hourlyPrice == null ? (
                                <h4 className="font-semibold text-white flex items-center gap-3 bg-[#4578DA] px-4 py-2 rounded-bl-xl rounded-tr-xl absolute right-1 text-xs">
                                  Consultation
                                </h4>
                              ) : null}
                              <div className="w-[calc(100%-5rem)]">
                                <h5 className="text-zinc-900 font-semibold">
                                  {item?.name}
                                </h5>
                                <p className="text-zinc-600 mt-1 font-sm">
                                  {item?.description}
                                </p>

                                <div className="flex items-start justify-between">
                                  <div className="flex items-center flex-wrap gap-3">
                                    {item?.bookedServices?.map(
                                      (service, index) => (
                                        <span className="inline-flex items-center rounded-full bg-[#F5F4F6] px-2 py-1 text-xs font-medium text-gray-600">
                                          <span className="me-2">
                                            <img src={servicesIcon} alt="" />
                                          </span>
                                          {service}
                                        </span>
                                      )
                                    )}
                                  </div>

                                  {item?.hourlyPrice ? (
                                    <div className="font-semibold text-gray">
                                      ${item?.hourlyPrice}/Per Hour
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="border-b pt-4"></div>
                            {item?.hourlyPrice === null ? (
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3">
                                  <div className="bg-[#F6F6F6] w-[2.125rem] h-[2.125rem] rounded-md flex items-center justify-center">
                                    <img src={calendar} alt="" />
                                  </div>

                                  <div>
                                    <p className="text-sm">
                                      <span className="text-gray font-medium">
                                        {moment(item?.bookingDate).format(
                                          "DD-MMMM-YYYY"
                                        )}
                                      </span>
                                      ,
                                      <span className="text-gray">
                                        {moment(item?.bookingDate).format(
                                          "dddd"
                                        )}
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold mt-1 mr-2">
                                      <span className="text-gray-800">
                                        {moment
                                          .utc(item?.bookingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}
                                      </span>{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3">
                                  <div className="bg-[#F6F6F6] w-[2.125rem] h-[2.125rem] rounded-md flex items-center justify-center">
                                    <img src={calendar} alt="" />
                                  </div>

                                  <div>
                                    <p className="text-sm">
                                      <span className="text-gray font-medium">
                                        {moment(item?.openingDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                      ,
                                      <span className="text-gray">
                                        {moment(item?.openingDate).format(
                                          "dddd"
                                        )}
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold mt-1 mr-2">
                                      <span className="text-gray-800">
                                        {moment
                                          .utc(item?.openingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}
                                      </span>{" "}
                                      -{" "}
                                      <span className="text-gray-800">
                                        {moment
                                          .utc(item?.closingDate)
                                          .tz(userTimeZone)
                                          .format("h:mm A")}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex font-sm text-[#30DD9F] font-medium gap-2">
                                  <img src={tickGreen} alt="" />
                                  {renderButtonText()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No jobs available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer_two />
      </div>
    </>
  );
};

export default BMyCalendar;
