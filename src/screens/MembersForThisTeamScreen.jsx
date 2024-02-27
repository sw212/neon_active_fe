import { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import MembersCard from "../components/MembersCard";
import NeonBackground from "../components/shaders/NeonBackground";
import { API } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";

export default function MembersForThisTeamScreen({ route }) {
    const { chosenTeamName, chosenTeamId } = route.params[0];

    const [members, setMembers] = useState([]);
    const [teamPoints, setTeamPoints] = useState(0);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const TeamsResponse = await API.get(`/team/${chosenTeamName}`);
                const membersOfThisTeamArr = TeamsResponse.data.team.members;
                const thisteamspoints = TeamsResponse.data.team.points;
                setMembers(membersOfThisTeamArr);
                setTeamPoints(thisteamspoints);
            } catch {
                console.error("err");
            }
        };
        fetchMembers();
    }, []);

    return (
        <>
            <LinearGradient
                style={{
                    height: "100%",
                }}
                colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
                <ScrollView>
                    <View className="flex grow gap-y-2 flex-1 justify-center items-center h-full">
                        <View className="top-2 font-serif border border-white rounded-xl m-2 w-40 bg-[#1e375a]">
                            <Text className="flex text-white text-2xl self-center m-3 p-3 items-center">
                                {chosenTeamName}
                            </Text>
                            <Text className="text-white text-lg m-3 self-center">Team Points - {teamPoints}</Text>
                        </View>
                    </View>
                    {members.map((member) => {
                        return <MembersCard key={member.member_id} memberInfo={member} />;
                    })}
                </ScrollView>
            </LinearGradient>
            <NeonBackground />
        </>
    );
}
