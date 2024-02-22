import { ScrollView } from "react-native"
import SearchForTeamContainer from "../components/SearchForTeamsContainer"
import MyTeamsList from "../components/MyTeamsList"

  
export default function TeamsListScreen ({navigation, route}){

    const { setChosenTeam, chosenTeam } = route.params;
    
    return (
        <ScrollView>
            <SearchForTeamContainer/>
            <MyTeamsList setChosenTeam={setChosenTeam} chosenTeam={chosenTeam} navigation={navigation}/>
        </ScrollView>
    )
}