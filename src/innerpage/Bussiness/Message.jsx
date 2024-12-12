import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  createSignalRConnection,
  sendMessage,
  ChatListing,
  ChatDetails,
  BlockUser,
} from "../../../src/signalR/signalR";
import SecureLS from "secure-ls";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ContractIcons,
  InvoiceIcons,
  logo,
  MoreIconAlt,
  SearchWhite,
  SendMessagee,
} from "../../assets/image";
import { SearchIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment-timezone";
import { CiUser } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { businessReportUser } from "../../apis/business/Documents";
import Send_contract_message from "../../modals/Send_Contract_message";



const Message = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, "===========");


  const isBusiness = location.pathname.includes("business");
  const [connection, setConnection] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatDetail, setChatDetail] = useState([]);
  const [selectedUser, setSelectedUser] = useState(state?.userId);
  const [selectedUserDetails, setSelectedUserDetails] = useState({
    fullName: "",
    image: null,
    userId: null,
    bookingId: null,
  });
  const [isBlocked, setIsBlocked] = useState(false);
  const [contract, setContract] = useState(false);
  const [file, setFile] = useState(null);
  const [fileNamee, setFileName] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const openContract = () => {
    setContract(true);
  };

  const closeContract = () => {
    setContract(false);
  };

  const name = state?.name || null;
  console.log(name);

  const bookingIdd = state?.bookingId || selectedUserDetails.bookingId;
  const toUserId = state?.userId || selectedUserDetails.userId;
  const status = state?.bookingStatus;
  const imageSelect = state?.image;
  // console.log(selectedUserDetails, "===========+++++++++++++++++");
  const timee = new Date().toISOString();

  useEffect(() => {
    const initializeConnection = async () => {
      // const token = chatToken.replace(/^Bearer\s/, "");
      const conn = createSignalRConnection();
      await conn.start();
      setConnection(conn);
      console.log("Connected to SignalR");

      conn.on("MyChatList", (args) => {
        console.log("Chat list data:", args);
        setChatList(args.data.chatList || []);
      });
      
      conn.on("ChatDetailResponse", (args) => {
        console.log("Received ChatDetailResponse event", args);
        setChatDetail(args.data.messageList);
        setSelectedUser(args.data.messageList.userId);
      });

      // conn.on("ReciveMessage", (receivedMessage) => {
      //   console.log("ReciveMessage event", receivedMessage);

      //   const newMessage = {
      //     message: receivedMessage.data.message || "",
      //     fileLink: receivedMessage.data.fileLink || null,
      //     messageType: receivedMessage.data.messageType || 0,
      //     toUserId: receivedMessage.data.toUserId,
      //     fromUserId: receivedMessage.data.fromUserId,
      //     date: receivedMessage.data.date || new Date().toISOString(),
      //   };

      //   console.log(newMessage, "===== new message");
      //   //  if (
      //   //     newMessage.toUserId === selectedUser ||
      //   //     newMessage.fromUserId === selectedUser
      //   //   )
      //   {
      //     setChatDetail((prev) => [...prev, newMessage]);
      //   }
      // });

      // if (resultId === state.userId) {
      //   setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      // } else {
      //   setReceivedMessages((prevMessages) => [
      //     ...prevMessages,
      //     receivedMessage,
      //   ]);
      // }
      conn.on("ReciveMessage", (receivedMessage) => {
        if (receivedMessage) {
          console.log("ReciveMessage event", receivedMessage);
          setChatDetail((prev) => [
            ...prev,
            {
              message: receivedMessage.data.message || "",
              fileLink: receivedMessage.data.fileLink || "",
              messageType: receivedMessage.data.messageType || 0,
              toUserId: receivedMessage.data.toUserId,
              fromUserId: receivedMessage.data.fromUserId,
              date: receivedMessage.data.date || new Date().toISOString(),
            },
          ]);
        } else {
          console.error("ReciveMessage event did not receive data");
        }
      });

      conn.on("BlockUserResponse", (blockUnblockResponse) => {
        console.log("blockUnblockResponse event", blockUnblockResponse);
      });
    };

    initializeConnection();

    return () => {
      if (connection) connection.stop();
    };
  }, [toUserId]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      const fileName = selectedFile.name;
      reader.onload = () => {
        const base64File = reader.result.split(",")[1];
        const fileExtension = fileName.split(".").pop();
        handleSendImage(base64File, fileExtension);
        setFile(base64File);
        setFileName(fileExtension);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSendMessage = async ({
    receivedId,
    msg,
    fileType,
    isFile,
    time,
    thumbImage,
    thumbImageType,
    type,
    bookingId,
  }) => {
    if (connection) {
      // const messageArgs = [2618, 'hello dear', 1, null, false, new Date().toISOString(), null, null, 1, 502];
      const messageArgs = [
        receivedId,
        msg,
        1,
        fileType,
        isFile,
        time,
        thumbImage,
        thumbImageType,
        type,
        bookingId,
      ];
      console.log(messageArgs);

      try {
        await sendMessage(connection, messageArgs);
        // console.log("Message sent successfully");
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("Connection not established");
    }
  };

  const handleSendImage = async (file, fileNamee) => {
    if (connection) {
      if (!file) {
        console.error("No file selected");
        return;
      }
      const messageArgs = [
        toUserId,
        file,
        1,
        fileNamee,
        true,
        new Date().toISOString(),
        null,
        null,
        1,
        bookingIdd,
      ];

      console.log("Message Args for sending image:", messageArgs);

      try {
        await sendMessage(connection, messageArgs);
        console.log("Message sent successfully with image");
      } catch (error) {
        console.error("Error sending image:", error);
      }
    } else {
      console.error("Connection not established");
    }
    console.log("helloo");
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
      }
    } else {
      console.error("Connection not established");
    }
  };

  const handleChatDetails = async (userId, bookingId, fullName, image) => {
    const messArgs = [
      userId,
      new Date().toISOString(),
      bookingId || bookingIdd,
    ];

    // const messArgs = [
    //   2647,
    //   591,
    //  new Date().toISOString(),
    //
    // ]
    console.log(messArgs, "===================");
    if (connection) {
      try {
        await ChatDetails(connection, messArgs);
        setSelectedUser(userId);
        setSelectedUserDetails({ fullName, image, userId, bookingId });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("Connection not established");
    }
  };

  // useEffect(() => {
  //   handleChatListing();
  //   if (selectedUser) {
  //     handleChatDetails(selectedUser,
  //     selectedUserDetails.bookingId,
  //    selectedUserDetails.fullName,
  //       selectedUserDetails.image
  //     );
  //   }
  // }, [connection]);

  useEffect(() => {
    if (connection) {
      handleChatListing();
    }
  }, [connection]);

  useEffect(() => {
    if (connection && selectedUser) {
      handleChatDetails(
        selectedUser,
        selectedUserDetails.bookingId,
        selectedUserDetails.fullName,
        selectedUserDetails.image
      );
    }
  }, [connection, selectedUser]);

  const handleBlockUnblock = async (userId) => {
    const newBlockStatus = !isBlocked;
    if (connection) {
      const messageArgs = [userId, newBlockStatus];
      console.log(messageArgs);
      try {
        const res = await BlockUser(connection, messageArgs);
        if (res?.data?.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        console.error("Error sending BlockUnblock message:", error);
      }
      console.error("Connection not established");
    }
  };

  const handleSendInvoice = () => {
    navigate("/message-send-invoice", { state: { toUserId, bookingIdd } });
  };

  const handleReportUser = async () => {
    try {
      const res = await businessReportUser();
      toast.success("Report Sent");
    } catch (error) {
      console.log(error);
    }
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatDetail]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOpenContract(contract) {
    const pdfURL = contract;
    const pdfWindow = window.open(pdfURL, "_blank");
    if (!pdfWindow) {
      alert("Please allow popups for this website");
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = chatList?.filter((list) =>
      list.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [chatList, searchTerm]);

  const handleViewInvoice = () => {
    navigate(`/view-invoice/${bookingIdd}`);
  };

  const handleImageClick = (src) => {
    console.log(src);

    window.open(src, "_blank");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-[#DFE4EA]">
          <header className="p-[1.594rem] border-b border-[#DFE4EA] flex justify-between items-center bg-white text-white">
            <Link className="text-2xl font-semibold" to="/">
              <img src={logo} alt="" />
            </Link>
            <div className="relative">
              {/* <span
                id="menuButton"
                className="bg-gray-200 px-3 py-2 rounded-md text-gray-600 font-medium"
              >
                2
              </span> */}
            </div>
          </header>
          <div className="relative mx-5 mt-4">
            <input
              type="text"
              className="bg-[#F7F7F7] outline-0 w-full p-3 rounded-lg bg-gray-900 text-white"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-3 top-2 bg-[#303030] rounded-lg">
              <img src={SearchWhite} alt="" className="p-1 " />
            </span>
          </div>

          <div class="overflow-y-auto h-screen p-3 mb-9 pb-[8rem] mt-2">
            {filteredUsers && filteredUsers.length > 0 ? 
            
             ( filteredUsers.map((chat) => (

                <div
                  key={chat.userId}
                  onClick={() =>
                    handleChatDetails(
                      chat.userId,
                      chat.bookingId,
                      chat.fullName,
                      chat.image
                    )
                  }
                  className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-md ${
                    selectedUser === chat.userId ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                    <img
                      src={chat?.image || state?.image}
                      alt="User Avatar"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-md font-semibold">
                        {chat.fullName || state?.name}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {moment.utc(chat.dateTime).tz(userTimeZone).fromNow()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 line-clamp-1 text-sm">
                        {chat?.lastMessage}
                      </p>
                      {chat?.unreadMessageCount >= 1 ? (
                        <span className="bg-black text-xs font-semibold w-[1.4rem] h-[1.4rem] rounded-full text-white flex items-center justify-center shrink-0">
                          {chat?.unreadMessageCount}
                        </span>
                      ) : (
                        state?.name ? (
                          <div>
                            <h2>{state.name}</h2>
                            <p>No chats available, displaying state name.</p>
                          </div>
                        ) : (
                          <div>No users or state data found.</div>
                        )
                      )}
                    </div>
                  </div>
                </div>  
              ))) : (
                state?.name && (
              <div
                key={state.userId}
                onClick={() =>
                  handleChatDetails(
                    state.userId,
                    state.bookingId,
                    state.name,
                    state.image
                  )
                }
                className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-md ${
                  selectedUser === state.userId ? "bg-gray-200" : ""
                }`}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                  <img
                    src={state?.image}
                    alt="User Avatar"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h2 className="text-md font-semibold">
                      { state?.name}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {moment.utc(state.dateTime).tz(userTimeZone).fromNow()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                   
                   
                  </div>
                </div>
              </div> ))}
              </div>
               {/* ) : (
                <div className="text-center text-gray-500 mt-4"><svg clip-rule="evenodd" fill-rule="evenodd" height="200" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_7486746"><g id="Exp-1.-O"><path d="m48.887 23.278v13.078s.003 1.204-.096 3.055c-.015.276.197.512.473.526.275.015.511-.196.526-.472.101-1.885.097-3.112.097-3.112v-13.075c0-.276-.224-.5-.5-.5s-.5.224-.5.5z" fill="#738bab"></path><path d="m46.333 37.833-2.503-.908c-.842-.305-1.783-.137-2.467.441l-3.032 2.563c-.382.323-.9.435-1.381.297l-5.974-1.707c-.234-.067-.482.045-.587.264-.106.219-.039.482.159.624 0 0 3.761 2.686 5.77 4.121.91.65 2.141.616 3.014-.082 0 0 2.932-2.346 2.932-2.346.413-.33.969-.418 1.464-.233 0 0 4.818 1.807 4.818 1.807-.409 4.189-1.298 9.529-3.289 12.884-.093.144-.25.229-.419.229-3.827.003-26.547.003-32.899.003-.175 0-.338-.092-.428-.242-.09-.151-.095-.338-.013-.493.005-.008.009-.017.013-.025 3.137-6.811 3.376-18.665 3.376-18.665v-1.321c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.306c-.005.256-.249 11.654-3.277 18.245-.241.468-.224 1.021.044 1.467.27.451.758.728 1.284.728h.001c6.351 0 29.073 0 32.9-.003.512 0 .99-.263 1.264-.696.003-.004.005-.008.007-.012 2.123-3.567 3.063-9.311 3.467-13.693.021-.224-.111-.435-.322-.514l-5.176-1.941c-.825-.309-1.752-.162-2.44.389-.816.653-2.033 1.626-2.931 2.345-.524.419-1.263.439-1.809.049 0 0-3.413-2.438-3.413-2.438s3.19.912 3.19.912c.801.229 1.664.043 2.3-.495l3.033-2.563c.41-.347.975-.448 1.48-.265 0 0 2.502.908 2.502.908.26.094.547-.04.641-.299.094-.26-.04-.547-.299-.641z" fill="#738bab"></path><path d="m17.298 34.487 1.652-.62c.495-.185 1.051-.097 1.464.233 0 0 2.931 2.346 2.931 2.346.874.698 2.105.732 3.015.082 2.009-1.435 5.77-4.121 5.77-4.121.198-.142.265-.405.159-.624-.105-.219-.353-.331-.587-.264 0 0-4.03 1.152-5.975 1.707-.48.138-.998.026-1.38-.297l-3.032-2.563c-.684-.578-1.625-.746-2.467-.441 0 0-3.961 1.437-3.961 1.437v-22.652c0-.133.053-.26.147-.354s.221-.146.353-.146h20.113c.276 0 .5-.224.5-.5s-.224-.5-.5-.5c-5.09 0-16.648 0-20.113 0-.398 0-.779.158-1.06.439-.282.281-.44.663-.44 1.061v23.365c0 .163.08.316.213.41.134.093.305.116.458.06l4.631-1.68c.505-.183 1.07-.082 1.48.265 0 0 3.032 2.563 3.032 2.563.637.538 1.5.724 2.301.495 0 0 3.19-.912 3.19-.912s-3.413 2.438-3.413 2.438c-.546.39-1.285.37-1.809-.049-.898-.719-2.115-1.692-2.931-2.345-.688-.551-1.615-.698-2.44-.389 0 0-1.652.62-1.652.62-.259.096-.39.385-.293.643.097.259.385.39.644.293z" fill="#738bab"></path><g fill="#2d74ff"><path d="m49.204 20.867c.197.078.422.023.561-.138.139-.16.162-.391.056-.575-2.821-4.932-6.686-9.211-11.582-12.846-.166-.124-.392-.131-.567-.019-.175.111-.263.32-.22.523.737 3.521 1.099 7.084.742 10.727-.048.459.12.919.458 1.239.337.321.804.467 1.264.395 3.207-.496 6.335-.472 9.288.694z"></path><path d="m6.078 23.778 5 5.87c.358.421.989.471 1.409.113s.471-.989.113-1.409l-5-5.87c-.358-.421-.989-.471-1.41-.113-.42.358-.47.989-.112 1.409z"></path><path d="m6.132 32.504 3.549.951c.533.143 1.082-.174 1.225-.707s-.174-1.082-.707-1.225l-3.549-.951c-.534-.143-1.082.174-1.225.707s.174 1.082.707 1.225z"></path><path d="m5.661 40.729 6.678-3.856c.478-.276.642-.888.366-1.366s-.888-.642-1.366-.366l-6.678 3.856c-.478.276-.642.888-.366 1.366s.888.642 1.366.366z"></path><path d="m57.922 51.214-5-5.87c-.358-.42-.989-.47-1.409-.113-.42.358-.471.99-.113 1.41l5 5.87c.358.42.989.471 1.41.113.42-.358.47-.99.112-1.41z"></path><path d="m57.868 42.489-3.549-.951c-.533-.143-1.082.174-1.225.707s.174 1.082.707 1.225l3.549.951c.534.142 1.082-.174 1.225-.708.143-.533-.174-1.081-.707-1.224z"></path><path d="m58.339 34.264-6.678 3.855c-.478.276-.642.888-.366 1.366s.888.642 1.366.366l6.678-3.855c.478-.276.642-.888.366-1.366s-.888-.642-1.366-.366z"></path></g><path d="m20.218 16.546 3.535 3.536c.195.195.512.195.707 0s.195-.512 0-.707l-3.535-3.536c-.195-.195-.512-.195-.707 0-.196.196-.196.512 0 .707z" fill="#738bab"></path><path d="m23.753 15.839-3.535 3.536c-.196.195-.196.512 0 .707.195.195.512.195.707 0l3.535-3.536c.195-.195.195-.511 0-.707-.195-.195-.512-.195-.707 0z" fill="#738bab"></path><path d="m31.218 16.546 3.535 3.536c.195.195.512.195.707 0s.195-.512 0-.707l-3.535-3.536c-.195-.195-.512-.195-.707 0-.196.196-.196.512 0 .707z" fill="#738bab"></path><path d="m34.753 15.839-3.535 3.536c-.196.195-.196.512 0 .707.195.195.512.195.707 0l3.535-3.536c.195-.195.195-.511 0-.707-.195-.195-.512-.195-.707 0z" fill="#738bab"></path><path d="m22.139 26.009 1.703-1.276s1.697 1.275 1.697 1.275c.177.134.422.134.6 0l1.7-1.275s1.7 1.275 1.7 1.275c.178.134.422.134.6 0l1.7-1.275s1.7 1.275 1.7 1.275c.221.166.534.121.7-.1.165-.22.121-.534-.1-.7l-2-1.5c-.177-.133-.422-.133-.6 0l-1.7 1.275s-1.7-1.275-1.7-1.275c-.177-.133-.422-.133-.6 0l-1.7 1.275s-1.696-1.274-1.696-1.274c-.178-.134-.422-.134-.6-.001l-2.004 1.5c-.221.165-.266.479-.1.7.165.221.479.266.7.101z" fill="#738bab"></path></g></svg></div>
               ) */}
            
        

          <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-md">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden"></div>
          </div>
        </div>

        <div className="flex-1">
          {selectedUser ? (
            <div>
              <header className="flex justify-between item-center border-b border[#DFE4EA]">
                <div className="p-4 flex items-center gap-3">
                  <div className="h-[3.25rem] w-[3.25rem] overflow-hidden rounded-full">
                    <img
                      src={state?.image || selectedUserDetails.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-lg text-gray font-semibold mb-0 leading-5">
                      {state?.name || selectedUserDetails?.fullName}
                    </h5>
                    <span className="text-sm font-normal text-[#22AD5C]">
                      {/* Online */}
                    </span>
                  </div>

                  <footer className="p-4 absolute bottom-0 w-[79%] ">
                    <>
                      {" "}
                      {isBusiness && (
                        <div className="flex items-center gap-4 justify-center mb-3">
                          <button
                            onClick={() => handleSendInvoice()}
                            type="button"
                            className="border border-gray-800 bg-white shadow-lg px-3 py-1 rounded-full flex items-center gap-2"
                          >
                            <img src={InvoiceIcons} alt="" />
                            Send Invoice
                          </button>

                          <button
                            onClick={openContract}
                            type="button"
                            className="border border-gray-800 bg-white shadow-lg px-3 py-1 rounded-full flex items-center gap-2"
                          >
                            <img src={ContractIcons} alt="" />
                            Send Contract
                          </button>
                        </div>
                      )}
                      {status !== 7 ? (
                        <div className="flex items-center justify-between">
                          <div className="relative w-full">
                            <input
                              value={inputMessage}
                              onChange={handleInputChange}
                              placeholder="Type your message"
                              className="w-full pe-4 ps-12 py-3 rounded-lg border-0 focus:outline-none text-md shadow-md"
                            />
                            <label className="cursor-pointer ml-2 absolute left-2 top-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  handleFileChange(e);
                                  // handleSendImage(file, fileNamee);
                                }}
                                className="hidden"
                              />
                              <span className="">📷</span>
                            </label>
                          </div>
                          <button
                            className={`${
                              inputMessage
                                ? "bg-black"
                                : "bg-black cursor-not-allowed"
                            } text-white px-3 py-3 rounded-md ml-2 shadow-lg`}
                            onClick={() =>
                              handleSendMessage({
                                receivedId:
                                  state?.userId || selectedUserDetails.userId,
                                msg: inputMessage,
                                filetType: null,
                                isFile: false,
                                time: new Date().toISOString(),
                                thumbImage: null,
                                thumbImageType: null,
                                type: 1,
                                bookingId:
                                  state?.bookingId ||
                                  selectedUserDetails.bookingId,
                              })
                            }
                            disabled={!inputMessage.trim()}
                          >
                            <img src={SendMessagee} alt="" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-red-600 font-semibold text-center mb-2 mt-2 ">
                          Your Job has been Completed
                        </p>
                      )}{" "}
                    </>
                    {/* )} */}
                  </footer>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="md:mr-0 mr-3 bg-white/5 border border-white/30 text-white p-8 rounded-md flex items-center space-x-2"
                  >
                    <img src={MoreIconAlt} alt="" />
                  </button>
                  {isOpen && (
                    <div className="absolute top-14 right-8 bg-white border mt-2 rounded-md shadow-lg">
                      <ul className="p-2">
                        <li className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer rounded-md whitespace-nowrap ">
                          <div onClick={() => handleBlockUnblock(toUserId)}>
                            {" "}
                            Block
                          </div>
                        </li>
                        <li className="px-4 text-sm font-medium py-2 hover:bg-gray-100 cursor-pointer rounded-md whitespace-nowrap">
                          <div onClick={handleReportUser}>Report</div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* <div onClick={() => handleBlockUnblock(toUserId)} className="p-8 mr-10 font-bold text-2xl cursor-pointer">{isBlocked ? "Unblock" : "Block"}</div> */}
              </header>

              <div className="h-screen overflow-y-auto p-4 pb-36 bg-[#f5f5f5]">
                <div>
                  <h3>Chat Messages</h3>
                  <div className="flex flex-col-reverse overflow-y-auto p-4 h-[calc(100vh-100px)] notranslate">
                    <ul>
                      {chatDetail?.map((messageObj, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            messageObj.toUserId === selectedUser
                              ? "justify-end"
                              : "items-start"
                          } mb-4`}
                        >
                          <div className="flex flex-col gap-1 w-full max-w-[400px]">
                            <div
                              className={`flex flex-col p-4 ${
                                messageObj.toUserId === selectedUser
                                  ? "bg-black text-white rounded-s-xl rounded-tr-xl"
                                  : "bg-white rounded-tl-xl rounded-r-xl"
                              } shadow-md`}
                            >
                              {messageObj.messageType === 1 &&
                              messageObj.fileLink ?
                               (
                                <div className="flex flex-col items-start gap-2 w-[50px]">
                                  <img
                                    src={messageObj.fileLink}
                                    alt="Uploaded"
                                    className="rounded-md shadow-md max-w-full"
                                    onClick={() =>
                                      handleImageClick(messageObj.fileLink)
                                    }
                                  />
                                  <h4 className="text-sm text-gray-500">
                                    {moment
                                      .utc(messageObj.date)
                                      .tz(userTimeZone)
                                      .format("hh:mm A")}
                                  </h4>
                                </div>
                              ) : 
                                messageObj.messageType === 1 ?
                                 (
                                  <p>{messageObj.message}</p>
                                )
                              
                              : messageObj.messageType === 2 ? (
                              <div className="flex flex-col items-start gap-2">
                                <h4 className="text-lg font-semibold">
                                  Contract
                                </h4>
                                <h4 className="text-sm text-gray-500">
                                  {moment
                                    .utc(messageObj.date)
                                    .tz(userTimeZone)
                                    .format("hh:mm A")}
                                </h4>
                                <div
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-black text-white px-4 py-2 rounded-md shadow "
                                >
                                  <button
                                    onClick={() =>
                                      handleOpenContract(messageObj.fileLink)
                                    }
                                    className="bg-gray-900 p-3 border rounded text-end"
                                  >
                                    View Contract
                                  </button>
                                </div>
                              </div>
                              ) : messageObj.messageType === 3 ? (
                              <div className="flex flex-col items-start gap-2">
                                <h4 className="text-lg font-semibold">
                                  {messageObj?.docData?.businessName}
                                </h4>
                                <h4 className="text-sm text-gray-500">
                                  {moment
                                    .utc(messageObj.date)
                                    .tz(userTimeZone)
                                    .format("hh:mm A")}
                                </h4>
                                <div
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-black text-white px-4 py-2 rounded-md shadow "
                                >
                                  <button
                                    onClick={() => handleViewInvoice()}
                                    className="bg-gray-900 p-3 border rounded text-end"
                                  >
                                    View Invoice
                                  </button>
                                </div>
                              </div>
                              ) : (<p>{messageObj.message}</p>)}
                            </div>
                            <span className="text-xs font-normal text-gray-500">
                              {moment
                                .utc(messageObj.date)
                                .tz(userTimeZone)
                                .fromNow()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </ul>
                    {/* <ul>
                      {chatDetail?.map((messageObj, index) => {
                        if (!messageObj) return null;

                        const isSentByUser =
                          messageObj.toUserId === selectedUser;
                        const isImageMessage =
                          messageObj.messageType === 1 &&
                          messageObj.fileLink?.trim();
                        const isTextMessage =
                          messageObj.messageType === 1 &&
                          messageObj.fileLink?.trim();
                        const isContract = messageObj.messageType === 2;
                        const isInvoice = messageObj.messageType === 3;

                        return (
                          <li
                            key={index}
                            className={`flex ${
                              isSentByUser ? "justify-end" : "items-start"
                            } mb-4`}
                          >
                            <div className="flex flex-col gap-1 w-full max-w-[400px]">
                              <div
                                className={`flex flex-col p-4 ${
                                  isSentByUser
                                    ? "bg-black text-white rounded-s-xl rounded-tr-xl"
                                    : "bg-white rounded-tl-xl rounded-r-xl"
                                } shadow-md`}
                              >
                                {isImageMessage ? (
                                  <div className="flex flex-col items-start gap-2 w-[50px]">
                                    <img
                                      src={messageObj.fileLink}
                                      alt="Uploaded"
                                      className="rounded-md shadow-md max-w-full"
                                      onClick={() =>
                                        handleImageClick(messageObj.fileLink)
                                      }
                                    />
                                    <h4 className="text-sm text-gray-500">
                                      {moment
                                        .utc(messageObj.date)
                                        .tz(userTimeZone)
                                        .format("hh:mm A")}
                                    </h4>
                                  </div>
                                ) : isTextMessage ? (
                                  <p>
                                    {messageObj.message ||
                                      "No content available"}
                                  </p>
                                ) : isContract ? (
                                  <div className="flex flex-col items-start gap-2">
                                    <h4 className="text-lg font-semibold">
                                      Contract
                                    </h4>
                                    <h4 className="text-sm text-gray-500">
                                      {moment
                                        .utc(messageObj.date)
                                        .tz(userTimeZone)
                                        .format("hh:mm A")}
                                    </h4>
                                    <div
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="bg-black text-white px-4 py-2 rounded-md shadow"
                                    >
                                      <button
                                        onClick={() =>
                                          handleOpenContract(
                                            messageObj.fileLink
                                          )
                                        }
                                        className="bg-gray-900 p-3 border rounded text-end"
                                      >
                                        View Contract
                                      </button>
                                    </div>
                                  </div>
                                ) : isInvoice ? (
                                  <div className="flex flex-col items-start gap-2">
                                    <h4 className="text-lg font-semibold">
                                      {messageObj?.docData?.businessName ||
                                        "Invoice"}
                                    </h4>
                                    <h4 className="text-sm text-gray-500">
                                      {moment
                                        .utc(messageObj.date)
                                        .tz(userTimeZone)
                                        .format("hh:mm A")}
                                    </h4>
                                    <div
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="bg-black text-white px-4 py-2 rounded-md shadow"
                                    >
                                      <button
                                        onClick={handleViewInvoice}
                                        className="bg-gray-900 p-3 border rounded text-end"
                                      >
                                        View Invoice
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p>
                                    {messageObj.message ||
                                      "No content available"}
                                  </p>
                                )}
                              </div>

                              <span className="text-xs font-normal text-gray-500">
                                {moment
                                  .utc(messageObj.date)
                                  .tz(userTimeZone)
                                  .fromNow()}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul> */}
                  </div>
                </div>
              </div>
              <footer className="p-4 absolute bottom-0 w-[79%]">
                {/* <div className="flex items-center justify-between">
         <input
           type="text"
           value={inputMessage}
           onChange={handleInputChange}
           placeholder="Type your message"
           className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none text-md shadow-md"
         />
         <button
           className={`${inputMessage ? "bg-black" : "bg-black cursor-not-allowed"
             } text-white px-3 py-3 rounded-md ml-2 shadow-lg`}
           onClick={() =>
             handleSendMessage({
               receivedId: state?.userId || selectedUserDetails.userId,
               msg: inputMessage,
               filetType: null,
               isFile: false,
               time: new Date().toISOString(),
               thumbImage: null,
               thumbImageType: null,
               type: 1,
               bookingId: state.bookingId || selectedUserDetails.bookingId,
             })
           }
           disabled={!inputMessage.trim()} // prevent empty send but keep button
         >
           <img src={SendMessagee} alt="" />
         </button>
       </div> */}
              </footer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              <p>Your messages will appear here </p>
              <img
                className="w-[50px] h-[50px]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMjbSWrbKfPwqwXqpswsxusENItrTnvWFSg&s"
              />
              ....
            </div>
          )}
        </div>
        <Send_contract_message
          isOpen={contract}
          closeModal={closeContract}
          receivedId={toUserId}
          bookingId={bookingIdd}
          createSignalRConnection={createSignalRConnection}
          setChatDetail={setChatDetail}
        />
      </div>
    </>
  );
};

export default Message;
