import { ScrollView, Text, View, Image, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PointsBar from "../components/shaders/PointsBar";
import NeonBackground from "../components/NeonBackground";

export default function MainScreen({ navigation }) {
    const width = Dimensions.get("window").width;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 items-center">
                <View style={{ width: 0.8 * width }} className="py-3 items-center">
                    <View style={{ width: "100%", height: 60 }}>
                        <PointsBar frac={0.6} />
                    </View>
                    <Text className="self-end right-[10%] text-white">600/1000</Text>
                </View>
                <View className="flex-1 pt-8">
                    <LinearGradient
                        style={{
                            justifyContent: "center",

                            minWidth: "75%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            padding: 32,
                            gap: 16,
                            border: "solid",
                            borderWidth: 1,
                            borderColor: "white",
                            borderRadius: 12,
                        }}
                        colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                        // colors={["#4c669f", "#3b5998", "#192f6a"]}
                        start={{ y: 0, x: 0 }}
                        end={{ y: 1, x: 1 }}
                    >
                        <View className="flex items-center">
                            <Text className="text-white text-2xl">Current Rank:</Text>
                            <Text className="text-white text-2xl">Beginner</Text>
                        </View>
                        <View className="flex items-center">
                            <Text className="text-white text-2xl">Current Badge:</Text>
                            <Image source={require("../img/bronze-coin.jpg")} />
                        </View>
                    </LinearGradient>
                </View>
                <View className="rounded-md p-2">
                    <Pressable
                        className="items-center rounded-lg bg-[#ff0a0a] py-2 p-2 m-2 w-48"
                        onPress={() => navigation.navigate("New Workout")}
                    >
                        <Text className="text-white p-2 font-bold">Add a Workout</Text>
                    </Pressable>
                </View>
            </View>

            <NeonBackground />
        </ScrollView>
    );
}
