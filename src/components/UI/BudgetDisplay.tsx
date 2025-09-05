import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Target, Edit2, Check, X } from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { colors } from "../../constants/colors";

const BudgetDisplay: React.FC = () => {
  const { state, dispatch } = useApp();
  const [editingBudget, setEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(state.budget.toString());

  const totalSpent = state.lists.reduce(
    (total, list) => total + list.totalSpent,
    0
  );
  const remaining = state.budget - totalSpent;

  const updateBudget = () => {
    const budgetValue = parseFloat(newBudget) || 0;
    dispatch({ type: "SET_BUDGET", payload: budgetValue });

    if (state.user) {
      const updatedUser = {
        ...state.user,
        monthlyBudget: budgetValue,
      };
      dispatch({ type: "SET_USER", payload: updatedUser });
    }

    setEditingBudget(false);
  };

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: colors.card,
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Target color={colors.muted} size={20} />
          <Text style={{ color: colors.text, fontWeight: "600" }}>
            Orçamento Mensal
          </Text>
        </View>

        {editingBudget ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TextInput
              value={newBudget}
              onChangeText={setNewBudget}
              keyboardType="decimal-pad"
              style={{
                width: 100,
                backgroundColor: colors.border,
                padding: 8,
                borderRadius: 8,
                color: colors.text,
              }}
            />
            <TouchableOpacity onPress={updateBudget}>
              <Check color={colors.success} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingBudget(false)}>
              <X color={colors.danger} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setNewBudget(state.budget.toString());
              setEditingBudget(true);
            }}
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              R$ {state.budget.toFixed(2)}
            </Text>
            <Edit2 color={colors.muted} size={16} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 12,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: colors.muted, marginBottom: 4 }}>
            Gasto Total
          </Text>
          <Text style={{ color: colors.text, fontWeight: "700" }}>
            R$ {totalSpent.toFixed(2)}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: colors.muted, marginBottom: 4 }}>Restante</Text>
          <Text
            style={{
              color: remaining >= 0 ? colors.success : colors.danger,
              fontWeight: "700",
            }}
          >
            R$ {remaining.toFixed(2)}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 8,
          backgroundColor: colors.border,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${Math.min((totalSpent / state.budget) * 100, 100)}%`,
            backgroundColor:
              totalSpent > state.budget ? colors.danger : colors.success,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
};

export default BudgetDisplay;
