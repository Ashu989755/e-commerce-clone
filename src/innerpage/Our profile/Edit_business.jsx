import React, { useState, useEffect } from "react";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import Side_links from "./Side_links";
import { useNavigate } from "react-router-dom";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { customerRegisteration } from "../../apis/customer/authentication";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import { EditProfileValidator } from "../../helpers/validation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit_profile() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProfileValidator),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneInput: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state?.authSlice);
  const isBusiness = location.pathname.includes("business");
  useEffect(() => {
    if (user) {
      setValue("firstName", user.fName || "");
      setValue("lastName", user.lName || "");
      setValue("phoneInput", user.contactNumber || "");
    }
  }, [user, setValue]);

  const [uploadedImg, setUploadedImg] = useState(null);
  const [error, setError] = useState("");
  const [phoneValue, setPhoneValue] = useState(user?.contactNumber || "");
  const [previewImage, setPreviewImage] = useState(null);

  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value) => {
    setPhoneValue(value);

    if (!value || value.length < 10) {
      setError("Phone Number must be at least 10 digits long");
    } else if (value.length > 16) {
      setError("Phone Number must not exceed 16 digits");
    } else {
      setError("");
      const regex = /^\+(\d{1,3})(\d{10,16})$/;
      const match = value.match(regex);
      if (match && match.length === 3) {
        setCountryCode(match[1]);
        setPhoneNumber(match[2]);
      } else {
        setError("Invalid phone number format");
      }
    }
  };

  function handleUploadedImg(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const handleEditProfile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Fname", data.firstName);
      formData.append("Lname", data.lastName);
      formData.append("ContactNumber", phoneValue || user.contactNumber || "");

      if (uploadedImg) {
        formData.append("Image", uploadedImg);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await customerRegisteration(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const userData = res.data.data;

      if (res?.data?.success == true) {
        dispatch(updateUser({ user: userData }));
      }
      // navigate("/business-my-profile")
      
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Header_Business/>
      
      <div className="w-full" >
     <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
     <div className="flex justify-between items-center border-b pb-3 mb-3">
                     <h2 className='text-xl font-bold text-dark_link'>Edit Profile</h2>
                     <Link to='/business-personal-info' className='bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.2603 3.60022L5.05034 12.2902C4.74034 12.6202 4.44034 13.2702 4.38034 13.7202L4.01034 16.9602C3.88034 18.1302 4.72034 18.9302 5.88034 18.7302L9.10034 18.1802C9.55034 18.1002 10.1803 17.7702 10.4903 17.4302L18.7003 8.74022C20.1203 7.24022 20.7603 5.53022 18.5503 3.44022C16.3503 1.37022 14.6803 2.10022 13.2603 3.60022Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.8896 5.0498C12.3196 7.8098 14.5596 9.9198 17.3396 10.1998" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 22H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Edit</Link>
                  </div>
                </h3>
                <div className="inp_pro relative mt-5 mb-10 size-48 mx-auto flex justify-center ">
                  <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto">
                    <img
                      className={`${previewImage ? "" : "d-none"}`}
                      src={previewImage || user?.image}
                      alt="not found"
                    />
                  </span>
                  <button className="btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center">
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
                          defaultValue={user?.Image}
                          value={value?.fileName}
                        />
                      )}
                    />
                  </button>
                </div>

                <p className="text-red-600 mt-1 text-sm ">
                  {errors.profileImage?.message}
                </p>
                <div className="info_frm my-5">
                  <div className="inp mb-4 relative">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg 
                       shadow-sm focus:shadow-md border border-transparent
                     focus:border-text_dark"
                      placeholder="First Name"
                      type="text"
                      name=""
                      id=""
                      {...register("firstName")}
                    />
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                    {errors.firstName?.message}
                  </p>
                  <div className="inp mb-4 relative">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg 
                       shadow-sm focus:shadow-md border border-transparent 
                     focus:border-text_dark"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      id="lastName"
                      {...register("lastName")}
                    />
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                    {errors.lastName?.message}
                  </p>
                  <div className="inp mb-4 relative flex justify-between">
                    <div className="w-1/5">
                      {/* <select id="countries" class="bg-gray-50 px-3 h-full border border-gray-300 text-gray-900  rounded-lg focus:shadow-md block w-full border-transparent focus:border-text_dark">
                      <option disabled>Choose a country</option>
                    <option value="US">US</option>
                    <option value="CA">CA</option>
                    <option value="FR">FR</option>
                    <option value="DE">DE</option>
                    </select> */}
                    </div>

                    <div className="relative w-3/4">
                      <PhoneInputWithCountry
                        name="phoneInput"
                        control={control}
                        defaultValue={user?.contactNumber}
                        value={phoneValue}
                        onChange={handleChange}
                        className={`phone-input ${
                          errors.phoneInput ? "input-error" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div className="inp mb-4 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setValue("firstName", user.fName || "");
                        setValue("lastName", user.lName || "");
                        setValue("phoneInput", user.contactNumber || "");
                      }}
                      className="border border-dark_link px-8 rounded-lg font-medium"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleSubmit(handleEditProfile)}
                      className="bg-dark_link py-4 px-10 text-white font-medium rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              
            </div>
         
      
      

    </>
  );
}

export default Edit_profile;
