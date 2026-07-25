import "@/global.css";

import {AuthProvider} from "@/providers/AuthProvider";
import {createNativeStackNavigator} from "expo-router/build/react-navigation/native-stack";
import Profile from "@/app/profile";
import Index from "@/app/index";
import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
        <AuthProvider>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Search" component={Index}/>
                <Stack.Screen name="Profile" component={Profile}/>
            </Stack.Navigator>
        </AuthProvider>
    </QueryClientProvider>);
}
