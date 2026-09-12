import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import { BiLogOut } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import axios from "axios";

import useLocalStorage from "use-local-storage";

import { useSignal } from "@preact/signals-react";

import { v4 as uuidv4 } from "uuid";

import UserService from "../compenent/layout/service/UserService";

import Toggle from "../compenent/layout/Toggle";

import classes from "./Sidebar.module.css";

import goatlogonavbare from "../compenent/layout/goatlogonavbare.png";

import myabounement from "../compenent/layout/img/myabounement.png";
import mysession from "../compenent/layout/img/mysession.png";
import mycours from "../compenent/layout/img/mycours.png";
import myquizz from "../compenent/layout/img/myquizz.png";
import home from "../compenent/layout/img/home.png";
import creequizz from "../compenent/layout/img/creequizz.png";

function Sidebar() {
  const navigate = useNavigate();

  // ******************************************************************
  // DARK MODE
  // ******************************************************************

  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  // ******************************************************************
  // RESPONSIVE
  // ******************************************************************

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  // ******************************************************************
  // AUTHENTICATION
  // ******************************************************************

  const isAuthenticated = UserService.isAuthenticated();
  const isOnlyAdmin = UserService.adminOnly();

  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");

  // ******************************************************************
  // MOBILE SIDEBAR
  // ******************************************************************

  const [isOpen, setIsOpen] = useState(false);

  // ******************************************************************
  // SESSIONS
  // ******************************************************************

  const [ShowSessionsList, setShowSessionsList] = useState(false);

  const [qcmsQuizz, setQcmsQuizz] = useState([]);
  const [casCliniqueQuizz, setCasCliniqueQuizz] = useState([]);
  const [QcmCasCliniqueQuizz, setQcmCasCliniqueQuizz] = useState([]);

  const [fullSessionsListe, setFullSessionsListe] = useState([]);

  // ******************************************************************
  // VISITEUR
  // ******************************************************************

  const [VisiteurOnly, setVisiteurOnly] = useState(false);

  // ******************************************************************
  // EXTRA POPUP
  // ******************************************************************

  const [showExtraPopup, setShowExtraPopup] = useState(false);

  const [extraCode, setExtraCode] = useState("");

  const [extraCodeError, setExtraCodeError] = useState("");

  // ******************************************************************
  // IP / DEVICE
  // ******************************************************************

  const ipAdresse = useSignal("");
  const getUserAdresseIp = useSignal("");

  // ******************************************************************
  // TEST VISITEUR
  // ******************************************************************

  const testVisiteurUser = () => {
    if (localStorage.getItem("username") === "goatqcm@gmail.com") {
      setVisiteurOnly(true);
    } else {
      setVisiteurOnly(false);
    }
  };

  // ******************************************************************
  // DEVICE ID
  // ******************************************************************

  const getOrCreateDeviceId = () => {
    let id = localStorage.getItem("deviceId");

    if (!id) {
      id = uuidv4();
      localStorage.setItem("deviceId", id);
    }

    return id;
  };

  // ******************************************************************
  // UPDATE IP
  // ******************************************************************

  const updateAdresseIp = async (adressIp) => {
    if (!userIdToken) {
      return;
    }

    const UpdtAbnAdressIp = {
      adresseIp: adressIp,
    };

    try {
      await axios.put(
        `https://goatqcm-instance.com/auth/updateAdresseip/${userIdToken}`,
        UpdtAbnAdressIp,
      );

      console.log("Adresse IP updated");
    } catch (err) {
      console.log("user not have abnt yet to update adress ip");
    }
  };

  // ******************************************************************
  // INITIALIZATION
  // ******************************************************************

  useEffect(() => {
    //localStorage.setItem("extraAccess", "false");
    const deviceId = getOrCreateDeviceId();

    updateAdresseIp(deviceId);

    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();

    testVisiteurUser();
  }, []);

  // ******************************************************************
  // EXTRA ACCESS
  // ******************************************************************

  const handleExtraClick = (e) => {
    e.preventDefault();

    const extraAccess = localStorage.getItem("extraAccess");

    // Already entered the code before
    if (extraAccess === "true") {
      navigate("/residantsujet");
      return;
    }

    // Show popup
    setExtraCode("");
    setExtraCodeError("");
    setShowExtraPopup(true);
  };

  // ******************************************************************
  // VALIDATE EXTRA CODE
  // ******************************************************************

  const handleExtraCodeSubmit = () => {
    const code = extraCode.trim();

    if (code === "589902") {
      // Save authorization
      localStorage.setItem("extraAccess", "true");

      // Close popup
      setShowExtraPopup(false);

      // Clear fields
      setExtraCode("");
      setExtraCodeError("");

      // Navigate
      navigate("/residantsujet");
    } else {
      setExtraCodeError("Code incorrect. Veuillez réessayer.");
    }
  };

  // ******************************************************************
  // CLOSE EXTRA POPUP
  // ******************************************************************

  const handleCloseExtraPopup = () => {
    setShowExtraPopup(false);
    setExtraCode("");
    setExtraCodeError("");
  };

  // ******************************************************************
  // ENTER KEY FOR EXTRA CODE
  // ******************************************************************

  const handleExtraCodeKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleExtraCodeSubmit();
    }
  };

  // ******************************************************************
  // CREATE QUIZ
  // ******************************************************************

  const handleCreatQquez = () => {};

  // ******************************************************************
  // SHOW SESSIONS
  // ******************************************************************

  const handleShowSessionBtn = () => {
    setShowSessionsList((prev) => !prev);
  };

  // ******************************************************************
  // GET QCM SAVED SESSIONS
  // ******************************************************************

  const getAllQcmsSaves = async () => {
    if (!userIdToken || !token) {
      return;
    }

    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/qcmsession/${userIdToken}/userqcmsquizz`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(result.data);

      setQcmsQuizz(result.data);

      setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
    } catch (error) {
      console.log("Error loading QCM sessions", error);
    }
  };

  // ******************************************************************
  // GET CAS CLINIQUE SAVED SESSIONS
  // ******************************************************************

  const getAllCasCliniqueSaves = async () => {
    if (!userIdToken || !token) {
      return;
    }

    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/cliniquesession/${userIdToken}/usercliniquessession`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCasCliniqueQuizz(result.data);

      setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
    } catch (error) {
      console.log("Error loading Cas Clinique sessions", error);
    }
  };

  // ******************************************************************
  // GET QCM + CAS CLINIQUE SAVED SESSIONS
  // ******************************************************************

  const getAllQcmCasCliniqueSaves = async () => {
    if (!userIdToken || !token) {
      return;
    }

    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/qcmcliniquesession/${userIdToken}/userqcmcliniquessession`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setQcmCasCliniqueQuizz(result.data);

      setFullSessionsListe((prevArray) => [...prevArray, ...result.data]);
    } catch (error) {
      console.log("Error loading QCM Cas Clinique sessions", error);
    }
  };

  // ******************************************************************
  // SHOW SESSION
  // ******************************************************************

  const handleShowSession = () => {
    try {
      const sortedSessions = [...fullSessionsListe].sort(
        (a, b) =>
          new Date(a.dateSaveQuizzSession) - new Date(b.dateSaveQuizzSession),
      );

      if (sortedSessions.length === 0) {
        console.log("There are no sessions");
        return;
      }

      localStorage.setItem("fullSessionsListeLength", sortedSessions.length);

      localStorage.setItem("lastSessionId", sortedSessions[0].id);

      localStorage.setItem("qcmtypesession", sortedSessions[0].qcmType);
    } catch (error) {
      console.log("There are no sessions");
    }
  };

  // ******************************************************************
  // HANDLE QCM QUIZ
  // ******************************************************************

  function handleQuizQcm(qcmQuizzId, index) {
    localStorage.setItem("qcmquizzid", qcmQuizzId);

    navigate("/quiz/quizdashboard", {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,

        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,

        moduleId: fullSessionsListe[index].moduleId,

        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours,
        ),

        qcmType: fullSessionsListe[index].qcmType,

        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),

        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),

        moduleName: fullSessionsListe[index].moduleName,

        savePropositions: JSON.parse(fullSessionsListe[index].savePropositions),

        SaveClickSelectVerfieAll: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAll,
        ),

        SaveVerfieReponses: JSON.parse(
          fullSessionsListe[index].saveVerfieReponses,
        ),

        SaveQcmIsAnswer: JSON.parse(fullSessionsListe[index].saveQcmIsAnswer),

        SavePercentageAmount: JSON.parse(
          fullSessionsListe[index].savePercentageAmount,
        ),

        SaveCorrectAnswer: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswer,
        ),

        SaveIsClickedCounter: JSON.parse(
          fullSessionsListe[index].saveIsClickedCounter,
        ),

        savePieStatique: JSON.parse(fullSessionsListe[index].savePieStatique),

        SaveEachLineStatique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatique,
        ),

        commingFrom: "savesession",

        ExisteCasClinique: false,
      },
    });
  }

  // ******************************************************************
  // HANDLE CAS CLINIQUE
  // ******************************************************************

  function handleQuizCasClinique(casCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", casCliniqueQuizzId);

    navigate("/quiz/quizdashboard", {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,

        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,

        moduleId: fullSessionsListe[index].moduleId,

        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours,
        ),

        qcmType: fullSessionsListe[index].qcmType,

        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),

        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),

        moduleName: fullSessionsListe[index].moduleName,

        savePropositionsClinique: JSON.parse(
          fullSessionsListe[index].savePropositionsClinique,
        ),

        saveClickSelectVerfieAllClinique: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAllClinique,
        ),

        saveVerfieReponsesClinique: JSON.parse(
          fullSessionsListe[index].saveVerfieReponsesClinique,
        ),

        saveQcmIsAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveQcmIsAnswerClinique,
        ),

        savePercentageCliniqueAmount: JSON.parse(
          fullSessionsListe[index].savePercentageCliniqueAmount,
        ),

        SaveCorrectAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveCorrectAnswerClinique,
        ),

        SaveIsClickedCounterClinique: JSON.parse(
          fullSessionsListe[index].SaveIsClickedCounterClinique,
        ),

        savePieStatiqueClinique: JSON.parse(
          fullSessionsListe[index].savePieStatiqueClinique,
        ),

        SaveEachLineStatiqueClinique: JSON.parse(
          fullSessionsListe[index].saveEachLineStatiqueClinique,
        ),

        commingFrom: "savesession",
      },
    });
  }

  // ******************************************************************
  // HANDLE QCM + CAS CLINIQUE
  // ******************************************************************

  function handleQuizQcmCasClinique(QcmCasCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", QcmCasCliniqueQuizzId);

    navigate("/quiz/quizdashboard", {
      state: {
        QcmSujetTypeSelected: fullSessionsListe[index].qcmSujetTypeSelected,

        SelectedSourceExmn: fullSessionsListe[index].selectedSourceExmn,

        moduleId: fullSessionsListe[index].moduleId,

        selectMultipleCours: JSON.parse(
          fullSessionsListe[index].selectMultipleCours,
        ),

        qcmType: fullSessionsListe[index].qcmType,

        minYearQcm: JSON.parse(fullSessionsListe[index].minYearQcm),

        maxYearQcm: JSON.parse(fullSessionsListe[index].maxYearQcm),

        moduleName: fullSessionsListe[index].moduleName,

        savePropositions: JSON.parse(fullSessionsListe[index].savePropositions),

        SaveClickSelectVerfieAll: JSON.parse(
          fullSessionsListe[index].SaveClickSelectVerfieAll,
        ),

        SaveVerfieReponses: JSON.parse(
          fullSessionsListe[index].SaveVerfieReponses,
        ),

        SaveQcmIsAnswer: JSON.parse(fullSessionsListe[index].SaveQcmIsAnswer),

        SavePercentageAmount: JSON.parse(
          fullSessionsListe[index].SavePercentageAmount,
        ),

        savePropositionsClinique: JSON.parse(
          fullSessionsListe[index].savePropositionsClinique,
        ),

        saveClickSelectVerfieAllClinique: JSON.parse(
          fullSessionsListe[index].saveClickSelectVerfieAllClinique,
        ),

        saveVerfieReponsesClinique: JSON.parse(
          fullSessionsListe[index].saveVerfieReponsesClinique,
        ),

        saveQcmIsAnswerClinique: JSON.parse(
          fullSessionsListe[index].saveQcmIsAnswerClinique,
        ),

        savePercentageCliniqueAmount: JSON.parse(
          fullSessionsListe[index].savePercentageCliniqueAmount,
        ),

        SaveCorrectAnswer: JSON.parse(
          fullSessionsListe[index].SaveCorrectAnswer,
        ),

        SaveIsClickedCounter: JSON.parse(
          fullSessionsListe[index].SaveIsClickedCounter,
        ),

        savePieStatique: JSON.parse(fullSessionsListe[index].savePieStatique),

        SaveEachLineStatique: JSON.parse(
          fullSessionsListe[index].SaveEachLineStatique,
        ),

        SaveCorrectAnswerClinique: JSON.parse(
          fullSessionsListe[index].SaveCorrectAnswerClinique,
        ),

        SaveIsClickedCounterClinique: JSON.parse(
          fullSessionsListe[index].SaveIsClickedCounterClinique,
        ),

        savePieStatiqueClinique: JSON.parse(
          fullSessionsListe[index].savePieStatiqueClinique,
        ),

        SaveEachLineStatiqueClinique: JSON.parse(
          fullSessionsListe[index].SaveEachLineStatiqueClinique,
        ),

        commingFrom: "savesession",

        ExisteCasClinique: fullSessionsListe[index].existeCasClinique,

        DoneGetAllClinique: fullSessionsListe[index].doneGetAllClinique,
      },
    });
  }

  // ******************************************************************
  // CHECK SESSION TYPE
  // ******************************************************************

  const handleCheckSession = (qcmType, sessionId, index) => {
    if (qcmType === "Qcm") {
      handleQuizQcm(sessionId, index);
    } else if (qcmType === "Cas Clinique") {
      handleQuizCasClinique(sessionId, index);
    } else if (qcmType === "Tous (Qcm,Cas Clinique)") {
      handleQuizQcmCasClinique(sessionId, index);
    }
  };

  // ******************************************************************
  // LOGOUT
  // ******************************************************************

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user",
    );

    if (confirmDelete) {
      UserService.logout();
      navigate("/");
    }
  };

  // ******************************************************************
  // RENDER
  // ******************************************************************

  return (
    <>
      {/* ============================================================
          DESKTOP SIDEBAR
      ============================================================ */}

      {isDesktopOrLaptop && (
        <div
          className={`${classes.sidebar} d-flex flex-column justify-space-between p-2 vh-100`}
        >
          {/* LOGO */}
          <a className={classes.goatlogo}>
            <img src={goatlogonavbare} height="40" width="80" alt="GOAT" />
          </a>

          {/* DASHBOARD */}
          <div className={classes.title}>
            <hr className="text-secondary mt-2" />

            <span className="fs-5">Tableau de Bord</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link to="/goatqcm" className="nav-link fs-6">
                <img src={home} height="100%" width="25" alt="Accueil" />

                <span className="fs-6 p-2">Accueil</span>
              </Link>
            </li>
          </ul>

          {/* REVISION */}
          <div className={classes.title}>
            <hr className="text-secondary p-0 m-0" />

            <span className="fs-5">Revision</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul className="nav nav-pills flex-column p-0 m-0">
            {/* CREATE QUIZ */}
            <li className="nav-item p-1">
              <Link
                to="/quiz"
                className="nav-link fs-6"
                onClick={() => {
                  handleShowSession();
                  handleCreatQquez();
                }}
              >
                <img src={creequizz} height="100%" width="25" alt="Créer" />

                <span className="fs-6 p-2">Crée un Quiz</span>
              </Link>
            </li>

            {/* PLAYLIST */}
            <li className="nav-item p-1">
              <Link to="/quizz" className="nav-link fs-6">
                <img src={myquizz} height="100%" width="25" alt="Playlist" />

                <span className="fs-6 p-2">PlayListe</span>
              </Link>
            </li>

            {/* SESSIONS */}
            <li
              onClick={handleShowSessionBtn}
              className="nav-item p-1"
              style={{
                marginLeft: "16px",
                cursor: "pointer",
              }}
            >
              <img src={mysession} height="60%" width="25" alt="Sessions" />

              <span className="fs-6 p-2">Mes Sessions</span>
            </li>

            {ShowSessionsList && (
              <ul className={`${classes.session_ul} nav-item p-1`}>
                {fullSessionsListe.map((session, index) => (
                  <li
                    className="nav-item p-1"
                    key={session.id || index}
                    onClick={() =>
                      handleCheckSession(session.qcmType, session.id, index)
                    }
                  >
                    session {index + 1}
                  </li>
                ))}
              </ul>
            )}

            {/* GOAT COURS */}
            {!VisiteurOnly && (
              <li className="nav-item p-1">
                <Link to="/driverscours" className="nav-link fs-6">
                  <img src={mycours} height="100%" width="25" alt="Cours" />

                  <span className="fs-6 p-2">GOAT Cours</span>
                </Link>
              </li>
            )}

            {/* EXTRA */}
            <li className="nav-item p-1">
              <Link
                to="/residantsujet"
                className="nav-link fs-6"
                onClick={handleExtraClick}
              >
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />

                <span className="fs-6 p-2">Extra</span>
              </Link>
            </li>
          </ul>

          {/* ABONNEMENTS */}
          <div className={classes.title}>
            <hr className="text-secondary p-0 m-0" />

            <span className="fs-5">Abonnements</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link to="/myabonnement" className="nav-link fs-6">
                <img
                  src={myabounement}
                  height="100%"
                  width="25"
                  alt="Abonnement"
                />

                <span className="fs-6 p-2">Mes Abonnements</span>
              </Link>
            </li>
          </ul>

          {/* DARK MODE */}
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

          {/* ADMIN */}
          {isOnlyAdmin && (
            <div>
              <div className={classes.title}>
                <hr className="text-secondary p-0 m-0" />

                <span className="fs-5">User Board</span>
              </div>

              <hr className="text-secondary p-0 m-0" />

              <ul className="nav nav-pills flex-column p-0 m-0">
                <li className="nav-item p-1">
                  <Link to="/admin/user-management" className="nav-link fs-6">
                    <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />

                    <span className="fs-6 p-2">User Management</span>
                  </Link>
                </li>

                <li className="nav-item p-1">
                  <Link to="/admin/allabounement" className="nav-link fs-6">
                    <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />

                    <span className="fs-6 p-2">User Abounement</span>
                  </Link>
                </li>

                <li className="nav-item p-1">
                  <Link to="/admin/checkabounement" className="nav-link fs-6">
                    <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />

                    <span className="fs-6 p-2">New Abonnement</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* LOGOUT */}
          {isAuthenticated && (
            <li className={`${classes.deconnect} nav-link fs-6`}>
              <Link to="/" onClick={handleLogout}>
                <BiLogOut color="#c5c5c5" />

                <span className="fs-6 p-2">Déconnecter</span>
              </Link>
            </li>
          )}
        </div>
      )}

      {/* ============================================================
          MOBILE SIDEBAR
      ============================================================ */}

      {isTabletOrMobile && (
        <div
          className={`
            ${classes.sidebar_phone}
            d-flex
            flex-column
            justify-space-between
            vh-100
            ${isOpen ? classes.open : ""}
          `}
        >
          {/* LOGO */}
          <a className={classes.goatlogo_phone}>
            <img src={goatlogonavbare} height="40" width="80" alt="GOAT" />
          </a>

          {/* DASHBOARD */}
          <div className={classes.title_phone}>
            <hr className="text-secondary" />

            <span style={{ fontWeight: "bold" }}>Tableau de Bord</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className="nav-item p-1">
              <Link to="/goatqcm">
                <img src={home} height="100%" width="20" alt="Accueil" />

                <span className="p-2">Accueil</span>
              </Link>
            </li>
          </ul>

          {/* REVISION */}
          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0" />

            <span style={{ fontWeight: "bold" }}>Revision</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul
            className={`${classes.listeitem_phone} nav nav-pills flex-column p-0 m-0`}
          >
            {/* CREATE QUIZ */}
            <li className="nav-item p-1" onClick={handleShowSession}>
              <Link to="/quiz">
                <img src={creequizz} height="100%" width="20" alt="Créer" />

                <span className="fs-7">Crée un Quiz</span>
              </Link>
            </li>

            {/* PLAYLIST */}
            <li className="nav-item p-1">
              <Link to="/quizz">
                <img src={myquizz} height="100%" width="25" alt="Playlist" />

                <span className="fs-7">PlayListe</span>
              </Link>
            </li>

            {/* SESSIONS */}
            <li onClick={handleShowSessionBtn} className="nav-item p-1">
              <img src={mysession} height="100%" width="25" alt="Sessions" />

              <span className="fs-7">Mes Session</span>
            </li>

            {ShowSessionsList && (
              <ul className={`${classes.session_ul} nav-item p-1`}>
                {fullSessionsListe.map((session, index) => (
                  <li
                    className="nav-item p-1"
                    key={session.id || index}
                    onClick={() =>
                      handleCheckSession(session.qcmType, session.id, index)
                    }
                  >
                    session {index + 1}
                  </li>
                ))}
              </ul>
            )}

            {/* GOAT COURS */}
            {!VisiteurOnly && (
              <li className="nav-item p-1">
                <Link to="/driverscours">
                  <img src={mycours} height="100%" width="20" alt="Cours" />

                  <span className="fs-7">GOAT Cours</span>
                </Link>
              </li>
            )}

            {/* EXTRA */}
            <li className="nav-item p-1">
              <Link to="/residantsujet" onClick={handleExtraClick}>
                <FontAwesomeIcon icon={faListCheck} color="#c5c5c5" />

                <span className="fs-7">Extra</span>
              </Link>
            </li>
          </ul>

          {/* ABONNEMENTS */}
          <div className={classes.title_phone}>
            <hr className="text-secondary p-0 m-0" />

            <span style={{ fontWeight: "bold" }}>Abonnements</span>
          </div>

          <hr className="text-secondary p-0 m-0" />

          <ul className="nav nav-pills flex-column p-0 m-0">
            <li className={`${classes.lisidebareabd_phone} nav-item p-1`}>
              <Link to="/myabonnement">
                <img
                  src={myabounement}
                  height="100%"
                  width="25"
                  alt="Abonnement"
                />

                <span className="p-2">Mes Abonnements</span>
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

          {/* ADMIN */}
          {isOnlyAdmin && (
            <div>
              <div className={classes.title_phone}>
                <hr className="text-secondary p-0 m-0" />

                <span>User Board</span>
              </div>

              <hr className="text-secondary p-0 m-0" />

              <ul className="nav nav-pills flex-column p-0 m-0">
                <li className="nav-item p-1">
                  <Link to="/admin/user-management">
                    <FontAwesomeIcon icon={faListCheck} />

                    <span className="p-2">User Management</span>
                  </Link>
                </li>

                <li className="nav-item p-1">
                  <Link to="/admin/allabounement">
                    <FontAwesomeIcon icon={faListCheck} />

                    <span className="p-2">User Abounement</span>
                  </Link>
                </li>

                <li className="nav-item p-1">
                  <Link to="/admin/checkabounement">
                    <FontAwesomeIcon icon={faListCheck} />

                    <span className="p-2">New Abounement</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* LOGOUT */}
          {isAuthenticated && (
            <li className={`${classes.deconnect_phone} nav-link`}>
              <Link to="/" onClick={handleLogout}>
                <BiLogOut color="#c5c5c5" />

                <span className="p-2">Déconnecter</span>
              </Link>
            </li>
          )}
        </div>
      )}

      {/* ============================================================
          EXTRA POPUP
      ============================================================ */}

      {showExtraPopup && isTabletOrMobile && (
        <div
          className={classes.extraOverlay_phone}
          onClick={handleCloseExtraPopup}
        >
          <div
            className={classes.extraPopup}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              className={classes.extraCloseButton}
              onClick={handleCloseExtraPopup}
              aria-label="Fermer"
            >
              ×
            </button>

            {/* ICON */}
            <div className={classes.extraIcon}>
              <FontAwesomeIcon icon={faListCheck} />
            </div>

            {/* TITLE */}
            <h3 className={classes.extraTitle}>Accès Extra</h3>

            {/* MESSAGE */}
            <p className={classes.extraMessage}>
              Le bouton <strong>Extra</strong> contient les PDF et fichiers
              suivants :
              <br />
              <br />• Sujets de résidanat de <strong>2010 à 2024</strong> <br />
              • Sujets de rattrapage <br />• Tous les sujets d’externat{" "}
              <strong>2026</strong> <br />• Sujets de résidanat classés par
              module <strong>2015/2024</strong> <br /> <br />
              <strong>💰 Tout cela coûte 500 DA.</strong> <br /> <br />
              Après avoir effectué le paiement, veuillez nous informer par
              message sur la page Facebook <strong>GOATQCM</strong> : <br />{" "}
              <br />
              <a
                href="https://www.facebook.com/share/1EqDuXvudH/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.facebookLink}
              >
                ``` 👉 Contacter GOATQCM sur Facebook ```
              </a>
              <br />
              <br />
              <strong>CCP :</strong> <br />
              16303554 — Clé 90 <br />
              Bakiri Walid
              <br />
              <br />
              <strong>RIP/BARIDIMOB :</strong> <br />
              00799999001630355448
            </p>

            {/* TEXTAREA */}
            <textarea
              className={classes.extraTextarea}
              value={extraCode}
              onChange={(e) => {
                setExtraCode(e.target.value);
                setExtraCodeError("");
              }}
              onKeyDown={handleExtraCodeKeyDown}
              placeholder="Entrez le code..."
              rows={3}
              autoFocus
            />

            {/* ERROR */}
            {extraCodeError && (
              <div className={classes.extraError}>{extraCodeError}</div>
            )}

            {/* VALIDATE BUTTON */}
            <button
              type="button"
              className={classes.extraSubmitButton}
              onClick={handleExtraCodeSubmit}
            >
              Valider
            </button>
          </div>
        </div>
      )}
      {showExtraPopup && isDesktopOrLaptop && (
        <div className={classes.extraOverlay} onClick={handleCloseExtraPopup}>
          <div
            className={classes.extraPopup}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              className={classes.extraCloseButton}
              onClick={handleCloseExtraPopup}
              aria-label="Fermer"
            >
              ×
            </button>

            {/* ICON */}
            <div className={classes.extraIcon}>
              <FontAwesomeIcon icon={faListCheck} />
            </div>

            {/* TITLE */}
            <h3 className={classes.extraTitle}>Accès Extra</h3>

            {/* MESSAGE */}
            <p className={classes.extraMessage}>
              Le bouton <strong>Extra</strong> contient les PDF et fichiers
              suivants :
              <br />
              <br />• Sujets de résidanat de <strong>2010 à 2024</strong> <br />
              • Sujets de rattrapage <br />• Tous les sujets d’externat{" "}
              <strong>2026</strong> <br />• Sujets de résidanat classés par
              module <strong>2015/2024</strong> <br /> <br />
              <strong>💰 Tout cela coûte 500 DA.</strong> <br /> <br />
              Après avoir effectué le paiement, veuillez nous informer par
              message sur la page Facebook <strong>GOATQCM</strong> : <br />{" "}
              <br />
              <a
                href="https://www.facebook.com/share/1EqDuXvudH/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.facebookLink}
              >
                ``` 👉 Contacter GOATQCM sur Facebook ```
              </a>
              <br />
              <br />
              <strong>CCP :</strong> <br />
              16303554 — Clé 90 <br />
              Bakiri Walid
              <br />
              <br />
              <strong>RIP/BARIDIMOB :</strong> <br />
              00799999001630355448
            </p>

            {/* TEXTAREA */}
            <textarea
              className={classes.extraTextarea}
              value={extraCode}
              onChange={(e) => {
                setExtraCode(e.target.value);
                setExtraCodeError("");
              }}
              onKeyDown={handleExtraCodeKeyDown}
              placeholder="Entrez le code..."
              rows={3}
              autoFocus
            />

            {/* ERROR */}
            {extraCodeError && (
              <div className={classes.extraError}>{extraCodeError}</div>
            )}

            {/* VALIDATE BUTTON */}
            <button
              type="button"
              className={classes.extraSubmitButton}
              onClick={handleExtraCodeSubmit}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
