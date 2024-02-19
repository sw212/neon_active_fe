import { ScrollView, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native";
import { Pressable } from "react-native";

export default function NewWorkoutScreen() {
    const [duration, setDuration] = useState(0);
    const [exerciseType, setExerciseType] = useState('Please Select');
    const [exercisePoints, setExercisePoints] = useState(0)

    const calculatePoints = (Chosenduration, Chosenexercise) => {
        if (Chosenexercise !== "Please Select"){
            if (Chosenexercise === "Run" || Chosenexercise === "Gym"){
                setExercisePoints(Chosenduration * 2)
            } else {
                setExercisePoints(Chosenduration)
            }

    } 
    }
 
        useEffect(() => {
            calculatePoints(duration, exerciseType)
        },[duration, exerciseType])


    return (
        <ScrollView>
            <View className="grow flex flex-1 h-full">
                <View className="flex grow gap-y-2 flex-1 justify-center items-center">
                    <Text className="text-white text-2xl"> Post a New Workout!</Text>
                    <View name="type" className="m-6">
                        <Text className="text-white">What Exercise Did You Do?</Text>
                        <Picker className="flex p-2 rounded-xl"
                        selectedValue={exerciseType}
                        onChange={currentExercise => {setExerciseType(currentExercise.target.value)}}>
          <Picker.Item label="Please Select" value="null" />
          <Picker.Item label="Run" value="Run" />
          <Picker.Item label="Gym" value="Gym" />
          <Picker.Item label="Walk" value="Walk" />
          <Picker.Item label="Stretch" value="Stretch" />
                        </Picker>
                    </View>
                    <View name="duration" className="m-6">
                        <Text className="text-white">How Long Did You Exercise For?</Text>
                        <TextInput className="flex p-2 m-2 rounded-xl bg-white"
                        selectedValue={duration}
                        keyboardtype= "numeric"
                        onChange={e =>{setDuration(e.target.value)}}/>                        
                    </View>
                </View>
                <View>

                    { duration  && exerciseType ? 
                    <>
                    <View className="items-center m-2">
                    <Text className="text-white"> 
                         You Will earn {exercisePoints} points for logging this activity
                    </Text> 
                    </View>
                    <View className="items-center">
                    <Pressable className="items-center rounded-full bg-black py-2 px-2 m-2 w-48" onPress={(e) => {
                        console.log(duration, exercisePoints, exerciseType)
                    }}>
                    <Text className="text-white">Log Workout</Text>
                    </Pressable>
                    </View>
                    </>
                    : null}
                    </View>
                        </View>
        </ScrollView>
    );
}
