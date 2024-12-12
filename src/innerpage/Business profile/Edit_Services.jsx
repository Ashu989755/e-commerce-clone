import React, { useEffect, useState } from "react";
import Footer_two from "../layout/Footer_two";
import { Link } from "react-router-dom";
import { InfoIcon, ServiceIcon, UserIcon } from "../../assets/image";
import Header_Business from "../layout/Header_business";
import { Search } from "lucide-react";
import { businessAddServices } from "../../apis/business/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import Side_links from "./Side_links";
import { useSelector } from "react-redux";
import { customerProfile } from "../../apis/customer/profile";

const Edit_Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [selectedServices, setSelectedServices] = useState([]);
  const [profileServices, setProfileServices] = useState([]);


  useEffect(() => {
    setSelectedServices(profileServices);
  }, [profileServices]);

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

  const handleUserProfile = async () => {
    try {
      const res = await customerProfile();
      setProfileServices(res?.data?.data?.services);
      const userData = res.data.data?.services;
      console.log(userData, "====================");
      dispatch(
        updateUser({
          user: { ...userData },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleAddServices = async () => {
    if (selectedServices.length > 0) {
      try {
        const apiData = {
          serviceType: selectedServices,
        };
        const res = await businessAddServices(apiData);
        if (res?.data?.success == true) {
          handleUserProfile();
          navigate("/business-my-profile");
          toast.success("Services Updated Successfully");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please Select Service");
    }
  };

  return (
    <>
      <Header_Business />

      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                My Profile
              </h3>
              <p className="text-center text-white pt-3"></p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="lg:col-span-2 col-span-5">
              <Side_links></Side_links>
            </div>
            <div className="lg:col-span-3 col-span-5">
              <div className="ad_crd">
                <div className="grid content-center h-full">
                  <div className="item shadow-md border border-gray-100 rounded-2xl md:p-10 p-6 bg-white">
                    <div className="desc">
                      <h3 className="text-xl font-bold  text-dark_link mb-4">
                        Services
                      </h3>
                      <hr></hr>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 mt-5">
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
                            value="Housekeeping"
                            checked={selectedServices.includes("Housekeeping")}
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
                            checked={selectedServices.includes("Driving")}
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
                            PetCare
                          </label>
                          <input
                            id="bordered-checkbox-2"
                            type="checkbox"
                            value="PetCare"
                            checked={selectedServices.includes("PetCare")}
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
                            checked={selectedServices.includes("HomeWorkHelp")}
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
                            RunningErrands
                          </label>
                          <input
                            id="bordered-checkbox-2"
                            type="checkbox"
                            value="RunningErrands"
                            checked={selectedServices.includes(
                              "RunningErrands"
                            )}
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
                            FunActivityOutHouse
                          </label>
                          <input
                            id="bordered-checkbox-2"
                            type="checkbox"
                            value="FunActivityOutHouse"
                            name="bordered-checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                            checked={selectedServices.includes(
                              "FunActivityOutHouse"
                            )}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      </div>
                      <div className="inp text-end w-40 mt-3 flex justify-items-end">
                        <button
                          onClick={handleAddServices}
                          className="w-full bg-dark_link py-4 text-white font-medium rounded-lg flex justify-center"
                        >
                          {" "}
                          Edit Service{" "}
                        </button>
                      </div>
                    </div>
                  </div>
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

export default Edit_Services;
