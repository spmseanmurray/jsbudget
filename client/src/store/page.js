import { create } from 'zustand';

const usePageStore = create((set) => ({
  modal: false,
  error: null,
  toggleModal: () => {
    set(({ modal }) => ({ modal: !modal }));
  },
}));

export default usePageStore;
