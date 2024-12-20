import html2pdf from "html2pdf.js";
import React, { useRef, useState } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { useExamStore } from "../../Store/ExamStore";
import ProgressBar from "../ProgressBar/ProgressBar";

const PdfModal = ({ children, onClose }) => {
  const { exam, error, ans } = useExamStore((state) => state);
  const pdfRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handelSavePDF = () => {
    setIsLoading(true);
    const options = {
      html2canvas: { scale: 4 },
      margin: 10,
      jsPDF: {
        unit: "mm",
        format: "a4",
        pageSize: "A4",
        orientation: "portrait",
      },
    };
    html2pdf().from(pdfRef.current).set(options).save("result.pdf");
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center w-full p-6 space-y-2 ">
      <div className="w-full p-6 bg-white rounded-lg sm:w-1/2">
        <div ref={pdfRef} className="p-3">
          <div>Qusetion and Ans </div>
          <div className="space-y-4 ">
            {exam &&
              exam?.questions.map(({ question, options }, index) => (
                <div key={index}>
                  <h4>
                    {index + 1}. {question} ?
                  </h4>
                  <div className="space-y-2">
                    {options &&
                      options.map((item, i) => (
                        <label
                          className={`flex gap-2 p-2 ${
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
              ))}
          </div>
        </div>

        <button
          onClick={handelSavePDF}
          className="relative flex items-center gap-2 px-4 py-2 text-white bg-green-700 rounded-md shadow-md hover:bg-green-500"
        >
          {isLoading ? <ProgressBar type="small" /> : <RiDownloadLine />}
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
};

export default PdfModal;
