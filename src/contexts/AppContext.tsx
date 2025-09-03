import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData, ShoppingList, AppMode } from "../types";
import { storage } from "../services/storage";

interface AppContextType {
  userData: UserData;
  setUserData: (data: UserData) => void;
  activeList: string | null;
  setActiveList: (listId: string | null) => void;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    monthlyBudget: 700,
    shoppingHistory: [],
  });
  const [activeList, setActiveList] = useState<string | null>(null);
  const [mode, setMode] = useState<AppMode>("home");

  const loadUserData = async () => {
    try {
      const data = await storage.getUserData();
      if (data) {
        setUserData(data);
        if (data.shoppingHistory.length > 0) {
          setActiveList(data.shoppingHistory[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const refreshData = () => {
    loadUserData();
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    storage.saveUserData(userData);
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        activeList,
        setActiveList,
        mode,
        setMode,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
