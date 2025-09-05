import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, BarChart3 } from "lucide-react-native";
import { useApp } from "../../contexts/AppContext";
import { colors } from "../../constants/colors";

const AnalyticsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useApp();

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
            Análises e Estatísticas
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
            <BarChart3 color={colors.primary} size={20} />
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              Resumo Geral
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: colors.muted }}>Total de Listas:</Text>
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              {state.lists.length}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: colors.muted }}>Listas Concluídas:</Text>
            <Text style={{ color: colors.success, fontWeight: "600" }}>
              {state.lists.filter((list) => list.completedAt).length}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: colors.muted }}>Total Gasto:</Text>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              R${" "}
              {state.lists
                .reduce((total, list) => total + list.totalSpent, 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: colors.muted, textAlign: "center", marginTop: 40 }}
        >
          Mais análises em breve...
          {"\n"}Estatísticas detalhadas estarão disponíveis em futuras
          atualizações.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
