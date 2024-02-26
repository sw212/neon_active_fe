import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {View, Text, ScrollView, Pressable} from 'react-native'

export default function UserScreen ({navigation}) {
    const {user} = useContext(UserContext)
    console.log(user)

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View className="w-full bg-gray-200">
            <View className="flex items-center w-[80%] max-w-md mx-auto py-3">
                <Text className="text-white text-2xl mb-2 self-center">Hello {user}</Text>
            </View>
            <View className="flex items-center justify-between mx-auto px-4 py-2 max-w-md">
                <Pressable onPress={() => {{user = null}}}>
                    <Text className="text-white bg-gray-600 px-4 py-2 rounded-md">Log Out</Text>
                </Pressable>
                <Pressable onPress={() => { /* Handle update info button press */ }}>
                    <Text className="text-white bg-gray-600 px-4 py-2 rounded-md">Update Info</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
    
    )
}