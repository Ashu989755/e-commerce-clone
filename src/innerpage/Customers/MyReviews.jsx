import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Header_Business from "../layout/Header_business";
import { Search } from "lucide-react";
import Accordion from "../../Landingpage/Accordion";
import { customerMyReview } from "../../apis/customer/profile";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

function MyReviews() {
  const [activeTab, setActiveTab] = useState("All");
  const [myReview, setMyReviews] = useState([]);
  const { user } = useSelector((state) => state?.authSlice);
  const isBusiness = user?.role;

  const handleMyReview = async (statusId) => {
    const apiData = {
      statusId: statusId,
    };
    try {
      const res = await customerMyReview(apiData);
      console.log(res, "=====");
      setMyReviews(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    switch (tab) {
      case "All":
        handleMyReview(0);
        break;
      case "Live":
        handleMyReview(1);
        break;
      case "Rejected":
        handleMyReview(2);
        break;
      case "Pending":
        handleMyReview(3);
        break;
    }
  };

  useEffect(() => {
    handleMyReview(0);
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        {isBusiness === "business" ? <Header_Business /> : <Header_two />}
        <section className="pt-32 pb-20">
          <div className="container mx-auto pt-6">
            <div className="grid grid-cols-2 w-11/12 mx-auto">
              <div className="col-span-2 lg:col-span-1">
                <div className="rvws block md:flex justify-between items-center gap-4 mb-4 lg:mb-0">
                  <div className="">
                    <h3 className="font-bold text-2xl text-dark_link">
                      My Reviews
                    </h3>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-1 h-full bottom-[2px] text-main_gray w-5" />
                    <input
                      className="bg-white px-7 py-3 w-full md:w-72 rounded-xl shadow-md  outline-0 text-sm"
                      type="search"
                      placeholder="Search business or service"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-2">
                <div className="tab-bar ms-auto lg:justify-end justify-center items-center !border-0 transition-all">
                  <p className="text-main_gray font-semibold lg:w-auto w-full sm:block hidden">
                    Sort by:
                  </p>

                  <button
                    className={
                      activeTab === "All"
                        ? "active !rounded-xl !w-fit px-3 md:px-7 !text-sm"
                        : "shadow-md !rounded-xl !w-fit px-3 md:px-7 !lg:px-0 !text-sm bg-white"
                    }
                    onClick={() => handleTabClick("All")}
                  >
                    {" "}
                    All{" "}
                  </button>

                  <button
                    className={
                      activeTab === "Live"
                        ? "active !rounded-xl !w-fit px-3 md:px-7 !text-sm"
                        : "shadow-md !rounded-xl !w-fit px-3 md:px-7 !text-sm bg-white"
                    }
                    onClick={() => handleTabClick("Live")}
                  >
                    Live
                  </button>

                  <button
                    className={
                      activeTab === "Rejected"
                        ? "active !rounded-xl !w-fit px-3 md:px-7 !text-sm"
                        : "shadow-md !rounded-xl !w-fit px-3 md:px-7 !text-sm bg-white"
                    }
                    onClick={() => handleTabClick("Rejected")}
                  >
                    Rejected
                  </button>

                  <button
                    className={
                      activeTab === "Pending"
                        ? "active !rounded-xl !w-fit px-3 md:px-7 !text-sm"
                        : "shadow-md !rounded-xl !w-fit px-3 md:px-7 !text-sm bg-white"
                    }
                    onClick={() => handleTabClick("Pending")}
                  >
                    Pending
                  </button>
                </div>
              </div>
              <div className="col-span-2">
                <div className="tab-content pt-5 transition-all">
                  {myReview?.length > 0 ? (
                    <>
                      <div className="grid grid-cols-6 gap-4">
                        {myReview.map((review) => (
                          <div
                            key={review.reviewId}
                            className="lg:col-span-2 md:col-span-3 col-span-6"
                          >
                            <div className="crd bg-white p-4 rounded-xl shadow-md">
                              <div className="flex justify-between items-center pb-3 border-b">
                                <h3 className="text-main_gray font-medium">
                                  Posted,
                                  {moment(review.reviewedOn).format(
                                    " DD/MMMM/YYYY"
                                  )}
                                  ,
                                  {moment
                                    .utc(review.reviewedOn)
                                    .tz(userTimeZone)
                                    .format("h:mm A")}
                                </h3>
                                <button
                                  className={`bg-gradient-to-r ${
                                    review.status === "Live"
                                      ? "from-[#81EA9E] to-[#41D16A]"
                                      : "from-[#488ccc] to-[#3772b6]"
                                  } rounded-xl px-4 py-2 text-xs text-white`}
                                >
                                  {review.status}
                                </button>
                              </div>
                              <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-7">
                                  <h3 className="font-bold my-3 text-dark_link">
                                    {review.reviewedToFullName}
                                  </h3>
                                  <span
                                    className={`font-semibold w-10 h-7 inline-flex justify-center items-center rounded-md text-white
                  ${
                    review.rate >= 1 && review.rate <= 3
                      ? "bg-red-500"
                      : review.rate >= 4 && review.rate <= 6
                      ? "bg-yellow-500"
                      : review.rate >= 7 && review.rate <= 8
                      ? "bg-blue-500"
                      : review.rate >= 9 && review.rate <= 10
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                                  >
                                    {review.rate}
                                  </span>

                                  <h3 className="flex items-center my-2 gap-2">
                                    <span>
                                      <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 11 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M5.5 0C3.8458 0 2.5 1.3458 2.5 3C2.5 4.6542 3.8458 6 5.5 6C7.1542 6 8.5 4.6542 8.5 3C8.5 1.3458 7.1542 0 5.5 0ZM9.23258 7.95989C8.41124 7.12593 7.32242 6.66667 6.16667 6.66667H4.83333C3.6776 6.66667 2.58876 7.12593 1.76742 7.95989C0.950111 8.78975 0.5 9.88518 0.5 11.0444C0.5 11.2285 0.649244 11.3778 0.833333 11.3778H10.1667C10.3508 11.3778 10.5 11.2285 10.5 11.0444C10.5 9.88518 10.0499 8.78975 9.23258 7.95989Z"
                                          fill="#303030"
                                          fill-opacity="0.8"
                                        />
                                      </svg>
                                    </span>
                                    <span className="text-[#303030] opacity-80 font-medium">
                                      {review.reviewedByFullName}{" "}
                                      {/* Displaying the reviewer name */}
                                    </span>
                                  </h3>
                                  <p className="line-clamp-3 text-[#303030]">
                                    {review.reviewDesc}{" "}
                                    {/* Displaying review description */}
                                  </p>
                                </div>
                                <div className="col-span-12 md:col-span-5 py-3">
                                  <div
                                    className="bg-[#69E366] w-[9rem] h-[9rem] ml-0 md:ml-auto rounded-md text-4xl text-white
                                   flex items-center justify-center mt-2 overflow-hidden"
                                  >
                                    <img
                                      src={review.reviewedToImage}
                                      alt={review.reviewedToFullName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center mt-10 p-9">
                      <p className="font-semibold text-xl">No Reviews Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer_two />
      </div>
    </>
  );
}

export default MyReviews;
