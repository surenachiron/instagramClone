import { create } from 'zustand';

type TPostsStore = {
  initialPost: number;
  actions: {
    setInitialPost: (id: number) => void;
  };
};

export const usePostsStore = create<TPostsStore>()((set) => ({
  initialPost: 0,
  actions: {
    setInitialPost: (id) => set(() => ({ initialPost: id })),
  },
}));

export const usePostsAction = () => usePostsStore((state) => state.actions);
