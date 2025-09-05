import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { X, Check, DollarSign, Hash } from "lucide-react-native";
import { colors } from "../../constants/colors";

interface ProductEditModalProps {
  visible: boolean;
  productName: string;
  currentPrice?: number;
  currentQuantity: number;
  onSave: (price: number, quantity: number) => void;
  onCancel: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  visible,
  productName,
  currentPrice,
  currentQuantity,
  onSave,
  onCancel,
}) => {
  const [price, setPrice] = useState(currentPrice?.toString() || "");
  const [quantity, setQuantity] = useState(currentQuantity.toString());

  const handleSave = () => {
    const priceValue = parseFloat(price.replace(",", ".")) || 0;
    const quantityValue = parseInt(quantity) || 1;
    onSave(priceValue, quantityValue);
  };

  const total =
    (parseFloat(price.replace(",", ".")) || 0) * (parseInt(quantity) || 1);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 16,
            width: "80%",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {productName}
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: colors.muted, marginBottom: 8 }}>
              Preço unitário
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.border,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <DollarSign color={colors.muted} size={20} />
              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="0,00"
                placeholderTextColor={colors.muted}
                style={{ flex: 1, color: colors.text, marginLeft: 8 }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: colors.muted, marginBottom: 8 }}>
              Quantidade
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.border,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <Hash color={colors.muted} size={20} />
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
                placeholder="1"
                placeholderTextColor={colors.muted}
                style={{ flex: 1, color: colors.text, marginLeft: 8 }}
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.primary + "20",
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Total: R$ {total.toFixed(2)}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                flex: 1,
                backgroundColor: colors.danger,
                padding: 12,
                borderRadius: 8,
                marginRight: 8,
                alignItems: "center",
              }}
            >
              <X color="#fff" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={{
                flex: 1,
                backgroundColor: colors.success,
                padding: 12,
                borderRadius: 8,
                marginLeft: 8,
                alignItems: "center",
              }}
            >
              <Check color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductEditModal;
