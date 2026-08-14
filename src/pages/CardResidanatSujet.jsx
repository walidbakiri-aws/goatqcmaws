import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./CardResidanatSujet.module.css";
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
function CardResidanatSujet() {
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("token");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  let navigateBoardQuiz = useNavigate();
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
  const yearsName = [
    "Sujet_Résidanat_2010_2024",
    "Sujet_Résidanat_2015_2024",
    "Sujet_Résidanat_Fondamentaux",
    "Sujet_Résidanat_Clinique",
    "Sujet_Externat_Partie_01",
    "Sujet_Externat_Partie_02",
    "Rattrapage_u2_2éme",
    "Rattrapage_u4_2éme",
    "Rattrapage_u5_2éme",
    "Rattrapage_immuno_2éme",
    "Rattrapage_genetique_2éme",
    "Rattrapage_gastro",
  ];
  const hanleOnclickYear = (getYearMed) => {
    if (getYearMed === "Sujet_Résidanat_2010_2024") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Résidanat_2010_2024",
        },
      });
    } else if (getYearMed === "Sujet_Résidanat_2015_2024") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Résidanat_2015_2024",
        },
      });
    } else if (getYearMed === "Sujet_Résidanat_Fondamentaux") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Résidanat_Fondamentaux",
        },
      });
    } else if (getYearMed === "Sujet_Résidanat_Clinique") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Résidanat_Clinique",
        },
      });
    } else if (getYearMed === "Sujet_Externat_Partie_01") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Externat_Partie_01",
        },
      });
    } else if (getYearMed === "Sujet_Externat_Partie_02") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Externat_Partie_02",
        },
      });
    } else if (getYearMed === "Sujet_Rattrapage") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Sujet_Rattrapage",
        },
      });
    } else if (getYearMed === "Rattrapage_u2_2éme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_u2_2éme",
        },
      });
    } else if (getYearMed === "Rattrapage_u4_2éme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_u4_2éme",
        },
      });
    } else if (getYearMed === "Rattrapage_u5_2éme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_u5_2éme",
        },
      });
    } else if (getYearMed === "Rattrapage_immuno_2éme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_immuno_2éme",
        },
      });
    } else if (getYearMed === "Rattrapage_genetique_2éme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_genetique_2éme",
        },
      });
    } else if (getYearMed === "Rattrapage_gastro") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_gastro",
        },
      });
    }
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
              {yearsName.map((year, index) => (
                <div
                  key={index}
                  className={classes.cardyear}
                  onClick={() => {
                    hanleOnclickYear(year);
                  }}
                >
                  <h5 className={classes.cartitle}> {year}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer_phone}>
              {yearsName.map((year, index) => (
                <div
                  key={index}
                  className={classes.cardyear_phone}
                  onClick={() => {
                    hanleOnclickYear(year);
                  }}
                >
                  <h5 className={classes.cartitle_phone}> {year}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CardResidanatSujet;
