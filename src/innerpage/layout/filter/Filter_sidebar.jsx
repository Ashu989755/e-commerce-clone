import { Slider } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";

function Filter_sidebar({ isOpen, toggleOffCanvas, applyFilters }) {
  const [distance, setDistance] = useState([0, 25]);
  const [priceType, setPriceType] = useState("perHour");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const formatValue = (value) => `${value} miles`;
  function valueText(value) {
    return `${value / 1000}k`;
  }


  const handleDistanceChange = (e, newValue) => {
    setDistance(newValue);
  };

  const handlePriceRangeChange = (e, newValue) => {
    setPriceRange(newValue); 
  };

 
  const handlePriceTypeChange = (type) => {
    setPriceType(type);
  };

  const handleApplyClick = () => {
     applyFilters({ distance, priceType, priceRange });
    toggleOffCanvas(); 
  };

  return (
    <>
      {/* Off-Canvas Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleOffCanvas}
      ></div>

      {/* Off-Canvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-[9999] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="">
          <div className="flex justify-between border-b pt-3 pb-2 px-5">
            <h2 className="text-lg font-bold text-dark_link">Filter By</h2>
            <button onClick={toggleOffCanvas} className="text-dark_link">
              <X />
            </button>
          </div>

          {/* Distance */}
          <div className="mb-5 px-5">
            <h3 className="text-sm text-dark_link font-bold my-2">Distance</h3>
            {/* <input
              type="range"
              min="0"
              max="1000"
              value={distance}
              onChange={handleDistanceChange}
              className="w-full accent-black"
            /> */}
            <Slider
              value={distance}
              onChange={handleDistanceChange}
              valueLabelDisplay="auto"
              min={0}
              max={25}
              step={1}
              valueLabelFormat={valueText}
              getAriaValueText={valueText}
              aria-labelledby="distance-slider"
            />
            <span className="font-semibold text-sm">
              {distance[0]} - {distance[1]} miles
            </span>
          </div>

          {/* Price Type */}
          <div className="mb-5 px-5">
            <h3 className="text-sm text-dark_link font-bold my-2">Price</h3>
            <div className="flex justify-between">
              <div className="w-1/2 text-center">
                <button
                  className={`px-5 py-2 border rounded-xl border-black transition-all ${
                    priceType === "perHour"
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={() => handlePriceTypeChange("perHour")}
                >
                  Per Hour
                </button>
              </div>
              <div className="w-1/2 text-center">
                <button
                  className={`px-8 py-2 border border-transparent rounded-xl transition-all ${
                    priceType === "fixed"
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={() => handlePriceTypeChange("fixed")}
                >
                  Fixed
                </button>
              </div>
            </div>
          </div>

          {/* Price Range (only show if 'perHour' is selected) */}
          {priceType === "perHour" && (
            <div className="mb-5 px-5">
              <h3 className="text-sm text-dark_link font-bold my-2">
                Set Price Range
              </h3>
              {/* <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="w-full accent-black"
              /> */}
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}  
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={50}
                aria-labelledby="price-range-slider"
                valueLabelFormat={valueText}
                getAriaValueText={valueText}
              />
              <span className="font-semibold text-sm">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
              {/* <Slider
      value={priceRange}
      onChange={handlePriceRangeChange}  
      valueLabelDisplay="auto"
      min={0}
      max={1000}
      step={50}
      aria-labelledby="price-range-slider"
      valueLabelFormat={valueText}
      getAriaValueText={valueText}
    />
   <span className="font-semibold text-sm">
  ${priceRange[0]} - ${priceRange[1]}
</span> */}
            </div>
          )}

          {/* Apply and Reset Buttons */}
          <div className="mb-5 px-5 flex flex-col">
            <button
              className="py-3 border border-transparent bg-dark_link rounded-xl text-white w-full hover:bg-black"
              onClick={handleApplyClick}
            >
              Apply
            </button>
            <button
              className="flex justify-center my-4 text-dark_link font-semibold"
              onClick={() => {
                setDistance([0, 0]);
                setPriceType("perHour");
                setPriceRange([0, 100]);
              }}
            >
              <span>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6596 10.87C12.5596 10.86 12.4396 10.86 12.3296 10.87C9.94957 10.79 8.05957 8.84 8.05957 6.44C8.05957 3.99 10.0396 2 12.4996 2C14.9496 2 16.9396 3.99 16.9396 6.44C16.9296 8.84 15.0396 10.79 12.6596 10.87Z"
                    stroke="#3C3C3C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.65973 14.56C5.23973 16.18 5.23973 18.82 7.65973 20.43C10.4097 22.27 14.9197 22.27 17.6697 20.43C20.0897 18.81 20.0897 16.17 17.6697 14.56C14.9297 12.73 10.4197 12.73 7.65973 14.56Z"
                    stroke="#3C3C3C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter_sidebar;
