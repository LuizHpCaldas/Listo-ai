import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData, ShoppingList, AppMode } from "../types";
import { storage } from "../services/storage";
import { monthlyReset } from "../services/monthlyReset";

interface AppState {
  user: UserData | null;
  lists: ShoppingList[];
  activeList: string | null;
  mode: AppMode;
  budget: number;
}

type AppAction =
  | { type: "SET_USER"; payload: UserData }
  | { type: "SET_LISTS"; payload: ShoppingList[] }
  | { type: "ADD_LIST"; payload: ShoppingList }
  | { type: "UPDATE_LIST"; payload: ShoppingList }
  | { type: "DELETE_LIST"; payload: string }
  | { type: "SET_ACTIVE_LIST"; payload: string | null }
  | { type: "SET_MODE"; payload: AppMode }
  | { type: "SET_BUDGET"; payload: number };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LISTS":
      return { ...state, lists: action.payload };
    case "ADD_LIST":
      return { ...state, lists: [action.payload, ...state.lists] };
    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    case "SET_ACTIVE_LIST":
      return { ...state, activeList: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(appReducer, {
    user: null,
    lists: [],
    activeList: null,
    mode: "home",
    budget: 700,
  });

  const loadUserData = async () => {
    try {
      const resetData = await monthlyReset.checkAndReset();

      if (resetData) {
        dispatch({ type: "SET_USER", payload: resetData });
        dispatch({ type: "SET_LISTS", payload: resetData.shoppingHistory });
        dispatch({ type: "SET_BUDGET", payload: resetData.monthlyBudget });

        if (resetData.shoppingHistory.length > 0) {
          dispatch({
            type: "SET_ACTIVE_LIST",
            payload: resetData.shoppingHistory[0].id,
          });
        }
      } else {
        const userData = await storage.getUserData();
        if (userData) {
          dispatch({ type: "SET_USER", payload: userData });
          dispatch({ type: "SET_LISTS", payload: userData.shoppingHistory });
          dispatch({ type: "SET_BUDGET", payload: userData.monthlyBudget });

          if (userData.shoppingHistory.length > 0) {
            dispatch({
              type: "SET_ACTIVE_LIST",
              payload: userData.shoppingHistory[0].id,
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (state.user) {
      storage.saveUserData(state.user);
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
