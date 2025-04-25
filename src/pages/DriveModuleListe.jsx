import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriveModuleListe.module.css";
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
import Backdrop from "./Backdrop";
import { useLocation } from "react-router-dom";
function DriveModuleListe() {
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  const { state } = useLocation();
  const { yearMed } = state;
  const [Modules, setAllModules] = useState([]);
  let navigateDriverLinks = useNavigate();

  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();

  useEffect(() => {
    loadSpefecModulesYear();
  }, []);
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

  //load les modules de selction options*************************************
  const loadSpefecModulesYear = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/medmodule/year/${yearMed}`
    );
    setAllModules(result.data);
    console.log(result.data);
    console.log(result.data[5].imageName);
    const modlid = 24;
  };
  //*********************************************************************** */
  const handleDriverLinks = (getModule) => {
    navigateDriverLinks(`/drivecoursnames`, {
      state: {
        module: getModule,
      },
    });
  };
  //*************************************************** */

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
              <div>
                <div className={classes.header}>
                  <h2>{yearMed}</h2>
                  <p>{Modules.length} modules disponibles</p>
                </div>
                <div className={classes.grid}>
                  {Modules.map((module, index) => (
                    <div key={index} className={classes.card}>
                      <h2>{module.moduleName}</h2>
                      <img
                        src={`http://localhost:8080/module/image/${module.id}/${module.imageName}`}
                        alt={module.moduleName}
                        style={{ width: 60, height: 60 }}
                      />
                      <button
                        onClick={(e) => {
                          handleDriverLinks(module);
                        }}
                      >
                        Consulter ›
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.quizzContainer_phone}>
            <div
              className={classes.contanerspace_phone}
              data-theme={isDark ? "dark" : "light"}
            >
              <div className={classes.quizzContainer_phone}>
                <div>
                  <div className={classes.header_phone}>
                    <h2>{yearMed}</h2>
                    <p>{Modules.length} modules disponibles</p>
                  </div>
                  <div className={classes.grid_phone}>
                    {Modules.map((module, index) => (
                      <div key={index} className={classes.card_phone}>
                        <h2>{module.moduleName}</h2>
                        <img
                          src={`http://localhost:8080/module/image/${module.id}/${module.imageName}`}
                          alt={module.moduleName}
                          style={{ width: 60, height: 60 }}
                        />
                        <button
                          onClick={(e) => {
                            handleDriverLinks(module);
                          }}
                        >
                          Consulter ›
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DriveModuleListe;
