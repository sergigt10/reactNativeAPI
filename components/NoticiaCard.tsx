import { homeStyles as styles } from "@/styles/homeStyles";
import { Noticia } from "@/types/noticia";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const NoticiaCard = ({ item }: { item: Noticia }) => (
    <Link href={`/noticia/${item.id}`} asChild>
        <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            <View style={styles.imageContainer}>
                {item.imatge && (
                    <Image source={{ uri: item.imatge }} style={styles.image} />
                )}
                <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{item.data_publicacio}</Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.categoryLabel}>{item.categoria}</Text>
                <Text style={styles.title} numberOfLines={2}>
                    {item.titol}
                </Text>
                <Text numberOfLines={3} style={styles.description}>
                    {item.descripcio.replace(/<[^>]*>?/gm, "")}
                </Text>
            </View>
        </TouchableOpacity>
    </Link>
);
