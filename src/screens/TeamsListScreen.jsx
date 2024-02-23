import { ScrollView } from "react-native";
import SearchForTeamContainer from "../components/SearchForTeamsContainer";
import MyTeamsList from "../components/MyTeamsList";
import NeonBackground from "../components/NeonBackground";

export default function TeamsListScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SearchForTeamContainer />
            <MyTeamsList navigation={navigation} />
            <NeonBackground />
        </ScrollView>
    );
}
