// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonList, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { firestore } from '../components/firebase';

// CSS import
import '../pages/Main.css';

const DirectorPersonnel: React.FC = () => {
    
    // State variables
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);

    // Get data from database
    useEffect(() => {
        const directorRef = firestore.collection('Director');
        directorRef.get().then((snapshot) => {
            const director = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (director.length % 2 > 0) {
                var mid = (director.length / 2) + 1;
            } else {
                mid = director.length / 2;
            }
            const first = director.slice(0, mid);
            const second = director.slice(mid, director.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

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
                            <IonTitle>BMA Texas Missions Director List</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen >
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList >
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            {firstHalf.name}<br/><br/>
                                            Title: {firstHalf.title}<br/>
                                            Email: {firstHalf.email}<br/>
                                            Phone: {firstHalf.phoneNumber}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList >
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}><br/>
                                            {secondHalf.name}<br/><br/>
                                            Title: {secondHalf.title}<br/>
                                            Email: {secondHalf.email}<br/>
                                            Phone: {secondHalf.phoneNumber}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
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

export default DirectorPersonnel;