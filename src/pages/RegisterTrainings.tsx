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

const RegisterTrainings: React.FC = () => {

    // State variables
    const [trainingId, setTrainingId] = useState('');
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
            // split into two columns
            const first = trainings.slice(0, mid);
            const second = trainings.slice(mid, trainings.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Get data from database to set custom ID
    useEffect(() => {
        const trainingsRef = firestore.collection('TrainingRegistrations');
        trainingsRef.get().then((snapshot) => {
            const trainings = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // get new registration id
            const count = trainings.length;
            const registrationId = "TR" + (count + 1);
            setRegistrationId(registrationId);
        });
    }, []);
    
    // Function to register for training event
    const registerTraining = async () => {
        try {
            if (trainingId === '' || name === '' || email === '' || phoneNumber === '') {
                setFilled(true);
                return;
            }
            const registrationRef = firestore.collection('TrainingRegistrations').doc(registrationId);
            let ans = window.confirm("Are you sure you want to register for this training event?");
            if (ans) {
                setFilled(false);
                const registrationData = { registrationId, trainingId, name, email, phoneNumber };
                await registrationRef.set(registrationData);
                history.goBack();
            }
        } catch (error) {
            setFilled(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setTrainingId('');
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
                            <IonTitle>Register for Training Events</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Training ID: {firstHalf.id}<br/><br/>
                                            Topic: {firstHalf.topic}<br/>
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
                                            Training ID: {secondHalf.id}<br/><br/>
                                            Topic: {secondHalf.topic}<br/>
                                            Leader: {secondHalf.leader}<br/>
                                            Date: {secondHalf.date}<br/>
                                            Time: {secondHalf.time}<br/>
                                            Location: {secondHalf.location}<br/>
                                            Cost: {secondHalf.cost}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">Training ID:</IonLabel>
                                            <IonInput value={trainingId} required={true}
                                                onIonChange={(event) => setTrainingId(event.detail.value)} />
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
                                        <IonButton expand="block" onClick={registerTraining}>
                                            <IonIcon icon={retreat} slot="start"></IonIcon>Register for Training Event</IonButton><br/>

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

export default RegisterTrainings;