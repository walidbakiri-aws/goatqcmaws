import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriveSwitchModule.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import playsessionicon from "../compenent/layout/img/playsession.png";
import detail from "../compenent/layout/img/detailicon.png";
import UserService from "../compenent/layout/service/UserService";
import ModalDetailSession from "./ModalDetailSession";
import { useLocation } from "react-router-dom";
import Backdrop from "./Backdrop";
function DriveSwitchModule() {
  let navigateDriverLinks = useNavigate();
  const { state } = useLocation();
  const { yearMed } = state;
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();

  useEffect(() => {}, []);
  //******************************************************************* */
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const handleDriverLinks = () => {
    console.log("walidddd");
    navigateDriverLinks(`/driverslinks`, {
      state: {
        yearMed: yearMed,
      },
    });
  };
  //************************************************************************ */
  const handleDriverLinkModuleName = () => {
    navigateDriverLinks(`/drivemoduleliste`, {
      state: {
        yearMed: yearMed,
      },
    });
  };

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer}>
              <div className={classes.container}>
                <div className={classes.header}>
                  <h2>
                    Bienvenue sur <span>GOAT Cours</span>
                  </h2>
                  <p>Votre nouvelle plateforme de cours gratuite</p>
                </div>
                <div className={classes.grid}>
                  <div className={classes.card}>
                    <h3>Par Drive</h3>
                    <p className={classes.modules}>
                      <span role="img" aria-label="eye">
                        👁️
                      </span>{" "}
                      modules
                    </p>
                    <button
                      className={classes.button}
                      onClick={() => {
                        handleDriverLinks();
                      }}
                    >
                      Consulter
                    </button>
                  </div>
                  <div className={classes.card}>
                    <h3>Par Module</h3>
                    <p className={classes.modules}>
                      <span role="img" aria-label="eye">
                        👁️
                      </span>{" "}
                      modules
                    </p>
                    <button
                      className={classes.button}
                      onClick={() => {
                        handleDriverLinkModuleName();
                      }}
                    >
                      Consulter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.quizzContainer_phone}></div>
        )}
      </div>
    </>
  );
}

export default DriveSwitchModule;
