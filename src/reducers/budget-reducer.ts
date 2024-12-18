import { v4 as uuidV4 } from "uuid";
import { Categoria, DrafExpense, Expense } from "../types";

export type BudgetAction =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "reset-app" }
  | { type: "modal-action" }
  | { type: "add-expense"; payload: { expense: DrafExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "add-filter-category"; payload: { id: Categoria["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Categoria["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
  currentCategory: "",
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
      budget: 0,
      modal: false,
      expenses: [],
      editingId: "",
    };
  }

  if (action.type === "modal-action") {
    return {
      ...state,
      modal: !state.modal,
      editingId: "",
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
      expenses: [...state.expenses, newExpense],
      modal: false,
    };
  }

  if (action.type === "remove-expense") {
    let UpdateExpenses = state.expenses.filter((expense) => expense.id !== action.payload.id);
    return {
      ...state,
      expenses: UpdateExpenses,
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id === action.payload.expense.id ? action.payload.expense : expense)),
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }
  return state;
};
