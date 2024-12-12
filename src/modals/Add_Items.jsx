import React, { useState } from "react";
import { X } from "lucide-react";
import { addItemsValidator } from "../helpers/validation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Add_Items({ isOpen, closeModal,onAddItem }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addItemsValidator),
  });

  const onSubmit = (data) => {
    console.log(data);
    onAddItem(data);
    closeModal()
  };

  return (
    <>
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        {isOpen && (
          <div
            id="add_modal"
            className="fixed z-[9999] inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0 text-center">
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
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
                   shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {/* Modal Content */}
                <div className="bg-white">
                  <div className="mt-3 py-5 px-6 sm:mt-0">
                    <div className="relative">
                      <h3 className="text-lg font-semibold">Add Item</h3>
                      <div className="inp my-4 relative">
                        <label>Item Name</label>

                        <Controller
                          name="itemName"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-2 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                              placeholder="Enter Item Name"
                            />
                          )}
                        />
                        {errors.itemName && (
                          <p className="text-red-600">
                            {errors.itemName.message}
                          </p>
                        )}
                      </div>
                      <div className="inp my-4 relative">
                        <label>Item Price</label>

                        <Controller
                          name="itemPrice"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-2 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                              placeholder="Enter Amount"
                              type="number"
                              min="0"
                            />
                          )}
                        />
                        {errors.itemPrice && (
                          <p className="text-red-600">
                            {errors.itemPrice.message}
                          </p>
                        )}
                      </div>
                      <div className="inp my-4 relative">
                        <label>Select Quantity</label>

                        <select
                          id="inputState"
                          class="form-select w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-2 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          {...register("quantity")}
                        >
                          <option value="" disabled selected>
                            Choose...
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      {errors.quantity && (
                        <p className="text-red-500">
                          {errors.quantity.message}
                        </p>
                      )}
                      <div className="inp flex justify-end gap-3">
                        <button
                          onClick={handleSubmit(onSubmit)}
                          className="bg-dark_link py-4 px-10 text-white font-medium rounded-lg w-full"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="mod_hd absolute right-4 top-3">
                      <button onClick={closeModal} type="button">
                        <X color="#3C3C3C" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Add_Items;
