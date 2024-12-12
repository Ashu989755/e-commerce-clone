import React from 'react'
import { logo, logoWhite } from '../assets/image'
import { Link } from 'react-router-dom'

function Landing_footer() {
  return (
    <>
        <footer className='bg-dark_link md:pt-20 pt-10 pb-7 ps-2 md:ps-0'>
            <div className="container mx-auto">
                <div className="grid grid-cols-6 gap-x-5 gap-y-12">
                    <div className="md:col-span-2 col-span-6">
                        <div className="log_blk w-4/5 mx-0 md:mx-auto">
                            <div className="img">
                            <a href=""><img src={logoWhite} alt="" /></a>
                            <p className='text-white my-5'>With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
                            </div>
                            <div className="socil flex mt-5 gap-3">
                                <Link className="itm size-10 inline-flex justify-center items-center rounded-full bg-white border-2 border-border_clr">
                                    <span><svg width="23" height="23" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.39795 21.519H13.398V13.509H17.002L17.398 9.52904H13.398V7.51904C13.398 7.25383 13.5033 6.99947 13.6908 6.81194C13.8784 6.6244 14.1327 6.51904 14.398 6.51904H17.398V2.51904H14.398C13.0719 2.51904 11.8001 3.04583 10.8624 3.98351C9.92474 4.92119 9.39795 6.19296 9.39795 7.51904V9.52904H7.39795L7.00195 13.509H9.39795V21.519Z" fill="#303030"/>
                                        </svg>
                                    </span>
                                </Link>
                                <Link className="itm size-10 inline-flex justify-center items-center rounded-full bg-white border-2 border-border_clr">
                                    <span><div className="itm size-10 inline-flex justify-center items-center rounded-full bg-white">
                                    <span><svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.0281 2C14.1531 2.003 14.7241 2.009 15.2171 2.023L15.4111 2.03C15.6351 2.038 15.8561 2.048 16.1231 2.06C17.1871 2.11 17.9131 2.278 18.5501 2.525C19.2101 2.779 19.7661 3.123 20.3221 3.678C20.8308 4.17773 21.2243 4.78247 21.4751 5.45C21.7221 6.087 21.8901 6.813 21.9401 7.878C21.9521 8.144 21.9621 8.365 21.9701 8.59L21.9761 8.784C21.9911 9.276 21.9971 9.847 21.9991 10.972L22.0001 11.718V13.028C22.0025 13.7574 21.9948 14.4868 21.9771 15.216L21.9711 15.41C21.9631 15.635 21.9531 15.856 21.9411 16.122C21.8911 17.187 21.7211 17.912 21.4751 18.55C21.2243 19.2175 20.8308 19.8223 20.3221 20.322C19.8223 20.8307 19.2176 21.2242 18.5501 21.475C17.9131 21.722 17.1871 21.89 16.1231 21.94L15.4111 21.97L15.2171 21.976C14.7241 21.99 14.1531 21.997 13.0281 21.999L12.2821 22H10.9731C10.2433 22.0026 9.5136 21.9949 8.78408 21.977L8.59008 21.971C8.35269 21.962 8.11535 21.9517 7.87808 21.94C6.81408 21.89 6.08808 21.722 5.45008 21.475C4.78291 21.2241 4.17852 20.8306 3.67908 20.322C3.17003 19.8224 2.77619 19.2176 2.52508 18.55C2.27808 17.913 2.11008 17.187 2.06008 16.122L2.03008 15.41L2.02508 15.216C2.00665 14.4868 1.99831 13.7574 2.00008 13.028V10.972C1.99731 10.2426 2.00465 9.5132 2.02208 8.784L2.02908 8.59C2.03708 8.365 2.04708 8.144 2.05908 7.878C2.10908 6.813 2.27708 6.088 2.52408 5.45C2.77577 4.7822 3.1703 4.17744 3.68008 3.678C4.17923 3.16955 4.78327 2.77607 5.45008 2.525C6.08808 2.278 6.81308 2.11 7.87808 2.06C8.14408 2.048 8.36608 2.038 8.59008 2.03L8.78408 2.024C9.51327 2.00623 10.2427 1.99857 10.9721 2.001L13.0281 2ZM12.0001 7C10.674 7 9.40223 7.52678 8.46455 8.46447C7.52687 9.40215 7.00008 10.6739 7.00008 12C7.00008 13.3261 7.52687 14.5979 8.46455 15.5355C9.40223 16.4732 10.674 17 12.0001 17C13.3262 17 14.5979 16.4732 15.5356 15.5355C16.4733 14.5979 17.0001 13.3261 17.0001 12C17.0001 10.6739 16.4733 9.40215 15.5356 8.46447C14.5979 7.52678 13.3262 7 12.0001 7ZM12.0001 9C12.394 8.99993 12.7842 9.07747 13.1482 9.22817C13.5122 9.37887 13.8429 9.5998 14.1215 9.87833C14.4002 10.1569 14.6212 10.4875 14.772 10.8515C14.9229 11.2154 15.0005 11.6055 15.0006 11.9995C15.0006 12.3935 14.9231 12.7836 14.7724 13.1476C14.6217 13.5116 14.4008 13.8423 14.1223 14.121C13.8437 14.3996 13.513 14.6206 13.1491 14.7714C12.7851 14.9223 12.395 14.9999 12.0011 15C11.2054 15 10.4424 14.6839 9.87976 14.1213C9.31715 13.5587 9.00108 12.7956 9.00108 12C9.00108 11.2044 9.31715 10.4413 9.87976 9.87868C10.4424 9.31607 11.2054 9 12.0011 9M17.2511 5.5C16.9196 5.5 16.6016 5.6317 16.3672 5.86612C16.1328 6.10054 16.0011 6.41848 16.0011 6.75C16.0011 7.08152 16.1328 7.39946 16.3672 7.63388C16.6016 7.8683 16.9196 8 17.2511 8C17.5826 8 17.9005 7.8683 18.135 7.63388C18.3694 7.39946 18.5011 7.08152 18.5011 6.75C18.5011 6.41848 18.3694 6.10054 18.135 5.86612C17.9005 5.6317 17.5826 5.5 17.2511 5.5Z" fill="#303030"/>
                                            </svg>
                                    </span>
                                </div>
                                    </span>
                                </Link>
                                <Link className="itm size-10 inline-flex justify-center items-center rounded-full bg-white border-2 border-border_clr">
                                    <span><svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.15283H22.581L14.541 10.3428L24 22.8458H16.594L10.794 15.2618L4.156 22.8458H0.474L9.074 13.0158L0 1.15383H7.594L12.837 8.08583L18.901 1.15283ZM17.61 20.6438H19.649L6.486 3.23983H4.298L17.61 20.6438Z" fill="#303030"/>
                                        </svg>
                                    </span>
                                </Link>
                                <Link className="itm size-10 inline-flex justify-center items-center rounded-full bg-white border-2 border-border_clr">
                                    <span><svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="1.19971" y="1.01904" width="38" height="38" rx="19" fill="white"/>
                                            <rect x="1.19971" y="1.01904" width="38" height="38" rx="19" stroke="#DDE7FF" stroke-width="2"/>
                                            <path d="M15.2564 28.9862H11.5322V17.0072H15.2564V28.9862ZM13.3959 15.3695C12.969 15.3695 12.5516 15.2429 12.1967 15.0057C11.8417 14.7685 11.565 14.4313 11.4016 14.0369C11.2382 13.6425 11.1955 13.2085 11.2788 12.7897C11.3621 12.371 11.5677 11.9864 11.8695 11.6845C12.1714 11.3826 12.5561 11.177 12.9748 11.0937C13.3935 11.0104 13.8275 11.0532 14.222 11.2166C14.6164 11.3799 14.9535 11.6566 15.1907 12.0116C15.4279 12.3666 15.5545 12.7839 15.5545 13.2109C15.5514 14.4031 14.585 15.3695 13.3959 15.3695ZM29.1995 28.9862H25.4784V23.1599C25.4784 21.77 25.4533 19.9847 23.5426 19.9847C21.6068 19.9847 21.3087 21.497 21.3087 23.0595V28.9862H17.5908V17.0072H21.1612V18.645H21.2114C21.7072 17.7038 22.9214 16.7092 24.7348 16.7092C28.5061 16.7092 29.1995 19.1909 29.1995 22.4163V28.9862Z" fill="#303030"/>
                                            </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        <h3 className='text-white text-lg font-medium '>Company</h3>
                        <ul>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">About us</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Contact us</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Careers</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Press</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        <h3 className='text-white text-lg font-medium '>Product</h3>
                        <ul>
                            <li className='text-main_gray my-3  hover:text-white cursor-pointer'><a href="">Features</a></li>
                            <li className='text-main_gray my-3  hover:text-white cursor-pointer'><a href="">Pricing</a></li>
                            <li className='text-main_gray my-3  hover:text-white cursor-pointer'><a href="">Help desk
                            </a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Support</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        <h3 className='text-white text-lg font-medium '>Services</h3>
                        <ul>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Digital Marketing</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Content Writing</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">SEO for Business</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">UI Design</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        <h3 className='text-white text-lg font-medium '>Legal</h3>
                        <ul>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Privacy Policy</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Terms & Conditions</a></li>
                            <li className='text-main_gray my-3 hover:text-white cursor-pointer'><a href="">Return Policy</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-6 col-span-6">
                        <hr className='border-b border-0 border-[#E7E9ED] ' />
                        <p className='pt-6 text-white text-center'>© 2024 Copyright, All Right Reserved, Our Review</p>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
export default Landing_footer
