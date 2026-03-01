import { toastConfig } from "@/constants/toastConfig";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
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
