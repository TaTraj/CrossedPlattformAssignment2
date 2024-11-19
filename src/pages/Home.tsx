import React from "react";
import { useStationsQuery } from "../queries/useStationsQuery";
import { useAtom } from "jotai";
import { stationsAtom, sortModeAtom } from "../atoms/stationsAtom";
import { IonContent, IonPage, IonButton, IonList, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";

const HomeTab: React.FC = () => {
    const { data: stations, isLoading, error } = useStationsQuery();
    const [stationsState, setStations] = useAtom(stationsAtom); // Aktuellen Zustand und Funktion zum Aktualisieren holen
    const [sortMode, setSortMode] = useAtom(sortModeAtom);
    const history = useHistory();

    // Wenn sich die stations-Daten ändern, setzen wir den Atom-Wert
    React.useEffect(() => {
        if (stations) {
            setStations(stations); // Update des Atom-Wertes
        }
    }, [stations, setStations]);

    // Memo-ized sortedStations, um die Daten effizient zu sortieren
    const sortedStations = React.useMemo(() => {
        if (!stationsState) return []; // Keine Daten, return leere Liste
        if (sortMode === "name") {
            return [...stationsState].sort((a, b) => a.NAME.localeCompare(b.NAME));
        }
        return [...stationsState].sort((a, b) => a.WGS84_LAT - b.WGS84_LAT);
    }, [stationsState, sortMode]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <IonPage>
            <IonContent>
                <div>
                    <button onClick={() => setSortMode("name")}>Sort by Name</button>
                    <button onClick={() => setSortMode("position")}>Sort by Position</button>
                </div>
                <div>
                    <IonButton expand="full" onClick={() => history.push("/add-station")}>
                        Eigene Station hinzufügen
                    </IonButton>
                </div>
                <IonList>
                    {sortedStations.map((station) => (
                        <IonItem
                            key={
                                station.HALTESTELLEN_ID ??
                                `${station.NAME}-${station.WGS84_LAT}-${station.WGS84_LON}`
                            }
                        >
                            {station.NAME} - {station.GEMEINDE}
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default HomeTab;
