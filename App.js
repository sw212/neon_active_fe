import { Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import "./global.css";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { registerRootComponent } from "expo";

const Tab = createBottomTabNavigator();

registerRootComponent(App);

export default function App() {
    return (
        <NavigationContainer
            theme={{
                dark: true,
                colors: {
                    background: "#161619",
                },
            }}
        >
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: makeIconRender("home") }} />
                <Tab.Screen name="signup" component={SignUpScreen} options={{ tabBarIcon: makeIconRender("cog") }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}
