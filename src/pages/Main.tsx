// Ionic imports
import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// CSS import
import '../pages/Home.css';


const Main: React.FC = () => {
    return ( 

        /* Main Content */
        <IonContent>
            <IonSplitPane contentId="main" when="sm">
                <Menu /> 
                <IonPage id="main">
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>Missionary Care Management System Main Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonCard color="dark" href='/Retreats'>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Retreat Management</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text">
                                            View upcoming retreats. Register for upcoming retreats. View past retreat information and photos. Input new retreat information. Manage currently scheduled retreats. Manage retreat registrations.
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard color="dark" href='/Evaluations'>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Evaluation Management</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text">
                                            Missionaries can enter their annual evaluation data in both English and Spanish. Mission points can be viewed along with pertinent location and contact information.<br/><br/>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonCard color="dark" href='/Trainings'>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Trainings Management</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text">
                                            Search for and view upcoming training events. Register for upcoming trainings. View past training information. View all training material and remove or add new material. Input new training information.
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard color="dark" href='/Personnel'>
                                        <IonCardHeader color="primary">
                                            <IonCardTitle className="ion-text-center ion-card-title-white">Personnel Management</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="ion-card-text">
                                            Update personal information such as address, phone number, or email address. Submit any new hire or updated payroll information. Search missionary, coach, and staff contact information.
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>

                    {/* Footer component */}
                    <Footer />
                </IonPage>
            </IonSplitPane>
        </IonContent> 
    );
};

export default Main;
