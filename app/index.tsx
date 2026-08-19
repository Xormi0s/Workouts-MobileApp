import {ActivityIndicator, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";

import {AuthField} from "@/components/auth-field";
import {AuthButton} from "@/components/auth-button";
import {authStyles} from "@/constants/auth-styles";

const API_URL = "http://192.168.0.208:8080/api/v1/auth";

export default function Index() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

    useEffect(() => {

        async function autoLogin(){
            const storedRefreshToken = await SecureStore.getItemAsync("refreshToken");
            const storedUsername = await SecureStore.getItemAsync("username");

            if(!storedRefreshToken || !storedUsername){
                setCheckingAuth(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/refresh`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken: storedRefreshToken }),
                });

                if(!response.ok) {
                    await SecureStore.deleteItemAsync("accessToken");
                    await SecureStore.deleteItemAsync("refreshToken");
                    await SecureStore.deleteItemAsync("username");
                    setCheckingAuth(false);
                    return;
                }

                const data = await response.json();
                await SecureStore.setItemAsync("accessToken", data.accessToken);
                await SecureStore.setItemAsync("refreshToken", data.refreshToken);

                router.replace({ pathname: "/home", params: { username: storedUsername } });
            } catch (err) {
                setCheckingAuth(false);
            }
        }

        autoLogin();
    }, []);

    async function handleLogin() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password }),
            })

            if (!response.ok) {
                const data = await response.json();
                setError(data.message ?? "Login failed");
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

    if (checkingAuth) {
        return (
            <SafeAreaView style={[authStyles.container, {justifyContent: "center"}]} >
                <ActivityIndicator color="#22C55E" size="large" />
            </SafeAreaView>
        );
    }

    const isFormEmpty = username.trim().length === 0 || password.length === 0;

    return (
        <SafeAreaView style={authStyles.container}>
            <View style={authStyles.header}>
                <Text style={authStyles.title}>Workouts</Text>
                <Text style={authStyles.subTitle}>Login</Text>
            </View>

            <View style={authStyles.formWrapper}>
                <View style={authStyles.form}>
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
                    label="Login"
                    loadingLabel="Logging in..."
                    loading={loading}
                    disabled={loading || isFormEmpty}
                    onPress={handleLogin}
                />

                {error && <Text style={authStyles.errorText}>{error}</Text> }
            </View>


            <View style={authStyles.footer}>
                <Text style={authStyles.footerText}>
                    Don't have an account? {' '}
                    <Text style={authStyles.footerLink} onPress={() => router.push({ pathname: "/register" })}>
                        Sign up
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}
