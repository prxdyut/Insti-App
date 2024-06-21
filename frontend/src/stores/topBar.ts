import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

interface appBarState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const topBarStore = create<appBarState>()((set, get) => {
  const data = get();
  return {
    isOpen: false,
    toggle() {
      set({ ...data, isOpen: !data.isOpen });
    },
    open() {
      set({ ...data, isOpen: true });
    },
    close() {
      set({ ...data, isOpen: false });
    },
  };
});

export default topBarStore;
