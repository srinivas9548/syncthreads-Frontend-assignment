import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Header = () => {
    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove("jwtToken"); //Remove the jwtToken from js-cookie
        navigate("/login"); //Redirect to Login Route
    }

    return (
        <nav className="nav-header">
            <div className="nav-content">
                <h1 className="header-logo">Dashboard</h1>
                <button type="button" className="logout-button" onClick={onClickLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Header