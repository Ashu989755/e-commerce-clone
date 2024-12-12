import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { avtar, Ch, Esp, Gb, In, logo } from "../../assets/image";
import Dropdown_lang from "./Header_assets/Dropdown_lang";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select_Management from "../../modals/Select_Management";
import B_Notification_box from "./Header_assets/B_Notification_box";
import GoogleTranslate from "../../helpers/GoogleTranslate";

function Header_Business() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.authSlice);
  const token = user?.token;
  console.log(user);

  const isBusiness = location.pathname.includes("business");
  const headerRef = useRef();
  // useEffect(() => {
  //   console.log(headerRef.current.classNameList);

  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 500) {
  //       // Change 100 to the pixel value you want
  //       headerRef.current.classNameList.add("scrolled");
  //     } else {
  //       headerRef.current.classNameList.remove("scrolled");
  //     }
  //   });
  // }, []);
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  const userNavigate = () => {
    navigate("/business/message");
  };

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
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-[999] shadow-md bg-white">
        <input type="text" className="hidden" />
        <div className="container mx-auto flex flex-wrap md:flex-row py-5 items-center justify-between">
          <div className="flex items-center md:w-auto w-full">
            {/* logo */}
            <Link to="/business-home" class="flex md:ms-0 ms-2">
              <img src={logo} alt="" className="w-32" />
            </Link>

            {/* mobile device */}
            <div className="login_btn flex items-center gap-x-0 ms-auto md:hidden">
              {/* <NavLink
                  to="/market-place"
                  className={({ isActive }) =>
                    `${isActive
                      ? "!border-main_blue text-dark_link"
                      : "text-main_gray"
                    } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
                  }
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2268 23.7882V31.7823H20.8171V23.7882H15.2268ZM29.0555 20.0469C27.6372 20.0469 26.3486 19.5764 25.3776 18.7997C24.4067 19.5764 23.1181 20.0469 21.6998 20.0469C20.2815 20.0469 18.9929 19.5764 18.0219 18.7997C17.051 19.5764 15.7624 20.0469 14.3441 20.0469C12.9258 20.0469 11.6372 19.5764 10.6662 18.7997C9.69529 19.5764 8.40667 20.0469 6.9884 20.0469C6.70015 20.0469 6.41741 20.0295 6.14111 19.9881V30.8999C6.14111 31.388 6.53556 31.7823 7.0238 31.7823H13.4614V23.7882C13.4614 22.8117 14.2558 22.0235 15.2268 22.0235H20.8171C21.7881 22.0235 22.5825 22.8117 22.5825 23.7882V31.7823H29.0201C29.5083 31.7823 29.9028 31.388 29.9028 30.8999V19.9821C29.6265 20.0295 29.3437 20.0469 29.0555 20.0469ZM3.31055 15.3001C3.31055 16.1237 3.72247 16.8709 4.38724 17.4118C5.05247 17.9472 5.97055 18.2822 6.9884 18.2822C9.01857 18.2822 10.6662 16.9527 10.6662 15.2997L3.31055 15.3001ZM10.6662 15.2997C10.6662 16.1232 11.0782 16.8709 11.7429 17.4118C12.4077 17.9472 13.3258 18.2822 14.3441 18.2822C16.3743 18.2822 18.0219 16.9527 18.0219 15.2997H10.6662ZM18.0219 15.2997C18.0219 16.1232 18.4339 16.8709 19.0986 17.4118C19.7634 17.9472 20.6815 18.2822 21.6998 18.2822C23.73 18.2822 25.3776 16.9527 25.3776 15.2997H18.0219ZM27.8138 5.48805C27.6666 5.19393 27.3605 5 27.0253 5H9.01857C8.68297 5 8.37724 5.19393 8.23013 5.48805L4.19323 13.5354H31.8507L27.8138 5.48805ZM25.3776 15.2997C25.3776 16.1232 25.7896 16.8709 26.4543 17.4118C27.1191 17.9472 28.0372 18.2822 29.0555 18.2822C31.0857 18.2822 32.7333 16.9527 32.7333 15.2997H25.3776Z"
                      fill="#999999"
                    />
                    <path
                      d="M15.2268 23.761V31.7551H20.8171V23.761H15.2268ZM3.31055 15.2729C3.31055 16.0965 3.72247 16.8437 4.38724 17.3846C5.05247 17.92 5.97055 18.255 6.9884 18.255C9.01857 18.255 10.6662 16.9255 10.6662 15.2725L3.31055 15.2729ZM10.6662 15.2725C10.6662 16.096 11.0782 16.8437 11.7429 17.3846C12.4077 17.92 13.3258 18.255 14.3441 18.255C16.3743 18.255 18.0219 16.9255 18.0219 15.2725H10.6662ZM18.0219 15.2725C18.0219 16.096 18.4339 16.8437 19.0986 17.3846C19.7634 17.92 20.6815 18.255 21.6998 18.255C23.73 18.255 25.3776 16.9255 25.3776 15.2725H18.0219ZM25.3776 15.2725C25.3776 16.096 25.7896 16.8437 26.4543 17.3846C27.1191 17.92 28.0372 18.255 29.0555 18.255C31.0857 18.255 32.7333 16.9255 32.7333 15.2725H25.3776Z"
                      fill="url(#paint0_linear_3274_16652)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3274_16652"
                        x1="11.7979"
                        y1="4.9729"
                        x2="11.0861"
                        y2="32.1872"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#040000" />
                        <stop offset="1" stopColor="#241919" />
                      </linearGradient>
                    </defs>
                  </svg>
                </NavLink> */}
              {/* <Dropdown_lang /> */}

              <B_Notification_box />
              <Link to="/business-my-profile">
                <div className="acc flex items-center gap-3">
                  <div className="img size-10 rounded-full overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        user?.image
                          ? user.image
                          : "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
                      }
                    />
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
                    onError=
                    {(e) => {
                      e.target.src =
                        "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw";
                    }}
                  </div>
                </div>
              </Link>
            </div>
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
          </div>
          {/* links */}

          <nav
            className={`md:ml-auto md:mr-auto flex md:flex-row flex-col flex-wrap gap-x-5 md:items-center items-start mobile-view text-base justify-center ${showNavBar ? "block" : "md:flex hidden"
              } `}
          >
            <NavLink
              to="/business-home"
              className={({ isActive }) =>
                `${isActive

                  ? "!border-main_blue text-dark_link"
                  : "text-main_gray"
                } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/business/favorites"
              className={({ isActive }) =>
                `${isActive
                  ? "!border-main_blue text-dark_link"
                  : "text-main_gray"
                } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              onClick={userNavigate}
              className={({ isActive }) =>
                `${isActive
                  ? " text-main_gray"
                  : "text-main_gray"
                } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
              }
            >
              Message
            </NavLink>

            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                `${isActive
                  ? "!border-main_blue text-dark_link"
                  : "text-main_gray"
                } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
              }
            >
              My Reviews
            </NavLink>

            <NavLink
              to="/business-my-calendar"
              className={({ isActive }) =>
                `${isActive
                  ? "!border-main_blue text-dark_link"
                  : "text-main_gray"
                } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
              }
            >
              My Calendar
            </NavLink>
          </nav>

          {/* profile logged in */}
          {token ? (
            <div className="login_btn items-center gap-x-4  md:flex hidden">
              <NavLink
                to="/market-place"
                className={({ isActive }) =>
                  `${isActive
                    ? "!border-main_blue text-dark_link"
                    : "text-main_gray"
                  } text-base cursor-pointer hover:text-dark_link border-b-2 border-transparent hover:border-main_blue transition-opacity`
                }
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2268 23.7882V31.7823H20.8171V23.7882H15.2268ZM29.0555 20.0469C27.6372 20.0469 26.3486 19.5764 25.3776 18.7997C24.4067 19.5764 23.1181 20.0469 21.6998 20.0469C20.2815 20.0469 18.9929 19.5764 18.0219 18.7997C17.051 19.5764 15.7624 20.0469 14.3441 20.0469C12.9258 20.0469 11.6372 19.5764 10.6662 18.7997C9.69529 19.5764 8.40667 20.0469 6.9884 20.0469C6.70015 20.0469 6.41741 20.0295 6.14111 19.9881V30.8999C6.14111 31.388 6.53556 31.7823 7.0238 31.7823H13.4614V23.7882C13.4614 22.8117 14.2558 22.0235 15.2268 22.0235H20.8171C21.7881 22.0235 22.5825 22.8117 22.5825 23.7882V31.7823H29.0201C29.5083 31.7823 29.9028 31.388 29.9028 30.8999V19.9821C29.6265 20.0295 29.3437 20.0469 29.0555 20.0469ZM3.31055 15.3001C3.31055 16.1237 3.72247 16.8709 4.38724 17.4118C5.05247 17.9472 5.97055 18.2822 6.9884 18.2822C9.01857 18.2822 10.6662 16.9527 10.6662 15.2997L3.31055 15.3001ZM10.6662 15.2997C10.6662 16.1232 11.0782 16.8709 11.7429 17.4118C12.4077 17.9472 13.3258 18.2822 14.3441 18.2822C16.3743 18.2822 18.0219 16.9527 18.0219 15.2997H10.6662ZM18.0219 15.2997C18.0219 16.1232 18.4339 16.8709 19.0986 17.4118C19.7634 17.9472 20.6815 18.2822 21.6998 18.2822C23.73 18.2822 25.3776 16.9527 25.3776 15.2997H18.0219ZM27.8138 5.48805C27.6666 5.19393 27.3605 5 27.0253 5H9.01857C8.68297 5 8.37724 5.19393 8.23013 5.48805L4.19323 13.5354H31.8507L27.8138 5.48805ZM25.3776 15.2997C25.3776 16.1232 25.7896 16.8709 26.4543 17.4118C27.1191 17.9472 28.0372 18.2822 29.0555 18.2822C31.0857 18.2822 32.7333 16.9527 32.7333 15.2997H25.3776Z"
                    fill="#999999"
                  />
                  <path
                    d="M15.2268 23.761V31.7551H20.8171V23.761H15.2268ZM3.31055 15.2729C3.31055 16.0965 3.72247 16.8437 4.38724 17.3846C5.05247 17.92 5.97055 18.255 6.9884 18.255C9.01857 18.255 10.6662 16.9255 10.6662 15.2725L3.31055 15.2729ZM10.6662 15.2725C10.6662 16.096 11.0782 16.8437 11.7429 17.3846C12.4077 17.92 13.3258 18.255 14.3441 18.255C16.3743 18.255 18.0219 16.9255 18.0219 15.2725H10.6662ZM18.0219 15.2725C18.0219 16.096 18.4339 16.8437 19.0986 17.3846C19.7634 17.92 20.6815 18.255 21.6998 18.255C23.73 18.255 25.3776 16.9255 25.3776 15.2725H18.0219ZM25.3776 15.2725C25.3776 16.096 25.7896 16.8437 26.4543 17.3846C27.1191 17.92 28.0372 18.255 29.0555 18.255C31.0857 18.255 32.7333 16.9255 32.7333 15.2725H25.3776Z"
                    fill="url(#paint0_linear_3274_16652)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3274_16652"
                      x1="11.7979"
                      y1="4.9729"
                      x2="11.0861"
                      y2="32.1872"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#040000" />
                      <stop offset="1" stopColor="#241919" />
                    </linearGradient>
                  </defs>
                </svg>
              </NavLink>
              {/* <Dropdown_lang /> */}
              <GoogleTranslate />
              {/* <div id="google_translate_element"></div> */}

              <B_Notification_box />
              <Link to="/business-my-profile">
                <div className="acc flex items-center gap-3">
                  <div className="img size-14 rounded-full overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        user?.image
                          ? user.image
                          : "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw";
                      }}
                    />
                  </div>
                  <div className="desc">
                    <h5 className="text-sm">Welcome</h5>
                    <h2 className="text-base font-bold">{user?.fullName}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="login_btn flex gap-x-4">
              <button
                onClick={openModal}
                className="bg-dark_link py-2 px-5 text-white font-semibold rounded-xl cursor-pointer"
              >
                Login / Sign up
              </button>
            </div>
          )}
        </div>
      </header>
      <Select_Management isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Header_Business;