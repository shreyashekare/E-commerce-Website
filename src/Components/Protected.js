import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props)
{
    const {Comp} = props
    const nav = useNavigate();
    useEffect(()=>{
     let login = localStorage.getItem('login');
     if(!login)
     {
       nav('/');
     }
    }) 
    return(
        <div>
            <Comp />
        </div>
    )
}
export default Protected;