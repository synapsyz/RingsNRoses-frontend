"use client";
import Head from 'next/head';
import { useState, useEffect, useRef } from "react"; // Import useRef
import Link from "next/link";
import axios from "axios"; // Import axios
import AsyncSelect from "react-select/async"; // Import AsyncSelect
import { useRouter } from "next/navigation";
let api_url;
const getApiUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl()
// Axios instance for backend communication
const api = axios.create({
    baseURL: api_url+"/api/v1", // Adjust this to your backend API base URL
});
export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [email, setemailError] = useState(null);
    const [phoneExist, setphoneError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        business_name: "",
    });


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                business_name: formData.business_name,
                phone: getFullPhoneNumber(),


            };
            const res = await api.post("/signup/vendor/", payload);

            const { access, refresh, email, user_id } = res.data;
            sessionStorage.setItem("accessToken", access);
            sessionStorage.setItem("refreshToken", refresh);
            sessionStorage.setItem("user_email", email);
            sessionStorage.setItem("user_id", user_id);

            router.push("/dashboard"); // Use Next.js router for navigation
        } catch (err) {
            console.error("Signup error:", err.response?.data || err.message);
            let errorKey = Object.keys(err)
            let errorValue = Object.values(err)
            if(errorKey.includes('email')){
                let index = errorKey.indexOf('email')
                setemailError(errorValue[index][0])
            }
            if(errorKey.includes('phone')){
                let index = errorKey.indexOf('phone')
                setphoneError(errorValue[index][0])
            }
            // Display a more user-friendly error message
            setError(err.response?.data?.detail || err.response?.data?.message || "Signup failed. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    // const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ code: '+91', name: 'India', flag: '🇮🇳' }); // Default to India
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
    const [theme, setTheme] = useState("light");

    const dropdownRef = useRef(null); // Ref for the dropdown container
    const countryInputRef = useRef(null); // Ref for the country search input
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
    const [acceptTerms, setAcceptTerms] = useState(false); // State for the "Terms and Conditions" checkbox

    const MIN_PASSWORD_LENGTH = 8;
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
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark", "bg-gray-900", "text-white");
            root.classList.remove("bg-white", "text-gray-900");
        } else {
            root.classList.remove("dark", "bg-gray-900", "text-white");
            root.classList.add("bg-white", "text-gray-900");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

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
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchTerm(''); // Clear search term on selection
        setFilteredCountries(countries); // Reset filtered countries
        countryInputRef.current?.focus(); // Focus back on the phone number input if desired
    };
 const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                <title>Business Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex flex-col lg:flex-row">

                {/* ========== MAIN CONTENT ========== */}
                <aside className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between p-6 dark:bg-gray-900 h-screen sticky top-0">
                    {/* Sidebar */}
                    <div className="hidden min-h-screen lg:w-100 xl:w-107.5bg-gray-100 lg:flex flex-col justify-between p-6 dark:bg-gray-900">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            {/* Logo */}
                            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="/" aria-label="Preline">
                                <svg className="w-9 h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clip-rule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor" />
                                    <path fillRule="evenodd" clip-rule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor" />
                                    <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor" />
                                </svg>
                            </a>
                            {/* End Logo */}

                            {/* Language Select */}

                            {/* End Language Select */}
                        </div>
                        {/* End Header */}

                        {/* Body */}
  <div className='mt-6'>
  <img
    src="20250524_154914.png"
    alt="Charts Mockups"
  />
  <hr className="mt-4 border-t border-gray-300" />
</div>


                        {/* End Body */}

                        {/* Footer */}
                        <div className="flex justify-center gap-x-8">


                        </div>
                        {/* End Footer */}
                    </div>
                    {/* End Sidebar */}
                </aside>
                {/* Content */}
                <main className="mt-16 flex-1 flex justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto h-screen">
                    <div className="max-w-md w-full space-y-8">
                        {/* Title */}
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                                Set up your Business account
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                Expand your wedding business with RingsNRoses
                            </p>
                        </div>
                        {/* End Title */}

                        {/* Button Group */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button type="button" className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-gray-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                <svg className="shrink-0 size-4" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_4132_5805)">
                                        <path d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z" fill="#4285F4" />
                                        <path d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z" fill="#34A853" />
                                        <path d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.65520 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z" fill="#FBBC05" />
                                        <path d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z" fill="#EB4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4132_5805">
                                            <rect width="32" height="32" fill="white" transform="translate(0.937439)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                        {/* End Button Group */}

                        <div className="flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Or</div>

                        <form onSubmit={handleSignup}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="hs-pro-dalfn" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Name
                                    </label>
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
                                <div>
                                    <label htmlFor="hs-pro-dappcn" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Business name
                                    </label>
<input
                                                    type="text"
                                                    className="mt-3 py-2 sm:py-2.5 px-3 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                    placeholder="Name"
                                                    name="business_name"
                                                    value={formData.business_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                    {/* <input type="text" id="hs-pro-dappcn"
                                        value={formData.business_name}
                                        onChange={handleChange}
                                        required
                                        className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="Acmecorp" /> */}
                                </div>
                                <div>
                                    <label htmlFor="hs-pro-dale" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
                                    {/* <input type="email" id="hs-pro-dale"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="you@email.com" /> */}
                                </div>

                                {/* Password Input and Rules */}
                                <div className="space-y-3">
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
                                    </div>

                                    {/* Password Rules */}
                                    <div id="hs-pro-dappnp-hints" className="mt-2">
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
                                {/* End Password Input and Rules */}

                                <div className="relative mt-3" ref={dropdownRef}>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-400 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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


                                {/* Terms and Conditions Checkbox */}
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="checkbox"
                                        className="shrink-0 border-gray-200 size-3.5 rounded-sm text-blue-600 focus:ring-offset-0 dark:bg-neutral-800 dark:checked:bg-blue-500 dark:border-neutral-700"
                                        id="hs-pro-dsftac"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <label htmlFor="hs-pro-dsftac" className="text-sm text-gray-800 dark:text-neutral-200">
                                        I accept the
                                        <a className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 hover:text-blue-700 decoration-2 hover:underline dark:text-blue-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                                {/* End Terms and Conditions Checkbox */}

                                <button
                                    type="submit"
                                    className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                                    disabled={!passwordRules.minLength || !passwordRules.lowercase || !passwordRules.uppercase || !passwordRules.numbers || !passwordRules.specialCharacters || !acceptTerms}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="flex justify-center text-sm text-gray-500 dark:text-neutral-500">
                            Have an Business account?
                            <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium focus:outline-hidden focus:underline dark:text-blue-500" href="/vendor/login">
                                Sign in
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </a>
                        </p>
                    </div>

                    {/* End Content */}
                </main>
            </div>
            <footer>
                <div className="mt-8 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1 gap-x-8">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <a href="/vendor/signup" className="hover:underline">Register your business</a>
                        <a href="#" className="hover:underline">Contact us</a>
                        <a href="#" className="hover:underline">Terms & privacy</a>
                        <a href="#" className="hover:underline">Your Privacy Choices</a>
                        <a href="#" className="hover:underline">About us</a>
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
            </footer>
        </>
    );
}