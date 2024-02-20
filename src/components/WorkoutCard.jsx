import { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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
            <View className="min-w-[75%] mx-auto py-2 px-4 border border-white rounded-xl">
                <View className="flex-row pb-2 justify-between">
                    <View className="flex-row pr-8 gap-x-4">
                        <Text className="text-white">{workout.type}</Text>
                        <Text className="text-white">{workout.date.toDateString()}</Text>
                    </View>
                    <Text className="text-white">{workout.duration}m</Text>
                </View>

                <View>{icon[workout.type]}</View>
            </View>
        </View>
    );
}
