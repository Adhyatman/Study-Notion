import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.category);
        } catch (error) {
            console.log("Could not fetch the categories list");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubLinks();
    }, []);

    useEffect(() => {
        console.log("result: ", subLinks[0]?.name);
    }, [subLinks]);

    {
        /* these two lines are to be removed */
    }
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };
    return (
        <div className="flex flex-row text-white px-10 py-2 font-inter items-center justify-between bg-richblack-900 border-b-[1px] border-amber-50 z-[100]">
            <Link to="/">
                <img src={logo} alt="Logo" className="w-40" />
            </Link>
            <div className="flex flex-row w-fit gap-20 font-semibold">
                {
                    <Link to="/">
                        <button className={`${matchRoute("/") ? "text-yellow-25" : "text-richblack-25"}`}>Home</button>
                    </Link>
                }
                {
                    <div className="flex gap-2 relative cursor-pointer group">
                        <p>Catalog</p>
                        <FaAngleDown className="flex items-center" />
                        <div className="rotate-45 bg-white absolute h-[25px] w-[25px] rounded-sm translate-x-15 translate-y-7 transition-all duration-100 invisible opacity-0 group-hover:visible group-hover:opacity-100">
                            {" "}
                        </div>
                        <div className="absolute w-[300px] bg-white p-2 flex flex-col transition-all duration-300 translate-y-10 translate-x-[-20px] rounded-lg invisible opacity-0 group-hover:visible group-hover:opacity-100">
                            {subLinks.map((category, index) => {
                                return (
                                    <Link
                                        className="rounded-lg px-4 w-full flex hover:bg-richblack-300 py-2 text-md text-start text-black "
                                        key={index}
                                        to={`catalog/${category.name}`}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                }
                {
                    <Link to="/about">
                        <button className={`${matchRoute("/about") ? "text-yellow-25" : "text-richblack-25"}`}>About</button>
                    </Link>
                }
                {}
                {
                    <Link to="/contact">
                        <button className={`${matchRoute("/contact") ? "text-yellow-25" : "text-richblack-25"}`}>Contacts</button>
                    </Link>
                }
            </div>
            <div className="w-fit gap-3 flex flex-row items-center">
                {user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                        <AiOutlineShoppingCart className=" w-[25px] h-auto" />
                        {totalItems > 0 && (
                            <span className="rounded-full bg-red-500 text-white absolute w-[15px] h-[15px] text-[10px] text-center top-[-7px] left-[14px]">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                )}

                {token === null && (
                    <Link to="/Login">
                        <button className="bg-richblack-800 py-2 px-3 rounded-xl">Login</button>
                    </Link>
                )}
                {token === null && (
                    <Link to="/Signup">
                        <button className="bg-richblack-800 py-2 px-3 rounded-xl">Signup</button>
                    </Link>
                )}
                {token !== null && <ProfileDropDown />}
                {/* <ProfileDropDown /> */}
            </div>
        </div>
    );
};

export default Navbar;
