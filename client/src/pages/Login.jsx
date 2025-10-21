import React from "react";
import Template from "../components/core/SignupAndLogin/Template";
import image from "../assets/Images/login.webp";

const Login = () => {
    const title = "Welcome Back";
    return (
        <div className="w-full flex items-center">
            <Template title={title} type={"login"} image={image} />
        </div>
    );
};

export default Login;
