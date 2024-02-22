import { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function WorkoutCard({ workout }) {
    const icon = useMemo(
        () => ({
            Run: <MaterialCommunityIcons name="run-fast" size={24} color="white" />,
            Gym: <MaterialCommunityIcons name="weight-lifter" size={24} color="white" />,
            Walk: <FontAwesome5 name="walking" size={24} color="white" />,
            Stretch: <MaterialCommunityIcons name="yoga" size={24} color="white" />,
        }),
        []
    );

    return (
        <View className="py-2">
            {/* <View className="min-w-[75%] mx-auto py-2 px-4 border border-white rounded-xl" /> */}
            <LinearGradient
                style={{
                    minWidth: "75%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 12,
                }}
                colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                // colors={["#4c669f", "#3b5998", "#192f6a"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
                <View className="flex-row pb-2 justify-between">
                    <View className="flex-row pr-8 gap-x-4">
                        <Text className="text-white">{workout.type}</Text>
                        <Text className="text-white">{workout.date.toDateString()}</Text>
                    </View>
                    <Text className="text-white">{workout.duration}m</Text>
                </View>

                <View>{icon[workout.type]}</View>
            </LinearGradient>
        </View>
    );
}
