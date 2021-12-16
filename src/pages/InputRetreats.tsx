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

const InputRetreats: React.FC = () => {

    // State variables
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStart] = useState('');
    const [endDate, setEnd] = useState('');
    const [id, setId] = useState('');
    const [filled, setFilled] = useState(false);

    // Get history to go back
    const history = useHistory();

    // Get data from database to set custom ID
    useEffect(() => {
        const retreatsRef = firestore.collection('Retreats');
        retreatsRef.get().then((snapshot) => {
            const retreats = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const count = retreats.length;
            const id = "R" + (count + 1);
            setId(id);
        });
    }, []);

    // Function to save new retreat information
    const saveRetreat = async () => {
        try {
            if (type === '' || location === '' || startDate === '' || endDate === '') {
                setFilled(true);
                return;
            }
            const retreatsRef = firestore.collection('Retreats');
            let ans = window.confirm("Are you sure you want to save this retreat?");
            if (ans) {
                const retreatData = { type, location, startDate, endDate };
                await retreatsRef.doc(id).set(retreatData);
                history.goBack();
            }
        } catch (error) {
            setFilled(true);
        }
        
    }

    // Function to clear form
    const clearForm = () => {
        setType('');
        setLocation('');
        setStart('');
        setEnd('');

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
                            <IonTitle>Input New Retreat Information</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Retreat Type:</IonLabel>
                                <IonInput value={type} required={true}
                                    onIonChange={(event) => setType(event.detail.value)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Retreat Location:</IonLabel>
                                <IonInput value={location} required={true}
                                    onIonChange={(event) => setLocation(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Start Date:</IonLabel>
                                <IonInput value={startDate} required={true}
                                    onIonChange={(event) => setStart(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">End Date:</IonLabel>
                                <IonInput value={endDate} required={true}
                                    onIonChange={(event) => setEnd(event.detail.value)}/>
                            </IonItem>

                            {filled &&
                                <IonText color="danger">
                                    Please enter all fields.
                                </IonText>
                            }
                            <IonButton expand="block" onClick={saveRetreat}>
                            <IonIcon icon={retreat} slot="start"></IonIcon>Save Retreat</IonButton><br/>

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

export default InputRetreats;