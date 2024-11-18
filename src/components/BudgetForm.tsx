import { useState, ChangeEvent, useMemo } from "react";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };
  const isValid = useMemo(() => {
    return budget === 0;
  }, [budget]);

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="uppercase text-2xl text-blue-600 font-bold text-center">
          Definir presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="rounded-md w-full bg-white border border-gray-200 p-2"
          placeholder="Defini tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={"Generar"}
        disabled={isValid}
        className="uppercase text-white text-center bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 font-bold rounded-sm disabled:opacity-10"
      />
    </form>
  );
}
