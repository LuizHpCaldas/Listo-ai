export interface Product {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  checked: boolean;
  addedAt: string;
  purchasedAt?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: Product[];
  createdAt: string;
  completedAt?: string;
  budget?: number;
  totalSpent: number;
}

export interface BudgetHistory {
  month: string;
  budget: number;
  spent: number;
}

export interface UserData {
  monthlyBudget: number;
  shoppingHistory: ShoppingList[];
  budgetHistory: BudgetHistory[];
  lastResetDate: string;
}

export type AppMode = "home" | "market" | "analytics";
export type EditMode = "price" | "quantity" | null;
