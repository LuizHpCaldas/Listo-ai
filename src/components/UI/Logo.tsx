import React from "react";
import { View } from "react-native";
import { Check } from "lucide-react-native";
import { colors } from "../../constants/colors";

const Logo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Letra L */}
      <View
        style={{
          position: "absolute",
          left: size * 0.25,
          top: size * 0.2,
          width: size * 0.15,
          height: size * 0.6,
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: size * 0.25,
          top: size * 0.6,
          width: size * 0.3,
          height: size * 0.15,
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      />

      {/* Checkmark */}
      <Check
        size={size * 0.5}
        color="#fff"
        style={{
          position: "absolute",
          right: size * 0.15,
          bottom: size * 0.15,
        }}
      />
    </View>
  );
};

export default Logo;
