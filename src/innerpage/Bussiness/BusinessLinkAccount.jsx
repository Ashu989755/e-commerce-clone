import React from "react";
import Footer_two from "../layout/Footer_two";
import Header_Business from "../layout/Header_business";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIocn,
  WebLink,
  YoutubeIcon,
} from "../../assets/image";
import { Link } from "react-router-dom";
import { businessLinkAccounts } from "../../apis/business/Profile";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { linksValidation } from "../../helpers/validation"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import{ updateUser } from '../../redux/reducers/authSlice';
import Header_Track from "./Header_Track";
import { useLocation } from "react-router-dom";


const BusinessLinkAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(linksValidation),
  });
 const navigate = useNavigate();
const dispatch = useDispatch()


  const handleLinkAccounts = async(data) => {
    try {
      const apiData = {
        facebook: data.facebookUrl,
        instagram: data.instaUrl,
        youtube: data.youtubeUrl,   
        titktok: data.tiktokUrl,
        website: data.websiteUrl
      }
     const res = await businessLinkAccounts(apiData)
     if(res?.data?.status_code == 201){
      const userData = res.data.data;
      console.log(userData,"userDataaaaaaa")
      dispatch(
        updateUser({
        user: { ...userData},
        })
      );
      navigate("/business-add-address")
     }
    } catch (error) {
      console.log(error) 
    }
  }
  
  return (
    <>
      <Header_Business/>
      <section className="py-32">
      
      < Header_Track />
        <div className="ad_crd py-6">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="desc mb-3">
                <h3 className="text-xl font-bold text-center text-dark_link">
                    Link Account
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                <div className="inp mb-4 col-span-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-lg text-gray "
                  >
                    Facebook URL
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <img src={FacebookIcon} alt="" />
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm"
                      placeholder="Enter Faaccebook Link"
                      type="text"
                      name="facebookUrl"
                      id=""
                      {...register("facebookUrl")}
                    />
                  </div>
                </div>

                <div className="inp mb-4 col-span-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-lg text-gray "
                  >
                    Instagram URL
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <img src={InstagramIcon} alt="" />
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm"
                      placeholder="Enter Instagram Link"
                      type="text"
                      name="instaUrl"
                      id=""
                      {...register("instaUrl")}
                    />
                  </div>
                </div>

                <div className="inp mb-4 col-span-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-lg text-gray "
                  >
                    YouTube URL
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <img src={YoutubeIcon} alt="" />
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm"
                      placeholder="Enter Youtube Link"
                      type="text"
                      name="youtubeUrl"
                      id=""
                      {...register("youtubeUrl")}
                    />
                  </div>
                </div>

                <div className="inp mb-4 col-span-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-lg text-gray "
                  >
                    TikTok URL
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <img src={TikTokIocn} alt="" />
                    </span>
                    <input
                    
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm"
                      placeholder="Enter TikTok Link"
                      type="text"
                      name="tiktokUrl"
                      id=""
                      {...register("tiktokUrl")}
                    />
                  </div>
                </div>

                <div className="inp mb-4 col-span-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-lg text-gray "
                  >
                    Website URL
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <img src={WebLink} alt="" />
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark text-sm"
                      placeholder="Enter Website Link"
                      type="text"
                      name="websiteUrl"
                      id=""
                      {...register("websiteUrl")}
                    />
                  </div>
                </div>

                <div className="inp col-span-2 text-center">
                  <button onClick={handleSubmit(handleLinkAccounts)} className="w-full bg-dark_link py-4 px-6 text-white font-medium rounded-lg"> Next </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two></Footer_two>
    </>
  );
};

export default BusinessLinkAccount;
