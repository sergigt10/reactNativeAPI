import { API_BASE_URL } from "@/constants/config";
import { Noticia } from "@/types/noticia";
import { handleSocketRemove, handleSocketUpdate } from "@/utils/noticiaHelpers";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useNoticies<T = Noticia | Noticia[]>(
    id?: string,
    categoria?: string,
) {
    // Definim que 'data' pot ser del tipus T (que serà Noticia o Noticia[])
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/noticies?lang=cat`; // Si es undefined. No tenim categoria pasada.
            if (id) {
                url = `${API_BASE_URL}/noticies/${id}?lang=cat`;
            } else if (categoria) {
                url = `${API_BASE_URL}/noticies/categoria/${categoria}?lang=cat`;
            }

            const res = await axios.get(url);
            setData(res.data.data);
        } catch (error) {
            console.error("Error carregant dades", error);
        } finally {
            setLoading(false);
        }
    };

    // --- FUNCIÓNS PER WEBSOCKETS ---
    // La seva feina és agafar la notícia que arriba des del servidor (via WebSocket) i decidir què ha de fer amb ella perquè l'usuari la vegi a la pantalla sense haver de refrescar.
    const updateFromSocket = useCallback(
        // useCallback(..., [categoria]): Aquest "wrapper" serveix per memoritzar la funció. Li diu a React: "No tornis a crear aquesta funció a menys que la categoria canviï". Això evita que el component faci renderitzacions innecessàries i que la connexió al socket es torni boja.
        (payload: Noticia) => {
            // El payload és el "paquet" de dades. Conté tota la informació de la notícia (títol, imatge, etc.) que Laravel acaba d'enviar a través de Reverb.
            // prev: Representa l'estat actual (la llista de notícies que l'usuari està veient en aquell moment).
            // handleSocketUpdate: comparar IDs i actualitzar la llista.
            setData((prev) => handleSocketUpdate(prev, payload, categoria));
        },
        [categoria],
    );

    // Aquesta funció és l'encarregada de fer "desaparèixer" una notícia de la pantalla del mòbil de manera fulminant quan el servidor envia un senyal de borrat o desactivació.
    // useCallback: Això vol dir que la funció es crea una sola vegada quan el component es munta i no canvia mai, ja que no depèn de cap variable externa com la categoria.
    const removeFromSocket = useCallback((id: number) => {
        // setData((prev) => ...): React ens dona l'estat actual de la llista (prev).
        setData((prev) => handleSocketRemove(prev, id));
    }, []);

    // index.tsx: té id = undefined → No canvia mai. S'executa només un cop.
    // [id].tsx: S'executa cada cop que canvies de id de noticia o categoria.
    // És el responsable de carregar la informació de l'api.
    useEffect(() => {
        fetchData();
    }, [id, categoria]);

    // Retornem 'updateFromSocket' perquè el component que gestioni el WebSocket el pugui cridar
    return {
        data,
        loading,
        refetch: fetchData,
        updateFromSocket,
        removeFromSocket,
    };
}
