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
    "2010",
    "2011",
    "2013",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "fondamentaux",
    "clinique",
    "epidemio",

    //"Rattrapage_gynéco",
    "Rattrapage_infect",
  ];
  const hanleOnclickYear = (getYearMed) => {
    if (getYearMed === "2010") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2010",
        },
      });
    }
    if (getYearMed === "2011") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2011",
        },
      });
    }
    if (getYearMed === "2013") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2013",
        },
      });
    }
    if (getYearMed === "2015") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2015",
        },
      });
    } else if (getYearMed === "2016") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2016",
        },
      });
    } else if (getYearMed === "2017") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2017",
        },
      });
    } else if (getYearMed === "2018") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2018",
        },
      });
    } else if (getYearMed === "2019") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2019",
        },
      });
    } else if (getYearMed === "2020") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2020",
        },
      });
    } else if (getYearMed === "2021") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2021",
        },
      });
    } else if (getYearMed === "2022") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2022",
        },
      });
    } else if (getYearMed === "2023") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2023",
        },
      });
    } else if (getYearMed === "2024") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "2024",
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
    } else if (getYearMed === "epidemio") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "epidemio",
        },
      });
    } /*else if (getYearMed === "Rattrapage_gynéco") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_gynéco",
        },
      });
    } */ else if (getYearMed === "Rattrapage_infect") {
      navigateBoardQuiz(`/shopdfresidant`, {
        state: {
          sjetResidant: "Rattrapage_infect",
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
                  <h5 className={classes.cartitle}>Résidanat {year}</h5>
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
                  <h5 className={classes.cartitle_phone}>Résidanat {year}</h5>
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
