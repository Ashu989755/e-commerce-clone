import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import SecureLS from "secure-ls";
import { useSelector } from "react-redux";

const ls = new SecureLS();



const chatToken = ls.get("token");

export const createSignalRConnection = () => {
  const token = chatToken.replace(/^Bearer\s/, "");
  const connection = new HubConnectionBuilder()
    .withUrl("https://api.our-review.com/chat", {
      accessTokenFactory: () => token,
      transport: HttpTransportType.WebSockets,
      skipNegotiation: true,
    })
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
};

export const sendMessage = async (connection, messageArgs) => {
  try {
    if (connection.state !== "Connected") {
      console.log("Connection is not established. Starting connection...");
      await connection.start();
    }

    await connection.invoke("SendMessage", ...messageArgs);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
export const ChatListing = async (connection, chatArgs) => {
  try {
    if (connection.state !== "Connected") {
      console.log("Connection is not established. Starting connection...");
      await connection.start();
    }

    await connection.invoke("ChatList", ...chatArgs);
    console.log("ChatListing here");
  } catch (error) {
    console.error("Error Fetching message:", error);
  }
};


export const ChatDetails = async (connection, chatDetails) => {
  try {
    if (connection.state !== "Connected") {
      console.log("Connection is not established. Starting connection...");
      await connection.start();
    }

    await connection.invoke("ChatDetail", ...chatDetails);
    console.log("ChatDetail here");
  } catch (error) {
    console.error("Error Fetching message:", error);
  }
};


export const BlockUser = async (connection, messageArgs) => {
  try {
    if (connection.state !== "Connected") {
      console.log("Connection is not established. Starting connection...");
      await connection.start();
    }

    await connection.invoke("BlockUser", ...messageArgs);
    
  } catch (error) {
    console.error("Error blocking the user:", error);
  }
};


export const TrackUser = async (connection, messageArgs) => {
 try {
    if (connection.state !== "Connected") {
      console.log("Connection is not established. Starting connection...");
      await connection.start();
    }

    await connection.invoke("TrackBusiness", ...messageArgs);
    
  } catch (error) {
    console.error("Error Tracking the user:", error);
  }
};
