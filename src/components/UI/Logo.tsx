import React from "react";
import { View, Text } from "react-native";
import { ShoppingBag, Check } from "lucide-react-native";
import { colors } from "../../constants/colors";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 40, showText = false }) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 12 }}>
      {/* Logo com sacola e check */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 4,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {/* Sacola de compras */}
        <ShoppingBag size={size * 0.6} color="#fff" strokeWidth={2} />

        {/* Checkmark verde */}
        <View
          style={{
            position: "absolute",
            right: -2,
            bottom: -2,
            backgroundColor: colors.success,
            borderRadius: size * 0.2,
            padding: size * 0.1,
          }}
        >
          <Check size={size * 0.2} color="#fff" strokeWidth={3} />
        </View>
      </View>

      {/* Texto da logo (opcional) */}
      {showText && (
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: size * 0.6,
              fontWeight: "bold",
            }}
          >
            Listo
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: size * 0.3,
            }}
          >
            Smart Shopping
          </Text>
        </View>
      )}
    </View>
  );
};

export default Logo;
