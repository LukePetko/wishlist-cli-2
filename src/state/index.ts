import { create } from 'zustand';
import type { Page, WishlistItem } from '../types';

type State = {
  item: 'create' | string | null;
  page: Page | null;
  modal: string | null;
  activeItem: WishlistItem | null;
  blockInput: boolean;
};

type Actions = {
  backHome: () => void;
  setPage: (page: Page | null) => void;
  setActiveItem: (activeItem: WishlistItem) => void;
  setModal: (modal: string | null) => void;
  setItem: (item: 'create' | string | null) => void;
  setBlockInput: (blockInput: boolean) => void;
};

const initialState: State = {
  item: null,
  page: null,
  modal: null,
  activeItem: null,
  blockInput: false,
};

const useItem = create<State & Actions>((set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  backHome: () => set({ item: null, modal: null, activeItem: null }),
  setActiveItem: (activeItem) => set({ activeItem }),
  setModal: (modal) => set({ modal }),
  setItem: (item) => set({ item }),
  setBlockInput: (blockInput) => set({ blockInput }),
}));

export default useItem;
