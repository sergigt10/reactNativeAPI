import { COLORS } from "@/constants/config";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingViewProps {
    message?: string; // El missatge és opcional
}

export const LoadingView = ({ message }: LoadingViewProps) => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            {message && <Text style={styles.loadingText}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
});
