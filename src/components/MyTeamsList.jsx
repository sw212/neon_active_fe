import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import TeamCard from "./TeamCard";



export default function MyTeamsList({navigation}) {

    const [teams, setTeams] = useState([

        {
            team_id: 1,
           team_name: "Chiefs",
           team_img:null
        },
        {
            team_id: 2,
           team_name: "Eagles",
           team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg" 
        },
        {
            team_id: 3,
           team_name: "Cobras",
           team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg"

        },
        {
            team_id: 4,
           team_name: "Dragons",
           team_img: "https://i.pinimg.com/originals/75/ff/2c/75ff2cd83b685270e48fb452c60f1f15.jpg"
        },
    ]);
    

    return (
        <View>
            <View className="flex grow gap-y-2 flex-1 justify-center items-center">
            <Text className="flex text-white text-2xl items-center">My Teams!!</Text>
            </View>
            <FlatList
            data={teams}
                renderItem={(v) => <TeamCard teamInfo={v.item} navigation={navigation} />}
            />
        </View>
    );
}