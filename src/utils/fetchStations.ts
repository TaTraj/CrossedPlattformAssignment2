import Papa from "papaparse";
import { saveDataToStorage, getDataFromStorage } from "./storage";
import { Station } from "../atoms/stationsAtom";

const CSV_URL = "https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv";

// Funktion, um Stationen zu holen
export const fetchStations = async (): Promise<Station[]> => {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    // Parse CSV mit PapaParse
    const parsedData = Papa.parse<Station>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
    });

    if (parsedData.errors.length > 0) {
        console.error("CSV Parsing Errors:", parsedData.errors);
        throw new Error("Failed to parse station data");
    }

    // Die Stationen als Array zurückgeben
    const stations: Station[] = parsedData.data.map((station) => {
        // Wir gehen davon aus, dass WGS84_LAT und WGS84_LON bereits als number vorliegen.
        return {
            NAME: station.NAME,
            GEMEINDE: station.GEMEINDE,
            WGS84_LAT: station.WGS84_LAT, // bereits als Zahl erwartet
            WGS84_LON: station.WGS84_LON, // bereits als Zahl erwartet
            HALTESTELLEN_ID: station.HALTESTELLEN_ID, // Stelle sicher, dass das auch vorhanden ist
        };
    });

    // Speichern der Stationen in lokalem Speicher
    await saveDataToStorage("stationData", stations);

    return stations;
};

// Funktion, um gespeicherte Stationen zu laden
export const loadStationsFromStorage = async (): Promise<Station[] | null> => {
    return await getDataFromStorage<Station[]>("stationData");
};
