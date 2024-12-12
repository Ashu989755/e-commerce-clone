import React, { useState, useEffect } from "react";
import Header_Business from "../layout/Header_business";
import AddCustomer from "../../modals/AddCustomer";
import { businessDashboardData } from "../../apis/business/Profile";
import Skeleton from "react-loading-skeleton";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { businessSearch } from "../../apis/business/Profile";
import { PlusBlack, SearchWhite } from "../../assets/image";
import Footer_two from "../layout/Footer_two";
import Pagination from "../../components/Pagination";


const BussinessHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationn, setLocation] = useState({ longitude: "", latitude: "" });
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFavourite, setFavourite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(locationData);
            resolve(locationData);
          },
          (error) => {
            console.error("Error getting location", error);
            setLocation({ latitude: "", longitude: "" });
            resolve({ latitude: "", longitude: "" });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve({ latitude: "", longitude: "" });
      }
    });
  };

  const handleBusinessDashboard = async () => {
    setLoading(true);
    const locationData = await getLocation();
    try {
      const apiData = {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };
      const res = await businessDashboardData(apiData);
      setUserData(res?.data?.data);
      const usersWithFavourites = res?.data?.data?.map((user) => ({
        ...user,
        isFavourite: false,
      }));
      console.log(usersWithFavourites, "User With Fvourites:");

      setUserData(usersWithFavourites);
      setFilteredUsers(usersWithFavourites);
      setFilteredUsers(res?.data?.data);
    } catch (error) {
      console.log(error, "error:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBusinessDashboard();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/user-details/${id}`);
  };
  const handleNavigateTo = (id) => {
    navigate(`/user-review-details/${id}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = userData?.filter((user) =>
      user.reviewedToFullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [userData, searchTerm]);

  const handleSearch = async () => {
    try {
      const apiData = {
        filterParameter: JSON.stringify(filteredUsers),
      };
      const res = await businessSearch(apiData);
    } catch (error) {
      console.log(error);
    }
  };

  const itemsPerPage = 12;

  const total = userData?.length; 
  console.log(total, "total Data is here");

  const currentData = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(currentData, "------currentData");
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); 
    console.log(newPage, "New Page is Here");
  };


  const handleFavouriteToggle = (id) => {12.
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.reviewedToId === id
          ? { ...user, isFavourite: !user.isFavourite }
          : user
      )
    );

    
  };
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />

        <section className="py-24  px-6 ">
          <div className="container mx-auto">
            <div className="pt-10 md:flex block justify-between items-center">
              <h1 className="text-2xl font-bold md:mb-0 mb-4">All Users</h1>
              <div>
                <div className="flex items-center gap-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="w-full outline-0 bg-white py-3 ps-6 pe-20 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark sm:min-w-[25rem] min-w-auto"
                      placeholder="Search business or service"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="bg-[#303030] w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-md absolute top-1.5 right-1.5"
                      onClick={handleSearch}
                    >
                      <img src={SearchWhite} alt="" />
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-2 border shrink-0 border-[#303030] rounded-xl py-2.5 sm:px-5 px-2.5 text-[#303030] font-semibold"
                    onClick={openModal}
                  >
                    <img src={PlusBlack} alt="" />
                    <span className="hidden sm:block">Add Review</span>
                  </button>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="grid grid-cols-3 gap-4 my-4">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="card p-4 bg-white rounded-lg transition-all shadow-md"
                    >
                      <div className="grid grid-cols-4 gap-3 pb-3">
                        <div className="col-span-1">
                          <div className="img rounded-lg overflow-hidden h-full w-full flex">
                            <Skeleton circle={true} height={56} width={56} />
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="hed font-bold text-lg">
                              <Skeleton width={150} />
                            </div>
                            <div className="icn_cnt">
                              <Skeleton width={24} height={24} />
                            </div>
                          </div>
                          <div className="desc line-clamp-2 text-sm">
                            <Skeleton count={2} />
                          </div>
                          <div className="flex gap-3 mt-3">
                            <Skeleton width={100} height={30} />
                          </div>
                        </div>
                      </div>
                      <hr className="border-0 border-b border-main_gray opacity-50" />
                      <div className="flex justify-between mt-3">
                        <div className="w-1/2 flex items-center gap-2">
                          <Skeleton width={80} />
                        </div>
                        <div className="w-1/2 flex items-center gap-2 justify-end">
                          <Skeleton width={80} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 mt-6 mb-5">
                {currentData?.length > 0 ? (
                  currentData?.map((item, index) => (
                    <div
                      key={index}
                      className="lg:col-span-4 md:col-span-6 col-span-12"
                    >
                      <div className="bg-[#fff] rounded-xl shadow-md w-full p-4">
                        <div>
                          {/* <div> */}
                          <div className="flex justify-between items-center border-b pb-4 ">
                            <div
                              onClick={() => handleNavigate(item?.reviewedToId)}
                              className="flex items-center gap-3"
                            >
                              <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                                <img
                                  src={item?.reviewedToImage}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800">
                                  {item?.reviewedToFullName}
                                </h4>
                                <p className="text-xs text-gray-600">
                                  {item?.reviewedByState},{" "}
                                  {item?.reviewedByCountry}
                                </p>
                              </div>
                            </div>
                            <button className="bg-gray-100 h-[2.5rem] w-[2.5rem] rounded-md flex items-center justify-center"></button>
                          </div>

                          <div
                            onClick={() => handleNavigateTo(item?.addedById)}
                            className="grid grid-cols-2 justify-between w-full gap-2"
                          >
                            <div>
                              <h1 className="font-semibold mt-3"></h1>
                              <div className="mt-2">
                                <span
                                  className={`px-4 py-1 text-sm font-bold text-white rounded-lg 
                ${item?.rate >= 1 && item?.rate <= 3
                                      ? "bg-red-500"
                                      : item?.rate >= 4 && item?.rate <= 6
                                        ? "bg-yellow-500"
                                        : item?.rate >= 7 && item?.rate <= 8
                                          ? "bg-blue-500"
                                          : item?.rate >= 9 && item?.rate <= 10
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                                >
                                  {item?.rate ?? "N/A"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 my-2">
                                <span>
                                 
                                </span>
                                <span className="text-xs">
                                  {item?.reviewedByFullName}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {item?.reviewDesc}
                              </p>
                            </div>

                            <div className="mt-1 text-end flex">
                              <span className="text-xs text-gray-400 font-semibold pt-3">
                                {moment(item?.reviewedOn).format("DD/MM/YYYY")}{" "}
                                {moment
                                  .utc(item?.reviewedOn)
                                  .tz(userTimeZone)
                                  .format("h:mm A")}
                              </span>
                              <div className="w-[6rem] h-[6rem] bg-gray-200 rounded-lg overflow-hidden mt-2 ms-2">
                                <img
                                  src={item?.reviewedByImage}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-12 text-center text-gray-700 font-bold p-9">
                    No users found
                  </p>
                )}
              </div>
            )}
          </div>
          <Pagination
          total={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
        </section>
        {/* <Footer_two /> */}
     
        <AddCustomer isOpenn={isOpen} closeModal={closeModal} />


      </div>
    </>
  );
};

export default BussinessHome;
