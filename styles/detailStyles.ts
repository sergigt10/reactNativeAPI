import { COLORS } from "@/constants/config";
import { StyleSheet } from "react-native";

export const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: 350,
        backgroundColor: "#000",
    },
    image: {
        width: "100%",
        height: "100%",
        opacity: 0.85,
    },
    contentCard: {
        backgroundColor: COLORS.white,
        marginTop: -30, // Efecte de solapament sobre la imatge.tsx]
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        minHeight: 500,
    },
    badge: {
        backgroundColor: COLORS.primary, // Taronja exportat de constants
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 6,
        marginBottom: 15,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.textMain,
        lineHeight: 34,
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f0",
        marginBottom: 20,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
});
