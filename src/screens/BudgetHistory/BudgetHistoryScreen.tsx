import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { colors } from "../../constants/colors";

const BudgetHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useApp();

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split("-");
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 16 }}
          >
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
          <Text
            style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}
          >
            Histórico de Gastos
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Calendar color={colors.primary} size={20} />
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              Mês Atual
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: colors.muted }}>Orçamento:</Text>
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              R$ {state.user?.monthlyBudget.toFixed(2)}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: colors.muted }}>Gasto até agora:</Text>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              R${" "}
              {state.lists
                .reduce((total, list) => total + list.totalSpent, 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 16,
          }}
        >
          Meses Anteriores
        </Text>

        <FlatList
          data={state.user?.budgetHistory?.slice().reverse() || []}
          keyExtractor={(item) => item.month}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.card,
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: colors.text, fontWeight: "600" }}>
                  {formatMonth(item.month)}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      item.spent <= item.budget
                        ? colors.success + "20"
                        : colors.danger + "20",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.spent <= item.budget
                          ? colors.success
                          : colors.danger,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {item.spent <= item.budget
                      ? "Dentro do orçamento"
                      : "Fora do orçamento"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: colors.muted }}>Orçamento:</Text>
                <Text style={{ color: colors.text }}>
                  R$ {item.budget.toFixed(2)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: colors.muted }}>Gasto total:</Text>
                <Text
                  style={{
                    color:
                      item.spent <= item.budget
                        ? colors.success
                        : colors.danger,
                    fontWeight: "600",
                  }}
                >
                  R$ {item.spent.toFixed(2)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.muted }}>Saldo:</Text>
                <Text
                  style={{
                    color:
                      item.budget - item.spent >= 0
                        ? colors.success
                        : colors.danger,
                    fontWeight: "600",
                  }}
                >
                  R$ {Math.abs(item.budget - item.spent).toFixed(2)}
                  {item.budget - item.spent < 0 && " ( negativo )"}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: "center", padding: 40 }}>
              <TrendingUp color={colors.muted} size={40} />
              <Text
                style={{
                  color: colors.muted,
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                Nenhum histórico disponível ainda.
                {"\n"}Seu histórico aparecerá aqui no próximo mês.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetHistoryScreen;
