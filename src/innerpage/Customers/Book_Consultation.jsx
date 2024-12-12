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
import * as Yup from "yup";
import { customerRegisteration } from "../../apis/customer/authentication";
import { bookConsultationValidator } from "../../helpers/validation";
import moment from 'moment-timezone';
import JobPayment from "../../modals/JobPayment";

function Book_Consultation() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookConsultationValidator),
    defaultValues: {
      defaultValues: {
        startTime: "",
        endTime: "",
        services: [],
      },
    },
  });

  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [valueT, setValueT] = useState(null);




  const openModal = (e) => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { state } = useLocation();
  const subscriptionPlan = state?.subscriptionPlan;

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

  const checkAvailability = (selectedDate) => {
   
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
        closingTime: availableSlot.closingTime

      });
      setAvailabilityMessage("");
      const apiData = {
        businessUserId: state?.userId,
        utcDateTime: getUtcDateTimeWithStaticTime(selectedDate),
      };
      try {
        const res = customerBusinessBookedSlot(apiData);
        console.log(res, "res");
        // toast.success("Slot booked successfully");
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

  const handleDateChange = async (selectedDate) => {
    setValue(selectedDate);
    checkAvailability(selectedDate);
  };
  // function convertToUtc(selectedDate, localTime) {
  //   if (!localTime) {
  //     console.error("localTime is undefined or null");
  //     return "Invalid Time";
  //   }


  //   const [time, modifier] = localTime.split(" ");
  //   let [hours, minutes] = time.split(":").map(Number);

  //   if (modifier === "PM" && hours < 12) {
  //     hours += 12;
  //   }
  //   if (modifier === "AM" && hours === 12) {
  //     hours = 0;
  //   }

  //   const localDateTime = new Date(selectedDate);
  //   localDateTime.setHours(hours);
  //   localDateTime.setMinutes(minutes);


  //   const utcDate = new Date(localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000);

  //   console.log(utcDate.toISOString(), "utcDate.toISOString()");
  //   return utcDate.toISOString();
  // }



  const hourlyRate = state?.hourlyPrice;
  const bookingType = state?.priceType;


  const todayDate = new Date();

  const handleBookAppointment = async (data) => {

    if (subscriptionPlan === "platinum_plan") {
      if (!valueT) {
        openModal();
        console.error("Please select a payment method before booking.");
        return;
      }
    } 
  
    const { startTime } = data;
    const selectedDateTime = selectedDate ? new Date(selectedDate) : new Date();

    
    const [hours, minutes] = startTime.split(':');
    selectedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    const formData = new FormData();
    formData.append("userId", state?.userId);
    formData.append("utcOpeningTime", data.startTime);
    formData.append("Description", data.description);
    formData.append("bookingType", bookingType);
    formData.append("bookingPaymentType", valueT ? valueT : "2" );
    const bookingDate = new Date(selectedDateTime);
    bookingDate.setUTCHours(0, 0, 0, 0);
    formData.append("BookingDate", selectedDate);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await customerBookAppointment(formData);
      console.log(res, "book appointment res");
      toast.success(res?.data?.message);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };






  return (
    <>
      <Header_two />
      <section className="bg-[#F7F7F7] min-h-screen">
        <div className="py-20 px-20">
          <div className="container mx-auto pt-5">
            <div className="grid grid-cols-2 py-10">
              <div className="col-span-1">
                <div className="react-calendar !w-full">
                  <Calendar
                    onChange={handleDateChange}
                    value={value}
                    tileContent={tileContent}
                    className="!w-full "
                    minDate={todayDate}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="item shadow-2xl rounded-2xl p-8 max-w-[500px] w-[90%] mx-auto">
                  <form>
                    {selectedAvailability ? (
                      <div className="grid grid-cols-4 gap-4 ">
                        <div className="col-span-4">
                          <div className="flex gap-3">
                            <div className="hd">
                              <h3 className="text-5xl font-bold">
                                {selectedAvailability?.day}
                              </h3>
                            </div>
                            <div className="desc">
                              <p>
                                {selectedAvailability?.month},{" "}
                                {selectedAvailability?.year}{" "}
                                <span>{selectedAvailability?.weekday}</span>
                              </p>
                              <p className="font-bold">
                                {moment.utc(selectedAvailability?.openingTime).tz('Asia/Kolkata').format('h:mm A')}
                                TO{" "}
                                {moment.utc(selectedAvailability?.closingTime).tz('Asia/Kolkata').format('h:mm A')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-row-2 gap-4 mt-9">
                          <div className="col-sm-1">
                            <label className="font-bold">Select time</label>
                            <input
                              type="time"
                              name="startTime"
                              {...register("startTime")}
                              className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg shadow-sm focus:shadow-md 
                    border border-transparent focus:border-text_dark"
                            />
                          </div>
                          {errors.startTime && (
                            <p className="text-red-500">
                              {errors.startTime.message}
                            </p>
                          )}
                          <div className="col-sm-1">
                            <label className="font-bold">Description</label>
                            <textarea
                              className="bg-[#f3f1f1] px-5 py-4 w-full rounded-xl drop-shadow-sm outline-0 border
               border-transparent focus:border-dark_link text-sm min-h-40"
                              placeholder="Message"
                              {...register("description")}
                            ></textarea>
                            {errors.description && (
                              <p className="text-red-500">
                                {errors.description.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <button
                              onClick={handleSubmit(handleBookAppointment)}
                              className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                            >
                              Book Now
                            </button>
                          </div>
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
      </section>
      <Footer_two />
      <JobPayment
        isOpen={isOpen}
        closeModal={closeModal}
        setValueT={setValueT}
        handleBookAppointment={handleBookAppointment}
      />
    </>
  );
}

export default Book_Consultation;
