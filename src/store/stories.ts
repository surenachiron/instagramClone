import { create } from 'zustand';

type TStoriesStore = {
  showStories: boolean;
  initialStory: number;
  actions: {
    changeShowStories: () => void;
    setInitialStory: (id: number) => void;
  };
};

export const useStoriesStore = create<TStoriesStore>()((set) => ({
  showStories: true,
  initialStory: 0,
  actions: {
    changeShowStories: () => set((state) => ({ showStories: state.showStories })),
    setInitialStory: (id) => set(() => ({ initialStory: id })),
  },
}));

export const useStoriesAction = () => useStoriesStore((state) => state.actions);
