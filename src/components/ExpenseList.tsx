import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);
  return (
    <div className="mt-2">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold uppercase text-center">No se registraron</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold uppercase text-center">Listado de gastos</p>
          {state.expenses.map((expense) => (
            <ExpenseDetails expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
}
