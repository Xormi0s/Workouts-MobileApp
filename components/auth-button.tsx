import { Pressable, Text } from "react-native";

import { authStyles } from "@/constants/auth-styles";

type AuthButtonProps = {
    label: string;
    loadingLabel: string;
    loading: boolean;
    disabled: boolean;
    onPress: () => void;
};

export function AuthButton({ label, loadingLabel, loading, disabled, onPress }: AuthButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [
                authStyles.button,
                disabled && authStyles.buttonDisabled,
                pressed && authStyles.buttonPressed,
            ]}>
            <Text style={authStyles.buttonText}>{loading ? loadingLabel : label}</Text>
        </Pressable>
    );
}
