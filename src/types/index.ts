export interface Product {
  id: string;
  name: string;
  price?: number;
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

export interface UserData {
  monthlyBudget: number;
  shoppingHistory: ShoppingList[];
}

export type AppMode = "home" | "market" | "analytics";
