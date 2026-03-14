import { registerForPushNotificationsAsync } from "@/services/pushNotifications";
import * as Notifications from "expo-notifications";
import {
    NotificationResponse,
    useLastNotificationResponse,
} from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useNotifications() {
    const router = useRouter();
    const lastResponse = useLastNotificationResponse();

    const handleNavigation = (response: NotificationResponse) => {
        const noticiaId = response.notification.request.content.data.noticiaId;
        if (noticiaId) {
            router.push(`/noticia/${noticiaId}`);
        }
    };

    // Cold start. Si l'app està tancada que obri el detall de la notificació
    useEffect(() => {
        if (
            lastResponse?.actionIdentifier ===
            Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
            setTimeout(() => handleNavigation(lastResponse), 500);
        }
    }, [lastResponse]);

    // Si l'app està oberta que obri el detall de la notificació
    useEffect(() => {
        registerForPushNotificationsAsync();
        const listener =
            Notifications.addNotificationResponseReceivedListener(
                handleNavigation,
            );
        return () => listener.remove();
    }, []);
}
