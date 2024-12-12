import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import { mapimg, profile_img } from "../../assets/image";
import { customerUserDetail } from "../../apis/customer/profile";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUser, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { customerFavouriteBusiness } from "../../apis/customer/profile";

function Service_profile() {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [value, onChange] = useState(new Date());
  const [isFavorite, setIsFavorite] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUserDetails = async () => {
    setLoading(true);
    const apiData = {
      userId: id,
      CurrentUtc: new Date().toISOString(),
    };
    try {
      const res = await customerUserDetail(apiData);
      setUserDetails(res?.data?.data);
      setIsFavorite(res?.data?.data?.isFavorite || false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserDetails();
  }, []);

  const toggleFavorite = async (id) => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    try {
      const apiData = {
        toUserId: id,
        isFavorite: newFavoriteStatus,
      };
      const res = await customerFavouriteBusiness(apiData);
      console.log(res);
      handleUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const availability = userDetails?.availabilityList;

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayOfTheWeek = date.toLocaleString("default", { weekday: "long" });
      const isAvailable = availability?.some((slot) => {
        return slot.dayOfTheWeek === dayOfTheWeek;
      });

      if (isAvailable) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 bg-black rounded-full mt-1"></div>
          </div>
        );
      }
    }
    return null;
  };
  const today = new Date();

  return (
    <>
      <Header_two />
      <section className="bg-[#F7F7F7] min-h-screen">
        <div className="py-20 px-6">
          <div className="container mx-auto pt-5">
            <h3 className="font-bold text-xl flex items-center mt-6">
              Search
              <span className="text-lg font-normal ml-2 flex items-center">
                <span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 20L17 14L11 8"
                      stroke="#3C3C3C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                {userDetails?.fullName}
              </span>
            </h3>

            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size="5rem" style={{ color: "black" }} />
                </Box>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-9">
                <div className="lg:col-span-1 col-span-2">
                  <div className="bg-[#fff] rounded-xl shadow-md w-full relative">
                    <div className="mx-auto w-52 py-8 text-center">
                      <div className="rounded-full overflow-hidden size-28 mx-auto pb-6">
                        {userDetails?.image ? (
                          <img
                            className="w-full h-full object-cover"
                            src={userDetails.image}
                            alt={userDetails.name}
                            onError={(e) => {
                              e.target.src = "";
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                        ) : null}
                        <FaUser
                          className="w-[90%] h-full object-cover text-gray-400"
                          style={{
                            display: userDetails?.image ? "none" : "block",
                          }}
                        />
                      </div>
                      <h4 className="text-xl text-[#171716] font-semibold">
                        {userDetails?.fullName || ""}
                      </h4>
                      <p className="text-xs text-[#6C6C6C]">
                        {userDetails?.email || ""}
                      </p>
                    </div>
                    <div
                      className="mt-4 cursor-pointer flex items-center ms-5 absolute right-4 top-1"
                      onClick={() => toggleFavorite(userDetails?.userId)}
                    >
                      {isFavorite ? (
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5.16789C19 11.0026 10.1964 15.7254 9.82147 15.9204C9.72266 15.9727 9.6122 16 9.5 16C9.38779 16 9.27734 15.9727 9.17853 15.9204C8.80362 15.7254 0 11.0026 0 5.16789C0.00157152 3.79775 0.55614 2.48418 1.54204 1.51534C2.52794 0.546512 3.86466 0.00154431 5.25893 0C7.01049 0 8.54406 0.740174 9.5 1.9913C10.4559 0.740174 11.9895 0 13.7411 0C15.1353 0.00154431 16.4721 0.546512 17.458 1.51534C18.4439 2.48418 18.9984 3.79775 19 5.16789Z"
                            fill="#FF5B5B"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="19"
                          height="17"
                          viewBox="0 0 19 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.8182 0.5C12.0045 0.5 10.4275 1.30585 9.5 2.65631C8.57245 1.30585 6.99545 0.5 5.18182 0.5C3.80801 0.501576 2.49092 1.04 1.51949 1.99717C0.548054 2.95433 0.00159998 4.25208 0 5.60571C0 8.09049 1.57182 10.6765 4.67227 13.2907C6.093 14.4835 7.62765 15.5379 9.25473 16.4392C9.33013 16.4791 9.4144 16.5 9.5 16.5C9.5856 16.5 9.66987 16.4791 9.74527 16.4392C11.3724 15.5379 12.907 14.4835 14.3277 13.2907C17.4282 10.6765 19 8.09049 19 5.60571C18.9984 4.25208 18.4519 2.95433 17.4805 1.99717C16.5091 1.04 15.192 0.501576 13.8182 0.5ZM9.5 15.401C8.08277 14.5952 1.03636 10.3472 1.03636 5.60571C1.03751 4.52276 1.47463 3.48449 2.2518 2.71873C3.02898 1.95297 4.08273 1.52227 5.18182 1.52114C6.93327 1.52114 8.40405 2.44272 9.02068 3.92678C9.05972 4.02043 9.12613 4.10052 9.21148 4.15689C9.29683 4.21326 9.39725 4.24335 9.5 4.24335C9.60275 4.24335 9.70317 4.21326 9.78852 4.15689C9.87387 4.10052 9.94028 4.02043 9.97932 3.92678C10.596 2.44272 12.0667 1.52114 13.8182 1.52114C14.9173 1.52227 15.971 1.95297 16.7482 2.71873C17.5254 3.48449 17.9625 4.52276 17.9636 5.60571C17.9636 10.3472 10.9172 14.5952 9.5 15.401Z"
                            fill="#303030"
                            fillOpacity="0.7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#fff] rounded-xl shadow-md w-full mt-4 flex items-center justify-between p-4">
                    <div className=" flex items-center gap-2">
                      <span className="flex items-center gap-2">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.97 20.33C23.97 20.69 23.89 21.06 23.72 21.42C23.55 21.78 23.33 22.12 23.04 22.44C22.55 22.98 22.01 23.37 21.4 23.62C20.8 23.87 20.15 24 19.45 24C18.43 24 17.34 23.76 16.19 23.27C15.04 22.78 13.89 22.12 12.75 21.29C11.6 20.45 10.51 19.52 9.47 18.49C8.44 17.45 7.51 16.36 6.68 15.22C5.86 14.08 5.2 12.94 4.72 11.81C4.24 10.67 4 9.58 4 8.54C4 7.86 4.12 7.21 4.36 6.61C4.6 6 4.98 5.44 5.51 4.94C6.15 4.31 6.85 4 7.59 4C7.87 4 8.15 4.06 8.4 4.18C8.66 4.3 8.89 4.48 9.07 4.74L11.39 8.01C11.57 8.26 11.7 8.49 11.79 8.71C11.88 8.92 11.93 9.13 11.93 9.32C11.93 9.56 11.86 9.8 11.72 10.03C11.59 10.26 11.4 10.5 11.16 10.74L10.4 11.53C10.29 11.64 10.24 11.77 10.24 11.93C10.24 12.01 10.25 12.08 10.27 12.16C10.3 12.24 10.33 12.3 10.35 12.36C10.53 12.69 10.84 13.12 11.28 13.64C11.73 14.16 12.21 14.69 12.73 15.22C13.27 15.75 13.79 16.24 14.32 16.69C14.84 17.13 15.27 17.43 15.61 17.61C15.66 17.63 15.72 17.66 15.79 17.69C15.87 17.72 15.95 17.73 16.04 17.73C16.21 17.73 16.34 17.67 16.45 17.56L17.21 16.81C17.46 16.56 17.7 16.37 17.93 16.25C18.16 16.11 18.39 16.04 18.64 16.04C18.83 16.04 19.03 16.08 19.25 16.17C19.47 16.26 19.7 16.39 19.95 16.56L23.26 18.91C23.52 19.09 23.7 19.3 23.81 19.55C23.91 19.8 23.97 20.05 23.97 20.33Z"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                          />
                        </svg>
                      </span>

                      <span>
                        {userDetails?.contactNumber || "+1 (555) 789-1234"}
                      </span>
                    </div>
                    <div className="h-10 w-10 bg-[#303030] rounded-md flex items-center justify-center">
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.1373 9.49045C10.3811 8.84367 9.61367 8.45188 8.86674 9.09769L8.42073 9.48801C8.09441 9.77135 7.48768 11.0952 5.14186 8.39668C2.79653 5.70158 4.1922 5.28195 4.51901 5.00106L4.96746 4.61025C5.71048 3.96298 5.43008 3.14815 4.89419 2.30938L4.57079 1.80133C4.03246 0.964513 3.44625 0.414941 2.70127 1.06124L2.29874 1.41296C1.96948 1.65282 1.04913 2.43248 0.825886 3.91364C0.557206 5.69083 1.40477 7.72596 3.34659 9.95893C5.28597 12.1929 7.1848 13.315 8.98349 13.2954C10.4783 13.2793 11.3811 12.4772 11.6634 12.1856L12.0674 11.8333C12.8105 11.1875 12.3488 10.53 11.5921 9.88175L11.1373 9.49045Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-[#fff] rounded-xl shadow-md mt-4 flex items-center gap-3 p-4">
                    <div>
                      <img src={mapimg} alt="" />
                    </div>
                    <div className="md:flex block items-end justify-between w-full">
                      <div>
                        <h4 className="font-bold">
                          {userDetails?.address1 || "#42 B, Highrise Towers"}
                        </h4>
                        <p>{userDetails?.address2 || "Riverside, Verona"}</p>
                        <p>{userDetails?.zipcode || "60601"}</p>
                      </div>
                      <div className="mt-2">
                        <button className="bg-[#303030] rounded-lg text-white py-2 px-3">
                          View on Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 col-span-2 bg-[#fff] rounded-xl shadow-md gap-3 p-6">
                  <div className="tab-bar">
                    <button
                      className={activeTab === "Home" ? "active" : ""}
                      onClick={() => handleTabClick("Home")}
                    >
                      About
                    </button>
                    <button
                      className={activeTab === "Profile" ? "active" : ""}
                      onClick={() => handleTabClick("Profile")}
                    >
                      Services
                    </button>
                    <button
                      className={activeTab === "Settings" ? "active" : ""}
                      onClick={() => handleTabClick("Settings")}
                    >
                      Availability
                    </button>
                  </div>

                  <div className="tab-content pt-3">
                    {activeTab === "Home" && (
                      <>
                        <div className="p-4">
                          <div className="border-b pb-2 px-2">
                            <h3 className="font-bold text-lg text-dark_link mb-1">
                              Price
                            </h3>
                            <p className="text-main_gray">
                              ${userDetails?.hourlyPrice || "18"}/per hour
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="border-b pb-2 px-2">
                            <h3 className="font-bold text-lg text-dark_link mb-1">
                              Experience
                            </h3>
                            <p className="text-main_gray">
                              {userDetails?.experience || "12 years"}
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="border-b pb-2 px-2">
                            <h3 className="font-bold text-lg text-dark_link mb-1">
                              Bio
                            </h3>
                            <p className="text-main_gray">
                              {userDetails?.bio ||
                                "Curabitur auctor feugiat ante sit amet tincidunt. Aliquam eu lectus."}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === "Profile" && (
                      <>
                        {Array.isArray(userDetails?.services) &&
                          userDetails.services.map((service, index) => (
                            <div key={index}>
                              <div className="border-b py-4 flex justify-start items-center gap-x-4">
                                <div className="icn size-14 flex justify-center items-center rounded-full bg-[#EBEBEB] shrink-0">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_1596_3183)">
                                      <path
                                        d="M10.9991 0.484863C9.76525 0.484863 8.72461 1.5255 8.72461 2.75936C8.72461 3.99322 9.76525 5.03386 10.9991 5.03386C12.233 5.03386 13.2363 3.99322 13.2363 2.75936C13.2363 1.5255 12.233 0.484863 10.9991 0.484863Z"
                                        fill="#303030"
                                        fill-opacity="0.6"
                                      />
                                      <path
                                        d="M13.4826 5.03394C12.8679 5.7155 11.9875 6.15254 10.9995 6.15254C10.0116 6.15254 9.09393 5.7155 8.47926 5.03394C7.94262 5.629 7.60645 6.40855 7.60645 7.27115V7.83045C7.60645 8.1396 7.8566 8.38975 8.16575 8.38975H13.7961C14.1052 8.38975 14.3554 8.1396 14.3554 7.83045V7.27115C14.3554 6.40855 14.0192 5.629 13.4826 5.03394Z"
                                        fill="#303030"
                                        fill-opacity="0.6"
                                      />
                                      <path
                                        d="M6.2982 17.6519L3.44796 11.9375C3.17274 11.3857 2.50292 11.1606 1.95044 11.4344L1.20549 11.8034C0.928111 11.941 0.815244 12.2781 0.95369 12.555L4.30951 19.2666C4.44751 19.5434 4.7832 19.6535 5.05834 19.5178L5.79371 19.1535C6.34835 18.8788 6.57442 18.2058 6.2982 17.6519Z"
                                        fill="#303030"
                                        fill-opacity="0.6"
                                      />
                                      <path
                                        d="M19.5271 9.7209C19.0685 9.38532 18.4309 9.45244 18.0506 9.86632L14.993 13.6248C14.7805 13.8486 14.3778 13.9828 14.1653 13.9828H11.5589C11.2456 13.9828 10.9996 13.7367 10.9996 13.4235C10.9996 13.1102 11.2456 12.8642 11.5589 12.8642C12.308 12.8642 13.1373 12.8642 13.7961 12.8642C14.4113 12.8642 14.9147 12.3608 14.9147 11.7456C14.9147 11.1303 14.4113 10.627 13.7961 10.627C11.1694 10.627 13.6749 10.627 10.8654 10.627C10.5866 10.627 10.4476 10.4502 10.2277 10.2578C9.36236 9.47906 8.06701 9.10388 6.75563 9.40784C6.02749 9.5766 5.53646 9.87076 5.03846 10.2652L5.02187 10.2517L4.21289 10.9637L7.39212 17.3386H8.33354H13.7961C14.8476 17.3386 15.8544 16.8352 16.4808 15.9963L19.762 11.2981C20.1311 10.8059 20.0305 10.0901 19.5271 9.7209Z"
                                        fill="#303030"
                                        fill-opacity="0.6"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1596_3183">
                                        <rect
                                          width="19.0909"
                                          height="19.0909"
                                          fill="white"
                                          transform="translate(0.893555 0.484863)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>{" "}
                                </div>
                                <div className="dsc">
                                  <h3 className="font-bold text-lg text-dark_link mb-1">
                                    {service}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}

                    {activeTab === "Settings" && (
                      <div className="p -4">
                        <div className="h-full w-full">
                          <Calendar
                            onChange={onChange}
                            value={value}
                            tileContent={tileContent}
                            minDate={today}
                            className="w-full min-h-[25.5rem]"
                          />
                          {userDetails.priceType === 0 ? (
                            <>
                              <button
                                onClick={() => {
                                  navigate("/booking-appointment", {
                                    state: userDetails,
                                  });
                                }}
                                type="button"
                                className="
                                bg-[#303030] px-3 py-4 w-full text-white font-semibold rounded-lg mt-5"
                              >
                                Book Now
                              </button>
                              {(userDetails.subscriptionPlan ===
                                "platinum_plan" ||
                                userDetails.subscriptionPlan ===
                                  "gold_plan") && (
                                <button
                                  onClick={() => {
                                    navigate("/book-consultation", {
                                      state: {
                                        ...userDetails,
                                        priceType: 1,
                                      },
                                    });
                                  }}
                                  type="button"
                                  className="bg-white px-3 py-4 w-full text-[#303030] font-semibold rounded-lg mt-5 border-black"
                                >
                                  Book Consultation
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                navigate("/book-consultation", {
                                  state: userDetails,
                                });
                              }}
                              type="button"
                              className="bg-white  px-3 py-4 w-full text-[#303030] font-semibold rounded-lg mt-5 border-black"
                            >
                              Book Consulation
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Service_profile;
