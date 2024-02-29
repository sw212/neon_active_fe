import GenerateWorkoutScreen from "../screens/GenerateWorkoutScreen";
import DisplayWorkoutScreen from "../screens/DisplayWorkoutScreen";
const Stack = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AccountIcon from "../components/AccountIcon";

export default function GenerateNav({ navigation }) {
    const isFocused = useIsFocused();
    const [workoutPlan,setWorkoutPlan] = useState([]) 
    useEffect(() => {
        if (isFocused) {
            navigation.navigate("Generate Workout");
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
            initialRouteName="Generate Workout"
        >
            <Stack.Screen
                name="Generate Workout"
                component={GenerateWorkoutScreen}
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
                name="Display Workout"
                component={DisplayWorkoutScreen}
                initialParams={{workoutPlan, isLoaded}}

                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back-outline"
                            onPress={() => navigation.navigate("Generate Workout")}
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