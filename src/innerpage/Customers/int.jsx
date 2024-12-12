import React from "react";

const UserProfile = ({ userDetails, mapIcon }) => {
  const handleViewOnMap = () => {
    const { address1, address2, city, state } = userDetails || {};
    const fullAddress = `${address1}, ${address2}, ${city}, ${state}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div>
      <div className="my_pro bg-white shadow-md hover:shadow-lg rounded-xl p-5 hover:shadow-lg relative">
        <div className="flex items-center gap-2">
          <div className="w-[5.125rem] h-[5.125rem] rounded-md overflow-hidden">
            <img
              src={mapIcon}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-lg">{userDetails?.address1}</p>
            <p className="text-sm text-gray-600">{userDetails?.address2}</p>
            <p className="text-sm text-gray-600">
              {userDetails?.city}, {userDetails?.state}
            </p>
          </div>
        </div>
        <button
          onClick={handleViewOnMap}
          className="bg-[#303030] py-2 px-3 text-white text-sm font-semibold rounded-md absolute right-5 bottom-5"
        >
          View on Map
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
