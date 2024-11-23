import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const { state, dispatch } = useBudget();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <img src="/grafico.jpg" alt="grafico de gastos" />
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
          <AmountDisplay label="Disponible" amount={200} />
          <AmountDisplay label="Gastado" amount={100} />
        </div>
      </div>
    </>
  );
}
