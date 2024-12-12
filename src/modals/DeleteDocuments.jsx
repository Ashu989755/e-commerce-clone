import { X } from "lucide-react";
import React, { useState } from "react";
import { businessDeletePdf } from "../apis/business/Documents";
import { toast } from "react-toastify";



function DeleteDocuments({ isOpen, closeModal, deleteModalData,BusinessEstimatesList }) {
console.log(deleteModalData)
  const id = deleteModalData.id;
  const type = deleteModalData.type


  const handleDeletePdf = async () => {
    try {
      const apiData = {
        id: id,
        type : type
      }
     const res = await businessDeletePdf(apiData)
     toast.success(res?.data?.message)
     BusinessEstimatesList()
     closeModal();
    } catch (error) {
      console.log(error)
    }
  }

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
              <div className="bg-white ">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mod_hd absolute right-4 top-3">
                      <button type="button" onClick={closeModal}>
                        <X color="#3C3C3C" />
                      </button>
                    </div>
                    <div className="px-8 py-10">
                      <span className="flex justify-center">
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 88 91"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M35.75 14H52.25C52.25 11.812 51.3808 9.71354 49.8336 8.16637C48.2865 6.61919 46.188 5.75 44 5.75C41.812 5.75 39.7135 6.61919 38.1664 8.16637C36.6192 9.71354 35.75 11.812 35.75 14ZM30.25 14C30.25 10.3533 31.6987 6.85591 34.2773 4.27728C36.8559 1.69866 40.3533 0.25 44 0.25C47.6467 0.25 51.1441 1.69866 53.7227 4.27728C56.3013 6.85591 57.75 10.3533 57.75 14H85.25C85.9793 14 86.6788 14.2897 87.1945 14.8055C87.7103 15.3212 88 16.0207 88 16.75C88 17.4793 87.7103 18.1788 87.1945 18.6945C86.6788 19.2103 85.9793 19.5 85.25 19.5H79.453L72.886 76.392C72.4218 80.4136 70.4954 84.1241 67.4733 86.8176C64.4511 89.5112 60.5443 90.9997 56.496 91H31.504C27.4557 90.9997 23.5489 89.5112 20.5268 86.8176C17.5046 84.1241 15.5782 80.4136 15.114 76.392L8.547 19.5H2.75C2.02065 19.5 1.32118 19.2103 0.805457 18.6945C0.289732 18.1788 0 17.4793 0 16.75C0 16.0207 0.289732 15.3212 0.805457 14.8055C1.32118 14.2897 2.02065 14 2.75 14H30.25ZM38.5 36C38.5 35.2707 38.2103 34.5712 37.6945 34.0555C37.1788 33.5397 36.4793 33.25 35.75 33.25C35.0207 33.25 34.3212 33.5397 33.8055 34.0555C33.2897 34.5712 33 35.2707 33 36V69C33 69.7293 33.2897 70.4288 33.8055 70.9445C34.3212 71.4603 35.0207 71.75 35.75 71.75C36.4793 71.75 37.1788 71.4603 37.6945 70.9445C38.2103 70.4288 38.5 69.7293 38.5 69V36ZM52.25 33.25C51.5207 33.25 50.8212 33.5397 50.3055 34.0555C49.7897 34.5712 49.5 35.2707 49.5 36V69C49.5 69.7293 49.7897 70.4288 50.3055 70.9445C50.8212 71.4603 51.5207 71.75 52.25 71.75C52.9793 71.75 53.6788 71.4603 54.1945 70.9445C54.7103 70.4288 55 69.7293 55 69V36C55 35.2707 54.7103 34.5712 54.1945 34.0555C53.6788 33.5397 52.9793 33.25 52.25 33.25Z"
                            fill="#F05151"
                          />
                        </svg>
                      </span>
                      <h2 className="text-xl font-semibold text-center  mt-4 mb-1">
                        Delete Documents
                      </h2>
                      <p className="text-center font-normal text-gray-500 mb-5">
                        Do you really want to delete the decument?
                      </p>
                      {/* buttons */}
                      <div className="flex justify-center flex-col gap-3">
                        <button onClick={handleDeletePdf} className="bg-dark_link rounded-xl text-white px-10 py-3">
                          Yes Delete
                        </button>
                        <button onClick={closeModal} className="text-text_dark">
                          Cancel
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

export default DeleteDocuments;
