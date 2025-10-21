import React, { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { FaCaretDown, FaRegUserCircle } from "react-icons/fa";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useOutsideClick(menuRef, () => setIsOpen(false));
    // if (!user) return null;
    return (
        <button className="relative" onClick={() => setIsOpen(true)}>
            <div className="h-[40px] w-[40px] bg-red-400 rounded-full flex justify-center items-center">
                <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[30px] rounded-full object-cover" />
                <FaCaretDown className="text-sm text-richblack-100" />
            </div>
            {isOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                    ref={menuRef}
                >
                    <Link to="/dashboard/my-profile" onClick={() => setIsOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                            // dispatch(logout(navigate));
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </div>
            )}
        </button>
    );
};

export default ProfileDropDown;

{
    /*
    import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import useOutsideClick from "../hooks/useOutsideClick";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setIsOpen(false));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-2xl text-gray-700"
      >
        <FaUserCircle />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-[9999] p-2"
        >
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Profile
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
     
*/
}

{
    /* {token!==null && (
                    <Link to="/">
                        <button
                            className="border-1 border-white py-2 px-3 rounded-xl"
                            onClick={() => {
                                setLoggedIn(false);
                            }}
                        >
                            Logout
                        </button>
                    </Link>
                )}
                {token!=null && (
                    <Link to="/Dashboard">
                        <button className="border-1 border-white py-2 px-3 rounded-xl">Dashboard</button>
                    </Link>
                )} */
}
