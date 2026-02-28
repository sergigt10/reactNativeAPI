import { LoadingView } from "@/components/LoadingView";
import { NoticiaCard } from "@/components/NoticiaCard";
import { useNoticies } from "@/hooks/useNoticies";
import { homeStyles as styles } from "@/styles/homeStyles";
import { Noticia } from "@/types/noticia";
import { FlatList, Text, View } from "react-native";

interface Props {
    categoria?: string;
}

export function LlistaCategoria({ categoria }: Props) {
    // Passem la categoria al hook (si és undefined, carregarà totes)
    const {
        data: noticies,
        loading,
        refetch,
    } = useNoticies<Noticia[]>(undefined, categoria);

    if (loading && !noticies) return <LoadingView />;

    return (
        <View style={styles.container}>
            <FlatList
                data={noticies || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NoticiaCard item={item} />}
                contentContainerStyle={{
                    paddingTop: 30, // Espai entre el header i la primera notícia
                    paddingBottom: 20, // Espai extra al final per no tocar els tabs
                }}
                onRefresh={refetch}
                refreshing={loading}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.loadingText}>
                            No hi ha notícies en aquesta categoria.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
