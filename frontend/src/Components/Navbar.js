import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";

const Navbar = () => {
    const {logout} = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to='/'>Home</Link>
                <Link to='/carpool'>Carpool</Link>
                <Link to='/all-carpoolpool'>All Carpool Posts</Link>
                <Link to='/carbon'>Carbon Footprint</Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to='/login'>Log In</Link>
                            <Link to='/signup' style={{ marginLeft: '5px' }}>Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;