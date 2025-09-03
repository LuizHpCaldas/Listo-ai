import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./src/contexts/AppContext";
import HomeScreen from "./src/screens/Home/HomeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
        <AppProvider>
          <HomeScreen />
          <StatusBar style="light" />
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
