import TeamsListScreen from "../screens/TeamsListScreen";
import MembersForThisTeamScreen from "../screens/MembersForThisTeamScreen";
const Stack = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AccountIcon from "../components/AccountIcon";

export default function TeamsNavigator({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            navigation.navigate("My Teams");
        }
    }, [isFocused, navigation]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "rgb(231, 48, 91)",
                },
                tabBarStyle: {
                    backgroundColor: "rgb(231, 48, 91)",
                },
                headerTitleAlign: "center",
            }}
            initialRouteName="My Teams"
        >
            <Stack.Screen
                name="My Teams"
                component={TeamsListScreen}
                navigation={navigation}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back-outline"
                            onPress={() => navigation.navigate("Home")}
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
            <Stack.Screen
                name="This Team Members"
                component={MembersForThisTeamScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back-outline"
                            onPress={() => navigation.navigate("My Teams")}
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
        </Stack.Navigator>
    );
}
