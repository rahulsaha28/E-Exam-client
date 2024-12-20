import axios from "axios";
import { create } from "zustand";
import { API } from "../utils/api";
import { useQuestions } from "./Store";

export const useQuestion = create((set) => ({
  data: [],
  isLoading: false,
  error: null,
  getAllData: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API}/question`);
      if (data.success) {
        useQuestions.getState().addListOfQuestions(data.data);
        set({ isLoading: false, data: data.data });
        return;
      }
      set({ isLoading: false, data: [], error: true });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  setData: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API}/question`, data, {
        "Content-Type": "application/json",
      });
      console.log(response);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  deleteQuestion: async (url) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(url);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
}));
