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

const MissionPoints: React.FC = () => {
    
    // State variables
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);

    // Get data from database
    useEffect(() => {
        const pointsRef = firestore.collection('MissionPoints');
        pointsRef.get().then((snapshot) => {
            const points = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (points.length % 2 > 0) {
                var mid = (points.length / 2) + 1;
            } else {
                mid = points.length / 2;
            }
            const first = points.slice(0, mid);
            const second = points.slice(mid, points.length);
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
                            <IonTitle>BMA Texas Missions Mission Points</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList>
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            {firstHalf.name}<br/><br/>
                                            Missionary: {firstHalf.missionary}<br/>
                                            Location: {firstHalf.location}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList>
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}><br/>
                                            {secondHalf.name}<br/><br/>
                                            Missionary: {secondHalf.missionary}<br/>
                                            Location: {secondHalf.location}<br/><br/>
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

export default MissionPoints;