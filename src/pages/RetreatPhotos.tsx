// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonButton, IonIcon, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { firestore, storage } from '../components/firebase';

// CSS & icon import
import '../pages/Main.css';
import { image as photo } from 'ionicons/icons';

const RetreatPhotos: React.FC = () => {

    // State variables
    const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
    const [photoId, setPhotoId] = useState('');
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);

    // UseRef hook to get file reference
    const fileInputRef = useRef<HTMLInputElement>();

    // Get data from database to display
    useEffect(() => {
        const photosRef = firestore.collection('RetreatPhotos');
        photosRef.get().then((snapshot) => {
            const photos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (photos.length % 2 > 0) {
                var mid = (photos.length / 2) + 1;
            } else {
                mid = photos.length / 2;
            }
            // split into two columns
            const first = photos.slice(0, mid);
            const second = photos.slice(mid, photos.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Get data from database to set custom ID
    useEffect(() => {
        const photosRef = firestore.collection('RetreatPhotos');
        photosRef.get().then((snapshot) => {
            const photos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // get new photo id
            const count = photos.length;
            const photoId = "PH" + (count + 1);
            setPhotoId(photoId);
        });
    }, []);

    // Function to upload new photo
    const uploadPhoto = async () => {
        const photosRef = firestore.collection('RetreatPhotos').doc(photoId);
        let ans = window.confirm("Are you sure you want to upload this photo?");
        if (ans) {
            const photoData = { photoId, pictureUrl };
            if (pictureUrl.startsWith('blob')) {
                photoData.pictureUrl = await savePhoto(pictureUrl);
            }
            await photosRef.set(photoData);
            window.location.reload();
        }
    }

    // Function to change blob URL
    async function savePhoto(blobUrl) {
        const pictureRef = storage.ref(`/RetreatPhotos/${photoId}`);
        const res = await fetch(blobUrl);
        const blob = await res.blob();
        const snapshot = await pictureRef.put(blob);
        const url = await snapshot.ref.getDownloadURL();
        return url;
    }

    // Function for file change
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrl = URL.createObjectURL(file);
            setPictureUrl(pictureUrl);
        }
    }

    // remove previously uploaded temp file
    useEffect(() => () => {
        if (pictureUrl.startsWith('blob')) {
            URL.revokeObjectURL(pictureUrl);
        }
    }, [pictureUrl]);

    // Main page content
    return (
        <IonContent>
            <IonSplitPane contentId="main" when="sm">
                <Menu />
                <IonPage id="main">
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>Retreat Photos</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                            <IonItem key={firstHalf.id}><br /><br />
                                            <IonImg src={firstHalf.pictureUrl}/><br /><br />
                                            </IonItem>
                                        )}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}
                                        ><br /><br />
                                        <IonImg src={secondHalf.pictureUrl}/><br /><br />
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonTitle className="ion-title">Upload New Photo</IonTitle>
                                        <IonLabel position="floating"></IonLabel>
                                        <input type="file" accept="image/*" required={true} hidden ref={fileInputRef}
                                            onChange={fileChange}
                                        /><br/>
                                        <IonImg src={pictureUrl} alt="" 
                                            onClick={() => fileInputRef.current.click()}
                                        /><br/>
                                        <IonButton expand="block" onClick={uploadPhoto}>
                                            <IonIcon icon={photo} slot="start"></IonIcon>Upload New Photo</IonButton><br/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        
                    </IonContent>
                    <Footer />
                </IonPage>
            </IonSplitPane>
        </IonContent>
    );
};

export default RetreatPhotos;