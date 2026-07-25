import {Keyboard, Text, TextInput, View} from "react-native";

import {useEffect, useState} from "react";
import {useUser} from "@/lib/api.42";

export default function SearchScreen({navigation}: any) {
    const [login, setLogin] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchLogin, setSearchLogin] = useState("");
    const {data: users} = useUser(searchLogin);

    useEffect(() => {
        if (users && users.length > 0) {
            setLoading(false);
            navigation.navigate("Profile", {users[0]});
        }
    }, [users])

    async function search() {
        const loginT = login.trim().toLowerCase();
        if (!loginT)
            return;
        if (loginT.length !== 8) // todo handle error message
            return;
        setLoading(true);
        setSearchLogin(loginT)

        // } catch (e) {
        //     alert("Utilisateur introuvable");
        // } finally {
        //     setLoading(false);
        // }
    }

    return (<View className="flex-1 bg-slate-950 justify-center px-6">
        <Text className="text-white text-4xl font-bold mb-10">42 Profile</Text>

        <TextInput value={login} onChangeText={setLogin}
            onSubmitEditing={() => {
                Keyboard.dismiss();
                search();
            }}
            placeholder="Search login..."
            placeholderTextColor="#94a3b8"
            className="bg-slate-800 text-white rounded-2xl px-5 py-4 text-lg border border-slate-700"
            returnKeyType="search"
        />
        {
            loading &&
            <Text className="text-slate-400 mt-5 text-center">Loading...</Text>
        }
    </View>);
}