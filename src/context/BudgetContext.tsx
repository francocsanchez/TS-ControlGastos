import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { BudgetAction, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextPropos = {
  state: BudgetState;
  dispatch: Dispatch<BudgetAction>;
};

type BudgetProviderProps = {
  children: ReactNode;
};
export const BudgetContext = createContext<BudgetContextPropos>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  //Funciones para exportar
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return <BudgetContext.Provider value={{ state, dispatch }}>{children}</BudgetContext.Provider>;
};
