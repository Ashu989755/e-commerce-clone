import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Filter_sidebar from "../layout/filter/Filter_sidebar";
import { CalendarDays, Clock, Map, Menu, Search } from "lucide-react";
import { CustomerDashboardData } from "../../apis/customer/profile";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import moment from "moment-timezone";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 30.7046,
  lng: 76.7179,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Home() {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [profileData, setProfileData] = useState([]);
  console.log(profileData, "Profile data for markers");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationn, setLocation] = useState({ longitude: "", latitude: "" });

  const navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const closeModal = () => {
    setIsFilterOpen(false);
  };

  const [isContentA, setIsContentA] = useState(true);
  const toggleContent = () => {
    setIsContentA(!isContentA);
  };
  const [filters, setFilters] = useState({
    distance: 0,
    priceType: "perHour",
    priceRange: 0,
  });

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
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

  const handleHomeListData = async () => {
    setLoading(true);
    const locationData = await getLocation();

    try {
      const priceTypeMapping = {
        perHour: 0,
        perService: 1,
      };

      const apiData = {
        name: "",
        minDistance: filters.distance ? Number(filters.distance[0]) : 0,
        maxDistance: filters.distance ? Number(filters.distance[1]) : 0,
        priceType: priceTypeMapping[filters.priceType],
        minPrice:
          filters.priceType === "perHour" ? Number(filters.priceRange[0]) : 0,
        maxPrice:
          filters.priceType === "perHour" ? Number(filters.priceRange[1]) : 0,
        currentUtc: new Date().toISOString(),
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };

      console.log(apiData);

      const res = await CustomerDashboardData(apiData);
      console.log(res?.data?.data, "-----------------");
      const sortedData = res?.data?.data.sort((a, b) => {
        return new Date(b.userId) - new Date(a.userId);
      });
      setProfileData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleHomeListData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [filters]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (profileData?.length > 0) {
      const filtered = profileData?.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [profileData, searchTerm]);

  const itemsPerPage = 12;

  const total = profileData?.length;
  console.log(total, "total Data is here");

  const currentData = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(currentData, "------currentData");
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage, "New PAge is Here");
  };

  const handleNavigate = (id) => {
    navigate(`/servicer-profile/${id}`);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_two />
        <section className="">
          {/* Toggle Button */}
          <button
            onClick={toggleContent}
            className="mb-4 p-3 cursor-pointer fixed z-[999] bottom-14 right-2 group rounded-full transition-all bg-white text-blue-500 hover:bg-black peer hover:text-white duration-300 ease-in-out shadow-xl"
          >
            {isContentA ? (
              <Map
                className="text-main_gray group-hover:text-white"
                size={24}
              />
            ) : (
              <Menu
                className="text-main_gray group-hover:text-white"
                size={24}
              />
            )}
          </button>

          {isContentA ? (
            <div className="pb-5 pt-20 px-6">
              <div className="container mx-auto pt-5">
                <div className="grid grid-cols-2 items-center">
                  <div className="col-span-2 md:col-span-1">
                    <h3 className="font-bold text-xl mb-3 md:mb-0">
                      {t("all_service_providers")}{" "}
                    </h3>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="search md:ms-auto lg:w-4/5 w-full relative">
                      <div className="relative ">
                        <Search className="absolute h-full left-4" size={15} />
                        <input
                          className="bg-white outline-0 ps-11 pe-20 py-5 w-full rounded-lg text-dark_gray text-sm font-medium shadow-md"
                          type="text"
                          placeholder={t("search_business")}
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                        <div className="absolute top-2 right-2 flex gap-3">
                          <button className="">
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 8L8 20M8 8L20 20"
                                stroke="#3C3C3C"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={toggleFilter}
                            className="text-white btn h-auto py-3  bg-dark_link flex justify-center items-center px-3 rounded-lg"
                          >
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 17.8499C21 17.9878 20.9729 18.1244 20.9201 18.2518C20.8674 18.3792 20.7901 18.495 20.6925 18.5925C20.595 18.69 20.4793 18.7673 20.3519 18.8201C20.2245 18.8728 20.0879 18.9 19.95 18.8999H10.3065C10.0926 19.5135 9.693 20.0453 9.16326 20.4215C8.63351 20.7978 7.99982 21 7.35003 21C6.70024 21 6.06655 20.7978 5.5368 20.4215C5.00706 20.0453 4.60751 19.5135 4.39355 18.8999H1.05C0.771523 18.8999 0.504451 18.7893 0.307538 18.5924C0.110625 18.3955 0 18.1284 0 17.8499C0 17.5714 0.110625 17.3044 0.307538 17.1075C0.504451 16.9106 0.771523 16.7999 1.05 16.7999H4.39348C4.60747 16.1864 5.00704 15.6546 5.53678 15.2784C6.06653 14.9021 6.70022 14.6999 7.35 14.6999C7.99978 14.6999 8.63347 14.9021 9.16322 15.2784C9.69296 15.6546 10.0925 16.1864 10.3065 16.7999H19.95C20.0879 16.7999 20.2245 16.827 20.3519 16.8798C20.4793 16.9325 20.595 17.0099 20.6925 17.1074C20.7901 17.2049 20.8674 17.3207 20.9201 17.4481C20.9729 17.5755 21 17.712 21 17.8499ZM19.95 9.44996H17.6565C17.4425 8.83643 17.043 8.30467 16.5132 7.92839C15.9835 7.55212 15.3498 7.34997 14.7 7.34997C14.0502 7.34997 13.4165 7.55212 12.8868 7.92839C12.357 8.30467 11.9575 8.83643 11.7435 9.44996H1.05C0.771523 9.44996 0.504451 9.56059 0.307538 9.7575C0.110625 9.95441 0 10.2215 0 10.5C0 10.7784 0.110625 11.0455 0.307538 11.2424C0.504451 11.4393 0.771523 11.55 1.05 11.55H11.7435C11.9575 12.1635 12.3571 12.6953 12.8868 13.0716C13.4165 13.4479 14.0502 13.65 14.7 13.65C15.3498 13.65 15.9835 13.4479 16.5133 13.0716C17.043 12.6953 17.4426 12.1635 17.6565 11.55H19.95C20.2285 11.55 20.4955 11.4393 20.6925 11.2424C20.8894 11.0455 21 10.7784 21 10.5C21 10.2215 20.8894 9.95441 20.6925 9.7575C20.4955 9.56059 20.2285 9.44996 19.95 9.44996ZM1.05 4.19999H6.49355C6.70751 4.81354 7.10706 5.34532 7.6368 5.72162C8.16655 6.09791 8.80024 6.30007 9.45003 6.30007C10.0998 6.30007 10.7335 6.09791 11.2633 5.72162C11.793 5.34532 12.1926 4.81354 12.4065 4.19999H19.95C20.2285 4.19999 20.4955 4.08936 20.6925 3.89245C20.8894 3.69554 21 3.42847 21 3.14999C21 2.87152 20.8894 2.60445 20.6925 2.40754C20.4955 2.21062 20.2285 2.1 19.95 2.1H12.4065C12.1925 1.48647 11.793 0.954703 11.2632 0.578427C10.7335 0.20215 10.0998 0 9.45 0C8.80022 0 8.16653 0.20215 7.63678 0.578427C7.10704 0.954703 6.70747 1.48647 6.49348 2.1H1.05C0.771523 2.1 0.504451 2.21062 0.307538 2.40754C0.110625 2.60445 0 2.87152 0 3.14999C0 3.42847 0.110625 3.69554 0.307538 3.89245C0.504451 4.08936 0.771523 4.19999 1.05 4.19999Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
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
                            <div className="col-span-4 md:col-span-1">
                              <div className="img rounded-lg overflow-hidden h-full w-full flex">
                                <Skeleton
                                  circle={true}
                                  height={56}
                                  width={56}
                                />
                              </div>
                            </div>
                            <div className="col-span-4 md:col-span-3">
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
                ) : currentData && currentData.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {currentData.map((item) => (
                      <div
                        className="card p-4 col-span-3 lg:col-span-1 bg-white rounded-lg transition-all shadow-md hover:shadow-lg"
                        key={item.userId}
                      >
                        <div
                          onClick={() => handleNavigate(item.userId)}
                          className="grid grid-cols-4 gap-3 pb-3"
                        >
                          <div className="col-span-1">
                            <div className="img rounded-lg overflow-hidden h-full w-full flex">
                              {item?.image ? (
                                <img
                                  className="w-44 h-32 object-cover"
                                  src={item?.image}
                                  alt={item.name}
                                  onError={(e) => {
                                    e.target.src = ""; // Set image source to empty, so it will trigger conditional fallback
                                    e.target.style.display = "none"; // Hide the broken image
                                    e.target.nextSibling.style.display =
                                      "block"; // Show the icon
                                  }}
                                />
                              ) : null}
                              <FaUser
                                className="w-[90%] h-full object-cover text-gray-400 "
                                style={{
                                  display: item?.image ? "none" : "block",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div className="flex justify-between items-center mb-2">
                              <div className="hed font-bold text-lg">
                                <h3>{item?.name}</h3>
                              </div>
                              <div className="icn_cnt">
                                <span
                                  className={`font-semibold w-10 h-7 inline-flex justify-center items-center rounded-md text-white
                  ${
                    item?.rating >= 1 && item?.rating <= 3
                      ? "bg-red-500"
                      : item?.rating >= 4 && item?.rating <= 6
                      ? "bg-yellow-500"
                      : item?.rating >= 7 && item?.rating <= 8
                      ? "bg-blue-500"
                      : item?.rating >= 9 && item?.rating <= 10
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                                >
                                  {item?.rating}
                                </span>
                              </div>
                            </div>
                            <div className="desc line-clamp-2 text-sm	">
                              <p>{item?.bio}</p>
                            </div>
                            <div className="flex gap-3 mt-3 overflow-x-auto">
                              {item?.services?.map((service, index) => (
                                <div
                                  key={index}
                                  className="btt flex gap-2 px-4 py-2 bg-[#F5F4F6] rounded-full text-sm"
                                >
                                  <span></span>
                                  {service}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <hr className="border-0 border-b border-main_gray opacity-50" />
                        {item?.priceType === 1 ? (
                          <p className="flex justify-end mr-2 mt-1 text-sm text-[#5E5F60]">
                            Fixed
                          </p>
                        ) : (
                          <div className="flex justify-between mt-3">
                            <div className="w-1/2 flex items-center gap-2">
                              <span>
                                <CalendarDays
                                  size={22}
                                  className="text-[#5E5F60]"
                                />
                              </span>
                              <p className="text-[#5E5F60] font-medium text-xs">
                                {moment(item?.availability?.openingTime).format(
                                  "DD-MM-YYYY"
                                )}
                                , {item?.availability?.dayOfWeek}
                              </p>
                            </div>
                            <div className="w-1/2 flex items-center gap-2 justify-end">
                              <span>
                                <Clock size={22} className="text-[#5E5F60]" />
                              </span>
                              <p className="text-[#5E5F60] font-medium text-xs">
                                {moment
                                  .utc(item?.availability?.openingTime)
                                  .tz(userTimeZone)
                                  .format("h:mm A")}
                                -{" "}
                                {moment
                                  .utc(item?.availability?.closingTime)
                                  .tz(userTimeZone)
                                  .format("h:mm A")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-900 p-12 mt-12 font-bold text-xl">
                    {t("no_data_found")}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="map_blk pt-20">
              <div className="map h-screen relative">
                <div className="search w-80 absolute top-10 left-10 p-3 bg-white rounded-lg shadow-md z-50">
                  <div className="relative">
                    <Search className="absolute h-full left-3" size={15} />
                    <input
                      className="bg-[#f7f7f7] outline-0 ps-8 pe-12 py-3 w-full rounded-lg text-dark_gray text-sm font-medium"
                      type="text"
                      placeholder={t("search_business")}
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <div className="btn h-full absolute top-0 right-0 bg-dark_link flex justify-center items-center py-1 px-3 rounded-lg">
                      <button onClick={toggleFilter}>
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 17.8499C21 17.9878 20.9729 18.1244 20.9201 18.2518C20.8674 18.3792 20.7901 18.495 20.6925 18.5925C20.595 18.69 20.4793 18.7673 20.3519 18.8201C20.2245 18.8728 20.0879 18.9 19.95 18.8999H10.3065C10.0926 19.5135 9.693 20.0453 9.16326 20.4215C8.63351 20.7978 7.99982 21 7.35003 21C6.70024 21 6.06655 20.7978 5.5368 20.4215C5.00706 20.0453 4.60751 19.5135 4.39355 18.8999H1.05C0.771523 18.8999 0.504451 18.7893 0.307538 18.5924C0.110625 18.3955 0 18.1284 0 17.8499C0 17.5714 0.110625 17.3044 0.307538 17.1075C0.504451 16.9106 0.771523 16.7999 1.05 16.7999H4.39348C4.60747 16.1864 5.00704 15.6546 5.53678 15.2784C6.06653 14.9021 6.70022 14.6999 7.35 14.6999C7.99978 14.6999 8.63347 14.9021 9.16322 15.2784C9.69296 15.6546 10.0925 16.1864 10.3065 16.7999H19.95C20.0879 16.7999 20.2245 16.827 20.3519 16.8798C20.4793 16.9325 20.595 17.0099 20.6925 17.1074C20.7901 17.2049 20.8674 17.3207 20.9201 17.4481C20.9729 17.5755 21 17.712 21 17.8499ZM19.95 9.44996H17.6565C17.4425 8.83643 17.043 8.30467 16.5132 7.92839C15.9835 7.55212 15.3498 7.34997 14.7 7.34997C14.0502 7.34997 13.4165 7.55212 12.8868 7.92839C12.357 8.30467 11.9575 8.83643 11.7435 9.44996H1.05C0.771523 9.44996 0.504451 9.56059 0.307538 9.7575C0.110625 9.95441 0 10.2215 0 10.5C0 10.7784 0.110625 11.0455 0.307538 11.2424C0.504451 11.4393 0.771523 11.55 1.05 11.55H11.7435C11.9575 12.1635 12.3571 12.6953 12.8868 13.0716C13.4165 13.4479 14.0502 13.65 14.7 13.65C15.3498 13.65 15.9835 13.4479 16.5133 13.0716C17.043 12.6953 17.4426 12.1635 17.6565 11.55H19.95C20.2285 11.55 20.4955 11.4393 20.6925 11.2424C20.8894 11.0455 21 10.7784 21 10.5C21 10.2215 20.8894 9.95441 20.6925 9.7575C20.4955 9.56059 20.2285 9.44996 19.95 9.44996ZM1.05 4.19999H6.49355C6.70751 4.81354 7.10706 5.34532 7.6368 5.72162C8.16655 6.09791 8.80024 6.30007 9.45003 6.30007C10.0998 6.30007 10.7335 6.09791 11.2633 5.72162C11.793 5.34532 12.1926 4.81354 12.4065 4.19999H19.95C20.2285 4.19999 20.4955 4.08936 20.6925 3.89245C20.8894 3.69554 21 3.42847 21 3.14999C21 2.87152 20.8894 2.60445 20.6925 2.40754C20.4955 2.21062 20.2285 2.1 19.95 2.1H12.4065C12.1925 1.48647 11.793 0.954703 11.2632 0.578427C10.7335 0.20215 10.0998 0 9.45 0C8.80022 0 8.16653 0.20215 7.63678 0.578427C7.10704 0.954703 6.70747 1.48647 6.49348 2.1H1.05C0.771523 2.1 0.504451 2.21062 0.307538 2.40754C0.110625 2.60445 0 2.87152 0 3.14999C0 3.42847 0.110625 3.69554 0.307538 3.89245C0.504451 4.08936 0.771523 4.19999 1.05 4.19999Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-full">
                  {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109775.65018174924!2d76.71787259999999!3d30.7046486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee906da6f81f%3A0x512998f16ce508d8!2sSahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1724846408838!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe> */}
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={defaultCenter}
                    options={options}
                  >
                    {currentData?.map((user) => (
                      <Marker
                        key={user?.userId}
                        position={{
                          lat: user?.location?.latitude || defaultCenter.lat,
                          lng: user?.location?.longitude || defaultCenter.lng,
                        }}
                        // position={{
                        //   lat: parseFloat(user?.location?.latitude),
                        //   lng: parseFloat(user?.location?.latitude),
                        // }}

                        onClick={() => handleNavigate(user?.userId)}
                        icon={{
                          url: user?.image,
                          scaledSize: new window.google.maps.Size(50, 50),
                          origin: new window.google.maps.Point(0, 0),
                          anchor: new window.google.maps.Point(25, 25),
                        }}
                      />
                    ))}
                  </GoogleMap>
                </div>
              </div>
            </div>
          )}
          <Pagination
            total={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        </section>

        {/* <Footer_two></Footer_two> */}
        <Filter_sidebar
          isOpen={isFilterOpen}
          toggleOffCanvas={toggleFilter}
          closeFilter={closeModal}
          applyFilters={handleApplyFilters}
        />

        <Footer_two />
      </div>
    </>
  );
}

export default Home;
