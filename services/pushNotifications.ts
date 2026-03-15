import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
    let token;

    // Les notificacions push només funcionen en dispositius físics
    if (!Device.isDevice) {
        console.log("Cal un dispositiu físic per a les notificacions Push");
        return;
    }

    // Demanar permisos al sistema operatiu
    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        console.log("Permís de notificacions denegat");
        return;
    }

    // Obtenir el Token d'Expo
    try {
        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId;

        if (!projectId) {
            throw new Error("No s'ha trobat el projectId a app.json");
        }

        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

        // Enviar el token a Laravel
        await axios.post(`${API_BASE_URL}/push-tokens`, { token });
        console.log("Token registrat a Laravel:", token);
    } catch (e) {
        console.error("Error registrant el token:", e);
    }

    // Configuració específica per a Android
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}
