import React, { useState } from "react";
import { X } from "lucide-react";
import { MasterCard } from "../assets/image";
import Add_new_card from "./Add_new_card";
import AddNewCardSendPayment from "./AddNewCardSendPayment";
import PaymentSuccess from "./PaymentSuccess";

function SendPayment({ isOpen, closeModal,setIsOpen }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  const [isOpen1, setIsOpen1] = useState(false);

  const openModal1 = () => {
    setIsOpen1(true);
    setIsOpen(false)
  };

  const closeModal1 = () => {
    setIsOpen1(false);
    setIsOpen(true)
  };

  const [isOpen3, setIsOpen3] = useState(false);

  const openModal3 = () => {
    setIsOpen3(true);
  };

  const closeModal3 = () => {
    setIsOpen3(false);
  };

  return (
    <div>
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
                <div className="mt-3 py-5 px-10 text-center sm:mt-0 sm:text-left">
                  <div className="modal-header">
                    <h3 className="text-lg font-semibold">Send Payment</h3>
                    <p className="text-sm text-gray-600">
                      How was your experience with this Job?
                    </p>
                  </div>
                  <div className="modal-body py-3">
                    <div className="crd bg-white p-4 rounded-xl shadow-xl mb-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-gray font-semibold">
                          Payment Card
                        </h4>
                        <button className="bg-dark_link px-5 py-2 rounded-xl flex gap-2 text-white font-medium items-center" onClick={openModal1}>
                          Add new card
                        </button>
                      </div>
                      <hr className="my-4" />

                      <div className="flex flex-col gap-4">
                        {/* Card 1 */}
                        <div
                          className={` rounded-lg p-4 cursor-pointer transition bg-[#F7F7F7] ${
                            selectedOption === "option1"
                              ? "bg-[#F7F7F7]"
                              : "border-gray-50"
                          }`}
                          onClick={() => handleOptionChange("option1")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="card-logo">
                                <img src={MasterCard} alt="" />
                              </div>
                              <label
                                htmlFor="option1"
                                className="ml-3 cursor-pointer text-lg font-medium text-gray-700"
                              >
                                <p>9587 5498 8569 7569</p>
                                <p className="text-sm text-gray-600">
                                  Master card
                                </p>
                              </label>
                            </div>
                            <input
                              type="radio"
                              id="option1"
                              name="payment"
                              value="option1"
                              checked={selectedOption === "option1"}
                              onChange={() => handleOptionChange("option1")}
                              className="form-radio h-5 w-5 text-gray-600 cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Card 2 */}
                        <div
                          className={` rounded-lg p-4 cursor-pointer transition bg-[#F7F7F7] ${
                            selectedOption === "option2"
                              ? "border-gray-500 bg-[#F7F7F7]"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleOptionChange("option2")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="card-logo">
                                <img src={MasterCard} alt="" />
                              </div>
                              <label
                                htmlFor="option2"
                                className="ml-3 cursor-pointer text-lg font-medium text-gray-700"
                              >
                                <p>9587 5498 8569 7569</p>
                                <p className="text-sm text-gray-600">
                                  Master card
                                </p>
                              </label>
                            </div>
                            <input
                              type="radio"
                              id="option2"
                              name="payment"
                              value="option2"
                              checked={selectedOption === "option2"}
                              onChange={() => handleOptionChange("option2")}
                              className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button class="w-full bg-dark_link py-4 text-white font-medium rounded-lg" onClick={openModal3}> Pay Now </button>
                  </div>
                  <div className="mod_hd absolute right-4 top-3">
                    <button type="button" onClick={closeModal}>
                      <X color="#3C3C3C" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AddNewCardSendPayment isOpen1={isOpen1} closeModal1={closeModal1} />
      <PaymentSuccess isOpen3={isOpen3} closeModal3={closeModal3} />
      {/* <Add_new_card isOpen1={isOpen1} closeModal1={closeModal1} /> */}
    </div>
  );
}

export default SendPayment;
