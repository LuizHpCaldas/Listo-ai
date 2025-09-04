import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../../contexts/AppContext";
import { colors } from "../../constants/colors";

const AnalyticsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData } = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 20 }}
      >
        <ArrowLeft color={colors.text} size={24} />
      </TouchableOpacity>

      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Análise de Compras
      </Text>

      <Text style={{ color: colors.muted }}>
        Tela de análise em desenvolvimento...
      </Text>
    </View>
  );
};

export default AnalyticsScreen;
