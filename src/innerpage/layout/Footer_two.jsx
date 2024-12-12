import React from "react";
import { Link } from "react-router-dom";

function Footer_two() {
  return (
    <>
      {/* fixed bottom-0 left-0 right-0 */}
      <footer className="bg-dark_link py-5 mt-auto z-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2">
            <div className="lg:col-span-1 col-span-2">
              <p className="text-white lg:text-left text-center">
                © 2024 Copyright, All Right Reserved, Our Review
              </p>
            </div>
            <div className="lg:col-span-1 col-span-2">
              <ul className="flex lg:justify-end lg:flex-nowrap flex-wrap justify-center">
                <li className="border-r border-main_gray px-3 text-main_gray hover:text-white">
                  <Link to="/About">About Us</Link>
                </li>
                <li className="border-r border-main_gray px-3 text-main_gray hover:text-white">
                  <Link to="/Contact">Contact Us</Link>
                </li>
                <li className="border-r border-main_gray px-3 text-main_gray hover:text-white">
                  <Link to="/terms&conditions">Terms & Conditions</Link>
                </li>
                <li className=" px-3 text-main_gray hover:text-white">
                  <Link to="/PrivacyPolicy">Privacy Policies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer_two;
