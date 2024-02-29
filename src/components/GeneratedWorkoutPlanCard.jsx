import { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { CheckBox } from "react-native-btr";

export default function GeneratedWorkoutPlanCard({ item }) {
    const [isChecked, setisChecked] = useState(false);
    const restdayregex = /\brest\s+day\b/;

    console.log(!restdayregex.test(item))


    return (
        <View className="left-1 right-1 mx-6 self-center flex-1 flex-row flex-wrap justify-between my-5 w-80 border border-white rounded-xl bg-[#DE43D81A]">
            <Text className="text-white text-lg text-wrap p-3 ">{item}</Text>
                <View>
                    <View className="m-4 rounded-xl">
                        <Text className="text-white p-1 text-lg rounded-xl left-2">Completed?</Text>
                    </View>
                    <View className="m-5 w-5 h-7">
                        <CheckBox
                            checked={isChecked}
                            color="#00ff00"
                            onPress={() => {
                                setisChecked(!isChecked);
                            }}
                        />
                    </View>
                </View>
        </View>
    );
}

// this styling works for ANDROID not Iphone
