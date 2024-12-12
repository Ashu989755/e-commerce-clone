import React, { useEffect, useRef, useState } from "react";
import { logo } from "../assets/image";
import Select_Management from "../modals/Select_Management";
import { Link } from "react-router-dom";

function Landing_header() {
  const headerRef = useRef();

  // useEffect(() => {
  //   console.log(headerRef.current.classList);

  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 500) {
  //       // Change 100 to the pixel value you want
  //       headerRef.current.classList.add("scrolled");
  //     } else {
  //       headerRef.current.classList.remove("scrolled");
  //     }
  //   });
  // }, []);
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <>
      <header ref={headerRef} class="fixed left-0 right-0 top-0 z-[9999] px-6">
        <input type="text" className="hidden" />
        <div class="container mx-auto flex flex-wrap py-5 lg:flex-row items-center justify-between">
          {/* logo */}
          <a class="flex lg:ms-0 ms-2">
            <img src={logo} alt="" />
          </a>
          <button
            onClick={() => setShowNavBar((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              ></path>
            </svg>
          </button>

          {/* links */}

          <nav
            class={`lg:ml-auto lg:mr-auto flex lg:flex-row flex-col flex-wrap gap-x-5 lg:items-center items-start mobile-view text-base justify-center ${
              showNavBar ? "block" : "lg:flex hidden"
            } `}
          >
            <a
              href="#home"
              class="text-base cursor-pointer text-main_gray hover:text-dark_link border-b-2 border-transparent hover:border-dark_link transition-opacity"
            >
              Home
            </a>
            <a
              href="#services"
              class="text-base cursor-pointer text-main_gray hover:text-dark_link border-b-2 border-transparent hover:border-dark_link transition-opacity"
            >
              Services
            </a>
            <a
              href="#screenshot"
              class="text-base cursor-pointer text-main_gray hover:text-dark_link border-b-2 border-transparent hover:border-dark_link transition-opacity"
            >
              Screenshots
            </a>
            <a
              href="#contact"
              class="text-base cursor-pointer text-main_gray hover:text-dark_link border-b-2 border-transparent hover:border-dark_link transition-opacity"
            >
              Contact Us
            </a>
            <a>
              {/* mobile login */}
              <div className="login_btn flex gap-x-4 lg:hidden">
                {/* <button onClick={openModal} className="cursor-pointer">
                            Login
                          </button> */}
                {/* <Link to="/Signup"> */}
                <button
                  onClick={openModal}
                  className="bg-dark_link py-2 px-5 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Login / Sign up
                </button>
                {/* </Link> */}
              </div>
            </a>
          </nav>

          {/*desktop login */}
          <div className="login_btn  gap-x-4 lg:flex hidden">
            {/* <button onClick={openModal} className="cursor-pointer">
              Login
            </button> */}
            {/* <Link to="/Signup"> */}
            <button
              onClick={openModal}
              className="bg-dark_link py-2 px-5 text-white font-semibold rounded-xl cursor-pointer"
            >
              Login / Sign up
            </button>
            {/* </Link> */}
          </div>
        </div>
      </header>

      <Select_Management isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Landing_header;
