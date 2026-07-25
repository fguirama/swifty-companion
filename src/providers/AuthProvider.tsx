import {createContext, useContext, useEffect, useState, ReactNode,} from "react";
import {iAuthToken} from "@/types/type.42";
import postToken from "@/lib/api.42";

type AuthContextType = {
    token?: iAuthToken;
    makeRequest?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState<iAuthToken>();
    let refreshPromise = false;

    useEffect(() => {
        makeRequest().then(() => {});
    }, []);

    const makeRequest = async ()=> {
        if (refreshPromise)
            return ;

        refreshPromise = true;
        await postToken()
            .then((data) => {
                if (data)
                    setToken(data);
            })
            .finally(() => {
                refreshPromise = false;
            });
            // todo handle error
    };

    return (<AuthContext.Provider value={{token, makeRequest}}>
        {children}
    </AuthContext.Provider>);
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used inside an AuthProvider");

    return context;
}
