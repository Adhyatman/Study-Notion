import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";
const timeline = [
    {
        Logo: logo1,
        heading: "Leadership",
        Description: "Fully commited to the success company",
    },
    {
        Logo: logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: logo4,
        heading: "Solve The Problem",
        Description: "Code your way to a solution",
    },
];

const TimelineSection = () => {
    return (
        <div className="flex flex-row gap-15 items-center p-2 mt-15 ">
            {/* Timeline section */}
            <div className="flex flex-col w-[45%]">
                {timeline.map((element, index) => {
                    return (
                        <div className="flex flex-row h-[115px] items-stretch  gap-x-6 px-16 py-4" key={index}>
                            <div className="w-[50px] h-[50px] rounded-full justify-center bg-white flex items-center shadow-xl shadow-richblack-300">
                                <img src={element.Logo} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                <p className="text-base">{element.Description}</p>
                            </div>
                            {index !== timeline.length - 1 && (
                                <div className="absolute ml-6 mt-14 h-[60px] border-l-2 border-dotted border-pure-greys-500 border- ">
                                    {" "}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Image Section */}
            <div className="flex flex-col w-[50%] gap-15">
                <div className=" w-[90%]  shadow-[0_0_70px_#7EC0D9]">
                    <img className="shadow-[14px_14px_0_0_#ffffff]" src={timelineImage} />
                </div>
                <div className="bg-carribeangreen-800 flex flex-row p-4 justify-center w-[500px] absolute mt-[420px] ml-[70px]">
                    <div className="flex items-center gap-10 border-r-1 border-pure-greys-300 pl-4 pr-6">
                        <p className="text-3xl font-bold text-white font-inter">10</p>
                        <p className="text-carribeangreen-400 text-[15px]">YEARS EXPERIENCES</p>
                    </div>
                    <div className="flex items-center gap-10 pl-4">
                        <p className="text-3xl font-bold text-white font-inter">250</p>
                        <p className="text-carribeangreen-400 text-[15px]">TYPES OF COURSES</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;
