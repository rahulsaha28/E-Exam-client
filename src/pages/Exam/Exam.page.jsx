import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormError from "../../components/FormError/FormError.component.jsx";
import ProModal from "../../components/ProModal/ProModal.jsx";
import { useExamStore } from "../../Store/ExamStore.js";
import { useMobileMenuActive, useProModal } from "../../Store/Store.js";
import StartExam from "../StartExam/StartExam.Page.jsx";

const Exam = () => {
  const { id } = useParams();
  const { mobileMenuActive } = useMobileMenuActive((state) => state);
  const { isModalOpen, openModal, closeModal } = useProModal((state) => state);

  const { exam, addStudent } = useExamStore((state) => state);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    openModal();
  }, [id]);

  // enter info of student at the exam start
  const handleExamEntry = (data) => {
    addStudent(data);

    closeModal();
  };

  return (
    <div
      className={`h-screen ${mobileMenuActive ? "pt-56" : "pt-20"}  md:pt-20`}
    >
      {isModalOpen && (
        <ProModal
          onClose={() => {
            closeModal();
            navigate("/");
          }}
        >
          <div className="flex flex-col space-y-3">
            <div>
              Enter for the Exam:{" "}
              <span className="text-bright-teal">{exam?.name}</span>{" "}
            </div>
            <form
              onSubmit={handleSubmit(handleExamEntry)}
              className="flex flex-col space-y-4"
            >
              <div>
                <label
                  htmlFor="question"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Student Name
                </label>
                <input
                  className="form-field-input"
                  type="text"
                  placeholder="Name"
                  {...register("studentName", {
                    required: "The Name must be given",
                  })}
                />
                {errors.studentName && (
                  <FormError message={errors.studentName.message} />
                )}
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
                  placeholder="passcode"
                  {...register("examPasscode", {
                    required: "The Passcode must be filled",
                    pattern: {
                      value: new RegExp(`^${exam?.passcode}$`),
                      message: "PassCode not match",
                    },
                  })}
                />
                {errors.examPasscode && (
                  <FormError message={errors.examPasscode.message} />
                )}
              </div>
              <button className="btn-1">Enter</button>
            </form>
          </div>
        </ProModal>
      )}
      {!isModalOpen && exam && <StartExam />}
    </div>
  );
};

export default Exam;
