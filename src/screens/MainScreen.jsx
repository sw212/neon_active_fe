import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, Image, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PointsBar from "../components/shaders/PointsBar";
import { NeonBadge } from "../components/shaders/NeonBadge";
import { NeonRoundedRect } from "../components/shaders/NeonRoundedRect";
import { NeonBackground } from "../components/shaders/NeonBackground";

import { MAX_RANK, POINTS_PER_RANK, RANK_NAMES, rankFromPoints } from "../utils/points";
import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

export default function MainScreen({ navigation }) {
    const { user, setUser } = useContext(UserContext);
    const [state, setState] = useState(0);

    // idle | loading | success | error
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const fetchData = async () => {
            setStatus("loading");
            try {
                const response = await API.get(`/users/${user._id}`);
                const userPoints = response.data.users.points;
                setUser((user) => ({ ...user, points: userPoints }));
                setStatus("success");
            } catch (error) {
                setStatus("error");
            }
        };
        fetchData();
    }, []);

    const points = user.points;
    const { rank, rankName } = rankFromPoints(points);
    const relativePoints = points % POINTS_PER_RANK;
    const pointsFraction = relativePoints / POINTS_PER_RANK;
    const prevRankName = rank ? RANK_NAMES[rank - 1] : "";
    const nextRankName = rank < MAX_RANK ? RANK_NAMES[rank + 1] : "";

    const width = Dimensions.get("window").width;

    return (
        status === "success" && (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 items-center">
                    <Pressable onPress={() => setState((v) => 1 - v)}>
                        <Text>Press Me</Text>
                    </Pressable>

                    <View style={{ width: 0.8 * width }} className="relative py-3 items-center">
                        <View className="flex-row w-full justify-between">
                            <Text className="self-start left-[10%] text-white">{rankName}</Text>
                            <Text className="self-end right-[10%] text-white">{nextRankName}</Text>
                        </View>
                        <View style={{ width: "100%", height: 60 }}>
                            <PointsBar frac={pointsFraction} />
                        </View>
                        <View className="w-full pl-[10%] pr-[15%]">
                            <Text style={{ left: `${pointsFraction * 100}%` }} className="self-start text-white ">
                                {relativePoints}/{POINTS_PER_RANK}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-1 pt-8">
                        <View className="p-8 border border-white rounded-xl">
                            <View className="flex items-center">
                                <Text className="text-white text-2xl">Current Rank:</Text>
                                <Text className="text-white text-2xl">{rankName}</Text>
                            </View>
                            <View className="flex items-center">
                                <View className="w-48 h-48">
                                    <NeonBadge />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        className="items-center rounded-lg p-4 m-2 w-48 "
                        onPress={() => navigation.navigate("New Workout")}
                    >
                        <Text className="text-white p-2 font-bold">Add a Workout</Text>
                        <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
                            <NeonRoundedRect
                                startX={0.1}
                                width={0.8}
                                length={0.8}
                                color={[0.1, 0.1, 0.9]}
                                radius={0.05}
                                intensity={2.5}
                            />
                        </View>
                    </Pressable>
                </View>

                <NeonBackground />
            </ScrollView>
        )
    );
}
