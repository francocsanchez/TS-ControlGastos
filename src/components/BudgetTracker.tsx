import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { state, dispatch } = useBudget();

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
  const enableExpenses = state.budget - totalExpenses;

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor: percentage >= 100 ? "#DC2626" : "#3B82F6",
              trailColor: "#F5F5F5",
              textSize: 15,
              textColor: percentage >= 100 ? "#DC2626" : "#3B82F6",
            })}
            text={`${percentage}%`}
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-8">
          <button
            type="button"
            className="bg-pink-600 w-full p-2 font-bold uppercase rounded-lg text-white"
            onClick={() => dispatch({ type: "reset-app" })}
          >
            Resetear App
          </button>
          <AmountDisplay label="Presupuesto" amount={state.budget} />
          <AmountDisplay label="Disponible" amount={enableExpenses} />
          <AmountDisplay label="Gastado" amount={totalExpenses} />
        </div>
      </div>
    </>
  );
}
