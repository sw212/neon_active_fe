import { Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import "./global.css";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { registerRootComponent } from "expo";

const Tab = createBottomTabNavigator();

function Main() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-text">
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                sceneContainerStyle={{
                    backgroundColor: "rgb(42, 42, 49)",
                    paddingTop: insets.top,
                }}
            >
                <Tab.Screen name="home" component={HomeScreen} options={{ tabBarIcon: makeIconRender("home") }} />
                <Tab.Screen name="signup" component={SignUpScreen} options={{ tabBarIcon: makeIconRender("cog") }} />
            </Tab.Navigator>
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer
                theme={{
                    dark: true,
                    colors: {
                        background: "#161619",
                    },
                }}
            >
                <Main />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}
