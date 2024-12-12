import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PaymentIcon } from "../assets/image";
import {
  businessSaveContract,
  businessDownloadContract,
} from "../apis/business/Documents";
import { toast } from "react-toastify";

function BusinessContract({ isOpen, closeModal, setFileLink }) {
  const [file, setFile] = useState(null);
  console.log(file,"+++++++++++++++++");
  
  const [sampleContractUrl, setSampleContractUrl] = useState(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddContract = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const apiData = {
        contract: file,
      };

      const res = await businessSaveContract(apiData);
      toast.success(res?.data?.message)
    } catch (error) {
      toast.error(res?.data?.message)
      console.log("File upload error:", error);
    }
  };

  const handleUploadSampleContract = async () => {
    try {
      const res = await businessDownloadContract();
      setSampleContractUrl(res?.data?.data); 
      // setFileLink(res?.data?.data)
     closeModal()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUploadSampleContract();
  }, []);

  const openSampleContract = () => {
    if (sampleContractUrl) {
      const pdfWindow = window.open("");
      pdfWindow.document.write(`
        <iframe src="${sampleContractUrl}" width="100%" height="100%" style="border: none;"></iframe>
      `);
    } else {
      console.log("Sample contract URL is not available");
    }
  };
  


  return (
    <>
      {isOpen && (
        <div id="add_modal" className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* Modal Content */}
              <div className="bg-white">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mod_hd absolute right-4 top-3">
                      <button type="button" onClick={closeModal}>
                        <X color="#3C3C3C" />
                      </button>
                    </div>
                    <div className="px-8 py-10">
                      <h2 className="text-xl font-semibold text-center mb">
                        Contract
                      </h2>
                      <p className="text-sm mb-8 text-center">
                        please select option for upload Contract
                      </p>
                      {/* Buttons */}
                      <div className="flex justify-center flex-col gap-3">
                        <input type="file" onChange={handleFileChange} />
                        <button
                          className="bg-white rounded-xl text-dark border-2 px-4 py-3 text-left flex items-center mb-3 gap-4"
                          onClick={handleAddContract}
                        >
                          Upload
                        </button>
                        <button onClick={openSampleContract} className="bg-white rounded-xl text-dark border-2 px-4 py-3 flex items-center gap-4">
                          <img src={PaymentIcon} alt="" />
                          Use Sample
                        </button>
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
  );
}

export default BusinessContract;
