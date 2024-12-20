import gsap from "gsap";
import React, { useEffect } from "react";
import { useExamStore } from "../../Store/ExamStore";

const QCart = ({ question, options, index }) => {
  const { addAns, ans, errorCheck, error, exam } = useExamStore(
    (state) => state
  );
  const handelChange = (key, value) => {
    if (ans[key] == undefined) {
      addAns(key, value);
      errorCheck(key);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".option",
      {
        rotate: 260,
        x: 200,
        opacity: 0,
        duration: 1,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        stagger: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h4>
          {index + 1}. {question} ?
        </h4>
        <div className="space-y-2">
          {options &&
            options.map((item, i) => (
              <label
                className={`option flex gap-2 p-2 ${
                  (error[index] == false &&
                    exam.questions[index].ans == i &&
                    "border border-green-500") ||
                  (error[index] == true &&
                    ans[index] == i &&
                    "border border-green-500") ||
                  (error[index] == false &&
                    ans[index] == i &&
                    "border border-red-500")
                }  rounded-md`}
                key={i}
              >
                <input
                  className="hidden peer"
                  type="radio"
                  name={`option-${index}`}
                  onChange={() => handelChange(index, i)}
                  checked={ans[index] == i}
                />
                <span className="pointer"></span>
                <span className="">{item}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QCart;
