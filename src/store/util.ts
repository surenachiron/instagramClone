import { create } from 'zustand';

type TUtilStore = {
  textSearch: string;
  actions: {
    changeTextSearch: (text: string) => void;
  };
};

export const useUtilStore = create<TUtilStore>()((set) => ({
  textSearch: '',
  actions: {
    changeTextSearch: (text) => set(() => ({ textSearch: text })),
  },
}));

export const useUtilAction = () => useUtilStore((state) => state.actions);
