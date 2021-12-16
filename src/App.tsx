// Ionic & React imports
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthContext, useAuthInit } from './components/auth';

// CSS import
import './pages/Home.css';

// Page Imports
import Home from './pages/Home';
import Main from './pages/Main';
import Evaluations from './pages/Evaluations';
import Personnel from './pages/Personnel';
import Retreats from './pages/Retreats';
import Trainings from './pages/Trainings';
import ViewRetreats from './pages/ViewRetreats';
import RegisterRetreats from './pages/RegisterRetreats';
import InputRetreats from './pages/InputRetreats';
import EditRetreats from './pages/EditRetreats'; 
import ManageRetreatRegistrations from './pages/ManageRetreatRegistrations';
import RetreatPhotos from './pages/RetreatPhotos';
import EditTrainings from './pages/EditTrainings';
import InputTrainings from './pages/InputTrainings';
import ManageTrainingRegistrations from './pages/ManageTrainingRegistrations';
import RegisterTrainings from './pages/RegisterTrainings';
import TrainingsPhotos from './pages/TrainingsPhotos';
import ViewTrainings from './pages/ViewTrainings';
import CoachPersonnel from './pages/CoachPersonnel';
import DirectorPersonnel from './pages/DirectorPersonnel';
import MissionaryPersonnel from './pages/MissionaryPersonnel';
import StaffPersonnel from './pages/StaffPersonnel';
import MissionPoints from './pages/MissionPoints';
import CoachContract from './pages/CoachContract';

const App: React.FC = () => {

    // Authentication
    const { loading, auth } = useAuthInit();

    // Check for loading and display spinner
    if (loading) {
        return <IonLoading isOpen />;
    }

    // Main app routes
    return (
        <IonApp>
            <AuthContext.Provider value={auth!}>
                <IonReactRouter>
                    <IonRouterOutlet id="main">
                        <Route exact path="/Main">
                            <Main />
                        </Route>
                        <Route exact path="/Retreats">
                            <Retreats />
                        </Route>
                        <Route exact path="/Evaluations">
                            <Evaluations />
                        </Route>
                        <Route exact path="/Personnel">
                            <Personnel />
                        </Route>
                        <Route exact path="/Trainings">
                            <Trainings />
                        </Route>
                        <Route exact path="/Home">
                            <Home />
                        </Route>
                        <Route exact path="/ViewRetreats">
                            <ViewRetreats />
                        </Route>
                        <Route exact path="/RegisterRetreats">
                            <RegisterRetreats />
                        </Route>
                        <Route exact path="/InputRetreats">
                            <InputRetreats />
                        </Route>
                        <Route exact path="/EditRetreats">
                            <EditRetreats />
                        </Route>
                        <Route exact path="/ManageRetreatRegistrations">
                            <ManageRetreatRegistrations />
                        </Route>
                        <Route exact path="/RetreatPhotos">
                            <RetreatPhotos />
                        </Route>
                        <Route exact path="/ViewTrainings">
                            <ViewTrainings />
                        </Route>
                        <Route exact path="/RegisterTrainings">
                            <RegisterTrainings />
                        </Route>
                        <Route exact path="/InputTrainings">
                            <InputTrainings />
                        </Route>
                        <Route exact path="/EditTrainings">
                            <EditTrainings />
                        </Route>
                        <Route exact path="/ManageTrainingRegistrations">
                            <ManageTrainingRegistrations />
                        </Route>
                        <Route exact path="/TrainingsPhotos">
                            <TrainingsPhotos />
                        </Route>
                        <Route exact path="/MissionaryPersonnel">
                            <MissionaryPersonnel />
                        </Route>
                        <Route exact path="/DirectorPersonnel">
                            <DirectorPersonnel />
                        </Route>
                        <Route exact path="/CoachPersonnel">
                            <CoachPersonnel />
                        </Route>
                        <Route exact path="/StaffPersonnel">
                            <StaffPersonnel />
                        </Route>
                        <Route exact path="/MissionPoints">
                            <MissionPoints />
                        </Route>
                        <Route exact path="/CoachContract">
                            <CoachContract />
                        </Route>
                        <Redirect from="/" to="/Home" exact />
                    </IonRouterOutlet>
                </IonReactRouter>
            </AuthContext.Provider>
        </IonApp>
    );
}

export default App;
