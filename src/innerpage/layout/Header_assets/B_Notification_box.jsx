// src/NotificationBox.jsx
import { useState, useEffect } from "react";
import { avtar2 } from "../../../assets/image";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { businessNotificationList } from "../../../apis/business/Profile";
import moment from "moment-timezone";

const B_Notification_box = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const[unread, setunread] = useState("")

  const handleClicked = () => {
    setIsRead((prevValue) => !prevValue);
  };

  const handleNotificationList = async () => {
    try {
      const apiData = {
        isRead: isRead,
      };
      const res = await businessNotificationList(apiData);
      const sortedNotifications = res?.data?.data?.notificationList.sort(
        (a, b) => {
          return new Date(b.dateTime) - new Date(a.dateTime);
        }
      );

      setNotificationList(sortedNotifications);
      setunread(res?.data?.data)
      const unreadCount = res?.data?.data?.unreadCount || 0;
      setIsRead(unreadCount > 0 ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    handleNotificationList();
  };

  useEffect(() => {
    handleNotificationList();
  }, []);

  const getDaysAgo = (dateTime) => {
    const notificationDate = new Date(dateTime);
    const currentDate = new Date();
    const timeDifference = currentDate - notificationDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  const handleNavigate = () => {
    navigate("/business-notification", { state: notificationList });
  };

  const handleNotificationClick = (notificationType,bookingId) => {
    if (notificationType === 3) {
      navigate('/market-place');
      toggleDropdown()
    } else if (notificationType === 4) {
      navigate(`/current-job/estimate/${bookingId}`);
      toggleDropdown()
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
    <div className="relative">
      <div className="relative cursor-pointer py-2 px-0 flex items-center">
        <button
          onClick={() => {
            toggleDropdown();
            handleClicked();
          }}
          className="inline-flex justify-center w-full focus:outline-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M25.7863 19.3176L24.4529 17.1043C24.1729 16.6109 23.9196 15.6776 23.9196 15.1309V11.7576C23.9196 7.41092 20.3863 3.86426 16.0263 3.86426C11.6663 3.86426 8.13293 7.41092 8.13293 11.7576V15.1309C8.13293 15.6776 7.8796 16.6109 7.5996 17.0909L6.25293 19.3176C5.7196 20.2109 5.5996 21.1976 5.93293 22.1043C6.25293 22.9976 7.01293 23.6909 7.9996 24.0243C10.5863 24.9043 13.3063 25.3309 16.0263 25.3309C18.7463 25.3309 21.4663 24.9043 24.0529 24.0376C24.9863 23.7309 25.7063 23.0243 26.0529 22.1043C26.3996 21.1843 26.3063 20.1709 25.7863 19.3176Z"
              fill="black"
            />
            <path
              d="M19.0002 4.4265C18.0802 4.0665 17.0802 3.8665 16.0269 3.8665C14.9869 3.8665 13.9869 4.05317 13.0669 4.4265C13.6402 3.3465 14.7736 2.6665 16.0269 2.6665C17.2936 2.6665 18.4136 3.3465 19.0002 4.4265ZM19.7736 26.6798C19.4932 27.456 18.9806 28.1271 18.3055 28.6018C17.6304 29.0765 16.8255 29.3319 16.0002 29.3332C14.9469 29.3332 13.9069 28.9065 13.1736 28.1465C12.7469 27.7465 12.4269 27.2132 12.2402 26.6665C12.4136 26.6932 12.5869 26.7065 12.7736 26.7332C13.0802 26.7732 13.4002 26.8132 13.7202 26.8398C14.4802 26.9065 15.2536 26.9465 16.0269 26.9465C16.7869 26.9465 17.5469 26.9065 18.2936 26.8398C18.5736 26.8132 18.8536 26.7998 19.1202 26.7598L19.7736 26.6798Z"
              fill="black"
            />
          </svg>

          {/* Badge for unread messages */}
          {unread?.unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full">
              {unread?.unreadCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 w-[350px] h-[350px] overflow-y-scroll bg-[#F7F7F7] border border-gray-300 shadow-lg rounded-lg">
          <div className="p-3 text-gray-700">
            <h3 className="text-center font-bold">Notifications</h3>
          </div>
          <ul className="bg-white border border-gray-200 rounded-lg p-3">
            {notificationList?.map((item, index) => (
              <li
                key={item?.notificationId}
                className="flex justify-between gap-2 border-b pb-3 my-3"
              >
                <div className="lf h-16 w-16 rounded-full overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={item?.senderImage}
                    alt={item?.senderName || "Notification"}
                  />
                </div>
                <div className="rt w-3/4">
                  <h3 className="text-gray-700 text-sm">{item?.body}</h3>
                  <div className="flex justify-between items-center my-2">
                    <span className="text-main_gray text-sm">
                      {getDaysAgo(item.dateTime)} days ago
                    </span>
                    {item?.bookingStatus == 1}
                    <button onClick={() => handleNotificationClick(item?.notificationType, item?.bookingId) } className="px-3 py-1 text-sm border border-dark_link rounded-xl">
                    {renderAcceptButtonText(item?.notificationType)}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div
            onClick={handleNavigate}
            className="flex justify-center w-full py-3 gap-2 cursor-pointer"
          >
            <Eye />
            View All
          </div>
        </div>
      )}
    </div>
  );
};

export default B_Notification_box;
