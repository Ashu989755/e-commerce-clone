import React, { useEffect, useState } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Calendar from "react-calendar";
import { useLocation } from "react-router-dom";
import {
  customerBookAppointment,
  customerBusinessBookedSlot,
} from "../../apis/customer/profile";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookAppointmentValidator } from "../../helpers/validation";
import moment from "moment-timezone";
import JobPayment from "../../modals/JobPayment";
import { useNavigate } from "react-router-dom";



function Booking_Appointment() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookAppointmentValidator),
    defaultValues: {
      defaultValues: {
        startTime: "",
        endTime: "",
        services: [],
      },
    },
  });
  console.log(errors,"=======================")
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [valueT, setValueT] = useState(null);
  console.log(valueT, "VALUETW0");

  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [customServices, setCustomServices] = useState([]);
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [totalHours, setTotalHours] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const servicesString = [...selectedServices, ...customServices].join(",");

  const openModal = (e) => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.includes(service);
      const updatedServices = isSelected
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service];
        // setValue("services", updatedServices); 

      return updatedServices;
    });
  };

  const handleCustomServiceInput = (e) => {
    setCustomServiceInput(e.target.value);
  };

  const handleAddCustomService = () => {
    if (customServiceInput.trim() !== "") {
      setCustomServices((prevCustomServices) => [
        ...prevCustomServices,
        customServiceInput.trim(),
      ]);
      setCustomServiceInput(""); 
    }
  };
  const removeCustomService = (service) => {
    setCustomServices((prevCustomServices) =>
      prevCustomServices.filter((s) => s !== service)
    );
  };

  const { state } = useLocation();

  const availability = state?.availabilityList || [];
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayOfTheWeek = date.toLocaleString("default", { weekday: "long" });
      const isAvailable = availability.some((slot) => {
        return slot.dayOfTheWeek === dayOfTheWeek;
      });

      if (isAvailable) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 bg-black rounded-full mt-0.5"></div>{" "}
            {/* Black dot */}
          </div>
        );
      }
    }
    return null;
  };

  const checkAvailability = async (selectedDate) => {
    const dayOfTheWeek = selectedDate.toLocaleString("default", {
      weekday: "long",
    });
    const availableSlot = availability.find(
      (slot) => slot.dayOfTheWeek === dayOfTheWeek
    );

    if (availableSlot) {
      setSelectedAvailability({
        day: selectedDate.getDate(),
        month: selectedDate.toLocaleString("default", { month: "long" }),
        year: selectedDate.getFullYear(),
        weekday: selectedDate.toLocaleString("default", { weekday: "long" }),
        openingTime: availableSlot.openingTime,
        closingTime: availableSlot.closingTime,
      });

      setAvailabilityMessage("");
      const apiData = {
        businessUserId: state?.userId,
        utcDateTime: getUtcDateTimeWithStaticTime(selectedDate),
      };
      try {
        const res = await customerBusinessBookedSlot(apiData);
        setBookedSlot(res?.data?.data?.hourlyBookedSlot);
        console.log(res, "res");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSelectedAvailability(null);
      setAvailabilityMessage("User not available");
    }
  };

  useEffect(() => {
    checkAvailability(new Date());
  }, [availability]);

  const getUtcDateTimeWithStaticTime = (selectedDate) => {
    if (
      !selectedDate ||
      !(selectedDate instanceof Date) ||
      isNaN(selectedDate)
    ) {
      console.error("Invalid selected date for UTC conversion:", selectedDate);
      return null;
    }

    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        22,
        0,
        0
      )
    );
    setSelectedDate(utcDate.toISOString());
    return utcDate.toISOString();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    checkAvailability(date);
    setValue(date);
  };

  const handleUploadedImg = (e) => {
    const files = Array.from(e.target.files);
    const newUploadedImages = files.map((file) => URL.createObjectURL(file));

    setUploadedImg((prevImages) => [...prevImages, ...files]);
    setPreviewImage((prevPreviews) => [...prevPreviews, ...newUploadedImages]);
  };

  const hourlyRate = state?.hourlyPrice;
  const bookingType = state?.priceType;
  const subscriptionPlan = state?.subscriptionPlan;

  const todayDate = new Date();

  // const handleBookAppointment = async (data) => {
  //   console.log(data, "======================+++++");

  //   if (!valueT && subscriptionPlan === "platinum_plan") {
  //     openModal();
  //     console.error("Please select a payment method before booking.");
  //     return;
  //   }

  //   if (valueT !== null) {
  //     const { startTime, endTime } = data;

  //     console.log(data, "Data from handleBookAppointment");
  //     if (!data.startTime || !data.endTime) {
  //       console.error("Start time or end time is invalid");
  //       return;
  //     }

  //     if (startTime >= endTime) {
  //       console.log(
  //         "Invalid booking slot: End time must be after the start time."
  //       );
  //       return;
  //     }

  //     const utcStartTime = convertToUtc(selectedDate, startTime);
  //     const utcEndTime = convertToUtc(selectedDate, endTime);

  //     const utcTotalHour = getDifference(utcStartTime, utcEndTime);
  //     const totalAmount = calculateTotalAmount(utcTotalHour);

  //     const formData = new FormData();
  //     formData.append("userId", state?.userId);
  //     formData.append("currentUtcTime", new Date().toISOString());
  //     formData.append("utcOpeningTime", utcStartTime);
  //     formData.append("utcClosingTime", utcEndTime);
  //     formData.append("services", servicesString);
  //     formData.append("totalHour", utcTotalHour);
  //     formData.append("totalAmount", totalAmount);
  //     formData.append("bookingType", bookingType);
  //     formData.append("bookingPaymentType", valueT ? valueT : "2");
  //     uploadedImg.forEach((file) => {
  //       formData.append("Images", file);
  //     });

  //     try {
  //       const res = await customerBookAppointment(formData);
  //       console.log(res, "book appointment res");
  //       navigate("/home");
  //       toast.success(res?.data?.message);
  //       closeModal();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  const handleBookAppointment = async (data) => {
    console.log(data, "======================+++++");
  
 
    if (subscriptionPlan === "platinum_plan") {
      if (!valueT) {
        openModal();
        console.error("Please select a payment method before booking.");
        return;
      }
    } 
  
    // if (valueT !== null) {
      const { startTime, endTime } = data;
  
      console.log(data, "Data from handleBookAppointment");
      if (!startTime || !endTime) {
        console.error("Start time or end time is invalid");
        return;
      }
  
      if (startTime >= endTime) {
        console.log(
          "Invalid booking slot: End time must be after the start time."
        );
        return;
      }
  
      const utcStartTime = convertToUtc(selectedDate, startTime);
      const utcEndTime = convertToUtc(selectedDate, endTime);
  
      const utcTotalHour = getDifference(utcStartTime, utcEndTime);
      const totalAmount = calculateTotalAmount(utcTotalHour);
  
      const formData = new FormData();
      formData.append("userId", state?.userId);
      formData.append("currentUtcTime", new Date().toISOString());
      formData.append("utcOpeningTime", utcStartTime);
      formData.append("utcClosingTime", utcEndTime);
      formData.append("services", servicesString);
      formData.append("totalHour", utcTotalHour);
      formData.append("totalAmount", totalAmount);
      formData.append("bookingType", bookingType);
      formData.append("bookingPaymentType", valueT ? valueT : "2" );
      uploadedImg.forEach((file) => {
        formData.append("Images", file);
      });
  
      try {
        const res = await customerBookAppointment(formData);
        console.log(res, "book appointment res");
        navigate("/home");
        toast.success(res?.data?.message);
        closeModal();
      } catch (err) {
        console.log(err);
      }
    // }
  };
  
  function convertToUtc(selectedDate, localTime) {
    if (!localTime) {
      console.error("localTime is undefined or null");
      return "Invalid Time";
    }

    const [hours, minutes] = localTime.split(":").map(Number);

    const localDateTime = new Date(selectedDate);
    localDateTime.setHours(hours);
    localDateTime.setMinutes(minutes);
    localDateTime.setSeconds(0);

    const utcDateTime = localDateTime.toISOString();
    console.log(utcDateTime, "utcDateTime");

    return utcDateTime;
  }
  // function convertToUtc(selectedDate, localTime) {
  //   if (!localTime) {
  //     console.error("localTime is undefined or null");
  //     return "Invalid Time";
  //   }
  
    
  //   const [hours, minutes] = localTime.split(":").map(Number);
  
   
  //   const localDateTime = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth(),
  //     selectedDate.getDate(),
  //     hours,
  //     minutes,
  //     0
  //   );
  
    
  //   const utcHours = localDateTime.getUTCHours();
  //   const utcMinutes = localDateTime.getUTCMinutes();
  //   const utcDateTime = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth(),
  //     selectedDate.getDate(),
  //     utcHours,
  //     utcMinutes,
  //     0
  //   ).toISOString();
  
  //   console.log(utcDateTime, "utcDateTime");
  
  //   return utcDateTime;
  // }
  
  function getDifference(startTime, endTime) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const differenceInMilliseconds = endDate - startDate;
    const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} hrs`;
  }

  function calculateTotalAmount(utcTotalHour) {
    const [hours, minutesWithHrs] = utcTotalHour.split(":");
    const minutes = parseInt(minutesWithHrs, 10);
    const totalHours = parseInt(hours, 10) + minutes / 60;
    const totalAmount = (totalHours * hourlyRate).toFixed(2);
    return totalAmount;
  }

  const updateTotalHoursAndAmount = () => {
    const startTime = getValues("startTime");
    const endTime = getValues("endTime");

    if (startTime && endTime) {
      const utcStartTime = convertToUtc(selectedDate, startTime);
      const utcEndTime = convertToUtc(selectedDate, endTime);

      const utcTotalHour = getDifference(utcStartTime, utcEndTime);
      setTotalHours(utcTotalHour);

      const totalAmount = calculateTotalAmount(utcTotalHour);
      setTotalAmount(totalAmount);
    }
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_two />

        <section className="">
          <div className="py-5 md:py-20 px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 pt-10 gap-10">
                <div className="col-span-2 lg:col-span-1">
                  <div className="shadow-md rounded-lg p-8  mx-auto bg-white">
                    <Calendar
                      onChange={handleDateChange}
                      value={value}
                      tileContent={tileContent}
                      className="w-full"
                      minDate={todayDate}
                    />

                    {bookedSlot?.map((item, index) => (
                      <p key={index}>
                        Slots are booked from{" "}
                        {moment
                          .utc(item?.openingTime)
                          .tz(userTimeZone)
                          .format("h:mm A")}{" "}
                        -{" "}
                        {moment
                          .utc(item?.closingTime)
                          .tz(userTimeZone)
                          .format("h:mm A")}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <div className="item shadow-md rounded-lg py-8 mx-auto bg-white">
                    <form>
                      {selectedAvailability ? (
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-4">
                            <div className="flex gap-3 justify-center border-b-4 border-[#F7F7F7] pb-8">
                              <div className="hd">
                                <h3 className="text-4xl font-semibold">
                                  {selectedAvailability?.day}
                                </h3>
                              </div>
                              <div className="desc">
                                <p className="text-sm">
                                  {selectedAvailability?.month},{" "}
                                  {selectedAvailability?.year}{" "}
                                  <span>{selectedAvailability?.weekday}</span>
                                </p>
                                <p className="font-bold text-sm">
                                  {moment
                                    .utc(selectedAvailability?.openingTime)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}{" "}
                                  TO{" "}
                                  {moment
                                    .utc(selectedAvailability?.closingTime)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2 ps-8">
                            <label htmlFor="startTime" className="font-bold">
                              Start time
                            </label>
                            <input
                              type="time"
                              {...register("startTime", {
                                onChange: (e) => {
                                  e.preventDefault(); 
                                  updateTotalHoursAndAmount(); 
                                },
                              })}
                              className="w-full outline-0 mt-2 bg-[#f3f1f1] p-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                            />
                            {errors.startTime && (
                              <p className="text-red-500">
                                {errors.startTime.message}
                              </p>
                            )}
                          </div>

                            <div className="col-span-2 pe-8">
                              <label htmlFor="endTime" className="font-bold">
                                End time
                              </label>
                              <input
                                type="time"
                                {...register("endTime", {
                                  onChange: (e) => {
                                    e.preventDefault();
                                    updateTotalHoursAndAmount(); 
                                  },
                                })}
                                className="w-full outline-0 mt-2 bg-[#f3f1f1] p-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                              />
                              {errors.endTime && (
                                <p className="text-red-500">
                                  {errors.endTime.message}
                                </p>
                              )}
                            </div>

                          <div className="border-b-4 border-[#F7F7F7] col-span-4 py-2"></div>

                          <div className="col-span-4 px-8">
                            <label
                              htmlFor="customService"
                              className="font-bold"
                            >
                              Custom Service
                            </label>
                            <div className="flex gap-2 mt-2">
                              <input
                                type="text"
                                value={customServiceInput}
                                onChange={handleCustomServiceInput}
                                className="w-full outline-0  bg-[#f3f1f1] py-4 px-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                                placeholder="Enter custom service"
                              />
                              <button
                                type="button"
                                onClick={handleAddCustomService}
                                className="bg-dark_link text-white py- px-4 rounded-lg"
                              >
                                Add
                              </button>
                            </div>

                           
                              <div className="mt-4">
                                {customServices.map((service, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between"
                                  >
                                    <p>{service}</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeCustomService(service)
                                      }
                                      className="text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                          <div className="col-span-4 px-8">
                            <label htmlFor="services" className="font-bold">
                              Select service
                            </label>
                            {errors.services && (
                              <p>{errors.services.message}</p>
                            )}
                            <div className="bg-[#f3f1f1] p-4 rounded-lg shadow-sm w-full space-y-2 mt-2">
                              {state?.services.map((service, index) => (
                                <div className="flex" key={index}>
                                  <div className="flex items-center ">
                                    <input
                                      type="checkbox"
                                      id={`service-${index}`}
                                      className="mr-2"
                                      value={service}
                                      onChange={() =>
                                        handleCheckboxChange(service)
                                      }
                                    />
                                    <label htmlFor={`service-${index}`}>
                                      {service}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-b-4 border-[#F7F7F7] col-span-4 py-2"></div>

                          <div className="col-span-4 px-8">
                            <div className="inp_pro relative mt-5 mb-10 size-48 mx-auto flex flex-wrap justify-center">
                              <div className="btn absolute text-text_dark w-full font-bold flex flex-wrap items-end justify-center">
                                <Controller
                                  name="profileImage"
                                  control={control}
                                  render={({
                                    field: { value, onChange, ...field },
                                  }) => (
                                    <input
                                      {...field}
                                      className="absolute top-0 start-0 end-0 bottom-0 opacity-0 cursor-pointer "
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        onChange(e.target.files);
                                        handleUploadedImg(e);
                                      }}
                                      multiple
                                      value={value?.fileName}
                                    />
                                  )}
                                />

                                  <div>Upload image</div>
                                  <div className="image-preview flex flex-wrap">
                                    {previewImage.map((img, index) => (
                                      <img
                                        key={index}
                                        src={img}
                                        alt={`Preview ${index + 1}`}
                                        className="w-24 h-24 m-1"
                                      />
                                    ))}
                                    <p className="text-red-500 font-light text-sm mb-2 flex justify-center ">
                                      {errors.profileImage?.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {totalHours && totalAmount && (
                                <div>
                                  <h6 className="font-bold">Receipt</h6>
                                  <h5 className="flex items-center justify-between">
                                    Total Time: {totalHours || "00:00"}
                                    <span>${hourlyRate}/Per Hour</span>
                                  </h5>
                                  <h5 className="font-bold flex items-center justify-between pb-3">
                                    Total Price <span>${totalAmount || "0"}</span>
                                  </h5>
                                </div>)}
                              <button
                                // disabled={!valueT}
                                onClick={handleSubmit(handleBookAppointment)}
                                className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                              >
                                Confirm Booking
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {availabilityMessage}
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
      
      </section>

        <Footer_two />
        <JobPayment
          isOpen={isOpen}
          closeModal={closeModal}
          setValueT={setValueT}
          handleBookAppointment={handleBookAppointment}
        />
      </div>
    </>
  );
}

export default Booking_Appointment;
