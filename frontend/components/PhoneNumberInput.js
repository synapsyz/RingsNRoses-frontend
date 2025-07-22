"use client";

import { useState, useEffect, useRef } from "react";

// Country data sorted alphabetically by name
const COUNTRY_DATA = [
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'American Samoa', code: '+1-684', flag: '🇦🇸' },
    { name: 'Andorra', code: '+376', flag: '🇦🇩' },
    { name: 'Angola', code: '+244', flag: '🇦🇴' },
    { name: 'Anguilla', code: '+1-264', flag: '🇦🇮' },
    { name: 'Antarctica', code: '+672', flag: '🇦🇶' },
    { name: 'Antigua and Barbuda', code: '+1-268', flag: '🇦🇬' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Armenia', code: '+374', flag: '�🇲' },
    { name: 'Aruba', code: '+297', flag: '🇦🇼' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' },
    { name: 'Bahamas', code: '+1-242', flag: '🇧🇸' },
    { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
    { name: 'Barbados', code: '+1-246', flag: '🇧🇧' },
    { name: 'Belarus', code: '+375', flag: '🇧🇾' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Belize', code: '+501', flag: '🇧🇿' },
    { name: 'Benin', code: '+229', flag: '🇧🇯' },
    { name: 'Bermuda', code: '+1-441', flag: '🇧🇲' },
    { name: 'Bhutan', code: '+975', flag: '🇧🇹' },
    { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', code: '+387', flag: '🇧🇦' },
    { name: 'Botswana', code: '+267', flag: '🇧🇼' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'British Virgin Islands', code: '+1-284', flag: '🇻🇬' },
    { name: 'Brunei', code: '+673', flag: '🇧🇳' },
    { name: 'Bulgaria', code: '+359', flag: '🇧🇬' },
    { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
    { name: 'Burundi', code: '+257', flag: '🇧🇮' },
    { name: 'Cambodia', code: '+855', flag: '🇰🇭' },
    { name: 'Cameroon', code: '+237', flag: '🇨🇲' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Cape Verde', code: '+238', flag: '🇨🇻' },
    { name: 'Central African Republic', code: '+236', flag: '🇨🇫' },
    { name: 'Chad', code: '+235', flag: '🇹🇩' },
    { name: 'Chile', code: '+56', flag: '🇨🇱' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'Colombia', code: '+57', flag: '🇨🇴' },
    { name: 'Comoros', code: '+269', flag: '🇰🇲' },
    { name: 'Congo, Democratic Republic of the (Zaire)', code: '+243', flag: '🇨🇩' },
    { name: 'Congo, Republic of the', code: '+242', flag: '🇨🇬' },
    { name: 'Cook Islands', code: '+682', flag: '🇨🇰' },
    { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
    { name: 'Croatia', code: '+385', flag: '🇭🇷' },
    { name: 'Cuba', code: '+53', flag: '🇨🇺' },
    { name: 'Curaçao', code: '+599', flag: '🇨🇼' },
    { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
    { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
    { name: 'Dominica', code: '+1-767', flag: '🇩🇲' },
    { name: 'Dominican Republic', code: '+1-809', flag: '🇩🇴' },
    { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'El Salvador', code: '+503', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
    { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
    { name: 'Estonia', code: '+372', flag: '🇪🇪' },
    { name: 'Eswatini', code: '+268', flag: '🇸🇿' },
    { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
    { name: 'Falkland Islands', code: '+500', flag: '🇫🇰' },
    { name: 'Faroe Islands', code: '+298', flag: '🇫🇴' },
    { name: 'Fiji', code: '+679', flag: '🇫🇯' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'French Guiana', code: '+594', flag: '🇬🇫' },
    { name: 'French Polynesia', code: '+689', flag: '🇵🇫' },
    { name: 'Gabon', code: '+241', flag: '🇬🇦' },
    { name: 'Gambia', code: '+220', flag: '🇬🇲' },
    { name: 'Georgia', code: '+995', flag: '🇬🇪' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'Ghana', code: '+233', flag: '🇬🇭' },
    { name: 'Gibraltar', code: '+350', flag: '🇬🇮' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'Greenland', code: '+299', flag: '🇬🇱' },
    { name: 'Grenada', code: '+1-473', flag: '🇬🇩' },
    { name: 'Guadeloupe', code: '+590', flag: '🇬🇵' },
    { name: 'Guam', code: '+1-671', flag: '🇬🇺' },
    { name: 'Guatemala', code: '+502', flag: '🇬🇹' },
    { name: 'Guinea', code: '+224', flag: '🇬🇳' },
    { name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼' },
    { name: 'Guyana', code: '+592', flag: '🇬🇾' },
    { name: 'Haiti', code: '+509', flag: '🇭🇹' },
    { name: 'Honduras', code: '+504', flag: '🇭🇳' },
    { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
    { name: 'Hungary', code: '+36', flag: '🇭🇺' },
    { name: 'Iceland', code: '+354', flag: '🇮🇸' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Iran', code: '+98', flag: '🇮🇷' },
    { name: 'Iraq', code: '+964', flag: '🇮🇶' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'Israel', code: '+972', flag: '🇮🇱' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Ivory Coast', code: '+225', flag: '🇨🇮' },
    { name: 'Jamaica', code: '+1-876', flag: '🇯🇲' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'Jordan', code: '+962', flag: '🇯🇴' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Kiribati', code: '+686', flag: '🇰🇮' },
    { name: 'Kosovo', code: '+383', flag: '🇽🇰' },
    { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
    { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬' },
    { name: 'Laos', code: '+856', flag: '🇱🇦' },
    { name: 'Latvia', code: '+371', flag: '🇱🇻' },
    { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
    { name: 'Lesotho', code: '+266', flag: '🇱🇸' },
    { name: 'Liberia', code: '+231', flag: '🇱🇷' },
    { name: 'Libya', code: '+218', flag: '🇱🇾' },
    { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' },
    { name: 'Lithuania', code: '+370', flag: '🇱🇹' },
    { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
    { name: 'Macau', code: '+853', flag: '🇲🇴' },
    { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
    { name: 'Malawi', code: '+265', flag: '🇲🇼' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
    { name: 'Maldives', code: '+960', flag: '🇲🇻' },
    { name: 'Mali', code: '+223', flag: '🇲🇱' },
    { name: 'Malta', code: '+356', flag: '🇲🇹' },
    { name: 'Marshall Islands', code: '+692', flag: '🇲🇭' },
    { name: 'Martinique', code: '+596', flag: '🇲🇶' },
    { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
    { name: 'Mauritius', code: '+230', flag: '🇲🇺' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'Micronesia', code: '+691', flag: '🇫🇲' },
    { name: 'Moldova', code: '+373', flag: '🇲🇩' },
    { name: 'Monaco', code: '+377', flag: '🇲🇨' },
    { name: 'Mongolia', code: '+976', flag: '🇲🇳' },
    { name: 'Montenegro', code: '+382', flag: '🇲🇪' },
    { name: 'Montserrat', code: '+1-664', flag: '🇲🇸' },
    { name: 'Morocco', code: '+212', flag: '🇲🇦' },
    { name: 'Mozambique', code: '+258', flag: '🇲🇿' },
    { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
    { name: 'Namibia', code: '+264', flag: '🇳🇦' },
    { name: 'Nauru', code: '+674', flag: '🇳🇷' },
    { name: 'Nepal', code: '+977', flag: '🇳🇵' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'New Caledonia', code: '+687', flag: '🇳🇨' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
    { name: 'Nicaragua', code: '+505', flag: '🇳🇮' },
    { name: 'Niger', code: '+227', flag: '🇳🇪' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
    { name: 'Niue', code: '+683', flag: '🇳🇺' },
    { name: 'North Korea', code: '+850', flag: '🇰🇵' },
    { name: 'North Macedonia', code: '+389', flag: '🇲🇰' },
    { name: 'Northern Mariana Islands', code: '+1-670', flag: '🇲🇵' },
    { name: 'Norway', code: '+47', flag: '🇳🇴' },
    { name: 'Oman', code: '+968', flag: '🇴🇲' },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
    { name: 'Palau', code: '+680', flag: '🇵🇼' },
    { name: 'Palestine', code: '+970', flag: '🇵🇸' },
    { name: 'Panama', code: '+507', flag: '🇵🇦' },
    { name: 'Papua New Guinea', code: '+675', flag: '🇵🇬' },
    { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
    { name: 'Peru', code: '+51', flag: '🇵🇪' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭' },
    { name: 'Poland', code: '+48', flag: '🇵🇱' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Puerto Rico', code: '+1-939', flag: '🇵🇷' },
    { name: 'Qatar', code: '+974', flag: '🇶🇦' },
    { name: 'Reunion', code: '+262', flag: '🇷🇪' },
    { name: 'Romania', code: '+40', flag: '🇷🇴' },
    { name: 'Russia', code: '+7', flag: '🇷🇺' },
    { name: 'Rwanda', code: '+250', flag: '🇷🇼' },
    { name: 'Saint Helena', code: '+290', flag: '🇸🇭' },
    { name: 'Saint Kitts and Nevis', code: '+1-869', flag: '🇰🇳' },
    { name: 'Saint Lucia', code: '+1-758', flag: '🇱🇨' },
    { name: 'Saint Pierre and Miquelon', code: '+508', flag: '🇵🇲' },
    { name: 'Saint Vincent and the Grenadines', code: '+1-784', flag: '🇻🇨' },
    { name: 'Samoa', code: '+685', flag: '🇼🇸' },
    { name: 'San Marino', code: '+378', flag: '🇸🇲' },
    { name: 'Sao Tome and Principe', code: '+239', flag: '🇸🇹' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
    { name: 'Senegal', code: '+221', flag: '🇸🇳' },
    { name: 'Serbia', code: '+381', flag: '🇷🇸' },
    { name: 'Seychelles', code: '+248', flag: '🇸🇨' },
    { name: 'Sierra Leone', code: '+232', flag: '🇸🇱' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'Slovakia', code: '+421', flag: '🇸🇰' },
    { name: 'Slovenia', code: '+386', flag: '🇸🇮' },
    { name: 'Solomon Islands', code: '+677', flag: '🇸🇧' },
    { name: 'Somalia', code: '+252', flag: '🇸🇴' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
    { name: 'Sudan', code: '+249', flag: '🇸🇩' },
    { name: 'Suriname', code: '+597', flag: '🇸🇷' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Syria', code: '+963', flag: '🇸🇾' },
    { name: 'Taiwan', code: '+886', flag: '🇹🇼' },
    { name: 'Tajikistan', code: '+992', flag: '🇹🇯' },
    { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭' },
    { name: 'Timor-Leste', code: '+670', flag: '🇹🇱' },
    { name: 'Togo', code: '+228', flag: '🇹🇬' },
    { name: 'Tokelau', code: '+690', flag: '🇹🇰' },
    { name: 'Tonga', code: '+676', flag: '🇹🇴' },
    { name: 'Trinidad and Tobago', code: '+1-868', flag: '🇹🇹' },
    { name: 'Tunisia', code: '+216', flag: '🇹🇳' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷' },
    { name: 'Turkmenistan', code: '+993', flag: '🇹🇲' },
    { name: 'Turks and Caicos Islands', code: '+1-649', flag: '🇹🇨' },
    { name: 'Tuvalu', code: '+688', flag: '🇹🇻' },
    { name: 'U.S. Virgin Islands', code: '+1-340', flag: '🇻🇮' },
    { name: 'Uganda', code: '+256', flag: '🇺🇬' },
    { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
    { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Uruguay', code: '+598', flag: '🇺🇾' },
    { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
    { name: 'Vanuatu', code: '+678', flag: '🇻🇺' },
    { name: 'Venezuela', code: '+58', flag: '🇻🇪' },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
    { name: 'Wallis and Futuna', code: '+681', flag: '🇼🇫' },
    { name: 'Yemen', code: '+967', flag: '🇾🇪' },
    { name: 'Zambia', code: '+260', flag: '🇿🇲' },
    { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
].sort((a, b) => a.name.localeCompare(b.name));


export default function PhoneNumberInput({ phoneNumber, onPhoneNumberChange, selectedCountry, onCountryChange }) {
    const [filteredCountries, setFilteredCountries] = useState(COUNTRY_DATA);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Effect to handle clicking outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Effect to filter countries based on search term
    useEffect(() => {
        if (searchTerm) {
            setFilteredCountries(
                COUNTRY_DATA.filter(country =>
                    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    country.code.includes(searchTerm)
                )
            );
        } else {
            setFilteredCountries(COUNTRY_DATA);
        }
    }, [searchTerm]);


    const handleCountrySelect = (country) => {
        onCountryChange(country);
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Phone Number:
            </label>
            <div className="flex">
                <button
                    type="button"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:ring-gray-700 dark:text-white dark:border-neutral-600"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedCountry.flag} {selectedCountry.code}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <input
                    type="tel"
                    id="phone-input"
                    className="w-full p-2 border border-s-0 border-gray-300 rounded-e-lg shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => onPhoneNumberChange(e.target.value)}
                />
            </div>

            {isDropdownOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search country..."
                            className="py-2 px-3 block w-full border border-gray-300 rounded-md focus:border-[#E91E63] focus:ring-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <ul>
                        {filteredCountries.map((country) => (
                            <li
                                key={country.code + country.name}
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200"
                                onClick={() => handleCountrySelect(country)}
                            >
                                <span className="mr-2">{country.flag}</span>
                                {country.name} ({country.code})
                            </li>
                        ))}
                        {filteredCountries.length === 0 && (
                            <li className="px-4 py-2 text-gray-500 dark:text-neutral-400">No countries found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
