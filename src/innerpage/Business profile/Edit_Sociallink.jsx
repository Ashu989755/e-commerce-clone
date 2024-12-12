import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { linksValidation } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import Side_links from "./Side_links";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { customerProfile } from "../../apis/customer/profile";

const Edit_Sociallink = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(linksValidation),
  });

  const { user } = useSelector((state) => state?.authSlice);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [profileSocialLinks, setProfileSocialLinks] = useState("");
  console.log(profileSocialLinks)

  useEffect(() => {
    if (user) {
      setValue("facebookUrl", user.facebook || "");
      setValue("instaUrl", user.instagram || "");
      setValue("youtubeUrl", user.youtube || "");
      setValue("tiktokUrl", user.tiktok || "");
      setValue("websiteUrl", user.website || "");
    }
  }, [user, setValue]);

  const handleUserProfile = async () => {
    try {
      const res = await customerProfile();
      setProfileSocialLinks(res?.data?.data);
      const userData = res.data.data;
      console.log(userData, "====================");
      dispatch(
        updateUser({
          user: { ...userData },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleLinkAccounts = async (data) => {
    setLoading(true);
    try {
      const apiData = {
        facebook: data.facebookUrl,
        instagram: data.instaUrl,
        youtube: data.youtubeUrl,
        titktok: data.tiktokUrl,
        website: data.websiteUrl,
      };
      const res = await businessLinkAccounts(apiData);
      if (res?.data?.success == true) {
      handleUserProfile()
      toast.success(res?.data?.message);
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Business />
      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                My Profile
              </h3>
              <p className="text-center text-white pt-3">
                Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida
                condimentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="lg:col-span-2 col-span-5">
              <Side_links></Side_links>
            </div>
            <div className="lg:col-span-3 col-span-5">
              <div className="my_pro shadow-sm rounded-xl mb-5 bg-white relative">
                <div className="ad_crd ">
                  <div className="grid content-center h-full">
                    <div className="item shadow-md rounded-2xl lg:p-10 p-6 ">
                      <div className="desc mb-5">
                        <h3 className="text-xl font-bold text-left text-dark_link">
                          Edit Social Links
                        </h3>
                      </div>
                      <hr className="mb-4" />
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

                        <div className="inp col-span-2 text-center mt-3">
                        <button
                          onClick={handleSubmit(handleLinkAccounts)}
                          className="w-full bg-dark_link py-4 px-6 text-white font-medium rounded-lg"
                        >
                          {" "}
                          {loading ? (
                            <Box display="flex" justifyContent="center">
                              <CircularProgress size={24} color="inherit" />
                            </Box>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
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

export default Edit_Sociallink;
