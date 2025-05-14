import { useContext } from 'react';
import { ExpenseContext } from '../context/expenseContext';

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('UseExpense must be used within an ExpenseProvider');
  }
  return context;
};