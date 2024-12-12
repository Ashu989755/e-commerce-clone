import React, { useState, useEffect } from "react";
import Header_Business from "../layout/Header_business";
import { avtar, LocationFill, PhoneFillBlack2 } from "../../assets/image";
import Footer_two from "../layout/Footer_two";
import { customerFavouriteList } from "../../apis/customer/profile";
import { Heart } from "lucide-react";

const mockData = Array(6).fill({
  name: "Michael Johnson",
  location: "Assinboine Park, Winnipeg",
  phone: "+1 (555) 123-4567",
  avatar: avtar, // Replace `avtar` with the actual image path or import
});

const BusinessFavorites = () => {
  const [favouriteList, setFavouriteList] = useState("");

  const handleBusinessFavourite = async () => {
    try {
      const apiData = {
        currentUtc: new Date().toISOString(),
      };
      const res = await customerFavouriteList(apiData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleBusinessFavourite();
  }, []);

  // State to track whether the heart is filled or outlined
  const [isFilled, setIsFilled] = useState(false);

  // Toggle function to change the state
  const toggleFill = () => {
    setIsFilled(!isFilled);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-[#F7F7F7]">
        <Header_Business />
        <section className="py-20 px-3">
          <div className="container mx-auto">
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-6 pt-10 ">
                <h2 className="text-dark_link pt-10 text-xl font-bold">
                  Favorites
                </h2>
              </div>

              {mockData.map((item, index) => (
                <div
                  key={index}
                  className="xl:col-span-2 lg:col-span-3 col-span-6"
                >
                  <div className="crd p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-start gap-4 relative">
                      <div className="img h-24 w-20 rounded-lg overflow-hidden flex shrink-0">
                        <img
                          className="h-full w-full object-cover"
                          src={item.avatar}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="flex items-center gap-2 text-sm my-1 text-dark_link">
                          <span className="shrink-0">
                            <img
                              src={LocationFill}
                              alt=""
                              className="h-5 w-5"
                            />
                          </span>
                          {item.location}
                        </p>

                        <p className="flex items-center gap-2 text-sm my-1 text-dark_link">
                          <span className="shrink-0">
                            <img
                              src={PhoneFillBlack2}
                              alt=""
                              className="h-5 w-5"
                            />
                          </span>
                          {item.phone}
                        </p>
                      </div>
                      <div className="absolute right-0 top-0">
                        <span className="bg-[#F7F7F7] size-10 flex justify-center items-center rounded-lg ms-auto">
                          <div
                            onClick={toggleFill}
                            style={{ cursor: "pointer" }}
                          >
                            <Heart
                              fill={isFilled ? "#FF5B5B" : "none"}
                              stroke={isFilled ? "#FF5B5B" : "#303030"} 
                            />
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer_two></Footer_two>
      </div>
    </>
  );
};

export default BusinessFavorites;
