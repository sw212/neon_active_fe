import { ScrollView } from "react-native";
import SearchForTeamContainer from "../components/SearchForTeamsContainer";
import MyTeamsList from "../components/MyTeamsList";
import { NeonBackground } from "../components/shaders/NeonBackground";
import { LinearGradient } from "expo-linear-gradient";

export default function TeamsListScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
                style={{
                    height: "100%",
                }}
                colors={["rgba(222, 67, 216, 0.1)", "transparent"]}
                start={{ y: 0, x: 0 }}
                end={{ y: 1, x: 1 }}
            >
                <SearchForTeamContainer />
                <MyTeamsList navigation={navigation} />
            </LinearGradient>
            <NeonBackground />
        </ScrollView>
    );
}
