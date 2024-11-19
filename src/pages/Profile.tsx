import React, {useState, useEffect} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonButton,
    IonCard,
    IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/react';
import {Camera, CameraResultType} from '@capacitor/camera';
import {Filesystem, Directory} from '@capacitor/filesystem';
import './Profile.css';
import defaultProfile from '../assets/default-profile.jpg';
import {getAppVersion} from "../utils/version";  // Default image if none is saved
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const Profile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const appVersion = getAppVersion();
    const position = [39.7817, -89.6501]; // Breite und Länge


    // Load stored image on component mount
    useEffect(() => {
        loadProfileImage();
    }, []);

    // Function to take a photo
    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri, // Use URI for storing locally
            quality: 100,
        });
        if (image && image.webPath) {
            const photoUri = image.webPath; // WebPath for viewing
            setProfileImage(photoUri); // Update the UI with the new image
            saveProfileImage(photoUri); // Save the image to local storage
        }
    };

    // Function to save the image to the device storage
    const saveProfileImage = async (uri: string) => {
        try {
            const filename = 'profile-image.jpg'; // Image filename
            const fileUri = await Filesystem.writeFile({
                path: filename,
                data: uri, // Web path data for storing the image
                directory: Directory.Data,
            });
            console.log('Image saved at: ', fileUri.uri);
        } catch (error) {
            console.error('Error saving image: ', error);
        }
    };

    // Function to load the stored image from device storage
    const loadProfileImage = async () => {
        try {
            const result = await Filesystem.readFile({
                path: 'profile-image.jpg',
                directory: Directory.Data,
            });
            if (result && result.data) {
                const imageUri = `data:image/jpeg;base64,${result.data}`;
                setProfileImage(imageUri);
            }
        } catch (error) {
            console.log('No image found in storage, using default');
            setProfileImage(defaultProfile); // Set the default image if none exists
        }
    };

    // Function to download the image
    const downloadImage = () => {
        if (profileImage) {
            const link = document.createElement('a');
            link.href = profileImage;
            link.download = 'profile-image.jpg';
            link.click();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>


            {/*<IonTitle size="small">About the app</IonTitle>*/}

            <IonContent>
                <IonCardContent className="profile-container">
                <IonImg src={profileImage || defaultProfile} alt="Profile" className="profile-img"/>
                <IonButton onClick={takePhoto}>Choose Photo</IonButton>
                {/* Button to download the image */}
                <IonButton onClick={downloadImage}>Download Profile Image</IonButton>
                </IonCardContent>

                <IonCardContent>
                <p>App-Version: {appVersion}</p>
                <p>Developer: Anna Johnson</p>
                <p><strong>Address:</strong> 1234 Elm Street, Springfield, IL</p>
                </IonCardContent>
                {/* Leaflet Map */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Developer Location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <MapContainer
                            center={position}
                            zoom={13}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>Hier ist der Standort der Entwicklerin!</Popup>
                            </Marker>
                        </MapContainer>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};


export default Profile;
