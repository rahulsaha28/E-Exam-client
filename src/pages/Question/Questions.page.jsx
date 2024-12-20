import React, { useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import DraggableItem from "../../components/DraggableItem/DraggableItem.jsx";
import ExamForm from "../../components/ExamForm/ExamForm.jsx";
import Modal from "../../components/Modal/Modal.component";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import QuestionForm from "../../components/QuestionForm/QuestionForm.component";
import { useQuestion } from "../../Store/QuestionStore.js";
import {
  useExamQuestion,
  useMobileMenuActive,
  useQuestions,
  useShowModal,
} from "../../Store/Store.js";

const Questions = () => {
  const { mobileMenuActive } = useMobileMenuActive((state) => state);
  const { showModal, toggleModal } = useShowModal((state) => state);
  const { getAllData, data } = useQuestion((state) => state);
  const { questions } = useQuestions((state) => state);
  const { addQInExam, toggleExamForm, showExamForm, isLoading } =
    useExamQuestion((state) => state);

  useEffect(() => {
    getAllData();
    addQInExam();
  }, []);

  return (
    <div
      className={`h-screen ${mobileMenuActive ? "pt-56" : "pt-20"}  md:pt-20`}
    >
      {isLoading ? (
        <ProgressBar type="big" />
      ) : (
        <>
          {showModal && (
            <Modal>
              <QuestionForm />
            </Modal>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
            <div className="px-0 ">
              <h4 className="px-3 py-2 text-center bg-orange-300 text-midnight-blue">
                Question is here
              </h4>
              {/* dragable items is here */}
              <div className="flex flex-col gap-4 px-3 mt-2 overflow-y-scroll scrollBar-none h-80">
                {questions.map((item, index) => (
                  <DraggableItem
                    key={item._id}
                    index={index}
                    item={item}
                    type={"ITEM"}
                  />
                ))}
              </div>
            </div>
            <div className="h-full ">
              <div className="flex gap-4">
                <button
                  onClick={() => toggleModal(!showModal)}
                  className="px-4 py-2 text-white rounded-md hover:bg-midnight-blue bg-vibrant-blue"
                >
                  Add Question
                </button>
                <button
                  onClick={() => toggleExamForm()}
                  className="flex items-center gap-1 px-4 py-2 text-white rounded-md hover:bg-midnight-blue bg-[#6fafe7]"
                >
                  <GrAdd /> Exam
                </button>
              </div>
              <div>{showExamForm && <ExamForm />}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
