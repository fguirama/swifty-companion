import "@/global.css";

import {AuthProvider} from "@/providers/AuthProvider";
import {createNativeStackNavigator} from "expo-router/build/react-navigation/native-stack";
import Profile from "@/app/profile";
import Index from "@/app/index";
import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createNativeStackNavigator();

export default function Layout() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                        gcTime: Infinity,
                    },
                },
            })
    );

    return (<QueryClientProvider client={queryClient}>
        <ActionSheetProvider>
            <AuthProvider>
                <Stack.Navigator>
                    <Stack.Screen name="Search" component={Index}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                </Stack.Navigator>
            </AuthProvider>
        </ActionSheetProvider>
    </QueryClientProvider>);
}
