import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./SaveSession.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import playsessionicon from "../compenent/layout/img/playsession.png";
import UserService from "../compenent/layout/service/UserService";
function SaveSession() {
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
  //***************saveSession********************************************* */
  const [ShowSessionsList, setShowSessionsList] = useState(false);
  const [qcmsQuizz, setQcmsQuizz] = useState([]);
  const [casCliniqueQuizz, setCasCliniqueQuizz] = useState([]);
  const [QcmCasCliniqueQuizz, setQcmCasCliniqueQuizz] = useState([]);
  let navigateBoardQuiz = useNavigate();
  let [fullSessionsListe, setFullSessionsListe] = useState([]);
  //**************************************************************************** */
  useEffect(() => {
    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();
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

  //****get qcms saves******************************************************** */
  const getAllQcmsSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmsession/${userIdToken}/userqcmsquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result.data);
    setQcmsQuizz(result.data);
    setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cliniquesession/${userIdToken}/usercliniquessession`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCasCliniqueQuizz(result.data);
    setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllQcmCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmcliniquesession/${userIdToken}/userqcmcliniquessession`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQcmCasCliniqueQuizz(result.data);
    setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
  };
  ///**************************************************************************** */
  //******handle quiz div click************************************************* */
  function handleQuizQcm(qcmQuizzId, index) {
    localStorage.setItem("qcmquizzid", qcmQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,
        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,
        moduleId: fullSessionsListe[index].moduleId,
        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours
        ),
        qcmType: fullSessionsListe[index].qcmType,
        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),
        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),
        moduleName: fullSessionsListe[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(fullSessionsListe[index].savePropositions),
        SaveClickSelectVerfieAll: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          fullSessionsListe[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(fullSessionsListe[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(
          fullSessionsListe[index].savePercentageAmount
        ),

        //***statique Qcms************************************************************* */
        SaveCorrectAnswer: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswer
        ),
        SaveIsClickedCounter: JSON.parse(
          fullSessionsListe[index].saveIsClickedCounter
        ),
        savePieStatique: JSON.parse(fullSessionsListe[index].savePieStatique),
        SaveEachLineStatique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatique
        ),
        commingFrom: "savesession",
        ExisteCasClinique: false,
      },
    });
  }
  //******************************************************************************* */

  //******handle quiz cas clinique div click****************************************** */
  function handleQuizCasClinique(casCliniqueQuizzId, index) {
    console.log("hey cas clinique");
    localStorage.setItem("qcmquizzid", casCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,
        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,
        moduleId: fullSessionsListe[index].moduleId,
        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours
        ),
        qcmType: fullSessionsListe[index].qcmType,
        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),
        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),
        moduleName: fullSessionsListe[index].moduleName,
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          fullSessionsListe[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          fullSessionsListe[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          fullSessionsListe[index].savePercentageCliniqueAmount
        ),
        //**statque Clinique************************************************************************ */
        SaveCorrectAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          fullSessionsListe[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          fullSessionsListe[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatiqueClinique
        ),
        commingFrom: "savesession",
      },
    });
    console.log(fullSessionsListe[index].saveVerfieReponsesClinique);
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizQcmCasClinique(QcmCasCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", QcmCasCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,
        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,
        moduleId: fullSessionsListe[index].moduleId,
        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours
        ),
        qcmType: fullSessionsListe[index].qcmType,
        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),
        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),
        moduleName: fullSessionsListe[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(fullSessionsListe[index].savePropositions),
        SaveClickSelectVerfieAll: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          fullSessionsListe[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(fullSessionsListe[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(
          fullSessionsListe[index].savePercentageAmount
        ),
        //***end qcm***************************************************** */
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          fullSessionsListe[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          fullSessionsListe[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          fullSessionsListe[index].savePercentageCliniqueAmount
        ),
        //**end cas clinique********************************************************** */
        //***statique Qcms************************************************************* */
        SaveCorrectAnswer: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswer
        ),
        SaveIsClickedCounter: JSON.parse(
          fullSessionsListe[index].saveIsClickedCounter
        ),
        savePieStatique: JSON.parse(fullSessionsListe[index].savePieStatique),
        SaveEachLineStatique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatique
        ),
        //**statque Clinique************************************************************************ */
        SaveCorrectAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          fullSessionsListe[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          fullSessionsListe[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatiqueClinique
        ),
        //********************************************************************************************* */
        commingFrom: "savesession",
        ExisteCasClinique: fullSessionsListe[index].existeCasClinique,
        DoneGetAllClinique: fullSessionsListe[index].doneGetAllClinique,
      },
    });
  }

  //********************************************************************************* */
  const handleCheckSession = (qcmType, sessionId, index) => {
    if (qcmType === "Qcm") {
      handleQuizQcm(sessionId, index);
    } else if (qcmType === "Cas Clinique") {
      handleQuizCasClinique(sessionId, index);
    } else if (qcmType === "Tous (Qcm,Cas Clinique)") {
      handleQuizQcmCasClinique(sessionId, index);
    }
  };
  /******************************************************************** */
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
              {fullSessionsListe.map((session, index) => (
                <div
                  className={classes.eachsession}
                  key={index}
                  onClick={() => {
                    handleCheckSession(session.qcmType, session.id, index);
                  }}
                >
                  <div className={classes.playicondiv}>
                    <img
                      onClick={(e) => {}}
                      src={playsessionicon}
                      height="60%"
                      width="50%"
                    />
                  </div>
                  <div className={classes.infosession}>
                    <div className={classes.modulename}>
                      {session.moduleName}
                    </div>
                    <div className={classes.quizztype}>{session.qcmType}</div>
                    <div className={classes.yearquizz}>
                      <div>{session.minYearQcm}</div>
                      <div>{session.maxYearQcm}</div>
                    </div>
                  </div>
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
              {fullSessionsListe.map((session, index) => (
                <div
                  className={classes.eachsession_phone}
                  key={index}
                  onClick={() => {
                    handleCheckSession(session.qcmType, session.id, index);
                  }}
                >
                  <div className={classes.playicondiv_phone}>
                    <img
                      onClick={(e) => {}}
                      src={playsessionicon}
                      height="60%"
                      width="50%"
                    />
                  </div>
                  <div className={classes.infosession_phone}>
                    <div className={classes.modulename_phone}>
                      {session.moduleName}
                    </div>
                    <div className={classes.quizztype_phone}>
                      {session.qcmType}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SaveSession;
