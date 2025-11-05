import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }
    function submitHandler(event) {
        event.preventDefault();
        console.log(formData);
        dispatch(login(email, password, navigate));
    }
    return (
        <form onSubmit={submitHandler} className=" w-[70%] mb-7">
            <label className="flex flex-col gap-3 mb-3">
                <div className="flex flex-row gap-1">
                    <p>Email Address</p>
                    <div className="text-red-500">*</div>
                </div>
                <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    id="email"
                    placeholder="Enter Email ID"
                    onChange={changeHandler}
                    className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                />
            </label>

            <label className="flex flex-col gap-3 mb-3">
                <div className="flex flex-row gap-1">
                    <p>Password</p>
                    <div className="text-red-500">*</div>
                </div>
                <div className="relative flex items-center">
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        id="password"
                        placeholder="Enter Password"
                        onChange={changeHandler}
                        className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] w-full"
                    ></input>
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-[330px] top-[10px] transform translate-y-1/2"
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <p className="text-end text-blue-200">Forgot Password?</p>
            </label>

            <button type="submit" className="w-full bg-amber-400 rounded-[7px] p-3 text-black">
                Sign In
            </button>
        </form>
    );
};

export default LoginForm;
