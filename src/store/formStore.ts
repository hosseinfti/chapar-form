import { create } from 'zustand';

type FormData = {
  fullName?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  skills?: string[];
};

interface FormStore {
  data: FormData;
  setFormData: (newData: Partial<FormData>) => void;
  clearForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  data: {},
  setFormData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  clearForm: () => set({ data: {} }),
}));
