import { useState } from "react";
import { avtar } from "../../assets/image";
import { ChevronRight, FileImage, Lock, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Delete_profile from "../../modals/Delete_profile";
import { logout } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Side_links() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.authSlice);
  
  const location = useLocation();
  console.log(location)
  const isBusiness = location.pathname.includes("business");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token")
    navigate("/");
  };
  const userId = user?.userId
  console.log(userId)
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
      <div className="my_pro border shadow-md bg-white rounded-xl p-5 mb-5 hover:shadow-lg">
        <div className="pro_img size-32 rounded-full overflow-hidden mx-auto mt-5">
          {user?.image ? (
            <img src={user?.image} alt="not found" className="w-full h-full" />
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" fill="white" />
              <path
                d="M39.916 45.3335C42.8993 45.3335 45.3327 42.9002 45.3327 39.9168C45.3327 34.6335 41.0327 30.3335 35.7493 30.3335H28.2493C22.966 30.3335 18.666 34.6335 18.666 39.9168C18.666 42.9002 21.0993 45.3335 24.0827 45.3335H39.916Z"
                fill="black"
                fill-opacity="0.5"
              />
              <path
                d="M25.332 22.0002C25.332 25.6835 28.3154 28.6668 31.9987 28.6668C35.682 28.6668 38.6654 25.6835 38.6654 22.0002C38.6654 18.3168 35.682 15.3335 31.9987 15.3335C28.3154 15.3335 25.332 18.3168 25.332 22.0002Z"
                fill="black"
                fill-opacity="0.5"
              />
            </svg>
          )}
        </div>
        <div className="pro_hd text-center">
          <h3 className="font-bold text-xl mt-2">{user?.fullName}</h3>
          <p className="text-main_gray text-sm">{user?.email}</p>
        </div>
    
      </div>

      <div className="my_pro border shadow-md bg-white rounded-xl p-5 my-5 hover:shadow-lg">
        {isBusiness? ( 
           <Link to="/business-change-password">
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="flex gap-3 items-center w-full">
                <Lock />
                <p className="font-medium">Change Password</p>
                <div className="ms-auto">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        </Link>) : (
            <Link to="/change-profile">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex gap-3 items-center w-full">
                  <Lock />
                  <p className="font-medium">Change Password</p>
                  <div className="ms-auto">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) }
      
      </div>
      <div className="my_pro border shadow-md bg-white rounded-xl p-5 my-5 hover:shadow-lg">
        {isBusiness ? (
          <Link to="/business-change-address">
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="flex gap-3 items-center w-full">
                <FileImage />
                <p className="font-medium">Change Address</p>
                <div className="ms-auto">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        </Link>) : (
          <Link to="/change-address">
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="flex gap-3 items-center w-full">
                <FileImage />
                <p className="font-medium">Change Address</p>
                <div className="ms-auto">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        </Link>
        )}
        
      </div>
      <div className="my_pro border shadow-md bg-white rounded-xl p-5 my-5 hover:shadow-lg">
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
      <div className="my_pro border shadow-md bg-white rounded-xl p-5 mt-5 hover:shadow-lg">
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
              <p onClick={handleLogout} className="font-medium text-[#F05151]">
                Logout
              </p>
              <div className="ms-auto">
                <ChevronRight color="#F05151" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Delete_profile isOpen={isOpen} closeModal={closeModal}  userId={userId}/>
    </>
  );
}

export default Side_links;
