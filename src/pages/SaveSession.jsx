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
import detail from "../compenent/layout/img/detailicon.png";
import UserService from "../compenent/layout/service/UserService";
import ModalDetailSession from "./ModalDetailSession";
import Backdrop from "./Backdrop";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
function SaveSession() {
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  const options = {};
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
  const [quizzIndex, setQuizzIndex] = useState(undefined);
  const [detailQuizz, setDetailQuizz] = useState([]);
  const [modalDetalSessionIsOpen, setModalDetalSessionIsOpen] = useState(false);
  //**************************************************************************** */
  const savePieFinal = useSignal([]);
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
  ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  //************************************************************************ */
  const pieChartData = fullSessionsListe.map((row) => {
    let values = [0, 0, 0];

    try {
      if (row.qcmType === "Qcm") {
        console.log("Qcm");
        values = JSON.parse(row.savePieStatique);
      } else if (row.qcmType === "Cas Clinique") {
        console.log("Cas Clinique");
        values = JSON.parse(row.savePieStatiqueClinique);
      } else if (row.qcmType === "Tous (Qcm,Cas Clinique)") {
        const qcmValues = JSON.parse(row.savePieStatique);
        const cliniqueValues = JSON.parse(row.savePieStatiqueClinique);
        console.log("Tous (Qcm,Cas Clinique)");
        values = [
          qcmValues[0] + cliniqueValues[0],
          qcmValues[1] + cliniqueValues[1],
          qcmValues[2] + cliniqueValues[2],
        ];
      }
    } catch (e) {
      console.warn("Invalid pie data:", row, e);
    }

    return {
      labels: ["vrai", "faux", "pas répondu"],
      datasets: [
        {
          label: "Quizz Statique",
          data: values,
          backgroundColor: [
            "rgba(21, 161, 56, 0.9)",
            "rgba(207, 25, 25, 0.9)",
            "rgba(69, 67, 163, 0.9)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  });

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
        sessionName: fullSessionsListe[index].nameQcmSession,
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
        sessionName: fullSessionsListe[index].nameCasCliniqueSession,
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
        sessionName: fullSessionsListe[index].nameQcmCasCliniqueSession,
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
  const handleDeteSession = async (quizzId, qcmType) => {
    let qcmTypeFinal;
    if (qcmType === "Qcm") {
      qcmTypeFinal = "qcmsession";
    } else if (qcmType === "Cas Clinique") {
      qcmTypeFinal = "cliniquesession";
    } else if (qcmType === "Tous (Qcm,Cas Clinique)") {
      qcmTypeFinal = "qcmcliniquesession";
    }
    await axios.delete(
      `https://goatqcm-instance.com/${qcmTypeFinal}/${quizzId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //****refresh quizz liste after delete*********************** */
    if (window.localStorage) {
      if (!localStorage.getItem("reload")) {
        localStorage["reload"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("reload");
      }
    }
  };
  //******************************************************************************* */
  //******************************************************************************** */
  function closeModalHandler() {
    setModalDetalSessionIsOpen(false);
  }
  //******************************************************************************** */
  const handleShowCours = () => {
    console.log(fullSessionsListe);
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
              {/*<button
                onClick={() => {
                  handleShowCours();
                }}
              >
                test
              </button>*/}
              {fullSessionsListe.map((session, index) => (
                <div className={classes.eachsession} key={index}>
                  <div className={classes.full_module_iconplay}>
                    <div className={classes.nameQcmSession}>
                      {session.nameQcmSession ||
                        session.nameQcmCasCliniqueSession ||
                        session.nameCasCliniqueSession}
                    </div>
                    <div className={classes.modulename}>
                      {session.moduleName}
                    </div>
                    <div className={classes.piestatique}>
                      <Doughnut options={options} data={pieChartData[index]} />
                    </div>
                  </div>
                  <div className={classes.infosession}>
                    <div className={classes.yearquizz}>
                      <div>{session.minYearQcm}</div>
                      <div>{session.maxYearQcm}</div>
                      <div style={{ marginTop: 10 }}>
                        {session.dateSaveQuizzSession}
                      </div>
                    </div>
                    <div
                      className={classes.playicondiv}
                      onClick={() => {
                        handleCheckSession(session.qcmType, session.id, index);
                      }}
                    >
                      <div className={classes.icondiv}>
                        <img src={playsessionicon} height="30px" width="30px" />
                      </div>

                      <div>Continue le Quizz!</div>
                    </div>
                  </div>
                  <div
                    className={classes.threepoint}
                    onClick={() => {
                      quizzIndex === session.id
                        ? setQuizzIndex(undefined)
                        : setQuizzIndex(session.id);
                    }}
                  >
                    <img src={detail} height="30px" width="30px" />
                  </div>
                  <div className={classes.quizzdiv_container} key={session.id}>
                    {session.id === quizzIndex && (
                      <div className={classes.detail}>
                        <button
                          type="button"
                          onClick={() => {
                            handleDeteSession(session.id, session.qcmType);
                            setQuizzIndex(undefined);
                          }}
                        >
                          Delete
                        </button>
                        <hr className={`${classes.hr_desk} `} />
                        <button
                          onClick={() => {
                            setModalDetalSessionIsOpen(true);
                            setDetailQuizz(session);
                            setQuizzIndex(undefined);
                          }}
                        >
                          Détail
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.quizzContainer_phone}>
            {fullSessionsListe.map((session, index) => (
              <div className={classes.eachsession_phone} key={index}>
                <div className={classes.full_module_iconplay_phone}>
                  <div className={classes.modulename_nameQcmSession_phone}>
                    <div className={classes.nameQcmSession_phone}>
                      {session.nameQcmSession ||
                        session.nameQcmCasCliniqueSession ||
                        session.nameCasCliniqueSession}
                    </div>
                    <div className={classes.modulename_phone}>
                      {session.moduleName}
                    </div>
                    <div className={classes.piestatique_phone}>
                      <Doughnut options={options} data={pieChartData[index]} />
                    </div>
                  </div>
                </div>
                <div className={classes.infosession_phone}>
                  <div className={classes.yearquizz_threepoint_phone}>
                    <div className={classes.yearquizz_phone}>
                      <div>{session.minYearQcm}</div>
                      <div>{session.maxYearQcm}</div>
                    </div>
                    <div
                      className={classes.threepoint_phone}
                      onClick={() => {
                        quizzIndex === session.id
                          ? setQuizzIndex(undefined)
                          : setQuizzIndex(session.id);
                      }}
                    >
                      <img src={detail} height="30px" width="30px" />
                    </div>
                  </div>
                  <div style={{ fontSize: 14, marginLeft: 5 }}>
                    {session.dateSaveQuizzSession}
                  </div>
                  <div className={classes.playicondiv_phone}>
                    <div className={classes.icondiv_phone}>
                      <img
                        src={playsessionicon}
                        height="40px"
                        width="40px"
                        onClick={() => {
                          handleCheckSession(
                            session.qcmType,
                            session.id,
                            index
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={classes.quizzdiv_container_phone}
                  key={session.id}
                >
                  {session.id === quizzIndex && (
                    <div className={classes.detail_phone}>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeteSession(session.id, session.qcmType);
                          setQuizzIndex(undefined);
                        }}
                      >
                        Delete
                      </button>
                      <hr className={`${classes.hr_desk_phone} `} />
                      <button
                        onClick={() => {
                          setModalDetalSessionIsOpen(true);
                          setDetailQuizz(session);
                          setQuizzIndex(undefined);
                        }}
                      >
                        Détail
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modalDetalSessionIsOpen && (
        <ModalDetailSession
          onCancel={closeModalHandler}
          detailQuizz={detailQuizz}
        />
      )}
      {modalDetalSessionIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}

export default SaveSession;
