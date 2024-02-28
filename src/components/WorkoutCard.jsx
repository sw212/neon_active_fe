import { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function WorkoutCard({ workout }) {
    const icon = useMemo(
        () => ({
            cardio: <MaterialCommunityIcons name="run-fast" size={48} color="white" />,
            weights: <MaterialCommunityIcons name="weight-lifter" size={48} color="white" />,
            // Walk: <FontAwesome5 name="walking" size={48} color="white" />,
            stretching: <MaterialCommunityIcons name="yoga" size={48} color="white" />,
        }),
        []
    );

    const duration = workout.duration;
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    const hoursDisplay = hours ? `${hours}h` : "";
    const minutesDisplay = `${hours ? " " : ""}${minutes}m`;
    const durationDisplay = hoursDisplay + minutesDisplay;

    const borderColors = {
        cardio: "rgb(244, 83, 75)",
        weights: "rgb(172, 99, 245)",
        stretching: "rgb(116, 244, 134)",
    };

    return (
        <View className="py-2 min-w-[200]">
            <LinearGradient
                style={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    border: "solid",
                    borderWidth: 1,
                    borderColor: borderColors[workout.type],
                    borderRadius: 12,
                }}
                colors={["rgba(75, 15, 75, 0.1)", "transparent"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
                <View className="flex gap-y-2">
                    <View className="flex-row justify-between">
                        <View className="flex-row pr-10">
                            <Text className="text-white">{workout.type[0].toUpperCase() + workout.type.slice(1)}</Text>
                        </View>
                        <Text className="text-white">{durationDisplay}</Text>
                    </View>

                    <View className="py-2 self-center">{icon[workout.type]}</View>

                    <Text className="text-white">{new Date(workout.addedAt).toDateString()}</Text>
                </View>
            </LinearGradient>
        </View>
    );
}
