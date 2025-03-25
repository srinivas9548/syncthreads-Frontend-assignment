import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import Dashboard from '../Dashboard';
import MapView from '../MapView';
import './index.css';

const Home = () => {
    const navigate = useNavigate();
    const jwtToken = Cookies.get("jwtToken");

    useEffect(() => {
        if (!jwtToken) {
            navigate("/login");
        }
    }, [jwtToken, navigate]);

    return (
        <>
            <Header />
            <Dashboard />
            <MapView />
        </>
    )
}

export default Home