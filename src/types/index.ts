export interface Product {
  id: string;
  name: string;
  price?: number;
  quantity: number; // Nova propriedade
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

// Adicione também um tipo para o modo de edição
export type EditMode = "price" | "quantity" | null;
