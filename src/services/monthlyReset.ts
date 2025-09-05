import { UserData, BudgetHistory, ShoppingList } from "../types";
import { storage } from "./storage";

export const monthlyReset = {
  needsReset: (userData: UserData): boolean => {
    if (!userData.lastResetDate) return true;

    const now = new Date();
    const lastReset = new Date(userData.lastResetDate);

    return (
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    );
  },

  performReset: async (userData: UserData): Promise<UserData> => {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const previousMonth = userData.lastResetDate
      ? new Date(userData.lastResetDate).toISOString().slice(0, 7)
      : new Date(now.getFullYear(), now.getMonth() - 1, 1)
          .toISOString()
          .slice(0, 7);

    const spent = userData.shoppingHistory.reduce(
      (total, list) => total + list.totalSpent,
      0
    );

    const previousMonthHistory: BudgetHistory = {
      month: previousMonth,
      budget: userData.monthlyBudget,
      spent: spent,
    };

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: `Compras ${currentMonth}`,
      items: [],
      createdAt: now.toISOString(),
      totalSpent: 0,
    };

    const updatedUserData: UserData = {
      ...userData,
      monthlyBudget: userData.monthlyBudget,
      shoppingHistory: [newList],
      budgetHistory: [...(userData.budgetHistory || []), previousMonthHistory],
      lastResetDate: now.toISOString(),
    };

    await storage.saveUserData(updatedUserData);
    return updatedUserData;
  },

  checkAndReset: async (): Promise<UserData | null> => {
    try {
      const userData = await storage.getUserData();
      if (userData && monthlyReset.needsReset(userData)) {
        return await monthlyReset.performReset(userData);
      }
      return userData;
    } catch (error) {
      console.error("Erro ao verificar reset mensal:", error);
      return null;
    }
  },
};
