import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import CTAButton from "../HomePage/Button";

const LearningLanguageSection = () => {
    return (
        <div className="mt-24 flex flex-col items-center mb-24">
            <div className="text-center font-semibold text-4xl mt-7">
                Your Swiss Knife for
                <HighlightText text={"Learning any Language"} />
            </div>
            <div className="text-center text-lg w-[70%]">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom
                schedule and more.
            </div>
            <div className="flex flex-row items-center">
                <img src={knowYourProgress} className="object-contain -mr-32" />
                <img src={compareWithOthers} className="object-contain -mr-32" />
                <img src={planYourLessons} />
            </div>
            <CTAButton active={true}>Learn More</CTAButton>
        </div>
    );
};

export default LearningLanguageSection;
