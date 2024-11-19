import React, { useState } from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonButton, IonLabel, IonItem } from "@ionic/react";
import { useAtom } from "jotai";
import { stationsAtom } from "../atoms/stationsAtom"; // Atom importieren

const AddStationPage: React.FC = () => {
    const [stations, setStations] = useAtom(stationsAtom); // stationsAtom laden
    const [newStation, setNewStation] = useState({
        HALTESTELLEN_ID: 0,
        NAME: "",
        GEMEINDE: "",
        WGS84_LAT: 0,
        WGS84_LON: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setNewStation({
            ...newStation,
            [field]: e.target.value,
        });
    };

    const handleSave = () => {
        // Validierung der Eingaben
        if (!newStation.NAME || !newStation.GEMEINDE || !newStation.WGS84_LAT || !newStation.WGS84_LON) {
            alert("Bitte füllen Sie alle Felder aus.");
            return;
        }

        // Station zur bestehenden Liste hinzufügen
        const updatedStations = [...stations, newStation];
        setStations(updatedStations); // Atom aktualisieren

        // Optional: Zurück zur Home-Seite oder zur Liste der Stationen
        window.history.back();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Neue Station hinzufügen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput
                        value={newStation.NAME}
                        onIonChange={(e) => handleInputChange(e, "NAME")}
                        required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Gemeinde</IonLabel>
                    <IonInput
                        value={newStation.GEMEINDE}
                        onIonChange={(e) => handleInputChange(e, "GEMEINDE")}
                        required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Breite (Latitude)</IonLabel>
                    <IonInput
                        type="number"
                        value={newStation.WGS84_LAT}
                        onIonChange={(e) => handleInputChange(e, "WGS84_LAT")}
                        required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Länge (Longitude)</IonLabel>
                    <IonInput
                        type="number"
                        value={newStation.WGS84_LON}
                        onIonChange={(e) => handleInputChange(e, "WGS84_LON")}
                        required
                    />
                </IonItem>
                <IonButton expand="full" onClick={handleSave}>
                    Station hinzufügen
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AddStationPage;
