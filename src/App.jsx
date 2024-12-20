import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav.component";
import AllExam from "./pages/AllExam/AllExam.page";
import Exam from "./pages/Exam/Exam.page";
import Home from "./pages/Home/Home.page";
import Pdf from "./pages/Pdf/Pdf.page";
import Questions from "./pages/Question/Questions.page";

const App = () => {
  return (
    <BrowserRouter>
      <div className="overflow-y-auto bg-light-sky">
        {/* total navbar for the website */}
        <Nav />
        {/* all route are here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/questions"
            element={
              <DndProvider backend={HTML5Backend}>
                <Questions />
              </DndProvider>
            }
          />
          <Route path="/exam/:id" element={<Exam />} />
          <Route path="/login" element={<Home />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/exam/all" element={<AllExam />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
