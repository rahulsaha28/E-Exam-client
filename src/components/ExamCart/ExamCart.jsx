import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useExamStore } from "../../Store/ExamStore";
import Status from "../Status/Status";

const ExamCart = ({ name, status, passcode, totalTime, _id }) => {
  const { deleteExamByID } = useExamStore((state) => state);
  const handelExamDelete = () => {
    deleteExamByID(_id);
  };
  return (
    <div className="bg-white border rounded-md shadow-md text-deep-charcoal border-midnight-blue">
      <div className="flex justify-between px-4 py-2 text-white bg-deep-charcoal rounded-t-md">
        <h2>{name}</h2>
        <span className="">
          <Status color={status} />
          {status}
        </span>
      </div>
      <div className="p-3">
        <div className="py-3 text-center">
          <h4>Passcode: {passcode}</h4>
          <h6 className="text-gray-400">
            Time: {totalTime["hour"] ? `${totalTime["hour"]}h:` : ""}
            {totalTime["min"] ? `${totalTime["min"]}min:` : ""}
            {totalTime["sec"] ? `${totalTime["sec"]}s` : ""}
          </h6>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handelExamDelete}
            className="px-4 py-2 text-red-500 rounded-md hover:bg-red-800 hover:text-white "
          >
            <MdOutlineDelete className="text-2xl" />
          </button>
          {/* <button
            onClick={() => {}}
            className="px-4 py-2 text-white rounded-md bg-sky-600 hover:bg-sky-800"
          >
            Enter Exam
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ExamCart;
