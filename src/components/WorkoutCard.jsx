import { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function WorkoutCard({ workout }) {
    const icon = useMemo(
        () => ({
            run: <MaterialCommunityIcons name="run-fast" size={24} color="white" />,
            weights: <MaterialCommunityIcons name="weight-lifter" size={24} color="white" />,
            // Walk: <FontAwesome5 name="walking" size={24} color="white" />,
            stretching: <MaterialCommunityIcons name="yoga" size={24} color="white" />,
        }),
        []
    );

    const duration = workout.duration;
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    const hoursDisplay = hours ? `${hours}h` : "";
    const minutesDisplay = `${hours ? " " : ""}${minutes}m`;
    const durationDisplay = hoursDisplay + minutesDisplay;

    return (
        <View className="py-2">
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
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
                <View className="flex-row pb-2 justify-between">
                    <View className="flex-row pr-8 gap-x-4">
                        <Text className="text-white">{workout.type}</Text>
                        <Text className="text-white">{new Date(workout.addedAt).toDateString()}</Text>
                    </View>
                    <Text className="text-white">{durationDisplay}</Text>
                </View>

                <View>{icon[workout.type]}</View>
            </LinearGradient>
        </View>
    );
}
