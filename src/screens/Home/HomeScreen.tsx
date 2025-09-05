import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Home, Store, BarChart3 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  const { userData, setUserData, activeList, setActiveList, mode, setMode } =
    useApp();
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

      setUserData({
        ...userData,
        shoppingHistory: [newList, ...userData.shoppingHistory],
      });

      setNewListName("");
      setShowNewList(false);
      setActiveList(newList.id);

      navigation.navigate("ListDetail", { listId: newList.id });
    }
  };

  const deleteList = (listId: string) => {
    setUserData({
      ...userData,
      shoppingHistory: userData.shoppingHistory.filter(
        (list) => list.id !== listId
      ),
    });

    if (activeList === listId) {
      setActiveList(
        userData.shoppingHistory.length > 1
          ? userData.shoppingHistory[0].id
          : null
      );
    }
  };

  const handleListPress = (listId: string) => {
    setActiveList(listId);
    navigation.navigate("ListDetail", { listId });
  };

  const handleModePress = (newMode: "home" | "market" | "analytics") => {
    setMode(newMode);

    if (newMode === "analytics") {
      navigation.navigate("Analytics");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["bottom"]}
    >
      <View style={{ flex: 1, padding: 16 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Logo size={40} />
            <View>
              <Text
                style={{ color: colors.text, fontSize: 24, fontWeight: "bold" }}
              >
                Listo
              </Text>
              <Text style={{ color: colors.muted }}>Smart </Text>
            </View>
          </View>

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
                  mode === "home" ? colors.primary : "transparent",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Home size={16} color={mode === "home" ? "#fff" : colors.muted} />
              <Text
                style={{
                  color: mode === "home" ? "#fff" : colors.muted,
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
                  mode === "market" ? colors.primary : "transparent",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Store
                size={16}
                color={mode === "market" ? "#fff" : colors.muted}
              />
              <Text
                style={{
                  color: mode === "market" ? "#fff" : colors.muted,
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
                  mode === "analytics" ? colors.primary : "transparent",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <BarChart3
                size={16}
                color={mode === "analytics" ? "#fff" : colors.muted}
              />
              <Text
                style={{
                  color: mode === "analytics" ? "#fff" : colors.muted,
                  fontSize: 12,
                }}
              >
                Análise
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <BudgetDisplay />

        {/* Listas */}
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
        </View>

        {showNewList && (
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
          data={userData.shoppingHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListCard
              list={item}
              isActive={activeList === item.id}
              onPress={() => handleListPress(item.id)}
              onDelete={() => deleteList(item.id)}
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
                Nenhuma lista criada ainda. Clique no + para criar sua primeira
                lista.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
