import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        mode: "student",
        firstName: "",
        lastName: "",
        email: "",
        createPassword: "",
        confirmPassword: "",
    });
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }
    function submitHandler(event) {
        event.preventDefault();
        console.log(formData);
        navigate("/Login");
    }
    return (
        <form onSubmit={submitHandler} className=" w-full mb-7">
            <div className="bg-richblack-700 rounded-2xl w-fit flex flex-row justify-between p-1 mb-7">
                <button
                    className={`py-2 px-6  rounded-2xl ${formData.mode === "student" ? "bg-richblack-900" : "bg-richblack-700"}`}
                    onClick={() =>
                        setFormData((prevData) => ({
                            ...prevData,
                            mode: "student",
                        }))
                    }
                    type="button"
                >
                    Student
                </button>
                <button
                    className={`py-2 px-6  rounded-2xl ${formData.mode === "instructor" ? "bg-richblack-900" : "bg-richblack-700"}`}
                    onClick={() =>
                        setFormData((prevData) => ({
                            ...prevData,
                            mode: "instructor",
                        }))
                    }
                    type="button"
                >
                    Instructor
                </button>
            </div>
            <div className="flex flex-row gap-3">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>First Name</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        id="firstName"
                        placeholder="Enter First Name"
                        onChange={changeHandler}
                        className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>

                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Last Name</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        id="lastName"
                        placeholder="Enter Last Name"
                        onChange={changeHandler}
                        className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>
            </div>
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

            <div className="flex flex-row gap-3">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Create Password</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <div className="relative flex flex-row items-center">
                        <input
                            required
                            type={showCreatePassword ? "text" : "password"}
                            name="createPassword"
                            value={formData.createPassword}
                            id="createPassword"
                            placeholder="Enter Password"
                            onChange={changeHandler}
                            className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] w-full"
                        />
                        <span
                            onClick={() => setShowCreatePassword(!showCreatePassword)}
                            className="absolute transform translate-y-1/2 top-[10px] left-[220px]"
                        >
                            {showCreatePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                </label>

                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Confirm Password</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <div className="relative flex flex-row items-center">
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={changeHandler}
                            className="bg-richblack-500 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] w-full"
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute transform translate-y-1/2 top-[10px] left-[220px]"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                </label>
            </div>
            <button type="submit" className="w-full bg-amber-400 rounded-[7px] p-3 text-black mt-5">
                Create Account
            </button>
        </form>
    );
};

export default SignUpForm;
