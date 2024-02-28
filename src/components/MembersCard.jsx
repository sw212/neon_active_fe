import { Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MembersCard({ memberInfo }) {
    const { username, avatar_img_url, points } = memberInfo;

    return (
        <View className="p-2 my-2 min-w-[75%] border border-white rounded-xl">
            <View className="flex-row justify-between">
                <View className="flex justify-between items-center">
                    <Text className="text-white text-2xl font-bold">{username}</Text>
                    <Text className="text-white text-lg self-start">Points - {points ?? 0}</Text>
                </View>
                {avatar_img_url ? (
                    <Image
                        source={{ uri: avatar_img_url }}
                        className="rounded-full"
                        style={{ width: "100%", height: "100%" }}
                        onError={(err) => console.error("img loading error:", err)}
                    />
                ) : (
                    <Ionicons name="person-circle-outline" size={92} color="white" />
                )}
            </View>
        </View>
    );
}
