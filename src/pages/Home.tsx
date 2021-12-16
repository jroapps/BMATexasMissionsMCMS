// Ionic imports
import { IonButton, IonCol, IonContent, IonIcon, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, IonText, IonLoading } from '@ionic/react';

// Component imports
import Footer from '../components/Footer';
import logo from '../images/logo.png';
import { useState } from 'react';
import { useAuth } from '../components/auth';
import { Redirect } from 'react-router';

// Firebase imports
import { auth } from '../components/firebase';

// CSS & icon import
import './Home.css';
import { enter } from 'ionicons/icons';

const Home: React.FC = () => {   

    // Login authentication
    const { loggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false});

    // Function to login credentialed user
    const login = async () => {
        try {
            setStatus({loading: true, error: false});
            const credential = await auth.signInWithEmailAndPassword(email, password);
            console.log('credential:', credential);
        } catch (error) {
            setStatus({loading: false, error: true});
            console.log('error:', error);
        }  
    } 

    // Check for logged in to redirect to main page
    if (loggedIn) {
        return <Redirect to="/Main" />;
    }

    // Main page content
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center">Missionary Care Management System</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol size="7">
                            <IonImg src={logo}></IonImg>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol size="8">
                            <IonList lines="full" className="ion-no-margin">
                                <IonListHeader lines="full">
                                    <IonLabel position="fixed"></IonLabel>
                                </IonListHeader>
                                <IonItem>
                                    <IonLabel>Email address:</IonLabel>
                                    <IonInput required={true}  placeholder="Email address" type="email" value={email} onIonChange={(event) => setEmail(event.detail.value!)}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Password</IonLabel>
                                    <IonInput required={true} placeholder="Password" type="password" value={password} onIonChange={(event) => setPassword(event.detail.value!)}></IonInput>
                                </IonItem>
                            </IonList>
                            {status.error &&
                                <IonText color="danger">Invalid Credentials! Check email or password.</IonText>
                            }
                            <IonButton expand="block" onClick={login}>
                                <IonIcon icon={enter} slot="start"></IonIcon>Enter System
                            </IonButton>
                            <IonLoading isOpen={status.loading} />
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <Footer />
            
        </IonPage>
    );
};

export default Home;
