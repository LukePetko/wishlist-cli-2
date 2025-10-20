import { create } from 'zustand';
import type { Page, WishlistItem } from '../types';

type State = {
  item: 'create' | string | null;
  page: Page | null;
  modal: string | null;
  activeItem: WishlistItem | null;
};

type Actions = {
  backHome: () => void;
  setPage: (page: Page | null) => void;
  setActiveItem: (activeItem: WishlistItem) => void;
  setModal: (modal: string) => void;
  setItem: (item: 'create' | string | null) => void;
};

const initialState: State = {
  item: null,
  page: null,
  modal: null,
  activeItem: null,
};

const useItem = create<State & Actions>((set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  backHome: () => set({ item: null, modal: null, activeItem: null }),
  setActiveItem: (activeItem) => set({ activeItem }),
  setModal: (modal) => set({ modal }),
  setItem: (item) => set({ item }),
}));

export default useItem;
