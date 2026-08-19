import {StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";

import {AuthField} from "@/components/auth-field";
import {AuthButton} from "@/components/auth-button";
import {authStyles} from "@/constants/auth-styles";

const API_URL = "http://192.168.0.208:8080/api/v1/auth";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleRegister() {
        setLoading(true);
        setError(null);

        if(username.trim().length < 3) {
            setError("Username must be at least 3 characters long");
            setLoading(false);
            return;
        }

        if(password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password }),
            })

            if (!response.ok) {
                const data = await response.json();
                setError(data.message ?? "Registration failed");
                return;
            }

            const data = await response.json();
            await SecureStore.setItemAsync("accessToken", data.accessToken);
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);
            await SecureStore.setItemAsync("username", username);

            router.replace({ pathname: "/home", params: { username } });
        } catch(err) {
            setError("Could not connect to the server");
        } finally {
            setLoading(false);
        }
    }

    function handleUsernameChange(text: string) {
        setUsername(text);
        setError(null);
    }

    function handlePasswordChange(text: string) {
        setPassword(text);
        setError(null);
    }

    const isFormEmpty = username.trim().length === 0 || password.length === 0;

    return (
        <SafeAreaView style={authStyles.container}>
            <View style={authStyles.header}>
                <Text style={authStyles.title}>Workouts</Text>
                <Text style={authStyles.subTitle}>Register</Text>
            </View>

            <View style={authStyles.formWrapper}>
                <View style={authStyles.form}>
                    <View style={authStyles.field}>
                        <Text style={styles.registerText}>Join Workouts and start training</Text>
                    </View>

                    <AuthField
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={handleUsernameChange}
                    />

                    <AuthField
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry
                    />
                </View>

                <AuthButton
                    label="Register"
                    loadingLabel="Registering account..."
                    loading={loading}
                    disabled={loading || isFormEmpty}
                    onPress={handleRegister}
                />

                {error && <Text style={authStyles.errorText}>{error}</Text> }
            </View>


            <View style={authStyles.footer}>
                <Text style={authStyles.footerText}>
                    Already have an account? {' '}
                    <Text style={authStyles.footerLink} onPress={() => router.back()}>
                        Login
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    registerText: {
        fontSize: 24,
        marginBottom: 8,
        fontWeight: "bold",
        color: "#A0A0A0",
    }
})
