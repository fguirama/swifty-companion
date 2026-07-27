import {iAuthToken} from "@/types/type.42";

type ApiOptions = RequestInit & {body?: unknown};
export const API_URL = "https://api.intra.42.fr";

export default async function apiClient<T>(endpoint: string, token?: iAuthToken, makeRequest?: () => Promise<iAuthToken | undefined>, options?: ApiOptions): Promise<T> {
    console.log("[REQUEST]", endpoint, options?.method ?? "GET");
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,

            headers: {
                ...(options?.headers ?? {}),
                ...(token && {
                    Authorization: `Bearer ${token.access_token}`,
                }),
            },
            body: options?.body,
            signal: options?.signal,
        }
    );

    const data = await response.json().catch(() => null);
    console.log("[RESPONSE]", response.status, data);
    if (!response.ok) {
        console.log("[ERROR]", response.status, data);
        if (token && makeRequest && response.status === 401) {
            const newToken = await makeRequest();
            return apiClient<T>(endpoint, newToken, makeRequest, options);
        }
        throw new Error(`API Error: ${response.status} - ${data?.message ?? "Unknown error"}`);
    } else
        return data;
}
