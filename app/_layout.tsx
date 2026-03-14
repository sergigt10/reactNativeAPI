import { toastConfig } from "@/constants/toastConfig";
import { useNotifications } from "@/hooks/useNotifications";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
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

// Evitem que el Splash s'amagui automàticament
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // Tota la lògica de notificacions
    useNotifications();

    // Amaguem el Splash quan l'app estigui a punt
    useEffect(() => {
        const hideSplash = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await SplashScreen.hideAsync();
        };
        hideSplash();
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="noticia/[id]"
                    options={{ title: "", headerTransparent: true }}
                />
            </Stack>
            <Toast config={toastConfig} />
        </>
    );
}
