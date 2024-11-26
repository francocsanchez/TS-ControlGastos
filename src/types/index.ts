type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Categoria = {
  id: string;
  name: string;
  icon: string;
};

export type Expense = {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: Value;
};

export type DrafExpense = Omit<Expense, "id">;