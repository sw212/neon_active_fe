import { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import MembersCard from "../components/MembersCard";
import NeonBackground from "../components/shaders/NeonBackground";
import { API } from "../utils/api";

export default function MembersForThisTeamScreen({ route }) {
    const { chosenTeamName, chosenTeamId } = route.params[0];
    //make an api call here e.g. api/teams and access members by ID

    const [members, setMembers] = useState([]);

    // useEffect(() => {
    //     const fetchMembers = async () => {
    //             try {
    //                 const TeamsRsponse = await API.get('/')
    //             }
    //             catch {

    //             }
    //     }
    // })
    return (
        <>
            <View>
                <View className="flex grow gap-y-2 flex-1 justify-center items-center h-full"></View>
                <ScrollView>
                    <Text className="flex text-white text-2xl self-center m-3 top-4 items-center">
                        {chosenTeamName}
                    </Text>
                    {members.map((member) => {
                        return member.team_id === chosenTeamId ? (
                            <MembersCard key={member.member_id} memberInfo={member} />
                        ) : null;
                    })}
                </ScrollView>
            </View>
            <NeonBackground />
        </>
    );
}
