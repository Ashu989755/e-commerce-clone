import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { customerFavouriteList } from "../../apis/customer/profile";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { customerFavouriteBusiness } from "../../apis/customer/profile";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


function Favorites() {
  const navigate = useNavigate();
  const [favouriteList, setFavouriteList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFavourite = async () => {
    setLoading(true);
    try {
      const apiData = {
        currentUtc: new Date().toISOString(),
      };
      const res = await customerFavouriteList(apiData);
      setFavouriteList(res?.data?.data || []);
      setIsFavorite(res?.data?.data?.isFavorite || false);
      setError(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFavourite();
  }, []);

  const toggleFavorite = async (id) => {
    const newFavoriteStatus = isFavorite;
    setIsFavorite(newFavoriteStatus);
    try {
      const apiData = {
        toUserId: id,
        isFavorite: newFavoriteStatus,
      };
      await customerFavouriteBusiness(apiData);
      if (!newFavoriteStatus) {
        setFavouriteList(favouriteList.filter((item) => item.userId !== id));
      }
      handleFavourite();
    } catch (error) {
      console.log(error);
    }
  };

  const itemsPerPage = 12;
  const total = favouriteList?.length; // Total number of items

  const currentData = favouriteList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Change the current page
  };

  const handleNavigate = (id) => {
    navigate(`/servicer-profile/${id}`);
  };

  return (
    <>
      <Header_two />
      <section className="py-20 bg-[#F7F7F7] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-3 pt-3">
              <h2 className="text-dark_link pt-10 text-xl font-bold">
                Favorites
              </h2>
            </div>
            {loading && (
              <div className="flex items-center justify-end mt-10">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size="5rem" style={{ color: "black" }} />
                </Box>
              </div>
            )}{" "}
            {/* Show loading text */}
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Show error message */}
            {currentData.length === 0 && !loading && (
              <p>No favorites found.</p>
            )}{" "}
            {/* No data message */}
            {currentData.map((item) => (
              <div className="col-span-12 md:col-span-1" key={item.userId}
                onClick={() => handleNavigate(item.userId)}
              >
                <div className="crd p-4 bg-white rounded-lg shadow-sm">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-1">
                      <div className="img min-h-24 rounded-lg overflow-hidden flex">
                        <img
                          className="h-full w-full object-cover min-h-24"
                          src={item?.image} 
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <h3 className="font-bold text-lg">{item?.name}</h3>
                      <p className="flex items-center gap-2 text-sm my-1 text-dark_link">
                        <span>
                          {" "}
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 7 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.37487 0C1.51419 0 0 1.52469 0 3.39924C0 6.06276 3.05763 8.81291 3.18775 8.9284C3.23918 8.97444 3.30577 8.99993 3.3748 9C3.44383 9.00007 3.51046 8.97472 3.56199 8.92878C3.69211 8.81291 6.74974 6.06276 6.74974 3.39924C6.74974 1.52469 5.23555 0 3.37487 0ZM3.37487 5.2498C2.34103 5.2498 1.49994 4.4087 1.49994 3.37487C1.49994 2.34103 2.34103 1.49994 3.37487 1.49994C4.4087 1.49994 5.2498 2.34103 5.2498 3.37487C5.2498 4.4087 4.4087 5.2498 3.37487 5.2498Z"
                              fill="#303030"
                            />
                          </svg>
                        </span>
                        {item?.address?.city}, {item?.address?.state}
                      </p>
                      <p className="flex items-center gap-2 text-sm my-1 text-dark_link">
                        <span>
                          {" "}
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.44854 6.26413C6.90485 5.79911 6.35307 5.51743 5.81605 5.98175L5.49538 6.26238C5.26076 6.46609 4.82454 7.41791 3.13797 5.47774C1.45174 3.54004 2.45519 3.23834 2.69016 3.03638L3.01258 2.7554C3.54679 2.29003 3.34519 1.70419 2.9599 1.10114L2.72738 0.735866C2.34034 0.134219 1.91887 -0.260908 1.38325 0.203761L1.09384 0.456642C0.857116 0.629094 0.19541 1.18965 0.0349002 2.25456C-0.158273 3.53231 0.451101 4.99551 1.84722 6.60096C3.24158 8.20711 4.60679 9.01387 5.89999 8.99982C6.97474 8.98823 7.6238 8.41152 7.82681 8.20184L8.11727 7.94861C8.65148 7.48429 8.31958 7.01154 7.77553 6.54546L7.44854 6.26413Z"
                              fill="#303030"
                            />
                          </svg>
                        </span>
                        {item?.contactNumber}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item?.userId);
                        }}
                        className="bg-[#F7F7F7] size-10 flex justify-center items-center rounded-lg ms-auto"
                      >
                        {isFavorite ? (
                          <svg
                            width="19"
                            height="17"
                            viewBox="0 0 19 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.8182 0.5C12.0045 0.5 10.4275 1.30585 9.5 2.65631C8.57245 1.30585 6.99545 0.5 5.18182 0.5C3.80801 0.501576 2.49092 1.04 1.51949 1.99717C0.548054 2.95433 0.00159998 4.25208 0 5.60571C0 8.09049 1.57182 10.6765 4.67227 13.2907C6.093 14.4835 7.62765 15.5379 9.25473 16.4392C9.33013 16.4791 9.4144 16.5 9.5 16.5C9.5856 16.5 9.66987 16.4791 9.74527 16.4392C11.3724 15.5379 12.907 14.4835 14.3277 13.2907C17.4282 10.6765 19 8.09049 19 5.60571C18.9984 4.25208 18.4519 2.95433 17.4805 1.99717C16.5091 1.04 15.192 0.501576 13.8182 0.5ZM9.5 15.401C8.08277 14.5952 1.03636 10.3472 1.03636 5.60571C1.03751 4.52276 1.47463 3.48449 2.2518 2.71873C3.02898 1.95297 4.08273 1.52227 5.18182 1.52114C6.93327 1.52114 8.40405 2.44272 9.02068 3.92678C9.05972 4.02043 9.12613 4.10052 9.21148 4.15689C9.29683 4.21326 9.39725 4.24335 9.5 4.24335C9.60275 4.24335 9.70317 4.21326 9.78852 4.15689C9.87387 4.10052 9.94028 4.02043 9.97932 3.92678C10.596 2.44272 12.0667 1.52114 13.8182 1.52114C14.9173 1.52227 15.971 1.95297 16.7482 2.71873C17.5254 3.48449 17.9625 4.52276 17.9636 5.60571C17.9636 10.3472 10.9172 14.5952 9.5 15.401Z"
                              fill="#303030"
                              fillOpacity="0.7"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 5.16789C19 11.0026 10.1964 15.7254 9.82147 15.9204C9.72266 15.9727 9.6122 16 9.5 16C9.38779 16 9.27734 15.9727 9.17853 15.9204C8.80362 15.7254 0 11.0026 0 5.16789C0.00157152 3.79775 0.55614 2.48418 1.54204 1.51534C2.52794 0.546512 3.86466 0.00154431 5.25893 0C7.01049 0 8.54406 0.740174 9.5 1.9913C10.4559 0.740174 11.9895 0 13.7411 0C15.1353 0.00154431 16.4721 0.546512 17.458 1.51534C18.4439 2.48418 18.9984 3.79775 19 5.16789Z"
                              fill="#FF5B5B"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
          total={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
        </div>
   
      </section>
      <Footer_two />
    </>
  );
}
export default Favorites;
