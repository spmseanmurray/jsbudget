import React, { useEffect, useState } from 'react';
import { useBudgetState } from '../contexts/BudgetContext';
import BudgetTableRow from '../components/table/BudgetTableRow';
import StandardTableFooter from '../components/table/StandardTableFooter';
import StandardSearch from '../components/form/StandardSearch';
import BudgetModalButton from '../components/button/BudgetModalButton';

const ITEMS_PER_PAGE = 10;
const BUDGET_TABLE_COLUMNS = [
  { title: 'Date', width: 'w-1/6' },
  { title: 'Description', width: 'w-1/3' },
  { title: 'Category', width: 'w-1/6' },
  { title: 'Subcategory', width: 'w-1/6' },
  { title: 'Amount ($)', width: 'w-1/6' },
];

function History() {
  const { budget } = useBudgetState();
  const [filteredBudget, setFilteredBudget] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [descriptionFilter, setDescriptionFilter] = useState('');

  const filterByDescription = () => setFilteredBudget(budget.filter((budgetItem) => (
    budgetItem.description.toLowerCase().includes(descriptionFilter.toLowerCase())
  )));

  useEffect(() => {
    setPageData(
      filteredBudget.slice(ITEMS_PER_PAGE * pageIndex, ITEMS_PER_PAGE * (pageIndex + 1)),
    );
    setNumPages(Math.ceil(filteredBudget.length / ITEMS_PER_PAGE - 1));
  }, [filteredBudget, pageIndex]);

  useEffect(() => {
    setFilteredBudget(budget);
    setDescriptionFilter('');
  }, [budget]);

  return (
    <div className="flex flex-grow justify-around w-screen h-screen">
      <div className="card w-4/5">
        <div className="card-body">
          <div className="card-title justify-between">
            <BudgetModalButton />
            <StandardSearch placeholder="Search by description" onChange={setDescriptionFilter} onClick={filterByDescription} />
          </div>
          <table className="table table-fixed w-full">
            <thead className="bg-neutral">
              <tr>
                {BUDGET_TABLE_COLUMNS.map((column) => <th key={column.title} className={`bg-neutral ${column.width}`}>{column.title}</th>)}
              </tr>
            </thead>
            <tbody>
              {pageData.map((budgetItem) => <BudgetTableRow key={`budget-row-${budgetItem.id}`} budgetItem={budgetItem} />)}
            </tbody>
            <tfoot>
              <StandardTableFooter
                numColumns={BUDGET_TABLE_COLUMNS.length}
                numPages={numPages}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
export default History;
