import { ScrollView } from "react-native";
import SearchForTeamContainer from "../components/SearchForTeamsContainer";
import MyTeamsList from "../components/MyTeamsList";

export default function TeamsListScreen({ navigation }) {
    return (
        <ScrollView>
            <SearchForTeamContainer/>
            <MyTeamsList navigation={navigation} />
        </ScrollView>
    );
}
