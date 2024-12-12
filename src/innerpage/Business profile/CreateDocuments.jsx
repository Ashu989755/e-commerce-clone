import React, { useEffect, useRef, useState } from "react";
import Header_Business from "../layout/Header_business";
import Side_links from "./Side_links";
import DeleteDocumentsModal from "../../modals/DeleteDocuments";
import BusinessEstimateModal from "../../modals/BusinessEstimate";
import Business_invoice from "../../modals/Business_invoice";
import {
  businessGetContractList,
  BusinessEstimatesList,
  businessDeletePdf
} from "../../apis/business/Documents";
import BusinessContract from "../../modals/BusinessContract";
import { useNavigate } from "react-router-dom";


const CreateDocuments = () => {
  const [activeTab, setActiveTab] = useState("Estimate");
  const [contracts, setContracts] = useState([] || null);
  console.log(contracts)
  const [Estimate, setEstimate] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [contract, setContract] = useState(false);
  const [estimateList, setEstimateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [DeleteDocuments, setDeleteDocuments] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({ id: null, type: null });

  console.log(contracts);
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [openDropdowns, setOpenDropdowns] = useState(Array(6).fill(false));
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };

  const handleClickOutside = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setOpenDropdowns((prev) =>
          prev.map((_, i) => (i === index ? false : prev[i]))
        );
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const openDeleteDocuments = (type, id) => {
    setDeleteDocuments(true);
    setDeleteModalData({ id, type });
  };
  const closeDeleteDocuments = () => {
    setDeleteDocuments(false);
  };

  const openEstimate = () => {
    setEstimate(true);
  };
  const closeEstimate = () => {
    setEstimate(false);
  };
  const openContract = () => {
    setContract(true);
  };
  const closeContract = () => {
    setContract(false);
  };

  const openInvoiceModal = () => {
    setInvoiceModal(true);
  };
  const closeInvoiceModal = () => {
    setInvoiceModal(false);
  };

  const handleGetContractList = async () => {
    try {
      const res = await businessGetContractList();
      setContracts(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   handleGetContractList();
  // }, []);

  const handleGetEstimateList = async () => {
    try {
      const res = await BusinessEstimatesList();
      setEstimateList(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetEstimateList();
  }, []);
  useEffect(() => {
    handleGetContractList();
  }, []);

  function handleOpenContract(contract) {
    console.log(contract,"----++++++++++++++++++++++++++++++++++++++++++++--------");
    

    const pdfData = `data:application/pdf;base64,${contract.contract1}`;
    const pdfWindow = window.open("");
    pdfWindow.document.write(`
        <iframe src="${pdfData}" width="100%" height="100%" style="border: none;"></iframe>
    `);
  }

  function handleOpenEstimate(pdfPath) {
    const pdfURL = `https://ourreviewapiv2.harishparas.com/${pdfPath}`;
    const pdfWindow = window.open(pdfURL, "_blank");
    if (!pdfWindow) {
      alert("Please allow popups for this website");
    }
  }

  const filteredList = estimateList?.filter(
    (item) => item.estimateType === 0 && item.estimateId
  );
  const filteredInvoiceList = estimateList?.filter(
    (item) => item.estimateType === 1 && item.estimateId
  );

  const estimateNavigate = (list) => {
    navigate("/update-estimates", { state: list });
  };





  return (
    <>
      <Header_Business />
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="lg:col-span-2 col-span-5">
              <Side_links />
            </div>

            <div className="lg:col-span-3 col-span-5">
              <div className="grid ">
                <div className="item shadow-md border border-gray-100 rounded-xl md:p-10 p-6 w-full mx-auto bg-white">
                  <div className="desc block items-start md:flex justify-between mb-4">
                    <h3 className="text-xl font-bold text-dark_link mb-3 md:mb-0">
                      Saved Documents
                    </h3>

                    <div className="col-span-1">
                      <div className="tab-bar ms-auto justify-start items-center !border-0 transition-all">
                        <button className={`!rounded-xl !w-fit px-4 md:px-2 !text-sm ${activeTab === "Estimate" ? "active" : "shadow-md"
                            }`}
                          onClick={() => handleTabClick("Estimate")}
                        >
                          Estimate
                        </button>

                        <button
                          className={`!rounded-xl !w-fit px-4 md:px-2 !text-sm ${activeTab === "Invoice" ? "active" : "shadow-md"
                            }`}
                          onClick={() => handleTabClick("Invoice")}
                        >
                          Invoice
                        </button>

                        <button
                          className={`!rounded-xl !w-fit px-4 md:px-2 !text-sm ${activeTab === "Contract" ? "active" : "shadow-md"
                            }`}
                          onClick={() => handleTabClick("Contract")}
                        >
                          Contract
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="col-span-2 flex flex-col gap-4">
                      <div className="tab-content">
                        {activeTab === "Estimate" && (
                          <div className="flex flex-col gap-4">
                            {filteredList?.length === 0 ? (
                              <div>No data found</div>
                            ) : (
                              <>
                                {filteredList?.map((list, index) => (
                                  <div
                                    className="border p-4 rounded-lg flex items-center justify-between relative"
                                    key={index}
                                  >
                                    <div className="flex items-center gap-4 justify-between w-full"
                                    >
                                      <div 
                                      className="flex items-center gap-4"
                                        onClick={() =>
                                          handleOpenEstimate(list.pdfFile)
                                        }
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
                                        ref={(el) =>
                                          (dropdownRefs.current[index] = el)
                                        }
                                      >
                                        <button
                                          onClick={() => toggleDropdown(index)}
                                          className="inline-block text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-200 p-2 rounded-md"
                                        >
                                          <svg
                                            className="w-5 h-5 rotate-90"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                          >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                          </svg>
                                        </button>
                                        {openDropdowns[index] && (
                                          <div className="absolute z-10 bg-white border mt-2 rounded-md shadow-lg">
                                            <ul className="py-2">
                                              <li

                                                onClick={() =>
                                                  estimateNavigate(list)
                                                }
                                                className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center"
                                              >
                                                <span>
                                                  {" "}
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="#3C3C3C"
                                                    className="size-6"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                  </svg>
                                                </span>
                                                Edit
                                              </li>
                                              <li
                                                className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center"
                                                onClick={() => openDeleteDocuments(1, list?.estimateId)}
                                              >
                                                <span>
                                                  {" "}
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="#3C3C3C"
                                                    className="size-6"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                  </svg>{" "}
                                                </span>
                                                Delete
                                              </li>
                                              <li className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center">
                                                <span>
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="#3C3C3C"
                                                    className="size-6"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                                    />
                                                  </svg>{" "}
                                                </span>
                                                Share
                                              </li>
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                      {(list.estimatePriceType === "perHour" || list.estimatePriceType === "0") && (
                                        <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg absolute right-0 top-0 rounded-tr-lg">
                                          Hourly Price
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                <div className="flex justify-end">
                                  <button
                                    className="bg-dark_link py-3 px-6 text-white font-medium rounded-lg block"
                                    type="button"
                                    onClick={openEstimate}
                                  >
                                    Create New Estimate
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {activeTab === "Invoice" && (
                          <div className="flex flex-col gap-4">
                            {filteredInvoiceList?.length === 0 ? (
                              <div>No data found</div>
                            ) : (
                              filteredInvoiceList?.map((list, index) => (
                                <div
                                  className="border p-4 rounded-lg  relative"
                                  key={index}
                                >
                                  <div
                                    className="flex items-center justify-between"
                                    
                                  >
                                    <div onClick={() =>
                                      handleOpenEstimate(list.pdfFile)
                                    }
                                    className="flex items-center gap-4"
                                    >
                                      <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                          src={
                                            list?.estimateImage
                                              ? `https://api.our-review.com/EstimateImages/${list.estimateImage}`
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
                                      ref={(el) =>
                                        (dropdownRefs.current[index] = el)
                                      }
                                    >
                                      <button
                                        onClick={() => toggleDropdown(index)}
                                        className="inline-block text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-200 p-2 rounded-md"
                                      >
                                        <svg
                                          className="w-5 h-5 rotate-90"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          viewBox="0 0 16 3"
                                        >
                                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                      </button>
                                      {openDropdowns[index] && (
                                        <div className="absolute z-10 bg-white border mt-2 rounded-md shadow-lg">
                                          <ul className="py-2">
                                            <li
                                              onClick={() =>
                                                estimateNavigate(list)
                                              } className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center">
                                              <span>
                                                {" "}
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth="1.5"
                                                  stroke="#3C3C3C"
                                                  className="size-6"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                  />
                                                </svg>
                                              </span>
                                              Edit
                                            </li>
                                            <li
                                              className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center"
                                              onClick={() => openDeleteDocuments(1, list?.estimateId)}
                                            >
                                              {/* Delete option */}
                                              <span>
                                                {" "}
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth="1.5"
                                                  stroke="#3C3C3C"
                                                  className="size-6"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                  />
                                                </svg>
                                              </span>
                                              Delete
                                            </li>
                                            <li className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center">
                                              {/* Share option */}
                                              <span>
                                                {" "}
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth="1.5"
                                                  stroke="#3C3C3C"
                                                  className="size-6"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                                  />
                                                </svg>
                                              </span>
                                              Share
                                            </li>
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                    {(list.estimatePriceType === "perHour" || list.estimatePriceType === "0") && (
                                      <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg absolute right-0 top-0 rounded-tr-lg">
                                        Hourly Price
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))

                            )}
                            <div className="flex justify-end">
                              <button
                                className="bg-dark_link py-4 px-6 text-white font-medium rounded-lg block"
                                type="button"
                                onClick={openInvoiceModal}
                              >
                                Create New Invoice
                              </button>
                            </div>
                          </div>
                        )}




                        {activeTab === "Contract" && (
                          <div className="flex flex-col gap-4">
                            {Array.isArray(contracts) && contracts?.map((contract, index) => (
                              <div
                                className="border p-4 rounded-lg flex items-center justify-between relative"
                                key={index}
                              >
                                <div onClick={() => handleOpenContract(contract)}>
                                  <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                                      <img
                                        src="https://images.unsplash.com/photo-1445964047600-cdbdb873673d?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="text-lg font-bold text-dark_link mb-0">
                                        Contract Document {index + 1}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="relative mt-3"
                                  ref={(el) => (dropdownRefs.current[index] = el)}
                                >
                                  <button
                                    onClick={() => toggleDropdown(index)}
                                    className="inline-block text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-200 p-2 rounded-md"
                                  >
                                    <svg
                                      className="w-5 h-5 rotate-90"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 16 3"
                                    >
                                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                  </button>
                                  {openDropdowns[index] && (
                                    <div className="absolute z-10 bg-white border mt-2 rounded-md shadow-lg">
                                      <ul className="py-2">
                                        <li
                                          className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center"
                                          onClick={() => openDeleteDocuments(2, contract?.estimateId)}
                                        >
                                          <span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth="1.5"
                                              stroke="#3C3C3C"
                                              className="size-6"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                              />
                                            </svg>
                                          </span>
                                          Delete
                                        </li>
                                        <li className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex gap-3 items-center">
                                          <span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth="1.5"
                                              stroke="#3C3C3C"
                                              className="size-6"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                              />
                                            </svg>
                                          </span>
                                          Share
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <button
                                className="bg-dark_link py-4 px-6 text-white font-medium rounded-lg block"
                                type="button"
                                onClick={openContract}
                              >
                                Create New Contract
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteDocumentsModal
        isOpen={DeleteDocuments}
        closeModal={closeDeleteDocuments}
        deleteModalData={deleteModalData}
        BusinessEstimatesList={BusinessEstimatesList}
      />

      <BusinessEstimateModal
        isOpen={Estimate}
        closeModal={closeEstimate}
        estimateList={estimateList}
      />

      <BusinessContract isOpen={contract} closeModal={closeContract} />

      <Business_invoice
        isOpen={invoiceModal}
        closeModal={closeInvoiceModal}
        estimateList={estimateList}
      />

      {/* <DeleteDocuments 
      isOpen={DeleteDocuments}
      closeModal={closeDeleteDocuments}
       /> */}
    </>
  );
};

export default CreateDocuments;
