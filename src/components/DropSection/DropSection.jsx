import React from "react";
import { useDrop } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { useExamQuestion, useQuestions } from "../../Store/Store.js";

const DropSection = () => {
  const { examQ, addQInExam, removeQInExam } = useExamQuestion(
    (state) => state
  );
  const { removeQuestion } = useQuestions((state) => state);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => {
      addQInExam(item);
      removeQuestion(item._id);
    },
  }));

  return (
    <div
      className=" bg-white min-h-[200px] p-3 [border:1px_dotted_green]"
      ref={drop}
    >
      Drop it here ...
      <div className="space-y-4">
        {examQ.map((item, index) => (
          <div
            className="flex items-center justify-between px-4 py-2 text-white rounded-md bg-color-1"
            key={item._id}
          >
            <span>
              {index + 1}. {item.question}
            </span>
            <button
              onClick={() => removeQInExam(item._id)}
              className="text-2xl text-red-500 hover:text-white "
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropSection;
