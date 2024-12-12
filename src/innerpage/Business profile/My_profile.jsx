import React, { useState } from 'react'
import Header_Business from '../layout/Header_business'
import profileImage from '../layout/Footer_two'
import Side_links from '../Business profile/Side_links'
import { Link, useNavigate } from 'react-router-dom'
import Add_new_card from '../../modals/Add_new_card'
import { FacebookIcon, InstagramIcon, TikTokIocn, WebLink, YoutubeIcon } from '../../assets/image'
import Personal_editprofile from './Personal_editprofile';

import CircularProgress from "@mui/material/CircularProgress";
import Edit_BusinessPersonalInfo from './Edit_BusinessPersonalInfo'
import Footer_two from '../layout/Footer_two'


function My_profile() {


  const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
  return (
    <>
      <Header_Business/>

      <section className='pt-20 bg-dark_link grid content-center min-h-72'>
          <div className="container mx-auto py-5">
            <div className="grid-cols-2 grid">
              <div className="col-span-2">
                  <h3 className='text-center text-white text-2xl font-bold'>My Profile</h3>
                  {/* <p className='text-center text-white pt-3'>Lorem ipsum dolor sit amet consectetur. 
                    Tempus urna et gravida condimentum.</p> */}
              </div>
            </div>
          </div>
      </section>

 
 
      <section className='py-20 px-6'>
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-5 lg:col-span-2">
              <Side_links/>
            </div>
            <div className="col-span-5 lg:col-span-3">
              <div className="crd p-5 bg-white shadow-md border mb-5 rounded-xl">
                  <div className="w-full">
                    <Edit_BusinessPersonalInfo className="w-full"/>
                  </div>
              </div>
              <Link to ="/edit-social-links">
              <div className="crd p-5 shadow-md border my-5 rounded-xl bg-white">
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                     <h2 className='text-xl font-bold text-dark_link'>Social Links</h2>
                     <button className='bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.2603 3.60022L5.05034 12.2902C4.74034 12.6202 4.44034 13.2702 4.38034 13.7202L4.01034 16.9602C3.88034 18.1302 4.72034 18.9302 5.88034 18.7302L9.10034 18.1802C9.55034 18.1002 10.1803 17.7702 10.4903 17.4302L18.7003 8.74022C20.1203 7.24022 20.7603 5.53022 18.5503 3.44022C16.3503 1.37022 14.6803 2.10022 13.2603 3.60022Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.8896 5.0498C12.3196 7.8098 14.5596 9.9198 17.3396 10.1998" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 22H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Edit</button>
                  </div>
                    <div className='flex items-center gap-2'>
                  <div className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl w-15 h-15">
                      <img src={FacebookIcon} alt=''/>
                  </div>
                  <div className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl w-15 h-15">
                      <img src={InstagramIcon} alt=''/>
                  </div>
                  <div className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl w-15 h-15">
                      <img src={YoutubeIcon} alt=''/>
                  </div>
                  <div className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl w-15 h-15">
                      <img src={TikTokIocn} alt=''/>
                  </div>
                  <div className="flex justify-between items-center gap-2 p-3 bg-light_gray rounded-xl w-15 h-15">
                      <img src={WebLink} alt=''/>
                  </div>
                  </div>
              </div>
              </Link>

              <div className="crd p-5 shadow-md border my-5 rounded-xl bg-white">
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                     <h2 className='text-xl font-bold text-dark_link'>Bank Details</h2>
                     <Link to="/bank_details" className='bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.2603 3.60022L5.05034 12.2902C4.74034 12.6202 4.44034 13.2702 4.38034 13.7202L4.01034 16.9602C3.88034 18.1302 4.72034 18.9302 5.88034 18.7302L9.10034 18.1802C9.55034 18.1002 10.1803 17.7702 10.4903 17.4302L18.7003 8.74022C20.1203 7.24022 20.7603 5.53022 18.5503 3.44022C16.3503 1.37022 14.6803 2.10022 13.2603 3.60022Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.8896 5.0498C12.3196 7.8098 14.5596 9.9198 17.3396 10.1998" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 22H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Edit</Link>
                  </div>
                    <div className='flex items-center gap-2'>
                    <ul className="list-group border-0 w-full leading-9">
                        <li className="list-group-item flex justify-between items-center border-0 px-0 w-full">
                        Bank Name
                          <span className="font-semibold text-[#6C6C6C]">Abcd Bank</span>
                        </li>
                        <li className="list-group-item flex justify-between items-center border-0 px-0 w-full">
                        Account Holder Name
                          <span className="font-semibold text-[#6C6C6C]">Brooklyn Simmons</span>
                        </li>
                        <li className="list-group-item flex justify-between items-center border-0 px-0 w-full">
                        Account Number
                          <span className="font-semibold text-[#6C6C6C]">25  0031312  33</span>
                        </li>
                        <li className="list-group-item flex justify-between items-center border-0 px-0 w-full">
                        Routing Number
                          <span className="font-semibold text-[#6C6C6C]">765000456</span>
                        </li>
                      </ul>
                  </div>
              </div>


              <div className="crd p-5 shadow-md border mt-5 rounded-xl bg-white">
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                     <h2 className='text-xl font-bold text-dark_link'>Subscription Details</h2>
                     <Link to="/change-subscription-plan" className='bg-dark_link px-7 py-2 rounded-xl flex gap-2 text-white font-medium'>Change Plan</Link>
                  </div>
                    <div className='border-[#c8c8c8] border-[1px] rounded-lg p-3'>
                        <h6 className='text-sm'>Quarterly</h6>
                        <h3 className='text-2xl font-semibold py-2'>$141,99/3 month</h3>
                        <h6 className='text-sm'>then $141,99 per 3 month </h6>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer_two/>
      <Add_new_card isOpen={isOpen} closeModal={closeModal} />

    </>
  )
}

export default My_profile
