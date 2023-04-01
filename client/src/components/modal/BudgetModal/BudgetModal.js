import React from 'react';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import StandardInput from '../../form/StandardInput';
import StandardSelect from '../../form/StandardSelect';
import StandardDatePicker from '../../form/StandardDatePicker';
import NewTransactionHeader from './components/NewTransactionHeader';
import NewTransactionFooter from './components/NewTransactionFooter';
import EditTransactionHeader from './components/EditTransactionHeader';
import EditTransactionFooter from './components/EditTransactionFooter';
import useBudgetModalStore from '../../../store/budgetModal';
import usePageStore from '../../../store/page';

function BudgetModal() {
  const {
    subcategoryOptions,
    categoryOptions,
    budgetModal,
    setDescription,
    setCategory,
    setSubcategory,
    setDate,
    setAmount,
  } = useBudgetModalStore();
  const modal = usePageStore((s) => s.modal);

  return (
    <>
      <input type="checkbox" id="budget-modal" className="modal-toggle" checked={modal.budget} readOnly />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative w-96">
          <div className="card-body p-0">
            {budgetModal.id ? <EditTransactionHeader /> : <NewTransactionHeader /> }
            <StandardInput type="text" placeholder="Description" value={budgetModal.description} onChange={(input) => setDescription(input.target.value)} />
            <div className="w-full grid grid-cols-2 gap-4">
              <StandardSelect placeholder="Category" options={categoryOptions.map((cat) => cat.category)} value={budgetModal.category} onChange={(input) => setCategory(input.target.value)} />
              <StandardSelect placeholder="Subcategory" options={subcategoryOptions.map((subcat) => subcat.subcategory)} value={budgetModal.subcategory} onChange={(input) => setSubcategory(input.target.value)} />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <StandardDatePicker label="Date" selected={budgetModal.date} onChange={(input) => setDate(input)} />
              <StandardInput icon={faDollar} type="text" placeholder="Amount" value={budgetModal.amount} onChange={(input) => setAmount(input.target.value)} />
            </div>
            {budgetModal.id ? <EditTransactionFooter /> : <NewTransactionFooter /> }
          </div>
        </div>
      </div>
    </>
  );
}
export default BudgetModal;
