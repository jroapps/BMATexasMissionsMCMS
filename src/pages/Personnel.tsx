// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList } from '@ionic/react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const Personnel: React.FC = () => {

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
                            <IonTitle>Personnel</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonList>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Missionaries</IonLabel>
                                </IonItemDivider>
                                <IonItem button href='/MissionaryPersonnel'>
                                    Missionary Personnel Contact List
                                </IonItem>
                            </IonItemGroup><br/><br/>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Directors</IonLabel>
                                </IonItemDivider>
                                <IonItem button href='/DirectorPersonnel'>
                                    Director Personnel Contact List
                                </IonItem>
                            </IonItemGroup><br/><br/>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Coaches</IonLabel>
                                </IonItemDivider>
                                <IonItem button href='/CoachPersonnel'>
                                    Coach Personnel Contact List
                                </IonItem>
                                <IonItem button href='/CoachContract'>
                                    Enter Into New Coaching Contract
                                </IonItem>
                            </IonItemGroup><br/><br/>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Staff</IonLabel>
                                </IonItemDivider>
                                <IonItem button href='/StaffPersonnel'>
                                    Staff Personnel Contact List
                                </IonItem>
                            </IonItemGroup>
                        </IonList>
                    </IonContent>
                    <Footer />
                </IonPage>
            </IonSplitPane>
        </IonContent>
        
    );
};

export default Personnel;