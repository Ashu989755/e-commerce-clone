import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer_two from "../layout/Footer_two";
import Header_Business from "../layout/Header_business";
import { InfoIcon, UserIcon } from "../../assets/image";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { personalInfoValidator } from "../../helpers/validation";
import { businessPersonalProfile } from "../../apis/business/Profile";
import { updateUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import Header_Track from "./Header_Track";

const BusinessPersonalInfo = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInfoValidator),

  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadedImg, setUploadedImg] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Per Hour");
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState();

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

  const handleBusinessProfile = async (data) => {
    if (data.pricePerHour === "Per Hour") {
    }
    try {
      const formData = new FormData();
      formData.append("Fname", data.firstName);
      formData.append("Lname", data.lastName);
      formData.append("PriceType", selectedOption === "Per Hour" ? "0" : "1");
      formData.append("ContactNumber", phoneValue);
      formData.append("Experience", data.experience);
      formData.append("driversLicense", data.driversLicense === "1" ? true : false);
      formData.append("Bio", data.bio);
      if (selectedOption == "Per Hour") {
        formData.append("HourPrice", data.pricePerHour);
      } else {
        formData.append("HourPrice", "");
      }
      if (uploadedImg) {
        formData.append("Image", uploadedImg);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await businessPersonalProfile(formData);
      console.log(res, "response of business register");
      if (res?.data?.success == true) {
        const userData = res?.data?.data;
        console.log(userData, "userData+++++++++++++++");
        dispatch(
          updateUser({
            user: { ...userData },
          })
        );
        navigate("/business/link-account");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header_Business />
      <section className="py-32">
        {/* steps */}
        < Header_Track />
        <div className="ad_crd py-6">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="desc">
                <h3 className="text-xl font-bold text-center text-dark_link">
                  Lets finish setting up your Account
                </h3>
              </div>

              {/* upload img */}
              <div className="inp_pro relative mt-5 mb-4 size-48 mx-auto flex justify-center ">
                <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full
                 overflow-hidden object-contain flex justify-center mx-auto">
                  <img
                    className={`${previewImage ? "" : "d-none"}`}
                    src={previewImage}
                    alt=""
                  />
                </span>
                <button className="btn absolute text-text_dark w-full h-full font-medium flex items-end justify-center  ">
                  Profile Picture
                  <Controller
                    name="profileImage"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <input
                        {...field}
                        className="absolute top-0 start-0 end-0 bottom-0 opacity-0"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files[0]);
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

                <div className="itm mb-4 col-span-2 relative">
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
                </div>
                {/* <p className="text-red-500">{errors.lastName?.message}</p> */}

                <div className="inp mb-4 relative w-full">
                      <PhoneInputWithCountry
                        name="phone"
                        control={control}
                        defaultValue=""
                        onChange={handleChange}
                        // {...register("phone",{required:true})}
                        placeholder="Enter your number"
                        className={`phone-input ${errors.phone ? "input-error" : ""
                          }`} rules={{ required: true }} />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {errors.phone && (
                      <p className="text-red-600 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
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
                       min="0"
                      name="pricePerHour"
                      {...register("pricePerHour")}  
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
                    className="w-full outline-0 bg-[#F7F7
                    F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    {...register("driversLicense")}
                  >
                    <option value="" disabled selected>
                      Driving License
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <p className="text-red-500">{errors.driversLicense?.message}</p>
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
                    Next{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two></Footer_two>
    </>
  );
};

export default BusinessPersonalInfo;
