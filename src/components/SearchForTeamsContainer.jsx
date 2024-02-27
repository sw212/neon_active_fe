import { View, TextInput, Text, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

export default function SearchForTeamContainer() {
    const [searchedTeam, setSearchedTeam] = useState("");
    const [userInput, setUserInput] = useState("");
    const { user } = useContext(UserContext);

    const updateUserInput = (e) => {
        const { text } = e.nativeEvent;
        setUserInput(text);
    };

    const handleJoinTeamRequest = async () => {
        const teamName = searchedTeam.name;
        const username = user.username;
        try {
            const response = await API.patch(`/team/${teamName}/add`, { teamName: teamName, username: username });
            alert("you have been added to team. nice");
            setUserInput("");
            setSearchedTeam("");
        } catch {
            console.error("no team found");
        }
    };

    const handleSearch = async () => {
        try {
            const TeamsArrResponse = await API.get("/teams");
            const listOfTeams = TeamsArrResponse.data.teams;
            const SelectedTeam = listOfTeams.filter((thisteam) => thisteam.name === userInput);
            setSearchedTeam(SelectedTeam[0]);
            console.log(searchedTeam)
        } catch {
            console.error("err");
        }
    };


    return (
        <View className="flex items-center w-full max-w-xs mx-auto gap-y-1">
            <Text className="text-2xl text-white py-1">Search For Teams</Text>
            <View className="w-[50%] min-w-[240]">
                <TextInput
                    className="w-full py-1 px-2 rounded-xl bg-white"
                    selectedValue={userInput}
                    onChange={updateUserInput}
                />
                <Pressable className="my-2 bg-white rounded-xl" onPress={handleSearch}>
                    <Text className="py-2 text-center">Search</Text>
                </Pressable>
                {searchedTeam ? (
                    <View className="flex-col p-4 my-4 w-full border border-white rounded-xl items-center ">
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-white self-start">{searchedTeam.name}</Text>
                            <Text className="text-white ml-4">{searchedTeam.points} points</Text>
                        </View>
                        <Pressable className="rounded-xl bg-white p-2" onPress={handleJoinTeamRequest}>
                            <Text className="text-black text-center">Join this Team</Text>
                        </Pressable>
                    </View>
                ) : (
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-white self-start">Error: Team not found</Text>
                        </View>
                )}
            </View>
        </View>
    );
}

<View className="flex-col p-4 my-4 w-full border border-white rounded-xl items-center "></View>;
