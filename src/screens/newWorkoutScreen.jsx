import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function NewWorkoutScreen() {
    const { colors } = useTheme();

    const [duration, setDuration] = useState();
    const [exerciseType, setExerciseType] = useState();

    let exercisePoints = 0;

    if (exerciseType === "Run" || exerciseType === "Gym") {
        exercisePoints = duration * 2;
    } else {
        exercisePoints = duration;
    }

    handleWorkoutTypeChange = (value) => {
        setExerciseType(value);
    };

    const handleDurationChange = (e) => {
        const { text } = e.nativeEvent;

        if (!isNaN(text) && !isNaN(parseFloat(text))) {
            setDuration(Number(text));
        } else {
            setDuration();
        }
    };

    return (
        <View className="flex flex-1 items-center pt-4">
            <Text className="text-white text-3xl "> Post a New Workout!</Text>
            <View className="flex py-4 gap-y-4 grow">
                <View>
                    <Text className="py-1 text-white text-xl">What Exercise Did You Do?</Text>
                    <View className="p-1 border border-white rounded-xl ">
                        <Picker
                            style={{
                                color: "white",
                                backgroundColor: colors.background,
                            }}
                            selectedValue={exerciseType}
                            onValueChange={handleWorkoutTypeChange}
                        >
                            <Picker.Item label="Please Select" value="" />
                            <Picker.Item label="Run" value="Run" />
                            <Picker.Item label="Gym" value="Gym" />
                            <Picker.Item label="Walk" value="Walk" />
                            <Picker.Item label="Stretch" value="Stretch" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text className="py-1 text-white text-xl">How Long Did You Exercise For?</Text>
                    <TextInput
                        className="flex p-2 rounded-xl bg-white"
                        selectedValue={duration}
                        keyboardType="numeric"
                        onChange={handleDurationChange}
                    />
                </View>
            </View>

            <View className="py-2 basis-1/3">
                {duration && exerciseType && (
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
                                    console.info(duration, exercisePoints, exerciseType);
                                }}
                            >
                                <Text className="text-white">Log Workout</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}
