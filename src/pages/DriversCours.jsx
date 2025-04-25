import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriversCours.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import backsave from "../compenent/layout/img/backsave.png";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import ModalDetail from "./ModalDetail";
import Backdrop from "./Backdrop";
import UserService from "../compenent/layout/service/UserService";

function DriversCours() {
  const [modalDetalIsOpen, setModalDetalIsOpen] = useState(false);
  const [showDivDeleteDetail, setShowDivDeleteDetail] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  let navigateDriverLinks = useNavigate();
  const isParticipateAdmin = UserService.isParticipateAdmin();
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let navigateBoardQuiz = useNavigate();
  //************************************************************************* */
  const yearsMed = [
    "1ér Année Médecine",
    "2éme Année Médecine",
    "3éme Année Médecine",
    "4éme Année Médecine",
    "5éme Année Médecine",
    "6éme Année Médecine",
    "Samedi Pédagogique",
  ];
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
  const handleDriverLinks = (getYearMed) => {
    console.log("walidddd");
    navigateDriverLinks(`/switchdrive`, {
      state: {
        yearMed: getYearMed,
      },
    });
  };
  const years = [
    { year: "1ère année", modules: 10 },
    { year: "2ème année", modules: 7 },
    { year: "3ème année", modules: 10 },
    { year: "4ème année", modules: 6 },
    { year: "5ème année", modules: 6 },
    { year: "6ème année", modules: 10 },
  ];
  const handleShowCours = () => {
    navigateDriverLinks(`/adddrivelinks`);
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
            {isParticipateAdmin && (
              <button onClick={handleShowCours}>add drive links</button>
            )}
            <div className={classes.container}>
              <div className={classes.header}>
                <h2>
                  Bienvenue sur <span>GOAT Cours</span>
                </h2>
                <p>Votre nouvelle plateforme de cours</p>
              </div>
              <div className={classes.grid}>
                {years.map(({ year, modules }, index) => (
                  <div key={index} className={classes.card}>
                    <h3>{year}</h3>
                    <p className={classes.modules}>
                      <span role="img" aria-label="eye">
                        👁️
                      </span>{" "}
                      {modules} modules
                    </p>
                    <button
                      className={classes.button}
                      onClick={() => {
                        handleDriverLinks(yearsMed[index]);
                      }}
                    >
                      Consulter
                    </button>
                  </div>
                ))}
                <div className={classes.cardsamedi}>
                  <h3>Samedi Pédagogique</h3>
                  <p className={classes.modules}>
                    <span role="img" aria-label="eye">
                      👁️
                    </span>{" "}
                  </p>
                  <button
                    className={classes.button_phone}
                    onClick={() => {
                      handleDriverLinks(yearsMed[6]);
                    }}
                  >
                    Consulter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.container_phone}>
              <div className={classes.header_phone}>
                <h2>
                  Bienvenue sur <span>GOAT Cours</span>
                </h2>
                <p> plateforme des cours </p>
              </div>
              <div className={classes.grid_phone}>
                {years.map(({ year, modules }, index) => (
                  <div key={index} className={classes.card_phone}>
                    <h3>{year}</h3>
                    <p className={classes.modules_phone}>
                      <span role="img" aria-label="eye">
                        👁️
                      </span>{" "}
                      {modules} modules
                    </p>
                    <button
                      className={classes.button_phone}
                      onClick={() => {
                        handleDriverLinks(yearsMed[index]);
                      }}
                    >
                      Consulter
                    </button>
                  </div>
                ))}
                <div className={classes.cardsamedi_phone}>
                  <h3>Samedi Pédagogique</h3>
                  <p className={classes.modules_phone}>
                    <span role="img" aria-label="eye">
                      👁️
                    </span>{" "}
                  </p>
                  <button
                    className={classes.button_phone}
                    onClick={() => {
                      handleDriverLinks(yearsMed[6]);
                    }}
                  >
                    Consulter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default DriversCours;
