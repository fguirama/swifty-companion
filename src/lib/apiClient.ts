import {iAuthToken} from "@/types/type.42";

type ApiOptions = RequestInit & {body?: unknown};
export const API_URL = "https://api.intra.42.fr";

type tDataErrorResponse = {
    error: {
        code: string
        message?: string
        fields?: Record<string, {message: string}>
    }
};

export class ApiError extends Error {
    status: number;
    data: tDataErrorResponse;
    notificationMsg: string;

    constructor(status: number, data: tDataErrorResponse) {
        super(data?.error?.message ?? "Unknown error occurred.");

        this.name = "ApiError";
        this.status = status;
        this.data = data;
        this.notificationMsg = `${status} - ${this.message}`;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default async function apiClient<T>(endpoint: string, token?: iAuthToken, makeRequest?: () => Promise<void>, options?: ApiOptions): Promise<T> {
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

    console.log("OPTION REQUEST", endpoint, options);
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        console.log("ERREUR DANS LA REQUETE", data);
        if (token && makeRequest && response.status === 401 && data.error.code === "TOKEN_EXPIRED") {
            await makeRequest();
            return apiClient<T>(endpoint, token, makeRequest, options);
        }
        throw new ApiError(response.status, data);
    } else
        return data;
}
