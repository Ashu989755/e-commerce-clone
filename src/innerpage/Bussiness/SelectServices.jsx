import React, { useState } from "react";
import Footer_two from "../layout/Footer_two";
import { Link } from "react-router-dom";
import { InfoIcon, ServiceIcon, UserIcon } from "../../assets/image";
import Header_Business from "../layout/Header_business"
import { Search } from "lucide-react";
import { businessAddServices } from "../../apis/business/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import Header_Track from "./Header_Track";

const SelectServices = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedServices, setSelectedServices] = useState([]);
  console.log(selectedServices)
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
   if (checked) {
      setSelectedServices((prev) => [...prev, value]);
    } else {
      setSelectedServices((prev) =>
        prev.filter((service) => service !== value)
      );
    }
  };

  const handleAddServices = async() => {
    if(selectedServices.length >  0){
    try {
      const apiData = {
        serviceType: selectedServices
      }
      const res = await businessAddServices(apiData)
      if(res?.data?.success == true){
        const userData = res.data.data;
        console.log(userData,"====================")
        dispatch(
          updateUser({
          user: { ...userData},
          })
        );
        navigate("/business-add-availability")
      }
    } catch (error) {
      console.log(error)
      toast.error(res?.data?.message)
    }}else{
      toast.error("Please Select Service")
    }
  }
 

  return (
    <>
      <Header_Business/>
      <section className="py-32">
      < Header_Track />

        <div className="ad_crd py-6">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="desc">
                <h3 className="text-xl font-bold text-center text-dark_link mb-4">
                  Select Services
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                <div className="itm mb-4 col-span-2 relative">
                  {/* <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                    <Search className='opacity-40' />
                  </span> */}
                  {/* <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Search business or service"
                    type="text"
                    name=""
                    id=""
                  /> */}
                </div>

                <div className="col-span-2 flex flex-col gap-4 mb-4">
                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-1"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      HouseKeeping
                    </label>
                    <input
                      id="bordered-checkbox-1"
                      type="checkbox"
                      value="HouseKeeping"
                      onChange={handleCheckboxChange}
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-2"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      Driving
                    </label>
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="Driving"
                      onChange={handleCheckboxChange}
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                  </div>
                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-2"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      Pet Care
                    </label>
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="PetCare"
                      onChange={handleCheckboxChange}
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                  </div>
                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-2"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      HomeWorkHelp
                    </label>
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="HomeWorkHelp"
                      onChange={handleCheckboxChange}
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                  </div>
                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-2"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      Running Errands
                    </label>
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="RunningErrands"
                      onChange={handleCheckboxChange}
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                  </div>
                  <div class="flex items-center p-3 border border-gray-200 rounded-lg dark:border-gray-700 ">
                    <label
                      for="bordered-checkbox-2"
                      class="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3"
                    >
                      <div className="bg-[#EBEBEB] w-[2.188rem] h-[2.188rem] rounded-full flex items-center justify-center">
                        <img src={ServiceIcon} alt="" />
                      </div>
                      Fun Activity Out House
                    </label>
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="FunActivityOutHouse"
                      name="bordered-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      onChange={handleCheckboxChange}
                     
                    />
                  </div>
                </div>
                <div className="inp col-span-2 text-center">
                  <button
                  onClick={handleAddServices}
                    className="w-full bg-dark_link py-4 text-white font-medium rounded-lg flex justify-center"
                  >
                    {" "}
                    Next{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two></Footer_two>
    </>
  );
};

export default SelectServices;
