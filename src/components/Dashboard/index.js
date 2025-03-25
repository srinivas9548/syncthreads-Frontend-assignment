import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import './index.css';


const Dashboard = () => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = Cookies.get("jwtToken");

        if (!jwtToken) {
            console.log("Session expired. Please log in again.");
            navigate("/login");
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const url = "https://srinivas-syncthreads-backend-assignment.vercel.app/api/dashboard";
                const options = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    }
                };

                const response = await fetch(url, options);

                if (response.status === 401) {
                    console.log("Unauthorized access. Please log in again.");
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }

                const responseData = await response.json();
                const updatedData = responseData.map((eachItem) => ({
                    id: eachItem.id,
                    title: eachItem.title,
                    description: eachItem.description,
                    imageUrl: eachItem.image_url
                }))
                setCardsData(updatedData);
            } catch (error) {
                console.log("Error Fetching Dashboard Data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    // console.log(cardsData);

    const onClickCardItem = (cardId) => {
        setSelectedCardId(cardId);
        navigate(`/map/${cardId}`);
    };

    return (
        <div className="dashboard-container">
            {loading ? (
                <Loader />
            ) : (
                <div className="dashboard-content">
                    {cardsData.length > 0 ? (
                        cardsData.map((card) => (
                            <div
                                key={card.id}
                                className={`card-item ${selectedCardId === card.id ? "selected-card" : ""}`}
                                onClick={() => onClickCardItem(card.id)}
                            >
                                <img src={card.imageUrl} alt={card.title} className="card-image" />
                                <div className="card-details">
                                    <h3 className="card-title">{card.title}</h3>
                                    <p className="card-description">{card.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-data-message">No dashboard items available.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Dashboard