import React from "react";
import frame from "../../../assets/Images/frame.png";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
const Template = (props) => {
    const desc1 = "Build skills for today, tomorrows, and beyond.";
    const desc2 = "Education to future-proof your career.";
    return (
        <div className="text-white flex flex-row justify-between items-center mt-16  w-full">
            <div className=" w-[60%] flex flex-col justify-center items-start pl-20 pr-40 ">
                <h1 className="text-2xl font-bold text-white">{props.title}</h1>
                <p className="text-lg text-white mt-3">{desc1}</p>
                <p className="font-edu-sa text-lg text-blue-200 mb-7">{desc2}</p>
                {props.type === "SignUp" ? <SignUpForm /> : <LoginForm />}
            </div>
            <div className="w-[50%]  relative flex justify-center">
                <img src={frame} className="w-[65%]" />
                <img src={props.image} className="w-[65%] absolute top-[-15px] left-[90px]" />
            </div>
        </div>
    );
};

export default Template;
