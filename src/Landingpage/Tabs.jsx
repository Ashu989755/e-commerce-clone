import React, { useState } from 'react'
import { app_store, google_play } from '../assets/image'

function Tabs() {

  const [activeTab, setActiveTab] = useState("business");

  function handleTabSwitch(tab){
    setActiveTab(tab);
  }

  return (
    <>
      <div className="tabs_btn flex gap-5 justify-center md:justify-start">
        <button onClick={()=>handleTabSwitch("business")} className={`${activeTab === "business" ? "bg-white text-black" : "bg-[#595959] text-white"} rounded-full  py-2 px-2 md:px-4`}>Business Interface</button>
        <button onClick={()=>handleTabSwitch("customer")} className={`${activeTab === "customer" ? " bg-white text-black" : "bg-[#595959] text-white"} rounded-full py-2 px-2 md:px-4`}>Customer Interface</button>
      </div>

      <div className="tab_cont p-3 ">
        {activeTab === "business" && <div className="bussiness md:w-4/5 w-full">
                <h2 className='md:text-3xl text-xl font-bold text-white'>Download the app</h2>
                <p className='text-white leading-normal mt-3'>Download our app to effortlessly book top-notch services and manage your appointments with ease. Enjoy a user-friendly experience and connect with trusted professionals quickly.</p>
                <div className="ply_icons flex py-5 gap-5">
                    <a href=""><img src={app_store} alt="" /></a>
                    <a href=""><img src={google_play} alt="" /></a>
                </div>
        </div>}
        {activeTab === "customer" && <div className="Customer md:w-4/5 w-full">
                <h2 className='md:text-3xl text-xl font-bold text-white'>Download the app</h2>
                <p className='text-white leading-normal mt-3'>Get our app to efficiently manage your bookings & showcase your services. Streamline your client interactions & enhance your business visibility with our intuitive platform.</p>
                <div className="ply_icons flex py-5 gap-5">
                    <a href=""><img src={app_store} alt="" /></a>
                    <a href=""><img src={google_play} alt="" /></a>
                </div>
        </div>}
      </div>
    </>
  )
}

export default Tabs
