import React, { useEffect, useState } from 'react';
import PhoneInputWithCountry from 'your-phone-input-library'; // Adjust according to your import

const PhoneInputComponent = ({ control, errors, handleChange }) => {
  const [countryCode, setCountryCode] = useState('+1'); // Default to US

  const onCountryChange = (country) => {
    setCountryCode(`+${country.callingCode}`); // Set the country code based on selected flag
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded">
        <span className="bg-gray-200 p-2">{countryCode}</span>
        <PhoneInputWithCountry
          name="phone"
          control={control}
          defaultValue=""
          defaultCountry="US"
          onChange={(value, country) => {
            handleChange(value); // Handle phone number change
            onCountryChange(country); // Handle country change
          }}
          placeholder="Contact Number"
          className={`phone-input flex-1 p-2 ${errors.phone ? "input-error" : ""}`}
          rules={{ required: true }}
          showFlags={true} // Enable flag display
          showCountryCodeOnly={false} // Ensure full input is shown
        />
      </div>
      {errors.phone && (
        <p className="text-red-600 text-sm">
          {errors.phone.message}
        </p>
      )}
    </div>
  );
};

export default PhoneInputComponent;
