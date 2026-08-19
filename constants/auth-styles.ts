import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
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
    buttonDisabled: {
        opacity: 0.4,
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
    },
});
