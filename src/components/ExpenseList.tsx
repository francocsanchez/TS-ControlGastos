import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
  const { state } = useBudget();

  const filterExpenses = state.currentCategory ? state.expenses.filter((expense) => expense.category === state.currentCategory) : state.expenses;
  const isEmpty = useMemo(() => filterExpenses.length === 0, [state.expenses]);
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold uppercase text-center">No se registraron</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold uppercase text-center">Listado de gastos</p>
          {filterExpenses.map((expense) => (
            <ExpenseDetails expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
}
