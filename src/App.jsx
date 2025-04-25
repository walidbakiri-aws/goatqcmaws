import AddYear from "./pages/AddYear";
import AddModule from "./pages/AddModule";
import { Routes, Route } from "react-router-dom";
import AddCours from "./pages/AddCours";
import AddQcm from "./pages/AddQcm";
import Home from "./pages/Home";
import NavigationBar from "./compenent/layout/NavigationBar";
import BtnAdd from "./compenent/layout/BtnAdd";
import BtnDeleteEditQcm from "./compenent/layout/BtnDeleteEditQcm";
import ChoseQcmCasClinique from "./pages/ChoseQcmCasClinique";
import AddCasClinique from "./pages/AddCasClinique";
import Quiz from "./pages/Quiz";
import QuizBoard from "./pages/QuizBoard";
import QuizDashboard from "./pages/QuizDashboard";
import Modal from "./pages/Modal";
import EditeQcmStandard from "./pages/EditeQcmStandard";
import EditeCasCliniqueQcmClinique from "./pages/EditeCasCliniqueQcmClinique";
import LoginPage from "./compenent/layout/auth/LoginPage";
import ProfilePage from "./compenent/layout/userspages/ProfilePage";
import ProfileSpecUser from "./compenent/layout/userspages/ProfileSpecUser";
import RegistrationPage from "./compenent/layout/auth/RegistrationPage";
import UserManagementPage from "./compenent/layout/userspages/UserManagementPage";
import EditUser from "./compenent/layout/userspages/EditUser";
import classes from "./App.module.css";
import { Navigate } from "react-router-dom";
import UserService from "./compenent/layout/service/UserService";
import UserAbounement from "./pages/UserAbounement";
import GoatQcm from "./pages/GoatQcm";
import ShowMyAbonnement from "./pages/ShowMyAbonnement";
import GoatWelcome from "./compenent/layout/auth/GoatWelcome";
import SaveQuizz from "./pages/SaveQuizz";
import ShowPdfResidanat from "./pages/ShowPdfResidanat";
import DriversCours from "./pages/DriversCours";
import DriversYearsLinks from "./pages/DriversYearsLinks";
import SaveSession from "./pages/SaveSession";
import DriveSwitchModule from "./pages/DriveSwitchModule";
import AddDriveInfo from "./pages/AddDriveInfo";
import DriveModuleListe from "./pages/DriveModuleListe";
import DriveCoursNames from "./pages/DriveCoursNames";
function App() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isParticipateAdmin = UserService.isParticipateAdmin();
  const isAdminOnly = UserService.adminOnly();
  const isParcitipate = UserService.isParticipate();
  const isUser = UserService.isUser();

  return (
    <div>
      <Routes>
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/showpdf" element={<ShowPdfResidanat />}></Route>
        <Route exact path="/driverscours" element={<DriversCours />}></Route>
        <Route
          exact
          path="/driverslinks"
          element={<DriversYearsLinks />}
        ></Route>
        {isAuthenticated && (
          <Route exact path="/profile" element={<ProfilePage />} />
        )}
        {isAdmin && isAuthenticated && (
          <Route
            exact
            path="/admin/get-users/:userId"
            element={<ProfileSpecUser />}
          />
        )}
        <Route exact path="/register" element={<RegistrationPage />} />
        {isAdmin && isAuthenticated && (
          <Route
            exact
            path="/admin/user-management"
            element={<UserManagementPage />}
          ></Route>
        )}
        {isAdmin && isAuthenticated && (
          <Route
            exact
            path="/admin/abonner-management"
            element={<UserAbounementManager />}
          ></Route>
        )}
        {isAdmin && isAuthenticated && (
          <Route
            exact
            path="/admin/update-user/:userId"
            element={<EditUser />}
          ></Route>
        )}
        {isAdmin && isAuthenticated && (
          <Route
            exact
            path="/admin/allabounement"
            element={<UserAbounement />}
          ></Route>
        )}
        {isAuthenticated && (
          <Route exact path="/home" element={<Home />}></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/goatqcm"
            element={<ProtectedRoute component={GoatQcm} />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route exact path="/savesession" element={<SaveSession />}></Route>
        )}{" "}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/switchdrive"
            element={<DriveSwitchModule />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route exact path="/adddrivelinks" element={<AddDriveInfo />}></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/drivemoduleliste"
            element={<DriveModuleListe />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/drivecoursnames"
            element={<DriveCoursNames />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/myabonnement"
            element={<ShowMyAbonnement />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route exact path="/quiz" element={<Quiz />}></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route exact path="/quizz" element={<SaveQuizz />}></Route>
        )}
        {isAdmin && isAuthenticated && (
          <Route exact path="/medicalyear" element={<AddYear />}></Route>
        )}
        {isAdmin && (
          <Route exact path="/module" element={<AddModule />}></Route>
        )}
        {(isAdmin || isParcitipate) && isAuthenticated && (
          <Route exact path="/cours" element={<AddCours />}></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/quiz/quizdashboard"
            element={<QuizDashboard />}
          ></Route>
        )}
        {(isAdmin || isParcitipate) && isAuthenticated && (
          <Route
            exact
            path="/cours/:cours_id"
            element={<ChoseQcmCasClinique />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/cours/:cours_id/qcms"
            element={<ChoseQcmCasClinique />}
          ></Route>
        )}
        {(isAdmin || isParcitipate || isUser) && isAuthenticated && (
          <Route
            exact
            path="/cours/:cours_id/casclinique"
            element={<ChoseQcmCasClinique />}
          ></Route>
        )}
        {isParticipateAdmin && isAuthenticated && (
          <Route exact path="/editeqcm" element={<EditeQcmStandard />}></Route>
        )}
        {isParticipateAdmin && isAuthenticated && (
          <Route
            exact
            path="/editefullcasclinique"
            element={<EditeCasCliniqueQcmClinique />}
          ></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
