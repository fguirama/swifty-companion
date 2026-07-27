import {ActivityIndicator, Keyboard, Pressable, Text, TextInput, View} from "react-native";

import {useEffect, useState} from "react";
import {useUser} from "@/lib/api.42.user";
import ErrorText from "@/component/ErrorText";

export default function SearchScreen({navigation}: any) {
    const [login, setLogin] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [searchLogin, setSearchLogin] = useState("");
    const {data: users, error} = useUser(searchLogin);
    const commonClassName = "rounded-full px-6 py-4 h-16";

    useEffect(() => {
        if (error) {
            setLoading(false);
            setErrorMsg(String(error));
        } else
            setErrorMsg("");
    }, [error])

    useEffect(() => {
        if (users) {
            setLoading(false);
            if (users.length > 0) {
                setSearchLogin("");
                setLogin("");
                setErrorMsg("");
                navigation.navigate("Profile", {users});
            } else
                setErrorMsg(`Login '${searchLogin}' not found.`);
        }
    }, [users])

    async function search() {
        const loginT = login.trim().toLowerCase();

        if (loginT === searchLogin || !loginT || loginT.length === 0)
            return ;
        if (loginT.length > 8) {
            setErrorMsg("Login cannot be more than 8 characters");
            return ;
        }
        setLoading(true);
        setSearchLogin(loginT);
    }

    return (<View className="flex-1 px-6 gap-4">
        <View></View>
        <Text className="text-gray-900 text-4xl font-bold my-6">42 Profile</Text>

        <TextInput value={login} onChangeText={setLogin}
            onSubmitEditing={() => {
                Keyboard.dismiss();
                search().then(() => {});
            }} placeholder="Search login..." placeholderTextColor="gray" className={commonClassName + " text-gray-900 bg-gray-300 leading-tight"}
                   style={{
                       textAlignVertical: 'center',
                   }}
                   returnKeyType="search"/>
        <Pressable onPress={search} className={commonClassName + " bg-gray-900"}><Text className="text-lg font-bold text-center text-gray-100 mb-2">Search</Text></Pressable>
        <ErrorText>{errorMsg}</ErrorText>
        {
            loading && <ActivityIndicator className="mt-2" size="large"/>
        }
    </View>);
}
