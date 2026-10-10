import { useEffect, useState } from "react"

const useDebounce = ({value,delay = 500})=>{
    const [debounce,setDebounce] = useState("");
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounce(value);
        },delay)
        return ()=>
            clearTimeout(timer);
    },[input,value]);

    return debounce;
}
export default useDebounce;