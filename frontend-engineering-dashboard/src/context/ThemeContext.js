import { createContext,useState } from "react";

export const ThemeContext = createContext();

export const themesProvider = (({children})=>{
    const [theme,setTheme] = useState(THEMES.LIGHT);

    const toggleTheme = ()=>{
        setTheme(prev=>
            prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}} >{children}</ThemeContext.Provider>
    )
})