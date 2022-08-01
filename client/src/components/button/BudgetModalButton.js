import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useBudgetModalActions } from '../../contexts/BudgetModalContext';

function BudgetModalButton() {
  const [modal, setModal] = useModal();
  const budgetModalActions = useBudgetModalActions();

  const handleClick = () => {
    budgetModalActions.resetBudgetModal();
    setModal({ ...modal, budget: true });
  };

  return (
    <button type="button" className="btn btn-primary modal-button btn-square" onClick={handleClick}>
      <FontAwesomeIcon icon={faAdd} size="lg" />
    </button>
  );
}
export default BudgetModalButton;
