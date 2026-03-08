import { toastConfig } from "@/constants/toastConfig";
import { registerForPushNotificationsAsync } from "@/services/pushNotifications";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

// Configurem que les notificacions es vegin fins i tot amb l'app oberta
Notifications.setNotificationHandler({
    handleNotification: async () =>
        ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }) as Notifications.NotificationBehavior,
});

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        // Registrem el dispositiu
        registerForPushNotificationsAsync();

        // Afegeix el listener de notificacions
        const responseListener =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    // Obtenim l'ID que hem enviat des de Laravel ('data' => ['noticiaId' => ...])
                    const noticiaId =
                        response.notification.request.content.data.noticiaId;

                    if (noticiaId) {
                        // Redirigim a la ruta noticia/[id]
                        router.push(`/noticia/${noticiaId}`);
                    }
                },
            );

        // Neteja el listener al desmuntar
        return () => responseListener.remove();
    }, []);

    return (
        <>
            <Stack
                screenOptions={{
                    // Propietats globals com el color de la fletxa de tornar enrere
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: "bold",
                    },
                }}
            >
                {/* Cambiem 'index' per '(tabs)'. Això carregarà el menú inferior com a pantalla principal. */}
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false, // Amaguem el header del Stack perquè cada Tab tindrà el seu
                    }}
                />

                {/* Mantenim la teva ruta de detall. Com que esta fora de (tabs), el menú inferior s'amagarà automàticament  */}
                <Stack.Screen
                    name="noticia/[id]"
                    options={{
                        title: "",
                        headerTransparent: true,
                    }}
                />
            </Stack>
            <Toast config={toastConfig} />
        </>
    );
}
