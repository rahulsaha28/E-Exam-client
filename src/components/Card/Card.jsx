import React from "react";
import { CiBoxList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../../Store/ExamStore";
import Status from "../Status/Status";

const Card = ({ name, passcode, status, totalTime, _id: id }) => {
  const navigate = useNavigate();
  const { getExamByID, exam } = useExamStore((state) => state);
  const handelCard = (id) => {
    getExamByID(id);

    navigate(`/exam/${id}`);
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
          <button className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-800 ">
            <CiBoxList className="text-2xl" />
          </button>
          <button
            onClick={() => {
              handelCard(id);
            }}
            className="px-4 py-2 text-white rounded-md bg-sky-600 hover:bg-sky-800"
          >
            Enter Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
