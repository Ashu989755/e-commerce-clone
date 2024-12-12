// import React, { useState } from "react";
// import Header_Business from "../layout/Header_business";
// import Footer_two from "../layout/Footer_two";
// import Side_links from "../Business profile/Side_links";
// import { useNavigate } from "react-router-dom";

// function Edit_profile() {
//   const [uploadedImg, setUploadedImg] = useState(null);
//   const [previewImg, setPreviewImg]  = useState(null)

//   function handleUploadedImg(e) {
//     console.log(e);
//     const file = e.target.files[0];
//     setUploadedImg(file);
//     setPreviewImg(URL.createObjectURL(e.target.files[0]));
//   }

//   const navigate = useNavigate();
//   const goprofile = () => {
//     navigate("/my-profile");
//   };

//   return (
//     <>
//       <Header_Business />
//       <section className="pt-20 bg-dark_link grid content-center min-h-72">
//         <div className="container mx-auto py-5">
//           <div className="grid-cols-2 grid">
//             <div className="col-span-2">
//               <h3 className="text-center text-white text-2xl font-bold">
//                 My Profile
//               </h3>
//               <p className="text-center text-white pt-3">
//                 Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida
//                 condimentum.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="col-span-1">
//               <Side_links />
//             </div>
//             <div className="col-span-1">
//               <div className="my_pro border shadow-md rounded-xl p-5 my-5">
//                 <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
//                   Edit profile
//                 </h3>
//                 <div className="inp_pro relative mt-5 mb-10 size-48 mx-auto flex justify-center ">
//                   <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto">
//                     <img
//                       className={`${previewImg ? "" : "d-none"}`}
//                       src={previewImg}
//                       alt=""
//                     />
//                   </span>
//                   <button className="btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center">
//                     Profile Picture
//                     <input
//                       onChange={handleUploadedImg}
//                       className="absolute top-0 start-0 end-0 bottom-0 opacity-0"
//                       type="file"
//                       id="avatar"
//                       accept="image/png, image/jpeg"
//                     />
//                   </button>
//                 </div>
//                 <div className="info_frm my-5">
//                   <div className="inp mb-4 relative">
//                     <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
//                       <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
//                           stroke="#3C3C3C"
//                           stroke-width="1.5"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                         <path
//                           d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
//                           stroke="#3C3C3C"
//                           stroke-width="1.5"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <input
//                       className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
//                       placeholder="First Name"
//                       type="password"
//                       name=""
//                       id=""
//                     />
//                   </div>
//                   <div className="inp mb-4 relative">
//                     <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
//                       <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
//                           stroke="#3C3C3C"
//                           stroke-width="1.5"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                         <path
//                           d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
//                           stroke="#3C3C3C"
//                           stroke-width="1.5"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <input
//                       className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
//                       placeholder="Last Name"
//                       type="password"
//                       name=""
//                       id=""
//                     />
//                   </div>
//                   <div className="inp mb-4 relative flex justify-between">
//                     <div className="w-1/5">
//                       <select
//                         id="countries"
//                         class="bg-gray-50 px-3 h-full border border-gray-300 text-gray-900  rounded-lg focus:shadow-md block w-full border-transparent focus:border-text_dark"
//                       >
//                         <option disabled>Choose a country</option>
//                         <option value="US">US</option>
//                         <option value="CA">CA</option>
//                         <option value="FR">FR</option>
//                         <option value="DE">DE</option>
//                       </select>
//                     </div>
//                     <div className="relative w-3/4">
//                       <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
//                         <svg
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
//                             stroke="#3C3C3C"
//                             stroke-width="1.5"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                           <path
//                             d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
//                             stroke="#3C3C3C"
//                             stroke-width="1.5"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                         </svg>
//                       </span>
//                       <input
//                         className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
//                         placeholder="987654321"
//                         type="password"
//                         name=""
//                         id=""
//                       />
//                     </div>
//                   </div>
//                   <div className="inp mb-4 flex justify-end gap-3">
//                     <button className="border border-dark_link px-8 rounded-lg font-medium">
//                       Discard
//                     </button>
//                     <button
//                       onClick={goprofile}
//                       className="bg-dark_link py-4 px-10 text-white font-medium rounded-lg"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer_two></Footer_two>
//     </>
//   );
// }

// export default Edit_profile;
