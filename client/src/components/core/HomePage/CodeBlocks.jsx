import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({ position, heading, subHeading, ctabtn1, ctabtn2, codeBlock, bgGradient, codeColor, numberOfCodeLines }) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10 w-[100%]`}>
            {/*section 1*/}
            <div className="w-[50%] flex flex-col gap-8 whitespace-pre-line">
                {heading}
                <div className="text-richblack-300 font-bold">{subHeading}</div>
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.text}
                    </CTAButton>
                </div>
            </div>

            {/*section 2*/}
            <div className="w-[40%] ">
                <div className={`${bgGradient} blur-3xl rounded-4xl h-[150px] w-[300px] absolute opacity-40`}></div>
                <div className="flex ring-2 ring-pure-greys-600 w-[100%] p-2 bg-richblack-800 ">
                    {/* Bg gradient homework */}
                    <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold gap-y-0.5">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <div className={`w-[90%] font-bold font-mono flex flex-col gap-2 ${codeColor} pr-2`}>
                        <TypeAnimation
                            sequence={[codeBlock, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            wrapper="pre"
                            className="leading-relaxed"
                            style={{ minWidth: "400px", display: "block", whiteSpace: "pre-wrap" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
