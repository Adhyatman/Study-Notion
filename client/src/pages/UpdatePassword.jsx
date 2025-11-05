import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const { password, confirmPassword } = formData;
    const handleOnChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const resetPasswordToken = location.pathname.split("/").at(-1).trim();
        console.log(resetPasswordToken);
        dispatch(resetPassword(password, confirmPassword, resetPasswordToken));
    };
    return (
        <div className="flex items-center justify-center text-richblack-500 h-screen w-11/12 p-3">
            {loading ? (
                <div className="h-fit w-4/12 gap-3 justify-center items">Loading...</div>
            ) : (
                <div className="h-fit w-4/12 gap-3">
                    <h1 className="text-xl font-semibold text-white">Choose New Password</h1>
                    <p className="text-[15px] mt-2">Almost done, Enter your New Password and you're all set</p>
                    <form className="mt-3 w-full" onSubmit={handleOnSubmit}>
                        <label>
                            <p className="text-[15px]">New Password</p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Your New Password"
                                className="bg-richblack-500 rounded-lg flex items-center p-2 w-full text-white text-[15px] mt-3"
                            />
                            <span onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />}
                            </span>
                        </label>
                        <label>
                            <p className="text-[15px]">Confirm Password</p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm New Password"
                                className="bg-richblack-500 rounded-lg flex items-center p-2 w-full text-white text-[15px] mt-3"
                            />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {showConfirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />}
                            </span>
                        </label>
                        <button type="submit" className="w-full flex items-center p-2 rounded-lg bg-amber-300 text-black mt-5">
                            Reset Password
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

export default UpdatePassword;
