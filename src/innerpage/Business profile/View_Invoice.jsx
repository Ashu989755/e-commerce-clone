import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { UserIcon } from "lucide-react";
import { CallIcon, EmailIcon, LocationIcon } from "../../assets/image";
import { businessSaveEstimateList } from "../../apis/business/Profile";
import { customerAcceptRejectEstimates } from "../../apis/customer/profile";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const View_Invoice = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const navigate = useNavigate();

  const [estimateList, setEstimateList] = useState("");
  const estimateId = estimateList?.estimateId;
  console.log(estimateId);

  const handleEstimateList = async () => {
    const apiData = {
      bookingId: id,
      estimateType: 1,
    };
    try {
      const res = await businessSaveEstimateList(apiData);
      setEstimateList(res?.data?.data);
      console.log(res);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.errors?.bookingId?.[0] || "An error occurred";
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    handleEstimateList();
  }, [id]);

  const handleAcceptEstimates = async () => {
    try {
      const apiData = {
        estimateId: estimateId,
        status: 2,
        utcDatetTime: new Date().toISOString(),
      };
      const res = await customerAcceptRejectEstimates(apiData);
      navigate("/notification");
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
 

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <Header_two />
      <section className="bg-white min-h-screen">
        <div className="py-20 px-20">
          <div className="container mx-auto pt-5">
            <h3 className="font-bold text-xl flex items-center mt-6">
              View Invoice
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
              {/* <span className="text-lg font-normal"></span>
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
                </svg> */}
              {/* </span> */}
              <span className="text-lg font-normal">Invoice</span>
            </h3>
            <div className="grid grid-cols-12 gap-6 mt-9">
              <div className="col-span-5">
                <div className="flex flex-col gap-4">
                  <div className="bg-[#fff] rounded-xl shadow-lg w-full p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-[7.938rem] h-[7rem] rounded-md overflow-hidden bg-[#2883DE]">
                        <img src={estimateList?.businessImage} alt="" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#303030] font-semibold">
                          {estimateList?.businessName}
                        </p>
                        <p className="flex items-center gap-1 text-gray-700 text-sm">
                          <span>
                            <img src={UserIcon} alt="" />
                          </span>
                          {estimateList?.businessUserName}
                        </p>
                        <p className="flex items-center gap-1 text-gray-700 text-sm">
                          <span>
                            <img src={CallIcon} alt="" />
                          </span>
                          {estimateList?.businessMobileNumber}
                        </p>
                        <p className="flex items-center gap-1 text-gray-700 text-sm">
                          <span>
                            <img src={EmailIcon} alt="" />
                          </span>
                          {estimateList?.businessEmail}
                        </p>
                      </div>
                    </div>
                    <p className="flex items-center gap-1 text-gray-700 text-sm">
                      <span>
                        <img src={LocationIcon} alt="" />
                      </span>
                      {estimateList?.businessAddress?.address1},
                      {estimateList?.businessAddress?.address2},
                      {estimateList?.businessAddress?.city},
                      {estimateList?.businessAddress?.state},{" "}
                      {estimateList?.businessAddress?.country},
                      {estimateList?.businessAddress?.zipcode}
                    </p>

                    <hr className="my-4" />

                    <div className="flex flex-col gap-2 mb-4">
                      <p className="text-sm">
                        <span className="font-semibold uppercase">
                          JOB DATE & TIME:{" "}
                        </span>
                        <span className="text-gray-600 font-medium">
                          {moment(estimateList?.opneingDate).format(
                            "MMMM-DD-YYYY"
                          )}
                          ,
                          {moment
                            .utc(estimateList?.opneingDate)
                            .tz(userTimeZone)
                            .format("h:mm A")}
                        </span>
                      </p>

                      <p className="text-sm">
                        <span className="font-semibold uppercase">
                          Business Number:{" "}
                        </span>
                        <span className="text-gray-600 font-medium">
                          Business Number {estimateList?.businessMobileNumber}
                        </span>
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm">
                          <span className="font-semibold uppercase">
                            invoice:{" "}
                          </span>
                          <span className="text-gray-600 font-medium">
                            {estimateList?.invoiceNo}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold uppercase">
                            Date:{" "}
                          </span>
                          <span className="text-gray-600 font-medium">
                            {moment(estimateList?.opneingDate).format(
                              "MMMM-DD-YYYY"
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-[#F7F7F7] rounded-lg flex justify-between items-center">
                      <p className="text-gray-500 uppercase text-sm font-medium">
                        BALANCE DUE:
                      </p>
                      <p className="text-gray-900 uppercase text-sm font-semibold">
                        ${estimateList?.balance?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                    <div className="mt-4 mb-7">
                        <Link to = "/business-home">
                      <button
                        type="button"
                        className="bg-black border-black rounded-lg px-4 py-4 font-semibold flex gap-2 items-center text-white text-sm w-full justify-center"
                      >
                        Ok
                      </button>
                      </Link>
                    </div>
                  

                  {/* <div className="bg-[#fff] rounded-xl shadow-lg w-full p-6">
                    <h4 className="font-semibold text-sm mb-2">Description</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur. Sit in sed tortor
                      lacus semper blandit orci facilisi egestas. Tortor arcu ut
                      eu eu dignissim sed tellus. Nisl sit dictum ut gravida
                      dis.Lorem ipsum dolor sit amet consectetur. Sit in sed
                      tortor lacus semper blandit orci facilisi egestas. Tortor
                      arcu ut eu eu dignissim Lorem ipsum dolor sit amet
                      consectetur. Sit in sed tortor lacus semper blandit orci
                      facilisi egestas. Tortor arcu ut eu eu dignissim sed
                      tellus.
                    </p>
                  </div> */}
                </div>
              </div>
              <div className="col-span-7 h-full">
                <div className="bg-[#fff] rounded-xl shadow-lg w-full p-6 h-full">
                  <h4 className="text-xl font-semibold">Invoice</h4>
                  <hr className="my-4" />
                  <h4 className="text-sm font-bold mb-4">BILL TO</h4>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs">
                      {estimateList?.customerUserName}{" "}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      {estimateList?.customerAddress?.address1},
                      {estimateList?.customerAddress?.address2},
                      {estimateList?.customerAddress?.city},
                      {estimateList?.customerAddress?.state},{" "}
                      {estimateList?.customerAddress?.country},
                      {estimateList?.customerAddress?.zipcode}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      {estimateList?.customerMobileNumber}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      {estimateList?.customerEmail}
                    </p>
                  </div>

                  <div className="mt-4">
                    <table class="my_table">
                      <tr>
                        <th>Description</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Qty</th>
                        <th>Labor Unit</th>
                        <th>Labor Price</th>
                        <th>Amount</th>
                      </tr>

                      <tr>
                        {estimateList?.estimateItems?.map((item) => (
                          <>
                            <td>Installing new 12*16 deck</td>
                            <td>{item?.itemName}</td>
                            <td>${item?.itemPrice}</td>
                            <td>{item?.quantity}</td>
                          </>
                        ))}
                        <td>{estimateList?.numberOfLabour}</td>
                        <td>${estimateList?.labourPrice}</td>
                        <td>{estimateList?.subTotal?.toFixed(1)}</td>
                      </tr>

                      <tr>
                        <td colspan="7" className="border-0">
                          <p className="font-bold mt-2">
                            Total Hours: {estimateList?.totalHour}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6" className="border-0">
                          <p className="font-bold">Sub Total</p>
                        </td>
                        <td className="border-0">
                          ${estimateList?.subTotal?.toFixed(1)}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <p className="font-bold">TAX (0%)</p>
                        </td>
                        <td>${estimateList?.tax?.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <p className="font-bold uppercase">BALANCE DUE</p>
                        </td>
                        <td>${estimateList?.balance?.toFixed(1)}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
    </>
  );
};

export default View_Invoice;
