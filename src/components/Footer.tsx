// Ionic imports
import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";

// Get year dynamically
const year = () => {
    var date = new Date().getFullYear();
    return date;
}

const Footer: React.FC = () => {
    return (
        <IonFooter>
            <IonToolbar color="primary">
                <IonTitle className="ion-text-center">&copy; {year()} BMA Texas Missions | All Rights Reserved</IonTitle>
            </IonToolbar>
        </IonFooter>
    )
}

export default Footer;