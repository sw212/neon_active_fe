import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { NeonBackground } from "../components/shaders/NeonBackground";
import { UserContext } from "../contexts/UserContext";
import { API } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";

export default function NewWorkoutScreen() {
    const { colors } = useTheme();
    const { user, setUser } = useContext(UserContext);

    const [duration, setDuration] = useState("");
    const [exerciseType, setExerciseType] = useState();

    const isValidDuration = !isNaN(duration) && !isNaN(parseFloat(duration));
    const workoutDuration = Number(duration);

    let exercisePoints = 0;
    if (exerciseType === "cardio" || exerciseType === "weights") {
        exercisePoints = workoutDuration * 2;
    } else {
        exercisePoints = workoutDuration;
    }

    const handleWorkoutTypeChange = (value) => {
        setExerciseType(value);
    };

    const handleDurationChange = (e) => {
        const { text } = e.nativeEvent;
        setDuration(text);
    };

    const updateUserPoints = async (amount) => {
        try {
            const response = await API.patch(`/user/${user.username}/points/add`, { pointsToAdd: amount });
        } catch (error) {
            console.error(error);
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
            await updateUserPoints(exercisePoints);
            alert("You logged a workout. Nice!");

            setUser((user) => ({ ...user, points: user.points + exercisePoints }));
            setDuration("");
            setExerciseType();
        } catch (err) {
            console.error(err);
        }
    };

    const showAddWorkout = isValidDuration && workoutDuration > 0 && exerciseType;

    return (
        <>
            <LinearGradient
                style={{
                    height: "100%",
                }}
                colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
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
                                    <Picker.Item label="Cardio" value="cardio" />
                                    <Picker.Item label="Weights" value="weights" />
                                    <Picker.Item label="Stretching" value="stretching" />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text className="py-1 text-white text-xl">How Long Did You Exercise For?</Text>
                            <TextInput
                                className="flex px-2 py-3 rounded-xl bg-white"
                                value={duration}
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
                </View>
            </LinearGradient>
            <NeonBackground />
        </>
    );
}
