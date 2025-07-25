"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head';
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios"; // Import axios
import AsyncSelect from "react-select/async"; // Import AsyncSelect
import LocationSelector from "@/components/LocationSelector";
import GoogleLoginButton from '@/components/GoogleLoginButton';

let isNgrok
isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? false
    : true
let api_url;
const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_APP_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl()
// Axios instance for backend communicatio1n
const api = axios.create({
    baseURL: api_url + "/api/v1", // Adjust this to your backend API base URL
},
    {
        headers: {
            ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' })
        }
    });

// Wedding roles mapping for the backend (assuming numerical IDs)
const WEDDING_ROLES = [
    { label: "Bride", value: 1, emoji: "👰", svg: "" },
    { label: "Groom", value: 2, emoji: "🤵", svg: "" },
    { label: "Guest", value: 3, emoji: "🎉", svg: "" },
    { label: "Family", value: 4, emoji: "👨‍👩‍👧‍👦", svg: "" },
    { label: "Friend", value: 5, emoji: "🤝", svg: "" },
];

// List of countries with flags and codes for phone number dropdown
const COUNTRY_DATA = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
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
    // Add the rest of your countries here if needed for the phone dropdown
].sort((a, b) => a.name.localeCompare(b.name));


export default function Signup() {
    const router = useRouter();
    const { data: session, status } = useSession();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // Change this to your desired page
        }
    }, [status, router]);


    const [email, setemailError] = useState(null);
    const [phoneExist, setphoneError] = useState(null);
    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Separate state for phone number and country code
    const [selectedPhoneCountryCode, setSelectedPhoneCountryCode] = useState({ code: '+91', name: 'India', flag: '🇮🇳' }); // Default to India
    const [phoneNumber, setPhoneNumber] = useState('');

    // State for wedding role
    const [selectedRole, setSelectedRole] = useState(WEDDING_ROLES[2]); // Default to Guest (value: 3)

    // States for location selector (using react-select/async directly)
    const [selectedLocation, setSelectedLocation] = useState(null); // Stores { label, value } of selected location
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationDetails, setLocationDetails] = useState(null);


    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [minWeddingDate, setMinWeddingDate] = useState("");
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        numbers: false,
        specialCharacters: false,
    });
    const [visibleRules, setVisibleRules] = useState({
        minLength: true,
        lowercase: true,
        uppercase: true,
        numbers: true,
        specialCharacters: true,
    });

    // Country code dropdown states and refs
    const [countries, setCountries] = useState([]); // For the phone number country dropdown
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const countryInputRef = useRef(null); // Ref for the phone number input itself

    const MIN_PASSWORD_LENGTH = 8;

    useEffect(() => {
        // Theme logic
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark", "bg-gray-900", "text-white");
            root.classList.remove("bg-white", "text-gray-900");
        } else {
            root.classList.remove("dark", "bg-gray-900", "text-white");
            root.classList.add("bg-white", "text-gray-900");
        }
        localStorage.setItem("theme", theme);

        // Password Strength Logic
        const checkPasswordStrength = () => {
            const newRules = {
                minLength: formData.password.length >= MIN_PASSWORD_LENGTH,
                lowercase: /[a-z]/.test(formData.password),
                uppercase: /[A-Z]/.test(formData.password),
                numbers: /\d/.test(formData.password),
                specialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~` ]/.test(formData.password),
            };
            setPasswordRules(prevRules => {
                const updatedVisibleRules = { ...visibleRules };
                for (const rule in newRules) {
                    if (newRules[rule] && !prevRules[rule]) {
                        setTimeout(() => {
                            setVisibleRules(prevVisible => ({
                                ...prevVisible,
                                [rule]: false,
                            }));
                        }, 1000);
                    } else if (!newRules[rule] && prevRules[rule]) {
                        updatedVisibleRules[rule] = true;
                    }
                }
                setVisibleRules(updatedVisibleRules);
                return newRules;
            });
        };
        checkPasswordStrength();

        // Set Minimum Wedding Date in YYYY-MM-DD format for the 'min' attribute
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDateForMinAttribute = `${year}-${month}-${day}`;
        setMinWeddingDate(formattedDateForMinAttribute);

        // Initialize countries for phone dropdown
        setCountries(COUNTRY_DATA);
        setFilteredCountries(COUNTRY_DATA);

        // Click outside to close phone country dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formData.password, theme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    // Handle form input changes for name, email, password, wedding_date
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle role selection (radio buttons)
    const handleRoleChange = (e) => {
        const roleValue = parseInt(e.target.value);
        setSelectedRole(WEDDING_ROLES.find((role) => role.value === roleValue));
    };

    // Handle search input change for phone country dropdown
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
    // Handle country selection for phone number
    const handlePhoneCountrySelect = (country) => {
        setSelectedPhoneCountryCode(country);
        setIsDropdownOpen(false);
        setSearchTerm('');
        setFilteredCountries(countries);
        countryInputRef.current?.focus(); // Focus back on phone input after selection
    };

    // Get the full phone number to send to backend
    const getFullPhoneNumber = () => {
        return selectedPhoneCountryCode.code + phoneNumber;
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: getFullPhoneNumber(),
            };

            const res = await api.post("/signup/customer/", payload, {
                headers: {
                    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
                },
            });

            console.log("Signup success:", res.data);

            // ✅ Immediately log them in using next-auth
            const loginRes = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
                user_type: "customer", // or "vendor" based on form
            });

            if (loginRes.ok) {
                router.push("/"); // Redirect to home or dashboard
            } else {
                setError("Login failed after signup.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Signup failed. Please try again.");
            const errorData = err?.response?.data;

            if (errorData && typeof errorData === 'object') {
                const errorKeys = Object.keys(errorData);
                const errorValues = Object.values(errorData);

                if (errorKeys.includes('email')) {
                    const index = errorKeys.indexOf('email');
                    setemailError(errorValues[index]?.[0] || 'Invalid email');
                }

                if (errorKeys.includes('phone')) {
                    const index = errorKeys.indexOf('phone');
                    setphoneError(errorValues[index]?.[0] || 'Invalid phone');
                }

                setError(
                    errorData?.detail ||
                    errorData?.message ||
                    'Signup failed. Please check your inputs.'
                );
                console.error("Signup error:", errorData);
            } else {
                // fallback for unexpected error structure
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderColor: theme === 'dark' ? '#4A5568' : '#D1D5DB', // gray-700 / gray-300
            backgroundColor: theme === 'dark' ? 'transparent' : '#FFFFFF', // transparent / white
            color: theme === 'dark' ? '#E2E8F0' : '#1A202C', // neutral-300 / gray-900
            '&:hover': {
                borderColor: theme === 'dark' ? '#6B46C1' : '#6366F1', // indigo-500 hover
            },
            boxShadow: 'none',
            minHeight: '48px', // Adjust height to match other inputs
            padding: '0 8px',
            borderRadius: '8px',
        }),
        input: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#E2E8F0' : '#1A202C', // neutral-300 / gray-900
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#E2E8F0' : '#1A202C', // neutral-300 / gray-900
        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#6B7280', // white/60 / gray-400
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF', // gray-800 / white
            borderColor: theme === 'dark' ? '#4A5568' : '#D1D5DB', // gray-700 / gray-300
            borderRadius: '8px',
            zIndex: 9999, // Ensure dropdown appears above other content
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? (theme === 'dark' ? '#4A5568' : '#E0E7FF') // gray-700 / indigo-100
                : (theme === 'dark' ? '#2D3748' : '#FFFFFF'), // gray-800 / white
            color: state.isSelected
                ? (theme === 'dark' ? '#E2E8F0' : '#FFFFFF') // neutral-300 / white
                : (theme === 'dark' ? '#E2E8F0' : '#1A202C'), // neutral-300 / gray-900
            '&:active': {
                backgroundColor: theme === 'dark' ? '#6B46C1' : '#4C51BF', // indigo-600 active
            },
            cursor: 'pointer',
        }),
    };

    return (
        <>
            <Head>
                <title>RingsNRoses Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-full flex-1">
                {/* Your header content would go here */}

                <main
                    id="content"
                    className="w-full lg:w-2/5 h-screen overflow-y-auto bg-white dark:bg-gray-900"
                >
                    <div className="mt-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="space-y-8">
                                <form onSubmit={handleSignup}>
                                    <div className="flex items-center justify-center space-x-3 flex-nowrap">
                                        <img
                                            alt="Your Company"
                                            src="./Logo.png"
                                            className="h-12 w-auto" // slightly smaller image if needed
                                        />
                                        <h1 className="font-medium text-2xl text-gray-800 dark:text-neutral-200 whitespace-nowrap">
                                            Create an account
                                        </h1>
                                    </div>

                                    {/* Button Group */}
                                    <GoogleLoginButton userType="customer" />
                                    {/* End Button Group */}

                                    <div className="mt-4 mb-4 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Or</div>
                                    <div className="space-y-5">
                                        <div className="space-y-3">
                                            {/* Name Input */}
                                            <div>
                                                <input
                                                    type="text"
                                                    className="mt-3 py-2 sm:py-2.5 px-3 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                    placeholder="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            {/* Email Input */}
                                            <div>
                                                <label htmlFor="hs-pro-shcafem" className="sr-only">
                                                    Email
                                                </label>
                                                <input
                                                    id="hs-pro-shcafem"
                                                    type="email"
                                                    className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {email && (
                                                    <p className="text-sm text-red-600 mt-1">{email}</p>
                                                )}
                                            </div>

                                            {/* Strong Password */}
                                            <div>
                                                <label htmlFor="hs-pro-shcafpw" className="sr-only">
                                                    Password
                                                </label>
                                                <div className='relative'>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        id="hs-pro-shcafpw"
                                                        className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                        minLength={MIN_PASSWORD_LENGTH}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                                    >
                                                        {showPassword ? (
                                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                                <line x1="2" x2="22" y1="2" y2="22" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Password rules */}
                                                <div id="hs-pro-shcafpw-hints" className="mt-2">
                                                    <ul className="space-y-2 text-xs text-gray-500 dark:text-neutral-500">
                                                        {/* Min Length Rule */}
                                                        {visibleRules.minLength && (
                                                            <li className={`${passwordRules.minLength ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                                {passwordRules.minLength ? (
                                                                    <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                ) : (
                                                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                                                )}
                                                                <span className="text-gray-500 dark:text-neutral-200">Minimum {MIN_PASSWORD_LENGTH} characters</span>
                                                            </li>
                                                        )}

                                                        {/* Lowercase Rule */}
                                                        {visibleRules.lowercase && (
                                                            <li className={`${passwordRules.lowercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                                {passwordRules.lowercase ? (
                                                                    <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                ) : (
                                                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                                                )}
                                                                <span className="text-gray-500 dark:text-neutral-200">Contain lowercase</span>
                                                            </li>
                                                        )}

                                                        {/* Uppercase Rule */}
                                                        {visibleRules.uppercase && (
                                                            <li className={`${passwordRules.uppercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                                {passwordRules.uppercase ? (
                                                                    <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                ) : (
                                                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                                                )}
                                                                <span className="text-gray-500 dark:text-neutral-200">Contain uppercase</span>
                                                            </li>
                                                        )}

                                                        {/* Numbers Rule */}
                                                        {visibleRules.numbers && (
                                                            <li className={`${passwordRules.numbers ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                                {passwordRules.numbers ? (
                                                                    <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                ) : (
                                                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                                                )}
                                                                <span className="text-gray-500 dark:text-neutral-200">Contain numbers</span>
                                                            </li>
                                                        )}

                                                        {/* Special Characters Rule */}
                                                        {visibleRules.specialCharacters && (
                                                            <li className={`${passwordRules.specialCharacters ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                                {passwordRules.specialCharacters ? (
                                                                    <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                ) : (
                                                                    <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                                                )}
                                                                <span className="text-gray-500 dark:text-neutral-200">
                                                                    Contain special characters like ~!@$%etc...
                                                                </span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- Phone Number Input with Custom Dropdown --- */}
                                        <div className="relative mt-3" ref={dropdownRef}>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-400 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    {selectedPhoneCountryCode.flag} {selectedPhoneCountryCode.code}
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
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    ref={countryInputRef}
                                                    required // Make phone number required
                                                />
                                            </div>
                                            {phoneExist && (
                                                <p className="text-sm text-red-600 mt-1">{phoneExist}</p>
                                            )}
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
                                                                key={country.code + country.name}
                                                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200"
                                                                onClick={() => handlePhoneCountrySelect(country)}
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

                                    </div>

                                    <div className="space-y-5">


                                        <div className="pt-3 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            {/* Checkbox */}
                                            <div className="flex gap-x-1">
                                                <input
                                                    type="checkbox"
                                                    className="shrink-0 border-gray-300 size-4.5 rounded-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-offset-gray-800"
                                                    id="hs-pro-shcaftac"
                                                    required
                                                    style={{
                                                        accentColor: '#E91E63',
                                                    }}
                                                />

                                                <label htmlFor="hs-pro-shcaftac" className="text-sm text-gray-500 ms-1.5 dark:text-neutral-400">
                                                    I accept the
                                                    <a
                                                        className="ml-1 text-sm hover:underline focus:outline-hidden text-gray-500 dark:text-neutral-500"
                                                        href="#"
                                                        style={{ color: '#E91E63' }}
                                                        onMouseOver={(e) => (e.currentTarget.style.color = '#D81B60')} // hover
                                                        onMouseOut={(e) => (e.currentTarget.style.color = '#E91E63')}   // reset after hover
                                                        onFocus={(e) => (e.currentTarget.style.color = '#C2185B')}     // focus
                                                        onBlur={(e) => (e.currentTarget.style.color = '#E91E63')}      // reset after focus
                                                    >
                                                        Terms and Conditions
                                                    </a>

                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg dark:bg-red-800/20 dark:border-red-900 dark:text-red-500" role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <div className="mt-4 space-y-4">
                                        <button
                                            type="submit"
                                            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 sm:text-sm font-medium rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
                                            style={{
                                                backgroundColor: loading ? '#D81B60' : '#E91E63', // optional darker shade on loading
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#D81B60'; // hover color
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = loading ? '#D81B60' : '#E91E63'; // normal color
                                            }}
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                                                    ></path>
                                                </svg>
                                            )}
                                            {loading ? '' : 'Create account'}
                                        </button>


                                        <p className="text-center text-sm text-gray-500 dark:text-neutral-500">
                                            Already have an account?
                                            <Link
                                                className="ml-1 text-[13px] hover:underline focus:outline-hidden"
                                                href="/login"
                                                style={{ color: '#E91E63' }}
                                                onMouseOver={(e) => (e.currentTarget.style.color = '#D81B60')} // hover color
                                                onMouseOut={(e) => (e.currentTarget.style.color = '#E91E63')}   // normal color
                                                onFocus={(e) => (e.currentTarget.style.color = '#C2185B')}     // focus color
                                                onBlur={(e) => (e.currentTarget.style.color = '#E91E63')}      // reset after focus
                                            >
                                                Log in
                                            </Link>

                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>



                <div className="hidden lg:block relative justify-center items-center w-full h-full">
                    <div className="mt-28 ml-32 w-[650px] h-[350px] rounded-3xl overflow-hidden">
                        <video
                            src="./Signup_video.mp4" // Replace with your actual video path
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                    <footer>
                        <div className="mt-16 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1">
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                                <Link href="/vendor/signup" className="hover:underline">Register your business</Link>
                                <Link href="#" className="hover:underline">Contact us</Link>
                                <Link href="#" className="hover:underline">Terms & privacy</Link>
                                <Link href="#" className="hover:underline">Your Privacy Choices</Link>
                                <Link href="#" className="hover:underline">About us</Link>
                            </div>
                            <div className="flex items-center justify-center gap-x-2 mt-2">
                                <p className="text-gray-500 text-sm dark:text-neutral-500">© {new Date().getFullYear()} RingsNRoses</p>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="text-xs text-gray-500 dark:text-neutral-500 hover:underline flex items-center justify-center space-x-1"
                                >
                                    {theme === "dark" ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                            </svg>
                                            <span>Dark Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="4" />
                                                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                            </svg>
                                            <span>Light Mode</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </footer>


                </div>

            </div>
            {/* <footer>
                <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <Link href="/vendor/signup" className="hover:underline">Register your business</Link>
                        <Link href="#" className="hover:underline">Contact us</Link>
                        <Link href="#" className="hover:underline">Terms & privacy</Link>
                        <Link href="#" className="hover:underline">Your Privacy Choices</Link>
                        <Link href="#" className="hover:underline">About us</Link>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 mt-2">
                        <p className="text-gray-500 text-sm dark:text-gray-400">© {new Date().getFullYear()} RingsNRoses</p>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:underline flex items-center justify-center space-x-1"
                        >
                            {theme === "dark" ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                    </svg>
                                    <span>Dark Mode</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                    </svg>
                                    <span>Light Mode</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <div className="mt-4"></div>
            </footer> */}
        </>
    );
}