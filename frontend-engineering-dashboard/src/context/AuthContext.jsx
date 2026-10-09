import { createContext, useState, useMemo, useEffect, useCallback } from "react";
import { loginService,logoutService,refreshSessionService } from "../services/authService";
export const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [accessToken,setAccessToken]=useState(null);
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading]=useState(true);
    
    const login = (async(credentials)=>{
        const {accessToken,user}=await loginService(credentials);

        setAccessToken(accessToken);
        setUser(user);
        return user;
    });

    const logout=(async()=>{
        try{
            await logoutService();
        }finally {
            setAccessToken(null);
            setUser(null);
        }

    })

    const refreshSession=useCallback(async()=>{
        try{
            const {accessToken, user} = await refreshSessionService();
            setAccessToken(accessToken);
            setUser(user);
        }catch(error){
            setAccessToken(null);
            setUser(null);

        }finally{
            setIsLoading(false);
        }
    },[]);

    useEffect(()=>{
        refreshSession();
    },[refreshSession]);

    const value = useMemo(()=>({
        user,
        accessToken,
        isAuthenticated : Boolean(accessToken),
        isLoading,
        login,
        logout
    }),[user,accessToken,isLoading,login,logout]);

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}