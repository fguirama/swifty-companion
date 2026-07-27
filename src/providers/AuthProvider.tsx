import {createContext, useContext, useEffect, useState, ReactNode,} from "react";
import {iAuthToken} from "@/types/type.42";
import postToken from "@/lib/api.42.auth";

type AuthContextType = {
    token?: iAuthToken;
    makeRequest?: () => Promise<iAuthToken | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState<iAuthToken>();

    useEffect(() => {
        makeRequest().then(() => {});
    }, []);

    const makeRequest = async ()=> {
        return await postToken()
            .then((data) => {
                if (data)
                    setToken(data);
                return data;
            });
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
