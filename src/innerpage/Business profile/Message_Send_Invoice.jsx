import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Calendar from "react-calendar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEstimateValidator } from "../../helpers/validation";
import Add_Items from "../../modals/Add_Items";
import moment from "moment-timezone";
import {
  businessSendEstimates,
  businessSaveEstimateItems,
} from "../../apis/business/Profile";
import {
  ChatDetails,
  ChatListing,
  createSignalRConnection,
  sendMessage,
} from "../../../src/signalR/signalR";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function Message_Send_Invoice() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendEstimateValidator),
  });

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { user } = useSelector((state) => state?.authSlice);
  const { state } = useLocation();



  const priceType = user?.hourlyPrice || "";
  const userId = user?.userId || "";
  const availability = user?.openingDate || "";
  const closingDate = user?.closingDate || "";
  const bookingId = state?.bookingId || "";
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const toUserId = state?.toUserId || "";
  const defaultDate = availability ? new Date(availability) : new Date();
  const defaultTime = moment
    .utc(availability)
    .tz(userTimeZone)
    .format("HH:mm A");

  const defaultEndTime = moment
    .utc(closingDate)
    .tz(userTimeZone)
    .format("HH:mm A");

  const [uploadedImg, setUploadedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [value, setValue] = useState(defaultDate);
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [selectedEndTime, setSelectedEndTime] = useState(defaultEndTime);
  const [addItems, setAddItems] = useState([]);
  const [connection, setConnection] = useState("")
  const [chatDetail, setChatDetail] = useState([]);



  useEffect(() => {
    const initializeConnection = async () => {
      // const token = chatToken.replace(/^Bearer\s/, "");
      const conn = createSignalRConnection();
      await conn.start();
      setConnection(conn);
      console.log("Connected to SignalR");

      conn.on("MyChatList", (args) => {
        console.log("Received MyChatList event", args);
        setChatList(args.data.chatList);
      });
      conn.on("ChatDetailResponse", (args) => {
        console.log("Received ChatDetailResponse event", args);
        // setChatDetail(args.data.messageList);
        // setSelectedUser(args.data.messageList.userId);
      });

      conn.on("ReciveMessage", (receivedMessage) => {
        console.log("ReciveMessage event", receivedMessage);
        {
          setChatDetail((prev) => [...prev, receivedMessage]);
        }
      });



    };

    initializeConnection();

    return () => {
      if (connection) connection.stop();
    };
  }, [toUserId]);

  function handleUploadedImg(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  }

  const today = new Date();

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  const handleEndTimeChange = (e) => {
    setSelectedEndTime(e.target.value);
  };

  const handleAddItem = (item) => {
    setAddItems((prevItems) => [...prevItems, item]);
  };
  const handleRemoveItem = (index) => {
    setAddItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };


  const handleSaveEstimateItems = async (id) => {
    try {
      const apiData = {
        estimateId: id,
        customerEmail: "",
        customerName: "",
        firstName: "",
        lastName: "",
        customerContactNumber: "",
        customerCountryCode: "",
        address1: "",
        address2: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
        estimateItems: addItems,
      };
      const res = await businessSaveEstimateItems(apiData);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async ( 
    receivedId,
    msg,
    fileType,
    isFile,
    time,
    thumbImage,
    thumbImageType,
    type,
    bookingId,) => {
    if (!connection) {
      console.error("SignalR connection not established");
      return;
    }

    // const messageArgs = [
    //   receivedId,
    //   msg,
    //   1,
    //   fileType,
    //   isFile,
    //   time,
    //   thumbImage,
    //   thumbImageType,
    //   type,
    //   bookingId,
    // ];

    const messageArgs = [2618, 361, 1, null, false, '2024-11-25T10:33:51.005Z', null, null, 3, 508]

    try {
      console.log("Sending message with args:", messageArgs);
      const response = await sendMessage(connection, messageArgs);
      console.log("Message sent successfully, response:");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendEstimates = async (data) => {

    try {
      const formData = new FormData();

      formData.append("CustomerId", userId);
      formData.append("CurrentUtcTime", new Date().toISOString());
      formData.append("BookingId", bookingId);
      formData.append("Estimatedate", new Date(value).toISOString());
      formData.append("TotalHour", data.totalHours ? data.totalHours : "");
      formData.append("TotalAmount", data.totalAmount ? data.totalAmount : "");
      formData.append("BusinessName", data.businessName);
      formData.append("NumberOfLabour", data.selectLabor);
      formData.append("LabourPrice", data.laborPrice);
      formData.append("NumberOfDays", "");
      formData.append("EstimateType", 0);
      formData.append("EstimatePriceType", priceType == null ? "1" : "0");

      if (uploadedImg) {
        formData.append("Image", uploadedImg);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const res = await businessSendEstimates(formData);
      const messageId = res?.data?.data;
      if (res?.data?.success === true) {
        handleSaveEstimateItems(messageId);
        handleSendMessage( {receivedId:toUserId,
                              msg: messageId,
                              filetType: null,
                              isFile: false,
                              time: new Date().toISOString(),
                              thumbImage: null,
                              thumbImageType: null,
                              type: 3,
                              bookingId: bookingId});
        toast.success(res?.data?.message);
        navigate(`/view-invoice/${bookingId}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatListing = async () => {
    if (connection) {
      
      const messageArgs = [name];
      console.log(messageArgs);
      try {
        await ChatListing(connection, messageArgs);
        console.log("Chat listing fetched");
      } catch (error) {
        console.error("Error fetching chat list:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Connection not established");
    }
  };


  const handleChatDetails = async (userId, bookingId, fullName, image) => {
    if (connection) {
      try {
        await ChatDetails(connection, [userId, timee, bookingId]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("Connection not established");
    }
  };

  useEffect(() => {
    if (connection) {
      handleChatListing();
      handleChatDetails()
    }
  }, [connection]);


  return (
    <>
      <Header_two />
      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                Send Invoice
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F7F7F7] min-h-screen">
        <div className="py-20 px-20">
          <div className="container mx-auto pt-5">
            <div className="grid grid-cols-2 py-10 gap-5">
              <div className="lg:col-span-1 col-span-2">
                <Calendar
                  onChange={handleDateChange}
                  value={value}
                  // tileContent={tileContent}

                  minDate={today}
                  className="w-full min-h-[25.5rem]"
                />
                <div className="bg-white rounded-2xl mt-5 p-4">
                  <h5 className="pb-3 font-semibold">Booking Date & Time</h5>
                  <div className="flex items-center gap-2">
                    <div>
                      <svg
                        width="33"
                        height="34"
                        viewBox="0 0 33 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="33"
                          height="34"
                          rx="5"
                          fill="#D9D9D9"
                          fill-opacity="0.24"
                        />
                        <g clip-path="url(#clip0_663_8828)">
                          <path
                            d="M21.5703 15.5859C21.9586 15.5859 22.2734 15.2711 22.2734 14.8828C22.2734 14.4945 21.9586 14.1797 21.5703 14.1797C21.182 14.1797 20.8672 14.4945 20.8672 14.8828C20.8672 15.2711 21.182 15.5859 21.5703 15.5859Z"
                            fill="black"
                          />
                          <path
                            d="M23.1875 8.90625H22.2734V8.20312C22.2734 7.81479 21.9586 7.5 21.5703 7.5C21.182 7.5 20.8672 7.81479 20.8672 8.20312V8.90625H17.668V8.20312C17.668 7.81479 17.3532 7.5 16.9648 7.5C16.5765 7.5 16.2617 7.81479 16.2617 8.20312V8.90625H13.0977V8.20312C13.0977 7.81479 12.7829 7.5 12.3945 7.5C12.0062 7.5 11.6914 7.81479 11.6914 8.20312V8.90625H10.8125C9.26169 8.90625 8 10.1679 8 11.7188V22.6875C8 24.2383 9.26169 25.5 10.8125 25.5H16.1914C16.5797 25.5 16.8945 25.1852 16.8945 24.7969C16.8945 24.4085 16.5797 24.0938 16.1914 24.0938H10.8125C10.0371 24.0938 9.40625 23.4629 9.40625 22.6875V11.7188C9.40625 10.9433 10.0371 10.3125 10.8125 10.3125H11.6914V11.0156C11.6914 11.404 12.0062 11.7188 12.3945 11.7188C12.7829 11.7188 13.0977 11.404 13.0977 11.0156V10.3125H16.2617V11.0156C16.2617 11.404 16.5765 11.7188 16.9648 11.7188C17.3532 11.7188 17.668 11.404 17.668 11.0156V10.3125H20.8672V11.0156C20.8672 11.404 21.182 11.7188 21.5703 11.7188C21.9586 11.7188 22.2734 11.404 22.2734 11.0156V10.3125H23.1875C23.9629 10.3125 24.5938 10.9433 24.5938 11.7188V15.7266C24.5938 16.1149 24.9085 16.4297 25.2969 16.4297C25.6852 16.4297 26 16.1149 26 15.7266V11.7188C26 10.1679 24.7383 8.90625 23.1875 8.90625Z"
                            fill="black"
                          />
                          <path
                            d="M21.7461 16.9922C19.4005 16.9922 17.4922 18.9005 17.4922 21.2461C17.4922 23.5917 19.4005 25.5 21.7461 25.5C24.0917 25.5 26 23.5917 26 21.2461C26 18.9005 24.0917 16.9922 21.7461 16.9922ZM21.7461 24.0938C20.1759 24.0938 18.8984 22.8163 18.8984 21.2461C18.8984 19.6759 20.1759 18.3984 21.7461 18.3984C23.3163 18.3984 24.5938 19.6759 24.5938 21.2461C24.5938 22.8163 23.3163 24.0938 21.7461 24.0938Z"
                            fill="black"
                          />
                          <path
                            d="M22.7656 20.543H22.4492V19.8047C22.4492 19.4164 22.1344 19.1016 21.7461 19.1016C21.3578 19.1016 21.043 19.4164 21.043 19.8047V21.2461C21.043 21.6344 21.3578 21.9492 21.7461 21.9492H22.7656C23.154 21.9492 23.4688 21.6344 23.4688 21.2461C23.4688 20.8578 23.154 20.543 22.7656 20.543Z"
                            fill="black"
                          />
                          <path
                            d="M18.5117 15.5859C18.9 15.5859 19.2148 15.2711 19.2148 14.8828C19.2148 14.4945 18.9 14.1797 18.5117 14.1797C18.1234 14.1797 17.8086 14.4945 17.8086 14.8828C17.8086 15.2711 18.1234 15.5859 18.5117 15.5859Z"
                            fill="black"
                          />
                          <path
                            d="M15.4531 18.6445C15.8415 18.6445 16.1562 18.3297 16.1562 17.9414C16.1562 17.5531 15.8415 17.2383 15.4531 17.2383C15.0648 17.2383 14.75 17.5531 14.75 17.9414C14.75 18.3297 15.0648 18.6445 15.4531 18.6445Z"
                            fill="black"
                          />
                          <path
                            d="M12.3945 15.5859C12.7829 15.5859 13.0977 15.2711 13.0977 14.8828C13.0977 14.4945 12.7829 14.1797 12.3945 14.1797C12.0062 14.1797 11.6914 14.4945 11.6914 14.8828C11.6914 15.2711 12.0062 15.5859 12.3945 15.5859Z"
                            fill="black"
                          />
                          <path
                            d="M12.3945 18.6445C12.7829 18.6445 13.0977 18.3297 13.0977 17.9414C13.0977 17.5531 12.7829 17.2383 12.3945 17.2383C12.0062 17.2383 11.6914 17.5531 11.6914 17.9414C11.6914 18.3297 12.0062 18.6445 12.3945 18.6445Z"
                            fill="black"
                          />
                          <path
                            d="M12.3945 21.7031C12.7829 21.7031 13.0977 21.3883 13.0977 21C13.0977 20.6117 12.7829 20.2969 12.3945 20.2969C12.0062 20.2969 11.6914 20.6117 11.6914 21C11.6914 21.3883 12.0062 21.7031 12.3945 21.7031Z"
                            fill="black"
                          />
                          <path
                            d="M15.4531 21.7031C15.8415 21.7031 16.1562 21.3883 16.1562 21C16.1562 20.6117 15.8415 20.2969 15.4531 20.2969C15.0648 20.2969 14.75 20.6117 14.75 21C14.75 21.3883 15.0648 21.7031 15.4531 21.7031Z"
                            fill="black"
                          />
                          <path
                            d="M15.4531 15.5859C15.8415 15.5859 16.1562 15.2711 16.1562 14.8828C16.1562 14.4945 15.8415 14.1797 15.4531 14.1797C15.0648 14.1797 14.75 14.4945 14.75 14.8828C14.75 15.2711 15.0648 15.5859 15.4531 15.5859Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_663_8828">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(8 7.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm">
                        {value
                          ? value.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          : ""}
                      </p>
                      <h6 className="font-bold">
                        {selectedTime ? selectedTime : ""}
                        {priceType === null
                          ? `  ${selectedEndTime ? selectedEndTime : ""}`
                          : ""}
                      </h6>

                    </div>
                  </div>
                </div>
                <div className="col-span-1 mt-4">
                  <div className="col-sm-1 relative">
                    <label className="font-bold">Select Time</label>

                    <input
                      type="time"
                      className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      {...register("startTime")}
                      //   value={selectedTime}
                      onChange={handleTimeChange}
                    />
                    {errors.startTime && (
                      <p className="text-red-500">{errors.startTime.message}</p>
                    )}
                    {priceType === null && (
                      <>
                        <input
                          type="time"
                          className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          {...register("endTime")}
                          value={selectedEndTime}
                          onChange={handleEndTimeChange}
                        />
                        {errors.endTime && (
                          <p className="text-red-500">
                            {errors.endTime.message}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 col-span-2">
                <div className="my_pro border shadow-md rounded-xl p-5 bg-white">
                  <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
                    Business profile
                  </h3>
                  <div className="inp_pro relative mt-5 mb-7 size-48 mx-auto flex justify-center ">
                    <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto">
                      <img
                        className={`${previewImg ? "" : "d-none"}`}
                        src={previewImg}
                        alt=""
                      />
                    </span>
                    <button className="btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center">
                      Business Picture
                      <Controller
                        name="profileImage"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                          <input
                            {...field}
                            className="absolute top-0 start-0 end-0 bottom-0 opacity-0"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files[0]);
                              handleUploadedImg(e);
                            }}
                            value={value?.fileName}
                          />
                        )}
                      />
                    </button>
                  </div>
                  {errors.profileImage && (
                    <p className="text-red-500 flex justify-center">
                      {errors.profileImage.message}
                    </p>
                  )}
                  <div className="info_frm my-5">
                    {priceType == null ? (
                      <div className="col-sm-1 relative">
                        <label className="font-bold">Total Price </label>
                        <span class="absolute left-3 top-3 bottom-0 flex items-center h-full "></span>
                        <input
                          name="totalHours"
                          className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
                          shadow-sm focus:shadow-md border border-transparent focus:border-text_dark ps-10"
                          {...register("totalPrice")}
                        />
                        {errors.totalPrice && (
                          <p className="text-red-500">
                            {errors.totalPrice.message}
                          </p>
                        )}
                      </div>
                    )
                      : (
                        <div className="col-sm-1 relative">
                          <label className="font-bold">Total Hours </label>
                          <span class="absolute left-3 top-3 bottom-0 flex items-center h-full "> <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                              stroke="#0B0B0B"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977"
                              stroke="#0B0B0B"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg></span>{" "}

                          <input
                            name="totalHours"
                            className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
                          shadow-sm focus:shadow-md border border-transparent focus:border-text_dark ps-10"
                            {...register("totalHours")}
                          />
                          {errors.totalHours && (
                            <p className="text-red-500">
                              {errors.totalHours.message}
                            </p>
                          )}
                        </div>
                      )}
                    <div className="grid grid-row-2 gap-4 mt-9">
                      <div className="col-sm-1 relative">
                        <label className="font-bold">Business Name </label>
                        <span class="absolute left-3 top-3 bottom-0 flex items-center h-full "><svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21"
                            stroke="#0B0B0B"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg></span>{" "}
                        {" "}
                        <input
                          type="text"
                          className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
                                            shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Enter Business Name"
                          {...register("businessName")}
                        />
                        {errors.businessName && (
                          <p className="text-red-500">
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>
                      <div className="col-sm-1 relative">
                        <label className="font-bold">Add Item</label>
                        <span className="absolute left-3 top-3 bottom-0 flex items-center h-full"></span>

                        <input
                          type="text"
                          className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
    shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Enter Items"
                          onClick={openModal}
                        />
                      </div>

                      <div className="col-sm-1">
                        <div
                          className="bg-[#f3f1f1] py-4 px-5 rounded-lg 
    shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        >
                          <h2 className="font-semibold pb-2">Added Items</h2>

                          <ul>
                            {addItems?.map((item, index) => (
                              <li key={index}>
                                <div className="flex items-center justify-between text-sm">
                                  {item.itemName} $${item.itemPrice} (Quantity:{" "}
                                  {item.quantity})
                                  <span
                                    onClick={() => handleRemoveItem(index)}
                                    className="w-[50px] flex items-center gap-2"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width="16"
                                        height="16"
                                        rx="8"
                                        fill="#F05151"
                                      />
                                      <g clipPath="url(#clip0_2119_13288)">
                                        <path
                                          d="M5.74722 10.6668L10.668 5.74609L10.2556 5.33369L5.33481 10.2544L5.74722 10.6668Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M10.2556 10.6663L10.668 10.2539L5.74722 5.33316L5.33481 5.74557L10.2556 10.6663Z"
                                          fill="white"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_2119_13288">
                                          <rect
                                            width="5.33333"
                                            height="5.33333"
                                            fill="white"
                                            transform="translate(5.33398 5.33301)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="col-sm-1 relative">
                        <label className="font-bold">Select Labour</label>
                        <span class="absolute left-3 top-3 bottom-0 flex items-center h-full ">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3C12.7417 3 13.4667 3.21993 14.0834 3.63199C14.7001 4.04404 15.1807 4.62971 15.4645 5.31494C15.7484 6.00016 15.8226 6.75416 15.6779 7.48159C15.5333 8.20902 15.1761 8.8772 14.6517 9.40165C14.1272 9.9261 13.459 10.2833 12.7316 10.4279C12.0042 10.5726 11.2502 10.4984 10.5649 10.2145C9.87971 9.93072 9.29404 9.45007 8.88199 8.83339C8.46993 8.2167 8.25 7.49168 8.25 6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3ZM12 1.5C10.9616 1.5 9.94661 1.80791 9.08326 2.38478C8.2199 2.96166 7.54699 3.7816 7.14963 4.74091C6.75227 5.70022 6.64831 6.75582 6.85088 7.77422C7.05345 8.79262 7.55346 9.72808 8.28769 10.4623C9.02192 11.1965 9.95738 11.6966 10.9758 11.8991C11.9942 12.1017 13.0498 11.9977 14.0091 11.6004C14.9684 11.203 15.7883 10.5301 16.3652 9.66674C16.9421 8.80339 17.25 7.78835 17.25 6.75C17.25 5.35761 16.6969 4.02226 15.7123 3.03769C14.7277 2.05312 13.3924 1.5 12 1.5ZM19.5 22.5H18V18.75C18 18.2575 17.903 17.7699 17.7145 17.3149C17.5261 16.86 17.2499 16.4466 16.9017 16.0983C16.5534 15.7501 16.14 15.4739 15.6851 15.2855C15.2301 15.097 14.7425 15 14.25 15H9.75C8.75544 15 7.80161 15.3951 7.09835 16.0983C6.39509 16.8016 6 17.7554 6 18.75V22.5H4.5V18.75C4.5 17.3576 5.05312 16.0223 6.03769 15.0377C7.02226 14.0531 8.35761 13.5 9.75 13.5H14.25C15.6424 13.5 16.9777 14.0531 17.9623 15.0377C18.9469 16.0223 19.5 17.3576 19.5 18.75V22.5Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <select
                          id="inputState"
                          class="form-select w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
                          shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          {...register("selectLabor")}
                        >
                          <option value="" disabled selected>
                            Select
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      {errors.selectLabor && (
                        <p className="text-red-500">
                          {errors.selectLabor.message}
                        </p>
                      )}
                      <div className="col-sm-1 relative">
                        <label className="font-bold">Labor Price</label>
                        <span class="absolute left-3 top-3 bottom-0 flex items-center h-full ">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.89717 5.7C7.34617 6.113 7.09717 6.608 7.09717 7.07C7.09717 7.533 7.34617 8.028 7.89717 8.442C8.44917 8.856 9.25717 9.142 10.1922 9.142C10.4574 9.142 10.7117 9.24736 10.8993 9.43489C11.0868 9.62243 11.1922 9.87678 11.1922 10.142C11.1922 10.4072 11.0868 10.6616 10.8993 10.8491C10.7117 11.0366 10.4574 11.142 10.1922 11.142C8.86617 11.142 7.62717 10.74 6.69717 10.042C5.76717 9.344 5.09717 8.304 5.09717 7.071C5.09717 5.837 5.76717 4.797 6.69717 4.099C7.62717 3.402 8.86717 3 10.1922 3C12.2452 3 14.1862 3.983 14.9582 5.62C15.0142 5.73885 15.0462 5.86756 15.0525 5.99879C15.0588 6.13003 15.0391 6.26121 14.9947 6.38485C14.9502 6.50849 14.8819 6.62217 14.7935 6.7194C14.7052 6.81662 14.5985 6.89549 14.4797 6.9515C14.3608 7.00751 14.2321 7.03956 14.1009 7.04583C13.9696 7.05209 13.8385 7.03245 13.7148 6.98801C13.5912 6.94358 13.4775 6.87523 13.3803 6.78686C13.283 6.6985 13.2042 6.59185 13.1482 6.473C12.7982 5.726 11.7062 5 10.1932 5C9.25817 5 8.44917 5.286 7.89717 5.7Z"
                              fill="#0B0B0B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.157 14.583C12.708 14.17 12.956 13.675 12.956 13.213C12.956 12.75 12.708 12.254 12.156 11.841C11.605 11.427 10.796 11.141 9.862 11.141C9.59678 11.141 9.34243 11.0356 9.15489 10.8481C8.96736 10.6606 8.862 10.4062 8.862 10.141C8.862 9.87578 8.96736 9.62143 9.15489 9.43389C9.34243 9.24636 9.59678 9.141 9.862 9.141C11.188 9.141 12.427 9.543 13.357 10.241C14.287 10.939 14.956 11.979 14.956 13.212C14.956 14.445 14.287 15.486 13.356 16.183C12.426 16.881 11.188 17.283 9.862 17.283C7.809 17.283 5.867 16.3 5.096 14.662C4.98289 14.4221 4.9697 14.1471 5.05934 13.8975C5.14898 13.6479 5.33411 13.4441 5.574 13.331C5.81389 13.2179 6.08889 13.2047 6.3385 13.2943C6.58811 13.384 6.79189 13.5691 6.905 13.809C7.257 14.557 8.349 15.283 9.862 15.283C10.797 15.283 11.605 14.997 12.157 14.583ZM10 1C10.2652 1 10.5196 1.10536 10.7071 1.29289C10.8946 1.48043 11 1.73478 11 2V3C11 3.26522 10.8946 3.51957 10.7071 3.70711C10.5196 3.89464 10.2652 4 10 4C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3V2C9 1.73478 9.10536 1.48043 9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1Z"
                              fill="#0B0B0B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 16C10.2652 16 10.5196 16.1054 10.7071 16.2929C10.8946 16.4804 11 16.7348 11 17V18C11 18.2652 10.8946 18.5196 10.7071 18.7071C10.5196 18.8946 10.2652 19 10 19C9.73478 19 9.48043 18.8946 9.29289 18.7071C9.10536 18.5196 9 18.2652 9 18V17C9 16.7348 9.10536 16.4804 9.29289 16.2929C9.48043 16.1054 9.73478 16 10 16Z"
                              fill="#0B0B0B"
                            />
                          </svg>
                        </span>
                        <input
                          type="number"
                          min="0"
                          className="w-full outline-0 bg-[#f3f1f1] py-4 px-10 rounded-lg 
                          shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Enter Amount"
                          {...register("laborPrice")}
                        />
                        {errors.laborPrice && (
                          <p className="text-red-500">
                            {errors.laborPrice.message}
                          </p>
                        )}
                      </div>

                      <div className="inp mb-4 flex justify-end gap-3">
                        {/* <button className='border border-dark_link px-8 rounded-lg font-medium'>Discard</button> */}
                        <button
                          // onClick={handleSubmit(handleSendEstimates)}
                          onClick={() => handleSendMessage()}
                          className="bg-dark_link py-4 px-10 text-white font-medium rounded-lg"
                        >
                          Save & Preview
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
      <Footer_two />

      <Add_Items
        isOpen={isOpen}
        closeModal={closeModal}
        onAddItem={handleAddItem}
      />
    </>
  );
}

export default Message_Send_Invoice;
