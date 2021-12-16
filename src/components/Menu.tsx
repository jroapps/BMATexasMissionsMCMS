// Ionic imports
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToolbar, } from '@ionic/react';

import { Redirect, useLocation } from 'react-router-dom';

// Icon imports
import { peopleCircleOutline, peopleCircleSharp, statsChartOutline, statsChartSharp, appsOutline, appsSharp, bedOutline, bedSharp, barbellOutline, barbellSharp, exit } from 'ionicons/icons';

// Component imports
import '../pages/Home.css';
import { auth } from './firebase';
import { useAuth } from './auth';

// Image import
import logo from '../images/logo.png';

// Interface for pages
interface AppPages {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}
  
// AppPages array
const appPages: AppPages[] = [
    {
      title: 'Main Menu',
      url: '/Main',
      iosIcon: appsOutline,
      mdIcon: appsSharp
    },
    {
      title: 'Retreats',
      url: '/Retreats',
      iosIcon: bedOutline,
      mdIcon: bedSharp
    },
    {
        title: 'Trainings',
        url: '/Trainings',
        iosIcon: barbellOutline,
        mdIcon: barbellSharp
      },
    {
      title: 'Evaluations',
      url: '/Evaluations',
      iosIcon: statsChartOutline,
      mdIcon: statsChartSharp
    },
    {
      title: 'Personnel',
      url: '/Personnel',
      iosIcon: peopleCircleOutline,
      mdIcon: peopleCircleSharp
    }
  ];
  
const Menu: React.FC = () => {
    const location = useLocation();

    // Authentication
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Redirect to="/Home" />;
    }
  
    return (
        <IonMenu contentId="main" type="overlay">
            <IonHeader>
                <IonToolbar color="primary"></IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList id="menu-list">
                    <IonImg src={logo} />
                    <IonListHeader>Missionary Care Management System</IonListHeader>
                    <IonNote className="ion-padding">bmatexasmissions.org</IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} href={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
                <IonButton className="bottomButton mymargin" color="danger" expand="block" onClick={() => auth.signOut()}>
                    <IonIcon icon={exit} slot="start"></IonIcon>Logout
                </IonButton>
                <IonFooter>
                    <IonToolbar className="bottom" color="primary">
                    </IonToolbar>
                </IonFooter>
            </IonContent>
        </IonMenu>
    );
};
  
export default Menu;