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

const ManageTrainingRegistrations: React.FC = () => {

    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [id, setId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [validDelete, setValidDelete] = useState(false);
    const [validId, setValidId] = useState(false);
    const [filled, setFilled] = useState(false);

    // Get data from database
    useEffect(() => {
        const registrationsRef = firestore.collection('TrainingRegistrations');
        registrationsRef.get().then((snapshot) => {
            const registrations = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (registrations.length % 2 > 0) {
                var mid = (registrations.length / 2) + 1;
            } else {
                mid = registrations.length / 2;
            }
            // split into two columns
            const first = registrations.slice(0, mid);
            const second = registrations.slice(mid, registrations.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Function to delete registration
    const deleteRegistration = async () => {
        try {
            const registrationsRef = firestore.collection('TrainingRegistrations').doc(deleteId);
            let ans = window.confirm("Are you sure you want to delete the training registration?");
            if (ans) {
                await registrationsRef.delete();
                window.location.reload();
            }
        } catch (error) {
            setValidDelete(true);
        }
    }

    // Function to update registration
    const updateRegistration = async () => {
        try {
            if (id === '' || name === '' || email === '' || phoneNumber === '') {
                setFilled(true);
                return;
            }
            const registrationsRef = firestore.collection('TrainingRegistrations').doc(id);
            let ans = window.confirm("Are you sure you want to update this training registration?");
            if (ans) {
                setFilled(false);
                const registrationData = { id, name, email, phoneNumber };
                await registrationsRef.update(registrationData);
                window.location.reload();
            }
        } catch (error) {
            setValidId(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setId('');
        setDeleteId('');
        setName('');
        setEmail('');
        setPhone('');

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
                            <IonTitle>Manage Training Registrations</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {first.map((firstHalf) =>
                                        <IonItem key={firstHalf.id}><br/>
                                            Registration ID: {firstHalf.id}<br/><br/>
                                            Registered Event ID: {firstHalf.trainingId}<br/><br/>
                                            Registrant Name: {firstHalf.name}<br/>
                                            Registrant Email: {firstHalf.email}<br/>
                                            Registrant Phone: {firstHalf.phoneNumber}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>
                                    <IonList className="ion-padding">
                                        {second.map((secondHalf) =>
                                        <IonItem key={secondHalf.id}><br/>
                                            Registration ID: {secondHalf.id}<br/><br/>
                                            Registered Event ID: {secondHalf.trainingId}<br/><br/>
                                            Registrant Name: {secondHalf.name}<br/>
                                            Registrant Email: {secondHalf.email}<br/>
                                            Registrant Phone: {secondHalf.phoneNumber}<br/><br/>
                                        </IonItem>)}
                                    </IonList>
                                </IonCol>
                                <IonCol>                                    
                                    <IonTitle className="ion-title">Update Registration</IonTitle>
                                    <IonText color="danger" className="ion-text-update">
                                        <h6>Please enter all fields!</h6>
                                    </IonText>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Registration to Update:</IonLabel>
                                            <IonInput value={id} required={true}
                                                onIonChange={(event) => setId(event.detail.value)} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Registrant Name:</IonLabel>
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
                                        {validId &&
                                            <IonText color="danger">
                                                Incorrect ID! Please try again.
                                            </IonText>
                                        }
                                        <IonButton expand="block" onClick={updateRegistration}>
                                        <IonIcon icon={update} slot="start"></IonIcon>Update Registration</IonButton><br/>

                                        <IonButton color="medium" expand="block" onClick={clearForm}>
                                            <IonIcon icon={clear} slot="start"></IonIcon>Clear Form</IonButton><br/><br/>
                                    </IonList>
                                    <div className="hr"></div>

                                    <IonList>
                                        <IonTitle className="ion-title">Delete Registration</IonTitle>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Registration to Delete:</IonLabel>
                                            <IonInput value={deleteId}
                                                onIonChange={(event) => setDeleteId(event.detail.value)} />
                                        </IonItem>
                                    </IonList>
                                    {validDelete &&
                                        <IonText color="danger">
                                            Please enter a valid ID! Please try again.
                                        </IonText>
                                    }
                                    <IonButton expand="block" onClick={deleteRegistration}>
                                    <IonIcon icon={trash} slot="start"></IonIcon>Delete Registration</IonButton><br/>
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

export default ManageTrainingRegistrations;
