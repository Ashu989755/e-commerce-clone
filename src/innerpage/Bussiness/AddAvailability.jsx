import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import { Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { businessAddAvailability } from "../../apis/business/Profile";
import { addAvailabilityValidator } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import Header_Track from "./Header_Track";
import { toast } from "react-toastify";

const AddAvailability = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [days, setDays] = useState({
    Monday: { checked: false, startTime: "", endTime: "" },
    Tuesday: { checked: false, startTime: "", endTime: "" },
    Wednesday: { checked: false, startTime: "", endTime: "" },
    Thursday: { checked: false, startTime: "", endTime: "" },
    Friday: { checked: false, startTime: "", endTime: "" },
    Saturday: { checked: false, startTime: "", endTime: "" },
    Sunday: { checked: false, startTime: "", endTime: "" },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAvailabilityValidator),
    defaultValues: { days },
  });

  const handleCheckboxChange = (day) => {
    setDays((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], checked: !prevState[day].checked },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setDays((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], [field]: value },
    }));
  };

  const handleAddAvailability = async (data) => {

    const isAnyDaySelected = Object.values(days).some(dayData => dayData.checked);
    if (!isAnyDaySelected) {
      toast.error("Please select a day."); 
      return; 
    }

    try {
      const apiData = {
        modal: Object.entries(days)
          .filter(([_, dayData]) => dayData.checked) // Only include checked days
          .map(([day, dayData]) => {
            const openingTime = new Date(`1970-01-01T${dayData.startTime}:00`);
            const closingTime = new Date(`1970-01-01T${dayData.endTime}:00`);

            // Check if the time is valid
            if (isNaN(openingTime.getTime()) || isNaN(closingTime.getTime())) {
              setError(`days.${day}.startTime`, {
                type: "manual",
                message: `Invalid time value for ${day}`,
              });
              setError(`days.${day}.endTime`, {
                type: "manual",
                message: `Invalid time value for ${day}`,
              });
              return;
            }

            return {
              dayOfWeek: day,
              openingTime: openingTime.toISOString(),
              closingTime: closingTime.toISOString(),
            };
          }),
      };

      const res = await businessAddAvailability(apiData);
      if (res?.data?.status_code === 201) {
        const userData = res.data.data;
        console.log(userData,"====================")
        dispatch(
          updateUser({
          user: { ...userData},
          })
        );
        navigate("/business-subscription-plan");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Header_Business />
      <section className="py-32">
      < Header_Track />
        <div className="ad_crd py-6">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="desc">
                <h3 className="text-xl font-bold text-center text-dark_link mb-4">
                  Add Availability
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                {Object.keys(days).map((day) => (
                  <div key={day} className="col-span-2 mb-4 flex flex-col gap-4">
                    <div className="bg-white shadow-md rounded-lg p-3">
                      <label className="flex items-center cursor-pointer justify-between">
                        <span className="text-sm font-semibold text-gray text-lg">
                          {day}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={days[day].checked}
                          onChange={() => handleCheckboxChange(day)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-blue after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4D4D4]"></div>
                      </label>
                      <hr className="my-3" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <label className="font-medium text-md text-[#535353]">
                            Starts
                          </label>
                          <Controller
                            control={control}
                            name={`days.${day}.startTime`}
                            render={({ field }) => (
                              <input
                                type="time"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleTimeChange(day, "startTime", e.target.value);
                                }}
                                className={`w-full outline-0 bg-[#F7F7F7] py-4 px-4 mt-3 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm ${
                                  errors?.days?.[day]?.startTime ? "border-red-600" : ""
                                }`}
                              />
                            )}
                          />
                          {errors?.days?.[day]?.startTime && (
                            <p className="text-red-600">
                              {errors.days[day].startTime.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-1">
                          <label className="font-medium text-md text-[#535353]">
                            Ends
                          </label>
                          <Controller
                            control={control}
                            name={`days.${day}.endTime`}
                            render={({ field }) => (
                              <input
                                type="time"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleTimeChange(day, "endTime", e.target.value);
                                }}
                                className={`w-full outline-0 bg-[#F7F7F7] py-4 px-4 mt-3 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm ${
                                  errors?.days?.[day]?.endTime ? "border-red-600" : ""
                                }`}
                              />
                            )}
                          />
                          {errors?.days?.[day]?.endTime && (
                            <p className="text-red-600">
                              {errors.days[day].endTime.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="inp col-span-2 text-center">
                  <button
                    onClick={handleSubmit(handleAddAvailability)}
                    className="w-full bg-dark_link py-4 text-white font-medium rounded-lg flex justify-center"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
    </>
  );
};
export default AddAvailability;
