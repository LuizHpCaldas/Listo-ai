import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./src/contexts/AppContext";
import HomeScreen from "./src/screens/Home/HomeScreen";
import ListDetailScreen from "./src/screens/ListDetail/ListDetailScreen";
import AnalyticsScreen from "./src/screens/Analytics/AnalyticsScreen";
import { colors } from "./src/constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg }}
        edges={["top"]}
      >
        <AppProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="ListDetail" component={ListDetailScreen} />
              <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
