// Ionic imports
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSplitPane, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList } from '@ionic/react';

// Component imports
import Footer from '../components/Footer';
import Menu from '../components/Menu';

// CSS import
import '../pages/Home.css';

const Evaluations: React.FC = () => {

    // English link to evaluation form
    const evalLink = "https://docs.google.com/forms/d/e/1FAIpQLSeCWfccSFabKNcmQ4aD9P84XZw9xgcDLaOz46iXqqtGFAnIsw/viewform";

    // Spanish link to evaluation form
    const spanishEvalLink = "https://docs.google.com/forms/d/e/1FAIpQLSdIzjTXcorD6MIP0KANMpB7RqrxTjajEjfjZXJtRp_ZCiosfQ/viewform";

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
                            <IonTitle>Evaluations</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonList>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>English</IonLabel>
                                </IonItemDivider>
                                <IonItem button href={evalLink} target="blank">
                                    Annual Church Planter Evaluation
                                </IonItem>
                            </IonItemGroup><br/><br/>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Español</IonLabel>
                                </IonItemDivider>
                                <IonItem button href={spanishEvalLink} target="blank">
                                    Evaluación Anual del Plantador de Iglesias
                                </IonItem>
                            </IonItemGroup><br/><br/>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Mission Points</IonLabel>
                                </IonItemDivider>
                                <IonItem button href='/MissionPoints'>
                                    Mission Point Information
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

export default Evaluations;