import { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import MembersCard from "../components/MembersCard";
import NeonBackground from "../components/shaders/NeonBackground";
import { API } from "../utils/api";

export default function MembersForThisTeamScreen({ route }) {
    const { chosenTeamName, chosenTeamId } = route.params[0];
    //make an api call here e.g. api/teams and access members by ID

    console.log(chosenTeamName)

    const [members, setMembers] = useState([]);
    const [teamPoints,setTeamPoints] = useState(0)

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const TeamsResponse = await API.get(`/team/${chosenTeamName}`);
                const membersOfThisTeamArr = TeamsResponse.data.team.members
                const thisteamspoints = TeamsResponse.data.team.points
                setMembers(membersOfThisTeamArr)
                setTeamPoints(thisteamspoints)
            } catch {
                console.error("err")
            }
        };
        fetchMembers()
    }, []);
    return (
        <>
                <View className="flex grow gap-y-2 flex-1 justify-center items-center h-full w-80"></View>
                <ScrollView>
                    <Text className="flex text-white text-2xl self-center m-3 top-4 items-center">
                        {chosenTeamName}
                    </Text>
                    <Text className="flex text-white text-2xl self-center m-3 top-4 items-center">
                        Team Points - {teamPoints}
                    </Text>

                    {members.map((member) => {
                        return (
                            <MembersCard key={member.member_id} memberInfo={member} />
                        )
                    
                    })}
                </ScrollView>
            <NeonBackground />
        </>
    );
}
