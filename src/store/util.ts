import { create } from 'zustand';

type loading = { [key: string]: boolean };

type TUtilStore = {
  textSearch: string;
  loading: loading;
  username: string;
  actions: {
    changeTextSearch: (text: string) => void;
    setLoading: (identifier: string, val: boolean) => void;
    setUsername: (val: string) => void;
  };
};

export const useUtilStore = create<TUtilStore>()((set) => ({
  textSearch: '',
  loading: { submit: false },
  username: '',
  actions: {
    changeTextSearch: (text) => set(() => ({ textSearch: text })),
    setLoading: (identifier, val) => set((state) => ({ loading: { ...state.loading, [identifier]: val } })),
    setUsername: (val) => set(() => ({ username: val })),
  },
}));

export const useUtilAction = () => useUtilStore((state) => state.actions);
