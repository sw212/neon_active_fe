import { ScrollView, Text, View, Image, Pressable } from "react-native";
import * as Progress from "react-native-progress";

export default function MainScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
                className="grow flex flex-1 box-border h-full p-4  
                border-4 bg-[#232323] m-4 text-white"
            >
                <View>
                    <Text className="text-center text-white text-2xl">Home</Text>
                </View>
                <View className="m-4 p-3 items-center border-2  border-[#f47171]">
                    <Text className="text-white text-xl">Status Bar</Text>
                    <View>
                        <View className="m-4 p-3 ">
                            {/* add svg to give circle at the end */}
                            <Progress.Bar progress={0.1} height={20} width={400} color={"red"} />
                            <Text className="self-end right-5 text-white">600/1000</Text>
                        </View>
                    </View>
                </View>
                <View className="m-4 p-3 items-center border-2 text-white w-{1/2} border-[#fff4f4] bg-opacity-50 bg-[#1aff2d]">
                    <View className="flex grow flex-1 box-border border-2 border-[#ffffff] p-3 w-full h-{1/2}">
                        <Text className="items-center space-x-4 text-white">Current Rank : </Text>
                        <View className="border-white">
                            <Text className="items-end space-x-4 text-white">Beginner</Text>
                            </View>
                    </View>
                    <View className="flex box-border border-[#ffffff] border-2 p-3 w-full h-{1-2}">
                        <Text className="items-center text-white self-start text-2xl top-3">Current Badge: </Text>
                        <Image source={require("../img/bronze-coin.jpg")} className="border-4 border-white self-end p-2 w-{3/4} h-{3/4}" />
                    </View>
                </View>
                <View className="items-center rounded-md p-2">
                    <Pressable
                        className="items-center rounded-lg bg-[#ff0a0a] py-2 p-2 m-2 w-48"
                        onPress={() => navigation.navigate("New Workout")}
                    >
                        <Text className="text-white p-2 font-bold">Add a Workout</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}
