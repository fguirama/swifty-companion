import apiClient from "@/lib/apiClient";
import {iAuthToken, iProject, iSkills, iUser} from "@/types/type.42";
import useApiQuery from "@/hook/useApiQuery";

export function useUser(userLogin: string) {
    return useApiQuery(
        ["user", userLogin],
        (token?: iAuthToken, makeRequest?: () => Promise<iAuthToken | undefined>) => apiClient<iUser[]>(`/v2/users?filter[login]=${userLogin}`, token, makeRequest),
        userLogin.length > 0
    );
}

export function useUserProject(userId: number) {
    return useApiQuery(
        ["userProject", userId],
        (token?: iAuthToken, makeRequest?: () => Promise<iAuthToken | undefined>) => apiClient<iProject[]>(`/v2/users/${userId}/projects_users?page[size]=100`, token, makeRequest),
    );
}

export function useUserSkills(userId: number) {
    return useApiQuery(
        ["userSkills", userId],
        (token?: iAuthToken, makeRequest?: () => Promise<iAuthToken | undefined>) => apiClient<iSkills[]>(`/v2/users/${userId}/cursus_users`, token, makeRequest),
    );
}
