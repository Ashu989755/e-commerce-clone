import React, { useEffect, useState, createContext, useContext } from "react";
import { createSignalRConnection, TrackUser } from "../../src/signalR/signalR"; 
import { useSelector } from "react-redux";

const LiveTrackingContext = createContext();

export const useLiveTracking = () => useContext(LiveTrackingContext);

const Tracking_Layout = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  const [connection, setConnection] = useState(null);
  
  const longitude = user?.longitude;
  const latitude = user?.latitude;
  const bookingId = user?.bookingId;
  const userId = user?.userId;

  useEffect(() => {
    const initializeConnection = async () => {
      const conn = createSignalRConnection();
      await conn.start();
      setConnection(conn);
      console.log("Connected to SignalR");
    };

    initializeConnection();

    return () => {
      if (connection) connection.stop();
    };
  }, []);

  useEffect(() => {
    if (!connection || !userId || !bookingId || !latitude || !longitude) return;

    const intervalId = setInterval(() => {
      const messageArgs = [userId, bookingId, latitude, longitude];
      console.log("Sending tracking data:", messageArgs);

      TrackUser(connection, messageArgs)
        .then(() => {
          console.log("Tracking request sent successfully");
        })
        .catch((error) => {
          console.error("Error during live tracking:", error);
        });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [connection, userId, bookingId, latitude, longitude]);

  return (
    <LiveTrackingContext.Provider value={{ connection }}>
      {children}
    </LiveTrackingContext.Provider>
  );
};

export default Tracking_Layout;