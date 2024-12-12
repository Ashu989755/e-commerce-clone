import React from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { Link } from "react-router-dom";
import { customerContactUs } from "../../apis/customer/authentication";
import { contactUsValidator } from "../../helpers/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";

function Contact() {
    const {user} = useSelector((state)=>state.authSlice)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsValidator),
  });

  const handleContactUs = async (data) => {
    try {
      const apiData = {
        Message: data.message,
        Subject: data.subject,
        Email: data.email,
        token: user.token
        
      };
      const res = await customerContactUs(apiData);
      console.log(res, "===");
      toast.success(res?.data?.message)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header_two></Header_two>
      <section className="py-24 bg-notification relative before:content before:absolute before:bg-dark_link 
      before:bg-opacity-80 before:left-0 before:right-0 before:top-0 before:bottom-0">
        <div className="container mx-auto z-50 relative py-10">
          <h3 className="text-center text-3xl font-bold pb-2 pt-4 text-white">
            Contact Us
          </h3>
          <p className="text-center text-white">
            Submit questions or feedback by entering the following details.
          </p>
        </div>
      </section>

      <section className="min-h-screen pb-20 bg-[#F7F7F7]">
        <div className="container mx-auto -mt-[120px] mb-12 bg-white shadow-md w-3/4 rounded-xl px-6 py-8 relative">
          <div className="imp w-full mb-5">
            <input className="bg-[#F7F7F7] px-5 py-4 w-full rounded-xl drop-shadow-sm outline-0 border border-transparent focus:border-dark_link  text-sm"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <p className="text-red-600 mt-1  ml-2 text-sm mb-1 ">
            {errors.email?.message}
          </p>

          <div className="imp w-full mb-4">
            <input
              className="bg-[#F7F7F7] px-5 py-4 w-full rounded-xl drop-shadow-sm outline-0 border border-transparent focus:border-dark_link  text-sm"
              type="text"
              placeholder="Subject"
              {...register("subject")}
            />
          </div>
          <p className="text-red-600 text-sm ml-2 mb-1">
            {errors.subject?.message}
          </p>

          <div className="imp w-full mb-3">
            <textarea
              className="bg-[#F7F7F7] px-5 py-4 w-full rounded-xl drop-shadow-sm outline-0 border border-transparent focus:border-dark_link  text-smmin-h-40"
              placeholder="Message"
              {...register("message")}
            ></textarea>
          </div>
          <p className="text-red-600  text-sm mb-1 ">
            {errors.message?.message}
          </p>

          <div className="mb-5 text-sm font-medium text-dark_link">
            <p>
              By submitting this form you agree to our{" "}
              <Link className="text-link_color">terms and conditions</Link> and
              our <Link className="text-link_color">privacy policy</Link> which
              explains how we may collect, use and disclose your personal
              information including to third parties.
            </p>
          </div>

          <div className="mb-5">
            <button onClick={handleSubmit(handleContactUs)} className="px-20 bg-dark_link py-4 text-white rounded-xl">
              Send
            </button>
          </div>
        </div>

        <div className="itm_blk container mx-auto w-5/6 grid grid-cols-3 pb-5 gap-5">
          <div className="rounded-xl flex items-center flex-wrap  gap-3 shadow-lg py-3 px-3 border bg-white col-span-3 md:col-span-1">
            <div className="icn bg-[#F2F4FF] size-20 rounded-md flex justify-center items-center drop-shadow-sm">
              <span>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 29 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5187 22.9876L19.5209 22.9856L20.6161 22.0272C20.6166 22.0268 20.617 22.0263 20.6175 22.0259C21.3496 21.3936 22.028 21.2955 22.7258 21.4758C23.4885 21.6727 24.3185 22.217 25.2297 22.9962C25.2301 22.9965 25.2305 22.9969 25.2309 22.9972L26.3494 23.9596L26.3506 23.9606C27.2765 24.7538 27.8871 25.448 28.1034 26.0503C28.2023 26.3259 28.2104 26.5606 28.143 26.7825C28.0731 27.0128 27.9002 27.2993 27.5174 27.6321L27.5165 27.6328L26.5214 28.5004L26.4975 28.5212L26.4754 28.544C25.8496 29.1904 23.8049 31.0129 20.4051 31.0495H20.405C16.3027 31.0941 11.8179 28.5298 7.09498 23.0895L7.09457 23.089C2.36521 17.6506 0.44859 12.8559 1.06133 8.80286L1.06138 8.80253C1.56909 5.43414 3.65848 3.66976 4.38922 3.13742L4.41608 3.11786L4.4411 3.09599L5.43059 2.23139C5.43092 2.2311 5.43126 2.23081 5.43159 2.23052C5.81521 1.89795 6.12365 1.76654 6.36215 1.72925C6.5922 1.69328 6.82411 1.73409 7.08372 1.87043C7.65088 2.16828 8.25351 2.86828 8.91224 3.892C8.91258 3.89253 8.91292 3.89306 8.91326 3.89359L9.70788 5.14195L9.70856 5.14301C10.3544 6.15386 10.7781 7.05211 10.8669 7.83438C10.9482 8.55031 10.7563 9.20702 10.0284 9.84109L10.0283 9.84118L8.92606 10.8018C8.87612 10.8444 8.80223 10.894 8.66226 10.988C8.64159 11.0018 8.61947 11.0167 8.59578 11.0326C8.43174 11.143 8.2227 11.2867 8.0142 11.4666C7.58946 11.8332 7.14264 12.3708 6.98028 13.1723C6.81998 13.9637 6.95924 14.9025 7.47886 16.0356C7.99736 17.1662 8.91508 18.5365 10.3849 20.2255C11.8547 21.9163 13.0849 23.016 14.1327 23.687C15.1828 24.3595 16.0931 24.6283 16.899 24.5801C17.7153 24.5313 18.3097 24.164 18.7319 23.7952C18.9391 23.6142 19.1107 23.4276 19.2429 23.2813C19.2586 23.2639 19.2735 23.2474 19.2875 23.2318C19.407 23.0993 19.4684 23.0312 19.5187 22.9876Z"
                    stroke="#5966D7"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
            </div>
            <div className="desc">
              <h3 className="font-medium">+1 (555) 789-1234</h3>
            </div>
          </div>

          <div className="rounded-xl flex items-center gap-3 shadow-lg py-3 px-3 border bg-white col-span-3 md:col-span-1">
            <div className="icn bg-[#FFF1FF] size-20 rounded-md flex justify-center items-center drop-shadow-sm">
              <span>
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.1323 4.53503C23.337 1.73963 19.6204 0.200195 15.6672 0.200195C11.714 0.200195 7.99732 1.73963 5.20203 4.53498C2.40662 7.33033 0.867188 11.047 0.867188 15.0002C0.867188 18.9534 2.40662 22.67 5.20203 25.4654C7.99732 28.2607 11.714 29.8001 15.6672 29.8001C19.6205 29.8001 23.337 28.2607 26.1324 25.4653C28.9277 22.67 30.4672 18.9534 30.4672 15.0001C30.4672 11.0469 28.9277 7.33033 26.1323 4.53503ZM6.42968 5.76268C7.73109 4.46127 9.2589 3.46863 10.9241 2.82072C10.4806 3.37445 10.0656 4.01091 9.68521 4.72674C9.24347 5.55808 8.86231 6.47112 8.54486 7.44636C7.44515 7.26384 6.42621 7.03941 5.51589 6.77602C5.80298 6.42285 6.10797 6.08463 6.42968 5.76268ZM4.4648 8.26995C5.52953 8.61087 6.74718 8.89837 8.07583 9.1261C7.70583 10.6966 7.48805 12.3867 7.43608 14.1321H2.63255C2.76899 12.0374 3.3981 10.0383 4.4648 8.26995ZM4.37028 21.5699C3.36116 19.8414 2.76488 17.8999 2.63249 15.8683H7.43937C7.49614 17.5638 7.70959 19.2058 8.0671 20.7353C6.71116 20.9551 5.46293 21.2353 4.37028 21.5699ZM6.42968 24.2377C6.06378 23.8716 5.71957 23.4845 5.39882 23.0783C6.34249 22.8166 7.39746 22.595 8.53307 22.4173C8.85277 23.4061 9.23803 24.3312 9.68515 25.1728C10.0997 25.9528 10.5554 26.6383 11.0443 27.2254C9.3325 26.5789 7.76237 25.5703 6.42968 24.2377ZM14.7991 27.8412C13.4805 27.4719 12.2331 26.2677 11.2184 24.3581C10.8635 23.6902 10.5518 22.9616 10.2847 22.1851C11.7144 22.0277 13.2358 21.9347 14.7991 21.9128V27.8412ZM14.7991 20.1766C13.0654 20.2002 11.3756 20.3091 9.79309 20.4949C9.44402 19.0519 9.23399 17.4899 9.17635 15.8683H14.7991V20.1766H14.7991ZM14.7991 14.1321H9.17305C9.22572 12.4651 9.4391 10.8596 9.79904 9.37984C11.3714 9.5764 13.0577 9.69596 14.7991 9.73018V14.1321ZM14.7991 7.99378C13.2297 7.96216 11.7117 7.85983 10.2921 7.69287C10.5575 6.92443 10.8668 6.20316 11.2184 5.54138C12.2331 3.63171 13.4805 2.4276 14.7991 2.05823V7.99378ZM26.9243 8.36216C27.9576 10.1077 28.5677 12.0737 28.7019 14.1321H23.8984C23.847 12.4067 23.6334 10.7357 23.2712 9.18062C24.6085 8.96463 25.8413 8.68985 26.9243 8.36216ZM24.9046 5.76268C25.2504 6.10884 25.5769 6.4738 25.8825 6.85592C24.9533 7.10966 23.9185 7.32501 22.8066 7.49833C22.4859 6.50349 22.0988 5.57288 21.6492 4.72674C21.2689 4.01091 20.8538 3.37445 20.4103 2.82072C22.0754 3.46863 23.6033 4.46127 24.9046 5.76268ZM16.5353 15.8683H22.1581C22.1 17.5026 21.8872 19.0763 21.5331 20.5287C19.961 20.3332 18.2755 20.2148 16.5353 20.1815V15.8683ZM16.5353 14.1321V9.73596C18.27 9.71318 19.9611 9.60525 21.5451 9.42008C21.8992 10.8887 22.1091 12.4802 22.1613 14.1321H16.5353ZM16.5352 2.05823H16.5352C17.8538 2.4276 19.1012 3.63171 20.1159 5.54138C20.4731 6.21356 20.7866 6.94726 21.0548 7.72946C19.6232 7.88625 18.1001 7.97858 16.5352 7.99968V2.05823ZM16.5353 27.8412V21.9179C18.1032 21.9486 19.62 22.05 21.0391 22.2159C20.7743 22.9809 20.4661 23.6991 20.116 24.3581C19.1012 26.2677 17.8539 27.4719 16.5353 27.8412ZM24.9046 24.2377C23.572 25.5703 22.0019 26.5789 20.29 27.2253C20.7789 26.6382 21.2346 25.9528 21.6492 25.1728C22.0897 24.3437 22.47 23.4333 22.7869 22.461C23.9122 22.6468 24.9533 22.8765 25.8807 23.1466C25.5756 23.5279 25.2498 23.8922 24.9046 24.2377ZM26.9178 21.6492C25.8405 21.3028 24.6053 21.0114 23.2568 20.7814C23.6208 19.239 23.8377 17.5809 23.8951 15.8683H28.702C28.5674 17.9309 27.9552 19.9009 26.9178 21.6492Z"
                    fill="#C567C7"
                  />
                </svg>
              </span>
            </div>
            <div className="desc">
              <h3 className="font-medium">www.ourreview.com</h3>
            </div>
          </div>

          <div className="rounded-xl flex items-center gap-3 shadow-lg py-3 px-3 border bg-white col-span-3 md:col-span-1">
            <div className="icn bg-[#FFFCEB] size-20 rounded-md flex justify-center items-center drop-shadow-sm">
              <span>
                <svg
                  width="31"
                  height="22"
                  viewBox="0 0 31 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.7316 0.899902H3.15404C1.71188 0.899902 0.533203 2.0734 0.533203 3.52074V19.2457C0.533203 20.6936 1.71264 21.8666 3.15404 21.8666H27.7316C29.1738 21.8666 30.3525 20.6931 30.3525 19.2457V3.52074C30.3525 2.07305 29.1732 0.899902 27.7316 0.899902ZM27.3292 2.64712L16.1198 13.8931C15.7783 14.2356 15.1075 14.2359 14.7658 13.8931L3.55648 2.64712H27.3292ZM2.28043 18.9245V3.84193L9.79727 11.3832L2.28043 18.9245ZM3.55648 20.1193L11.0307 12.6207L13.5284 15.1265C14.5519 16.1534 16.3341 16.153 17.3573 15.1265L19.855 12.6208L27.3292 20.1193H3.55648ZM28.6052 18.9245L21.0884 11.3832L28.6052 3.84193V18.9245Z"
                    fill="#EFBE60"
                  />
                </svg>
              </span>
            </div>
            <div className="desc">
              <h3 className="font-medium">contact@ourreview.com</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer_two></Footer_two>
    </>
  );
}

export default Contact;
