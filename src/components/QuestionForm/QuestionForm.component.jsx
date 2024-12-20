import React from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useQuestion } from "../../Store/QuestionStore.js";
import { useOptions, useShowModal } from "../../Store/Store.js";
import FormError from "../FormError/FormError.component";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import "./QuestionForm.css";

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { toggleModal } = useShowModal((state) => state);
  const { addOption, options, updateOption, deleteOption, resetOption } =
    useOptions((state) => state);

  const { setData, getAllData, isLoading } = useQuestion((state) => state);

  console.log("redender");
  //   form submition
  const formSubmit = async (data) => {
    if (data && options.length >= 4) {
      await setData({ ...data, options });
      await getAllData();
    }
    reset();
    resetOption();
    toggleModal(false);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(formSubmit)}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            className="form-field-input"
            type="text"
            placeholder="Enter the question"
            {...register("question", {
              required: "The question must be filled",
            })}
          />
          {errors.question && <FormError message={errors.question.message} />}
        </div>
        <div className="space-y-2">
          {/* add question option */}

          {options &&
            options.map((option, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  {...register("ans", { required: "Ans must be choose" })}
                  type="radio"
                  value={index}
                />
                <input
                  type="text"
                  className="form-field-input"
                  value={option}
                  onChange={(e) => {
                    e.preventDefault();
                    updateOption(index, e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOption(index);
                  }}
                  className="text-xl text-red-400 transition-all hover:text-red-700"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          {errors.ans && <FormError message={errors.ans.message} />}
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addOption("");
            }}
            className={`flex text-sm text-white rounded-md hover:bg-opacity-75 bg-vibrant-blue `}
          >
            <span className="px-4 py-2">Option </span>
            <span className={`px-4 py-2 bg-blue-800 hover:opacity-80 `}>
              <IoAddCircleOutline className="text-lg" />
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              toggleModal(false);
              reset();
              resetOption();
            }}
            type="button"
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:right-2 focus:ring-gray-400 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-sm text-white rounded-md hover:bg-midnight-blue bg-vibrant-blue"
          >
            {isLoading && <ProgressBar type="small" />}Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
