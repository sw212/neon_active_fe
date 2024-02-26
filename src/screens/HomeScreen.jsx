import { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";

import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

import WorkoutCarousel from "../components/WorkoutCarousel";
import NeonDivider from "../components/shaders/NeonDivider";
import BarChart from "../components/BarChart";
import NeonBackground from "../components/shaders/NeonBackground";

export default function HomeScreen() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([
    ]);


    // idle | loading | success | error
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const fetchWorkouts = async () => {
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
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {status === "success" && (
                    <View className="h-full pt-4 pb-6">
                        <View className="w-[80%] max-w-md mx-auto mb-4">
                            <Text className="text-white text-2xl ml-[10%]">Recent Workouts</Text>
                            <WorkoutCarousel workouts={workouts} />
                        </View>

                        <View className="w-[80%] h-8 max-w-sm mx-auto">
                            <NeonDivider />
                        </View>

                        <View className="w-[80%] max-w-md mx-auto my-4">
                            <View className="flex items-center">
                                <Text className="self-start text-white text-2xl ml-[10%]">Past 7 Days</Text>
                                <BarChart workouts={workouts} />
                            </View>
                        </View>
                    </View>
                )}
                <NeonBackground />
            </ScrollView>
        </>
    );
}
