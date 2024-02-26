import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import NeonBackground from "../components/shaders/NeonBackground";
import { UserContext } from "../contexts/UserContext";
import { API } from "../utils/api";

export default function NewWorkoutScreen() {
    const { colors } = useTheme();
    const { user } = useContext(UserContext);

    const [duration, setDuration] = useState(0);
    const [exerciseType, setExerciseType] = useState();

    let exercisePoints = 0;
    if (exerciseType === "run" || exerciseType === "weights") {
        exercisePoints = duration * 2;
    } else {
        exercisePoints = duration;
    }

    const handleWorkoutTypeChange = (value) => {
        setExerciseType(value);
    };

    const handleDurationChange = (e) => {
        const { text } = e.nativeEvent;

        if (!isNaN(text) && !isNaN(parseFloat(text))) {
            setDuration(Number(text));
        } else {
            setDuration(0);
        }
    };

    const handleSubmit = async (duration, exerciseType) => {
        const data = {
            duration,
            type: exerciseType,
        };
        try {
            const reqHeaders = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `jwt ${user.token}`,
                },
            };
            const response = await API.post("/workouts/add", data, reqHeaders);
            return (
                <View>
                    <Text className="text-white">You Logged a workout, nice</Text>
                </View>
            );
        } catch (err) {
            console.error(err);
        }
    };

    const showAddWorkout = duration > 0 && exerciseType;

    return (
        <View className="flex flex-1 items-center pt-4">
            <Text className="text-white text-3xl"> Post a New Workout!</Text>
            <View className="flex py-4 gap-y-4 grow">
                <View>
                    <Text className="py-1 text-white text-xl">What Exercise Did You Do?</Text>
                    <View className="p-1 border border-white rounded-xl">
                        <Picker
                            style={{
                                color: "white",
                                backgroundColor: colors.background,
                            }}
                            selectedValue={exerciseType}
                            onValueChange={handleWorkoutTypeChange}
                        >
                            <Picker.Item label="Please Select" value="" />
                            <Picker.Item label="Run" value="run" />
                            <Picker.Item label="Weights" value="weights" />
                            <Picker.Item label="Stretching" value="stretching" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text className="py-1 text-white text-xl">How Long Did You Exercise For?</Text>
                    <TextInput
                        className="flex px-2 py-3 rounded-xl bg-white"
                        selectedValue={duration}
                        keyboardType="numeric"
                        onChange={handleDurationChange}
                    />
                </View>
            </View>

            <View className="py-2 basis-1/3">
                {showAddWorkout && (
                    <>
                        <View className="items-center py-1">
                            <Text className="text-white">
                                You Will earn {exercisePoints} points for logging this activity
                            </Text>
                        </View>
                        <View className="items-center">
                            <Pressable
                                className="items-center rounded-full bg-black py-2 px-2 m-2 w-48"
                                onPress={(e) => {
                                    e.preventDefault();
                                    handleSubmit(duration, exerciseType);
                                }}
                            >
                                <Text className="text-white">Log Workout</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
            <NeonBackground />
        </View>
    );
}
