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

const EditRetreats: React.FC = () => {

    // State variables
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStart] = useState('');
    const [endDate, setEnd] = useState('');
    const [id, setId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [validDelete, setValidDelete] = useState(false);
    const [validId, setValidId] = useState(false);
    const [filled, setFilled] = useState(false);

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
            // split into two columns
            const first = retreats.slice(0, mid);
            const second = retreats.slice(mid, retreats.length);
            setFirst(first);
            setSecond(second);
        });
    }, []);

    // Function to delete retreat
    const deleteRetreat = async () => {
        try {
            const retreatsRef = firestore.collection('Retreats').doc(deleteId);
            let ans = window.confirm("Are you sure you want to delete the retreat?");
            if (ans) {
                await retreatsRef.delete();
                window.location.reload();
            }
        } catch (error) {
            setValidDelete(true);
        }
    }

    // Function to update retreat
    const updateRetreat = async () => {
        try {
            if (id === '' || type === '' || location === '' || startDate === '' || endDate === '') {
                setFilled(true);
                return;
            }
            const retreatsRef = firestore.collection('Retreats').doc(id);
            let ans = window.confirm("Are you sure you want to update this retreat?");
            if (ans) {
                setFilled(false);
                const retreatsData = { id, type, location, startDate, endDate };
                await retreatsRef.update(retreatsData);
                window.location.reload();
            }
        } catch (error) {
            setValidId(true);
        }
    }

    // Function to clear form
    const clearForm = () => {
        setId('');
        setType('');
        setLocation('');
        setStart('');
        setEnd('');
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
                            <IonTitle>Manage Retreats</IonTitle>
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
                                    <IonTitle className="ion-title">Update Retreat</IonTitle>
                                    <IonText color="danger" className="ion-text-update">
                                        <h6>Please enter all fields!</h6>
                                    </IonText>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Retreat to Update:</IonLabel>
                                            <IonInput value={id} required={true}
                                                onIonChange={(event) => setId(event.detail.value)} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Retreat Type:</IonLabel>
                                            <IonInput value={type} required={true} autocapitalize="words"
                                                onIonChange={(event) => setType(event.detail.value)} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Retreat Location:</IonLabel>
                                            <IonInput value={location} required={true} autocapitalize="words"
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
                                        <IonButton expand="block" onClick={updateRetreat}>
                                        <IonIcon icon={update} slot="start"></IonIcon>Update Retreat</IonButton><br/>

                                        <IonButton color="medium" expand="block" onClick={clearForm}>
                                            <IonIcon icon={clear} slot="start"></IonIcon>Clear Form</IonButton><br/><br/>
                                    </IonList>
                                    <div className="hr"></div>

                                    <IonList>
                                        <IonTitle className="ion-title">Delete Retreat</IonTitle>
                                        <IonItem>
                                            <IonLabel position="floating">ID of Retreat to Delete:</IonLabel>
                                            <IonInput value={deleteId}
                                                onIonChange={(event) => setDeleteId(event.detail.value)} />
                                        </IonItem>
                                    </IonList>
                                    {validDelete &&
                                        <IonText color="danger">
                                            Please enter a valid ID! Please try again.
                                        </IonText>
                                    }
                                    <IonButton expand="block" onClick={deleteRetreat}>
                                    <IonIcon icon={trash} slot="start"></IonIcon>Delete Retreat</IonButton><br/>
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

export default EditRetreats;
