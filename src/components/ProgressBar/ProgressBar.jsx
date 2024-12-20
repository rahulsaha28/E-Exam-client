import gsap from "gsap";
import React, { useEffect } from "react";

const ProgressBar = ({ type }) => {
  switch (type) {
    case "big":
      useEffect(() => {
        gsap.fromTo(
          "#big",
          {
            width: "0%",
            delay: 0,
          },
          {
            width: "100%",
            duration: 1,
            delay: 0.2,
            ease: "power2.inOut",

            repeat: -1,
          }
        );
      }, []);
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-1/2 h-10 p-2 shadow-md md:w-1/4 bg-slate-800 rounded-2xl">
            <div
              id="big"
              className="bg-blue-400 w-[0%] h-full rounded-lg"
            ></div>
          </div>
        </div>
      );
    case "small":
      return (
        <div className="flex items-center justify-center mr-1">
          <div className="w-6 h-6 p-[1px] border-4 border-t-4 border-solid rounded-full border-t-blue-500 animate-spin "></div>
        </div>
      );
    default:
      return <div>Loading...</div>;
  }
};

export default ProgressBar;
