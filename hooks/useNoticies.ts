import { API_BASE_URL } from "@/constants/config";
import { Noticia } from "@/types/noticia";
import axios from "axios";
import { useEffect, useState } from "react";

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

    // index.tsx: té id = undefined → No canvia mai. S'executa només un cop.
    // [id].tsx: S'executa cada cop que canvies de id de noticia o categoria.
    useEffect(() => {
        fetchData();
    }, [id, categoria]);

    return { data, loading, refetch: fetchData };
}
