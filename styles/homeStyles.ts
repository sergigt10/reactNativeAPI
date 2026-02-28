import { COLORS } from "@/constants/config";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        color: COLORS.textSecondary,
    },
    header: {
        fontSize: 22,
        fontWeight: "800",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        color: COLORS.textMain,
    },
    card: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginBottom: 24,
        borderRadius: 20,
        // Ombra per a iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
        // Ombra per a Android (Mi 8)
        elevation: 5,
        overflow: "visible",
    },
    imageContainer: {
        position: "relative",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 220,
    },
    placeholderImage: {
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
    },
    dateBadge: {
        position: "absolute",
        bottom: 12,
        left: 12,
        backgroundColor: "rgba(255, 102, 0, 0.9)", // Taronja corporatiu amb transparència
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    dateText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    cardBody: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.textMain,
        lineHeight: 26,
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: COLORS.textSecondary,
        lineHeight: 22,
        marginBottom: 15,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 12,
        marginTop: 5,
    },
    readMore: {
        color: COLORS.primary,
        fontWeight: "600",
        fontSize: 14,
    },
    categoryLabel: {
        color: "#FF6600",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 4,
        textTransform: "uppercase",
    },
    tabsHeader: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
});
