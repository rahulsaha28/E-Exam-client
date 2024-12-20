import React from "react";
import { MdCancel } from "react-icons/md";
import { useOptions, useShowModal } from "../../Store/Store.js";

const Modal = ({ children }) => {
  const { toggleModal } = useShowModal((state) => state);
  const { resetOption } = useOptions((state) => state);
  return (
    // model background overlay
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <button
            onClick={() => {
              toggleModal(false);
              resetOption();
            }}
            className="text-2xl text-gray-600"
          >
            <MdCancel />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
