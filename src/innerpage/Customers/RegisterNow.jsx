import React, { useState } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { useNavigate } from "react-router-dom";
import { registerProfileValidator } from "../../helpers/validation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { customerRegisteration } from "../../apis/customer/authentication";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";


function RegisterNow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerProfileValidator),
  });

  const [uploadedImg, setUploadedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [error, setError] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleUploadedImg(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  }

  // const goToAddress = () => {
  //   navigate("/address");
  // };

  const handleChange = (value) => {
    setPhoneValue(value);
  };

  const handleRegister = async (data) => {
    console.log("clicked");
    try {
      const formData = new FormData();
      formData.append("Fname", data.firstName);
      formData.append("Lname", data.lastName);
      formData.append("ContactNumber", phoneValue);

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
      if (res?.data?.success == true) {
        const userData = res?.data?.data;
        dispatch(
          updateUser({
            user: { ...userData },
          })
        );
        navigate("/address");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Header_two></Header_two>
      <section className="p-3 py-32 relative md:p-20">
        <div className="container mx-auto">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto bg-white">
              <h3 className="text-xl font-bold text-dark_link text-center">
                Lets finish setting up your Account
              </h3>
              {/* upload img */}
              <div className="inp_pro relative mt-5 mb-10 size-48 mx-auto flex justify-center ">
                <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto">
                  <img
                    className={`${previewImg ? "" : "d-none"}`}
                    src={previewImg}
                    alt=""
                  />
                </span>
                <button className="btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center  ">
                  Upload image
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
                    className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="First Name"
                    type="text"
                    name=""
                    id=""
                    {...register("firstName")}
                  />
                </div>
                <p className="text-red-600 mt-1 mb-2  text-sm ">
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
                    className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Last Name"
                    type="text"
                    name=""
                    id=""
                    {...register("lastName")}
                  />
                </div>
                <p className="text-red-600 mt-1 mb-2  text-sm ">
                  {errors.lastName?.message}
                </p>
                <div className="inp mb-4 relative flex justify-between">
                  <div className="w-full">
                    {/* <select
                      id="countries"
                      class="bg-gray-50 h-full border border-gray-300 text-gray-900  rounded-lg focus:shadow-md block w-full border-transparent focus:border-text_dark"
                    >
                      <option disabled>Choose a country</option>
                      <option value="US">US</option>
                      <option value="CA">CA</option>
                      <option value="FR">FR</option>
                      <option value="DE">DE</option>
                    </select> */}
                    <div className="relative ">
                      <PhoneInputWithCountry
                        name="phone"
                        control={control}
                        defaultValue=""
                        
                        defaultCountry="US"
                        onChange={handleChange}
                        // {...register("phone",{required:true})}
                        placeholder="Contact Number"
                        className={`phone-input ${
                          errors.phone ? "input-error" : ""
                        }`}
                        rules={{ required: true }}
                        // Setting default country code to +1
                        showFlags={false} // Disable flag display
                        countryCodeEditable={false} 
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      {errors.phone && (
                        <p className="text-red-600 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* <p className="text-red-600 mt-1 text-sm ">
                  {errors.phoneNumber?.message}
                </p> */}
                <div className="inp mb-4">
                  <button
                    onClick={handleSubmit(handleRegister)}
                    className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                  >
                    Next
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
}

export default RegisterNow;
