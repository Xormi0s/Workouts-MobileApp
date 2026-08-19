import { Text, TextInput, View } from "react-native";

import { authStyles } from "@/constants/auth-styles";

type AuthFieldProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
};

export function AuthField({ label, placeholder, value, onChangeText, secureTextEntry }: AuthFieldProps) {
    return (
        <View style={authStyles.field}>
            <Text style={authStyles.inputText}>{label}</Text>
            <TextInput
                style={authStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#666666"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
