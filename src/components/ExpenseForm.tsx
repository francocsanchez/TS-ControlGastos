import { ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { DrafExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const { dispatch } = useBudget();
  const [error, setError] = useState("");
  const [expense, setExpense] = useState<DrafExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountNumber = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountNumber ? +value : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    dispatch({ type: "add-expense", payload: { expense } });
  };

  return (
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo gasto</legend>
      {error && <ErrorMessage error={error} />}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Monto:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="$500"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Monto:
        </label>
        <select id="category" className="bg-slate-100 p-2" name="category" value={expense.category} onChange={handleChange}>
          <option value="" disabled>
            --- Seleccionar ---
          </option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate} />
      </div>
      <input
        type="submit"
        className="w-full bg-blue-600 cursor-pointer text-white uppercase p-2 font-bold rounded-lg hover:bg-blue-700"
        value={"Guardar"}
      />
    </form>
  );
}
