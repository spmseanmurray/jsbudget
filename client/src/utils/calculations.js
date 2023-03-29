import moment from 'moment';

export function calculateTotal(data, start, end) {
  return data.reduce((sum, curr) => {
    if (moment(curr.date).isBetween(start, end, undefined, '[]')) {
      return sum + curr.amount;
    }
    return sum;
  }, 0);
}

export const sumBudgetByCategoryAndSort = (budget, start, end) => budget.reduce((res, curr) => {
  if (!(moment(curr.date).isBetween(start, end, undefined, '[]'))) {
    return res;
  }

  const categoryIndex = res.findIndex(({ category }) => category === curr.category.category);

  if (categoryIndex !== -1) {
    res[categoryIndex].total += curr.amount;
  } else {
    res.push({
      total: curr.amount,
      category: curr.category.category,
    });
  }
  return res;
}, []).sort((a, b) => a.total - b.total);

export const sumBudgetByMonth = (budget, category = null) => {
  const months = [];
  for (let i = 11; i >= 0; i -= 1) {
    months.push({
      total: 0,
      label: moment().subtract(i, 'months').format('MMM, YYYY'),
    });
  }

  return budget.reduce((res, curr) => {
    if (category && curr.category !== category) return res;

    const labelIndex = res.findIndex(({ label }) => label === moment(curr.date).format('MMM, YYYY'));

    if (labelIndex !== -1) {
      res[labelIndex].total += curr.amount;
    }

    return res;
  }, months);
};
