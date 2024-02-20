import { View, Text, ScrollView } from "react-native"
import SearchForTeamContainer from "../components/SearchForTeamsContainer"
import MyTeamsList from "../components/MyTeamsList"  
export default function TeamsScreen (){
    return (
        <ScrollView>
            <SearchForTeamContainer/>
            <MyTeamsList/>
        </ScrollView>
    )
}