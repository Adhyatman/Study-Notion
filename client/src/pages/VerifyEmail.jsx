import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth);

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    };
    return (
        <div className="flex items-center justify-center text-richblack-500 h-screen w-11/12 p-3">
            {loading ? (
                <div className="h-fit w-4/12 gap-3 justify-center items">Loading...</div>
            ) : (
                <div className="h-fit w-4/12 gap-3">
                    <h1 className="text-xl font-semibold text-white">Verify Email</h1>
                    <p className="text-[15px] mt-2">A verification code has been sent to your email. Please enter the code below</p>
                    <form className="mt-3 w-full" onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                            // className="w-full"
                        />
                        <button type="submit" className="w-full flex items-center p-2 rounded-lg bg-amber-300 text-black mt-5">
                            Verify Email
                        </button>
                    </form>
                    <div className="w-full mt-5 flex flex-row justify-between p-2">
                        <div className="text-white">
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email))} className="text-blue-200">
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
