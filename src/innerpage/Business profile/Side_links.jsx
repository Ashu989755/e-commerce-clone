import { useState, useEffect } from "react";
import { avtar } from "../../assets/image";
import { ChevronRight, FileImage, Lock, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
import Delete_profile from "../../modals/Delete_profile";
import { logout } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { customerProfile } from "../../apis/customer/profile";
import { profile_img } from "../../assets/image";
import { updateUser } from "../../redux/reducers/authSlice";


function Side_links() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.authSlice);
 
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState("");
 
const userId = profile?.userId


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUserProfile = async () => {
 
    try {
      const res = await customerProfile();
      setProfile(res?.data?.data);
       const userData = res.data.data;
      dispatch(
        updateUser({
          user: { ...userData },
        })
      );
     } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUserProfile();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <div className="pro_img size-32 rounded-full overflow-hidden mx-auto mt-5">
            <img
              src={
                user?.image
                  ? user.image
                  : "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
              }
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw";
              }}
            />
          </div>

          <div className="pro_hd text-center">
            <h3 className="font-bold text-xl mt-2">{user?.fullName}</h3>
            <p className="text-main_gray text-sm">{user?.email}</p>
          </div>
          {/* <div>
            <h4 className="text-base font-semibold text-[#303030]">Bio</h4>
            <p className="text-xs text-[#303030]">{user?.bio}</p>
          </div> */}
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business-my-profile">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1586 10.87C12.0586 10.86 11.9386 10.86 11.8286 10.87C9.44859 10.79 7.55859 8.84 7.55859 6.44C7.55859 3.99 9.53859 2 11.9986 2C14.4486 2 16.4386 3.99 16.4386 6.44C16.4286 8.84 14.5386 10.79 12.1586 10.87Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.15875 14.56C4.73875 16.18 4.73875 18.82 7.15875 20.43C9.90875 22.27 14.4188 22.27 17.1688 20.43C19.5888 18.81 19.5888 16.17 17.1688 14.56C14.4288 12.73 9.91875 12.73 7.15875 14.56Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Personal Information</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business-Edit-Services">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.0008 22H16.0008C20.0208 22 20.7408 20.39 20.9508 18.43L21.7008 10.43C21.9708 7.99 21.2708 6 17.0008 6H7.0008C2.7308 6 2.0308 7.99 2.3008 10.43L3.0508 18.43C3.2608 20.39 3.9808 22 8.0008 22Z"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.61914 11.2695C4.86914 12.8095 7.40914 13.7395 9.99914 14.0295"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Services</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business/create-documents">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 13H12"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 17H16"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p className="font-medium">Create Documents</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business-Edit-Availability">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4V7"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18 4V7"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 11.0898H22.5"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M23 10.5V19C23 22 21.5 24 18 24H10C6.5 24 5 22 5 19V10.5C5 7.5 6.5 5.5 10 5.5H18C21.5 5.5 23 7.5 23 10.5Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.9945 15.7002H14.0035"
                      stroke="#3C3C3C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.2953 15.7002H10.3043"
                      stroke="#3C3C3C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.2953 18.7002H10.3043"
                      stroke="#3C3C3C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Availability</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business-change-password">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12V10C8 6.69 9 4 14 4C19 4 20 6.69 20 10V12"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 20.5C15.3807 20.5 16.5 19.3807 16.5 18C16.5 16.6193 15.3807 15.5 14 15.5C12.6193 15.5 11.5 16.6193 11.5 18C11.5 19.3807 12.6193 20.5 14 20.5Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 24H9C5 24 4 23 4 19V17C4 13 5 12 9 12H19C23 12 24 13 24 17V19C24 23 23 24 19 24Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Change Password</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/business-change-address">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 10.9995V16.9995C24 19.4995 23.5 21.2495 22.38 22.3795L16 15.9995L23.73 8.26953C23.91 9.05953 24 9.95953 24 10.9995Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M23.73 8.27L8.26999 23.73C5.25999 23.04 4 20.96 4 17V11C4 6 6 4 11 4H17C20.96 4 23.04 5.26 23.73 8.27Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.3795 22.38C21.2495 23.5 19.4995 24 16.9995 24H10.9995C9.95954 24 9.05953 23.91 8.26953 23.73L15.9995 16L22.3795 22.38Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.23929 9.97973C8.91929 7.04973 13.3193 7.04973 13.9993 9.97973C14.3893 11.6997 13.3093 13.1597 12.3593 14.0597C11.6693 14.7197 10.5793 14.7197 9.8793 14.0597C8.9293 13.1597 7.83929 11.6997 8.23929 9.97973Z"
                      stroke="#3C3C3C"
                      stroke-width="1.5"
                    />
                    <path
                      d="M11.0941 10.7002H11.1031"
                      stroke="#3C3C3C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Change Address</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link onClick={openModal}>
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <Trash2 color="#F05151" />
                  <p className="font-medium text-[#F05151]">Delete Account</p>
                  <div className="ms-auto">
                    <ChevronRight color="#F05151" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="my_pro border shadow-md bg-white rounded-xl p-5 hover:shadow-lg">
          <Link to="/">
            <div className="grid grid-cols-2">
              <div onClick={handleLogout} className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4404 14.62L20.0004 12.06L17.4404 9.5"
                      stroke="#F05151"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.75977 12.0601H19.9298"
                      stroke="#F05151"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"
                      stroke="#F05151"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="font-medium text-[#F05151]">Logout</p>
                  <div className="ms-auto">
                    <ChevronRight color="#F05151" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Delete_profile isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Side_links;
