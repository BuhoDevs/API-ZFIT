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
