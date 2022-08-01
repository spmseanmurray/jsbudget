import React, {
  createContext, useContext, useState,
} from 'react';

const ModalState = createContext();
const ModalActions = createContext();

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    budget: false,
  });

  return (
    <ModalState.Provider value={modal}>
      <ModalActions.Provider value={setModal}>
        {children}
      </ModalActions.Provider>
    </ModalState.Provider>
  );
}

function useModalState() {
  const modal = useContext(ModalState);

  if (modal === null) {
    throw new Error('Cannot use modal state unless component is a decendant of the ModalProvider');
  }

  return modal;
}

function useModalActions() {
  const actions = useContext(ModalActions);

  if (actions === null) {
    throw new Error('Cannot use modal actions unless component is a decendant of the ModalProvider');
  }

  return actions;
}

const useModal = () => [useModalState(), useModalActions()];

export {
  ModalProvider, useModal, useModalActions, useModalState,
};
