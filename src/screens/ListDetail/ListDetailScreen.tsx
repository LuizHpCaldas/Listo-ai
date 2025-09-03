import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus, Check, X, ArrowLeft } from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { colors } from "../../constants/colors";

const ListDetailScreen: React.FC = () => {
  const router = useRouter();
  const { listId } = useLocalSearchParams();
  const { userData, setUserData } = useApp();
  const [newProductName, setNewProductName] = useState("");

  const list = userData.shoppingHistory.find((l) => l.id === listId);

  if (!list) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg,
        }}
      >
        <Text style={{ color: colors.text }}>Lista não encontrada</Text>
      </View>
    );
  }

  const addProduct = () => {
    if (newProductName.trim()) {
      const newItem = {
        id: Date.now().toString(),
        name: newProductName.trim(),
        price: undefined,
        checked: false,
        addedAt: new Date().toISOString(),
      };

      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };

      setUserData({
        ...userData,
        shoppingHistory: userData.shoppingHistory.map((l) =>
          l.id === listId ? updatedList : l
        ),
      });

      setNewProductName("");
    }
  };

  const toggleItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };

    setUserData({
      ...userData,
      shoppingHistory: userData.shoppingHistory.map((l) =>
        l.id === listId ? updatedList : l
      ),
    });
  };

  const removeItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.filter((item) => item.id !== itemId),
    };

    setUserData({
      ...userData,
      shoppingHistory: userData.shoppingHistory.map((l) =>
        l.id === listId ? updatedList : l
      ),
    });
  };

  const itemsInCart = list.items.filter((item) => item.checked).length;
  const totalItems = list.items.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 16 }}
        >
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
          >
            {list.name}
          </Text>
          <Text style={{ color: colors.muted }}>
            {itemsInCart}/{totalItems} itens • R$ {list.totalSpent.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Adicionar produto */}
      <View
        style={{
          padding: 16,
          backgroundColor: colors.card,
          margin: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{ color: colors.text, fontWeight: "600", marginBottom: 12 }}
        >
          Adicionar produto
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TextInput
            placeholder="Nome do produto"
            placeholderTextColor={colors.muted}
            value={newProductName}
            onChangeText={setNewProductName}
            style={{
              flex: 1,
              backgroundColor: colors.border,
              padding: 12,
              borderRadius: 8,
              color: colors.text,
            }}
            onSubmitEditing={addProduct}
          />
          <TouchableOpacity
            onPress={addProduct}
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Plus color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de produtos */}
      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              backgroundColor: colors.card,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => toggleItem(item.id)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: item.checked ? colors.success : colors.muted,
                  backgroundColor: item.checked
                    ? colors.success
                    : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                {item.checked && <Check color="#fff" size={16} />}
              </TouchableOpacity>

              <Text
                style={{
                  color: item.checked ? colors.muted : colors.text,
                  flex: 1,
                  textDecorationLine: item.checked ? "line-through" : "none",
                }}
              >
                {item.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={{ padding: 4 }}
            >
              <X color={colors.danger} size={20} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 40 }}>
            <Text style={{ color: colors.muted, textAlign: "center" }}>
              Nenhum produto nesta lista. Adicione produtos acima.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ListDetailScreen;
