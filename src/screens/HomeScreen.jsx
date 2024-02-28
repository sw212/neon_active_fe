import { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";

import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

import WorkoutCarousel from "../components/WorkoutCarousel";
import NeonDivider from "../components/shaders/NeonDivider";
import BarChart from "../components/BarChart";
import CumulativePointsChart from "../components/CumulativePointsChart";
import { NeonBackground } from "../components/shaders/NeonBackground";

export default function HomeScreen() {
    const { user, setUser } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

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
    }, [user.points]);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await API.get(`/users/${user._id}`);
                setUser({ ...user, points: response.data.users.points });
            } catch (err) {
                console.error(err);
            }
        };

        if (__DEV__) {
            fetchPoints();
        }
    }, []);

    return (
        status === "success" && (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="h-full pt-4 pb-6">
                    <View className="w-[80%] max-w-md mx-auto mb-4">
                        <Text className="text-white text-2xl ml-[10%]">Recent Workouts</Text>
                    </View>
                    <WorkoutCarousel workouts={workouts} />

                    <View className="w-[80%] max-w-md mx-auto my-4">
                        <View className="flex items-center">
                            <Text className="self-start text-white text-2xl ml-[10%]">Last 7 Days</Text>
                            <BarChart workouts={workouts} />
                        </View>
                    </View>

                    <View className="w-[80%] max-w-md mx-auto my-4">
                        <View className="flex items-center">
                            <Text className="self-start text-white text-2xl ml-[10%]">Total 30 Days</Text>
                            <CumulativePointsChart workouts={workouts} />
                        </View>
                    </View>
                </View>

                <NeonBackground />
            </ScrollView>
        )
    );
}
