import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer_two from "../layout/Footer_two";
import Header_Business from "../layout/Header_business";
import { InfoIcon, UserIcon } from "../../assets/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { personalInfoValidatorr } from "../../helpers/validation";
import { businessPersonalProfile } from "../../apis/business/Profile";
import { updateUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import Side_links from "./Side_links";
import { useSelector } from "react-redux";
import { customerProfile } from "../../apis/customer/profile";
import { toast } from "react-toastify";

const Edit_BusinessPersonalInfo = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInfoValidatorr),
  });
  const { user } = useSelector((state) => state?.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadedImg, setUploadedImg] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption, "=======");
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (user) {
      setValue("firstName", user.fName || "");
      setValue("lastName", user.lName || "");
      // if (user.priceType === 1) {
      //   setSelectedOption("Fixed");
      //   setValue("PriceType", "Fixed");
      // } else {
      //   setSelectedOption("Per Hour");
      //   setValue("PriceType", "Per Hour");
      // }
    }

    setValue("experience", user.experience || "");
    setValue("driversLicense", user.isDrivingLicence ? "1" : "0");
    // setValue("pricePerHour", user.hourlyPrice || "");
    setValue("bio", user.bio || "");
  }, [user, setValue]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function handleUploadedImg(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const handleChange = (value) => {
    setPhoneValue(value);
  };

  const handleUserProfile = async () => {
    try {
      const res = await customerProfile();
      const fetchedProfile = res?.data?.data;
      setProfile(fetchedProfile);
      if (fetchedProfile) {
        setValue("pricePerHour", fetchedProfile.hourlyPrice || "");
        if (fetchedProfile.priceType === 1) {
          setSelectedOption("Fixed");
          setValue("PriceType", "Fixed");
        } else {
          setSelectedOption("Per Hour");
          setValue("PriceType", "Per Hour");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleBusinessProfile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Fname", data.firstName);
      formData.append("Lname", data.lastName);
      formData.append("PriceType", selectedOption === "Per Hour" ? "0" : "1");
      formData.append("ContactNumber", phoneValue || user.contactNumber || "");
      formData.append("Experience", data.experience);
      formData.append(
        "isDrivingLicence",
        data.driversLicense === "1" ? true : false
      );
      formData.append("Bio", data.bio);

      if (selectedOption === "Per Hour") {
        formData.append("HourPrice", data.pricePerHour);
      } else {
        formData.append("HourPrice", ""); // No hourly price when "Fixed" is selected
      }

      if (uploadedImg) {
        formData.append("Image", uploadedImg);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await businessPersonalProfile(formData);
      if (res?.data?.success === true) {
        const userData = res?.data?.data;
        dispatch(
          updateUser({
            user: { ...userData },
          })
        );
        handleUserProfile();
        toast.success("Profile Updated successfully");
        // navigate("/business/link-account");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header_Business />


      <section className="">
        {/* upload img */}
        <div className="inp_pro relative mt-5 mb-4 size-48 mx-auto flex justify-center ">
          <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden flex justify-center mx-auto">
            <img
              className={`${
                previewImage ? "" : "d-none w-full h-full object-cover"
              }`}
              src={previewImage || user?.image}
              alt=""
            />
          </span>
          <button className="btn absolute text-text_dark w-full h-full font-medium flex items-end justify-center  ">
            Profile Picture
            <Controller
              name="profileImage"
              control={control}
              defaultValue={user?.image}
              render={({ field: { value, onChange, ...field } }) => (
                <input
                  {...field}
                  className="absolute top-0 start-0 end-0 bottom-0 opacity-0"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    onChange(file);
                    handleUploadedImg(e);
                  }}
                  value={value?.fileName}
                />
              )}
            />
          </button>
        </div>
        <p className="text-red-600 text-sm mb-2 flex justify-center ">
          {errors.profileImage?.message}
        </p>


        <div className="grid grid-cols-2 gap-x-4">
          <div className="itm mb-4 col-span-2 relative">
            <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
              <img src={UserIcon} alt="" className="w-6 h-6" />
            </span>
            <input
              className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
              placeholder="First name"
              type="text"
              name="firstName"
              id=""
              {...register("firstName")}
            />
          </div>
          <p className="text-red-500">{errors.firstName?.message}</p>

          <div className="itm mb-4 col-span-2 relative ">
            <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
              <img src={UserIcon} alt="" className="w-6 h-6" />
            </span>
            <input
              className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
              placeholder="Last  Name"
              type="text"
              name="lastName"
              id=""
              {...register("lastName")}
            />
            <p className="text-red-500">{errors.lastName?.message}</p>
          </div>

          <div className="inp mb-4 relative flex justify-between col-span-2">
            <div className="w-full">
              <div className="relative ">
                <PhoneInputWithCountry
                  name="phone"
                  control={control}
                  defaultValue={user?.contactNumber}
                  onChange={handleChange}
                  // {...register("phone",{required:true})}
                  placeholder="Enter your number"
                  className={`phone-input ${errors.phone ? "input-error" : ""}`}
                  rules={{ required: true }}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 mb-4">
            <label htmlFor="" className="flex gap-2 mb-3">
              Set Price
              <span>
                <img src={InfoIcon} alt="" />
              </span>
            </label>
            <ul class="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="hosting-small"
                  name="pricing"
                  value="Per Hour"
                  class="hidden peer"
                  checked={selectedOption == "Per Hour"}
                  onChange={handleOptionChange}
                  required
                />
                <label
                  for="hosting-small"
                  class="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100"
                >
                  <div class="block ">
                    <div class="w-full text-md font-medium">Per Hour</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big"
                  name="pricing"
                  value="Fixed"
                  class="hidden peer"
                  checked={selectedOption == "Fixed"}
                  onChange={handleOptionChange}
                />
                <label
                  for="hosting-big"
                  class="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:text-gray-600"
                >
                  <div class="block">
                    <div class="w-full text-md font-medium">Fixed</div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          {selectedOption === "Per Hour" && (
            <div className="itm mb-4 col-span-2 relative">
              <input
                className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                placeholder="Price Per Hour"
                type="number"
                name="pricePerHour"
                min="0"
                {...register("pricePerHour", {
                  // Conditionally register pricePerHour field
                  required:
                    selectedOption === "Per Hour"
                      ? "Price per hour is required"
                      : false,
                  min: {
                    value: 1,
                    message: "Price per hour is required",
                  },
                })}
              />
              {errors.pricePerHour && (
                <p className="text-red-600 text-sm">
                  {errors.pricePerHour.message}
                </p>
              )}
            </div>
          )}

          <div className="itm mb-4 col-span-2">
            <select
              name="experience"
              id=""
              className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
              {...register("experience")}
            >
              <option value="" disabled selected>
                Experience
              </option>
              <option value="1">1 Year</option>
              <option value="2">2 Year</option>
              <option value="3">3 Year</option>
              <option value="4">4 Year</option>
              <option value="5">5 Year</option>
              <option value="6">6 Year</option>
              <option value="7">7 Year</option>
              <option value="7+">7+ Year</option>
            </select>
            <p className="text-red-500 mt-1">{errors.experience?.message}</p>
          </div>

          <div className="itm mb-4 col-span-2">
            <select
              name="driversLicense"
              id=""
              className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
              {...register("driversLicense")}
              defaultValue={user?.isDrivingLicence}
            >
              <option value="" disabled selected>
                Driving License
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <p className="text-red-500 mt-1">
              {errors.driversLicense?.message}
            </p>{" "}
          </div>

          <div className="itm mb-4 col-span-2">
            <textarea
              name=""
              id=""
              rows="5"
              placeholder="Add Bio"
              className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
              {...register("bio")}
            ></textarea>
            <p className="text-red-500">{errors.bio?.message}</p>{" "}
          </div>


          <div className="inp col-span-2 text-center">
            <button
              type="submit"
              onClick={handleSubmit(handleBusinessProfile)}
              className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
            >
              {" "}
              Update{" "}
            </button>

          </div>
        </div>
      </section>
      {/* <Footer_two></Footer_two> */}
    </>
  );
};

export default Edit_BusinessPersonalInfo;
