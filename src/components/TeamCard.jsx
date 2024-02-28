import { View, Text, Image, Pressable, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TeamCard({ teamInfo, navigation }) {
    const { name, team_img, _id: team_id } = teamInfo;

    return (
        <View className="flex-1 py-2 w-full">
            <ImageBackground
                source={require("../../assets/bg.png")}
                resizeMode="stretch"
                style={{ width: "100%", height: "100%" }}
            >
                <View className="flex-row justify-between pt-2 pb-4 px-4 w-full  border-white">
                    <View className="flex justify-between">
                        <Text className="text-white text-xl">{name}</Text>
                        <Pressable
                            className="self-start rounded-xl bg-white p-2"
                            onPress={() => {
                                navigation.navigate("This Team Members", [
                                    { chosenTeamId: team_id, chosenTeamName: name },
                                ]);
                            }}
                        >
                            <Text className="text-black text-center">Members</Text>
                        </Pressable>
                    </View>
                    <View className="flex justify-center h-24 w-24">
                        {team_img ? (
                            <Image
                                source={{ uri: team_img }}
                                className="h-full rounded-full aspect-square"
                                onError={(err) => console.error("img loading error:", err)}
                            />
                        ) : (
                            <AntDesign name="team" size={68} color="white" />
                        )}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
