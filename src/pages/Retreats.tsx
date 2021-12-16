// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText } from '@ionic/react';
import { useState } from 'react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// Firebase import
import { auth } from '../components/firebase';

// CSS import
import '../pages/Main.css';

const Retreats: React.FC = () => {

    // State variables
    const [authorizedEdit, setAuthorizedEdit] = useState(false);
    const [authorizedInput, setAuthorizedInput] = useState(false);
    const [authorizedManage, setAuthorizedManage] = useState(false);

    // Function to check if user can access the manage retreats page
    const checkUserForEdit = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedEdit(false);
            window.location.href = "/EditRetreats"
        } else {
            setAuthorizedEdit(true);
        }
    }

    // Function to check if user can access the manage registrations page
    const checkUserForManage = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedManage(false);
            window.location.href = "/ManageRetreatRegistrations"
        } else {
            setAuthorizedManage(true);
        }
    }

    // Function to check if user can access the input page
    const checkUserForInput = () => {
        const user = auth.currentUser;
        if (user.uid === "cWYT8OQRkkhXv84NhXBuoEMzR6B2") {
            setAuthorizedInput(false);
            window.location.href = "/InputRetreats"
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
                            <IonTitle>Retreats</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonCard color="dark" href="/ViewRetreats">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">View Retreats</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to view all current retreat information.
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForInput}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Input New Retreats</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to input new retreats. <br/><br/>(Directors only!)
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
                                    <IonCard color="dark" button href="/RegisterRetreats">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Register for Retreats</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to register for upcoming retreats.
                                        </IonCardContent>
                                    </IonCard>        
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForEdit}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Manage Retreats</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to update or delete current retreats. <br/><br/>(Directors only!)
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
                                    <IonCard button color="dark" href="/RetreatPhotos">
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">View & Upload Retreat Photos</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to view photos from past retreats and upload new ones!
                                        </IonCardContent>
                                    </IonCard> 
                                </IonCol>
                                <IonCol>
                                    <IonCard button color="dark" onClick={checkUserForManage}>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Manage Retreat Registrations</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text" color="dark">
                                            Click here to manage current retreat registrations. <br/><br/>(Directors only!)
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

export default Retreats;