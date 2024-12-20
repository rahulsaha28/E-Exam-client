import React, { useEffect } from "react";
import { useExamStore } from "../../Store/ExamStore.js";
import { useCarousel, useMobileMenuActive } from "../../Store/Store.js";
import Card from "../../components/Card/Card.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";

const Home = () => {
  const { mobileMenuActive } = useMobileMenuActive((state) => state);
  const { exams, getExams, isLoading, clearAns } = useExamStore(
    (state) => state
  );
  const { reSetIndex } = useCarousel((state) => state);
  useEffect(() => {
    getExams();
    reSetIndex();
    clearAns();
  }, []);
  return (
    <div
      className={`h-screen ${mobileMenuActive ? "pt-56" : "pt-20"}  md:pt-20`}
    >
      {isLoading ? (
        <ProgressBar type="big" />
      ) : (
        <div className="grid grid-cols-1 gap-10 p-4 md:grid-cols-4">
          {exams.map((exam, i) => (
            <Card key={exam._id} {...exam} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
