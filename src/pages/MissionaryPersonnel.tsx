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

const MissionaryPersonnel: React.FC = () => {
    
    // State variables
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [fourth, setFourth] = useState([]);

    // Get data from database
    useEffect(() => {
        const missionaryRef = firestore.collection('Missionaries');
        missionaryRef.get().then((snapshot) => {
            const missionary = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (missionary.length % 2 > 0) {
                var firstQtr = (missionary.length / 4) + 1;
                var mid = (missionary.length / 2) + 1
                var thirdQtr = firstQtr + mid - 1;
            } else {
                firstQtr = missionary.length / 4;
                mid = missionary.length / 2;
                thirdQtr = firstQtr + mid;
            }
            const first = missionary.slice(0, firstQtr);
            const second = missionary.slice(firstQtr, mid);
            const third = missionary.slice(mid, thirdQtr);
            const fourth = missionary.slice(thirdQtr, missionary.length);
            setFirst(first);
            setSecond(second);
            setThird(third);
            setFourth(fourth);
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
                            <IonTitle>BMA Texas Missions Missionary List</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen >
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList>
                                        {first.map((firstQuarter) =>
                                        <IonItem key={firstQuarter.id}><br/>
                                            {firstQuarter.name}<br/><br/>
                                            Email: {firstQuarter.email}<br/>
                                            Phone: {firstQuarter.phoneNumber}<br/>
                                            Address: {firstQuarter.street}<br/>
                                            City: {firstQuarter.city}<br/>
                                            State: {firstQuarter.state}<br/>
                                            Zip Code: {firstQuarter.zipcode}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList >
                                        {second.map((secondQuarter) =>
                                        <IonItem key={secondQuarter.id}><br/>
                                            {secondQuarter.name}<br/><br/>
                                            Email: {secondQuarter.email}<br/>
                                            Phone: {secondQuarter.phoneNumber}<br/>
                                            Address: {secondQuarter.street}<br/>
                                            City: {secondQuarter.city}<br/>
                                            State: {secondQuarter.state}<br/>
                                            Zip Code: {secondQuarter.zipcode}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList >
                                        {third.map((thirdQuarter) =>
                                        <IonItem key={thirdQuarter.id}><br/>
                                            {thirdQuarter.name}<br/><br/>
                                            Email: {thirdQuarter.email}<br/>
                                            Phone: {thirdQuarter.phoneNumber}<br/>
                                            Address: {thirdQuarter.street}<br/>
                                            City: {thirdQuarter.city}<br/>
                                            State: {thirdQuarter.state}<br/>
                                            Zip Code: {thirdQuarter.zipcode}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList >
                                        {fourth.map((fourthQuarter) =>
                                        <IonItem key={fourthQuarter.id}><br/>
                                            {fourthQuarter.name}<br/><br/>
                                            Email: {fourthQuarter.email}<br/>
                                            Phone: {fourthQuarter.phoneNumber}<br/>
                                            Address: {fourthQuarter.street}<br/>
                                            City: {fourthQuarter.city}<br/>
                                            State: {fourthQuarter.state}<br/>
                                            Zip Code: {fourthQuarter.zipcode}<br/><br/>
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

export default MissionaryPersonnel;