import { View, Text, Image, Pressable } from "react-native";
import WorkoutList from "./WorkoutList";
export default function TeamCard({ teamInfo, navigation }) {
    const { team_name, team_img } = teamInfo;


    return (
        <View className="py-2">
            <View className="min-w-[75%] mx-auto py-2 px-4 bg-[#ff6666] hover:bg-[#a84343] border border-white rounded-xl">
                <View className="flex-row pb-2 justify-between">
                    <View className="flex-row pr-8 gap-x-4 block">
                        <Text className="text-white text-2xl">Team Name - {team_name}</Text>
                        <Pressable
                            className="m-1 p-3 bg-black rounded-3xl items-center"
                            onPress={() => navigation.navigate("Team Members Screen")}
                        >
                            <Text className="text-white text-2xl">See Members</Text>
                        </Pressable>
                    </View>
                    <View className="w-32 h-52 border-white">
                        {team_img ? (
                            <Image
                                source={{ uri: team_img }}
                                className="rounded-full"
                                style={{ width: "100%", height: "50%" }}
                                onError={(err) => console.error("img loading error:", err)}
                            />
                        ) : (
                            <Text className="text-2xl text-white">No Image Found</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}
