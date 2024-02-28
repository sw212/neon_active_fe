import { Text, View } from "react-native";

export default function GeneratedWorkoutPlanCard({item}) {
console.log(item, "gwpcard")

return (
    <View className="flex-wrap justify-between m-5 h-full w-full border border-white rounded-xl">
    <Text className="text-white text-2xl text-wrap p-3">{item}</Text>
    </View>
)    
}