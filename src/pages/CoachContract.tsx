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
import { personAdd as coach, sync as clear } from 'ionicons/icons';

const CoachContract: React.FC = () => {

    // State variables
    const [planterName, setPlanterName] = useState('');
    const [coachName, setCoachName] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');
    const [filled, setFilled] = useState(false);

    // Get history to go back
    const history = useHistory();

    // Get data from database to set custom ID
    useEffect(() => {
        const coachRef = firestore.collection('CoachContract');
        coachRef.get().then((snapshot) => {
            const coach = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const count = coach.length;
            const id = "CC" + (count + 1);
            setId(id);
        });
    }, []);

    // Function to save new coaching contract information
    const saveCoach = async () => {
        try {
            if (planterName === '' || coachName === '' || date === '') {
                setFilled(true);
                return;
            }
            const coachRef = firestore.collection('CoachContract');
            let ans = window.confirm("Are you sure you want to enter into this coaching contract?");
            if (ans) {
                const coachData = { planterName, coachName, date };
                await coachRef.doc(id).set(coachData);
                history.goBack();
            }
        } catch (error) {
            setFilled(true);
        }
        
    }

    // Function to clear form
    const clearForm = () => {
        setPlanterName('');
        setCoachName('');
        setDate('');

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
                            <IonTitle>Enter New Coaching Contract</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonText>
                            <h4>Coaches will assist church planters within the BMA of Texas to maintain balance, establish priorities, set goals, and follow their plan and timeline. As a planter works toward their goals, the coach will hold them accountable, assist them in monitoring their progress, and encourage them to move forward on their timeline.</h4>
                            <ul>
                                <li>Coaches will be provided with the planter's vision, plan, and timeline and any other goals they are working towards. The coach will ask questions that point the planter toward their vision and the steps between here and there</li><br/>
                                <li>Coaches will also provide accountability as to the health of the planter. (Physical health, spiritual health, marriage health, family health, financial health, emotional health)</li><br/>
                                <li>Coaches will visit with the planter once a month for an adequate length of time. (Set aside at least 1 hour) This visit can be in person, by phone call, over Skype, Facetime, Megameeting or the like. Facebook, email, or texting are not acceptable for a coaching visit. Coach is to be available for a second visit, if needed.</li><br/>
                                <li>Coaches should visit the planter's location at least once a year, so they have an understanding of the planter's environment.</li><br/>
                                <li>Coaches should keep the director informed of any potential problems or concerns about the existing coaching relationship. This relationship exists month to month and any party can end it with the consent of the director.</li><br/>
                                <li>Coaches are responsible to turn in a monthly coaching report to the Missions department. Coaches won't be compensated until these forms are returned.</li><br/>
                            </ul>
                        </IonText>
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Planter Name:</IonLabel>
                                <IonInput value={planterName} required={true}
                                    onIonChange={(event) => setPlanterName(event.detail.value)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Coach Name:</IonLabel>
                                <IonInput value={coachName} required={true}
                                    onIonChange={(event) => setCoachName(event.detail.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Date:</IonLabel>
                                <IonInput value={date} required={true}
                                    onIonChange={(event) => setDate(event.detail.value)}/>
                            </IonItem>

                            {filled &&
                                <IonText color="danger">
                                    Please enter all fields.
                                </IonText>
                            }
                            <IonButton expand="block" onClick={saveCoach}>
                            <IonIcon icon={coach} slot="start"></IonIcon>Enter Contract</IonButton><br/>

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

export default CoachContract;