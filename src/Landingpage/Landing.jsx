import React,{useState} from 'react'
import Landing_header from './Landing_header'
import Landing_footer from './Landing_footer'
import { Downlaod_app, hand, Online_Rvw, trust_img } from '../assets/image'
import Tabs from './Tabs'
import FAQ from './FAQ'
import Screenshot_slider from './Screenshot_slider'
import Testmonial from './Testmonial'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { customerLogin } from "../apis/customer/authentication";
import { contactUsValidator } from '../helpers/validation';
import { customerContactUs } from '../apis/customer/authentication'
import { useSelector } from 'react-redux'
// import FAQ from './FAQ'
import { toast } from 'react-toastify'
import Select_Management from '../modals/Select_Management'


function Landing() {
const state = useSelector((state)=>state.authSlice) || null;
const user = state?.user || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsValidator),
  });




  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

const handleContactUs = async(data) => {
  try {
    const apiData = {
      Message: data.message,
      Subject: data.subject,
      Email: data.email,
      token: user.token
    }
    const res = await customerContactUs(apiData)
    toast.success(res?.data?.message)
   
  } catch (error) {
    console.log(error)
  }
}




  return (
    <>
    {/* header */}
      <Landing_header/>
    {/* hero banner   */}
      <section className='bg-tiles_bg bg-[#F6F6F6] h-auto xl:h-screen lg:mt-0 mt-20 px-6' id='home'>
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-2 py-20 h-full items-center">
              <div className="lg:col-span-1 col-span-2">
                <div className="text_decs">
                  <p className='text-lg font-semibold text-center md:text-left'>- Explore Our Reviews Today</p>
                  <h2 className='font-bold md:text-4xl text-2xl text-center md:text-left leading-normal text-text_dark'>Empowering Your Career with Real Job Reviews </h2>
                  <p className='text-lg text-dark_gray text-center md:text-left'>Share your experience and feedback by rating customers, fostering a supportive community of workers.</p>
                  <div className='text-center md:text-left'>
                  <button onClick={openModal} className='bg-text_dark my-10 px-5 py-3 text-white rounded-xl font-medium'>Register Now</button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-2">
                <div className="img flex">
                  <img src={Online_Rvw} alt="" className='lg:ms-auto  lg:mr-0 mx-auto' />
                </div>
              </div>
          </div>
        </div>
      </section>
    {/* our services */}
        <section className='py-10 px-6 bg-white' id='services'>
          <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-3 text-center">
                <p className='text-main_gray uppercase font-semibold'>Features</p>
                <h3 className='font-bold text-4xl text-text_dark'>Our Services</h3>
                <div className="desc_txt max-w-5xl mx-auto my-3">
                   <p className='text-dark_gray'>Our app provides two user-friendly interfaces: one 
                    for customers and one for businesses. Customers can easily book services such as plumbing,
                     electrical work, and construction. Both parties can rate each other, ensuring transparency and trust. 
                     The app simplifies finding and hiring skilled professionals, promoting reliable connections for every job.</p>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-3">
                <div className="rvw_crd group xl:p-10 p-6 transition-all border rounded-2xl border-transparent hover:border-main_gray">
                  <div className="icn mb-5 bg-light_gray size-16 flex items-center justify-center rounded-full">
                      <span>
                        <svg width="25" height="30" viewBox="0 0 31 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.4 5.4H25.8C26.7017 5.4 27.5665 5.75821 28.2042 6.39584C28.8418 7.03346 29.2 7.89826 29.2 8.8V32.6C29.2 33.5017 28.8418 34.3665 28.2042 35.0042C27.5665 35.6418 26.7017 36 25.8 36H5.4C4.49826 36 3.63346 35.6418 2.99584 35.0042C2.35821 34.3665 2 33.5017 2 32.6V8.8C2 7.89826 2.35821 7.03346 2.99584 6.39584C3.63346 5.75821 4.49826 5.4 5.4 5.4H8.8M15.6 17.3H22.4M15.6 25.8H22.4M8.8 17.3H8.817M8.8 25.8H8.817M10.5 2H20.7C21.6389 2 22.4 2.76112 22.4 3.7V7.1C22.4 8.03888 21.6389 8.8 20.7 8.8H10.5C9.56112 8.8 8.8 8.03888 8.8 7.1V3.7C8.8 2.76112 9.56112 2 10.5 2Z" stroke="#303030" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                  </div>
                  <div className="txt">
                    <h3 className='text-xl font-bold mb-5'>Online Review</h3>
                    <p className='mb-5 text-dark_gray'>Effortlessly exchange reviews and ratings to guarantee trust and quality in services.</p>
                    <button className='flex gap-3 items-center text-dark_gray group-hover:text-link_color'>Read More <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1665 6.99996H12.8332M12.8332 6.99996L6.99984 1.16663M12.8332 6.99996L6.99984 12.8333" stroke="#787878" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-3">
                <div className="rvw_crd group xl:p-10 p-6 border-main_gray border rounded-2xl hover:border-main_gray">
                  <div className="icn mb-5 bg-light_gray size-16 flex items-center justify-center rounded-full">
                      <span>
                          <svg width="28" height="28" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8337 17.5H16.8491M23.0003 8.25004V5.16671C23.0003 4.34896 22.6755 3.5647 22.0972 2.98646C21.519 2.40822 20.7347 2.08337 19.917 2.08337H13.7503C12.9326 2.08337 12.1483 2.40822 11.5701 2.98646C10.9918 3.5647 10.667 4.34896 10.667 5.16671V8.25004M32.2503 19.0417C27.6759 22.0618 22.3151 23.6718 16.8337 23.6718C11.3522 23.6718 5.99144 22.0618 1.41699 19.0417M4.50033 8.25004H29.167C30.8699 8.25004 32.2503 9.6305 32.2503 11.3334V26.75C32.2503 28.4529 30.8699 29.8334 29.167 29.8334H4.50033C2.79745 29.8334 1.41699 28.4529 1.41699 26.75V11.3334C1.41699 9.6305 2.79745 8.25004 4.50033 8.25004Z" stroke="#303030" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </span>
                  </div>
                  <div className="txt">
                    <h3 className='text-xl font-bold mb-5'>Job Opportunities</h3>
                    <p className='mb-5 text-dark_gray'>Explore a range of job opportunities with our app, customized to match your unique skills and interests.</p>
                    <button className='flex gap-3 items-center text-link_color group-hover:text-link_color'>Read More <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1665 6.99996H12.8332M12.8332 6.99996L6.99984 1.16663M12.8332 6.99996L6.99984 12.8333" stroke="#787878" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg></span></button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-3">
                <div className="rvw_crd group xl:p-10 p-6 transition-all border rounded-2xl border-transparent hover:border-main_gray">
                  <div className="icn mb-5 bg-light_gray flex size-16 items-center justify-center rounded-full">
                      <span>
                        <svg width="26" height="30" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.4665 29.2C25.4665 28.2983 25.1083 27.4335 24.4707 26.7958C23.833 26.1582 22.9682 25.8 22.0665 25.8H11.8665C10.9648 25.8 10.1 26.1582 9.46234 26.7958C8.82472 27.4335 8.4665 28.2983 8.4665 29.2M10.1665 2V5.4M23.7665 2V5.4M5.0665 5.4H28.8665C30.7443 5.4 32.2665 6.92223 32.2665 8.8V32.6C32.2665 34.4778 30.7443 36 28.8665 36H5.0665C3.18874 36 1.6665 34.4778 1.6665 32.6V8.8C1.6665 6.92223 3.18874 5.4 5.0665 5.4ZM20.3665 15.6C20.3665 17.4778 18.8443 19 16.9665 19C15.0887 19 13.5665 17.4778 13.5665 15.6C13.5665 13.7222 15.0887 12.2 16.9665 12.2C18.8443 12.2 20.3665 13.7222 20.3665 15.6Z" stroke="#303030" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                  </div>
                  <div className="txt">
                    <h3 className='text-xl font-bold mb-5'>Online Review</h3>
                    <p className='mb-5 text-dark_gray'>Our app offers access to a diverse selection of service providers, making it easy to find the right help.</p>
                    <button className='flex gap-3 items-center text-dark_gray group-hover:text-link_color'>Read More <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1665 6.99996H12.8332M12.8332 6.99996L6.99984 1.16663M12.8332 6.99996L6.99984 12.8333" stroke="#787878" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    {/* our trust */}
        <section className='px-6 bg-white'>
          <div className="container mx-auto">
              <div className="grid grid-cols-2">
                  <div className="lg:col-span-1 col-span-2">
                      <div className="img flex justify-center">
                          <img src={trust_img} alt="" />
                      </div>
                  </div>
                  <div className="lg:col-span-1 col-span-2">
                        <div className="cont_desc pt-20">
                            <p className='uppercase text-main_gray font-medium mb-3'>Our trust</p>
                            <h3 className='md:text-3xl text-2xl font-bold mb-3'>Why our clients trust us</h3>
                            <p className='text-main_gray font-medium mb-3'>Reasons Our Clients Have Complete Confidence in Our Reliable & Efficient Service Offerings.</p>
                       
                            <ul className='pt-10'>
                              <li className='flex gap-3 items-center mb-8'>
                                <span className='size-12 bg-[#EEF3FF] inline-flex justify-center items-center flex-shrink-0 border-[#DDE7FF] border-2 rounded-full'><svg width="18" height="13" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2.5L7 13.5L2 8.5" stroke="#4578DA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                                <p className='text-main_gray text-lg'><b className='text-dark_link'>Reliable Service Providers:</b> We carefully vet and verify all service providers to ensure quality and professionalism.</p>
                              </li>

                              <li className='flex gap-3 items-center mb-8'>
                                <span className='size-12 bg-[#EEF3FF] inline-flex justify-center items-center flex-shrink-0 border-[#DDE7FF] border-2 rounded-full'><svg width="18" height="13" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2.5L7 13.5L2 8.5" stroke="#4578DA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                                <p className='text-main_gray text-lg'><b className='text-dark_link'>Transparent Ratings:</b> Both customers and businesses can rate each other, promoting trust and accountability in every transaction.</p>
                              </li>

                              <li className='flex gap-3 items-center mb-8'>
                                <span className='size-12 bg-[#EEF3FF] inline-flex justify-center items-center flex-shrink-0 border-[#DDE7FF] border-2 rounded-full'><svg width="18" height="13" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2.5L7 13.5L2 8.5" stroke="#4578DA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                                <p className='text-main_gray text-lg'><b className='text-dark_link'>User-Friendly Interface:</b> Our intuitive app design makes it easy to book services and manage appointments efficiently.</p>
                              </li>
                           
                              <li className='flex gap-3 items-center mb-8'>
                                <span className='size-12 bg-[#EEF3FF] inline-flex justify-center items-center flex-shrink-0 border-[#DDE7FF] border-2 rounded-full'><svg width="18" height="13" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2.5L7 13.5L2 8.5" stroke="#4578DA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                                <p className='text-main_gray text-lg'><b className='text-dark_link'>Comprehensive Support:</b> Our dedicated customer support team is available to assist with any issues or questions, ensuring a smooth experience.</p>
                              </li>
                            </ul>
                        </div>
                  </div>
              </div>
          </div>
        </section>
    {/* our need */}      
        <section className='pb-10 md:pb-20 pt-9 md:pt-28 our_ned px-6 bg-[#F8FAFF] bg-[length:450px]  bg-hand bg-no-repeat bg-right-bottom'>
            <div className="container mx-auto">
                <div className="grid grid-cols-5">
                  <div className="lg:col-span-3 col-span-5">
                      <div className="cont_desc">
                          <p className='uppercase text-main_gray font-medium mb-3'>Our trust</p>
                          <h3 className='md:text-3xl text-2xl font-bold mb-3'>Why our clients trust us</h3>
                          <p className='text-main_gray font-medium mb-4'>Our app connects customers with top professionals for services like plumbing and electrical work. With easy booking and transparent ratings, you can confidently choose and schedule reliable providers. </p>
                          <p className='text-main_gray font-medium mb-4'>Service providers can showcase their skills, manage appointments, and interact with clients efficiently. Designed for reliability and ease, our app simplifies finding and booking the services you need.</p>
                      </div>    
                      <div className="grid grid-cols-2 py-5 gap-x-5 md:px-0 px-5">
                        <div className="md:col-span-1 col-span-2">
                          <div className="icn">
                            <span className='bg-[#F2F2F2] inline-flex justify-center items-center size-16 rounded-full'>
                              <svg width="36" height="36" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9196 18.9933L17.3199 22.3936L24.1205 15.593M5.16386 13.2468C4.91571 12.129 4.95382 10.9667 5.27464 9.86752C5.59546 8.76837 6.18862 7.76802 6.99912 6.95922C7.80961 6.15042 8.81121 5.55936 9.91103 5.24084C11.0108 4.92231 12.1733 4.88665 13.2906 5.13714C13.9055 4.17537 14.7527 3.38388 15.754 2.83562C16.7553 2.28737 17.8785 2 19.0201 2C20.1616 2 21.2848 2.28737 22.2861 2.83562C23.2874 3.38388 24.1346 4.17537 24.7496 5.13714C25.8685 4.88556 27.033 4.92106 28.1345 5.24036C29.2361 5.55965 30.2391 6.15236 31.05 6.96336C31.861 7.77435 32.4537 8.77728 32.773 9.87885C33.0923 10.9804 33.1278 12.1449 32.8763 13.2638C33.838 13.8788 34.6295 14.726 35.1778 15.7273C35.726 16.7286 36.0134 17.8518 36.0134 18.9933C36.0134 20.1349 35.726 21.2581 35.1778 22.2594C34.6295 23.2607 33.838 24.1079 32.8763 24.7228C33.1268 25.8401 33.0911 27.0026 32.7726 28.1024C32.454 29.2022 31.863 30.2038 31.0542 31.0143C30.2454 31.8248 29.245 32.4179 28.1459 32.7388C27.0467 33.0596 25.8844 33.0977 24.7666 32.8495C24.1524 33.815 23.3046 34.6099 22.3016 35.1606C21.2986 35.7113 20.1728 36 19.0286 36C17.8843 36 16.7586 35.7113 15.7556 35.1606C14.7526 34.6099 13.9047 33.815 13.2906 32.8495C12.1733 33.1 11.0108 33.0644 9.91103 32.7458C8.81121 32.4273 7.80961 31.8363 6.99912 31.0275C6.18862 30.2187 5.59546 29.2183 5.27464 28.1191C4.95382 27.02 4.91571 25.8576 5.16386 24.7398C4.19471 24.1265 3.39641 23.278 2.84325 22.2733C2.29008 21.2686 2 20.1403 2 18.9933C2 17.8464 2.29008 16.7181 2.84325 15.7134C3.39641 14.7087 4.19471 13.8602 5.16386 13.2468Z" stroke="#303030" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg></span>
                          </div>
                          <div className="desc py-3">
                            <h4 className='font-bold text-xl text-dark_link mb-3'>Design Focused</h4>
                            <p className='text-dark_gray font-medium'>Our app’s sleek, intuitive UI ensures easy navigation and efficient management.</p>
                          </div>
                        </div>
                        <div className="md:col-span-1 col-span-2">
                          <div className="icn">
                            <span className='bg-[#F2F2F2] inline-flex justify-center items-center size-16 rounded-full'><svg width="40" height="31" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 27.5L44.5 19L36 10.5M10.5 10.5L2 19L10.5 27.5M28.5625 2L17.9375 36" stroke="#303030" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                          </div>
                          <div className="desc py-3">
                            <h4 className='font-bold text-xl text-dark_link mb-3'>Best User Experince</h4>
                            <p className='text-dark_gray font-medium'>Our user-friendly design guarantees a smooth, intuitive experience for all users.</p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </section>
    {/* download app     */}
        <section className='bg-dark_link pt-16 px-6'>
            <div className="container mx-auto">
                <div className="grid grid-cols-5 gap-5">
                  <div className="md:col-span-2 col-span-5">
                    <div className="img">
                        <img src={Downlaod_app} alt="" />
                    </div>
                  </div>
                  <div className="md:col-span-3 col-span-5">
                    <Tabs></Tabs>
                  </div>
                </div>
            </div>
        </section>
    {/* app  screenshot   */}
        <section className='py-20 px-6 bg-white' id='screenshot'>
            <div className="container mx-auto">
              <div className="slide_grid">
                <div className="w-full max-w-4xl mx-auto text-center mb-5">
                    <h3 className='text-3xl font-bold text-text_dark mb-3'>App screenshots</h3>
                    <p className='text-dark_gray'>Start working with that can provide everything you need to generate awareness, drive traffic, connect. Efficiently transform granular value with client-focused content. Energistically redefine market.</p>
                </div>
                <div className="app_slider">
                     <Screenshot_slider></Screenshot_slider>
                 </div>
              </div>
            </div>
        </section>
    {/* FAQ section */}
        <section className='bg-[#F8FAFF] py-20'>
            <div className="container mx-auto">
              <div className="faq_blk">
                <p className='text-center text-main_gray  text-lg font-medium'>FAQ</p>
                <h3 className='text-center md:text-3xl text-2xl font-bold mb-3'>Frequently Asked Questions</h3>
                <p className='text-dark_gray text-center w-full max-w-4xl mx-auto'>Explore our FAQs for answers on booking services, managing your account, payment issues, and troubleshooting technical problems for smooth usage.</p>
              </div>

              <div className="faq_lst">
                  <FAQ></FAQ>
              </div>
            </div>
        </section>
    {/* counting */}
        <section className='py-10 px-6 bg-white'>
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-3 justify-items-center">
                    <div className="md:col-span-1 col-span-3 md:mb-0 mb-3">
                        <div className='count flex gap-3 items-center'>
                          <h3 className='md:text-4xl text-xl font-bold'>1M+</h3> <p>Customers visit Albino every months</p>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3 md:mb-0 mb-3">
                        <div className='count flex gap-3 items-center'>
                              <h3 className='md:text-4xl text-xl font-bold'>93%</h3> <p>Satisfaction rate from our customers.</p>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                          <div className='count flex gap-3 items-center'>
                                <h3 className='md:text-4xl text-xl font-bold'>4.9</h3> <p>Average customer ratings out of 5.00!</p>
                          </div>
                    </div>
                </div>
            </div>
        </section>
      {/* testmonial*/}
          <section className='bg-[#F8FAFF] py-16 md:px-10 px-0'>
              <div className="container mx-auto">
                  <div className="rvw_sldr">
                      <Testmonial></Testmonial>
                  </div>
              </div>
          </section>
      {/* contact form*/}
          <section className='py-16 bg-white px-6' id='contact'>
              <div className="container mx-auto">
                  <div className="grid grid-cols-2">
                      <div className="md:col-span-1 col-span-2">
                          <div className="txt w-full md:w-11/12">
                            <h3 className="text-3xl font-bold mb-2 text-center md:text-left">Get in Touch</h3>
                            <p className='text-lg  text-center md:text-left'>Get in touch with us for quick support and assistance with any questions or issues you have.</p>
                            <div className="links">
                              <ul className='my-10'>
                                <li className='flex items-center gap-4 mb-10'>
                                  <div className="icn size-14 rounded-full bg-dark_link inline-flex justify-center items-center bg-opacity-5">
                                      <svg width="25" height="25" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M23 12.25C23 19.1154 15.3839 26.2654 12.8264 28.4736C12.5881 28.6528 12.2981 28.7497 12 28.7497C11.7019 28.7497 11.4119 28.6528 11.1736 28.4736C8.61613 26.2654 1 19.1154 1 12.25C1 9.33262 2.15893 6.53473 4.22183 4.47183C6.28473 2.40893 9.08262 1.25 12 1.25C14.9174 1.25 17.7153 2.40893 19.7782 4.47183C21.8411 6.53473 23 9.33262 23 12.25Z" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M12 16.375C14.2782 16.375 16.125 14.5282 16.125 12.25C16.125 9.97183 14.2782 8.125 12 8.125C9.72183 8.125 7.875 9.97183 7.875 12.25C7.875 14.5282 9.72183 16.375 12 16.375Z" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                  </div>
                                  <div className="dta">
                                    <h3 className='text-lg font-bold'>Our Location</h3>
                                    <p className='text-dark_link font-medium' >1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                  </div>
                                </li>

                                <li className='flex items-center gap-4 mb-10'>
                                  <div className="icn size-14 rounded-full bg-dark_link inline-flex justify-center items-center bg-opacity-5">
                                  <svg width="25" height="25" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.4036 1.08361C17.8486 1.34123 20.1323 2.42564 21.8773 4.1575C23.6222 5.88936 24.7238 8.16492 24.9998 10.6079M15.4036 5.88172C16.5833 6.11436 17.6659 6.69623 18.5108 7.55184C19.3557 8.40744 19.924 9.49725 20.1417 10.6798M24.9398 18.9806V22.5791C24.9412 22.9132 24.8728 23.2439 24.7389 23.55C24.6051 23.8561 24.4088 24.1308 24.1626 24.3567C23.9165 24.5825 23.6259 24.7545 23.3094 24.8615C22.9929 24.9685 22.6576 25.0083 22.3249 24.9782C18.6337 24.5771 15.0881 23.3158 11.9729 21.2957C9.07468 19.454 6.61746 16.9968 4.77578 14.0985C2.74855 10.9692 1.48697 7.40632 1.09323 3.69858C1.06326 3.36687 1.10268 3.03256 1.20899 2.71692C1.3153 2.40128 1.48616 2.11123 1.71071 1.86525C1.93525 1.61927 2.20856 1.42273 2.51322 1.28816C2.81789 1.15359 3.14723 1.08393 3.48029 1.08361H7.07888C7.66102 1.07788 8.22538 1.28403 8.66677 1.66362C9.10816 2.04322 9.39646 2.57036 9.47793 3.1468C9.62982 4.29843 9.9115 5.42917 10.3176 6.51747C10.479 6.94681 10.5139 7.41342 10.4183 7.862C10.3226 8.31058 10.1003 8.72234 9.77781 9.04848L8.25441 10.5719C9.96201 13.5749 12.4485 16.0614 15.4516 17.769L16.975 16.2456C17.3011 15.9231 17.7129 15.7009 18.1615 15.6052C18.61 15.5095 19.0766 15.5445 19.506 15.7059C20.5943 16.112 21.725 16.3936 22.8767 16.5455C23.4593 16.6277 23.9915 16.9212 24.3719 17.3702C24.7523 17.8192 24.9544 18.3923 24.9398 18.9806Z" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </div>
                                  <div className="dta">
                                    <h3 className='text-lg font-bold'>Phone Number</h3>
                                    <p className='text-dark_link font-medium' >(704) 555-0127</p>
                                  </div>
                                </li>

                                <li className='flex items-center gap-4 mb-10'>
                                  <div className="icn size-14 rounded-full bg-dark_link inline-flex justify-center items-center bg-opacity-5">
                                  <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19.2 8.80001V15.3C19.2 16.3344 19.6109 17.3263 20.3423 18.0577C21.0737 18.7891 22.0657 19.2 23.1 19.2C24.1344 19.2 25.1263 18.7891 25.8577 18.0577C26.5891 17.3263 27 16.3344 27 15.3V14C27 11.0715 26.0112 8.22879 24.1938 5.93243C22.3765 3.63607 19.837 2.02061 16.9868 1.34777C14.1366 0.674942 11.1428 0.98416 8.49031 2.22533C5.83783 3.4665 3.68213 5.5669 2.37246 8.18623C1.0628 10.8056 0.675895 13.7904 1.27445 16.6571C1.873 19.5237 3.42193 22.1043 5.6703 23.9808C7.91866 25.8572 10.7347 26.9195 13.6622 26.9956C16.5898 27.0717 19.4572 26.1571 21.8 24.4M19.2 14C19.2 16.8719 16.8719 19.2 14 19.2C11.1281 19.2 8.80001 16.8719 8.80001 14C8.80001 11.1281 11.1281 8.80001 14 8.80001C16.8719 8.80001 19.2 11.1281 19.2 14Z" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  </div>
                                  <div className="dta">
                                    <h3 className='text-lg font-bold'>Email Address</h3>
                                    <p className='text-main_gray font-medium' >tim.jennings@example.com</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                      </div>  
                      <div className="md:col-span-1 col-span-2">
                        <form action="">
                            <div className="grid grid-cols-2 gap-5 shadow-lg p-5 py-8 rounded-lg">
                              <div className="col-span-1">
                                    <div className="inp">
                                      <label htmlFor="" className='block text-base font-semibold mb-3'>Full name</label>
                                      <input className='border px-4 py-3 rounded-lg outline-0 w-full block' type="text" placeholder='Your name...' />
                                    </div>
                              </div>
                              <div className="col-span-1">
                                    <div className="inp">
                                      <label htmlFor="" className='block text-base font-semibold mb-3'>Email Address</label>
                                      <input className='border px-4 py-3 rounded-lg outline-0 w-full block' type='email' 
                                      placeholder='Your email address...'  {...register("email")}/>
                                    </div>
                                    <p className="text-red-600 mt-1  ml-2 text-sm ">
                              {errors.email?.message}
                             </p>
                              </div>
                              
                              <div className="col-span-2">
                                  <div className="inp">
                                          <label htmlFor="" className='block text-base font-semibold mb-3'>Subject</label>
                                          <input className='border px-4 py-3 rounded-lg outline-0 w-full block' type="text" 
                                          placeholder='Type subject...' {...register("subject")}/>
                                  </div>
                                  <p className="text-red-600 mt-1 text-sm ">
                                  {errors.subject?.message}
                                  </p>
                                </div>
                              
                              <div className="col-span-2">
                                  <div className="inp">
                                          <label htmlFor="" className='block text-base font-semibold mb-3'>Messages</label>
                                          <textarea className='border px-4 py-3 rounded-lg outline-0 w-full block min-h-28'
                                           name="" id="" placeholder='Type messages...' {...register("message")}></textarea>
                                  </div>
                                  <p className="text-red-600 mt-1 text-sm ">
                              {errors.message?.message}
                             </p>
                              </div>
                             
                              <div className="col-span-2">
                                <div className="btt text-end">
                                      <button  onClick={handleSubmit(handleContactUs)}    type='submit' 
                                      className='bg-dark_link px-9 py-3 rounded-lg text-white font-medium'>Submit</button>
                                </div>
                              </div>
                            </div>
                        </form>
                      </div>
                  </div>
              </div>
          </section>
          <Select_Management isOpen={isOpen} closeModal={closeModal} />
          <Landing_footer></Landing_footer>
    </>
  )
}
export default Landing