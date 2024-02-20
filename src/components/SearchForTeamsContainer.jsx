import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";

export default function SearchForTeamContainer() {
    const [searchedTeam, setSearchedTeam] = useState("");
    return (
        <View>
            <View className="flex grow gap-y-2 flex-1 justify-center items-center top-5">
            <Text className="text-2xl text-white">Search For Teams</Text>
                <TextInput className="flex p-2 m-2 rounded-xl bg-white" selectedValue={searchedTeam} />
            </View>
                <View className="flex p-2 m-2 items-center">
                <Pressable className="bg-blue-500 hover:bg-blue-700 items-center rounded-full border-white py-2 px-2 m-2 w-48">
                    <Text className="text-white"> Search </Text>
                </Pressable>
            </View>
        </View>
    );
}
