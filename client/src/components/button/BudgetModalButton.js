import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import usePageStore from '../../store/page';
import useBudgetModalStore from '../../store/budgetModal';

function BudgetModalButton() {
  const toggleModal = usePageStore((s) => s.toggleModal);
  const resetBudgetModal = useBudgetModalStore((s) => s.resetBudgetModal);

  const handleClick = () => {
    resetBudgetModal();
    toggleModal();
  };

  return (
    <button type="button" className="btn btn-primary modal-button btn-square" onClick={handleClick}>
      <FontAwesomeIcon icon={faAdd} size="lg" />
    </button>
  );
}
export default BudgetModalButton;
