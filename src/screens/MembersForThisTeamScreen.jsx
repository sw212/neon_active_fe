import { useEffect, useState } from "react";
import { View, Text,ScrollView } from "react-native";
import MembersCard from "../components/MembersCard";
import { NeonBackground } from "../components/shaders/NeonBackground";
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
                <ScrollView style={{ flexGrow: 1 }}>
                    <View className="flex items-center self-center border border-white rounded-xl m-2 w-40 bg-[#1e375a]">
                        <Text className="flex text-white text-2xl underline m-3 p-3">{chosenTeamName}</Text>
                        <Text className="text-white text-lg m-3">Team Points - {teamPoints}</Text>
                    </View>
                    <View className="flex items-center">
                        {members.map((member) => {
                            return <MembersCard key={member._id} memberInfo={member} />;
                        })}
                    </View>
                </ScrollView>
            </LinearGradient>
            <NeonBackground />
        </>
    );
}
