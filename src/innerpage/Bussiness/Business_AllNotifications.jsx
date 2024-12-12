import React from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { avtar2 } from "../../assets/image";
import { useLocation } from "react-router-dom";
import Header_Business from "../layout/Header_business";
import { useNavigate } from "react-router-dom";

function Business_AllNotifications() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const { pathname } = useLocation();


  const getDaysAgo = (dateTime) => {
    const notificationDate = new Date(dateTime);
    const currentDate = new Date();
    const timeDifference = currentDate - notificationDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  const handleNotificationClick = (notificationType, bookingId) => {
    if (notificationType === 3) {
      navigate("/market-place");
    } else if (notificationType === 4) {
      navigate(`/current-job/estimate/${bookingId}`);
    }
  };

  const renderAcceptButtonText = (notificationStatus) => {
    switch (notificationStatus) {
      case 3:
        return "View Request";
      case 4:
        return "View Estimates";
    }
  };

  return (
    <>
      <Header_Business />

      <section className="py-24 bg-notification relative before:content before:absolute before:bg-dark_link before:bg-opacity-80 before:left-0 before:right-0 before:top-0 before:bottom-0">
        <div className="container relative mx-auto py-10 z-20">
          <h3 className="text-center text-2xl font-bold pb-2 pt-4 text-white">
            Notifications
          </h3>
          <p className="text-center text-white">

          </p>
        </div>
      </section>
      <ul className="bg-[#f5f5f5] border border-gray-200 rounded-lg p-3">

        <div

          className="container mx-auto -mt-[120px] relative pb-24"
        >
          <div className="bg-white p-4  z-20 shadow-lg w-3/4 mx-auto rounded-2xl max-w-[800px]">

            {state?.map((item, index) => (
              <div
                key={item?.notificationId}
                className="itm grid grid-cols-12 px-3 py-3 shadow-md rounded-xl mb-4 border">
                <div className="col-span-1">
                  <div className="size-12 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full"
                      src={item?.senderImage}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-span-8">
                  <h3 className="text-main_gray text-sm">{item?.body}</h3>
                </div>
                <div className="col-span-3">
                  <div className="text-end">
                    <span className="text-main_gray text-sm my-2">
                      {getDaysAgo(item.dateTime)} days ago
                    </span>
                    <button onClick={() => handleNotificationClick(item?.notificationType, item?.bookingId)} className="px-3 py-1 text-sm border my-1 border-dark_link rounded-xl">
                      {renderAcceptButtonText(item?.notificationType)}
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </ul>
      <Footer_two />
    </>
  );
}

export default Business_AllNotifications;

