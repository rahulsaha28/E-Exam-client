import React, { useEffect } from "react";
import { useExamStore } from "../../Store/ExamStore";
import { useMobileMenuActive } from "../../Store/Store";
import ExamCart from "../../components/ExamCart/ExamCart";

const AllExam = () => {
  const { mobileMenuActive } = useMobileMenuActive((state) => state);
  const { exams, getExams } = useExamStore((state) => state);

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div
      className={`h-screen ${mobileMenuActive ? "pt-56" : "pt-20"}  md:pt-20`}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        {exams && exams.map((item, i) => <ExamCart key={item._id} {...item} />)}
      </div>
    </div>
  );
};

export default AllExam;
