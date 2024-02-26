import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
export default function AccountIcon ({navigation}) {
    return (
        <Ionicons
        name="person-circle"
        onPress={() => navigation.navigate("User")}
        size={35}
        color="black"
        style={{ marginRight: 30 }}
        />
    )
}