import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [accessToken,setAccessToken]=useState(null);
    const [user,setUser] = useState();
    const [loading,setLoading]=useState(true);
    
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

    const refreshSession=(async()=>{
        try{
            const {accessToken, user} = await refreshToken();
            setAccessToken(accessToken);
            setUser(user);
        }catch(error){
            setAccessToken(null);
            setUser(null);

        }finally{
            setLoading(false);
        }
    });

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
    }),[user,accessToken,loading,login,logout]);

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}