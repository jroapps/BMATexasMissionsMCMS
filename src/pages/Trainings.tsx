// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { auth } from '../components/firebase';

// CSS import
import '../pages/Main.css';
import { useState } from 'react';

const Trainings: React.FC = () => {
    
    // State variables
    const [authorizedEdit, setAuthorizedEdit] = useState(false);
    const [authorizedInput, setAuthorizedInput] = useState(false);
    const [authorizedManage, setAuthorizedManage] = useState(false);

    // Function to check if user can access the manage trainings page
    const checkUserForEdit = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedEdit(false);
            window.location.href = "/EditTrainings"
        } else {
            setAuthorizedEdit(true);
        }
    }

    // Function to check if user can access the manage training registrations page
    const checkUserForManage = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedManage(false);
            window.location.href = "/ManageTrainingRegistrations"
        } else {
            setAuthorizedManage(true);
        }
    }

    // Function to check if user can access the input page
    const checkUserForInput = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedInput(false);
            window.location.href = "/InputTrainings"
        } else {
            setAuthorizedInput(true);
        }
    }

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
                            <IonTitle>Trainings</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonCard color="dark" href="/ViewTrainings">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">View Trainings</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to view all current training information.
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForInput}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Input New Trainings</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to input new trainings. <br/><br/>(Directors only!)
                                        </IonCardContent>
                                    </IonCard>
                                    {authorizedInput &&
                                        <IonText color="danger">
                                            You are not authorized to access this page!
                                        </IonText>
                                    }
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonCard color="dark" button href="/RegisterTrainings">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Register for Training Events</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to register for upcoming training events.
                                        </IonCardContent>
                                    </IonCard>        
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForEdit}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Manage Trainings</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to update or delete current trainings. <br/><br/>(Directors only!)
                                        </IonCardContent>
                                    </IonCard>
                                    {authorizedEdit &&
                                        <IonText color="danger">
                                            You are not authorized to access this page!
                                        </IonText>
                                    } 
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonCard button color="dark" href="/TrainingsPhotos">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">View & Upload Training Photos</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to view photos from past trainings and upload new ones!
                                        </IonCardContent>
                                    </IonCard> 
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForManage}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Manage Training Event Registrations</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to manage current training event registrations. <br/><br/>(Directors only!)
                                        </IonCardContent>
                                    </IonCard>
                                    {authorizedManage &&
                                        <IonText color="danger">
                                            You are not authorized to access this page!
                                        </IonText>
                                    }
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

export default Trainings;