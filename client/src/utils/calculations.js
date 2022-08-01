import moment from 'moment';

export function calculateTotal(data, start, end) {
  return data.reduce((sum, curr) => {
    if (moment(curr.budgetDate).isBetween(start, end, undefined, '[]')) {
      return sum + curr.budgetAmount;
    }
    return sum;
  }, 0);
}

export const sumBudgetByCategoryAndSort = (budget, start, end) => budget.reduce((res, curr) => {
  if (!(moment(curr.budgetDate).isBetween(start, end, undefined, '[]'))) {
    return res;
  }

  const categoryIndex = res.findIndex(({ category }) => category === curr.budgetCategory);

  if (categoryIndex !== -1) {
    res[categoryIndex].total += curr.budgetAmount;
  } else {
    res.push({
      total: curr.budgetAmount,
      category: curr.budgetCategory,
    });
  }
  return res;
}, []).sort((a, b) => a.total - b.total);
