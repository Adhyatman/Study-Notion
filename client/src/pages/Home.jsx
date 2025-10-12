import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import instructor from "../assets/Images/Instructor.png";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const sections = ["New to Coding", "Most Popular", "Skills Paths", "Career Paths"];

const Home = () => {
    return (
        <div className="w-[100%] flex flex-col items-center bg-richblack-900">
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

            {/*Section 2 */}
            <div className="flex flex-col items-center justify-center gap-7 w-11/12 mb-36">
                <div className="flex flex-col items-center">
                    <div className="text-center font-semibold text-4xl mt-7 text-white">
                        Unlock the
                        <HighlightText text={"Power of Code"} />
                    </div>
                    <div className="mt-2 w-[90%] font-bold text-center text-xl text-richblack-300">
                        Learn to build anything you can imagine
                    </div>
                </div>
                {/* <div className="flex flex-row justify-between px-1 items-center text-richblack-300  rounded-full py-1 shadow-[0_1px_0_0_#ffffff] bg-richblack-800 font-semibold gap-9 ">
                    <div className="rounded-full bg-richblack-900 py-2 px-7 text-white font-bold">Free</div>
                    <div className="flex gap-9">
                        {sections.map((element, index) => {
                            return (
                                <div
                                    className="rounded-full py-2 px-5 hover:bg-richblack-900 transition-all duration-200 hover:text-white"
                                    key={index}
                                >
                                    {element}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-[100%] text-white mt-7  relative">
                    <div className="w-full flex flex-row absolute justify-between gap-20">
                        <LessonCards
                            isActive={selected === 1}
                            title={"Learn HTML"}
                            description={
                                "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."
                            }
                            lessonCount={6}
                            courseLevel={"Beginner"}
                            onClick={() => setSelected(1)}
                        />
                        <LessonCards
                            isActive={selected === 2}
                            title={"Learn CSS"}
                            description={
                                "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"
                            }
                            lessonCount={6}
                            courseLevel={"Beginner"}
                            onClick={() => setSelected(2)}
                        />
                        <LessonCards
                            isActive={selected === 3}
                            title={"Responsive Web Design"}
                            description={
                                "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"
                            }
                            lessonCount={6}
                            courseLevel={"Beginner"}
                            onClick={() => setSelected(3)}
                        />
                    </div>
                </div> */}
                <ExploreMore />
            </div>

            {/*Section 3*/}
            <div className="bg-pure-greys-5 text-richblack-700 justify-center items-center pb-3">
                <div className="homepage_bg">
                    <div className="w-11/12  flex items-center justify-center gap-5 mx-auto">
                        <div className="flex flex-row text-white gap-7 mt-[250px]">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div className="flex items-center gap-3">Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-11/12 flex flex-col items-center justify-center gap-11 mt-[95px]">
                    <div className="flex flex-row gap-14 ">
                        <div className="text-4xl font-semibold w-[50%]">
                            Get the Skills you need for a <HighlightText text={"Job that is in demand"} />
                        </div>
                        <div className="flex flex-col font-inter w-[45%] items-start text-lg gap-8">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than
                            professional skills.
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <TimelineSection />
                <LearningLanguageSection />
            </div>

            {/*Section 4*/}
            <div className="flex flex-row justify-center items-center gap-x-20 mt-16 w-[90%]">
                <div className="w-[40%]">
                    <img className="shadow-[-14px_-14px_0_0_#ffffff]" src={instructor} />
                </div>
                <div className="w-[50%] gap-y-7 flex flex-col items-start">
                    <div className="text-center font-semibold text-4xl mt-7 text-white">
                        Become An
                        <HighlightText text={"Instructor"} />
                    </div>
                    <div className="mt-2 w-[90%] font-inter text-start text-1xl text-richblack-300">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to
                        teach what you love.
                    </div>
                    <div className="w-[40%]">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-3">
                                Start Teaching Today <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            {/*Footer*/}
            <Footer />
        </div>
    );
};

export default Home;
