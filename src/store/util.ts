import { create } from 'zustand';

type loading = { [key: string]: boolean };

type TUtilStore = {
  textSearch: string;
  loading: loading;
  actions: {
    changeTextSearch: (text: string) => void;
    setLoading: (identifier: string, val: boolean) => void;
  };
};

export const useUtilStore = create<TUtilStore>()((set) => ({
  textSearch: '',
  loading: { submit: false },
  actions: {
    changeTextSearch: (text) => set(() => ({ textSearch: text })),
    setLoading: (identifier, val) => set((state) => ({ loading: { ...state.loading, [identifier]: val } })),
  },
}));

export const useUtilAction = () => useUtilStore((state) => state.actions);
