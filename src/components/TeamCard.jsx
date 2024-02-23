import { View, Text, Image, Pressable } from "react-native";
export default function TeamCard({ teamInfo, navigation }) {
    const { team_name, team_img, team_id } = teamInfo;

    return (
        <View className="flex-row justify-between py-2 px-4 my-4 w-full border border-white rounded-xl">
            <View className="flex justify-between shrink basis-1/2">
                <Text className="text-white text-xl">Team {team_name}</Text>
                {/* <View className="flex items-center w-full" > */}
                <Pressable
                    className="self-start rounded-xl bg-white p-2"
                    onPress={() => {
                        navigation.navigate("This Team Members", [
                            { chosenTeamId: team_id, chosenTeamName: team_name },
                        ]);
                    }}
                >
                    <Text className="text-black text-center">Members</Text>
                </Pressable>
                {/* </View> */}
            </View>
            <View className=" h-24">
                {team_img ? (
                    <Image
                        source={{ uri: team_img }}
                        className="h-full rounded-full aspect-square"
                        onError={(err) => console.error("img loading error:", err)}
                    />
                ) : (
                    <Text className="text-2xl text-white">No Image Found</Text>
                )}
            </View>
        </View>
    );
}
