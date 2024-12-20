import gsap from "gsap";
import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CountDown from "../../components/CountDown/CountDown.jsx";
import QCart from "../../components/QCart/QCart.jsx";
import { useExamStore } from "../../Store/ExamStore.js";
import {
  useCarousel,
  usePdfModal,
  useQuestionPrompt,
} from "../../Store/Store.js";

const StartExam = () => {
  const { addQuestions, questions } = useQuestionPrompt((state) => state);
  const { exam } = useExamStore((state) => state);
  const { currentIndex, setCurrentIndex, left, right } = useCarousel(
    (state) => state
  );
  const { isPOpen, openPModal, closePModal } = usePdfModal((state) => state);

  useEffect(() => {
    gsap.fromTo(
      ".carousel-slide",
      { opacity: 0, x: 500, duration: 0.5, ease: "power2.inOut" },
      { opacity: 1, x: 0 }
    );
  }, [currentIndex]);

  return (
    <div className="flex flex-col">
      {exam?.totalTime && <CountDown />}
      <div className="flex items-center justify-center">
        <div className="w-3/4 space-y-4 md:w-2/4">
          {exam && (
            <div className="carousel-slide">
              <QCart
                index={currentIndex}
                key={currentIndex}
                {...exam.questions[currentIndex]}
              />
            </div>
          )}

          <div className="flex flex-row justify-evenly">
            <button
              disabled={left}
              onClick={() => setCurrentIndex(currentIndex - 1, "Left")}
              className={`btn-1 ${left && "!bg-slate-400"}`}
            >
              <FaArrowLeft />
            </button>
            <button
              disabled={right}
              onClick={() => setCurrentIndex(currentIndex + 1, "Right")}
              className={`btn-1 ${right && "!bg-slate-400"}`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Link
          to="/pdf"
          className="relative px-4 py-2 overflow-hidden transition-all ease-out border-2 border-blue-500 rounded-md group "
        >
          <span className="relative z-[5] transition-all duration-500 group-hover:text-white">
            Submit
          </span>
          <span className="absolute inset-0 z-0 w-0 h-full transition-all duration-500 origin-top bg-gradient-to-b from-blue-500 to-blue-700 group-hover:w-full "></span>
        </Link>
      </div>
    </div>
  );
};

export default StartExam;
