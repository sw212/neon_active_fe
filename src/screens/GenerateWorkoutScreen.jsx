import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {NeonBackground} from "../components/shaders/NeonBackground";
import { API } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";

export default function GenerateWorkoutScreen({navigation, route}) {
    const { colors } = useTheme();
    const [workoutGoal, setWorkoutGoal] = useState("")
    const [fitnessPlanDuration, setFitnessPlanDuration] = useState("")
    const [workoutDaysPerWeek, setWorkoutDaysPerWeek] = useState("")
    const [workoutLength, setWorkoutLength] = useState("")


    const handleWorkoutGoalChange = (value) => {
        if (value !== "Please Select"){
            setWorkoutGoal(value)
        }
    }
    const handleWorkoutDaysPerWeek = (value) => {
        if (value !== "Please Select"){
            setWorkoutDaysPerWeek(value)
        }
    }

    const handleWorkoutLength = (value) => {
        if (value !== "Please Select"){
            setWorkoutLength(value)
        }
    }
    const handleGenerate = async (workoutGoal, fitnessPlanDuration, workoutDaysPerWeek, workoutLength) => {
        try {
            // const reqHeaders = {
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `jwt ${user.token}`,
            //     },
            // };
            const response = await API.post("/workout-plan/generate",{input1 : workoutGoal, input2 :workoutDaysPerWeek, input3:workoutLength, input4: "hello"})
            return response.data.workoutPlan
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <LinearGradient
                    style={{
                        height: "100%",
                    }}
                    colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                    start={{ y: 0, x: 0 }}
                    end={{ y: 1, x: 1 }}
                >
                    <View className="flex flex-1 items-center pt-4">
                        <Text className="text-white text-3xl"> Generate Workout! </Text>
                        <View className="flex py-4 gap-y-4 grow">
                            <View>
                                <Text className="py-1 text-white text-xl">What Would you Like To Achieve?</Text>
                                <View className="p-1 border border-white rounded-xl">
                                    <Picker
                                        style={{
                                            color: "white",
                                            backgroundColor: colors.background,
                                        }}
                                        selectedValue={workoutGoal}
                                        onValueChange={handleWorkoutGoalChange}
                                    >
                                        <Picker.Item label="Please Select" value="" />
                                        <Picker.Item label="Lose Weight" value="Lose weight" />
                                        <Picker.Item label="Gain Muscle" value="Gain Muscle" />
                                        <Picker.Item label="Improve My Core Fitness" value="Improve My Core Fitness" />
                                    </Picker>
                                </View>
                            </View>
                            <Text className="py-1 text-white text-xl">How Many Times A Week Do You Exercise?</Text>
                            <View className="p-1 border border-white rounded-xl">
                                <Picker
                                    style={{
                                        color: "white",
                                        backgroundColor: colors.background,
                                    }}
                                    selectedValue={workoutDaysPerWeek}
                                        onValueChange={handleWorkoutDaysPerWeek}
                                >
                                    <Picker.Item label="Please Select" value="" />
                                    <Picker.Item label="1 day a week" value="1" />
                                    <Picker.Item label="2 days a week" value="2" />
                                    <Picker.Item label="3 days a week" value="3" />
                                    <Picker.Item label="4 days a week" value="4" />
                                    <Picker.Item label="5 days a week" value="5" />
                                    <Picker.Item label="6 days a week" value="6" />
                                    <Picker.Item label="7 days a week" value="7" />
                                </Picker>
                            </View>
                            <Text className="py-1 text-white text-xl">How Long Are Your Workouts</Text>
                            <View className="p-1 border border-white rounded-xl">
                                <Picker
                                    style={{
                                        color: "white",
                                        backgroundColor: colors.background,
                                    }}
                                    selectedValue={workoutLength}
                                    onValueChange={handleWorkoutLength}
                                >
                                    <Picker.Item label="Please Select" value="" />
                                    <Picker.Item label="15 minutes" value="15" />
                                    <Picker.Item label="30 minutes" value="30" />
                                    <Picker.Item label="45 minutes" value="45" />
                                    <Picker.Item label="60 minutes" value="60" />
                                    <Picker.Item label="75 minutes" value="75" />
                                    <Picker.Item label="90 minutes" value="90" />
                                </Picker>
                            </View>
                        </View>

                        <View className="py-2 basis-1/3">
                            {!null && (
                                <>
                                    <View className="items-center">
                                        <Pressable
                                            className="items-center rounded-full bg-black py-2 px-2 m-2 w-48"
                                            onPress={async (e) => {
                                                e.preventDefault();
                                                const workoutPlan = await handleGenerate(workoutGoal, fitnessPlanDuration, workoutDaysPerWeek, workoutLength)
                                                navigation.navigate("Display Workout", 
                                                    [
                                                        { workoutPlan : workoutPlan },
                                                    ]
                                                )
                                            }}
                                        >
                                            <Text className="text-white">Generate Workout</Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
            <NeonBackground />
        </>
    );
}
