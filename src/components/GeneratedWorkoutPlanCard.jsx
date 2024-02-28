import { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { CheckBox } from "react-native-btr";

export default function GeneratedWorkoutPlanCard({ item }) {
    console.log(item, "gwpcard");
    const [isChecked, setisChecked] = useState(false);

    return (
        <View className="left-1 right-1 mx-6 self-center flex-1 flex-row flex-wrap justify-between my-5 w-80 border border-white rounded-xl">
            <Text className="text-white text-lg text-wrap p-3 ">{item}</Text>
            {/* <View className='m-5'> */}
            <View className='m-4 rounded-xl'>
                <Text className="bg-white p-1 rounded-xl">Workout Completed?</Text>
            </View>
            <View className='m-5'>
                <CheckBox
                    checked={isChecked}
                    color="#fff"
                    onPress={() => {
                        setisChecked(!isChecked);
                    }}
                />
            </View>
            {/* </View> */}
        </View>
    );
}

// this styling works for ANDROID not Iphone
