import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAtom } from "jotai";
import { stationsAtom } from "../atoms/stationsAtom";
import UserLocationMarker from "../components/Map/UserLocationMarker";
import ZoomToLocationButton from "../components/Map/ZoomToLocationButton"; // Import des Buttons
import L from "leaflet";
import "./Map.css";


const Map: React.FC = () => {
    const [stations] = useAtom(stationsAtom);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Fehler beim Abrufen des Standorts", error);
            }
        );
    }, []);

    return (
        <div style={{ height: "100vh" }}>
            <MapContainer center={[48.2082, 16.3738]} zoom={13} style={{ height: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomToLocationButton userLocation={userLocation} />
                {userLocation && (
                    <UserLocationMarker lat={userLocation.lat} lon={userLocation.lon} />
                )}
                {stations?.map((station) => (
                    <Marker
                        key={station.HALTESTELLEN_ID}
                        position={[station.WGS84_LAT, station.WGS84_LON]}
                        icon={L.icon({
                            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41],
                        })}
                    >
                        <Popup>
                            <strong>{station.NAME}</strong>
                            <br />
                            {station.GEMEINDE}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
