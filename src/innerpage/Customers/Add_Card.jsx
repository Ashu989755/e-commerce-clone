import React, { useState, useEffect } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import { addbank_img, AddCard } from "../../assets/image";
import { Link, useNavigate } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import { customerStripePayment } from "../../apis/customer/stripe";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";  
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { addBankValidation } from "../../helpers/validation";
import { businessAddBank } from "../../apis/business/Profile";
import { toast } from "react-toastify";
import Header_Track from "../Bussiness/Header_Track";


function Add_Card() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBankValidation),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadedImg, setUploadedImg] = useState(null);
  const [uploadedImgs, setUploadedImgs] = useState(null);
  const [skipCard, setSkipCard] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageTwo, setPreviewImageTwo] = useState(null);


  

  const handleUploadedImg = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  function handleUploadedImgs(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImgs(file);
      setPreviewImageTwo(URL.createObjectURL(file));
    }
  }

  const handleAddBank = async (data) => {
    try {
      const formData = new FormData();
      formData.append("BankName", data.bankName);
      formData.append("AccountHolderName", data.accountHolderName);
      formData.append("AccountNumber", data.accountNumber);
      formData.append("RoutingNumber", data.routingNumber);
      formData.append("Address1", data.address1);
      formData.append("Address2", data.address2);
      formData.append("City", data.city);
      formData.append("State", data.state);
      formData.append("Country", data.country);
      formData.append("PostalCode", data.postalCode);
      formData.append("SsnLast4", data.ssnLast4);
      formData.append("IdNumber", data.idNumber);
      formData.append("Dob", data.dateOfBirth);

      if (uploadedImg) {
        formData.append("Front", uploadedImg);
      }

      if (uploadedImgs instanceof File) {
        formData.append("Back", uploadedImgs);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await businessAddBank(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success == true) {
        const userData = res.data.data;
        console.log(userData,"====================lklkkkkk")
        dispatch(
          updateUser({
          user: { ...userData},
          })
        );
        navigate("/business-add-services");
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    setSkipCard((prevState) => {
      const newState = !prevState; // Toggle the value
      console.log(newState)
      dispatch(updateUser({ skipCard: newState })); // Dispatch with the new state
      return newState; 
    });
    navigate("/business-add-services");
  };
  const today = new Date().toISOString().split('T')[0];
  

  return (
    <>
      <Header_two></Header_two>
      <section className="py-32">
        {/* steps */}
        < Header_Track />

        <div className="ad_crd py-5">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="desc">
                <h3 className="text-2xl font-bold text-center text-dark_link">
                  Add Bank
                </h3>
              </div>

              <div className="img w-fit my-5 mx-auto">
                <img
                  src={addbank_img}
                  alt=""
                  width="100px"
                  className="mix-blend-luminosity"
                />
              </div>

              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-x-4"
              >
                <div className="itm mb-4">
                  <Controller
                    name="bankName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm 
                        focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Bank Name"
                        type="text"
                      />
                    )}
                  />
                  {errors.bankName && (
                    <p className="text-red-500">{errors.bankName.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="accountHolderName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Account Holder Name"
                        type="text"
                      />
                    )}
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500">
                      {errors.accountHolderName.message}
                    </p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="accountNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Account Number"
                        type="text"
                      />
                    )}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500">
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="routingNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Routing Number"
                        type="text"
                      />
                    )}
                  />
                  {errors.routingNumber && (
                    <p className="text-red-500">
                      {errors.routingNumber.message}
                    </p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        type="date"
                        max={today}
                      />
                    )}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="address1"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Address 1"
                        type="text"
                      />
                    )}
                  />
                  {errors.address1 && (
                    <p className="text-red-500">{errors.address1.message}</p>
                  )}
                </div>

                <div className="itm mb-4 col-span-2">
                  <Controller
                    name="address2"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Address 2"
                        type="text"
                      />
                    )}
                  />
                  {errors.address2 && (
                    <p className="text-red-500">{errors.address2.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="City"
                        type="text"
                      />
                    )}
                  />
                  {errors.city && (
                    <p className="text-red-500">{errors.city.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="State"
                        type="text"
                      />
                    )}
                  />
                  {errors.state && (
                    <p className="text-red-500">{errors.state.message}</p>
                  )}
                </div>
                <div className="itm mb-4 col-span-2">
                  <Controller
                    name="postalCode"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Postal Code"
                        type="text"
                      />
                    )}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500">{errors.postalCode.message}</p>
                  )}
                </div>
                <div className="itm mb-4 col-span-2">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="Country"
                        type="text"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-500">{errors.country.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="ssnLast4"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="SSN Last 4"
                        type="text"
                      />
                    )}
                  />
                  {errors.ssnLast4 && (
                    <p className="text-red-500">{errors.ssnLast4.message}</p>
                  )}
                </div>
                <div className="itm mb-4">
                  <Controller
                    name="idNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-5 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                        placeholder="ID Number"
                        type="text"
                      />
                    )}
                  />
                  {errors.idNumber && (
                    <p className="text-red-500">{errors.idNumber.message}</p>
                  )}
                </div>
                <div className="itm mb-4 col-span-2">
                  <label>ID Proof</label>
                  <div className="flex items-center gap-2 justify-center flex-col">
                    {/* Front Image Upload */}
                    <div className="w-full bg-[#f7f7f7] h-52 flex items-center flex-col justify-center">
                      <h6 className="text-base font-semibold">
                        Front Id Proof
                      </h6>
                      {previewImage && (
                        <img src={previewImage} alt="Front ID Proof" className="max-h-32" />
                      )}
                      <div className="relative">
                        <Controller
                          name="frontImage"
                          control={control}
                          render={({
                            field: { value, onChange, ...field },
                          }) => (
                            <input
                              {...field}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                onChange(e.target.files[0]);
                                handleUploadedImg(e);
                              }}
                              value={value?.fileName}
                              className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100 absolute top-0 opacity-0"
                            />
                          )}
                        />
                        <button className="w-full bg-dark_link py-2 px-3 text-white font-medium rounded-lg text-sm">
                          Upload img
                        </button>
                      </div>
                      {errors.frontImage && (
                        <p className="text-red-500">
                          {errors.frontImage.message}
                        </p>
                      )}
                    </div>

                    {/* Back Image Upload */}
                    <div className="w-full bg-[#f7f7f7] h-52 flex items-center flex-col justify-center">
                      <h6 className="text-base font-semibold">Back ID Proof</h6>
                      <img
                        className={`${previewImageTwo ? "max-h-32" : "d-none"}`}
                        src={previewImageTwo}
                        alt="" 
                      />
                      <div className="relative">
                        <Controller
                          name="backImage"
                          control={control}
                          render={({
                            field: { value, onChange, ...field },
                          }) => (
                            <input
                              {...field}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                onChange(e.target.files[0]);
                                handleUploadedImgs(e);
                              }}
                              value={value?.fileName}
                              className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100 absolute top-0 opacity-0"
                            />
                          )}
                        />
                        <button className="w-full bg-dark_link py-2 px-3 text-white font-medium rounded-lg text-sm">
                          Upload img
                        </button>
                      </div>
                      {errors.backImage && (
                        <p className="text-red-500">
                          {errors.backImage.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="inp mb-4 col-span-2 text-center">
                  <button
                    onClick={handleSubmit(handleAddBank)}
                    type="submit"
                    className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleSkip}
                    className="text-center inline-flex justify-center mx-auto mt-3"
                  >
                    Skip <ChevronsRight />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer_two></Footer_two>
    </>
  );
}

export default Add_Card;
