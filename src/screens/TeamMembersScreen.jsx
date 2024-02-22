import { Pressable, ScrollView, Text, View } from "react-native";

export default function TeamMembersScreen({ navigation }) {
    return (
        <ScrollView>
            <View>
                <Pressable title="go back" onPress={() => navigation.goBack()}>
                    <Text className="bg-white">Go back</Text>
                </Pressable>
                <View>
                    <View className="flex grow gap-y-2 flex-1 justify-center items-center">
                        <Text className="flex text-white text-2xl items-center">team Members</Text>
                    </View>
                    {/* <FlatList
                        data={teams}
                        renderItem={(v) => <TeamCard teamInfo={v.item} navigation={navigation} />}
                        keyExtractor={(item) => item.team_id}
                    /> */}
                </View>
            </View>
        </ScrollView>
    );
}
