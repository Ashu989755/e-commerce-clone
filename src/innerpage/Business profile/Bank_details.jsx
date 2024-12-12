import React from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Side_links from "./Side_links";

function Bank_details() {
  return (
    <>
      <Header_two />
      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                Edit Personal Information
              </h3>
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
              <div className="my_pro border shadow-md rounded-xl p-5 bg-white">
                <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
                  Bank Details
                </h3>
                {/* <div className="inp_pro relative mt-5 mb-10 size-48 mx-auto flex justify-center ">
                                <span className='inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto'><img className={`${uploadedImg ? "" : "d-none"}`} src={uploadedImg} alt="" /></span>
                                    <button className='btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center'>Profile Picture
                                        <input onChange={handleUploadedImg}  className='absolute top-0 start-0 end-0 bottom-0 opacity-0' type="file" id="avatar" accept="image/png, image/jpeg" />
                                    </button>
                             </div> */}
                <div className="info_frm my-5">
                  <div className="inp mb-4 relative">
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Bank Of United States"
                      type="text"
                    />
                  </div>
                  <div className="inp mb-4 relative">
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Devon Lane"
                      type="text"
                    />
                  </div>
                  <div className="inp mb-4 relative flex justify-between">
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="890123456789012"
                      type="text"
                    />
                  </div>
                  <div className="inp mb-4 relative flex justify-between">
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="129000921"
                      type="text"
                    />
                  </div>
                  <div className="inp mb-4 flex justify-end gap-3">
                    <button className="border border-dark_link px-8 rounded-lg font-medium">
                      Discard
                    </button>
                    <button className="bg-dark_link py-4 px-10 text-white font-medium rounded-lg">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
    </>
  );
}

export default Bank_details;
