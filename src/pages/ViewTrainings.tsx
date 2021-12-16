// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonList, IonGrid, IonRow, IonCol, IonText, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { firestore } from '../components/firebase';

// CSS import
import '../pages/Main.css';

const ViewTrainings: React.FC = () => {
    
    // State variables
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);

    // Get data from database
    useEffect(() => {
        const trainingsRef = firestore.collection('Trainings');
        trainingsRef.get().then((snapshot) => {
            const trainings = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (trainings.length % 2 > 0) {
                var mid = (trainings.length / 2) + 1;
            } else {
                mid = trainings.length / 2;
            }
            const first = trainings.slice(0, mid);
            const second = trainings.slice(mid, trainings.length);
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
                            <IonTitle>BMA Texas Missions Training Events</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonText className="ion-text-retreat">
                            <h4>For more info or registration click <a href="/RegisterTrainings">here.</a></h4>
                        </IonText>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Topic: {firstHalf.topic}<br/><br/>
                                            Leader: {firstHalf.leader}<br/>
                                            Date: {firstHalf.date}<br/>
                                            Time: {firstHalf.time}<br/>
                                            Location: {firstHalf.location}<br/>
                                            Cost: {firstHalf.cost}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}><br/>
                                            Topic: {secondHalf.topic}<br/><br/>
                                            Leader: {secondHalf.leader}<br/>
                                            Date: {secondHalf.date}<br/>
                                            Time: {secondHalf.time}<br/>
                                            Location: {secondHalf.location}<br/>
                                            Cost: {secondHalf.cost}<br/><br/>
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

export default ViewTrainings;