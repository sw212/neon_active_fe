import { Text, View, ScrollView } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainScreen from "./src/screens/MainScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import NewWorkoutScreen from "./src/screens/newWorkoutScreen";
import TeamsScreen from "./src/screens/TeamsScreen";

import "./global.css";

const Tab = createBottomTabNavigator();

function Main() {
    const { colors } = useTheme();

    const headerBG = colors.headerBackground;

    return (
        <View className="flex-1">
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: makeIconRender("home"),
                        headerStyle: {
                            backgroundColor: headerBG,
                        },
                    }}
                />
                <Tab.Screen
                    name="signup"
                    component={SignUpScreen}
                    options={{
                        tabBarIcon: makeIconRender("cog"),
                        headerStyle: {
                            backgroundColor: headerBG,
                        },
                    }}
                />
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: headerBG,
                        },
                        tabBarIcon: makeIconRender("run"),
                    }}
                />
                <Tab.Screen
                    name="New Workout"
                    component={NewWorkoutScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: headerBG,
                        },
                        tabBarIcon: makeIconRender("run"),
                    }}
                />
                <Tab.Screen
                    name="Teams"
                    component={TeamsScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: headerBG,
                        },
                        tabBarIcon: makeIconRender("account-group"),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer
            theme={{
                dark: true,
                colors: {
                    background: "rgb(22, 22, 24)",
                    text: "rgb(255, 255, 255)",
                    headerBackground: "rgb(231, 48, 91)",
                },
            }}
        >
            <Main />
        </NavigationContainer>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}
