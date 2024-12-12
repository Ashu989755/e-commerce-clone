import { X } from "lucide-react";
import React, { useState,useEffect } from "react";
import { RatingDummy } from "../assets/image";
import "../index.css";
// import { businessAddReview } from "../apis/business/Profile";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addReviewValidator } from "../helpers/validation";

function Business_Rating({ isOpen, closeModal, setCustomerRating }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addReviewValidator),
  });

  const [rating, setRating] = useState(1);
  const today = new Date().toISOString().split("T")[0];

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  
  const getColor = () => {
    if (rating <= 3) return "#ff4e50"; // red 
    if (rating <= 5) return "#f9d423"; // yellow 
    if (rating <= 7) return "#24c6dc"; // blue 
    return "#30d94b"; // green 
  };

  const handleGiveRating = (data) => {
    const date = new Date(data.date); 
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; 

    const apiData = {
      ReviewDesc: data.description,
      Title: data.title,
      Rate: rating,
      DateOfVisit: date,
    };
    setCustomerRating(apiData);
    closeModal();
  };
//   useEffect(() => {
//     if (rating) {
//       setCustomerRating(rating); // Ensure rating is passed back to the parent component
//     }
//   }, [rating]);
  

  return (
    <>
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        {isOpen && (
          <div
            id="add_modal"
            className="fixed z-[9999] inset-0 overflow-y-auto"
          >
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
                    <div className="mt-3 py-5 px-5 text-center sm:mt-0 sm:text-left">
                      <div className="relative">
                        <h3 className="text-lg font-semibold">Give Rating222</h3>
                        <p className="text-gray-600 text-sm">
                          How was your experience with this Job?
                        </p>

                        {/* upload img */}

                        <div className="inp my-4 relative">
                          <label
                            htmlFor=""
                            className="text-md text-gray-900  font-semibold"
                          >
                            Title
                          </label>
                          <input
                            className="w-full mt-2 text-sm outline-0 bg-[#F7F7F7] py-4 px-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                            placeholder="Enter Text"
                            type="text"
                            name=""
                            id=""
                            {...register("title")}
                          />
                        </div>
                        <p className="text-red-600 mt-1 text-sm ">
                          {errors.title?.message}
                        </p>

                        <div className="inp my-4 relative">
                          <label
                            htmlFor=""
                            className="text-md text-gray-900 mb-3 font-semibold"
                          >
                            Write Review
                          </label>
                          <textarea
                            name=""
                            className="mt-2 w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                            id=""
                            rows={5}
                            {...register("description")}
                          ></textarea>
                        </div>
                        <p className="text-red-600 mt-1 text-sm ">
                          {errors.description?.message}
                        </p>
                        <div className="inp my-4 relative">
                          <label
                            htmlFor=""
                            className="text-md text-gray-900 mb-3 font-semibold"
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
                            Date of Visit
                          </label>
                          <div className="flex gap-3 items-center">
                            <input
                              className="w-full text-left text-sm outline-0 bg-[#F7F7F7] p-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                              placeholder="DD"
                              type="date"
                              name=""
                              id=""
                              {...register("date")}
                              max={today}
                            />
                          </div>
                        </div>
                        <div className="">
                          <button onClick={handleSubmit(handleGiveRating)} class="w-full bg-dark_link py-4 text-white font-medium rounded-lg">
                            Submit
                          </button>
                        </div>
                      </div>
                      <div className="mod_hd absolute right-4 top-3">
                        <button type="button" onClick={closeModal}>
                          {" "}
                          <X color="#3C3C3C" />{" "}
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
    </>
  );
}

export default Business_Rating;
