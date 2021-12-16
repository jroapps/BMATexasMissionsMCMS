// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase imports
import { firestore } from '../components/firebase';

// CSS & icon import
import '../pages/Main.css';
import { bed as retreat, sync as clear } from 'ionicons/icons';

const InputTrainings: React.FC = () => {

    // State variables
    const [topic, setTopic] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [leader, setLeader] = useState('');
    const [cost, setCost] = useState('');
    const [id, setId] = useState('');
    const [filled, setFilled] = useState(false);

    // Get history to go back
    const history = useHistory();

    // Get data from database to set custom ID
    useEffect(() => {
        const trainingsRef = firestore.collection('Trainings');
        trainingsRef.get().then((snapshot) => {
            const trainings = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const count = trainings.length;
            const id = "T" + (count + 1);
            setId(id);
        });
    }, []);

    // Function to save new training information
    const saveTraining = async () => {
        try {
            if (topic === '' || location === '' || date === '' || time === '' || cost === '' || leader === '') {
                setFilled(true);
                return;
            }
            const trainingsRef = firestore.collection('Trainings');
            let ans = window.confirm("Are you sure you want to save this training event?");
            if (ans) {
                const trainingData = { topic, location, date, time, cost, leader };
                await trainingsRef.doc(id).set(trainingData);
                history.goBack();
            }
        } catch (error) {
            setFilled(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setTopic('');
        setLocation('');
        setDate('');
        setTime('');
        setCost('');
        setLeader('');

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
                            <IonTitle>Input New Training Event Information</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Training Topic:</IonLabel>
                                <IonInput value={topic} required={true}
                                    onIonChange={(event) => setTopic(event.detail.value)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Leader:</IonLabel>
                                <IonInput value={leader} required={true}
                                    onIonChange={(event) => setLeader(event.detail.value)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Date:</IonLabel>
                                <IonInput value={date} required={true}
                                    onIonChange={(event) => setDate(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Time:</IonLabel>
                                <IonInput value={time} required={true}
                                    onIonChange={(event) => setTime(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Location:</IonLabel>
                                <IonInput value={location} required={true}
                                    onIonChange={(event) => setLocation(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Cost:</IonLabel>
                                <IonInput value={cost} required={true}
                                    onIonChange={(event) => setCost(event.detail.value)}/>
                            </IonItem>

                            {filled &&
                                <IonText color="danger">
                                    Please enter all fields.
                                </IonText>
                            }
                            <IonButton expand="block" onClick={saveTraining}>
                            <IonIcon icon={retreat} slot="start"></IonIcon>Save Training Event</IonButton><br/>

                            <IonButton color="medium" expand="block" onClick={clearForm}>
                                <IonIcon icon={clear} slot="start"></IonIcon>Clear Form</IonButton>
                        </IonList>
                    </IonContent>
                    <Footer />
                </IonPage>
            </IonSplitPane>
        </IonContent>
    );
};

export default InputTrainings;