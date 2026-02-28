export interface Noticia {
    id: number;
    titol: string;
    descripcio: string;
    data_publicacio: string;
    categoria: string;
    imatge: string | null;
    slug?: string;
}
