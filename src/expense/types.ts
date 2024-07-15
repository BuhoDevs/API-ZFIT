export interface CreateExpense {
  amount: number;
  categoryId: number;
  createdAt?: Date;
  description: string;
}

export interface ExpenseReport {
  category: string;
  totalAmount: number;
  count: number;
}

export interface IExpenseFilters {
  categoryId?: number;
  description?: string;
  startDate: Date;
  endDate: Date;
  skip: number;
  take: number;
}

export interface IExpensePatch {
  id: number;
  amount: number;
  categoryId: number;
  description: string;
}
