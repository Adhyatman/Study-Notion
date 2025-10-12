import React from "react";
import { ImTree } from "react-icons/im";

const LessonCards = ({ title, description, onClick, isActive, courseLevel, lessonCount }) => {
    return (
        <div
            className={`flex flex-col h-[300px] ${isActive ? "bg-white shadow-[14px_14px_0_0_#CFAB08]" : "bg-richblack-800"}`}
            onClick={onClick}
        >
            <div className="h-[75%] p-5 gap-y-3 flex flex-col">
                <h1 className={`text-2xl ${isActive ? "font-semibold text-black" : "font-bold text-white"}`}>{title}</h1>
                <p className="text-richblack-600">{description}</p>
            </div>
            <div
                className={`border-t-4 border-dashed border-richblack-700 flex flex-row justify-between h-[25%] items-center p-5 ${
                    isActive ? "text-blue-400" : "text-richblack-600"
                }`}
            >
                <span>{courseLevel}</span>
                <span className="flex flex-row gap-3">
                    <ImTree />
                    {lessonCount} Lesson
                </span>
            </div>
        </div>
    );
};

export default LessonCards;
