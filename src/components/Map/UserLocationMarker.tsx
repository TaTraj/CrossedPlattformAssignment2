import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface UserLocationMarkerProps {
    lat: number;
    lon: number;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ lat, lon }) => {
    return (
        <Marker
            position={[lat, lon]}
            icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png", // Nutzer Icon
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            })}
        >
            <Popup>
                <strong>Ihr Standort</strong>
            </Popup>
        </Marker>
    );
};

export default UserLocationMarker;
