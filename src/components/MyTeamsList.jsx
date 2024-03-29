import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { API } from "../utils/api";

export default function MyTeamsList({ navigation }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await API.get("/teams");
                setTeams(response.data.teams);
            } catch {
                console.error(error);
            }
        };
        fetchTeams();
    }, []);

    return (
        <View className="w-full">
            <View className="flex items-center w-[75%] max-w-md mx-auto py-2">
                <Text className="text-white text-2xl mb-2 self-start">My Teams!</Text>
                {teams.map((team) => {
                    return <TeamCard key={team._id} teamInfo={team} navigation={navigation} />;
                })}
            </View>
        </View>
    );
}
