import { View, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import GeneratedWorkoutPlanCard from "../components/GeneratedWorkoutPlanCard";
import {NeonBackground} from "../components/shaders/NeonBackground";
import { LinearGradient } from "expo-linear-gradient";

export default function DisplayWorkoutScreen({ route }) {
    const { workoutPlan } = route.params[0];
    const daysArray = workoutPlan.split(/\n(?=Day \d+:)/).map((day) => day.trim());
    return (
        <>
            <LinearGradient
                style={{
                    height: "100%",
                }}
                colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}>
                <Text className="top-7 left-20 text-white text-3xl">Here is your workout</Text>
                <View className="mx-5 my-4 flex-1 justify-center items-center">
                    <FlatList
                        snapToAlignment={"center"}
                        className=""
                        data={workoutPlan.split(/\n(?=Day \d+:)/).map((day) => day.trim())}
                        renderItem={({ item }) => {
                            if (item !== "") {
                                return <GeneratedWorkoutPlanCard item={item} />;
                            }
                        }}
                        horizontal
                        showsHorizontalScrollIndicator
                        pagingEnabled
                        // bounces={false}
                    />
                </View>
            </LinearGradient>
            <NeonBackground />
        </>
    );
}

//Alignment center works for android but not apple.
