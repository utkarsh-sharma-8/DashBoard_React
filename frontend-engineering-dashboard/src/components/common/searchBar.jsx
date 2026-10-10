import {useState} from "react";
import useDebounce from "../../hooks/useDebounce";
const searchBar = ({onSearch,placeholder})=>{
    const [input,setInput] = useState("");
    const debouncedValue = useDebounce(input);
    useEffect(()=>{
        onSearch(input);

    },[debouncedValue,onSearch])

    return(
        <input
        onChange={(e)=>setInput(e.target.value)}
        type ="search"
        placeholder={placeholder}
        value={input}
        />
    )
}
export default searchBar;