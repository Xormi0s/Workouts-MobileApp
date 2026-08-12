import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";

const API_URL = "http://192.168.0.208:8080/api/v1/auth";

export default function Index() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Workouts</Text>
            <Text style={styles.subTitle}>Login</Text>
        </View>

        <View style={styles.formWrapper}>
            <View style={styles.form}>
                <View style={styles.field}>
                    <Text style={styles.inputText}>Username</Text>
                    <TextInput style={styles.input} placeholder="Enter your username" placeholderTextColor="#666666" value={username} onChangeText={handleUsernameChange} />
                </View>

                <View style={styles.field}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#666666" secureTextEntry={true} value={password} onChangeText={handlePasswordChange} />
                </View>
            </View>
            <Pressable
                disabled={loading}
                onPress={handleLogin}
                style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
            ]}>
                <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
            </Pressable>

            {error && <Text style={styles.errorText}>{error}</Text> }
        </View>


        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Don't have an account? {' '}
                <Text style={styles.footerLink} onPress={() => {}}>
                    Sign up
                </Text>
            </Text>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#0D0D0D"
    },
    header: {
        marginTop: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 60,
        fontWeight: "bold",
        color: "#FF6B35",
    },
    subTitle: {
        fontSize: 35,
        color: "#A0A0A0",
        fontStyle: "italic",
        marginTop: 30
    },
    formWrapper: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
    },
    form: {
        width: "100%",
    },
    field: {
        marginBottom: 10
    },
    input: {
        borderWidth: 2,
        borderColor: "#444444",
        borderRadius: 5,
        padding: 5,
        width: "100%",
        color: "#A0A0A0",
    },
    inputText: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "bold",
        color: "#A0A0A0",
    },
    button: {
        backgroundColor: "#22C55E",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    buttonPressed: {
        backgroundColor: "#16A34A",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    footer: {
        marginBottom: 20,
    },
    footerText: {
        color: "#A0A0A0",
    },
    footerLink: {
        color: "#22C55E",
        fontWeight: "bold",
    },
    errorText: {
        color: "#EF4444",
        marginTop: 16,
        textAlign: "center",
    }
})
