import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NeonBackground from "../components/NeonBackground";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);

    const toggleHidePass = () => {
        setHidePass(!hidePass);
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-3xl text-white">NEON : Active</Text>
            <TextInput
                className="border border-white p-2 m-2 min-w-[200] rounded-xl text-white"
                onChangeText={(e) => {
                    setUsername(e);
                }}
                value={username}
                placeholder="username"
                placeholderTextColor="gray"
            />
            <View className="flex-row">
                <TextInput
                    className="border border-white p-2 m-2 min-w-[200] rounded-xl text-white"
                    value={password}
                    onChangeText={(e) => {
                        setPassword(e);
                    }}
                    placeholder="password"
                    placeholderTextColor="gray"
                    secureTextEntry={hidePass}
                />
                <View className="absolute right-5 self-center ">
                    <MaterialCommunityIcons
                        name={hidePass ? "eye-off" : "eye"}
                        size={24}
                        color="#aaa"
                        onPress={toggleHidePass}
                    />
                </View>
            </View>
            <Pressable className="rounded-full bg-black py-2 px-5 m-2">
                {/* user info will be verified using supabase onPress */}
                <Text className="text-white">Log In</Text>
            </Pressable>
            <NeonBackground />
        </View>
    );
}
