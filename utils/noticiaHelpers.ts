import { Noticia } from "@/types/noticia";

// unknown és un tipus de dada "segur". Significa: "No sé què és això exactament en aquest moment". Per què el fem servir aquí?
// El teu Hook useNoticies pot carregar tant una llista de notícies (Noticia[]) com una sola notícia (Noticia).

export const handleSocketUpdate = <T>(
    // La funció rep tres coses: les dades actuals (prevData), la notícia nova del socket (payload) i la categoria on et trobes (categoria).
    prevData: T | null,
    payload: Noticia,
    categoria?: string,
): T | null => {
    if (Array.isArray(prevData)) {
        // Busca si ja existeix: Mira si l'ID de la notícia que arriba ja està a la llista.
        const exists = prevData.find((n) => n.id === payload.id);
        // Si existeix (Edició): Utilitza .map() per recórrer tota la llista.
        // Quan troba la notícia vella amb el mateix ID, la canvia pel payload nou. Les altres les deixa igual.
        if (exists) {
            return prevData.map((n) =>
                n.id === payload.id ? payload : n,
            ) as unknown as T;
        }
        // Si no existeix (Nova publicació)
        if (!categoria || payload.categoria === categoria) {
            return [payload, ...prevData] as unknown as T;
        }
        // Si el que tens a la pantalla és el DETALL d'una notícia
    } else if (prevData && (prevData as unknown as Noticia).id === payload.id) {
        return payload as unknown as T;
    }
    return prevData;
};

export const handleSocketRemove = <T>(
    prevData: T | null,
    id: number,
): T | null => {
    if (Array.isArray(prevData)) {
        // Genera una llista nova on només hi hagi les notícies que tinguin un ID diferent al que m'acaben de passar.
        return prevData.filter((n) => n.id !== id) as unknown as T;
    }
    return prevData;
};
