import React from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Side_links from "../Business profile/Side_links";
function Business_subscription_plan() {
  return (
    <>
      <Header_two />
      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                Subscription Plan
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">
            <div className="lg:col-span-2 col-span-5">
              <Side_links />
            </div>
            <div className="lg:col-span-3 col-span-5">
              <div className="my_pro border shadow-md rounded-xl p-5 bg-white">
                <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
                  Subscription Details
                </h3>
                <div className="border rounded-xl p-5 mt-4 flex items-center justify-between">
                  <div>
                    <h6>Bronze</h6>
                    <h2 className="text-2xl font-semibold pb-4 flex items-center gap-2">
                      Free
                      <span className="bg-[#EDEDED] text-[#797979] text-xs p-1 px-2 rounded-full">
                        7 Day free trial
                      </span>
                    </h2>
                    <p>For customers and workers, Profile making</p>
                  </div>
                  <div>
                    <label class="custom-radio custom-radio-block">
                      <input type="radio" name="fruit" value="apple" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div className="border rounded-xl p-5 mt-4 flex items-center justify-between">
                  <div>
                    <h6>Silver</h6>
                    <h2 className="text-2xl font-semibold pb-4 flex items-center gap-2">
                      $490.00
                      <span className="bg-[#EDEDED] text-[#797979] text-xs p-1 px-2 rounded-full">
                        Only 4 Leads a Month
                      </span>
                    </h2>
                    <p>
                      Workers will get access to communicating with customers
                      and scheduling
                    </p>
                  </div>
                  <div>
                    <label class="custom-radio custom-radio-block">
                      <input type="radio" name="fruit" value="apple" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div className="border rounded-xl p-5 mt-4 flex items-center justify-between">
                  <div>
                    <h6>Gold</h6>
                    <h2 className="text-2xl font-semibold pb-4 flex items-center gap-2">
                      $990.00
                      <span className="bg-[#EDEDED] text-[#797979] text-xs p-1 px-2 rounded-full">
                        Only 6 Leads a Month
                      </span>
                    </h2>
                    <p>
                      Workers will gold access to messaging, scheduling,
                      contruct signing
                    </p>
                  </div>
                  <div>
                    <label class="custom-radio custom-radio-block">
                      <input type="radio" name="fruit" value="apple" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div className="border rounded-xl p-5 mt-4 flex items-center justify-between">
                  <div>
                    <h6>Platinumss</h6>
                    <h2 className="text-2xl font-semibold pb-4 flex items-center gap-2">
                      $1,950.00
                      <span className="bg-[#EDEDED] text-[#797979] text-xs p-1 px-2 rounded-full">
                        Unumited leads
                      </span>
                    </h2>
                    <p>
                      Workers will be able to ga n all access. Messaging,
                      scheduling, contract sigring, Estimating and invoicing,
                      requesting and CCOI• ng payments, Mt age.
                    </p>
                  </div>
                  <div>
                    <label class="custom-radio custom-radio-block">
                      <input type="radio" name="fruit" value="apple" />
                      <span class="checkmark"></span>
                    </label>
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

export default Business_subscription_plan;
