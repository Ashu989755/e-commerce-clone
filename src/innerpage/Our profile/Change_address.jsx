import React, { useState, useRef, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Side_links from '../Business profile/Side_links'
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { customerAddAddress } from "../../apis/customer/profile";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAddressValidator } from "../../helpers/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { customerProfile } from "../../apis/customer/profile";


function Change_address() {
  const { user } = useSelector((state) => state?.authSlice);
  const location = useLocation();

  console.log(user);

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAddressValidator),
    defaultValues: {
      country: user?.country,
      city: user?.city,
      address1: user?.address1,
      address2: user?.address2,
      state: user?.state,
      zipCode: user?.zipcode,
    },
  });

  const dispatch = useDispatch();
 

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [locationn, setLocation] = useState({ lat: "", lng: "" });
  const [position, setPosition] = useState({ lat: 51.5074, lng: -0.1278 });
  const [value, setValue] = useState(
    user?.address1 ? { label: user.address1, value: user.address1 } : null
  );

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const mapRef = useRef(null);
  const navigate = useNavigate();
  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latlng = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          }; // Ensure they are numbers

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                const newAddress = {
                  label: results[0].formatted_address,
                  value: results[0].place_id,
                };
                setValue(newAddress);
                setLocation({ lat: latitude, lng: longitude });
                setPosition({ lat: latitude, lng: longitude });
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        },
        (error) => {
          console.log("Error fetching the current location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const CustomDropdownIndicator = () => (
    <FaMapMarkerAlt
      onClick={fetchCurrentLocation}
      style={{ color: "grey", marginRight: "10px", cursor: "pointer" }}
    />
  );

  useEffect(() => {
    const checkScript = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsScriptLoaded(true);
      } else {
        setTimeout(checkScript, 1000);
      }
    };

    checkScript();
  }, []);


  const handleUserProfile = async () => {
    try {
      const res = await customerProfile();
      const userData = res.data.data
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

  const handleAddressSelect = (selected) => {
    console.log("Selected Address:", selected);
    setValue(selected);
    geocodeByAddress(selected.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  };

  const Marker = () => (
    <div
      style={{
        color: "red",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        width: "50px",
        height: "50px",
      }}
    >
      <FaMapMarkerAlt
        className="text-red-600"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );

  const handleAddAddress = async (data) => {
    try {
      const apiData = {
        Country: data.country,
        City: data.city,
        State: data.state,
        Address1: value.label,
        Address2: data.address2,
        zipCode: data.zipCode,
      };
      const res = await customerAddAddress(apiData);
      handleUserProfile();
       navigate("/business-my-profile")
       toast.success("Address Updated Sucessfully")
       console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header_two></Header_two>
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

      <section className="lg:py-20 py-10 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-10">

            <div className="col-span-5 lg:col-span-2">


              <Side_links></Side_links>
            </div>
            <div className="lg:col-span-3 col-span-5"> 
              <div className="my_pro border shadow-md rounded-xl p-5 bg-white">
                <h3 className="text-xl font-bold text-dark_link mb-5 border-b pb-4">
                  Change Address
                </h3>
                <div
                  className="or_map rounded-lg overflow-hidden relative mb-4"
                  style={{ height: "220px" }}
                >
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "key",
                    }}
                    defaultCenter={position}
                    center={position}
                    defaultZoom={11}
                    onGoogleApiLoaded={({ map, maps }) => handleLoad(map)}
                  >
                    <Marker lat={position.lat} lng={position.lng} />
                  </GoogleMapReact>

                  <button
                    className="bg-text_dark px-4 py-3 text-sm font-medium flex gap-1 text-white absolute bottom-3 right-3 rounded-xl"
                    onClick={fetchCurrentLocation}
                  >
                    <span>
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4936 7.57841C9.33524 7.57841 7.5791 9.33455 7.5791 11.4931C7.5791 13.6515 9.33524 15.4076 11.4936 15.4076C13.6521 15.4076 15.4083 13.6515 15.4083 11.4931C15.4083 9.33455 13.6521 7.57841 11.4936 7.57841Z"
                          fill="white"
                        />
                        <path
                          d="M22.3264 10.8192H19.8532C19.5266 6.73109 16.2557 3.46006 12.1675 3.13366V0.673648C12.1675 0.30165 11.8659 0 11.4938 0C11.1218 0 10.8202 0.30165 10.8202 0.673648V3.13366C6.73195 3.46002 3.4611 6.73109 3.13451 10.8192H0.673693C0.30165 10.8192 0 11.1208 0 11.493C0 11.865 0.30165 12.1666 0.673648 12.1666H3.13451C3.4611 16.2547 6.73195 19.5257 10.8202 19.8523V22.3121C10.8202 22.6842 11.1218 22.9858 11.4938 22.9858C11.866 22.9858 12.1675 22.6842 12.1675 22.3121V19.8523C16.2557 19.5257 19.5268 16.2547 19.8532 12.1666H22.3264C22.6983 12.1666 23 11.865 23 11.493C23 11.1208 22.6983 10.8192 22.3264 10.8192ZM11.4939 18.532C7.61251 18.532 4.45481 15.3742 4.45481 11.493C4.45481 7.61161 7.61251 4.45373 11.4938 4.45373C15.3752 4.45373 18.5329 7.61161 18.5329 11.493C18.5329 15.3742 15.3753 18.532 11.4939 18.532Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    Locate Me
                  </button>
                </div>

                <div className="inp mb-4 relative">
                  <GooglePlacesAutocomplete
                    apiKey={"key"}
                    selectProps={{
                      value,
                      onChange: handleAddressSelect,
                      placeholder: "Flat, House no., Building, Apartment",
                      components: {
                        DropdownIndicator: CustomDropdownIndicator,
                        IndicatorSeparator: () => null,
                      },
                    }}
                  />
                </div>
                <div className="inp mb-4 relative">
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Area, Street, Sector, Village"
                    type="text"
                    name=""
                    id=""
                    {...register("address2")}
                  />
                  <label
                    htmlFor=""
                    className="text-sm text-dark_link font-bold text-end block my-2"
                  >
                    *optional{" "}
                  </label>
                </div>
                <div className="inp mb-4 relative">
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Zip Code"
                    type="number"
                    name=""
                    id=""
                    min="0"
                    {...register("zipCode")}
                  />
                  {errors.zipCode && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.zipCode.message}
                  </p>
                )}
                </div>
                
                <div className="inp mb-4 relative">
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="City"
                    type="text"
                    name=""
                    id=""
                    {...register("city")}
                  />
                   {errors.city && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.city.message}
                  </p>
                )}
                </div>
               
                <div className="inp mb-2 relative flex gap-5 justify-between">
                  <div className="w-1/2">
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <CountrySelect
                          {...field}
                          defaultValue={{ name: field.value }}
                          onChange={(e) => {
                            setCountryid(e.id);
                            setFormValue("country", e.name);
                          }}
                          placeHolder="Select Country"
                        />
                      )}
                    />
                    {errors.country && (
                      <p className="text-red-600 text-xs">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2 mb-6">
                    <div className="relative">
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <StateSelect
                            {...field}
                            defaultValue={{ name: field.value }}
                            countryid={countryid}
                            onChange={(e) => {
                              setStateid(e.id);
                              setFormValue("state", e.name);
                            }}
                            placeHolder="Select State"
                            className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          />
                        )}
                      />
                      {errors.state && (
                        <p className="text-red-600 text-xs">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>


                <div className="btn mb-5">
                  <button // onClick={goToCard}

          
                    onClick={handleSubmit(handleAddAddress)}
                    className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </section>
      <Footer_two></Footer_two>
    </>
  );
}

export default Change_address;
