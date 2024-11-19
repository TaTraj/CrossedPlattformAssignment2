import React from "react";
import { Redirect, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, map, person } from "ionicons/icons";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import AddStationPage from "./pages/AddStationPage"; // Importiere die neue Seite
import "leaflet/dist/leaflet.css";
import { Storage } from "@ionic/storage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Umbenennung zur Vermeidung von Konflikten
import { App as CapacitorApp } from "@capacitor/app";

setupIonicReact();

// Query Client für die gesamte App
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/Home">
                  <Home />
                </Route>
                <Route exact path="/Map">
                  <Map />
                </Route>
                <Route exact path="/Profile">
                  <Profile />
                </Route>
                {/* Neue Route für die AddStationPage */}
                <Route exact path="/add-station">
                  <AddStationPage />
                </Route>
                <Route exact path="/">
                  <Redirect to="/Home" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="map" href="/map">
                  <IonIcon aria-hidden="true" icon={map} />
                  <IonLabel>Map</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon aria-hidden="true" icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </QueryClientProvider>
  );
};

export default App;
