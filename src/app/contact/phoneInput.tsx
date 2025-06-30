import React, { useState } from 'react';

const countries = [
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w40/in.png', dialCode: '+91' },
  { code: 'US', name: 'USA', flag: 'https://flagcdn.com/w40/us.png', dialCode: '+1' },
  { code: 'GB', name: 'UK', flag: 'https://flagcdn.com/w40/gb.png', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', dialCode: '+61' },
];

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);

    // If phone is empty or already starts with a dial code, replace it
    if (!value.startsWith(country.dialCode)) {
      const newVal = country.dialCode + ' ';
      onChange({ target: { value: newVal } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="relative flex items-center pb-2 border-b border-gray-400 focus-within:border-[#6210FF]">
      {/* Flag Button */}
      <button type="button" onClick={toggleDropdown} className="mr-2 flex items-center gap-1">
        <img src={selectedCountry.flag} alt={selectedCountry.code} className="w-6 h-4" />
        <span className="text-sm text-black">{selectedCountry.dialCode}</span>
        <svg className="w-3 h-3 ml-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Phone Input */}
      <input
        type="tel"
        value={value}
        onChange={onChange}
        className="flex-1 outfit-light bg-transparent text-[15px] md:text-[20px] outline-none text-black placeholder-black"
        placeholder="Phone*"
        required
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded z-10">
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={country.flag} alt={country.code} className="w-5 h-3 mr-2" />
              <span className="text-sm text-black">{country.name}</span>
              <span className="ml-auto text-xs text-gray-500">{country.dialCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;