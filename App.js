import { Text, View, ScrollView } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainScreen from "./src/screens/MainScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import NewWorkoutScreen from "./src/screens/newWorkoutScreen";
import TeamsScreen from "./src/screens/TeamsScreen";

import "./global.css";
import TeamsComponentNavigator from "./src/navigators/teamsComponentsNavigator";

const Tab = createBottomTabNavigator();

function Main() {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const headerBG = colors.headerBackground;

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Tab.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: headerBG,
                    },
                    tabBarStyle: {
                        backgroundColor: headerBG,
                    },
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "#254844",
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: makeIconRender("home"),
                    }}
                />
                <Tab.Screen
                    name="signup"
                    component={SignUpScreen}
                    options={{
                        tabBarIcon: makeIconRender("cog"),
                    }}
                />
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        tabBarIcon: makeIconRender("run"),
                    }}
                />
                <Tab.Screen
                    name="New Workout"
                    component={NewWorkoutScreen}
                    options={{
                        tabBarIcon: makeIconRender("plus-box-outline"),
                    }}
                />
                <Tab.Screen
                    name="Teams"
                    component={TeamsComponentNavigator}
                    options={{
                        tabBarIcon: makeIconRender("account-group"),
                    }}
                />
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
                        background: "rgb(22, 22, 24)",
                        text: "rgb(255, 255, 255)",
                        headerBackground: "rgb(231, 48, 91)",
                    },
                }}
            >
                <Main />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

function makeIconRender(name, size = 24) {
    return ({ color }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}
