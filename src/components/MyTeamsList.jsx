import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import TeamCard from "./TeamCard";

export default function MyTeamsList({ navigation }) {
    const [teams, setTeams] = useState([
        {
            team_id: 2,
            team_name: "Eagles",
            team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg",
        },
        {
            team_id: 3,
            team_name: "Cobras",
            team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg",
        },
        {
            team_id: 4,
            team_name: "Dragons",
            team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg",
        },
    ]);

    return (
        <View className="w-full">
            <View className="flex items-center w-[80%] max-w-md mx-auto py-2">
                <Text className="text-white text-2xl -mb-2 self-start">My Teams!</Text>
                {teams.map((team) => {
                    return <TeamCard key={team.team_id} teamInfo={team} navigation={navigation} />;
                })}
            </View>
        </View>
    );
}
