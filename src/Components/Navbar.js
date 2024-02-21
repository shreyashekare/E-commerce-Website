import { Link } from "react-router-dom";

function Navbar()
{
    return(
        <div>
            <Navbar>
                
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                
            </Navbar>
        </div>
    )
}
export default Navbar;