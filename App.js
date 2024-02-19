import { Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import "./global.css";


function HomeScreen() {

    return (
        <ScrollView>
            <View
                className="flex gap-y-2 flex-1 justify-center items-center text-3xl bg-[#161619]"
            >
                <View className="flex-row gap-x-2">
                    <View className="w-16 h-16 bg-[#ef276f]" />
                    <View className="w-16 h-16 bg-[#82df37]" />
                    <View className="w-16 h-16 bg-[#d75151]" />
                    <View className="w-16 h-16 bg-[#abe267]" />
                    <View className="w-16 h-16 bg-[#25b1c7]" />
                    <View className="w-16 h-16 bg-[#e8c940]" />
                </View>

                <Text className="text-3xl text-white">Text!</Text>

                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#ffd931]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#ffd931] text-black">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#ffd931] text-[#ffd931]">Text!</Text>
                </View>

                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#e8c940]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#e8c940] text-black">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#e8c940] text-[#e8c940]">Text!</Text>
                </View>

                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#ef276f]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#ef276f] text-white">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#ef276f] text-[#ef276f]">Text!</Text>
                </View>

                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#82df37]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#82df37] text-white">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#82df37] text-[#82df37]">Text!</Text>
                </View>

                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#d75151]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#d75151] text-white">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#d75151] text-[#d75151]">Text!</Text>
                </View>


                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#abe267]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#abe267] text-white">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#abe267] text-[#abe267]">Text!</Text>
                </View>


                <View className="flex flex-row gap-x-4 items-center">
                    <Text className="text-3xl text-[#25b1c7]">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#25b1c7] text-white">Text!</Text>
                    <Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#25b1c7] text-[#25b1c7]">Text!</Text>
                </View>

                <View className="flex-row gap-x-4 items-center">
                    <View className="w-64 h-16 bg-gradient-to-r from-[#ef276f] to-[#25b1c7]">
                        <Text>doesnt work on mobile</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tabBarIcon: makeIconRender("home") }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

function makeIconRender(name) {
    return ({ color, size }) => (
        <MaterialCommunityIcons name={name} color={color} size={size} />
    );
}