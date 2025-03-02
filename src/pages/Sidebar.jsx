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
function Sidebar() {
  const navigatLogin = useNavigate();
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
  const [sessionsLength, setSessionsLength] = useState("");
  const [LastSessionIdDelete, setLastSessionIdDelete] = useState("");
  /******************************************************************************* */
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
  const fetchIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org");
      const data = await response.text();
      ipAdresse.value = data;
      getUserAdressIp();
    } catch (error) {
      console.error("failed to fetch IP:", error);
    }
  };
  //****************************************************************** */
  //****check if user get abounement****************************** */

  const getUserAdressIp = async () => {
    console.log(ipAdresse.value);
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userIdToken}`
      );
      getUserAdresseIp.value = result.data.adresseIp;
      console.log(getUserAdresseIp.value);
      if (getUserAdresseIp.value === ipAdresse.value) {
        console.log("are the same");
      } else {
        UserService.logout();
        navigatLogin("/");
      }
    } catch (Exception) {
      console.log("no abnmt found");
    }
  };
  //*************************************************************** */
  //**************************************************************** */
  const handleCreatQquez = () => {
    fetchIp();
  };
  /***************************************************************** */
  useEffect(() => {
    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();
  }, []);
  //*********button show session*********************************** */
  const handleShowSessionBtn = () => {
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
                <FontAwesomeIcon icon={faHouse} color="#c5c5c5" />
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
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
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
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
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
              <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
              <span className="fs-6 p-2">Mes Sessions</span>
              <IoMdArrowDropdown color="#c5c5c5" />
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
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="fs-6 p-2">Extra </span>
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
                <FontAwesomeIcon icon={faFolderClosed} color="#c5c5c5" />
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
          className={`${classes.sidebar_phone} d-flex flex-column justify-space-between p-2 vh-100`}
        >
          <a className={classes.goatlogo_phone}>
            <img src={goatlogonavbare} height="40" width="80" />
          </a>
          <div className={classes.title_phone}>
            <hr className="text-secondary  " />
            <span>Tableau de Bord</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className={` nav-item p-1`}>
              <Link to={"/goatqcm"} className="nav-link">
                <FontAwesomeIcon icon={faHouse} color="#c5c5c5" />
                <span className=" p-2">Accueil</span>
              </Link>
            </li>
          </ul>

          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0 " />
            <span>Revision</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1" onClick={handleShowSession()}>
              <Link to={"/quiz"} className="nav-link ">
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="p-2">Crée un Quiz </span>
              </Link>
            </li>
            <li
              className="nav-item p-1"
              style={{ marginTop: -15, marginLeft: 50 }}
            >
              <Link
                to={"/quizz"}
                className="nav-link fs-7"
                onClick={(e) => {
                  handleShowMyQuizz();
                }}
              >
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="fs-7 " style={{ marginLeft: 8 }}>
                  Mes Quizz{" "}
                </span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShowSessionBtn();
              }}
              className="nav-item p-1"
              style={{ marginTop: -15, marginLeft: 66 }}
            >
              <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
              <span className="fs-7 " style={{ marginLeft: 8 }}>
                Mes Sessions
              </span>
              <IoMdArrowDropdown color="#c5c5c5" style={{ marginLeft: 15 }} />
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
            <li
              className="nav-item p-1"
              style={{ marginTop: -15, marginLeft: 50 }}
            >
              <Link to={"/driverscours"} className="nav-link  fs-7">
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />
                <span className="fs-7 " style={{ marginLeft: 8 }}>
                  Extra{" "}
                </span>
              </Link>
            </li>
          </ul>
          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0 " />
            <span>Abonnements</span>
          </div>
          <hr className="text-secondary p-0 m-0" />
          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className={`${classes.lisidebareabd_phone} nav-item p-1`}>
              <Link to={"/myabonnement"} className="nav-link  ">
                <FontAwesomeIcon icon={faFolderClosed} color="#c5c5c5" />
                <span className="p-2">Mes Abonnements </span>
              </Link>
            </li>
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
                  <span className=" p-2">Déconnecter </span>
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
