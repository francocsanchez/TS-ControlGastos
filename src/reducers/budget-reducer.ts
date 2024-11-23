import { v4 as uuidV4 } from "uuid";
import { DrafExpense, Expense } from "../types";

export type BudgetAction =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "reset-app" }
  | { type: "modal-action" }
  | { type: "add-expense"; payload: { expense: DrafExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expense: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expense: [],
};

export const budgetReducer = (state: BudgetState = initialState, action: BudgetAction) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
    };
  }

  if (action.type === "modal-action") {
    return {
      ...state,
      modal: !state.modal,
    };
  }

  const createExpense = (drafExpense: DrafExpense): Expense => {
    return {
      ...drafExpense,
      id: uuidV4(),
    };
  };

  if (action.type === "add-expense") {
    let newExpense = createExpense(action.payload.expense);
    return {
      ...state,
      expense: [...state.expense, newExpense],
      modal: false,
    };
  }
  return state;
};
