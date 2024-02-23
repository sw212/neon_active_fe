import { useState, useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import NeonBackground from "../components/NeonBackground";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);

    const { user, setUser } = useContext(UserContext);

    const toggleHidePass = () => {
        setHidePass(!hidePass);
    };

    const handleSubmit = async () => {
        const data = {
            email,
            password,
        };

        try {
            const response = await API.post("/login", data);
            const jwtToken = response.data.token;
            const ctx = { ...response.data.user, token: response.data.token };
            console.log(ctx);
            setUser(ctx);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View className="flex-1 items-center justify-center">
            <TextInput
                className="border border-white p-2 m-2 min-w-[200] rounded-xl text-white"
                onChangeText={(e) => {
                    setEmail(e);
                }}
                value={email}
                placeholder="email"
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
            <Pressable className="rounded-full bg-black py-2 px-5 m-2" onPress={handleSubmit}>
                <Text className="text-white">Log In</Text>
            </Pressable>
            <NeonBackground />
        </View>
    );
}
