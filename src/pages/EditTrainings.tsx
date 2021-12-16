// Ionic & React imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonList, IonItem, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton, IonIcon, IonText, IonBackButton } from '@ionic/react';
import { useEffect, useState } from 'react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { firestore } from '../components/firebase';

// CSS & icon imports
import '../pages/Main.css';
import { trash, cloudUpload as update, sync as clear } from 'ionicons/icons';

const EditTrainings: React.FC = () => {

    // State variables
    const [topic, setTopic] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [leader, setLeader] = useState('');
    const [cost, setCost] = useState('');
    const [id, setId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [validDelete, setValidDelete] = useState(false);
    const [validId, setValidId] = useState(false);
    const [filled, setFilled] = useState(false);

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
            // split into two columns
            const first = trainings.slice(0, mid);
            const second = trainings.slice(mid, trainings.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Function to delete training event
    const deleteTraining = async () => {
        try {
            const trainingsRef = firestore.collection('Trainings').doc(deleteId);
            let ans = window.confirm("Are you sure you want to delete the training?");
            if (ans) {
                await trainingsRef.delete();
                window.location.reload();
            }
        } catch (error) {
            setValidDelete(true);
        }
    }

    // Function to update training event
    const updateTraining = async () => {
        try {
            if (id === '' || topic === '' || location === '' || date === '' || time === '' || leader === '' || cost === '') {
                setFilled(true);
                return;
            }
            const trainingsRef = firestore.collection('Trainings').doc(id);
            let ans = window.confirm("Are you sure you want to update this training event?");
            if (ans) {
                setFilled(false);
                const trainingsData = { id, topic, location, date, time, leader, cost };
                await trainingsRef.update(trainingsData);
                window.location.reload();
            }
        } catch (error) {
            setValidId(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setId('');
        setTopic('');
        setLocation('');
        setDate('');
        setTime('');
        setCost('');
        setLeader('');
        setDeleteId('');

        // Resetting boolean checks
        setValidDelete(false);
        setValidId(false);
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
                                <IonBackButton color="danger" />
                            </IonButtons>
                            <IonTitle>Manage Training Events</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Event ID: {firstHalf.id}<br/><br/>
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
                                            Event ID: {secondHalf.id}<br/><br/>
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
                                    <IonTitle className="ion-title">Update Retreat</IonTitle>
                                    <IonText color="danger" className="ion-text-update">
                                        <h6>Please enter all fields!</h6>
                                    </IonText>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Training Event to Update:</IonLabel>
                                            <IonInput value={id} required={true}
                                                onIonChange={(event) => setId(event.detail.value)} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Topic:</IonLabel>
                                            <IonInput value={topic} required={true} autocapitalize="words"
                                                onIonChange={(event) => setTopic(event.detail.value)} />
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
                                            <IonInput value={location} required={true} autocapitalize="words"
                                                onIonChange={(event) => setLocation(event.detail.value)}/>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Cost:</IonLabel>
                                            <IonInput value={cost} required={true} autocapitalize="words"
                                                onIonChange={(event) => setCost(event.detail.value)}/>
                                        </IonItem>
                                        {validId &&
                                            <IonText color="danger">
                                                Incorrect ID! Please try again.
                                            </IonText>
                                        }

                                        {filled &&
                                            <IonText color="danger">
                                                Please enter all fields.
                                            </IonText>
                                        }
                                        <IonButton expand="block" onClick={updateTraining}>
                                        <IonIcon icon={update} slot="start"></IonIcon>Update Training Event</IonButton><br/>

                                        <IonButton color="medium" expand="block" onClick={clearForm}>
                                            <IonIcon icon={clear} slot="start"></IonIcon>Clear Form</IonButton><br/><br/>
                                    </IonList>
                                    <div className="hr"></div>

                                    <IonList>
                                        <IonTitle className="ion-title">Delete Training Event</IonTitle>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Training Event to Delete:</IonLabel>
                                            <IonInput value={deleteId}
                                                onIonChange={(event) => setDeleteId(event.detail.value)} />
                                        </IonItem>
                                    </IonList>
                                    {validDelete &&
                                        <IonText color="danger">
                                            Please enter a valid ID! Please try again.
                                        </IonText>
                                    }
                                    <IonButton expand="block" onClick={deleteTraining}>
                                    <IonIcon icon={trash} slot="start"></IonIcon>Delete Training Event</IonButton><br/>
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

export default EditTrainings;
