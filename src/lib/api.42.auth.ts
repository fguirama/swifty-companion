import apiClient from "@/lib/apiClient";
import {iAuthToken} from "@/types/type.42";

const cliendId = process.env.EXPO_PUBLIC_CLIENT_ID;
const cliendSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;

if (!cliendId || !cliendSecret) {
    throw new Error("Missing EXPO_PUBLIC_CLIENT_ID and EXPO_PUBLIC_CLIENT_SECRET environment variables");
}

export default function postToken() {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
        body: new URLSearchParams({
            "grant_type": "client_credentials",
            "client_id": cliendId as string,
            "client_secret": cliendSecret as string,
        }).toString(),
    }
    return apiClient<iAuthToken>("/oauth/token", undefined, undefined, options);
}
