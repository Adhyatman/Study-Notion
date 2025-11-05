import React from "react";
import Template from "../components/core/Auth/Template";
import image from "../assets/Images/signup.webp";

const Signup = () => {
    const title = "Join the millions learning to code with StudyNotion for free";
    return (
        <div className="w-full  flex justify-between items-center">
            <Template title={title} type={"SignUp"} image={image} />
        </div>
    );
};

export default Signup;
