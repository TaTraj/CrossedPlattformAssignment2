import { useQuery, QueryKey } from "@tanstack/react-query";
import { fetchStations, loadStationsFromStorage } from "../utils/fetchStations";
import { Station } from "../atoms/stationsAtom";

export const useStationsQuery = () => {
    return useQuery<Station[], Error>({
        queryKey: ["stations"] as QueryKey, // QueryKey wird hier explizit definiert
        queryFn: async () => {
            const storedStations = await loadStationsFromStorage();

            if (storedStations) {
                // Prüfe, ob Daten aktualisiert werden müssen
                const fetchedStations = await fetchStations();
                if (JSON.stringify(storedStations) !== JSON.stringify(fetchedStations)) {
                    console.log("Neue Stationsdaten gefunden. Daten werden aktualisiert.");
                    return fetchedStations;
                }
                console.log("Lokale Daten sind aktuell.");
                return storedStations;
            }

            // Keine lokalen Daten gefunden, lade sie aus der Quelle
            return await fetchStations();
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 Stunden
    });
};
