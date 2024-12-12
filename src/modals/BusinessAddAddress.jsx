import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import GoogleMapReact from "google-map-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAddressValidator } from "../helpers/validation";
import { useDispatch } from "react-redux";


function BusinessAddAddress({
  addressOpen,
  closeAddressModal,
  setCustomerAddress,
}) {
  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAddressValidator),
  });
  const dispatch = useDispatch();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [position, setPosition] = useState({ lat: 51.5074, lng: -0.1278 });
  const [value, setValue] = useState(null);
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

  // const goToCard = () => {
  //   navigate("/add-card");
  // };
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
        height: "50px"
      }}
    >
      <FaMapMarkerAlt
        className="text-red-600"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(locationData);
            resolve(locationData);
          },
          (error) => {
            console.error("Error getting location", error);
            setLocation({ latitude: "", longitude: "" });
            resolve({ latitude: "", longitude: "" });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve({ latitude: "", longitude: "" });
      }
    });
  };

  const handleAddAddress = async(data) => {
    const locationData = await getLocation();
    const apiData = {
      Country: data?.country,
      City: data?.city,
      State: data?.state,
      Address1: value?.label,
      Address2: data?.address2,
      zipCode: data?.zipCode,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
    setCustomerAddress(apiData);
    closeAddressModal();
  };

  return (
    <>
      <div>
        {addressOpen && (
          <div
            id="add_modal"
            className="fixed z-[9999] inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={closeAddressModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="container mx-auto">
                  <div className="grid content-center h-full">
                    <div className="item shadow-2xl rounded-2xl p-6 max-w-[500px] w-full mx-auto">
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
                      <div className="inp mb-2 relative">
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Zip Code"
                          type="number"
                          name=""
                          id=""
                          {...register("zipCode")}
                        />
                      </div>
                      {errors.zipCode && (
                        <p className="text-red-600 text-sm ml-3">
                          {errors.zipCode.message}
                        </p>
                      )}
                      <div className="inp mb-4 relative">
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-6 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="City"
                          type="text"
                          name=""
                          id=""
                          {...register("city")}
                        />
                      </div>
                      {errors.city && (
                        <p className="text-red-600 text-sm ml-3 mb-4">
                          {errors.city.message}
                        </p>
                      )}
                      <div className="inp mb-2 relative flex justify-between">
                        <div className="w-[48%]">
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <CountrySelect
                                {...field}
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
                        <div className="w-[48%] mb-6">
                          <div className="relative">
                            <Controller
                              name="state"
                              control={control}
                              render={({ field }) => (
                                <StateSelect
                                  {...field}
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
                        <button
                          // onClick={goToCard}
                          onClick={handleSubmit(handleAddAddress)}
                          className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BusinessAddAddress;
