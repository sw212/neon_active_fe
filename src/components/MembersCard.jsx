import { Text, View, Image, Pressable } from "react-native";

export default function MembersCard({ memberInfo }) {
    const { username, avatar_img_url, points } = memberInfo;

    return (
        <View className="py-2">
            <View className="min-w-[75%] my-2 top-3 mx-auto py-2 px-4 border border-white rounded-xl">
                <View className="flex-row items-center justify-between">
                    <View className="flex gap-x-4 items-center">
                        <Text className="text-white text-2xl font-bold">{username}</Text>
                        <Text className="text-white text-lg">Points - {points ? points : 0}</Text>
                    </View>
                    {avatar_img_url ? (
                        <Image
                            source={{ uri: avatar_img_url }}
                            className="rounded-full"
                            style={{ width: "100%", height: "100%" }}
                            onError={(err) => console.error("img loading error:", err)}
                        />
                    ) : (
                        <Text className="text-white">No Image Found</Text>
                    )}
                </View>
            </View>
        </View>
    );
}

