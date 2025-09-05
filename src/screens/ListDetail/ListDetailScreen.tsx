import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Plus,
  Check,
  X,
  ArrowLeft,
  Store,
  Edit3,
  ShoppingBag,
} from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { RootStackParamList } from "../../types/navigation";
import { ShoppingList, Product } from "../../types";
import { colors } from "../../constants/colors";
import ProductEditModal from "../../components/Product/ProductEditModal";

type ListDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ListDetail"
>;

const ListDetailScreen: React.FC = () => {
  const navigation = useNavigation<ListDetailScreenNavigationProp>();
  const route = useRoute();
  const { listId } = route.params as { listId: string };
  const { userData, setUserData, mode } = useApp();
  const [newProductName, setNewProductName] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const list = userData.shoppingHistory.find(
    (l: ShoppingList) => l.id === listId
  );

  if (!list) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.text }}>Lista não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const addProduct = () => {
    if (newProductName.trim()) {
      const newItem: Product = {
        id: Date.now().toString(),
        name: newProductName.trim(),
        price: undefined,
        quantity: 1,
        checked: false,
        addedAt: new Date().toISOString(),
      };

      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };

      updateList(updatedList);
      setNewProductName("");
    }
  };

  const updateList = (updatedList: ShoppingList) => {
    const totalSpent = updatedList.items.reduce(
      (total: number, item: Product) => {
        return item.checked && item.price
          ? total + item.price * item.quantity
          : total;
      },
      0
    );

    updatedList.totalSpent = totalSpent;

    setUserData({
      ...userData,
      shoppingHistory: userData.shoppingHistory.map((l: ShoppingList) =>
        l.id === listId ? updatedList : l
      ),
    });
  };

  const toggleItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.map((item: Product) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };

    updateList(updatedList);
  };

  const removeItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.filter((item: Product) => item.id !== itemId),
    };

    updateList(updatedList);
  };

  const editItem = (itemId: string) => {
    setEditingProduct(itemId);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (price: number, quantity: number) => {
    if (editingProduct) {
      const updatedList = {
        ...list,
        items: list.items.map((item: Product) =>
          item.id === editingProduct
            ? { ...item, price, quantity, checked: true }
            : item
        ),
      };

      updateList(updatedList);
      setEditModalVisible(false);
      setEditingProduct(null);
    }
  };

  const completeList = () => {
    Alert.alert(
      "Finalizar Compra",
      `Deseja marcar a lista "${list.name}" como concluída?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Finalizar",
          onPress: () => {
            const updatedList = {
              ...list,
              completedAt: new Date().toISOString(),
            };

            setUserData({
              ...userData,
              shoppingHistory: userData.shoppingHistory.map((l: ShoppingList) =>
                l.id === listId ? updatedList : l
              ),
            });

            Alert.alert(
              "Lista Concluída!",
              `Compra de ${list.name} finalizada com sucesso!`,
              [{ text: "OK", onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const itemsInCart = list.items.filter((item: Product) => item.checked).length;
  const totalItems = list.items.length;
  const allItemsChecked = itemsInCart === totalItems && totalItems > 0;
  const editingProductData = list.items.find(
    (item: Product) => item.id === editingProduct
  );
  const isCompleted = !!list.completedAt;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["bottom"]}
    >
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
          onPress={() => navigation.goBack()}
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
          {isCompleted && (
            <Text style={{ color: colors.success, fontSize: 12, marginTop: 2 }}>
              ✓ Concluída em{" "}
              {new Date(list.completedAt!).toLocaleDateString("pt-BR")}
            </Text>
          )}
        </View>
      </View>

      {/* Modo Mercado Banner */}
      {mode === "market" && !isCompleted && (
        <View
          style={{
            backgroundColor: colors.warning + "20",
            padding: 12,
            margin: 16,
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: colors.warning,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Store color={colors.warning} size={20} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              Modo Mercado Ativo
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12 }}>
              Toque nos itens para adicionar preço e quantidade
            </Text>
          </View>
        </View>
      )}

      {/* Adicionar produto (só no modo casa e lista não concluída) */}
      {mode === "home" && !isCompleted && (
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
      )}

      {/* Lista de produtos */}
      <FlatList
        data={list.items}
        keyExtractor={(item: Product) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }: { item: Product }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              backgroundColor: colors.card,
              borderRadius: 12,
              marginBottom: 8,
              opacity: isCompleted ? 0.7 : 1,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <TouchableOpacity
                onPress={() =>
                  !isCompleted &&
                  (mode === "market" ? editItem(item.id) : toggleItem(item.id))
                }
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
                disabled={isCompleted}
              >
                {item.checked && <Check color="#fff" size={16} />}
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: item.checked ? colors.muted : colors.text,
                    textDecorationLine: item.checked ? "line-through" : "none",
                  }}
                >
                  {item.name}
                </Text>

                {item.checked && item.price && (
                  <Text
                    style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}
                  >
                    {item.quantity}x • R$ {item.price.toFixed(2)} = R${" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </Text>
                )}
              </View>
            </View>

            {mode === "market" && !item.checked && !isCompleted && (
              <TouchableOpacity
                onPress={() => editItem(item.id)}
                style={{ padding: 4 }}
              >
                <Edit3 color={colors.primary} size={20} />
              </TouchableOpacity>
            )}

            {!isCompleted && (
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={{ padding: 4, marginLeft: 8 }}
              >
                <X color={colors.danger} size={20} />
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 40 }}>
            <Text style={{ color: colors.muted, textAlign: "center" }}>
              {mode === "market"
                ? "Nenhum produto para comprar. Volte para o modo Casa para adicionar itens."
                : "Nenhum produto nesta lista. Adicione produtos acima."}
            </Text>
          </View>
        }
      />

      {/* Botão Finalizar Compra */}
      {mode === "market" && !isCompleted && allItemsChecked && (
        <View
          style={{
            padding: 16,
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <TouchableOpacity
            onPress={completeList}
            style={{
              backgroundColor: colors.success,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <ShoppingBag color="#fff" size={20} />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Finalizar Compra
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Status de Lista Concluída */}
      {isCompleted && (
        <View
          style={{
            padding: 16,
            backgroundColor: colors.success + "20",
            margin: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Check color={colors.success} size={24} />
          <Text
            style={{ color: colors.success, fontWeight: "bold", marginTop: 8 }}
          >
            Lista Concluída
          </Text>
          <Text
            style={{ color: colors.muted, textAlign: "center", marginTop: 4 }}
          >
            Esta lista foi finalizada em{" "}
            {new Date(list.completedAt!).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      )}

      {/* Modal de edição */}
      <ProductEditModal
        visible={editModalVisible}
        productName={editingProductData?.name || ""}
        currentPrice={editingProductData?.price}
        currentQuantity={editingProductData?.quantity || 1}
        onSave={handleSaveEdit}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingProduct(null);
        }}
      />
    </SafeAreaView>
  );
};

export default ListDetailScreen;
