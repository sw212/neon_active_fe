import { useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import MembersCard from "../components/MembersCard";
import NeonBackground from "../components/NeonBackground";

export default function MembersForThisTeamScreen({ route }) {
    const {chosenTeamName, chosenTeamId} = route.params[0];
    //make an api call here e.g. api/teams and access members from this
    const [members, setMembers] = useState([
        {
            member_id: 1,
            team_id: 2,
            member_name: "Hashim",
            avatar_img_url: "https://randomwordgenerator.com/img/picture-generator/57e9d6464b52a814f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg"
        },
        {
            member_id: 2,
            team_id: 3,
            member_name: "Saroj",
            avatar_img_url: "https://randomwordgenerator.com/img/picture-generator/57e9d6464b52a814f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg"

        },
        {
            member_id: 3,
            team_id: 4,
            member_name: "Sardar",
            avatar_img_url: "https://randomwordgenerator.com/img/picture-generator/57e9d6464b52a814f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg"
        },
        {
            member_id: 4,
            team_id: 4,
            member_name: "Stefan",
            avatar_img_url: "https://randomwordgenerator.com/img/picture-generator/57e9d6464b52a814f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg"
        },
        {
            member_id: 5,
            team_id: 4,
            member_name: "Patrick",
            avatar_img_url: "https://randomwordgenerator.com/img/picture-generator/57e9d6464b52a814f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg",
        },
    ]);
    return (
        <>
        <View>
            <View className="flex grow gap-y-2 flex-1 justify-center items-center h-full">
            </View>
            <ScrollView>
                <Text className="flex text-white text-2xl self-center m-3 top-4 items-center">{chosenTeamName}</Text>
            {members.map((member) => {
                
                return member.team_id === chosenTeamId ? <MembersCard key={member.member_id} memberInfo={member}/> : null
            })}
            </ScrollView>
        </View>
            <NeonBackground/>
            </>
    );
}
