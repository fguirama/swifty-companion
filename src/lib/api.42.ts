import apiClient from "@/lib/apiClient";
import {iAuthToken, iUser} from "@/types/type.42";
import useApiQuery from "@/hook/useApiQuery";

const cliendId = process.env.EXPO_PUBLIC_CLIENT_ID;
const cliendSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;

if (!cliendId || !cliendSecret) {
    throw new Error("Missing EXPO_PUBLIC_CLIENT_ID and EXPO_PUBLIC_CLIENT_SECRET environment variables");
}

export default function postToken() {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
        // @ts-ignore // todo check
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: cliendId,
            client_secret: cliendSecret,
        }).toString(),
    }
    return apiClient<iAuthToken>("/oauth/token", undefined, undefined, options);
}

function getUser(token?: iAuthToken, makeRequest?: () => Promise<void>, userLogin?: string) {
    return apiClient<iUser[]>(`/v2/users?filter[login]=${userLogin}`, token, makeRequest);
}

export function useUser(userLogin: string) {
    return useApiQuery(
        ["user", userLogin],
        (token?: iAuthToken, makeRequest?: () => Promise<void>) => getUser(token, makeRequest, userLogin),
        userLogin.length === 8
    );
}
