import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";

import { ImTree } from "react-icons/im";

const ExploreMore = () => {
    const [selectedTab, setSelectedTab] = useState(HomePageExplore[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [selectedCard, setSelectedCard] = useState(HomePageExplore[0].courses[0]);
    return (
        <div className="w-11/12 flex flex-col items-center">
            <div className="flex flex-row justify-between px-1 items-center text-richblack-300  rounded-full py-1 shadow-[0_1px_0_0_#ffffff] bg-richblack-800 font-semibold gap-3 ">
                {HomePageExplore.map((Element, index) => {
                    return (
                        <div
                            className={`rounded-full py-2 px-5 hover:bg-richblack-700 transition-all duration-200 hover:text-white ${
                                Element === selectedTab ? "bg-richblack-900" : ""
                            }`}
                            key={index}
                            onClick={() => {
                                setSelectedTab(Element);
                                setCourses(Element.courses);
                                setSelectedCard(Element.courses[0]);
                            }}
                        >
                            {Element.tag}
                        </div>
                    );
                })}
            </div>
            <div className="w-[100%] text-white mt-10  relative">
                <div className="w-full flex flex-row absolute justify-between gap-20">
                    {courses.map((course, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-col h-[300px] ${
                                    course === selectedCard ? "bg-white shadow-[14px_14px_0_0_#CFAB08]" : "bg-richblack-800"
                                }`}
                                onClick={() => setSelectedCard(course)}
                            >
                                <div className="h-[75%] p-5 gap-y-3 flex flex-col">
                                    <h1
                                        className={`text-2xl ${
                                            course === selectedCard ? "font-semibold text-black" : "font-bold text-white"
                                        }`}
                                    >
                                        {course.heading}
                                    </h1>
                                    <p className="text-richblack-600">{course.description}</p>
                                </div>
                                <div
                                    className={`border-t-4 border-dashed border-richblack-700 flex flex-row justify-between h-[25%] items-center p-5 ${
                                        course === selectedCard ? "text-blue-400" : "text-richblack-600"
                                    }`}
                                >
                                    <span>{course.level}</span>
                                    <span className="flex flex-row gap-3">
                                        <ImTree />
                                        {course.lessionNumber} Lesson
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExploreMore;
