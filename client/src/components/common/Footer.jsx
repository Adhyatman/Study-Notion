import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const companySection = FooterLink2.find((item) => item.title === "Company");
    const resourcesSection = FooterLink2.find((item) => item.title === "Resources");
    const supportSection = FooterLink2.find((item) => item.title === "Support");
    const plansSection = FooterLink2.find((item) => item.title === "Plans");
    const communitySection = FooterLink2.find((item) => item.title === "Community");
    const subjectsSection = FooterLink2.find((item) => item.title === "Subjects");
    const languagesSection = FooterLink2.find((item) => item.title === "Languages");
    const careerBuildingSection = FooterLink2.find((item) => item.title === "Career building");
    return (
        <div className="w-[100%] flex flex-col bg-richblack-800 p-3 items-center text-richblack-600 font-inter mt-16">
            {/* part 1 */}
            <div className="w-[100%] flex p-10 ">
                <div className="w-[50%] flex justify-evenly">
                    <div className="w-[25%] flex flex-col gap-y-3">
                        <img src={logo} alt="Studnotion Logo" className="w-5xl" />
                        <span className="font-semibold text-lg text-richblack-200">Company</span>
                        {companySection.links.map((link, index) => (
                            <span key={index} className="hover:text-richblack-200">
                                {link}
                            </span>
                        ))}
                        {/* Social Media Logos */}
                        <div className="flex gap-x-3 py-3">
                            <FaFacebook size={25} />
                            <FaGoogle size={25} />
                            <FaTwitter size={25} />
                            <FaYoutube size={25} />
                        </div>
                    </div>
                    <div className="w-[25%] flex flex-col gap-y-3">
                        <span className="font-semibold text-lg text-richblack-200">Resources</span>
                        {resourcesSection.links.map((link, index) => (
                            <span key={index} className="hover:text-richblack-200">
                                {link}
                            </span>
                        ))}
                        <span className="font-semibold text-lg mt-3 text-richblack-200">Support</span>
                        {supportSection.links.map((link, index) => (
                            <span key={index} className="hover:text-richblack-200">
                                {link}
                            </span>
                        ))}
                    </div>

                    <div className="w-[25%] flex flex-col gap-y-3 gap-x-60">
                        <span className="font-semibold text-lg text-richblack-200">Plans</span>
                        {plansSection.links.map((link, index) => (
                            <span key={index} className="hover:text-richblack-200">
                                {link}
                            </span>
                        ))}
                        <span className="font-semibold text-lg mt-3 text-richblack-200">Community</span>
                        {communitySection.links.map((link, index) => (
                            <span key={index} className="hover:text-richblack-200">
                                {link}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="w-[50%] flex justify-evenly border-l-1 border-richblack-400">
                    <div className="w-[25%] flex flex-col gap-y-3 gap-x-20">
                        <span className="font-semibold text-lg text-richblack-200">Subjects</span>
                        {subjectsSection.links.map((link, index) => (
                            <a key={index} href={link.link} className="hover:text-richblack-200">
                                {link.title}
                            </a>
                        ))}
                    </div>
                    <div className="w-[25%] flex flex-col gap-y-3 gap-x-20">
                        <span className="font-semibold text-lg text-richblack-200">Languages</span>
                        {languagesSection.links.map((link, index) => (
                            <a key={index} href={link.link} className="hover:text-richblack-200">
                                {link.title}
                            </a>
                        ))}
                    </div>
                    <div className="w-[25%] flex flex-col gap-y-3 gap-x-20">
                        <span className="font-semibold text-lg text-richblack-200">Career Building</span>
                        {careerBuildingSection.links.map((link, index) => (
                            <a key={index} href={link.link} className="hover:text-richblack-200">
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* part 2 */}
            <div className="w-[90%] flex justify-between p-12 border-t-1 border-richblack-400">
                <div>
                    <span className="border-r-1 px-3 hover:text-richblack-200">Privacy Policy</span>
                    <span className="border-r-1 px-3 hover:text-richblack-200">Cookie Policy</span>
                    <span className=" px-3 ">Terms</span>
                </div>
                <div>
                    <span>Made by Adhyatman</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
