import React, { useState } from "react";
import Footer_two from "../layout/Footer_two";
import Header_Business from "../layout/Header_business";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { addReviewValidator } from "../../helpers/validation";
import "../../index.css";
import { useLocation } from "react-router-dom";
import { customerGiveReviewAndRating } from "../../apis/customer/profile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BussinessUserRating = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { state } = useLocation();
  console.log(state)

  const [rating, setRating] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const getColor = () => {
    if (rating <= 3) return "#ff4e50";
    if (rating <= 5) return "#f9d423";
    if (rating <= 7) return "#24c6dc";
    return "#30d94b";
  };

  const handleGiveRating = async (data) => {

    try {
      const apiData = {
        touserId: state?.userId,
        bookingId: state?.bookingId,
        Rate: rating,
        description: data.description,
      };
      const res = await customerGiveReviewAndRating(apiData)
      toast.success(res?.data?.message)
      navigate(`/past-job/${state?.bookingId}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />
        <section className="pb-20 pt-40 px-6">
          <div className="container mx-auto">
            <div className="lg:w-5/12 md:w-8/12 w-full mx-auto">
              <div className="p-4 bg-white rounded-lg transition-all shadow-md">
                <div class="mt-3 py-5 px-5">
                  <div class="relative">
                    <h3 class="text-lg font-semibold">Give Rating</h3>
                    <p class="text-gray-600 text-sm">
                      How was your experience with this Job?
                    </p>

                    <div className="flex items-center gap-4 bg-white shadow-md border border-gray-100 rounded-md px-6 py-4 my-6">
                      <div className="size-20 overflow-hidden rounded-md ">
                        <img
                          src={state?.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-lg font-semibold">
                        <h2 className="text-md">Uneven Work</h2>
                        <span className="px-4 py-1 text-sm font-bold text-white rounded-lg bg-blue-500">
                          {state?.rating}
                        </span>
                        <div className="mt-2">
                          {state?.bookedServices?.map((item) =>
                            <span class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-3 py-1 rounded-full">
                              {item}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="inp my-4 relative">
                      <label
                        for=""
                        class="text-md text-gray-900 mb-3 font-semibold"
                      >
                        Rate
                      </label>
                      <div className="rating-container">
                        {/* Numbers above the slider */}
                        <div className="slider-labels">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <span key={num} className="slider-number">
                              {num}
                            </span>
                          ))}
                        </div>

                        {/* Slider input */}
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={rating}
                          step="1"
                          onChange={handleRatingChange}
                          className="slider"
                        />

                        {/* Current rating value displayed */}
                        <span
                          className="rating-value"
                          style={{ color: getColor() }}
                        >
                          {rating}
                        </span>
                      </div>
                      {rating === 0 && (
                        <p className="text-red-600 mt-1 text-sm">
                          Rating is required
                        </p>
                      )}
                    </div>
                    <div className="inp my-4 relative">
                      <label
                        htmlFor=""
                        className="text-md text-gray-900 mb-3 font-semibold"
                      >
                        Write Review
                      </label>
                      <textarea
                        name="description"
                        className="mt-2 w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        id="description"
                        rows={5}
                        {...register("description", { required: "Description is required" })}
                      />

                    </div>
                    <p className="text-red-600 mt-1 text-sm ">
                      {errors.description?.message}
                    </p>
                    <div class="">
                      <button onClick={handleSubmit(handleGiveRating)} class="w-full bg-dark_link py-4 text-white font-medium rounded-lg">
                        Submit
                      </button>
                    </div>
                  </div>
                  <div class="mod_hd absolute right-4 top-3">
                    <button type="button">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3C3C3C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer_two></Footer_two>
      </div>
    </>
  );
};

export default BussinessUserRating;
