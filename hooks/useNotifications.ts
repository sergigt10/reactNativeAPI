import { registerForPushNotificationsAsync } from "@/services/pushNotifications";
import * as Notifications from "expo-notifications";
import {
    NotificationResponse,
    useLastNotificationResponse,
} from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// Gestiona com es comporta amb les notificacions en cada moment
export function useNotifications() {
    const router = useRouter();
    // Detecta si l'app s'ha obert a causa d'una interacció amb una notificació.
    const lastResponse = useLastNotificationResponse();

    // S'ocupa de la navegació si hi ha un nova notificació
    const handleNavigation = (response: NotificationResponse) => {
        const noticiaId = response.notification.request.content.data.noticiaId;
        if (noticiaId) {
            router.push(`/noticia/${noticiaId}`);
        }
    };

    // Cold start. Si l'app està tancada obre el detall de la notificació
    useEffect(() => {
        if (
            // Comprova que l'usuari hagi clicat la notificació (l'acció per defecte) i no simplement l'hagi descartat.
            lastResponse?.actionIdentifier ===
            Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
            // S'afegeix un petit retard de 500ms per assegurar-se que el sistema de navegació (el router) estigui totalment muntat i a punt abans d'intentar moure l'usuari a una altra pantalla.
            setTimeout(() => handleNavigation(lastResponse), 500);
        }
    }, [lastResponse]);

    // Si l'app està oberta que obri el detall de la notificació
    useEffect(() => {
        // Crida la configuració inicial per obtenir el token del dispositiu (essencial per rebre notificacions).
        registerForPushNotificationsAsync();
        // Crea un "escoltador" (listener). Cada vegada que l'usuari cliqui una notificació mentre l'app està oberta (o en segon pla), s'executarà automàticament handleNavigation.
        const listener =
            Notifications.addNotificationResponseReceivedListener(
                handleNavigation,
            );
        // El return () => listener.remove() és crucial; serveix per eliminar l'escoltador quan el component es desmunta i així evitar duplicats o fugues de memòria.
        return () => listener.remove();
    }, []);
}
