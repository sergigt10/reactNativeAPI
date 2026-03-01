// constants/echo.ts
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Obligatori per a React Native
(window as any).Pusher = Pusher;

export const echo = new Echo({
    broadcaster: "reverb",
    key: "kiip5td9tlbvmu2yz1rc", // Mira el teu .env de Laravel
    wsHost: "192.168.1.140", // LA TEVA IP LOCAL (la mateixa del .env)
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
});
