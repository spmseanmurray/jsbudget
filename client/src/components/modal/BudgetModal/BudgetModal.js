import React from 'react';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import StandardInput from '../../form/StandardInput';
import StandardSelect from '../../form/StandardSelect';
import StandardDatePicker from '../../form/StandardDatePicker';
import NewTransactionHeader from './components/NewTransactionHeader';
import NewTransactionFooter from './components/NewTransactionFooter';
import EditTransactionHeader from './components/EditTransactionHeader';
import EditTransactionFooter from './components/EditTransactionFooter';
import { useBudgetModal } from '../../../contexts/BudgetModalContext';
import { useModalState } from '../../../contexts/ModalContext';

function BudgetModal() {
  const [budgetModal, budgetModalActions] = useBudgetModal();
  const modal = useModalState();

  return (
    <>
      <input type="checkbox" id="budget-modal" className="modal-toggle" checked={modal.budget} readOnly />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative w-96">
          <div className="card-body p-0">
            {budgetModal.id ? <EditTransactionHeader /> : <NewTransactionHeader /> }
            <StandardInput type="text" placeholder="Description" value={budgetModal.description} onChange={(input) => budgetModalActions.setDescription(input.target.value)} />
            <div className="w-full grid grid-cols-2 gap-4">
              <StandardDatePicker label="Date" selected={budgetModal.date} onChange={(input) => budgetModalActions.setDate(input)} />
              <StandardInput icon={faDollar} type="text" placeholder="Amount" value={budgetModal.amount} onChange={(input) => budgetModalActions.setAmount(input.target.value)} />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <StandardSelect placeholder="Category" options={budgetModal.categories.map((cat) => cat.value)} value={budgetModal.category} onChange={(input) => budgetModalActions.setCategory(input.target.value)} />
              <StandardSelect placeholder="Subcategory" options={budgetModal.subcategories} value={budgetModal.subcategory} onChange={(input) => budgetModalActions.setSubcategory(input.target.value)} />
            </div>
            {budgetModal.id ? <EditTransactionFooter /> : <NewTransactionFooter /> }
          </div>
        </div>
      </div>
    </>
  );
}
export default BudgetModal;
