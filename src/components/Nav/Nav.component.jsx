import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMobileMenuActive } from "../../Store/Store";
import "./Nav.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Questions", path: "/questions" },
  { name: "Exam", path: "/exam/all" },
  { name: "Login", path: "/login" },
];

const Nav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { mobileMenuActive, actionMobileMenuActive } = useMobileMenuActive(
    (state) => state
  );
  return (
    <div className="fixed w-full py-0 shadow-sm bg-pale-sky">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-semibold uppercase text-midnight-blue"
            >
              <span className="special-font">E .</span> Exam
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden h-full space-x-6 md:flex">
            {navItems.map(({ name, path }, i) => (
              <Link
                onClick={() => setActiveIndex(i)}
                key={i}
                className={`link ${activeIndex === i ? "active" : ""}`}
                to={path}
              >
                {name}
              </Link>
            ))}
          </div>
          {/* Mobile humburger button */}
          <button
            onClick={() => {
              actionMobileMenuActive(!mobileMenuActive);
            }}
            className="text-2xl transition-all duration-75 text-vibrant-blue active:text-color-active md:hidden"
          >
            {mobileMenuActive ? <MdCancel /> : <CiMenuBurger />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuActive && (
          <div className="flex flex-col items-center py-3 space-y-2 md:hidden">
            {navItems.map(({ name, path }, i) => (
              <Link key={i} className="link" to={path}>
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
