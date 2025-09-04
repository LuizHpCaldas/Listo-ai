import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, Check } from "lucide-react-native";
import { ShoppingList } from "../../types";
import { colors } from "../../constants/colors";

interface ListCardProps {
  list: ShoppingList;
  isActive: boolean;
  onPress: () => void;
  onDelete: () => void;
  showDelete?: boolean;
}

const ListCard: React.FC<ListCardProps> = ({
  list,
  isActive,
  onPress,
  onDelete,
  showDelete = true,
}) => {
  const itemsInCart = list.items.filter((item) => item.checked).length;
  const isCompleted = !!list.completedAt;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderWidth: 2,
        borderColor: isActive
          ? colors.primary
          : isCompleted
          ? colors.success
          : colors.border,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        opacity: isCompleted ? 0.8 : 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            flex: 1,
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: isCompleted
                ? colors.success
                : itemsInCart > 0
                ? colors.warning
                : colors.border,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}
            >
              {list.name}
            </Text>
            <Text style={{ color: colors.muted, marginTop: 4 }}>
              {itemsInCart}/{list.items.length} itens • R${" "}
              {list.totalSpent.toFixed(2)}
            </Text>

            {isCompleted && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 4,
                }}
              >
                <Check color={colors.success} size={16} />
                <Text style={{ color: colors.success }}>Concluída</Text>
              </View>
            )}
          </View>
        </View>

        {showDelete && !isCompleted && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 color={colors.danger} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
