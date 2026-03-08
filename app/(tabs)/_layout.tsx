import { COLORS } from "@/constants/config";
import { homeStyles as styles } from "@/styles/homeStyles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#8e8e93",
                tabBarStyle: {
                    backgroundColor: COLORS.tabs,
                    height: 110,
                    paddingBottom: 25,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: "#f2f2f7",
                },
                headerStyle: {
                    backgroundColor: COLORS.tabs,
                },
                headerTintColor: "#fff",
            }}
        >
            {/* INICI */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inici",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                    headerTitle: () => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <Ionicons name="newspaper" size={26} color="#fff" />
                            <Text style={styles.tabsHeader}>Testing App</Text>
                        </View>
                    ),
                    headerTitleAlign: "center",
                }}
            />

            {/* TEMPS */}
            <Tabs.Screen
                name="temps"
                options={{
                    title: "Temps",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "cloudy" : "cloudy-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                    headerTitle: () => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <Ionicons name="cloudy" size={26} color="#fff" />
                            <Text style={styles.tabsHeader}>El Temps</Text>
                        </View>
                    ),
                    headerTitleAlign: "center",
                }}
            />

            {/* ESPORTS */}
            <Tabs.Screen
                name="esports"
                options={{
                    title: "Esports",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "football" : "football-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                    headerTitle: () => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <Ionicons name="football" size={26} color="#fff" />
                            <Text style={styles.tabsHeader}>Esports</Text>
                        </View>
                    ),
                    headerTitleAlign: "center",
                }}
            />
        </Tabs>
    );
}
