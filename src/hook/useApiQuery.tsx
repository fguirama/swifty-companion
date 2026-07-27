import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@/providers/AuthProvider";
import {iAuthToken} from "@/types/type.42";

export default function useApiQuery<T>(key: unknown[], fn: (token?: iAuthToken, makeRequest?: () => Promise<iAuthToken | undefined>, signal?: AbortSignal) => Promise<T>, enabled = true) {
    const {token, makeRequest} = useAuth();

    return useQuery({
        queryKey: key,
        queryFn: ({signal}) => fn(token, makeRequest, signal),
        enabled: enabled && token !== undefined,
        retryDelay: 1000,
        retry: 3
    });
}
