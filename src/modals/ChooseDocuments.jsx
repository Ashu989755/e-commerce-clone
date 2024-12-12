import React, { useEffect, useState } from 'react'
import { avtar5 } from '../assets/image';
import { X } from 'lucide-react';
import { BusinessEstimatesList } from '../apis/business/Documents';
import { businessJobDetails, businessSaveEstimateItems, businessSendEstimates } from '../apis/business/Profile';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
// import Estimates from "../../modals/Estimates";


function ChooseDocuments({ isOpen, closeModal }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  console.log(id, "ID IS AVAILABLE HERE:::::::")

  const [estimateList, setEstimateList] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState(null);

console.log(selectedEstimate);
  const handleSelectEstimate = async(estimate) => {
    setSelectedEstimate(estimate);
    handleSendEstimates(estimate)
  
     
  };

  const handleJobDetails = async () => {
    try {
      const apiData = {
        bookingId: id,
      };
      const response = await businessJobDetails(apiData);
      setJobDetail(response?.data?.data);
      setId(response?.data?.data?.userId);
      setStatus(response?.data?.data.bookingStatus);
      // dispatch(
      //   updateUser({
      //     user: response.data.data,
      //     user: response.data.data,
      //   })
      // );
    } catch (error) {
      console.log(error, "ERROR:");
    }
  };

  const handleGetEstimateList = async () => {
    try {
      const res = await BusinessEstimatesList();
      setEstimateList(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };


  const handleSendEstimates = async (data) => {
    const date = data.estimateItems[0].estimatedate
    console.log(date)
   
    try {
      const formData = new FormData();

      formData.append("CustomerId", data.businessId);
      formData.append("CurrentUtcTime", new Date().toISOString());
      formData.append("BookingId", id);
      formData.append("Estimatedate", data.estimatedate);
      formData.append("TotalHour", data.totalHour ? data.totalHour : "");
      formData.append("TotalAmount", data.totalAmount ? data.totalAmount : "");
      formData.append("BusinessName", data.businessName);
      formData.append("NumberOfLabour", data.numberOfLabour);
      formData.append("LabourPrice", data.labourPrice);
      formData.append("NumberOfDays", "");
      formData.append("EstimateType", data.estimateType);
      formData.append("EstimatePriceType", data.estimatePriceType);
      formData.append("JobOpeningDate", data.jobOpeningDate || "");
      formData.append("JobClosingDate", data.jobClosingDate || "");
      console.log(data.estimateImage)
      const imageUrl = `https://ourreviewapiv2.harishparas.com/EstimateImages/${data.estimateImage}`;
      console.log(imageUrl,"========")
      
    let blob = null;
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        blob = await response.blob();
        console.log(blob, "Image blob fetched successfully");
      } else {
        console.warn("Failed to fetch image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }


    if (blob) {
      formData.append("Image", blob);
    }
      // formData.append("Image", uploadedImg);
    

      const res = await businessSendEstimates(formData);
      handleSaveEstimateItems(data);
      handleJobDetails();
      toast.success("Document Sent Succesfully");
      navigate("/business/create-documents");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEstimateItems = async (data) => {
    console.log(id, "ID HERE OUTPUT");

    try {
      const apiData = {
        estimateId: data.estimateItems[0]?.estimateItemId,
        customerEmail: "",
        customerName: "",
        firstName:"",
        lastName: "",
        customerContactNumber: "",
        customerCountryCode: "",
        address1: "",
        address2: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
        estimateItems: data.estimateItems,
      };
      const res = await businessSaveEstimateItems(apiData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleGetEstimateList();
  }, []);                                                                                             





  return (
    <>
      {isOpen && (
        <div id='add_modal' className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              {/* Modal Content */}
              <div className="bg-white">
                <div className="">
                  <div className="mt-3 sm:mt-0 sm:text-left">
                    <h2 className='text-xl font-semibold mb-2 px-3 py-3'>Choose Document</h2>
                    <div className="mod_hd absolute right-4 top-3">
                      <button type="button" onClick={closeModal}>
                        <X color='#3C3C3C' />
                      </button>
                    </div>

                    <div className='px-5 py-5 pt-2'>
                      <div className='flex gap-3 mb-4'>
                        {/* <div className='rounded-xl bg-black w-12 h-3'><img src={avtar5} alt=''/></div> */}
                        <>
                          {estimateList?.map((list, index) => (
                            <div
                              className="border p-4 rounded-lg flex items-center justify-between relative"
                              key={index}
                              onClick={() => handleSelectEstimate(list)}
                            >
                              <div className="flex items-center gap-4 justify-between w-full"
                              >
                                <div
                                  className="flex items-center gap-4"

                                >
                                  <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                      src={
                                        list?.estimateImage
                                          ? `https://ourreviewapiv2.harishparas.com/EstimateImages/${list.estimateImage}`
                                          : "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
                                      }
                                      alt={list?.businessName || "Default Image"}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw";
                                      }}
                                    />
                                  </div>

                                  <div>
                                    <h4 className="text-lg font-bold text-dark_link mb-0">
                                      {list?.businessName}
                                    </h4>
                                    <p className="text-gray-500 text-md">
                                      {/* 16 October 2024, Wednesday */}
                                    </p>
                                    <h4 className="text-lg font-semibold text-dark_link mb-0">
                                      {/* 10:00 AM */}
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  className="relative mt-3"

                                >
                                  <button
                                    // onClick={() => toggleDropdown(index)}
                                    className="inline-block text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-200 p-2 rounded-md"
                                  >

                                  </button>

                                </div>
                                {(list.estimatePriceType === "perHour" || list.estimatePriceType === "0") && (
                                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg absolute right-0 top-0 rounded-tr-lg">
                                    Hourly Price
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}

                        </>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChooseDocuments