import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import usePageStore from '../../store/page';
import { useBudgetModalActions } from '../../contexts/BudgetModalContext';

function BudgetModalButton() {
  const toggleModal = usePageStore((s) => s.toggleModal);
  const budgetModalActions = useBudgetModalActions();

  const handleClick = () => {
    budgetModalActions.resetBudgetModal();
    toggleModal();
  };

  return (
    <button type="button" className="btn btn-primary modal-button btn-square" onClick={handleClick}>
      <FontAwesomeIcon icon={faAdd} size="lg" />
    </button>
  );
}
export default BudgetModalButton;
