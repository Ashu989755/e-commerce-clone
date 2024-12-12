import { React, useState, useEffect } from "react";
import { X } from "lucide-react";
import { businessAcceptRejectStatus } from "../apis/business/Profile";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {rejectReasonValidator} from "../helpers/validation"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Reject_Booking({ isOpen, closeModal, userId }) {
  const {
    register,
    handleSubmit,
   formState: { errors },
  } = useForm({
    resolver: yupResolver(rejectReasonValidator),
  });

  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState("0");

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectOption(value);
  };

  const handleReject = async (data) => {
    try {
      const apiData = {
        bookingId: userId,
        status: 3,
        utcDatetTime: new Date().toISOString(),
        rejectReason: data.description,
        rejectReasonStatus: selectOption,
      };
      const response = await businessAcceptRejectStatus(apiData)
      closeModal()
      toast.success(response.data.message)
      // navigate("/business-home")
    } catch (error) {
      console.log(error,"ERROR:")
    }
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
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
                  <div className="mt-3 py-5 px-10 text-center sm:mt-0 sm:text-left">
                    <div className="relative">
                      <h3 className="text-lg font-semibold">
                        Reject Booking Request
                      </h3>

                      <div className="inp my-4 relative">
                        <div class="col-sm-10">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="0"
                              checked={selectOption === "0"}
                              onChange={handleSelect}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Unavailable for this day/time
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios2"
                              value="1"
                              checked={selectOption === "1"}
                              onChange={handleSelect}
                            />
                            <label class="form-check-label" for="gridRadios2">
                              Job is too for away
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios3"
                              value="2"
                              checked={selectOption === "2"}
                              onChange={handleSelect}
                            />
                            <label class="form-check-label" for="gridRadios3">
                              Other
                            </label>
                          </div>
                          <div class="mb-3">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              {...register("description")}
                            ></textarea>
                              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <button
                          class="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                          onClick={handleSubmit(handleReject)}
                        >
                          Add
                        </button>
                      </div>
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
        </div>
      )}
    </div>
  );
}

export default Reject_Booking;
