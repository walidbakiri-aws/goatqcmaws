import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./SaveQuizz.module.css";
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
import playsessionicon from "../compenent/layout/img/playsession.png";
import detail from "../compenent/layout/img/detailicon.png";
import Backdrop from "./Backdrop";
function SaveQuizz() {
  const [allPlayListe, setAllPLayListes] = useState([]);
  const [showPlayListe, setShowPlayListe] = useState(true);
  const [showMyQuizz, setShowMyQuizz] = useState(true);
  const [allPlayListeQcmCasTous, setAllPlayListeQcmCasTous] = useState([]);
  const [showQuizzesPlayListe, setShowQuizzesPlayListe] = useState(false);
  const [modalDetalIsOpen, setModalDetalIsOpen] = useState(false);
  const [showDivDeleteDetail, setShowDivDeleteDetail] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let navigateBoardQuiz = useNavigate();
  //************************************************************************* */
  const [qcmsQuizz, setQcmsQuizz] = useState([]);
  const [casCliniqueQuizz, setCasCliniqueQuizz] = useState([]);
  const [QcmCasCliniqueQuizz, setQcmCasCliniqueQuizz] = useState([]);
  const [detailQuizz, setDetailQuizz] = useState([]);
  const [quizzIndex, setQuizzIndex] = useState(undefined);
  useEffect(() => {
    console.log(userIdToken);
    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();
    getAllPLayListe();
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
  //****show quizz div********************************************************** */
  const [showQcmQuizDiv, setShowQcmQuizDiv] = useState(false);
  const [showCasCliniqueQuizDiv, setShowCasCliniqueQuizDiv] = useState(false);
  const [showQcmCasCliniqueQuizDiv, setShowQcmCasCliniqueQuizDiv] =
    useState(false);

  //******************************************************************************* */
  const [showDetailDiv, setShowDetailDiv] = useState(false);
  //****get qcms saves******************************************************** */
  const getAllQcmsSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmquizz/${userIdToken}/userqcmsquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQcmsQuizz(result.data);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cliniquequizz/${userIdToken}/usercliniquesquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCasCliniqueQuizz(result.data);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllQcmCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmcliniquequizz/${userIdToken}/userqcmcliniquesquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQcmCasCliniqueQuizz(result.data);
  };
  ///**************************************************************************** */
  //******handle quiz div click************************************************* */
  function handleQuizQcm(qcmQuizzId, index) {
    console.log(qcmQuizzId);
    console.log(index);
    localStorage.setItem("qcmquizzid", qcmQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: qcmsQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: qcmsQuizz[index].selectedSourceExmn,
        moduleId: qcmsQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(qcmsQuizz[index].selectMultipleCours),
        qcmType: qcmsQuizz[index].qcmType,
        minYearQcm: JSON.parse(qcmsQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(qcmsQuizz[index].maxYearQcm),
        moduleName: qcmsQuizz[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(qcmsQuizz[index].savePropositions),
        SaveClickSelectVerfieAll: JSON.parse(
          qcmsQuizz[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(qcmsQuizz[index].saveVerfieReponses),
        SaveQcmIsAnswer: JSON.parse(qcmsQuizz[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(qcmsQuizz[index].savePercentageAmount),
        //******statique***************************************************************** */
        SaveCorrectAnswer: JSON.parse(qcmsQuizz[index].saveCorrectAnswer),
        SaveIsClickedCounter: JSON.parse(qcmsQuizz[index].saveIsClickedCounter),
        savePieStatique: JSON.parse(qcmsQuizz[index].savePieStatique),
        SaveEachLineStatique: JSON.parse(qcmsQuizz[index].saveEachLineStatique),
        commingFrom: "savequizz",
        ExisteCasClinique: false,
      },
    });
  }
  //******************************************************************************* */

  //******handle quiz cas clinique div click****************************************** */
  function handleQuizCasClinique(casCliniqueQuizzId, index) {
    console.log(casCliniqueQuizzId);
    console.log(index);
    localStorage.setItem("qcmquizzid", casCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: casCliniqueQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: casCliniqueQuizz[index].selectedSourceExmn,
        moduleId: casCliniqueQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(
          casCliniqueQuizz[index].selectMultipleCours
        ),
        qcmType: casCliniqueQuizz[index].qcmType,
        minYearQcm: JSON.parse(casCliniqueQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(casCliniqueQuizz[index].maxYearQcm),
        moduleName: casCliniqueQuizz[index].moduleName,
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          casCliniqueQuizz[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          casCliniqueQuizz[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          casCliniqueQuizz[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          casCliniqueQuizz[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          casCliniqueQuizz[index].savePercentageCliniqueAmount
        ),
        //**statique******************************************************* */
        SaveCorrectAnswerClinique: JSON.parse(
          casCliniqueQuizz[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          casCliniqueQuizz[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          casCliniqueQuizz[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          casCliniqueQuizz[index].saveEachLineStatiqueClinique
        ),
        commingFrom: "savequizz",
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizQcmCasClinique(QcmCasCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", QcmCasCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: QcmCasCliniqueQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: QcmCasCliniqueQuizz[index].selectedSourceExmn,
        moduleId: QcmCasCliniqueQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(
          QcmCasCliniqueQuizz[index].selectMultipleCours
        ),
        qcmType: QcmCasCliniqueQuizz[index].qcmType,
        minYearQcm: JSON.parse(QcmCasCliniqueQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(QcmCasCliniqueQuizz[index].maxYearQcm),
        moduleName: QcmCasCliniqueQuizz[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(
          QcmCasCliniqueQuizz[index].savePropositions
        ),
        SaveClickSelectVerfieAll: JSON.parse(
          QcmCasCliniqueQuizz[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          QcmCasCliniqueQuizz[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(QcmCasCliniqueQuizz[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(
          QcmCasCliniqueQuizz[index].savePercentageAmount
        ),
        //***end qcm***************************************************** */
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          QcmCasCliniqueQuizz[index].savePercentageCliniqueAmount
        ),
        //***statique****************************************************************** */
        SaveCorrectAnswer: JSON.parse(
          QcmCasCliniqueQuizz[index].saveCorrectAnswer
        ),
        SaveIsClickedCounter: JSON.parse(
          QcmCasCliniqueQuizz[index].saveIsClickedCounter
        ),
        savePieStatique: JSON.parse(QcmCasCliniqueQuizz[index].savePieStatique),
        SaveEachLineStatique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveEachLineStatique
        ),
        SaveCorrectAnswerClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveEachLineStatiqueClinique
        ),
        //**end cas clinique********************************************************** */
        commingFrom: "savequizz",
        ExisteCasClinique: QcmCasCliniqueQuizz[index].existeCasClinique,
        DoneGetAllClinique: QcmCasCliniqueQuizz[index].doneGetAllClinique,
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz div click************************************************* */
  function handleQuizQcmPlayListe(qcmQuizzId, index) {
    console.log(qcmQuizzId);
    console.log(index);
    localStorage.setItem("qcmquizzid", qcmQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected:
          allPlayListeQcmCasTous[index].qcmSujetTypeSelected,
        SelectedSourceExmn: allPlayListeQcmCasTous[index].selectedSourceExmn,
        moduleId: allPlayListeQcmCasTous[index].moduleId,
        selectMultipleCours: JSON.parse(
          allPlayListeQcmCasTous[index].selectMultipleCours
        ),
        qcmType: allPlayListeQcmCasTous[index].qcmType,
        minYearQcm: JSON.parse(allPlayListeQcmCasTous[index].minYearQcm),
        maxYearQcm: JSON.parse(allPlayListeQcmCasTous[index].maxYearQcm),
        moduleName: allPlayListeQcmCasTous[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(
          allPlayListeQcmCasTous[index].savePropositions
        ),
        SaveClickSelectVerfieAll: JSON.parse(
          allPlayListeQcmCasTous[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          allPlayListeQcmCasTous[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(
          allPlayListeQcmCasTous[index].saveQcmIsAnswer
        ),
        SavePercentageAmount: JSON.parse(
          allPlayListeQcmCasTous[index].savePercentageAmount
        ),
        //******statique***************************************************************** */
        SaveCorrectAnswer: JSON.parse(
          allPlayListeQcmCasTous[index].saveCorrectAnswer
        ),
        SaveIsClickedCounter: JSON.parse(
          allPlayListeQcmCasTous[index].saveIsClickedCounter
        ),
        savePieStatique: JSON.parse(
          allPlayListeQcmCasTous[index].savePieStatique
        ),
        SaveEachLineStatique: JSON.parse(
          allPlayListeQcmCasTous[index].saveEachLineStatique
        ),
        commingFrom: "savequizz",
        ExisteCasClinique: false,
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizCasCliniquePlayListe(casCliniqueQuizzId, index) {
    console.log(casCliniqueQuizzId);
    console.log(index);
    localStorage.setItem("qcmquizzid", casCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected:
          allPlayListeQcmCasTous[index].qcmSujetTypeSelected,
        SelectedSourceExmn: allPlayListeQcmCasTous[index].selectedSourceExmn,
        moduleId: allPlayListeQcmCasTous[index].moduleId,
        selectMultipleCours: JSON.parse(
          allPlayListeQcmCasTous[index].selectMultipleCours
        ),
        qcmType: allPlayListeQcmCasTous[index].qcmType,
        minYearQcm: JSON.parse(allPlayListeQcmCasTous[index].minYearQcm),
        maxYearQcm: JSON.parse(allPlayListeQcmCasTous[index].maxYearQcm),
        moduleName: allPlayListeQcmCasTous[index].moduleName,
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          allPlayListeQcmCasTous[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          allPlayListeQcmCasTous[index].savePercentageCliniqueAmount
        ),
        //**statique******************************************************* */
        SaveCorrectAnswerClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          allPlayListeQcmCasTous[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveEachLineStatiqueClinique
        ),
        commingFrom: "savequizz",
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizQcmCasCliniquePlayListe(QcmCasCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", QcmCasCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected:
          allPlayListeQcmCasTous[index].qcmSujetTypeSelected,
        SelectedSourceExmn: allPlayListeQcmCasTous[index].selectedSourceExmn,
        moduleId: allPlayListeQcmCasTous[index].moduleId,
        selectMultipleCours: JSON.parse(
          allPlayListeQcmCasTous[index].selectMultipleCours
        ),
        qcmType: allPlayListeQcmCasTous[index].qcmType,
        minYearQcm: JSON.parse(allPlayListeQcmCasTous[index].minYearQcm),
        maxYearQcm: JSON.parse(allPlayListeQcmCasTous[index].maxYearQcm),
        moduleName: allPlayListeQcmCasTous[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(
          allPlayListeQcmCasTous[index].savePropositions
        ),
        SaveClickSelectVerfieAll: JSON.parse(
          allPlayListeQcmCasTous[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          allPlayListeQcmCasTous[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(
          allPlayListeQcmCasTous[index].saveQcmIsAnswer
        ),
        SavePercentageAmount: JSON.parse(
          allPlayListeQcmCasTous[index].savePercentageAmount
        ),
        //***end qcm***************************************************** */
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          allPlayListeQcmCasTous[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          allPlayListeQcmCasTous[index].savePercentageCliniqueAmount
        ),
        //***statique****************************************************************** */
        SaveCorrectAnswer: JSON.parse(
          allPlayListeQcmCasTous[index].saveCorrectAnswer
        ),
        SaveIsClickedCounter: JSON.parse(
          allPlayListeQcmCasTous[index].saveIsClickedCounter
        ),
        savePieStatique: JSON.parse(
          allPlayListeQcmCasTous[index].savePieStatique
        ),
        SaveEachLineStatique: JSON.parse(
          allPlayListeQcmCasTous[index].saveEachLineStatique
        ),
        SaveCorrectAnswerClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveCorrectAnswerClinique
        ),
        SaveIsClickedCounterClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveIsClickedCounterClinique
        ),
        savePieStatiqueClinique: JSON.parse(
          allPlayListeQcmCasTous[index].savePieStatiqueClinique
        ),
        SaveEachLineStatiqueClinique: JSON.parse(
          allPlayListeQcmCasTous[index].saveEachLineStatiqueClinique
        ),
        //**end cas clinique********************************************************** */
        commingFrom: "savequizz",
        ExisteCasClinique: allPlayListeQcmCasTous[index].existeCasClinique,
        DoneGetAllClinique: allPlayListeQcmCasTous[index].doneGetAllClinique,
      },
    });
  }
  //******************************************************************************* */
  //*****phone methode ************************************************************ */
  const handleShowQcmQuizzDivBtn = () => {
    setShowQcmQuizDiv(!showQcmQuizDiv);
    setShowCasCliniqueQuizDiv(false);
    setShowQcmCasCliniqueQuizDiv(false);
  };
  const handleShowCasCliniqueQuizzDivBtn = () => {
    setShowQcmQuizDiv(false);
    setShowCasCliniqueQuizDiv(!showCasCliniqueQuizDiv);
    setShowQcmCasCliniqueQuizDiv(false);
  };
  const handleShowQcmCasCliniqueQuizzDivBtn = () => {
    setShowQcmQuizDiv(false);
    setShowCasCliniqueQuizDiv(false);
    setShowQcmCasCliniqueQuizDiv(!showQcmCasCliniqueQuizDiv);
  };
  //******************************************************************************** */
  function closeModalHandler() {
    setModalDetalIsOpen(false);
  }
  //**handle delete quizz ********************************************************* */
  const handleDeteQizzBtn = async (quizzId) => {
    await axios.delete(`https://goatqcm-instance.com/qcmquizz/${quizzId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  //**handle delete quizz ********************************************************* */
  const handleDeteQizzCliniqueBtn = async (quizzId) => {
    await axios.delete(
      `https://goatqcm-instance.com/cliniquequizz/${quizzId}`,
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
  //**handle delete quizz ********************************************************* */
  const handleDeteQizzQcmQcasCliniqeBtn = async (quizzId) => {
    await axios.delete(
      `https://goatqcm-instance.com/qcmcliniquequizz/${quizzId}`,
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

  //**mes playlistes**************************************************************** */
  const getAllPLayListe = async () => {
    let allPlayListe = await axios.get(
      `http://localhost:8080/playliste/specifiqueuser/${userIdToken}`
    );
    console.log(allPlayListe);
    setAllPLayListes(allPlayListe.data);
  };
  const handleOpenPlayListe = async (playLiteId) => {
    console.log(playLiteId);
    console.log(allPlayListeQcmCasTous);

    setAllPlayListeQcmCasTous([]);
    setShowPlayListe(false);
    setShowQuizzesPlayListe(true);
    setShowMyQuizz(false);

    let resultAllQcmsSaves = { data: [] };
    let resultAllCasClinique = { data: [] };
    let resultAllQcmCasClinique = { data: [] };

    try {
      resultAllQcmsSaves = await axios.get(
        `https://goatqcm-instance.com/qcmquizz/${userIdToken}/userqcmsquizz/${playLiteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ QCM:", resultAllQcmsSaves.data);
    } catch (err) {
      console.warn("⚠️ QCM not found:", err.response?.status || err.message);
    }

    try {
      resultAllCasClinique = await axios.get(
        `https://goatqcm-instance.com/cliniquequizz/${userIdToken}/usercliniquesquizz/${playLiteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ CasClinique:", resultAllCasClinique.data);
    } catch (err) {
      console.warn(
        "⚠️ CasClinique not found:",
        err.response?.status || err.message
      );
    }

    try {
      resultAllQcmCasClinique = await axios.get(
        `https://goatqcm-instance.com/qcmcliniquequizz/${userIdToken}/userqcmcliniquesquizz/${playLiteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ QcmCasClinique:", resultAllQcmCasClinique.data);
    } catch (err) {
      console.warn(
        "⚠️ QcmCasClinique not found:",
        err.response?.status || err.message
      );
    }

    // ✅ Merge whatever data was successfully fetched
    const allQuizz = [
      ...resultAllQcmsSaves.data.map((q) => ({
        ...q,
        type: "QCM",
        name: q.nameQcmQuizz,
      })),
      ...resultAllCasClinique.data.map((q) => ({
        ...q,
        type: "CasClinique",
        name: q.nameCasCliniqueQuizz,
      })),
      ...resultAllQcmCasClinique.data.map((q) => ({
        ...q,
        type: "QcmCasClinique",
        name: q.nameQcmCasCliniqueQuizz,
      })),
    ];

    const onlyWithPlaylist = allQuizz.filter((item) => item.playListe !== null);
    setAllPlayListeQcmCasTous(onlyWithPlaylist);
    console.log(onlyWithPlaylist);
    console.log(allQuizz);
    console.log(allPlayListeQcmCasTous);
  };
  const handleDetePlayListeBtn = async (playListeId) => {
    await axios.delete(`https://goatqcm-instance.com/playliste/${playListeId}`);
    getAllPLayListe();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    setShowPlayListe(true);
    setShowQuizzesPlayListe(false);
    setShowMyQuizz(true);
  };
  //******************************************************************************* */

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
            {showPlayListe && (
              <div className={classes.quizzContainer}>
                <div className={classes.separation}>
                  <h5>Mes PlayListes</h5>
                </div>
                <div className={classes.fullquizzdiv}>
                  <div className={classes.fullquizzdiv_content}>
                    {allPlayListe.map((playliste, index) => (
                      <div className={classes.quizzdiv} key={playliste.id}>
                        <div className={classes.quizzdivheader}>
                          <div className={classes.float_child_element}>
                            <div className={classes.quizzname}>
                              {playliste.playlisteName}
                            </div>
                          </div>
                          <div className={classes.float_child_element}>
                            <div className={classes.threedotsbtn}>
                              <CiPlay1
                                style={{ width: 35, height: 25 }}
                                onClick={() => {
                                  handleOpenPlayListe(playliste.id);
                                }}
                              />
                              <BsThreeDotsVertical
                                onClick={() => {
                                  quizzIndex === playliste.id
                                    ? setQuizzIndex(undefined)
                                    : setQuizzIndex(playliste.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.quizzcontent}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter}></div>
                        <div
                          className={classes.quizzdiv_container}
                          key={playliste.id}
                        >
                          {playliste.id === quizzIndex && (
                            <div className={classes.detail}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDetePlayListeBtn(playliste.id);
                                }}
                              >
                                Delete
                              </button>
                              <hr className={`${classes.hr_desk} `} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showQuizzesPlayListe && (
              <div className={classes.fullquizzdiv_playliste}>
                <div className={classes.fullquizzdiv_header_playliste}>
                  Tous les Quizz
                </div>

                {allPlayListeQcmCasTous.map((quizz, index) => (
                  <div className={classes.eachsession_playliste} key={index}>
                    <div className={classes.full_module_iconplay_playliste}>
                      <div className={classes.nameQcmSession_playliste}>
                        {quizz.name}
                      </div>
                      <div className={classes.modulename_playliste}>
                        {quizz.moduleName}
                      </div>
                      {/*<div className={classes.piestatique}>
                                     <Doughnut options={options} data={pieChartData[index]} />
                                   </div>*/}
                    </div>
                    <div className={classes.infosession_playliste}>
                      <div className={classes.yearquizz_playliste}>
                        <div>{quizz.minYearQcm}</div>
                        <div>{quizz.maxYearQcm}</div>
                        <div style={{ marginTop: 10 }}>
                          {quizz.dateSaveQuizzSession}
                        </div>
                      </div>
                      <div
                        className={classes.playicondiv_playliste}
                        onClick={() => {
                          if (quizz.qcmType === "Qcm")
                            handleQuizQcm(quizz.id, index);
                          else if (quizz.qcmType === "Cas Clinique")
                            handleQuizCasCliniquePlayListe(quizz.id, index);
                          else
                            handleQuizQcmCasCliniquePlayListe(quizz.id, index);
                          setQuizzIndex(undefined);
                        }}
                      >
                        <div className={classes.icondiv_playliste}>
                          <img
                            src={playsessionicon}
                            height="30px"
                            width="30px"
                          />
                        </div>

                        <div>Continue le Quizz!</div>
                      </div>
                    </div>
                    <div
                      className={classes.threepoint_playliste}
                      onClick={() => {
                        quizzIndex === quizz.id
                          ? setQuizzIndex(undefined)
                          : setQuizzIndex(quizz.id);
                      }}
                    >
                      <img src={detail} height="30px" width="30px" />
                    </div>
                    <div
                      className={classes.quizzdiv_container_playliste}
                      key={quizz.id}
                    >
                      {quizz.id === quizzIndex && (
                        <div className={classes.detail_playliste}>
                          <button
                            type="button"
                            onClick={() => {
                              if (quizz.qcmType === "Qcm")
                                handleDeteQizzBtn(quizz.id);
                              else if (quizz.qcmType === "Cas Clinique")
                                handleDeteQizzCliniqueBtn(quizz.id);
                              else handleDeteQizzQcmQcasCliniqeBtn(quizz.id);
                              setQuizzIndex(undefined);
                            }}
                          >
                            Delete
                          </button>
                          <hr className={`${classes.hr_desk_playliste} `} />
                          <button
                            onClick={() => {
                              setModalDetalIsOpen(true);
                              setDetailQuizz(quizz);
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClick}
                >
                  précédent
                </button>
              </div>
            )}

            {showMyQuizz && (
              <div className={classes.quizzContainer}>
                <div className={classes.separation}>
                  <h5>Mes Quizzes</h5>
                </div>
                <div className={classes.fullquizzdiv}>
                  <div className={classes.fullquizzdiv_header}>QCM</div>
                  <div className={classes.fullquizzdiv_content}>
                    {qcmsQuizz.map((qcmQuizz, index) => (
                      <div className={classes.quizzdiv} key={qcmQuizz.id}>
                        <div className={classes.quizzdivheader}>
                          <div className={classes.float_child_element}>
                            <div className={classes.quizzname}>
                              {qcmQuizz.nameQcmQuizz}
                            </div>
                          </div>
                          <div className={classes.float_child_element}>
                            <div className={classes.threedotsbtn}>
                              <CiPlay1
                                style={{ width: 35, height: 25 }}
                                onClick={() => {
                                  handleQuizQcm(qcmQuizz.id, index);
                                }}
                              />
                              <BsThreeDotsVertical
                                onClick={() => {
                                  quizzIndex === qcmQuizz.id
                                    ? setQuizzIndex(undefined)
                                    : setQuizzIndex(qcmQuizz.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.quizzcontent}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter}></div>
                        <div
                          className={classes.quizzdiv_container}
                          key={qcmQuizz.id}
                        >
                          {qcmQuizz.id === quizzIndex && (
                            <div className={classes.detail}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDeteQizzBtn(qcmQuizz.id);
                                  setQuizzIndex(undefined);
                                }}
                              >
                                Delete
                              </button>
                              <hr className={`${classes.hr_desk} `} />
                              <button
                                onClick={() => {
                                  setModalDetalIsOpen(true);
                                  console.log(qcmQuizz);
                                  setDetailQuizz(qcmQuizz);
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
                <div className={classes.fullquizzdiv}>
                  <div className={classes.fullquizzdiv_header}>
                    Cas Clinique
                  </div>
                  <div className={classes.fullquizzdiv_content}>
                    {casCliniqueQuizz.map((quizzCasClinique, indexClinique) => (
                      <div
                        className={classes.quizzdiv}
                        key={quizzCasClinique.id}
                      >
                        <div className={classes.quizzdivheader}>
                          <div className={classes.float_child_element}>
                            <div className={classes.quizzname}>
                              {quizzCasClinique.nameCasCliniqueQuizz}
                            </div>
                          </div>
                          <div className={classes.float_child_element}>
                            <div className={classes.threedotsbtn}>
                              <CiPlay1
                                style={{ width: 35, height: 25 }}
                                onClick={() => {
                                  handleQuizCasClinique(
                                    quizzCasClinique.id,
                                    indexClinique
                                  );
                                }}
                              />
                              <BsThreeDotsVertical
                                onClick={() => {
                                  quizzIndex === quizzCasClinique.id
                                    ? setQuizzIndex(undefined)
                                    : setQuizzIndex(quizzCasClinique.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className={classes.quizzcontent}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter}></div>
                        <div
                          className={classes.quizzdiv_container_clinique}
                          key={quizzCasClinique.id}
                        >
                          {quizzCasClinique.id === quizzIndex && (
                            <div className={classes.detail_clinique}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDeteQizzCliniqueBtn(
                                    quizzCasClinique.id
                                  );
                                  setQuizzIndex(undefined);
                                }}
                              >
                                Delete
                              </button>
                              <hr className={`${classes.hr_desk} `} />
                              <button
                                onClick={() => {
                                  setModalDetalIsOpen(true);

                                  setDetailQuizz(quizzCasClinique);
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

                <div className={classes.fullquizzdiv}>
                  <div className={classes.fullquizzdiv_header}>
                    Tous (Qcm et Cas Clinique)
                  </div>
                  <div className={classes.fullquizzdiv_content}>
                    {QcmCasCliniqueQuizz.map((QcmCasClinique, index) => (
                      <div className={classes.quizzdiv} key={QcmCasClinique.id}>
                        <div className={classes.quizzdivheader}>
                          <div className={classes.float_child_element}>
                            <div className={classes.quizzname}>
                              {QcmCasClinique.nameQcmCasCliniqueQuizz}
                            </div>
                          </div>
                          <div className={classes.float_child_element}>
                            <div className={classes.threedotsbtn}>
                              <CiPlay1
                                style={{ width: 35, height: 25 }}
                                onClick={() => {
                                  handleQuizQcmCasClinique(
                                    QcmCasClinique.id,
                                    index
                                  );
                                }}
                              />
                              <BsThreeDotsVertical
                                onClick={() => {
                                  quizzIndex === QcmCasClinique.id
                                    ? setQuizzIndex(undefined)
                                    : setQuizzIndex(QcmCasClinique.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className={classes.quizzcontent}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter}></div>
                        <div
                          className={classes.quizzdiv_container}
                          key={QcmCasClinique.id}
                        >
                          {QcmCasClinique.id === quizzIndex && (
                            <div className={classes.detail}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDeteQizzQcmQcasCliniqeBtn(
                                    QcmCasClinique.id
                                  );
                                  setQuizzIndex(undefined);
                                }}
                              >
                                Delete
                              </button>
                              <hr className={`${classes.hr_desk} `} />
                              <button
                                onClick={() => {
                                  setModalDetalIsOpen(true);

                                  setDetailQuizz(QcmCasClinique);
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
              </div>
            )}
          </div>
        )}

        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            {showPlayListe && (
              <div className={classes.quizzContainer_phone}>
                <div className={classes.separation_phone}>
                  <h6>Mes PlayListes</h6>
                </div>
                <div className={classes.fullquizzdiv_phone}>
                  <div className={classes.fullquizzdiv_content_phone}>
                    {allPlayListe.map((playliste, index) => (
                      <div
                        className={classes.quizzdiv_phone}
                        key={playliste.id}
                      >
                        <div className={classes.quizzdivheader_phone}>
                          <div className={classes.float_child_element_phone}>
                            <div className={classes.quizzname_phone}>
                              {playliste.playlisteName}
                            </div>
                          </div>
                          <div className={classes.float_child_element_phone}>
                            <div className={classes.threedotsbtn_phone}>
                              <CiPlay1
                                style={{ width: 35, height: 25 }}
                                onClick={() => {
                                  handleOpenPlayListe(playliste.id);
                                }}
                              />
                              <BsThreeDotsVertical
                                onClick={() => {
                                  quizzIndex === playliste.id
                                    ? setQuizzIndex(undefined)
                                    : setQuizzIndex(playliste.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.quizzcontent_phone}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter_phone}></div>
                        <div
                          className={classes.quizzdiv_container_phone}
                          key={playliste.id}
                        >
                          {playliste.id === quizzIndex && (
                            <div className={classes.detail_phone}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDetePlayListeBtn(playliste.id);
                                }}
                              >
                                Delete
                              </button>
                              <hr className={`${classes.hr_desk_phone} `} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showQuizzesPlayListe && (
              <div className={classes.quizzContainer_phone_playliste}>
                <div className={classes.separation_phone}>
                  <h6>Mes Quizzes</h6>
                </div>
                {allPlayListeQcmCasTous.map((quizz, index) => (
                  <div
                    className={classes.eachsession_phone_playliste}
                    key={index}
                  >
                    <div
                      className={classes.full_module_iconplay_phone_playliste}
                    >
                      <div
                        className={
                          classes.modulename_nameQcmSession_phone_playliste
                        }
                      >
                        <div className={classes.nameQcmSession_phone_playliste}>
                          {quizz.name}
                        </div>
                        <div className={classes.modulename_phone_playliste}>
                          {quizz.moduleName}
                        </div>
                        {/*<div className={classes.piestatique_phone}>
                                <Doughnut options={options} data={pieChartData[index]} />
                              </div>*/}
                      </div>
                    </div>
                    <div className={classes.infosession_phone_playliste}>
                      <div
                        className={classes.yearquizz_threepoint_phone_playliste}
                      >
                        <div className={classes.yearquizz_phone_playliste}>
                          <div>{quizz.minYearQcm}</div>
                          <div>{quizz.maxYearQcm}</div>
                        </div>
                        <div
                          className={classes.threepoint_phone_playliste}
                          onClick={() => {
                            quizzIndex === quizz.id
                              ? setQuizzIndex(undefined)
                              : setQuizzIndex(quizz.id);
                          }}
                        >
                          <img src={detail} height="30px" width="30px" />
                        </div>
                      </div>
                      <div style={{ fontSize: 14, marginLeft: 5 }}>
                        {quizz.dateSaveQuizzSession}
                      </div>
                      <div className={classes.playicondiv_phone_playliste}>
                        <div className={classes.icondiv_phone_playliste}>
                          <img
                            src={playsessionicon}
                            height="40px"
                            width="40px"
                            onClick={() => {
                              if (quizz.qcmType === "Qcm")
                                handleQuizQcmPlayListe(quizz.id, index);
                              else if (quizz.qcmType === "Cas Clinique")
                                handleQuizCasCliniquePlayListe(quizz.id, index);
                              else
                                handleQuizQcmCasCliniquePlayListe(
                                  quizz.id,
                                  index
                                );
                              setQuizzIndex(undefined);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={classes.quizzdiv_container_phone_playliste}
                      key={quizz.id}
                    >
                      {quizz.id === quizzIndex && (
                        <div className={classes.detail_phone_playliste}>
                          <button
                            type="button"
                            onClick={() => {
                              if (quizz.qcmType === "Qcm")
                                handleQuizQcmPlayListe(quizz.id);
                              else if (quizz.qcmType === "Cas Clinique")
                                handleDeteQizzCliniqueBtn(quizz.id);
                              else handleDeteQizzQcmQcasCliniqeBtn(quizz.id);
                              setQuizzIndex(undefined);
                            }}
                          >
                            Delete
                          </button>
                          <hr
                            className={`${classes.hr_desk_phone_playliste} `}
                          />
                          <button
                            onClick={() => {
                              setModalDetalIsOpen(true);
                              setDetailQuizz(quizz);
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClick}
                >
                  précédent
                </button>
              </div>
            )}

            {showMyQuizz && (
              <div className={classes.quizzContainer_phone}>
                <div className={classes.separation_phone}>
                  <h6>Mes Quizzes</h6>
                </div>
                <div
                  className={classes.fullquizzdiv_phone}
                  style={{ height: showQcmQuizDiv ? 200 : 0 }}
                >
                  <div
                    className={classes.fullquizzdiv_header_phone}
                    onClick={handleShowQcmQuizzDivBtn}
                  >
                    <div className={classes.title_type_quizz}>Qcm</div>
                    <div className={classes.drowdown_btn}>
                      <IoChevronDownOutline />
                    </div>
                  </div>
                  {showQcmQuizDiv && (
                    <div className={classes.fullquizzdiv_content_phone}>
                      {qcmsQuizz.map((qcmQuizz, index) => (
                        <div className={classes.quizzdiv_phone}>
                          <div className={classes.quizzdivheader_phone}>
                            <div className={classes.float_child_element_phone}>
                              <div className={classes.quizzname_phone}>
                                {qcmQuizz.nameQcmQuizz}
                              </div>
                            </div>
                            <div className={classes.float_child_element_phone}>
                              <div className={classes.threedotsbtn_phone}>
                                <CiPlay1
                                  style={{ width: 15, height: 15 }}
                                  onClick={() => {
                                    handleQuizQcm(qcmQuizz.id, index);
                                  }}
                                />
                                <BsThreeDotsVertical
                                  style={{ width: 15, height: 15 }}
                                  onClick={() => {
                                    quizzIndex === qcmQuizz.id
                                      ? setQuizzIndex(undefined)
                                      : setQuizzIndex(qcmQuizz.id);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={classes.quizzcontent_phone}>
                            <img src={backsave} />
                          </div>
                          <div className={classes.quizzdivfooter_phone}></div>
                          <div
                            className={classes.quizzdiv_container_phone}
                            key={qcmQuizz.id}
                          >
                            {qcmQuizz.id === quizzIndex && (
                              <div className={classes.detail_phone}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeteQizzBtn(qcmQuizz.id);
                                    setQuizzIndex(undefined);
                                  }}
                                >
                                  Delete
                                </button>
                                <hr className={`${classes.hr_desk_phone} `} />
                                <button
                                  onClick={() => {
                                    setModalDetalIsOpen(true);
                                    console.log(qcmQuizz);
                                    setDetailQuizz(qcmQuizz);
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
                <div
                  className={classes.fullquizzdiv_phone}
                  style={{ height: showCasCliniqueQuizDiv ? 200 : 0 }}
                >
                  <div
                    className={classes.fullquizzdiv_header_phone}
                    onClick={handleShowCasCliniqueQuizzDivBtn}
                  >
                    <div className={classes.title_type_quizz}>Cas Clinique</div>
                    <div className={classes.drowdown_btn}>
                      <IoChevronDownOutline />
                    </div>
                  </div>
                  {showCasCliniqueQuizDiv && (
                    <div className={classes.fullquizzdiv_content_phone}>
                      {casCliniqueQuizz.map(
                        (quizzCasClinique, indexClinique) => (
                          <div
                            className={classes.quizzdiv_phone}
                            key={quizzCasClinique.id}
                          >
                            <div className={classes.quizzdivheader_phone}>
                              <div
                                className={classes.float_child_element_phone}
                              >
                                <div className={classes.quizzname_phone}>
                                  {quizzCasClinique.nameCasCliniqueQuizz}
                                </div>
                              </div>
                              <div
                                className={classes.float_child_element_phone}
                              >
                                <div className={classes.threedotsbtn_phone}>
                                  <CiPlay1
                                    style={{ width: 15, height: 15 }}
                                    onClick={() => {
                                      handleQuizCasClinique(
                                        quizzCasClinique.id,
                                        indexClinique
                                      );
                                    }}
                                  />
                                  <BsThreeDotsVertical
                                    style={{ width: 15, height: 15 }}
                                    onClick={() => {
                                      quizzIndex === quizzCasClinique.id
                                        ? setQuizzIndex(undefined)
                                        : setQuizzIndex(quizzCasClinique.id);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className={classes.quizzcontent_phone}>
                              <img src={backsave} />
                            </div>
                            <div className={classes.quizzdivfooter_phone}></div>
                            <div
                              className={
                                classes.quizzdiv_container_clinique_phone
                              }
                              key={quizzCasClinique.id}
                            >
                              {quizzCasClinique.id === quizzIndex && (
                                <div className={classes.detail_clinique_phone}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDeteQizzCliniqueBtn(
                                        quizzCasClinique.id
                                      );
                                      setQuizzIndex(undefined);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <hr className={`${classes.hr_desk_phone} `} />
                                  <button
                                    onClick={() => {
                                      setModalDetalIsOpen(true);

                                      setDetailQuizz(quizzCasClinique);
                                      setQuizzIndex(undefined);
                                    }}
                                  >
                                    Détail
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={classes.fullquizzdiv_phone}
                  style={{ height: showQcmCasCliniqueQuizDiv ? 200 : 0 }}
                >
                  <div
                    className={classes.fullquizzdiv_header_phone}
                    onClick={handleShowQcmCasCliniqueQuizzDivBtn}
                  >
                    <div className={classes.title_type_quizz}>
                      Tous (Qcm et Cas Clinique)
                    </div>
                    <div className={classes.drowdown_btn}>
                      <IoChevronDownOutline />
                    </div>
                  </div>
                  {showQcmCasCliniqueQuizDiv && (
                    <div className={classes.fullquizzdiv_content_phone}>
                      {QcmCasCliniqueQuizz.map((QcmCasClinique, index) => (
                        <div
                          className={classes.quizzdiv_phone}
                          key={QcmCasClinique.id}
                        >
                          <div className={classes.quizzdivheader_phone}>
                            <div className={classes.float_child_element_phone}>
                              <div className={classes.quizzname_phone}>
                                {QcmCasClinique.nameQcmCasCliniqueQuizz}
                              </div>
                            </div>
                            <div className={classes.float_child_element_phone}>
                              <div className={classes.threedotsbtn_phone}>
                                <CiPlay1
                                  style={{ width: 15, height: 15 }}
                                  onClick={() => {
                                    handleQuizQcmCasClinique(
                                      QcmCasClinique.id,
                                      index
                                    );
                                  }}
                                />
                                <BsThreeDotsVertical
                                  style={{ width: 15, height: 15 }}
                                  onClick={() => {
                                    quizzIndex === QcmCasClinique.id
                                      ? setQuizzIndex(undefined)
                                      : setQuizzIndex(QcmCasClinique.id);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className={classes.quizzcontent_phone}>
                            <img src={backsave} />
                          </div>
                          <div className={classes.quizzdivfooter_phone}></div>
                          <div
                            className={classes.quizzdiv_container_phone}
                            key={QcmCasClinique.id}
                          >
                            {QcmCasClinique.id === quizzIndex && (
                              <div className={classes.detail_phone}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeteQizzQcmQcasCliniqeBtn(
                                      QcmCasClinique.id
                                    );
                                    setQuizzIndex(undefined);
                                  }}
                                >
                                  Delete
                                </button>
                                <hr className={`${classes.hr_desk_phone} `} />
                                <button
                                  onClick={() => {
                                    setModalDetalIsOpen(true);

                                    setDetailQuizz(QcmCasClinique);
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
              </div>
            )}
          </div>
        )}
      </div>
      {modalDetalIsOpen && (
        <ModalDetail onCancel={closeModalHandler} detailQuizz={detailQuizz} />
      )}
      {modalDetalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}

export default SaveQuizz;
