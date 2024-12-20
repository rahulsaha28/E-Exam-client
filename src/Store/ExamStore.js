import axios from "axios";
import { create } from "zustand";
import { API } from "../utils/api";

// exam store
export const useExamStore = create((set) => ({
  exams: [],
  exam: null,
  isLoading: false,
  error: null,
  ans: {},
  error: {},
  studentInfo: {},
  getExams: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API}/exam/`);

      if (data.success) {
        set({ isLoading: false, exams: data.data });
        return;
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  getExamByID: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API}/exam/${id}`);
      const { data } = response;
      if (data.success) {
        set((state) => ({
          ...state,
          exam: data.data,
          isLoading: false,
        }));
        return;
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  setExam: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API}/exam`, data, {
        "Content-Type": "application/json",
      });

      if (response) {
        set({ isLoading: false });
        return;
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  deleteExamByID: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/exam/${id}`
      );
      if (data.success == true) {
        set((state) => {
          return {
            isLoading: false,
            exams: state.exams.filter((item) => item._id != id),
          };
        });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  // add the ans
  addAns: (key, value) => {
    set((state) => ({
      ans: { ...state.ans, [key]: value },
    }));
  },
  // check if the ans is correct
  errorCheck: (qIndex) => {
    const { ans, exam } = useExamStore.getState();

    if (ans[qIndex] !== undefined) {
      const isCorrect = ans[qIndex] == exam.questions[qIndex].ans;
      set((state) => ({
        error: { ...state.error, [qIndex]: isCorrect },
      }));
    }
  },
  // add student information
  addStudent: (info) => set({ studentInfo: info }),
  // clear ans, error, student info
  clearAns: () => set({ ans: {}, error: {}, studentInfo: {} }),
}));
