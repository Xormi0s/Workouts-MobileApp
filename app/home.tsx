import { StyleSheet, Text } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useLocalSearchParams} from "expo-router";

export default function Home() {
    const { username } = useLocalSearchParams<{ username: string}>();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Hallo {username}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D0D0D",
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});