import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { View, Text, ScrollView, Pressable } from "react-native";

import { API } from "../utils/api";
import PieChart from "../components/PieChart";

export default function UserScreen({ navigation }) {
    const { user, setUser } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

    // idle | loading | success | error
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!user) {
                return;
            }

            setStatus("loading");

            try {
                const response = await API.get(`/user/workouts/${user.username}`);
                setWorkouts(response.data.workouts);
                setStatus("success");
            } catch (err) {
                setStatus("error");
            }
        };
        fetchWorkouts();
    }, [user?.points]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex items-center my-5">
                <Text className="p-6 text-white text-3xl">Hello {user?.firstName}</Text>
                <Pressable
                    className="border border-white rounded-xl"
                    onPress={() => {
                        setUser(null);
                        navigation.navigate("main");
                    }}
                >
                    <Text className="text-white px-4 py-2">Log Out</Text>
                </Pressable>
            </View>
            {status === "success" && (
                <View className="mx-auto my-5">
                    <View className="flex">
                        <Text className="text-white text-2xl self-center underline">Exercise Profile</Text>
                        <PieChart workouts={workouts} />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}
