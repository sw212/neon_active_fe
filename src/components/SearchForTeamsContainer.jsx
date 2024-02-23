import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";

export default function SearchForTeamContainer() {
    const [searchedTeam, setSearchedTeam] = useState("");
    return (
        <View className="flex items-center w-full max-w-xs mx-auto gap-y-1">
            <Text className="text-2xl text-white py-1">Search For Teams</Text>
            <View className="w-[50%] min-w-[240]">
                <TextInput className="w-full p-1 rounded-xl bg-white" selectedValue={searchedTeam} />
                <Pressable className="my-2 bg-white rounded-xl">
                    <Text className="py-2 text-center">Search</Text>
                </Pressable>
            </View>
        </View>
    );
}
