import { LoadingView } from "@/components/LoadingView";
import { NoticiaCard } from "@/components/NoticiaCard";
import { echo } from "@/constants/echo";
import { useNoticies } from "@/hooks/useNoticies";
import { homeStyles as styles } from "@/styles/homeStyles";
import { Noticia } from "@/types/noticia";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
    categoria?: string;
}

export function LlistaCategoria({ categoria }: Props) {
    // Passem la categoria al hook (si és undefined, carregarà totes)
    const {
        data: noticies,
        loading,
        refetch,
        updateFromSocket,
        removeFromSocket,
    } = useNoticies<Noticia[]>(undefined, categoria);

    // Escoltem el canal de WebSockets en temps real
    // useEffect manté aquests "listeners" actius
    // Quan l'usuari entra a una categoria (per exemple, "Esports"), el useEffect s'executa i realitza aquestes accions:
    // Creació del canal: S'obre una connexió anomenada noticies a través de Laravel Echo.
    // Activació de les antenes: Es configuren els receptors .listen().
    // A partir d'aquest moment, l'app està "desperta" i esperant qualsevol senyal que enviï Laravel Reverb.
    useEffect(() => {
        // 1. Connectem al canal públic 'noticies' definit a Laravel
        const channel = echo.channel("noticies");

        // 2. Escoltem l'esdeveniment i actualitzem la llista
        channel.listen("NoticiaPublicada", (e: { noticia: Noticia }) => {
            /* console.log("S'ha rebut una notícia en directe:", e.noticia.titol);
            console.log("URL de la imatge rebuda:", e.noticia.imatge); */
            Toast.show({
                type: "noticiaNova",
                text1: "Nova actualització 🚀",
                text2: "Noticia: " + e.noticia.titol, // Mostra el títol de la notícia que ha canviat
                position: "top",
                visibilityTime: 4000,
            });
            updateFromSocket(e.noticia); // <--- Injectem la notícia al moment
        });

        // Escoltarem l'esdeveniment de borrat (que ara també serveix per a desactivats)
        channel.listen("NoticiaEsborrada", (e: { id: number }) => {
            Toast.show({
                type: "noticiaEliminada",
                text1: "Contingut retirat 🗑️",
                text2: "Una notícia ja no està disponible.",
                position: "top",
            });
            removeFromSocket(e.id); // <--- Esborrat instantani!
        });

        // 3. Netegem la connexió quan el component es desmunta o canvia de categoria
        return () => {
            channel.stopListening("NoticiaPublicada");
            channel.stopListening("NoticiaEsborrada");
        };
    }, [categoria, updateFromSocket]); // Es reinicia si canviem de pestanya (Inici/Esports/Temps) per evitar tindra tants listeners oberts.

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
