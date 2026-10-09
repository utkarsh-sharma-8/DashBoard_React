import { useState } from "react";
import { DayPicker } from "react-day-picker";
const Header = ()=>{
    const [selected, setSelected] = useState();
    return(
        <div>
            <div>
                <div>
                    Dashboard
                </div>
                <span>
                    Welcome back Utkarsh! Here's what happening with your buisness today.
                </span>
                <div>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
export default Header;