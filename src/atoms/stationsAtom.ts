import { atom } from "jotai";

export type Station = {
    HALTESTELLEN_ID: number;
    NAME: string;
    GEMEINDE: string;
    WGS84_LAT: number;
    WGS84_LON: number;
};

export const stationsAtom = atom<Station[]>([]);

export type SortMode = "name" | "position";

export const sortModeAtom = atom<SortMode>("name");








//Alter Code

/*import { atomWithQuery } from "jotai-tanstack-query";
import { store } from "../App";
import Papa from "papaparse"

export interface Station {
    NAME: string;
    GEMEINDE: string;
    WGS84_LAT: number;
    WGS84_LON: number;
}

const stationsAtom = atomWithQuery(() => ({
    queryKey: ["stations"],
    queryFn: async (): Promise<Station[]> => {
        // Lade die gespeicherten Daten aus dem Speicher
        const cachedData = await store.get("stationData");

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Hole neue Daten
        const response = await fetch(
            "https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch station data.");
        }

        const csvData = await response.text();

        return new Promise<Station[]>((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    if (result.errors.length > 0) {
                        reject(result.errors);
                    } else {
                        const stationData = result.data.map((row: any) => ({
                            NAME: row.NAME,
                            GEMEINDE: row.GEMEINDE,
                            WGS84_LAT: parseFloat(row.WGS84_LAT),
                            WGS84_LON: parseFloat(row.WGS84_LON),
                        }));
                        store.set("stationData", JSON.stringify(stationData)); // Speichere die Daten
                        resolve(stationData);
                    }
                },
                error: (error: any) => reject(error),
            });
        });
    },
    refetchInterval: 60000, // Aktualisiere alle 60 Sekunden
}));

export { stationsAtom };*/
