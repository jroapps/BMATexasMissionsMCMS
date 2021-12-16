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

const ViewRetreats: React.FC = () => {
    
    // State variables
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);

    // Get data from database
    useEffect(() => {
        const retreatsRef = firestore.collection('Retreats');
        retreatsRef.get().then((snapshot) => {
            const retreats = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (retreats.length % 2 > 0) {
                var mid = (retreats.length / 2) + 1;
            } else {
                mid = retreats.length / 2;
            }
            const first = retreats.slice(0, mid);
            const second = retreats.slice(mid, retreats.length);
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
                            <IonTitle>BMA Texas Missions Retreats</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonText className="ion-text-retreat">
                            <h4>For more info or registration click <a href="/RegisterRetreats">here</a> or email Todd West at <a href="mailto:todd@bmatexas.org">todd@bmatexas.org</a>.</h4>
                        </IonText>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Retreat Type: {firstHalf.type}<br/><br/>
                                            Retreat Location: {firstHalf.location}<br/>
                                            Start Date: {firstHalf.startDate}<br/>
                                            End Date: {firstHalf.endDate}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}><br/>
                                            Retreat Type: {secondHalf.type}<br/><br/>
                                            Retreat Location: {secondHalf.location}<br/>
                                            Start Date: {secondHalf.startDate}<br/>
                                            End Date: {secondHalf.endDate}<br/><br/>
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

export default ViewRetreats;