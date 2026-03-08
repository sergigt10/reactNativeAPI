import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Definim la interfície per als props del Toast
interface ToastProps {
    text1?: string;
    text2?: string;
}

export const toastConfig = {
    // Estil per a NOTÍCIA NOVA o ACTUALITZADA
    noticiaNova: ({ text1, text2 }: ToastProps) => (
        <View style={[styles.toastContainer, { borderLeftColor: "#FFD700" }]}>
            <Text style={[styles.title, { color: "#FFD700" }]}>{text1}</Text>
            <Text style={styles.description} numberOfLines={1}>
                {text2}
            </Text>
        </View>
    ),

    // Estil per a NOTÍCIA ELIMINADA o DESACTIVADA
    noticiaEliminada: ({ text1, text2 }: ToastProps) => (
        <View style={[styles.toastContainer, { borderLeftColor: "#FF4444" }]}>
            <Text style={[styles.title, { color: "#FF4444" }]}>{text1}</Text>
            <Text style={styles.description} numberOfLines={1}>
                {text2}
            </Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        height: 75,
        width: "90%",
        backgroundColor: "#222",
        borderRadius: 12,
        padding: 15,
        borderLeftWidth: 6,
        justifyContent: "center",
        // Ombres per a Android
        elevation: 10,
        // Ombres per a iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 2,
        textTransform: "uppercase",
    },
    description: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
    },
});
