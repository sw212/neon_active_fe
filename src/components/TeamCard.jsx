import { View, Text, Image } from "react-native";
export default function TeamCard({ teamInfo }) {
    const { team_name, team_img } = teamInfo;


    return (
        <View className="py-2">
        <View className="min-w-[75%] mx-auto py-2 px-4 border border-white rounded-xl">
            <View className="flex-row pb-2 justify-between">
                <View className="flex-row pr-8 gap-x-4">
                    <Text className="text-white text-2xl">Team Name - {team_name}</Text>
                </View>
                <View className="w-32 h-52 border-white">
                    {team_img ? (
                        <Image source={{ uri: team_img }} className="rounded-full" style={{ width: '100%', height: '50%' }} onError={(err) => console.error("img loading error:", err)}/>
                    ) : (
                        <Text className="text-2xl text-white">No Image Found</Text>
                    )}
                </View>
            </View>
        </View>
    </View>
    );
}
