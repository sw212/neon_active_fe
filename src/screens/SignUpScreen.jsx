import { useState, useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { API } from "../utils/api";
import NeonBackground from "../components/NeonBackground";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);

    const toggleHidePass = () => {
        setHidePass(!hidePass);
    };

    const handleSubmit = async () => {
        const data = {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };

        try {
            const response = await API.post("/create-user", data);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    const Input = ({ handleChange, value, placeholder }) => {
        return (
            <TextInput
                className="border border-white p-2 m-2 min-w-[200] rounded-xl text-white"
                onChangeText={(e) => {
                    console.log(e);
                    handleChange(e);
                }}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="gray"
            />
        );
    };

    return (
        <View className="flex-1 items-center justify-center">
            {Input({ handleChange: setUsername, value: username, placeholder: "username" })}
            {Input({ handleChange: setFirstName, value: firstName, placeholder: "first name" })}
            {Input({ handleChange: setLastName, value: lastName, placeholder: "last name" })}
            {Input({ handleChange: setEmail, value: email, placeholder: "email" })}
            {Input({ handleChange: setPassword, value: password, placeholder: "password" })}
            {Input({ handleChange: setConfirmPassword, value: confirmPassword, placeholder: "confirm password" })}
            <Pressable className="rounded-full bg-black py-2 px-5 m-2" onPress={handleSubmit}>
                <Text className="text-white">Log In</Text>
            </Pressable>
            <NeonBackground />
        </View>
    );
}
