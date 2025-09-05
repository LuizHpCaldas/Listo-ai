import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Plus, Home, Store, BarChart3, History } from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { ShoppingList } from "../../types";
import { RootStackParamList } from "../../types/navigation";
import BudgetDisplay from "../../components/UI/BudgetDisplay";
import ListCard from "../../components/List/ListCard";
import Logo from "../../components/UI/Logo";
import { colors } from "../../constants/colors";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { state, dispatch } = useApp();
  const [newListName, setNewListName] = useState("");
  const [showNewList, setShowNewList] = useState(false);

  const createList = () => {
    if (newListName.trim()) {
      const newList: ShoppingList = {
        id: Date.now().toString(),
        name: newListName.trim(),
        items: [],
        createdAt: new Date().toISOString(),
        totalSpent: 0,
      };

      const updatedUser = {
        ...state.user!,
        shoppingHistory: [newList, ...state.user!.shoppingHistory],
      };

      dispatch({ type: "SET_USER", payload: updatedUser });
      dispatch({ type: "ADD_LIST", payload: newList });

      setNewListName("");
      setShowNewList(false);
      dispatch({ type: "SET_ACTIVE_LIST", payload: newList.id });

      if (state.mode === "market") {
        navigation.navigate("ListDetail", { listId: newList.id });
      }
    }
  };

  const deleteList = (listId: string) => {
    const updatedUser = {
      ...state.user!,
      shoppingHistory: state.user!.shoppingHistory.filter(
        (list: ShoppingList) => list.id !== listId
      ),
    };

    dispatch({ type: "SET_USER", payload: updatedUser });
    dispatch({ type: "DELETE_LIST", payload: listId });

    if (state.activeList === listId) {
      dispatch({
        type: "SET_ACTIVE_LIST",
        payload: state.lists.length > 1 ? state.lists[0].id : null,
      });
    }
  };

  const handleListPress = (listId: string) => {
    dispatch({ type: "SET_ACTIVE_LIST", payload: listId });

    if (state.mode === "market") {
      navigation.navigate("ListDetail", { listId });
    }
  };

  const handleModePress = (newMode: "home" | "market" | "analytics") => {
    dispatch({ type: "SET_MODE", payload: newMode });

    if (newMode === "analytics") {
      navigation.navigate("Analytics");
    } else if (newMode === "market" && state.activeList) {
      navigation.navigate("ListDetail", { listId: state.activeList });
    }
  };

  const totalSpent = state.lists.reduce((total: number, list: ShoppingList) => {
    return total + list.totalSpent;
  }, 0);

  const remaining = state.budget - totalSpent;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["bottom"]}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Logo size={42} showText={true} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("BudgetHistory")}
              style={{
                backgroundColor: colors.primary,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <History color="#fff" size={20} />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.border,
                borderRadius: 12,
                padding: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => handleModePress("home")}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor:
                    state.mode === "home" ? colors.primary : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Home
                  size={16}
                  color={state.mode === "home" ? "#fff" : colors.muted}
                />
                <Text
                  style={{
                    color: state.mode === "home" ? "#fff" : colors.muted,
                    fontSize: 12,
                  }}
                >
                  Casa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleModePress("market")}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor:
                    state.mode === "market" ? colors.primary : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Store
                  size={16}
                  color={state.mode === "market" ? "#fff" : colors.muted}
                />
                <Text
                  style={{
                    color: state.mode === "market" ? "#fff" : colors.muted,
                    fontSize: 12,
                  }}
                >
                  Mercado
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleModePress("analytics")}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor:
                    state.mode === "analytics" ? colors.primary : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <BarChart3
                  size={16}
                  color={state.mode === "analytics" ? "#fff" : colors.muted}
                />
                <Text
                  style={{
                    color: state.mode === "analytics" ? "#fff" : colors.muted,
                    fontSize: 12,
                  }}
                >
                  Análise
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {state.mode === "market" && (
          <View
            style={{
              backgroundColor: colors.warning + "20",
              padding: 12,
              borderRadius: 12,
              borderLeftWidth: 4,
              borderLeftColor: colors.warning,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Store color={colors.warning} size={20} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                Modo Mercado Ativo
              </Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                Clique em uma lista para gerenciar compras e preços
              </Text>
            </View>
          </View>
        )}

        <BudgetDisplay />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
            Minhas Listas
          </Text>
          {state.mode === "home" && (
            <TouchableOpacity
              onPress={() => setShowNewList(true)}
              style={{
                backgroundColor: colors.primary,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Plus color="#fff" size={20} />
            </TouchableOpacity>
          )}
        </View>

        {showNewList && state.mode === "home" && (
          <View
            style={{
              backgroundColor: colors.card,
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <TextInput
              placeholder="Nome da lista"
              placeholderTextColor={colors.muted}
              value={newListName}
              onChangeText={setNewListName}
              style={{
                backgroundColor: colors.border,
                padding: 12,
                borderRadius: 12,
                color: colors.text,
                marginBottom: 12,
              }}
              onSubmitEditing={createList}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <TouchableOpacity onPress={() => setShowNewList(false)}>
                <Text style={{ color: colors.muted }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={createList}>
                <Text style={{ color: colors.primary, fontWeight: "600" }}>
                  Criar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList
          data={state.lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListCard
              list={item}
              isActive={state.activeList === item.id}
              onPress={() => handleListPress(item.id)}
              onDelete={() => deleteList(item.id)}
              showDelete={state.mode === "home"}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 40,
              }}
            >
              <Text style={{ color: colors.muted, textAlign: "center" }}>
                {state.mode === "market"
                  ? "Nenhuma lista disponível. Volte para o modo Casa para criar listas."
                  : "Nenhuma lista criada ainda. Clique no + para criar sua primeira lista."}
              </Text>
            </View>
          }
        />

        <View
          style={{
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 16,
            marginTop: 16,
            borderLeftWidth: 4,
            borderLeftColor: remaining >= 0 ? colors.success : colors.danger,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.muted }}>Saldo Total</Text>
            <Text
              style={{
                color: remaining >= 0 ? colors.success : colors.danger,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              R$ {remaining.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              height: 6,
              backgroundColor: colors.border,
              borderRadius: 3,
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${Math.min((totalSpent / state.budget) * 100, 100)}%`,
                backgroundColor:
                  totalSpent > state.budget ? colors.danger : colors.success,
              }}
            />
          </View>
          <Text
            style={{
              color: colors.muted,
              fontSize: 12,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            Gasto: R$ {totalSpent.toFixed(2)} / Orçamento: R${" "}
            {state.budget.toFixed(2)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
