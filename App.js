import { useContext, useState } from "react";
import { Text, View, ScrollView, Pressable, Button } from "react-native";
import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

import AccountIcon from "./src/components/AccountIcon";
import NeonLoginBG from "./src/components/shaders/NeonLoginBG";


import "./global.css";
import TeamsNavigator from "./src/stacknav/teamsNavigator";
import UserScreen from "./src/screens/UserScreen";


const Stack = createStackNavigator();
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
                    <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
                        <NeonLoginBG />
                    </View>

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
                        options={({navigation}) => ({
                            tabBarIcon: makeIconRender("home"),
                            headerRight: () => {
                                return (
                                    <AccountIcon navigation={navigation}/>
                                )
                            }})
                        }
                    />
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
            headerRight: () => {
                return (
                    <AccountIcon navigation={navigation}/>
                )
            }
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
            headerRight: () => {
                return (
                    <AccountIcon navigation={navigation}/>
                )
            }
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
                    <Stack.Navigator>
                        <Stack.Screen name="main"component={Main} options={() => ({
                            headerShown: false
                                    })}/>
                        <Stack.Screen name="User" component={UserScreen} options={({navigation}) => ({headerStyle: {
                            backgroundColor: "rgb(231, 48, 91)",
                                    },
                            tabBarStyle: {
                                backgroundColor: "rgb(231, 48, 91)",
                                },
                                headerTitleAlign: "center", 
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
                                }
                                })}
            />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserProvider>
        </SafeAreaProvider>
    );
}

function makeIconRender(name, size = 24) {
    return ({ color }) => <MaterialCommunityIcons name={name} color={color} size={size} />;
}


