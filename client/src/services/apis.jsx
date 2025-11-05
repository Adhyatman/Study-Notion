const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

//AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

//PROFILE ENDPOINTS
//STUDENTS ENDPOINTS
//COURSE ENDPOINTS
//RATINGS AND REVIEWS ENDPOINTS

//CATEGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CATALOG PAGE DATA
//CONTACT US API
//SETINGS PAGE API
