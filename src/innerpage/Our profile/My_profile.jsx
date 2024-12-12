import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Header_Business from "../layout/Header_business";
import Footer_two from "../layout/Footer_two";
import Side_links from "./Side_links";
import { Link, useNavigate } from "react-router-dom";
import Add_new_card from "../../modals/Add_new_card";
import { customerProfile } from "../../apis/customer/profile";
import { useSelector } from "react-redux";
import { customerStripeCardList, customerStripeDefaultCard, customerStripeDeleteCard, customerStripePayment } from "../../apis/customer/stripe";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { EditWhiteIcon, EmailIcon, LocationIcon, PhoneIcons } from "../../assets/image";
import { toast } from "react-toastify";

function My_profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state?.authSlice);
  const isBusiness = user?.role;

  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const goprofile = () => {
    if (user.role == "business") {
      navigate("/business-edit-profile");
    } else {
      navigate("/edit-profile")
    }
  };

  const handleUserProfile = async () => {
    setLoading(true);
    try {
      const res = await customerProfile();
      setProfile(res?.data?.data);
      const userData = res.data.data;
      console.log(userData, "====================");
      dispatch(
        updateUser({
          user: { ...userData },
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleCardAdd = async () => {
    console.log("helloooooooooooo")
    try {
      const res = await customerStripePayment();
      if (res?.data?.success == true) {
        window.open(res?.data?.data, "_blank")
      }
    } catch (error) {
      console.log('error')
    }
  }

  const handleCardList = async () => {
    try {
      const res = await customerStripeCardList();
      setCardList(res?.data?.data)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    handleCardList()
  }, [])

  const handleDeleteCard = async (id) => {
    console.log(id)
    try {
      const apiData = {
        cardId : id
      }
      const res = await customerStripeDeleteCard(apiData);
      handleCardList();
      toast.success(res.data.message)
    } catch (error) {
      console.log('error')
    }
  }
  const handleDefaultCard = async (id) => {
    console.log(id)
    try {
      const apiData = {
        cardId : id
      }
      const res = await customerStripeDefaultCard(apiData);
      handleCardList();
      toast.success(res.data.message)
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <>

      {isBusiness === "business" ?
        (<Header_Business />
        ) : (<Header_two />)}

      <section className="pt-20 bg-dark_link grid content-center min-h-fit md:min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                My Profile
              </h3>
              {/* <p className="text-center text-white pt-3">
                Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida
                condimentum.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-20 py-10 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1">
              <Side_links></Side_links>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="crd p-5 shadow-md border rounded-xl bg-white">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <h2 className="text-xl font-bold text-dark_link">
                    Personal info
                  </h2>
                  <button onClick={goprofile} className="bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium">
                    <img src={EditWhiteIcon} alt="" />
                    Edit
                  </button>
                </div>
                {loading ? (
                  <div>
                    {Array(1)
                      .fill()
                      .map((_, index) => (
                        <div key={index} className="card p-4 bg-white rounded-lg transition-all shadow-sm">
                          <div className="grid grid-cols-4 gap-3 pb-3">
                            <div className="col-span-1">
                              <div className="img rounded-lg overflow-hidden h-full w-full flex">
                                <Skeleton circle={true} height={56} width={56} />
                              </div>
                            </div>
                            <div className="col-span-3">
                              <div className="flex justify-between items-center mb-2">
                                <div className="hed font-bold text-lg">
                                  <Skeleton width={150} />
                                </div>
                                <div className="icn_cnt">
                                  <Skeleton width={24} height={24} />
                                </div>
                              </div>
                              <div className="desc line-clamp-2 text-sm">
                                <Skeleton count={2} />
                              </div>
                              <div className="flex gap-3 mt-3">
                                <Skeleton width={100} height={30} />
                              </div>
                            </div>
                          </div>
                          <hr className="border-0 border-b border-main_gray opacity-50" />
                          {/* <div className="flex justify-between mt-3">
                          <div className="w-1/2 flex items-center gap-2">
                            <Skeleton width={80} />
                          </div>
                          <div className="w-1/2 flex items-center gap-2 justify-end">
                            <Skeleton width={80} />
                          </div>
                        </div> */}
                        </div>
                      ))} </div>) : (
                  <div>
                    <div className="flex justify-between items-center gap-2 py-3">
                      <div className="dta flex gap-3 w-1/3">
                        <img src={EmailIcon} alt="" className="w-7 h-7" />
                        <p className="text-main_gray font-medium">Email</p>
                      </div>
                      <div className="lnk w-2/3">
                        <p className="font-semibold text-dark_gray text-right">
                          {profile?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-2 py-3">
                      <div className="dta flex gap-3 w-1/3">
                        <img src={PhoneIcons} alt="" className="w-7 h-7" />
                        <p className="text-main_gray font-medium">Phone number</p>
                      </div>
                      <div className="lnk w-2/3">
                        <p className="font-semibold text-dark_gray text-right">
                          {profile?.contactNumber ? profile?.contactNumber : "----"}
                        </p>
                      </div>
                    </div>

                    <div className="block md:flex justify-between items-center gap-2 py-3">
                      <div className="dta flex gap-3 w-1/3">
                        <img src={LocationIcon} alt="" className="w-7 h-7" />
                        <p className="text-main_gray font-medium">Address</p>
                      </div>
                      <div className="lnk w-full md:w-2/3">
                        <p className="font-semibold text-dark_gray text-right">
                          {profile?.address1}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="crd p-5 shadow-md border my-5 rounded-xl bg-white">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <h2 className="text-xl font-bold text-dark_link">
                    Payment Card
                  </h2>
                  <button
                    onClick={handleCardAdd}
                    className="bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium"
                  >
                    Add New Card
                  </button>
                </div>
                {cardList?.map((card, index) =>
                  <div key={index} className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl mb-4">
                    <div onClick={() => handleDefaultCard(card?.cardId)} className="dta flex gap-3 flex-wrap items-center">
                      <div className="">
                        <img src={card?.cardImage} />
                      </div>
                      <div className="txt">
                        <p className="text-dark_link font-semibold text-lg">
                          <span className="text-gray-600"> **** **** ****</span>{card?.cardNumber}
                        </p>
                        <p className="text-main_gray text-sm">Visa</p>
                      </div>
                    </div>
                    <div className="lnk" onClick={() => handleDeleteCard(card?.cardId)}>

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                          stroke="#F05151"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#F05151"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
                          stroke="#F05151"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.3301 16.5H13.6601"
                          stroke="#F05151"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.5 12.5H14.5"
                          stroke="#F05151"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer_two></Footer_two>
      <Add_new_card isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default My_profile;
