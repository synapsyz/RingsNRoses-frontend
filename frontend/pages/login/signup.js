"use client";

import Head from 'next/head';
import { signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [password, setPassword] = useState("");
    const [minWeddingDate, setMinWeddingDate] = useState("");
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        numbers: false,
        specialCharacters: false,
    });

    // New states for country code dropdown
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ code: '+91', name: 'India', flag: '🇮🇳' }); // Default to India
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input

    const dropdownRef = useRef(null); // Ref for the dropdown container
    const countryInputRef = useRef(null); // Ref for the country search input

    const MIN_PASSWORD_LENGTH = 8;

    // List of countries with flags and codes
    const COUNTRY_DATA = [
        { name: 'United States', code: '+1', flag: '🇺🇸' },
        { name: 'Canada', code: '+1', flag: '🇨🇦' }, // Canada also uses +1
        { name: 'Russia', code: '+7', flag: '🇷🇺' },
        { name: 'Egypt', code: '+20', flag: '🇪🇬' },
        { name: 'South Africa', code: '+27', flag: '🇿🇦' },
        { name: 'Greece', code: '+30', flag: '🇬🇷' },
        { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
        { name: 'Belgium', code: '+32', flag: '🇧🇪' },
        { name: 'France', code: '+33', flag: '🇫🇷' },
        { name: 'Spain', code: '+34', flag: '🇪🇸' },
        { name: 'Hungary', code: '+36', flag: '🇭🇺' },
        { name: 'Italy', code: '+39', flag: '🇮🇹' },
        { name: 'Romania', code: '+40', flag: '🇷🇴' },
        { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
        { name: 'Austria', code: '+43', flag: '🇦🇹' },
        { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
        { name: 'Denmark', code: '+45', flag: '🇩🇰' },
        { name: 'Sweden', code: '+46', flag: '🇸🇪' },
        { name: 'Norway', code: '+47', flag: '🇳🇴' },
        { name: 'Poland', code: '+48', flag: '🇵🇱' },
        { name: 'Germany', code: '+49', flag: '🇩🇪' },
        { name: 'Peru', code: '+51', flag: '🇵🇪' },
        { name: 'Mexico', code: '+52', flag: '🇲🇽' },
        { name: 'Cuba', code: '+53', flag: '🇨🇺' },
        { name: 'Argentina', code: '+54', flag: '🇦🇷' },
        { name: 'Brazil', code: '+55', flag: '🇧🇷' },
        { name: 'Chile', code: '+56', flag: '🇨🇱' },
        { name: 'Colombia', code: '+57', flag: '🇨🇴' },
        { name: 'Venezuela', code: '+58', flag: '🇻🇪' },
        { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
        { name: 'Australia', code: '+61', flag: '🇦🇺' },
        { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
        { name: 'Philippines', code: '+63', flag: '🇵🇭' },
        { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
        { name: 'Singapore', code: '+65', flag: '🇸🇬' },
        { name: 'Thailand', code: '+66', flag: '🇹🇭' },
        { name: 'Japan', code: '+81', flag: '🇯🇵' },
        { name: 'South Korea', code: '+82', flag: '🇰🇷' },
        { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
        { name: 'China', code: '+86', flag: '🇨🇳' },
        { name: 'Turkey', code: '+90', flag: '🇹🇷' },
        { name: 'India', code: '+91', flag: '🇮🇳' },
        { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
        { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
        { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
        { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
        { name: 'Iran', code: '+98', flag: '🇮🇷' },
        { name: 'Morocco', code: '+212', flag: '🇲🇦' },
        { name: 'Algeria', code: '+213', flag: '🇩🇿' },
        { name: 'Tunisia', code: '+216', flag: '🇹🇳' },
        { name: 'Libya', code: '+218', flag: '🇱🇾' },
        { name: 'Gambia', code: '+220', flag: '🇬🇲' },
        { name: 'Senegal', code: '+221', flag: '🇸🇳' },
        { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
        { name: 'Mali', code: '+223', flag: '🇲🇱' },
        { name: 'Guinea', code: '+224', flag: '🇬🇳' },
        { name: 'Ivory Coast', code: '+225', flag: '🇨🇮' },
        { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
        { name: 'Niger', code: '+227', flag: '🇳🇪' },
        { name: 'Togo', code: '+228', flag: '🇹🇬' },
        { name: 'Benin', code: '+229', flag: '🇧🇯' },
        { name: 'Mauritius', code: '+230', flag: '🇲🇺' },
        { name: 'Liberia', code: '+231', flag: '🇱🇷' },
        { name: 'Sierra Leone', code: '+232', flag: '🇸🇱' },
        { name: 'Ghana', code: '+233', flag: '🇬🇭' },
        { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
        { name: 'Chad', code: '+235', flag: '🇹🇩' },
        { name: 'Central African Republic', code: '+236', flag: '🇨🇫' },
        { name: 'Cameroon', code: '+237', flag: '🇨🇲' },
        { name: 'Cape Verde', code: '+238', flag: '🇨🇻' },
        { name: 'Sao Tome and Principe', code: '+239', flag: '🇸🇹' },
        { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
        { name: 'Gabon', code: '+241', flag: '🇬🇦' },
        { name: 'Congo, Republic of the', code: '+242', flag: '🇨🇬' },
        { name: 'Congo, Democratic Republic of the (Zaire)', code: '+243', flag: '🇨🇩' },
        { name: 'Angola', code: '+244', flag: '🇦🇴' },
        { name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼' },
        { name: 'Seychelles', code: '+248', flag: '🇸🇨' },
        { name: 'Sudan', code: '+249', flag: '🇸🇩' },
        { name: 'Rwanda', code: '+250', flag: '🇷🇼' },
        { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
        { name: 'Somalia', code: '+252', flag: '🇸🇴' },
        { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
        { name: 'Kenya', code: '+254', flag: '🇰🇪' },
        { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
        { name: 'Uganda', code: '+256', flag: '🇺🇬' },
        { name: 'Burundi', code: '+257', flag: '🇧🇮' },
        { name: 'Mozambique', code: '+258', flag: '🇲🇿' },
        { name: 'Zambia', code: '+260', flag: '🇿🇲' },
        { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
        { name: 'Reunion', code: '+262', flag: '🇷🇪' },
        { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
        { name: 'Namibia', code: '+264', flag: '🇳🇦' },
        { name: 'Malawi', code: '+265', flag: '🇲🇼' },
        { name: 'Lesotho', code: '+266', flag: '🇱🇸' },
        { name: 'Botswana', code: '+267', flag: '🇧🇼' },
        { name: 'Eswatini', code: '+268', flag: '🇸🇿' },
        { name: 'Comoros', code: '+269', flag: '🇰🇲' },
        { name: 'Saint Helena', code: '+290', flag: '🇸🇭' },
        { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
        { name: 'Aruba', code: '+297', flag: '🇦🇼' },
        { name: 'Faroe Islands', code: '+298', flag: '🇫🇴' },
        { name: 'Greenland', code: '+299', flag: '🇬🇱' },
        { name: 'Gibraltar', code: '+350', flag: '🇬🇮' },
        { name: 'Portugal', code: '+351', flag: '🇵🇹' },
        { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
        { name: 'Ireland', code: '+353', flag: '🇮🇪' },
        { name: 'Iceland', code: '+354', flag: '🇮🇸' },
        { name: 'Albania', code: '+355', flag: '🇦🇱' },
        { name: 'Malta', code: '+356', flag: '🇲🇹' },
        { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
        { name: 'Finland', code: '+358', flag: '🇫🇮' },
        { name: 'Bulgaria', code: '+359', flag: '🇧🇬' },
        { name: 'Lithuania', code: '+370', flag: '🇱🇹' },
        { name: 'Latvia', code: '+371', flag: '🇱🇻' },
        { name: 'Estonia', code: '+372', flag: '🇪🇪' },
        { name: 'Moldova', code: '+373', flag: '🇲🇩' },
        { name: 'Armenia', code: '+374', flag: '🇦🇲' },
        { name: 'Belarus', code: '+375', flag: '🇧🇾' },
        { name: 'Andorra', code: '+376', flag: '🇦🇩' },
        { name: 'Monaco', code: '+377', flag: '🇲🇨' },
        { name: 'San Marino', code: '+378', flag: '🇸🇲' },
        { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
        { name: 'Serbia', code: '+381', flag: '🇷🇸' },
        { name: 'Montenegro', code: '+382', flag: '🇲🇪' },
        { name: 'Kosovo', code: '+383', flag: '🇽🇰' },
        { name: 'Croatia', code: '+385', flag: '🇭🇷' },
        { name: 'Slovenia', code: '+386', flag: '🇸🇮' },
        { name: 'Bosnia and Herzegovina', code: '+387', flag: '🇧🇦' },
        { name: 'North Macedonia', code: '+389', flag: '🇲🇰' },
        { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
        { name: 'Slovakia', code: '+421', flag: '🇸🇰' },
        { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' },
        { name: 'Falkland Islands', code: '+500', flag: '🇫🇰' },
        { name: 'Belize', code: '+501', flag: '🇧🇿' },
        { name: 'Guatemala', code: '+502', flag: '🇬🇹' },
        { name: 'El Salvador', code: '+503', flag: '🇸🇻' },
        { name: 'Honduras', code: '+504', flag: '🇭🇳' },
        { name: 'Nicaragua', code: '+505', flag: '🇳🇮' },
        { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
        { name: 'Panama', code: '+507', flag: '🇵🇦' },
        { name: 'Saint Pierre and Miquelon', code: '+508', flag: '🇵🇲' },
        { name: 'Haiti', code: '+509', flag: '🇭🇹' },
        { name: 'Guadeloupe', code: '+590', flag: '🇬🇵' },
        { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
        { name: 'Guyana', code: '+592', flag: '🇬🇾' },
        { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
        { name: 'French Guiana', code: '+594', flag: '🇬🇫' },
        { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
        { name: 'Martinique', code: '+596', flag: '🇲🇶' },
        { name: 'Suriname', code: '+597', flag: '🇸🇷' },
        { name: 'Uruguay', code: '+598', flag: '🇺🇾' },
        { name: 'Curaçao', code: '+599', flag: '🇨🇼' },
        { name: 'Timor-Leste', code: '+670', flag: '🇹🇱' },
        { name: 'Antarctica', code: '+672', flag: '🇦🇶' },
        { name: 'Brunei', code: '+673', flag: '🇧🇳' },
        { name: 'Nauru', code: '+674', flag: '🇳🇷' },
        { name: 'Papua New Guinea', code: '+675', flag: '🇵🇬' },
        { name: 'Tonga', code: '+676', flag: '🇹🇴' },
        { name: 'Solomon Islands', code: '+677', flag: '🇸🇧' },
        { name: 'Vanuatu', code: '+678', flag: '🇻🇺' },
        { name: 'Fiji', code: '+679', flag: '🇫🇯' },
        { name: 'Palau', code: '+680', flag: '🇵🇼' },
        { name: 'Wallis and Futuna', code: '+681', flag: '🇼🇫' },
        { name: 'Cook Islands', code: '+682', flag: '🇨🇰' },
        { name: 'Niue', code: '+683', flag: '🇳🇺' },
        { name: 'Samoa', code: '+685', flag: '🇼🇸' },
        { name: 'Kiribati', code: '+686', flag: '🇰🇮' },
        { name: 'New Caledonia', code: '+687', flag: '🇳🇨' },
        { name: 'Tuvalu', code: '+688', flag: '🇹🇻' },
        { name: 'French Polynesia', code: '+689', flag: '🇵🇫' },
        { name: 'Tokelau', code: '+690', flag: '🇹🇰' },
        { name: 'Micronesia', code: '+691', flag: '🇫🇲' },
        { name: 'Marshall Islands', code: '+692', flag: '🇲🇭' },
        { name: 'North Korea', code: '+850', flag: '🇰🇵' },
        { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
        { name: 'Macau', code: '+853', flag: '🇲🇴' },
        { name: 'Cambodia', code: '+855', flag: '🇰🇭' },
        { name: 'Laos', code: '+856', flag: '🇱🇦' },
        { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
        { name: 'Taiwan', code: '+886', flag: '🇹🇼' },
        { name: 'Maldives', code: '+960', flag: '🇲🇻' },
        { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
        { name: 'Jordan', code: '+962', flag: '🇯🇴' },
        { name: 'Syria', code: '+963', flag: '🇸🇾' },
        { name: 'Iraq', code: '+964', flag: '🇮🇶' },
        { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
        { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
        { name: 'Yemen', code: '+967', flag: '🇾🇪' },
        { name: 'Oman', code: '+968', flag: '🇴🇲' },
        { name: 'Palestine', code: '+970', flag: '🇵🇸' },
        { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
        { name: 'Israel', code: '+972', flag: '🇮🇱' },
        { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
        { name: 'Qatar', code: '+974', flag: '🇶🇦' },
        { name: 'Bhutan', code: '+975', flag: '🇧🇹' },
        { name: 'Mongolia', code: '+976', flag: '🇲🇳' },
        { name: 'Nepal', code: '+977', flag: '🇳🇵' },
        { name: 'Tajikistan', code: '+992', flag: '🇹🇯' },
        { name: 'Turkmenistan', code: '+993', flag: '🇹🇲' },
        { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' },
        { name: 'Georgia', code: '+995', flag: '🇬🇪' },
        { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬' },
        { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
        { name: 'Bahamas', code: '+1-242', flag: '🇧🇸' },
        { name: 'Barbados', code: '+1-246', flag: '🇧🇧' },
        { name: 'Anguilla', code: '+1-264', flag: '🇦🇮' },
        { name: 'Antigua and Barbuda', code: '+1-268', flag: '🇦🇬' },
        { name: 'British Virgin Islands', code: '+1-284', flag: '🇻🇬' },
        { name: 'U.S. Virgin Islands', code: '+1-340', flag: '🇻🇮' },
        { name: 'Bermuda', code: '+1-441', flag: '🇧🇲' },
        { name: 'Grenada', code: '+1-473', flag: '🇬🇩' },
        { name: 'Turks and Caicos Islands', code: '+1-649', flag: '🇹🇨' },
        { name: 'Montserrat', code: '+1-664', flag: '🇲🇸' },
        { name: 'Northern Mariana Islands', code: '+1-670', flag: '🇲🇵' },
        { name: 'Guam', code: '+1-671', flag: '🇬🇺' },
        { name: 'American Samoa', code: '+1-684', flag: '🇦🇸' },
        { name: 'Saint Lucia', code: '+1-758', flag: '🇱🇨' },
        { name: 'Dominica', code: '+1-767', flag: '🇩🇲' },
        { name: 'Saint Vincent and the Grenadines', code: '+1-784', flag: '🇻🇨' },
        { name: 'Dominican Republic', code: '+1-809', flag: '🇩🇴' },
        { name: 'Trinidad and Tobago', code: '+1-868', flag: '🇹🇹' },
        { name: 'Saint Kitts and Nevis', code: '+1-869', flag: '🇰🇳' },
        { name: 'Jamaica', code: '+1-876', flag: '🇯🇲' },
        { name: 'Puerto Rico', code: '+1-939', flag: '🇵🇷' },
    ].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    useEffect(() => {
        // --- Password Strength Logic ---
        const checkPasswordStrength = () => {
            const newRules = {
                minLength: password.length >= MIN_PASSWORD_LENGTH,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                numbers: /\d/.test(password),
                specialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~` ]/.test(password),
            };
            setPasswordRules(newRules);
        };
        checkPasswordStrength();

        // --- Set Minimum Wedding Date in YYYY-MM-DD format for the 'min' attribute ---
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDateForMinAttribute = `${year}-${month}-${day}`;
        setMinWeddingDate(formattedDateForMinAttribute);

        // Initialize countries for dropdown
        setCountries(COUNTRY_DATA);
        setFilteredCountries(COUNTRY_DATA);

        // Click outside to close dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [password]); // Re-run effect whenever password changes or component mounts

    // Handle search input change for countries
    const handleCountrySearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term) {
            setFilteredCountries(
                countries.filter(country =>
                    country.name.toLowerCase().includes(term.toLowerCase()) ||
                    country.code.includes(term)
                )
            );
        } else {
            setFilteredCountries(countries);
        }
    };

    // Handle country selection
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchTerm(''); // Clear search term on selection
        setFilteredCountries(countries); // Reset filtered countries
        countryInputRef.current?.focus(); // Focus back on the phone number input if desired
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    // This function can be called on form submission to get the full number
    const getFullPhoneNumber = () => {
        return selectedCountry.code + phoneNumber;
    };

    // Example of a submit handler (replace with your actual form submission logic)
    const handleSubmit = (event) => {
        event.preventDefault();
        const fullNumber = getFullPhoneNumber();
        console.log("Submitting phone number:", fullNumber);
        // Here you would typically send `fullNumber` to your backend (e.g., Django)
        // You might use a hidden input field or pass it directly via state/context.
    };

    return (
        <>
            <Head>
                <title>RingsNRoses Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-full flex-1">
                {/* ========== HEADER ========== */}
                {/* Your header content would go here */}
                {/* ========== END HEADER ========== */}

                {/* ========== MAIN CONTENT ========== */}
                {/* Adjusted width to w-2/5 (40%) and removed max-w-sm for full width control */}
                <main id="content" className="pb-23 sm:pb-16 w-2/5 flex-grow">
                    <div className="py-10 lg:py-20 w-full px-4 sm:px-6 lg:px-8 mx-auto">
                        <div className="w-full max-w-sm mx-auto"> {/* max-w-sm keeps content centered within its 40% */}
                            {/* Create Account Details */}
                            <div className="space-y-8">
                                <div className="flex items-center justify-center space-x-3">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-10 w-auto"
                                    />
                                    <h1 className="font-medium text-2xl text-gray-800 dark:text-neutral-200">
                                        Create an account
                                    </h1>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-3">
                                        {/* Input */}
                                        <div>
                                            <label htmlFor="hs-pro-shcafem" className="sr-only">
                                                Email
                                            </label>
                                            <input id="hs-pro-shcafem" type="email" className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="Email" />
                                        </div>
                                        {/* End Input */}

                                        {/* Strong Password */}
                                        <div>
                                            <label htmlFor="hs-pro-shcafpw" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="hs-pro-shcafpw"
                                                className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <div id="hs-pro-shcafpw-hints" className="mt-2">
                                                <ul className="space-y-2 text-xs text-gray-500 dark:text-neutral-500">
                                                    {/* Min Length Rule */}
                                                    <li className={`${passwordRules.minLength ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.minLength ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Minimum {MIN_PASSWORD_LENGTH} characters</span>
                                                    </li>

                                                    {/* Lowercase Rule */}
                                                    <li className={`${passwordRules.lowercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.lowercase ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain lowercase</span>
                                                    </li>

                                                    {/* Uppercase Rule */}
                                                    <li className={`${passwordRules.uppercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.uppercase ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain uppercase</span>
                                                    </li>

                                                    {/* Numbers Rule */}
                                                    <li className={`${passwordRules.numbers ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.numbers ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain numbers</span>
                                                    </li>

                                                    {/* Special Characters Rule */}
                                                    <li className={`${passwordRules.specialCharacters ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.specialCharacters ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">
                                                            Contain special characters like ~!@$%etc...
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Strong Password */}
                                    </div>
                                    <div>
                                        <input type="text" className="mt-3 py-2 sm:py-2.5 px-3 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="Name" />
                                    </div>

                                    {/* --- Phone Number Input with Custom Dropdown --- */}
                                    <div className="relative mt-3" ref={dropdownRef}>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-400 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
                                                className="py-2.5 px-3 block w-full border border-s-0 border-gray-400 rounded-e-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="Phone Number"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                ref={countryInputRef} // Assign ref to phone input
                                            />
                                            {/* Hidden input to hold the full phone number for form submission */}
                                            <input type="hidden" name="full_phone_number" value={getFullPhoneNumber()} />
                                        </div>

                                        {isDropdownOpen && (
                                            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-neutral-800 dark:border-neutral-700">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search country..."
                                                        className="py-2 px-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                                        value={searchTerm}
                                                        onChange={handleCountrySearchChange}
                                                    />
                                                </div>
                                                <ul>
                                                    {filteredCountries.map((country) => (
                                                        <li
                                                            key={country.code + country.name} // Unique key
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
                                    {/* --- End Phone Number Input with Custom Dropdown --- */}


                                </div> {/* End of space-y-5 containing email, password, name, phone */}

                                    <div className="space-y-5">
                                       

                                        <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                    <div class="space-y-3">
                        <h4 class="block mb-4 font-medium text-sm text-gray-800 dark:text-neutral-200">
                            Wedding Role
                        </h4>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <div class="flex items-center gap-x-1">
                                <input type="radio" name="role" id="role-bride"
                                    class="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="role-bride" class="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                    Bride
                                </label>
                            </div>

                            <div class="flex items-center gap-x-1 mt-2">
                                <input type="radio" name="role" id="role-groom"
                                    class="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="role-groom" class="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                    Groom
                                </label>
                            </div>

                            <div class="flex items-center gap-x-1 mt-2">
                                <input type="radio" name="role" id="role-guest"
                                    class="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="role-guest" class="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                    Guest
                                </label>
                            </div>

                            <div class="flex items-center gap-x-1 mt-2">
                                <input type="radio" name="role" id="role-family"
                                    class="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-800" />
                                <label htmlFor="role-family" class="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                    Family
                                </label>
                            </div>

                                <div class="md:col-span-2">
                                <div class="flex items-center gap-x-1 md:mx-24 mt-2">
                                    <input type="radio" name="role" id="role-friend"
                                        class="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800" />
                                    <label htmlFor="role-friend" class="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                        Friend
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                                        </div>
 <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            <div className="space-y-3">
                                                <div className="flex justify-between gap-4">
                                                    <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                                        Wedding Date
                                                    </h4>
                                                    <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                                        Location
                                                    </h4>
                                                </div>
                                                {/* Input */}
                                                <div className="flex items-center gap-4">
                                                    {/* Wedding Date */}
                                                    <div className="w-1/2">
                                                        <label htmlFor="hs-pro-shcafbr" className="sr-only">
                                                            Wedding Date
                                                        </label>
                                                        <input
                                                            id="hs-pro-shcafbr"
                                                            type="date"
                                                            className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                            min={minWeddingDate} // This must be YYYY-MM-DD for functionality
                                                        />
                                                        {/* Optional: You could display the formatted date here if needed,
                                                            but the input's 'min' will still be YYYY-MM-DD */}
                                                    </div>

                                                    {/* Location Dropdown Without Arrow */}
                                                    <div className="w-1/2">
                                                        <label htmlFor="loc" className="sr-only">
                                                            Location
                                                        </label>
                                                        <select
                                                            id="loc"
                                                            className="appearance-none py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                        >
                                                            <option value="">Select Location</option>
                                                            <option value="bangalore">Bangalore</option>
                                                            <option value="hyderabad">Hyderabad</option>
                                                            <option value="delhi">Delhi</option>
                                                            <option value="mumbai">Mumbai</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* End Input */}
                                            </div>
                                        </div>
                                        <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            {/* Checkbox */}
                                            <div className="flex gap-x-1">
                                                <input type="checkbox" className="shrink-0 border-gray-300 size-4.5 rounded-sm text-indigo-600 checked:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-neutral-800" id="hs-pro-shcaftac" />
                                                <label htmlFor="hs-pro-shcaftac" className="text-sm text-gray-500 ms-1.5 dark:text-neutral-400">
                                                    I accept the
                                                    <a className="text-sm text-gray-500 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="#">
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>
                                            {/* End Checkbox */}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button type="button" className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 sm:text-sm font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-indigo-700">
                                        Create account
                                    </button>

                                    <p className="text-center text-sm text-gray-500 dark:text-neutral-500">
                                        Already have an account?
                                        <a className="text-[13px] text-indigo-500 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="/login">
                                            Log in
                                        </a>
                                    </p>
                                </div>
                            </div>
                            {/* End Create Account Details */}
                        </div>
                    
                </main>
                {/* ========== END MAIN CONTENT ========== */}

                {/* Adjusted width to w-3/5 (60%) and ensured it's only visible on lg screens and up */}
                <div className="relative hidden w-3/5 flex-shrink lg:block">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        className="absolute inset-0 size-full object-cover"
                    />
                </div>
            </div>
            <footer>
                <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <a href="/vendor/signup" className="hover:underline">Register your business</a>
                        <a href="#" className="hover:underline">Contact us</a>
                        <a href="#" className="hover:underline">Terms & privacy</a>
                        <a href="#" className="hover:underline">Your Privacy Choices</a>
                        <a href="#" className="hover:underline">About us</a>
                    </div>
                    <p className="mt-2">© {new Date().getFullYear()} RingsNRoses</p>
                </div>
                <div className="mt-4"></div>
            </footer>
        </>
    );
}