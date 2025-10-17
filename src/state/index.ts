import { create } from 'zustand';
import type { WishlistItem } from '../types';

type State = {
  item: 'create' | string | null;
  page: string | null;
  modal: string | null;
  wishlistItem: WishlistItem | null;
};

type Actions = {
  backHome: () => void;
  setPage: (page: string) => void;
  setWishlistItem: (item: WishlistItem) => void;
  setModal: (modal: string) => void;
  setItem: (item: 'create' | string | null) => void;
};

const initialState: State = {
  item: null,
  page: null,
  modal: null,
  wishlistItem: null,
};

const useState = create<State & Actions>((set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  backHome: () => set({ item: null, modal: null, wishlistItem: null }),
  setWishlistItem: (item) => set({ wishlistItem: item }),
  setModal: (modal) => set({ modal }),
  setItem: (item) => set({ item }),
}));

export default useState;
