import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };
    return (
        <div className="flex items-center justify-center text-richblack-500 h-screen w-11/12 p-3">
            {loading ? (
                <div className="h-fit w-4/12 gap-3">Loading...</div>
            ) : (
                <div className="h-fit w-4/12 gap-3">
                    <h1 className="text-xl font-semibold text-white">{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>
                    <p className="text-[15px] mt-2">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`}
                    </p>
                    <form className="mt-3 w-full" onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label>
                                <p className="text-[15px]">Email Address</p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    className="bg-richblack-500 rounded-lg flex items-center p-2 w-full text-white text-[15px] mt-3"
                                />
                            </label>
                        )}
                        <button type="submit" className="w-full flex items-center p-2 rounded-lg bg-amber-300 text-black mt-5">
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>
                    <div className="mt-5 text-white">
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
