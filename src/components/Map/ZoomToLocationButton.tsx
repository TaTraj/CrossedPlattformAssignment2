import React from "react";
import { useMap } from "react-leaflet";
import "./ZoomToLocationButton.css"; // Importiere das Styling

type ZoomToLocationButtonProps = {
    userLocation: { lat: number; lon: number } | null;
};

const ZoomToLocationButton: React.FC<ZoomToLocationButtonProps> = ({ userLocation }) => {
    const map = useMap();

    const handleZoomToLocation = () => {
        if (userLocation) {
            map.flyTo([userLocation.lat, userLocation.lon], 13); // Zentriere die Karte
        } else {
            console.warn("Benutzerstandort nicht verfügbar");
        }
    };

    return (
        <button className="zoom-to-location-button" onClick={handleZoomToLocation}>
            Mein Standort
        </button>
    );
};

export default ZoomToLocationButton;

