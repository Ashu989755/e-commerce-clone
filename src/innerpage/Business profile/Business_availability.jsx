import React, { useEffect, useState } from "react";
import Header_Business from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import Side_links from "./Side_links";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Business_availability = () => {
  const [value, setValue] = useState(new Date());

  // Getting availabilityList from Redux store
  const { availabilityList } = useSelector((state) => state?.authSlice?.user);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  const { state } = useLocation();
  console.log(state, "state");


  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayOfTheWeek = date.toLocaleString("default", { weekday: "long" });
      const isAvailable = availabilityList.some((slot) => {
        return slot.dayOfTheWeek === dayOfTheWeek;
      });

      if (isAvailable) {
      
        return (
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 bg-black rounded-full mt-0.5"></div>
          </div>
        );
      }
    }
    return null;
  };

  // const checkAvailability = (selectedDate) => {
  //   const dayOfTheWeek = selectedDate.toLocaleString("default", {
  //     weekday: "long",
  //   });

  //   const availableSlot = availabilityList.find(
  //     (slot) => slot.dayOfTheWeek === dayOfTheWeek
  //   );

  //   if (availableSlot) {
  //     setSelectedAvailability({
  //       day: selectedDate.getDate(),
  //       month: selectedDate.toLocaleString("default", { month: "long" }),
  //       year: selectedDate.getFullYear(),
  //       weekday: selectedDate.toLocaleString("default", { weekday: "long" }),
  //       openingTime: new Date(availableSlot.openingTime).toLocaleTimeString(
  //         [],
  //         { hour: "2-digit", minute: "2-digit" }
  //       ),
  //       closingTime: new Date(availableSlot.closingTime).toLocaleTimeString(
  //         [],
  //         { hour: "2-digit", minute: "2-digit" }
  //       ),
  //     });
  //     setAvailabilityMessage("");

  //     const apiData = {
  //       businessUserId: state?.userId,
  //       utcDateTime: getUtcDateTimeWithStaticTime(selectedDate),
  //     };
  //     try {
  //       const res = customerBusinessBookedSlot(apiData);
  //       console.log(res, "res");
  //       toast.success("Slot booked successfully");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     setSelectedAvailability(null);
  //     setAvailabilityMessage("User not available");
  //   }
  // };

  // useEffect(() => {
  //   checkAvailability(new Date());
  // }, [availabilityList]);

  const handleDateChange = async (selectedDate) => {
    setValue(selectedDate);
    checkAvailability(selectedDate);
  };

  const todayDate = new Date();

  return (
    <>
      <Header_Business />
      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                My Profile
              </h3>
              <p className="text-center text-white pt-3">
                Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida
                condimentum.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-5 lg:col-span-2">
              <Side_links />
            </div>
            <div className="col-span-5 lg:col-span-3">
              <div className="my_pro border border-gray-100 shadow-md rounded-xl p-5 bg-white">
                <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
                  Availability
                </h3>
                <div className="py-10">
                  <div className="col-span-1">
                    <Calendar
                      onChange={handleDateChange}
                      value={value}
                      tileContent={tileContent}
                      className="!w-full"
                      minDate={todayDate}
                    />
                  </div>
                </div>
                <Link to="/business-edit-availability-status">
                  <div className="flex justify-center items-center">
                    <button className=" bg-dark_link py-4 px-10 text-white font-medium rounded-lg flex justify-center">
                      Edit Availability
                    </button>
                  </div>
                </Link>

                
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
    </>
  );
};

export default Business_availability;
