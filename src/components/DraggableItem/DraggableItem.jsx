import React from "react";
import { useDrag } from "react-dnd";
import { useQuestion } from "../../Store/QuestionStore";

const DraggableItem = ({ item, type, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
  }));

  const { deleteQuestion, getAllData } = useQuestion((state) => state);

  const deleteItem = (id) => {
    deleteQuestion(`http://localhost:5000/api/question/${id}`);
    getAllData();
  };

  return (
    <div
      className="px-4 py-2 transition-all delay-75 bg-white rounded-md text-color-1 hover:bg-color-1 hover:text-white hover:shadow-lg"
      ref={drag}
    >
      <div className="flex justify-between">
        <span>
          {index + 1}. {item.question} ?
        </span>
        {/* <button
          onClick={() => deleteItem(item._id)}
          className="text-lg text-red-500 transition-all shadow-lg hover:text-white"
        >
          <MdOutlineDelete className="text-lg" />
        </button> */}
      </div>
    </div>
  );
};

export default DraggableItem;
