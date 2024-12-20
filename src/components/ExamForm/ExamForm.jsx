import React from "react";
import { useForm } from "react-hook-form";
import { useExamStore } from "../../Store/ExamStore.js";
import { useExamQuestion } from "../../Store/Store.js";
import DropSection from "../DropSection/DropSection";
import FormError from "../FormError/FormError.component.jsx";
import "./ExamForm.css";

const ExamForm = () => {
  const { examQ, resetExamQ } = useExamQuestion((state) => state);
  const { setExam } = useExamStore((state) => state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handelExamSubmit = async (data) => {
    if (examQ.length === 0)
      return alert("Please add some question to the exam");
    const newData = {
      questions: examQ.map((q) => q._id),
      totalTime: { hour: parseInt(data.examHour), min: parseInt(data.examMin) },
      name: data.examName,
      passcode: data.examPasscode,
    };
    await setExam(newData);
    reset();
    resetExamQ();
  };
  return (
    <div className="transition-all delay-75">
      <form className="flex flex-col" onSubmit={handleSubmit(handelExamSubmit)}>
        <div className="flex flex-col items-center justify-center py-4 space-y-4 ">
          <div>
            <label
              htmlFor="question"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Exam Name
            </label>
            <input
              className="form-field-input"
              type="text"
              placeholder="Enter the Exam name"
              {...register("examName", {
                required: "The Exam Name must be filled",
              })}
            />
            {errors.examName && <FormError message={errors.examName.message} />}
          </div>
          <div>
            <label
              htmlFor="question"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Passcode
            </label>
            <input
              className="form-field-input"
              type="text"
              placeholder=" passcode like: 3E4r56yTY"
              {...register("examPasscode", {
                required: "The Passcode must be filled",
              })}
            />
            {errors.examPasscode && (
              <FormError message={errors.examPasscode.message} />
            )}
          </div>
          <div className="flex items-center justify-center w-4/5 gap-14">
            <div className="relative">
              <input
                className="w-20 custome-number-btn form-field-input"
                type="number"
                placeholder="hour"
                {...register("examHour")}
              />
              <span className="absolute top-0 right-[-40px] h-full text-center content-center w-11 bg-slate-300 rounded-r-md text-midnight-blue">
                H
              </span>
            </div>
            <div className="relative">
              <input
                className="w-20 form-field-input custome-number-btn"
                type="number"
                placeholder="Min"
                {...register("examMin")}
              />
              <span className="absolute top-0 right-[-40px] h-full text-center content-center w-11 bg-slate-300 rounded-r-md text-midnight-blue">
                Min
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white rounded-md hover:bg-midnight-blue bg-vibrant-blue"
          >
            Submit
          </button>
        </div>
      </form>
      <div>Exam question : {examQ.length ? examQ.length : ""}</div>
      <div className="flex flex-col">
        <DropSection />
      </div>
    </div>
  );
};

export default ExamForm;
