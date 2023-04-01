import { create } from 'zustand';

const usePageStore = create((set) => ({
  modal: {
    budget: false,
    category: false,
  },
  error: null,
  toggleModal: (modalName) => {
    set(({ modal }) => ({ modal: { ...modal, [modalName]: !modal[modalName] } }));
  },
}));

export default usePageStore;
