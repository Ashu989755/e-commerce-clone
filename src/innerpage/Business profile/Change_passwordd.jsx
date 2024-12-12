import React,{useState} from "react";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import Side_links from "./Side_links";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerChangePassword } from "../../apis/customer/authentication";
import { changePasswordValidator } from "../../helpers/validation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { EyeIcon, EyeSlashIcon, LockIcon } from "../../assets/image";

function Change_password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidator),
  });
  const location = useLocation();
  const navigate = useNavigate();

  const isBusiness = location.pathname.includes("business");
  // Create state to toggle password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (data) => {
    try {
      const apiData = {
        oldPassword: data.oldPassword,
        password: data.password,
      };
      const res = await customerChangePassword(apiData);
      if (res?.data?.success == true) {
        toast.success(res?.data?.message);

        navigate("/business-my-profile");
      } else {
        toast.error(res?.data?.message);
      }
    } catch {
      console.log("error");
    }
  };

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
            <div className="lg:col-span-2 col-span-5">
              <Side_links></Side_links>
            </div>
            <div className="lg:col-span-3 col-span-5">
              <div className="my_pro border border-gray-100 shadow-md rounded-xl p-5 bg-white">
                <h3 className="text-lg font-bold">Change Password</h3>
                <p className="mb-3">
                  Your new password must be unique from those previously used
                </p>
                <hr />

                {/* Old Password Field */}
                <div className="inp mt-5 relative">
                  <span className="absolute left-3 top-[18px] flex items-center ">
                    <img src={LockIcon} alt="" />
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Old Password"
                    type={showOldPassword ? "text" : "password"} // Toggle input type
                    {...register("oldPassword")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-3.5  flex items-center cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <img src={EyeIcon}  className="h-8 w-8"/>
                    ) : (
                      <img src={EyeSlashIcon}  className="h-8 w-8"/>
                    )}
                  </span>
                  <p className="text-red-600 mt-2 text-sm">
                    {errors.oldPassword?.message}
                  </p>
                </div>
               

                {/* New Password Field */}
                <div className="inp my-5 relative">
                  <span className="absolute left-3 top-[18px] flex items-center ">
                  <img src={LockIcon} alt="" />
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"} // Toggle input type
                    {...register("password")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-3.5  flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <img src={EyeIcon}  className="h-8 w-8"/>
                    ) : (
                      <img src={EyeSlashIcon}  className="h-8 w-8"/>
                    )}
                  </span>
                  <p className="text-red-600 mt-2 text-sm">
                    {errors.password?.message}
                  </p>
                </div>
                

                {/* Confirm Password Field */}
                <div className="inp mb-5 relative">
                  <span className="absolute left-3 top-[18px] flex items-center ">
                  <img src={LockIcon} alt="" />
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} // Toggle input type
                    {...register("confirmPassword")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-3.5  flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <img src={EyeIcon}  className="h-8 w-8"/>
                    ) : (
                      <img src={EyeSlashIcon}  className="h-8 w-8"/>
                    )}
                  </span>
                  <p className="text-red-600 mt-2 text-sm">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
                

                <div className="text-end">
                  <button
                    onClick={handleSubmit(handleChangePassword)}
                    className="bg-text_dark px-10 py-3 rounded-lg text-white"
                  >
                    Change
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

export default Change_password;
