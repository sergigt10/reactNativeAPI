import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import RenderHtml from "react-native-render-html";

// Importacions
import { LoadingView } from "@/components/LoadingView";
import { SafeBottom } from "@/components/SafeBottom";
import { COLORS } from "@/constants/config";
import { useNoticies } from "@/hooks/useNoticies";
import { detailStyles as styles } from "@/styles/detailStyles";
import { Noticia } from "@/types/noticia";

export default function DetallNoticia() {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();

    // Utilitzem el hook enviant l'ID per obtenir només una notícia
    const { data: noticia, loading } = useNoticies<Noticia>(id as string);

    if (loading) {
        return <LoadingView />;
    }

    if (!noticia) {
        return (
            <View style={styles.center}>
                <Text>No s'ha pogut trobar la notícia.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    title: "",
                    headerTransparent: true,
                    headerTintColor: COLORS.white,
                    headerShadowVisible: false,
                }}
            />

            <ScrollView
                style={styles.container}
                bounces={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {noticia.imatge && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: noticia.imatge }}
                            style={styles.image}
                        />
                        <View style={styles.overlay} />
                    </View>
                )}

                <View style={styles.contentCard}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {noticia.categoria} - {noticia.data_publicacio}
                        </Text>
                    </View>

                    <Text style={styles.title}>{noticia.titol}</Text>
                    <View style={styles.divider} />

                    <RenderHtml
                        contentWidth={width - 40}
                        source={{ html: noticia.descripcio }}
                        tagsStyles={{
                            p: {
                                fontSize: 17,
                                lineHeight: 26,
                                color: "#333",
                                marginBottom: 15,
                            },
                            strong: {
                                color: COLORS.textMain,
                                fontWeight: "bold",
                            },
                        }}
                    />
                </View>
            </ScrollView>

            {/* Pintar de color el bottom de gestos android. Que no sigui transparent. */}
            <SafeBottom color={COLORS.background} />
        </View>
    );
}
