import { create } from "zustand";
import { ReactNode } from "react";

interface Model {
  show: boolean;
  onClick: () => void;
  children: ReactNode;
}

interface AppStore {
  model: Model;
  setModel: (model: Partial<Model>) => void;
}

const useAppStore = create<AppStore>((set) => ({
  model: {
    show: false,
    children: <h1>Hello</h1>,
    onClick: () => {},
  },
  setModel: (updatedModel) =>
    set((state) => ({
      model: { ...state.model, ...updatedModel },
    })),
}));

export default useAppStore;
