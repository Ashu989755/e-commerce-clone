import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import SecureLS from "secure-ls";

const ls = new SecureLS();



const token = ls.get("token");


const Private_Routing = ({ isAuthenticated, children, redirect = "/" }) => {
//   const isAuthenticated = token; 

//   return isAuthenticated ? children : <Navigate to="/login" />;



  if (!isAuthenticated) return <Navigate to={redirect} />;

  return children ? (
    children
  ) : (
    // <Elements stripe={stripePromise}>
      <Outlet />
    // </Elements>
  );
};

export default Private_Routing;
