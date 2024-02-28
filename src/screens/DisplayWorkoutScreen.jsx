import { View, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import GeneratedWorkoutPlanCard from "../components/GeneratedWorkoutPlanCard";
import NeonBackground from "../components/shaders/NeonBackground";

export default function DisplayWorkoutScreen({ route }) {
    const { workoutPlan } = route.params[0];
    const daysArray = workoutPlan.split(/\n(?=Day \d+:)/).map((day) => day.trim());
    return (
        <>
        <View className="flex-1 justify-center items-center">
            <FlatList
                data={daysArray}
                renderItem={({ item }) => {
                    console.log(item);
                    if (item !== ""){
                        return <GeneratedWorkoutPlanCard item={item} />;
                    }
                    
                }}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                bounces={false}
                />
        </View>
        <NeonBackground/>
                </>
    );
}
