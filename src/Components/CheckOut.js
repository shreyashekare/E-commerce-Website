import { useParams } from "react-router-dom";

function CheckOut()
{
    const {id} = useParams();
    return(
        <div>
            <h1>Welcome to payment page</h1>
            {id}
        </div>
    )
}
export default CheckOut;