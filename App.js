import { useContext } from "react";
import { Text, View, ScrollView, Pressable, Button } from "react-native";
import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { UserProvider, UserContext } from "./src/contexts/UserContext";
import MainScreen from "./src/screens/MainScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import NewWorkoutScreen from "./src/screens/newWorkoutScreen";

import "./global.css";
import TeamsNavigator from "./src/stacknav/teamsNavigator";

const Tab = createBottomTabNavigator();

function Main() {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { user, setUser } = useContext(UserContext);
    const { goBack } = useNavigation();

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
            {!user ? (
                <View className="flex-1 bg-background ">
                    <Text className="text-3xl text-white self-center">NEON : Active</Text>

                    <SignInScreen />
                    <SignUpScreen />
                </View>
            ) : (
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
                        headerTitleAlign: "center",
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={() => ({
                            tabBarIcon: makeIconRender("home"),
                        })}
                    />
                    {/* <Tab.Screen
                    name="signup"
                    component={SignUpScreen}
                    options={{
                        tabBarIcon: makeIconRender("cog"),
                    }}
                    
                />
                /> */}
                    <Tab.Screen
                        name="Rank"
                        component={MainScreen}
                        options={({ navigation }) => ({
                            tabBarIcon: makeIconRender("run"),
                            headerLeft: () => (
                                <Ionicons
                                    name="arrow-back-outline"
                                    onPress={() => navigation.goBack()}
                                    size={24}
                                    color="black"
                                    style={{ marginLeft: 7 }}
                                />
                            ),
                        })}
                    />
                    <Tab.Screen
                        name="New Workout"
                        component={NewWorkoutScreen}
                        options={({ navigation }) => ({
                            tabBarIcon: makeIconRender("plus-box-outline"),
                            headerLeft: () => (
                                <Ionicons
                                    name="arrow-back-outline"
                                    onPress={() => navigation.goBack()}
                                    size={24}
                                    color="black"
                                    style={{ marginLeft: 7 }}
                                />
                            ),
                        })}
                    />
                    <Tab.Screen
                        name="Teams"
                        component={TeamsNavigator}
                        options={({ navigation, route }) => ({
                            tabBarIcon: makeIconRender("account-group"),
                            headerShown: false,
                            headerLeft: () => {
                                return (
                                    <Ionicons
                                        name="arrow-back-outline"
                                        onPress={() => navigation.goBack()}
                                        size={24}
                                        color="black"
                                        style={{ marginLeft: 7 }}
                                    />
                                );
                            },
                        })}
                    />
                </Tab.Navigator>
            )}
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <UserProvider>
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
            </UserProvider>
        </SafeAreaProvider>
    );
}

function makeIconRender(name, size = 24) {
    return ({ color }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}
