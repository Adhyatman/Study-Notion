import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="w-[100%]">
            {/*Section 1*/}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-[0_1px_0_0_#ffffff] hover:shadow-none">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className="text-center font-semibold text-4xl mt-7">
                    Empower your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>
                <div className="mt-4 w-[90%] text-center font-extrabold text-1xl text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div className="flex flex-row gap-7 mt-16">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                <div className=" w-[90%] mt-14 shadow-[0_0_70px_#7EC0D9]">
                    <video muted autoPlay loop className="shadow-[14px_14px_0_0_#ffffff]">
                        <source src={Banner} />
                    </video>
                </div>
                {/*code section 1*/}
                <div className="mt-10 flex flex-col ">
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            text: "Try It Yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            text: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeBlock={`<<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is MyPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a> </nav>\n</body>`}
                        codeColor={"text-yellow-25"}
                        numberOfCodeLines={10}
                        bgGradient={"bg-yellow-500"}
                    />
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start
                                <HighlightText text={"coding in \nseconds"} />
                            </div>
                        }
                        subHeading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            text: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            text: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeBlock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport {FaArrowRight} from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div> Home </div>\n)\n}\nexport default Home;`}
                        codeColor={"text-white"}
                        // numberOfCodeLines={11}
                        bgGradient={"bg-blue-500"}
                    />
                </div>
            </div>
            {/*Section 2*/}
            {/*Section 3*/}
            {/*Section 4*/}
            {/*Footer*/}
            <Footer />
        </div>
    );
};

export default Home;
