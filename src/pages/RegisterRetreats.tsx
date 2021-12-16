// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { firestore } from '../components/firebase';

// CSS & icon import
import '../pages/Main.css';
import { bed as retreat, sync as clear } from 'ionicons/icons';

const RegisterRetreats: React.FC = () => {

    // State variables
    const [retreatId, setRetreatId] = useState('');
    const [registrationId, setRegistrationId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [filled, setFilled] = useState(false);

    // Get history to go back
    const history = useHistory();

    // Get data from database to display
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
            // split into two columns
            const first = retreats.slice(0, mid);
            const second = retreats.slice(mid, retreats.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Get data from database to set custom ID
    useEffect(() => {
        const retreatsRef = firestore.collection('RetreatRegistrations');
        retreatsRef.get().then((snapshot) => {
            const retreats = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // get new registration id
            const count = retreats.length;
            const registrationId = "RR" + (count + 1);
            setRegistrationId(registrationId);
        });
    }, []);
    
    // Function to register for retreat
    const registerRetreat = async () => {
        try {
            if (retreatId === '' || name === '' || email === '' || phoneNumber === '') {
                setFilled(true);
                return;
            }
            const registrationRef = firestore.collection('RetreatRegistrations').doc(registrationId);
            let ans = window.confirm("Are you sure you want to register for this retreat?");
            if (ans) {
                setFilled(false);
                const registrationData = { registrationId, retreatId, name, email, phoneNumber };
                await registrationRef.set(registrationData);
                history.goBack();
            }
        } catch (error) {
            setFilled(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setRetreatId('');
        setName('');
        setEmail('');
        setPhone('');

        // Resetting boolean check
        setFilled(false);
    };

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
                            <IonTitle>Register for Retreats</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Retreat ID: {firstHalf.id}<br/><br/>
                                            Retreat Type: {firstHalf.type}<br/>
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
                                            Retreat ID: {secondHalf.id}<br/><br/>
                                            Retreat Type: {secondHalf.type}<br/>
                                            Retreat Location: {secondHalf.location}<br/>
                                            Start Date: {secondHalf.startDate}<br/>
                                            End Date: {secondHalf.endDate}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">Retreat ID:</IonLabel>
                                            <IonInput value={retreatId} required={true}
                                                onIonChange={(event) => setRetreatId(event.detail.value)} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Your Name:</IonLabel>
                                            <IonInput value={name} required={true}
                                                onIonChange={(event) => setName(event.detail.value)}/>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Email Address:</IonLabel>
                                            <IonInput value={email} type="email" required={true}
                                                onIonChange={(event) => setEmail(event.detail.value)}/>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Phone Number:</IonLabel>
                                            <IonInput value={phoneNumber} type="tel" required={true}
                                                onIonChange={(event) => setPhone(event.detail.value)}/>
                                        </IonItem>
                                        {filled &&
                                            <IonText color="danger">
                                                Please enter all fields.
                                            </IonText>
                                        }
                                        <IonButton expand="block" onClick={registerRetreat}>
                                            <IonIcon icon={retreat} slot="start"></IonIcon>Register for Retreat</IonButton><br/>

                                        <IonButton color="medium" expand="block" onClick={clearForm}>
                                            <IonIcon icon={clear} slot="start"></IonIcon>Clear Form</IonButton>
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

export default RegisterRetreats;