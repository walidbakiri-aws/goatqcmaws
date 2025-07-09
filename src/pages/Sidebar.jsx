import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import goatlogonavbare from "../compenent/layout/goatlogonavbare.png";
import { BiLogOut } from "react-icons/bi";
import classes from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSignal } from "@preact/signals-react";
import { Navigate } from "react-router-dom";
import Toggle from "../compenent/layout/Toggle";
import myabounement from "../compenent/layout/img/myabounement.png";
import mysession from "../compenent/layout/img/mysession.png";
import mycours from "../compenent/layout/img/mycours.png";
import myquizz from "../compenent/layout/img/myquizz.png";
import home from "../compenent/layout/img/home.png";
import creequizz from "../compenent/layout/img/creequizz.png";

function Sidebar() {
  const navigatLogin = useNavigate();
  const navigasavesession = useNavigate();
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
  /*********adresse Ip***************************** */

  const token = localStorage.getItem("tokengoat");

  const userIdToken = localStorage.getItem("userId");
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
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
  const [sessionsLength, setSessionsLength] = useState("");
  const [LastSessionIdDelete, setLastSessionIdDelete] = useState("");
  /******************************************************************************* */
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user"
    );
    if (confirmDelete) {
      UserService.logout();
      navigatLogin("/");
    }
  };
  //****get ip adress and location user******************************* */

  //****************************************************************** */

  //********************************************************************** */
  //**************************************************************** */
  const handleCreatQquez = () => {};
  /***************************************************************** */

  useEffect(() => {
    console.log("cccc");

    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();
    setIsOpen((prev) => !prev);
  }, []);
  //*********button show session*********************************** */
  const handleShowSessionBtn = () => {
    navigasavesession("/savesession");
    setShowSessionsList(!ShowSessionsList);
  };
  /**************************************************************** */
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
  //******************************************************************************* */
  const handleShowSession = () => {
    try {
      fullSessionsListe = [...fullSessionsListe].sort(
        (a, b) =>
          new Date(a.dateSaveQuizzSession) - new Date(b.dateSaveQuizzSession)
      );

      localStorage.setItem("fullSessionsListeLength", fullSessionsListe.length);

      localStorage.setItem("lastSessionId", fullSessionsListe[0].id);
      localStorage.setItem("qcmtypesession", fullSessionsListe[0].qcmType);
    } catch (Exception) {
      console.log("there no sessions");
    }
  };
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

  return (
    <>
      {isDesktopOrLaptop && (
        <div
          className={`${classes.sidebar} d-flex flex-column justify-space-between p-2 vh-100`}
        >
          <a className={classes.goatlogo}>
            <img src={goatlogonavbare} height="40" width="80" />
          </a>

          <div className={classes.title}>
            <hr className="text-secondary mt-2 " />
            <span className=" fs-5">Tableau de Bord</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link to={"/goatqcm"} className="nav-link  fs-6">
                <img src={home} height="100%" width="25" />
                <span className="fs-6 p-2">Accueil</span>
              </Link>
            </li>
          </ul>

          <div className={classes.title}>
            <hr className="text-secondary p-0 m-0 " />
            <span className="fs-5">Revision</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link
                to={"/quiz"}
                className="nav-link fs-6"
                onClick={(e) => {
                  handleShowSession();
                  handleCreatQquez();
                }}
              >
                <img src={creequizz} height="100%" width="25" />
                <span className="fs-6 p-2">Crée un Quiz </span>
              </Link>
            </li>

            <li className="nav-item p-1">
              <Link
                to={"/quizz"}
                className="nav-link fs-6"
                onClick={(e) => {
                  handleShowMyQuizz();
                }}
              >
                <img src={myquizz} height="100%" width="25" />
                <span className="fs-6 p-2">Mes Quizz </span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShowSessionBtn();
              }}
              className="nav-item p-1"
              style={{ marginLeft: "16px" }}
            >
              <img src={mysession} height="60%" width="25" />
              <span className="fs-6 p-2">Mes Sessions</span>
            </li>
            {ShowSessionsList && (
              <ul className={`${classes.session_ul} nav-item p-1`}>
                {fullSessionsListe.map((session, index) => (
                  <li
                    className="nav-item p-1"
                    key={index}
                    onClick={() => {
                      handleCheckSession(session.qcmType, session.id, index);
                    }}
                  >
                    session {index + 1}
                  </li>
                ))}
              </ul>
            )}

            <li className="nav-item p-1">
              <Link to={"/driverscours"} className="nav-link fs-6">
                <img src={mycours} height="100%" width="25" />
                <span className="fs-6 p-2">GOAT Cours</span>
              </Link>
            </li>
            <li className="nav-item p-1">
              <Link to={"/residantsujet"} className="nav-link fs-6">
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="fs-6 p-2">Extra</span>
              </Link>
            </li>
          </ul>
          <div className={classes.title}>
            <hr className="text-secondary p-0 m-0 " />
            <span className=" fs-5">Abonnements</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link to={"/myabonnement"} className="nav-link fs-6">
                <img src={myabounement} height="100%" width="25" />
                <span className="fs-6 p-2">Mes Abonnements </span>
              </Link>
            </li>
          </ul>
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
          {isOnlyAdmin && (
            <div>
              <div className={classes.title}>
                <hr className="text-secondary p-0 m-0 " />
                <span className=" fs-5">User Board</span>
              </div>
              <hr className="text-secondary p-0 m-0" />
              <ul className="nav nav-pills flex-column p-0 m-0">
                <li className="nav-item p-1">
                  <Link to={"/admin/user-management"} className="nav-link fs-6">
                    <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                    <span className="fs-6 p-2">User Management </span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to={"/admin/allabounement"} className="nav-link fs-6">
                    <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                    <span className="fs-6 p-2">User Abounement </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {isAuthenticated && (
            <>
              <li className={`${classes.deconnect} nav-link fs-6`}>
                <Link to={"/"} onClick={handleLogout}>
                  <BiLogOut color="#c5c5c5" />
                  <span className="fs-6 p-2">Déconnecter </span>
                </Link>
              </li>{" "}
            </>
          )}
        </div>
      )}
      {isTabletOrMobile && (
        <div
          className={`
          ${classes.sidebar_phone}
          d-flex flex-column justify-space-between  vh-100
          ${isOpen ? classes.open : ""}
        `}
        >
          <a className={classes.goatlogo_phone}>
            <img src={goatlogonavbare} height="40" width="80" />
          </a>
          <div className={classes.title_phone}>
            <hr className="text-secondary  " />
            <span style={{ fontWeight: "bold" }}>Tableau de Bord</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className={` nav-item p-1`}>
              <Link to={"/goatqcm"}>
                <img src={home} height="100%" width="20" />
                <span className=" p-2">Accueil</span>
              </Link>
            </li>
          </ul>
          <hr className="text-secondary p-0 m-0 " />
          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0 " />
            <span style={{ fontWeight: "bold" }}>Revision</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <hr className="text-secondary p-0 m-0" />
          <ul
            className={`${classes.listeitem_phone} nav nav-pills flex-column p-0 m-0`}
          >
            <li
              className="nav-item p-1"
              style={{}}
              onClick={handleShowSession()}
            >
              <Link to={"/quiz"}>
                <img src={creequizz} height="100%" width="20" />
                <span className="fs-7 ">Crée un Quiz </span>
              </Link>
            </li>

            <li className="nav-item p-1" style={{}}>
              <Link
                to={"/quizz"}
                onClick={(e) => {
                  handleShowMyQuizz();
                }}
              >
                <img src={myquizz} height="100%" width="25" />
                <span className="fs-7 " style={{}}>
                  Mes Quizz
                </span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShowSessionBtn();
              }}
              className="nav-item p-1"
              style={{}}
            >
              <img src={mysession} height="100%" width="25" />
              <span className="fs-7 " style={{}}>
                Mes Session
              </span>
            </li>

            <li className="nav-item p-1" style={{}}>
              <Link to={"/driverscours"}>
                <img src={mycours} height="100%" width="20" />
                <span className="fs-7 " style={{}}>
                  GOAT Cours
                </span>
              </Link>
            </li>
            <li className="nav-item p-1" style={{}}>
              <Link to={"/residantsujet"}>
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="fs-7 " style={{}}>
                  Extra
                </span>
              </Link>
            </li>
          </ul>
          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0 " />
            <span style={{ fontWeight: "bold" }}>Abonnements</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className={`${classes.lisidebareabd_phone} nav-item p-1`}>
              <Link to={"/myabonnement"}>
                <img src={myabounement} height="100%" width="25" />
                <span className="p-2">Mes Abonnements </span>
              </Link>
            </li>
            <hr className="text-secondary p-0 m-0" />
            <li>
              <Toggle
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
            </li>
          </ul>
          <div></div>
          {isOnlyAdmin && (
            <div>
              <div className={classes.title_phone}>
                <hr className="text-secondary p-0 m-0 " />
                <span className="text-black ">User Board</span>
              </div>
              <hr className="text-secondary p-0 m-0" />
              <ul className="nav nav-pills flex-column p-0 m-0">
                <li className="nav-item p-1">
                  <Link to={"/admin/user-management"} className="nav-link ">
                    <FontAwesomeIcon icon={faListCheck} />
                    <span className=" p-2">User Management </span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to={"/admin/allabounement"} className="nav-link  ">
                    <FontAwesomeIcon icon={faListCheck} />
                    <span className=" p-2">User Abounement </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {isAuthenticated && (
            <>
              <li className={`${classes.deconnect_phone} nav-link `}>
                <Link to={"/"} onClick={handleLogout}>
                  <BiLogOut color="#c5c5c5" />
                  <span style={{ fontWeight: "bold" }} className=" p-2">
                    Déconnecter{" "}
                  </span>
                </Link>
              </li>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Sidebar;
