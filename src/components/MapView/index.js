import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer} from "react-leaflet";
import Cookies from "js-cookie";
import "leaflet/dist/leaflet.css";
import "./index.css";

const MapView = () => {
    const { id } = useParams(); // Get country ID from URL
    const [mapData, setMapData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching map data for country ID:", id);

        const jwtToken = Cookies.get("jwtToken");

        if (!jwtToken) {
            console.log("Session expired. Please log in again.");
            navigate("/login");
            return;
        }

        const getMapData = async () => {
            try {
                const url = "https://srinivas-syncthreads-backend-assignment.vercel.app/api/map";
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                };

                const response = await fetch(url, options);
                if (response.ok) {
                    const responseData = await response.json();

                    // Find the corresponding map data using ID
                    const selectedMap = responseData.find((eachMap) => eachMap.id === parseInt(id));

                    if (selectedMap) {
                        setMapData({
                            countryName: selectedMap.country_name,
                            latitude: selectedMap.latitude,
                            longitude: selectedMap.longitude,
                            zoom: selectedMap.zoom,
                        });
                    } else {
                        console.log("No map data found for this country ID.");
                        navigate("/"); // Redirect to home if no data
                    }
                } else {
                    console.log("Unauthorized access. Please log in again.");
                    navigate("/login");
                }
            } catch (error) {
                console.log("Error Fetching Map Data:", error);
            }
        };

        getMapData();
    }, [id, navigate]);

    if (!mapData) {
        return <p>Loading map...</p>;
    }

    return (
        <div className="map-wrapper-container">
            <h2>{mapData.countryName} Map</h2>
            <div className="map-container">
                <MapContainer
                    center={[mapData.latitude, mapData.longitude]}
                    zoom={mapData.zoom}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapView;
