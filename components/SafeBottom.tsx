import { COLORS } from "@/constants/config";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeBottom = ({ color = COLORS.white }) => {
    const insets = useSafeAreaInsets();
    return <View style={{ height: insets.bottom, backgroundColor: color }} />;
};
