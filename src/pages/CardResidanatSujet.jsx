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
    "fondamentaux",
    "clinique",
    "sujet_rattrapage",
    "sujet_residanat_2010_2024",
    "sujet_externat_partie_01",
    "sujet_externat_partie_02",

    "rattrapage_u2_2eme",
    "rattrapage_u4_2eme",
    "rattrapage_u5_2eme",
    "rattrapage_genetique_2eme",
    "rattrapage_immuno_2eme",

    "rattrapage_immuno_3eme",

    "rattrapage_gastro",
  ];
  const hanleOnclickYear = (getYearMed) => {
    if (getYearMed === "sujet_residanat_2010_2024") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "sujet_residanat_2010_2024",
        },
      });
    } else if (getYearMed === "sujet_externat_partie_01") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "sujet_externat_partie_01",
        },
      });
    } else if (getYearMed === "sujet_externat_partie_02") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "sujet_externat_partie_02",
        },
      });
    } else if (getYearMed === "fondamentaux") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "fondamentaux",
        },
      });
    } else if (getYearMed === "clinique") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "clinique",
        },
      });
    } else if (getYearMed === "sujet_rattrapage") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "sujet_rattrapage",
        },
      });
    } else if (getYearMed === "rattrapage_u2_2eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_u2_2eme",
        },
      });
    } else if (getYearMed === "rattrapage_u4_2eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_u4_2eme",
        },
      });
    } else if (getYearMed === "rattrapage_u5_2eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_u5_2eme",
        },
      });
    } else if (getYearMed === "rattrapage_immuno_2eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_immuno_2eme",
        },
      });
    } else if (getYearMed === "rattrapage_genetique_2eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_genetique_2eme",
        },
      });
    } else if (getYearMed === "rattrapage_gastro") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_gastro",
        },
      });
    } else if (getYearMed === "rattrapage_immuno_3eme") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "rattrapage_immuno_3eme",
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
