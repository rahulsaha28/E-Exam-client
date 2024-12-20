// here zustund store present

import { create } from "zustand";
import { useExamStore } from "./ExamStore.js";

// here the Mobile Menu active store
export const useMobileMenuActive = create((set) => ({
  // initial state MenuActive
  mobileMenuActive: false,
  // toggle the MenuActive
  actionMobileMenuActive: (active) => {
    if (active == undefined) {
      set((state) => ({ ...state, mobileMenuActive: !state.mobileMenuActive }));
      return;
    }
    set((state) => ({ ...state, mobileMenuActive: active }));
  },
}));

// here the question store
export const useQuestions = create((set) => ({
  // initilize the store
  questions: [],
  // add all questions
  addListOfQuestions: (questions) => {
    console.log("ADD ALL", questions);
    set((state) => ({ ...state, questions }));
  },
  // add a question
  addQuestion: async (question) => {
    set((state) => ({
      questions: [...state.questions, question],
    }));
  },
  // remove question
  removeQuestion: async (qIndex) => {
    set((state) => ({
      questions: state.questions.filter((item) => item._id !== qIndex),
    }));
  },
}));

// here is the question options
export const useOptions = create((set) => ({
  // options initilize
  options: [],
  // add a option
  addOption: async (option) => {
    set((state) => {
      console.log(state.options);
      return {
        ...state,
        options: [...state.options, option],
      };
    });
  },
  // update the data of the option
  updateOption: (index, value) => {
    set((state) => {
      state.options[index] = value;
      return { ...state };
    });
  },
  // delete a option
  deleteOption: async (index) => {
    set((state) => {
      state.options = [
        ...state.options.slice(0, index),
        ...state.options.slice(index + 1),
      ];
      return {
        ...state,
      };
    });
  },
  // reset option
  resetOption: () => {
    set((state) => ({ ...state, options: [] }));
  },
}));

// show modal
export const useShowModal = create((set) => ({
  showModal: true,
  toggleModal: (option) => {
    set((state) => ({
      showModal: typeof option == "boolean" ? option : !state.showModal,
    }));
  },
}));

// add questions in the exam
export const useExamQuestion = create((set) => ({
  examQ: [],
  showExamForm: false,
  addQInExam: (item) => {
    if (item) {
      set((state) => ({ ...state, examQ: [...state.examQ, item] }));
      return;
    }
    set((state) => ({ examQ: [] }));
  },
  removeQInExam: (id) => {
    set((state) => {
      const item = state.examQ.filter((q) => q._id == id)[0];
      useQuestions.setState((state) => ({
        questions: [...state.questions, item],
      }));
      console.log("hi");
      return {
        examQ: state.examQ.filter((q) => q._id !== id),
      };
    });
  },

  resetExamQ: () => set({ examQ: [] }),

  toggleExamForm: () => {
    set((state) => ({ showExamForm: !state.showExamForm }));
  },
}));

// status store
export const useStatus = create((set) => ({
  status: {
    live: "rgb(247,19,142)",
    hidden: "",
    inactive: "rgb(95,0,231)",
  },
}));

// store: Pro Modal
export const useProModal = create((set) => ({
  isModalOpen: false,
  closeModal: () => {
    set({ isModalOpen: false });
  },
  openModal: () => {
    set({ isModalOpen: true });
  },
}));

//
export const usePdfModal = create((set) => ({
  isPOpen: false,
  closePModal: () => set({ isPOpen: false }),
  openPModal: () => set({ isPOpen: true }),
}));

// store: countdown
export const useCountDown = create((set) => ({
  min: 0,
  hours: 0,
  sec: 0,
  totalTime: 0,

  startTimer: (hours, min, sec) =>
    set(() => {
      const { hour, min, sec } = useExamStore.getState().exam["totalTime"];
      console.log("h", hour, "min", min, "sec", sec);
      const totalTimeInSeconds =
        (hour || 0) * 3600 + (min || 0) * 60 + (sec || 0);

      return {
        hour: hour || 0,
        min: min || 0,
        sec: sec || 0,
        totalTime: totalTimeInSeconds,
      };
    }),

  updateTimer: () =>
    set((state) => {
      const { totalTime } = state;
      if (totalTime > 0) {
        console.log("totalTime", totalTime);
        const newTime = totalTime - 1;
        const hours = Math.floor(newTime / 3600);
        const min = Math.floor((newTime % 3600) / 60);
        const sec = Math.floor(newTime % 60);
        return { hours, min, sec, totalTime: newTime };
      } else {
        return { hours: 0, min: 0, sec: 0, totalTime: 0 };
      }
    }),
}));

// store: questionPrompt
export const useQuestionPrompt = create((set) => ({
  questions: [],
  addQuestions: (items) => {
    set({ questions: items });
  },
}));

// store: carousel
export const useCarousel = create((set) => ({
  currentIndex: 0,
  left: true,
  right: false,
  setCurrentIndex: (index, direction) => {
    let maxlen = useExamStore.getState().exam.questions.length - 1;
    let newIndex = index;
    if (direction == "Right") {
      newIndex = Math.min(index, maxlen);
      set({ left: false, right: newIndex == maxlen });
    } else if (direction == "Left") {
      newIndex = Math.max(0, index);
      set({ right: false, left: newIndex === 0 });
    }

    set({ currentIndex: newIndex });
  },
  reSetIndex: () => set({ currentIndex: 0, left: true, right: false }),
}));
