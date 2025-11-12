import { useEffect, useRef, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./QuizBoardClinique.module.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
import { useLocation } from "react-router-dom";
import QuizBoard from "./QuizBoard";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DateObject from "react-date-object";
import noteimage from "../compenent/layout/img/note.png";
import A from "../compenent/layout/img/A.png";
import B from "../compenent/layout/img/B.png";
import C from "../compenent/layout/img/C.png";
import D from "../compenent/layout/img/D.png";
import chatgpt from "../compenent/layout/img/chatgpt.png";
import addplayliste from "../compenent/layout/img/addplayliste.png";

import axiosRetry from "axios-retry";
import E from "../compenent/layout/img/E.png";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import externatlogo from "../compenent/layout/externatlogo.svg";
import courlogo from "../compenent/layout/courlogo.svg";
import groupelogo from "../compenent/layout/groupelogo.svg";
import UserService from "../compenent/layout/service/UserService";
import ModalDeleteFullDescClinique from "./ModalDeleteFullDescClinique";
import BackdropDeleteCour from "./BackdropDeleteCour";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import DescriptionClinique from "./DescriptionClinique";
import { useMediaQuery } from "react-responsive";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Backdrop from "./Backdrop";
import ModalDeleteCasClinique from "./ModalDeleteCasClinique";
import ModalDeleteQcmCasClinique from "./ModalDeleteQcmCasClinique";
import ImageClinique from "./ImageClinique";
import useLocalStorage from "use-local-storage";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import { IoMdArrowDropdown } from "react-icons/io";
import dropright from "../compenent/layout/img/dropright.png";
import { useStopwatch } from "react-timer-hook";
import { IoPlayCircleOutline } from "react-icons/io5";
import messanger from "../compenent/layout/img/messanger.png";
import next from "../compenent/layout/img/next.png";
import prev from "../compenent/layout/img/prev.png";
import { IoPauseCircleOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { BsSave } from "react-icons/bs";
import BackdropSaveQuizPhone from "./BackdropSaveQuizPhone";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
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
import NoteQcmClinique from "./NoteQcmClinique";
import ChatBox from "../compenent/layout/ChatBox";
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import eysezoom from "../compenent/layout/img/eysezoom.png";
import ChatGptfinal from "./ChatGptfinal";
function QuizBoardClinique(props) {
  const [visibleSaveQuizzEnter, setVisibleSaveQuizzEnter] = useState(false);
  const [visiblePlayListe, setVisiblePlayListe] = useState(true);
  const [allPLayListes, setAllPLayListes] = useState([]);

  const [playListeName, setPlayListeName] = useState("");
  const userIdToken = localStorage.getItem("userId");
  let [newPlayListe, setNewPlayListe] = useState({
    playlisteName: "",

    ourUsers: { id: userIdToken },
  });
  const [playListe, setPlayListe] = useState([]);

  const currentQcmIndex = useSignal(0);
  /**chat Box*************************************************************** */
  const getDuiscussionDivStatus = localStorage.getItem("showdiscussiondiv");
  const codechatlocation = localStorage.getItem("codechatlocation");
  //************************************************************************ */

  const sourceSaveQuizzBtn = "savequizzsource";
  const sourceSaveSessionBtn = "savesessionsource";
  const sourceQuizzName = "quizzname";
  const sourceSessionName = "sessionname";
  const BASE_URL = "https://goatqcm-instance.com";
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  //******************************************************************* */
  let valueee = false;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const savWAL = useSignal([]);
  let navigateEditeQcm = useNavigate();
  let backFromCliniqueAllQcmCliniqueprSujet = useSignal(true);
  let { module_id } = useParams();
  let { cours_id } = useParams();
  const [ShowSideBare, setShowSideBare] = useState(false);
  const [ShowQcm, setShowQcm] = useState([]);
  const [ShowPorposition, setShowPorposition] = useState([]);
  let getQcms = useSignal([]);
  const QuizQcmQclinique = true;
  const resultGetLoadQcms = useSignal([]);
  const currentIndex = useSignal(0);
  let qcmNumber = useSignal(0);
  const [QcmIndex, setQcmIndex] = useState(0);
  const [VisibiliteCasCliniqueIndex, setVisibiliteCasCliniqueIndex] =
    useState(0);
  const valeurnom = ["walid", "bakiri"];
  const VisibleNextBtn = useSignal(true);
  const VisiblePrevBtn = useSignal(false);
  let [SelectIndex, setSelectIndex] = useState(-1);
  const COLORS = ["#fd5c63", "#17B169"];
  const [backGroundBtn, setBackGroundBtn] = useState("#F0F0F0");
  const [TrueInsertClr, setTrueInsertClr] = useState("");
  const [TrueInsertClrClick, setTrueInsertClrClick] = useState("");
  const [TrueFullInsertClrClinique, setTrueFullInsertClrClinique] =
    useState("");
  const [SlectCliniquePropo, setSlectCliniquePropo] = useState("");
  const selectSaveIndex = useSignal([]);
  let AlphabetChoice = [A, B, C, D, E];
  let IndexAlphabetChoice = useSignal(-1);
  const { state } = useLocation();
  const { courId, qcmType } = state;
  let incrmnt = 0;
  let incrClnTable = 0;
  //***cas clinique variable****************** */
  let incFullCas = useSignal(0);
  let getCasClinique = useSignal([]);
  const [ShowCasClinique, setShowCasClinique] = useState([]);
  const [OpenBoardQcm, setOpenBoardQcm] = useState(false);
  //*************par sujets************************************* */
  const [VisibleParSujet, setVisibleParSujet] = useState(false);
  const [VisibleQmcContainer, setVisibleQmcContainer] = useState(false);
  const [GetYearProps, setGetYearProps] = useState([]);
  const [GroupesPermut, setGroupesPermut] = useState([]);
  const [ShowGroupePermExternat, setShowGroupePermExternat] = useState(true);
  const isParticipateAdmin = UserService.isParticipateAdmin();
  let navigateHome = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  //********************************************* ******************/
  //***************show descr***************************************** */
  const qcmIdPropsQcmDesc = useSignal("");
  const [ShowDescQcm, setShowDescQcm] = useState(false);
  const [ShowVerifierRpnsBtn, setShowVerifierRpnsBtn] = useState(true);
  const [ShowDescRpnsBtn, setShowDescRpnsBtn] = useState(false);
  const saveCaseCliniqueIndex = useSignal([]);
  const qcmNumberOfClinique = useSignal([]);
  let saveQcmIndex = useSignal([]);
  const [clickedVrfBtn, setCickedVrfBtn] = useState(false);
  const incrtValue = useSignal(0);
  const saveIncrValueOfeachClinique = useSignal([]);

  const [ModalDeleteCliniqueIsOpen, setModalDeleteCliniqueIsOpen] =
    useState(false);
  const currentCasCliniqueId = useSignal("");
  const getTrueFullInsertClr = useSignal(false);
  const [ModalDeleteQcmCliniqueIsOpen, setModalDeleteQcmCliniqueIsOpen] =
    useState(false);
  const currentQcmCasCliniqueId = useSignal("");
  //******************************************************************** */
  const saveAllCasClinique = useSignal([]);
  const donePropoShow = useSignal(true);
  let incCour = useSignal(0);

  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************************* */
  const saveCurrentSelet = useSignal([]);
  //*****responde all ***********************************************// */
  const [IsRepondeAll, setIsRepondeAll] = useState(true);
  const IsRepondeAllSignal = useSignal(true);
  const [ModalDoneQuizIsOpen, setModalDoneQuizIsOpen] = useState(false);
  const [ShowNoSelectPropoMessage, setShowNoSelectPropoMessage] =
    useState(false);
  const IsRepondeAllSignalQcm = useSignal(true);
  let SaveQcmIsAnsw = useSignal([]);
  const getSavVal = useSignal([]);
  //****************************************************************** */
  //***********description methodes********************************************************* */
  const waliss = "";
  //*****description variable********************** */
  const [file, setFile] = useState();
  const [fileEdite, setFileEdite] = useState();
  const [fileDisplay, setFileDisplay] = useState();
  const [FileDisplayEdite, setFileDisplayEdite] = useState("");
  const [LoadImage, setLoadImage] = useState("");
  const [description, setDescription] = useState("");
  const getFullDesc = useSignal();
  const [VisisbleDescUpdate, setVisisbleDescUpdate] = useState(false);
  const [visisbleDescInsert, setvisisbleDescInsert] = useState(false);
  const [FullDescEdite, setFullDescEdite] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmStandard: {},
  });
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const qcmIddelete = useSignal("");
  const currentQcmIdOfPropo = useSignal("");
  let clnqIdexeCurrent = useSignal(0);
  let indexCurrentCalinique = useSignal(0);

  //****save propo selected******************************************* */
  let [savePropositionsClinique, setSavePropositionsClinique] = useState([]);
  let saveCurrentPropo = [];
  let saveCurrentVerifier = [];
  let saveCurrentQcmIsAnswer = [];
  let saveCurrentPecentage = [];

  let saveCurrentVerifierAll = [];
  let saveCurrentCorretAnswer = [];
  let saveIsClickedCounter = [];
  const [SaveVerfieReponsesClinique, setSaveVerfieReponsesClinique] = useState(
    []
  );
  let saveCurrentQcmIsAnswr = useSignal([]);
  let saveCurrentVerRep = useSignal([]);
  let saveCurrentVerRepAll = useSignal([]);
  let saveCurrentPecentagefinal = useSignal([]);
  let saveCurrentCurrentCorretAnswer = useSignal([]);
  let saveCurrentIsClickedCounter = useSignal([]);

  let incClinique = useSignal(0);
  const doneGetAllClinique = useSignal(false);
  const doneFirstUplaod = useSignal(false);
  const saveCurrentQcms = useSignal([]);
  const saveCurrentClinique = useSignal([]);
  const [
    SaveClickSelectVerfieAllClinique,
    setSaveClickSelectVerfieAllClinique,
  ] = useState([]);
  let [SaveQcmIsAnswerClinique, setSaveQcmIsAnswerClinique] = useState([]);
  const [SelectcasCliniqueIndex, setSelectcasCliniqueIndex] = useState("");
  let [CasCliniqueClicked, setCasCliniqueClicked] = useState("");
  let [saveDoneLoadQcmsCasClinique, setSaveDoneLoadQcmsCasClinique] = useState(
    []
  );
  const [SaveCorrectAnswerClinique, setSaveCorrectAnswerClinique] = useState(
    []
  );
  const [SaveIsClickedCounterClinique, setSaveIsClickedCounterClinique] =
    useState([]);
  let saveLastCliniqueOpenIndex = useSignal(0);
  const [ShowListQcms, setShowListQcms] = useState(false);
  //******percentage************************************** */
  const saveAllCouentSelect = useSignal([]);
  let [SavePercentageCliniqueAmount, setSavePercentageCliniqueAmount] =
    useState([]);
  let saveCurrentAmount = [];
  //********************************************************* */
  //**********fin propo selected************************************* */
  //**timer*********************************************************** */
  let {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });
  const [ShowPlayBtn, setShowPlayBtn] = useState(false);
  const [ShowPauseBtn, setShowPauseBtn] = useState(true);
  //****************************************************************** */
  //*******save cas clinique******************************************** */
  const saveUserCasClinique = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };

  const [SaveCasCliniqueQuizz, setSaveCasCliniqueQuizz] = useState({
    nameCasCliniqueQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
    playListe: {},
    ourUsers: {},
  });
  const [SaveCasCliniqueSession, setSaveCasCliniqueSession] = useState({
    nameCasCliniqueSession: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
    ourUsers: {},
  });

  const [SaveQcmCasCliniqueQuizz, setSaveQcmCasCliniqueQuizz] = useState({
    nameQcmCasCliniqueQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    existeCasClinique: "",
    doneGetAllClinique: "",

    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
    playListe: {},
    ourUsers: {},
  });
  const [SaveQcmCasCliniqueSession, setSaveQcmCasCliniqueSession] = useState({
    nameQcmCasCliniqueSession: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    existeCasClinique: "",
    doneGetAllClinique: "",

    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
    ourUsers: {},
  });

  const doneFirstUplaodSaveQcm = useSignal(false);
  const [ModalSaveQuizzIsOpen, setModalSaveQuizzIsOpen] = useState(false);
  let [casCliniqueQuizzName, setCasCliniqueQuizzName] = useState("");

  let [showSaveCasCliniqueBtn, setShowSaveCasCliniqueBtn] = useState(false);
  let [showUpdateCasCliniqueBtn, setShowUpdateCasCliniqueBtn] = useState(false);
  let [showSaveQcmCasCliniqueBtn, setShowSaveQcmCasCliniqueBtn] =
    useState(false);
  let [showUpdateQcmCasCliniqueBtn, setShowUpdateQcmCasCliniqueBtn] =
    useState(false);
  let [showSaveSessionCasCliniqueBtn, setShowSaveSessionCasCliniqueBtn] =
    useState(false);
  let [showUpdateSessionCasCliniqueBtn, setShowUpdateSessionCasCliniqueBtn] =
    useState(false);
  let [showSaveSessionQcmCasCliniqueBtn, setShowSaveSessionQcmCasCliniqueBtn] =
    useState(false);
  let [
    showUpdateSessionQcmCasCliniqueBtn,
    setShowUpdateSessionQcmCasCliniqueBtn,
  ] = useState(false);

  let isPassQcmClinique = useSignal(true);
  const [veriferAllreponseClicked, setVeriferAllreponseClicked] =
    useState(false);
  const [ShowModelActionsPhone, setShowModelActionsPhone] = useState(false);

  //****update qcmquizz************************************** */
  const [updateCasCliniqueQuizz, setUpdateCasCliniqueQuizz] = useState({
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
  });
  //********************************************************** */
  //****update qcmquizz************************************** */
  const [updateQcmCasCliniqueQuizz, setUpdateQcmCasCliniqueQuizz] = useState({
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",

    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
    saveCorrectAnswerClinique: "",
    saveIsClickedCounterClinique: "",
    savePieStatiqueClinique: "",
    saveEachLineStatiqueClinique: "",
  });
  //********************************************************** */
  const [ShowCancelQuizzPhone, setShowCancelQuizzPhone] = useState(false);
  //************************************************************************ */
  const disableCopyPaste = (e) => {
    e.preventDefault();
  };
  //*********************************************************************** */

  //******Statique**************************************** */
  const [ShowModalStatique, setShowModalStatique] = useState(false);
  const [ShowModalStatiqueParCour, setShowModalStatiqueParCour] =
    useState(false);
  const [ShowModalStatiqueParSujet, setShowModalStatiqueParSujet] =
    useState(false);
  const [savePieStatiqueClinique, setSavePieStatiqueClinique] = useState([
    0, 0, 0,
  ]);
  const [SaveQcmsNbrStatiqueClinique, setSaveQcmsNbrStatiqueClinique] =
    useState([]);
  const [
    SaveQcmsCourNameStatiqueClinique,
    setSaveQcmsCourNameStatiqueClinique,
  ] = useState([]);
  const [SaveEachLineStatiqueClinique, setSaveEachLineStatiqueClinique] =
    useState([]);
  const newStateEachLineStatiqueClinique = [];
  let AllNbrQcmsOfCourEachCasCliniqe = useSignal(0);
  let saveCountAllQcmsClinique = useSignal(0);
  let dounateDataQcms = [];
  let saveAllNumberCasClinique = useSignal(0);

  //******************************************************************* */
  const [visibleNoteQcm, setVisibleNoteQcm] = useState(false);
  const [QcmIdNote, setQcmIdNote] = useState("");
  let qcmIdChatGptDeepSeek = useSignal("");
  const [showChatGpt, setShowChatGpt] = useState(false);
  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    const fullDescResult = await axios.get(
      `https://goatqcm-instance.com/fulldesc/clinique/descqcm/${qcmId}`
    );

    console.log(fullDescResult.data);
    if (fullDescResult.data !== null) {
      setFullDescEdite(fullDescResult.data);
      setFileDisplayEdite(
        `https://goatqcm-instance.com/image/clinique/${qcmId}/${fullDescResult.data.imageName}`
      );

      setLoadImage(fullDescResult.data);
      setvisisbleDescInsert(false);
      setVisisbleDescUpdate(true);
      setFileDisplay(false);
    } else {
      setvisisbleDescInsert(true);
      setVisisbleDescUpdate(false);
    }
    //getFullDesc.value = fullDescResult.data;
  };
  //******************************************* */
  ///*****update image************************************** */
  const UpdateImage = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(
        `https://goatqcm-instance.com/image/clinique/updateimage/${qcmId}`,
        formData
      )
      .then((res) => {
        toast.success("Succes Editing");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  ///*****update description************************************** */
  const UpdateDesc = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("desc", FullDescEdite.qcmDescription);
    await axios
      .put(
        `https://goatqcm-instance.com/image/clinique/updatedesc/${qcmId}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
        toast.success("Succes Editing");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  //***store image to database*************************** */
  const AjouterImage = async (qcmId) => {
    testDescExsite(qcmId);

    const result = await axios.get(`${BASE_URL}/qcmsclinique/${qcmId}`);
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    formData.append("image", file);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post(
        "https://goatqcm-instance.com/image/clinique/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Image Commentaire inseré avec succes");
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //***store description to database*************************** */
  const AjouterDesc = async (qcmId) => {
    testDescExsite(qcmId);
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmsclinique/${qcmId}`
    );
    console.log(result.data);
    const formData = new FormData();
    formData.append("desc", description);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/clinique/uploadesc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Commentaire inseré avec succes");
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (qcmId) => {
    qcmIddelete.value = qcmId;
    setModalDeleteCourIsOpen(true);
    setVisisbleDescUpdate(false);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  //****description******************************************************************* */
  const handeldescription = async (qcmId) => {
    qcmIdPropsQcmDesc.value = qcmId;
    setShowDescQcm(true);
  };
  //*********************************************************************************** */
  ////////////////////////////////////////////////////////////////////////////
  //*****end of description methods**************************************************************************** */
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }
  /**share screen variable********************************************************* */
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [chatroom, setChatroom] = useState("default");
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  let isToggled = localStorage.getItem("isSharingState");
  let shareScreenCode = localStorage.getItem("codeSharingCode");
  let firstCallClear = false;
  let saveUser = {
    name: "",
  };
  /**share screen variable********************************************************* */
  useEffect(() => {
    /**share screen **************************************************************************** */
    console.log(isToggled);
    console.log(shareScreenCode);
    //********************************************************************************************* */
    console.log(localStorage.getItem("lastSessionId"));
    console.log(localStorage.getItem("fullSessionsListeLength"));
    //for timer**************************
    localStorage.setItem("passQcmCasClinique", true);
    //**************************************** */

    console.log(localStorage.getItem("DoneClinqueShow"));
    console.log(props.doneGetAllClinique);
    //document.onmousedown = killCopy;

    console.log(props.minYearQcm);
    console.log(props.maxYearQcm);
    setTrueFullInsertClrClinique(props.showAllReponses);
    console.log(props.QcmSujetTypeSelected);
    console.log(props.minMaxYearParSujetsFinal);
    console.log(props.getYear);
    console.log(props.getGroupePerm);
    console.log(props.SelectedSourceExmn);
    if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        setVisibleParSujet(true);
        //setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        loadCasClinique();
        setVisibleQmcContainer(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Cour") {
      console.log("par coursss");
      setVisibleParSujet(false);
      setVisibleQmcContainer(true);
      loadCasClinique();
    }

    if (props.SelectedSourceExmn === "Résidanat Blida") {
      setShowGroupePermExternat(false);
    }
    if (props.qcmType === "Cas Clinique") {
      setShowGroupePermExternat(true);
    }

    //Qcms State*****************************************************
    console.log("Qcms State**");
    console.log(props.SaveCorrectAnswer);
    console.log(props.SaveIsClickedCounter);
    console.log(props.savePieStatique);
    console.log(props.SaveQcmsCourNameStatique);
    console.log(props.SaveEachLineStatique);
    //**statique qcm dounat*************************************************
    if (props.savePieStatique !== undefined) {
      dounateDataQcms = props.SaveEachLineStatique.map((row, index) => ({
        labels: ["vrai", "faut", "pas répondu"],
        datasets: [
          {
            label: "Cours Statique",
            data: [
              props.SaveEachLineStatique[index][0],
              props.SaveEachLineStatique[index][1],
              props.nbrAllQclStatique -
                (props.SaveEachLineStatique[index][0] +
                  props.SaveEachLineStatique[index][1]),
            ],
            backgroundColor: [
              "rgb(255, 206, 86,0.9)",
              "rgb(255, 99, 132,0.9)",
              "rgb(75, 192, 192,0.9)",
            ],
            borderColor: [
              "rgb(255, 206, 86,0.9)",
              "rgb(255, 99, 132,0.9)",
              "rgb(75, 192, 192,0.9)",
            ],
            borderWidth: 1,
          },
        ],
      }));
    }
    // ********************************************************************* */
    //clinique State*****************************************************
    console.log("clinique State**");
    console.log(props.SaveCorrectAnswerClinique);
    console.log(props.SaveIsClickedCounterClinique);
    console.log(props.SaveEachLineStatiqueClinique);
    console.log(props.savePieStatiqueClinique);
    // loadProposition();
    if (firstCallClear === false) {
      clearChat();
      firstCallClear = true;
      console.log("kakaka");
    }

    getUserShare();

    fetch(`https://goatqcm-instance.com/chat/history/${shareScreenCode}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    const client = new Client({
      webSocketFactory: () => new SockJS("https://goatqcm-instance.com/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/messages/${shareScreenCode}`, (frame) => {
          const receivedMessage = JSON.parse(frame.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setConnected(false);
      setMessages([]);
    };
    /***************************************************************************************************/
  }, []);
  /**share screen effect******************************************************* */
  const [lastMessage, setLastMessage] = useState(null);
  const isCall = useRef(true); // stays true across renders
  const cameFrome = ["propoClicked", "useEffectCalling"];
  let [senderName, setSenderName] = useState("");
  const clearChat = async () => {
    try {
      setMessages([]);
      await fetch(
        `https://goatqcm-instance.com/chat/clear/${shareScreenCode}`,
        {
          method: "POST",
        }
      );
    } catch (Exception) {}
  };
  /***************************************************************************************/
  /***************************************************************************************/
  useEffect(() => {
    console.log("heyyyy");

    if (messages.length > 0) {
      setSenderName(messages[messages.length - 1].nickname);
      console.log(messages[messages.length - 1].nickname);
      console.log(nickname);
      if (messages[messages.length - 1].nickname !== nickname) {
        const latest = messages[messages.length - 1];
        setLastMessage(latest.content);
        console.log(latest.content);
        console.log(username);

        if (latest.content.startsWith("CliniqueIndex+")) {
          const indexClinique = latest.content.slice("CliniqueIndex+".length);
          console.log(indexClinique);
          handleNextClick({ value: indexClinique });
        } else if (latest.content.startsWith("CliniqueIndex-")) {
          const indexClinique = latest.content.slice("CliniqueIndex-".length);
          console.log(indexClinique);
          handlePrevClick({ value: indexClinique });
        } else if (latest.content.startsWith("CliniqueClickIndex")) {
          const indexClinique = latest.content.slice(
            "CliniqueClickIndex".length
          );
          console.log(indexClinique);
          handleItemClick({ casCliniqueIndex: indexClinique });
        } else if (latest.content.startsWith("QcmClickIndex")) {
          const indexQcmClinique = latest.content.slice("QcmClickIndex".length);
          console.log(indexQcmClinique);
          handlQcmClickNav({ indexqcmClnq: indexQcmClinique });
        } else {
          console.log("hruuu");
          const parsedArray = JSON.parse(latest.content);
          try {
            if (Array.isArray(parsedArray)) {
              const [
                VisibiliteCasCliniqueIndex,
                QcmIndex,
                indexPropofinal,
                propoId,
                qcmId,
                courName,
              ] = parsedArray;

              handlePropoClick(
                undefined,
                VisibiliteCasCliniqueIndex,
                QcmIndex,
                indexPropofinal,
                propoId,
                qcmId,
                courName,
                cameFrome[1]
              );
            }
          } catch (e) {
            console.error("Failed to parse content", e);
          }
        }
      }
    }
  }, [messages]);
  /**end share  screen effect******************************************************* */

  /********Share***************************************************/
  /*const loadShareUserId = async () => {
      try {
        const resultLoadChat = await axios.get(
          `http://localhost:8080/sharescreen/getbyuserid/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setIsToggled(resultLoadChat.data[0].isSharing);
        console.log(resultLoadChat.data[0].isSharing);
      } catch (Exception) {}
    };*/
  /**************************************************************** */
  //*********getUser************************************************** */
  const [usernameshare, setUserNameShare] = useState("");
  const getUserShare = async () => {
    console.log(userId);
    console.log(token);
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );

      (saveUser.name = resultUserFinal.name), console.log(saveUser);
      console.log(resultUserFinal.name);
      setNickname(resultUserFinal.name);
    } catch (Exception) {
      console.log("user not found");
    }
  };
  //*****************************************************************
  //******par sujet methodes****************************************** */
  //***get years props*************************** *****************************/
  function loadyearQcmsParSujet() {
    setGetYearProps(props.minMaxYearParSujetsFinal);
  }
  //*************************************************************************** */
  //*****par sujets Methodes********************************************************* */
  const SelectYearHndlerChange = async (e) => {
    const getYear = document.getElementById("year").value;
    console.log(getYear);
    const result = await axios.get(
      `https://goatqcm-instance.com/casclinique/get_groupes_year/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
    );
    document.getElementById("groupepermutation").options[0].selected = true;
    setGroupesPermut(result.data);
    console.log(result.data);

    setVisibleQmcContainer(false);
    /*if (VisibiliteCasCliniqueIndex === ShowCasClinique.length) {
      VisibleNextBtn.value = false;
    } else if (VisibiliteCasCliniqueIndex < ShowCasClinique.length) {
      VisibleNextBtn.value = true;
    }*/
  };
  //********************************************************************************** */
  const SelectGroupePermHndlerChange = async (e) => {
    currentIndex.value = 0;
    // getCasClinique.value = [];
    setTrueFullInsertClrClinique(false);
    loadCasClinique();

    setVisibleQmcContainer(true);
  };

  //********************************************************************************** */
  //************************************************************************ */
  //**load cour***************************************************************
  const loadCasClinique = async (doneGetPropo) => {
    //***************************************************** */
    if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      VisiblePrevBtn.value = true;
    }

    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        doneGetPropo = true;
        donePropoShow.value = doneGetPropo;

        while (
          donePropoShow.value === true &&
          incCour.value < props.selectMultipleCours.length
        ) {
          if (incCour.value === props.selectMultipleCours.length - 1) {
            setShowCancelQuizzPhone(true);
          }
          /**inializer QcmsOfCourEachCasCliniqe for next cours qcms************************************ */
          AllNbrQcmsOfCourEachCasCliniqe.value = 0;
          console.log("get clinique of this cour");
          console.log(props.selectMultipleCours[incCour.value]);
          donePropoShow.value = false;
          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/cours/${
                props.selectMultipleCours[incCour.value]
              }/qcmsclinique/${props.minYearQcm}/${props.maxYearQcm}/${
                props.SelectedSourceExmn
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            saveAllCasClinique.value = result.data;

            // *************************************************************************************** */
          } catch {
            console.log("casClinique not find");
          }
          incCour.value = incCour.value + 1;
          console.log(saveAllCasClinique.value);
          if (saveAllCasClinique.value.length > 0) {
            //***satatique funtions********************************************************************
            //save nombre qcms ////////***************************************************** */
            setSaveQcmsCourNameStatiqueClinique((QcmsCourNameStatique) => [
              ...QcmsCourNameStatique,
              saveAllCasClinique.value[0].coursMed.coursName,
            ]);

            //***************************************************************************** */

            //***************************************************************************** */
            saveAllNumberCasClinique.value =
              saveAllNumberCasClinique.value + saveAllCasClinique.value.length;

            //*****nbr qcms of full cour************************************************************* *
            newStateEachLineStatiqueClinique.push([0, 0, 0]);
            setSaveEachLineStatiqueClinique(newStateEachLineStatiqueClinique);

            //****************************************************************************** */
            for (
              let incEachCasClinique = 0;
              incEachCasClinique < saveAllCasClinique.value.length;
              incEachCasClinique++
            ) {
              setShowCasClinique((casClinique) => [
                ...casClinique,
                saveAllCasClinique.value[incEachCasClinique],
              ]);

              getCasClinique.value[incFullCas.value] =
                saveAllCasClinique.value[incEachCasClinique];
              console.log();

              incFullCas.value = incFullCas.value + 1;

              if (incEachCasClinique === saveAllCasClinique.value.length - 1) {
                loadQcmsCasClinique();
              }
            }
          } else {
            if (incCour.value <= props.selectMultipleCours.length) {
              donePropoShow.value = true;
            }

            console.log("no clinique found");
          }
        }

        //******************************************** */
        if (getCasClinique.value.length === 1) {
          VisibleNextBtn.value = false;
        } else if (getCasClinique.value.length >= 1) {
          VisibleNextBtn.value = true;
        }
        //******************************************* */
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        //********cas clinique multiple cours************************ */
        doneGetPropo = true;
        donePropoShow.value = doneGetPropo;
        console.log(props.selectMultipleCours);
        //***set done upload all cas clinique*********************** */
        if (
          incCour.value === props.selectMultipleCours.length
          //|| localStorage.getItem("DoneClinqueShow") === true
        ) {
          //localStorage.setItem("DoneClinqueShow", true);
          doneGetAllClinique.value = true;
        }
        //***done upload cas clinique******************************** */
        while (
          donePropoShow.value === true &&
          incCour.value < props.selectMultipleCours.length
        ) {
          if (incCour.value === props.selectMultipleCours.length - 1) {
            //  console.log(incCours.value);
            setShowCancelQuizzPhone(true);
          }
          /**inializer QcmsOfCourEachCasCliniqe for next cours qcms************************************ */
          AllNbrQcmsOfCourEachCasCliniqe.value = 0;
          console.log("get clinique of this cour");
          console.log(props.selectMultipleCours);
          donePropoShow.value = false;

          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/cours/${
                props.selectMultipleCours[incCour.value]
              }/qcmsclinique/${props.minYearQcm}/${props.maxYearQcm}/${
                props.SelectedSourceExmn
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            saveAllCasClinique.value = result.data;
          } catch {
            console.log("casClinique not find");
          }

          incCour.value = incCour.value + 1;
          console.log(saveAllCasClinique.value);
          if (saveAllCasClinique.value.length > 0) {
            //***satatique funtions********************************************************************
            //save nombre qcms ////////***************************************************** */

            setSaveQcmsCourNameStatiqueClinique((QcmsCourNameStatique) => [
              ...QcmsCourNameStatique,
              saveAllCasClinique.value[0].coursMed.coursName,
            ]);
            saveAllNumberCasClinique.value =
              saveAllNumberCasClinique.value + saveAllCasClinique.value.length;

            if (props.doneGetAllClinique !== true) {
              newStateEachLineStatiqueClinique.push([0, 0, 0]);
              setSaveEachLineStatiqueClinique(newStateEachLineStatiqueClinique);
            }
            //******************************************************************************
            for (
              let incEachCasClinique = 0;
              incEachCasClinique < saveAllCasClinique.value.length;
              incEachCasClinique++
            ) {
              setShowCasClinique((casClinique) => [
                ...casClinique,
                saveAllCasClinique.value[incEachCasClinique],
              ]);

              getCasClinique.value[incFullCas.value] =
                saveAllCasClinique.value[incEachCasClinique];
              console.log();

              incFullCas.value = incFullCas.value + 1;

              if (incEachCasClinique === saveAllCasClinique.value.length - 1) {
                loadQcmsCasClinique();
              }
            }
          } else {
            if (incCour.value <= props.selectMultipleCours.length) {
              donePropoShow.value = true;
            }

            console.log("no clinique found");
          }
        }

        //******************************************** */
        if (getCasClinique.value.length === 1) {
          VisibleNextBtn.value = false;
        } else if (getCasClinique.value.length >= 1) {
          VisibleNextBtn.value = true;
        }
        //******************************************* */
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        const getCurrentGroupePerm =
          document.getElementById("groupepermutation").value;
        const getCurrentYear = document.getElementById("year").value;
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
          );

          setShowCasClinique([]);
          setShowPorposition([]);
          // setShowQcm([]);
          setVisibiliteCasCliniqueIndex(0);
          setQcmIndex(0);

          getCasClinique.value = result.data;
          setShowCasClinique(getCasClinique.value);
          console.log(getCasClinique.value);
          console.log(getCasClinique.value.length);

          if (getCasClinique.value.length === 1) {
            VisibleNextBtn.value = false;
            VisiblePrevBtn.value = false;
          } else if (getCasClinique.value.length > 1) {
            setVisibiliteCasCliniqueIndex(0);
            VisibleNextBtn.value = true;
          }

          loadQcmsCasClinique();
        } catch {
          console.log("casClinique not find");
        }
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        if (props.SelectedSourceExmn === "Externat Blida") {
          if (props.checkParSjtBiologieClinique === "CliniqueParSujet") {
            try {
              const result = await axios.get(
                `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
              );

              console.log(props.getYear);
              console.log(props.getGroupePerm);
              setShowCasClinique([]);
              setShowPorposition([]);
              // setShowQcm([]);
              setVisibiliteCasCliniqueIndex(0);
              setQcmIndex(0);

              getCasClinique.value = result.data;
              setShowCasClinique(getCasClinique.value);
              console.log(getCasClinique.value);
              console.log(getCasClinique.value.length);

              if (getCasClinique.value.length === 1) {
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getCasClinique.value.length > 1) {
                setVisibiliteCasCliniqueIndex(0);
                VisibleNextBtn.value = true;
              }

              loadQcmsCasClinique();
            } catch {
              console.log("casClinique not find");
            }
          } else if (props.checkParSjtBiologieClinique === "BiologieParSujet") {
            try {
              const result = await axios.get(
                `https://goatqcm-instance.com/casclinique/getcasclinique/biologie/${props.moduleId}/${props.getYear}/Biologie`
              );

              setShowCasClinique([]);
              setShowPorposition([]);
              // setShowQcm([]);
              setVisibiliteCasCliniqueIndex(0);
              setQcmIndex(0);

              getCasClinique.value = result.data;
              setShowCasClinique(getCasClinique.value);
              console.log(getCasClinique.value);
              console.log(getCasClinique.value.length);

              if (getCasClinique.value.length === 1) {
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getCasClinique.value.length > 1) {
                setVisibiliteCasCliniqueIndex(0);
                VisibleNextBtn.value = true;
              }

              loadQcmsCasClinique();
            } catch {
              console.log("casClinique not find");
            }
          }
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
            );
            console.log(props.getYear);
            console.log(props.getGroupePerm);
            setShowCasClinique([]);
            setShowPorposition([]);
            // setShowQcm([]);
            setVisibiliteCasCliniqueIndex(0);
            setQcmIndex(0);

            getCasClinique.value = result.data;
            setShowCasClinique(getCasClinique.value);
            console.log(getCasClinique.value);
            console.log(getCasClinique.value.length);

            if (getCasClinique.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = true;
            } else if (getCasClinique.value.length > 1) {
              setVisibiliteCasCliniqueIndex(0);
              VisibleNextBtn.value = true;
            }

            loadQcmsCasClinique();
          } catch {
            console.log("casClinique not find");
          }
        }
      }
    }
  };
  //********************************************************************** */
  //**load Qcm***************************************************************
  const loadQcmsCasClinique = async () => {
    console.log(props.doneGetAllClinique);

    if (
      props.SaveQcmIsAnswerClinique !== null &&
      props.doneGetAllClinique === true &&
      doneFirstUplaod.value === false
    ) {
      doneFirstUplaod.value = true;
      console.log("la racinee");
      // if (props.SaveQcmIsAnswerClinique !== null) {
      setSavePropositionsClinique(props.savePropositionsClinique);
      setSaveVerfieReponsesClinique(props.SaveVerfieReponsesClinique);
      setSaveQcmIsAnswerClinique(props.SaveQcmIsAnswerClinique);
      setTrueFullInsertClrClinique(props.TrueFullInsertClrClinique);
      setSavePercentageCliniqueAmount(props.SavePercentageCliniqueAmount);
      setSaveClickSelectVerfieAllClinique(
        props.SaveClickSelectVerfieAllClinique
      );
      //clinique State*****************************************************
      setSaveCorrectAnswerClinique(props.SaveCorrectAnswerClinique);
      setSaveIsClickedCounterClinique(props.SaveIsClickedCounterClinique);
      setSavePieStatiqueClinique(props.savePieStatiqueClinique);
      setSaveEachLineStatiqueClinique(props.SaveEachLineStatiqueClinique);
      //}
    }
    console.log(props.SaveQcmIsAnswerClinique);

    if (
      props.commingFrom === "savequizz" &&
      doneFirstUplaodSaveQcm.value === false &&
      props.SaveQcmIsAnswerClinique !== null
    ) {
      doneFirstUplaodSaveQcm.value = true;
      console.log(props.savePropositionsClinique);
      console.log(props.SaveVerfieReponsesClinique);
      console.log(props.SavePercentageCliniqueAmount);
      console.log(props.SaveClickSelectVerfieAllClinique);
      console.log(props.SaveQcmIsAnswerClinique);

      setSavePropositionsClinique(props.savePropositionsClinique);
      setSaveVerfieReponsesClinique(props.SaveVerfieReponsesClinique);
      setSaveQcmIsAnswerClinique(props.SaveQcmIsAnswerClinique);
      setSavePercentageCliniqueAmount(props.SavePercentageCliniqueAmount);
      setSaveClickSelectVerfieAllClinique(
        props.SaveClickSelectVerfieAllClinique
      );

      //clinique State*****************************************************

      setSaveCorrectAnswerClinique(props.SaveCorrectAnswerClinique);
      setSaveIsClickedCounterClinique(props.SaveIsClickedCounterClinique);
      setSavePieStatiqueClinique(props.savePieStatiqueClinique);
      setSaveEachLineStatiqueClinique(props.SaveEachLineStatiqueClinique);
      console.log("is nut null yes");

      //********************************************************************
    } else if (
      props.commingFrom === "savesession" &&
      doneFirstUplaodSaveQcm.value === false &&
      props.SaveQcmIsAnswerClinique !== null
    ) {
      doneFirstUplaodSaveQcm.value = true;
      console.log(props.savePropositionsClinique);
      console.log(props.SaveVerfieReponsesClinique);
      console.log(props.SavePercentageCliniqueAmount);
      console.log(props.SaveClickSelectVerfieAllClinique);
      console.log(props.SaveQcmIsAnswerClinique);

      setSavePropositionsClinique(props.savePropositionsClinique);
      setSaveVerfieReponsesClinique(props.SaveVerfieReponsesClinique);
      setSaveQcmIsAnswerClinique(props.SaveQcmIsAnswerClinique);
      setSavePercentageCliniqueAmount(props.SavePercentageCliniqueAmount);
      setSaveClickSelectVerfieAllClinique(
        props.SaveClickSelectVerfieAllClinique
      );

      //clinique State******en miniscul psk te3 savequizz***********************

      setSaveCorrectAnswerClinique(props.SaveCorrectAnswerClinique);
      setSaveIsClickedCounterClinique(props.SaveIsClickedCounterClinique);
      setSavePieStatiqueClinique(props.savePieStatiqueClinique);
      setSaveEachLineStatiqueClinique(props.SaveEachLineStatiqueClinique);

      //********************************************************************
    }

    if (props.QcmSujetTypeSelected === "Par Cour") {
      console.log(getCasClinique.value.length);

      for (
        let clnqIdex = clnqIdexeCurrent.value;
        clnqIdex < getCasClinique.value.length;
        clnqIdex++
      ) {
        //***initlaiszation************************************** */
        saveCurrentVerifier = [];
        saveCurrentVerifierAll = [];
        saveCurrentQcmIsAnswer = [];
        saveCurrentPecentage = [];
        saveCurrentCorretAnswer = [];
        saveIsClickedCounter = [];
        //********************************************************* */
        const result = await axios.get(
          `https://goatqcm-instance.com/casclinique/${getCasClinique.value[clnqIdex].id}/qcms`
        );
        /***save kaml les qcms d'un seule cour***hada yetenesializa chq iteration de cour a 0************** */
        AllNbrQcmsOfCourEachCasCliniqe.value =
          AllNbrQcmsOfCourEachCasCliniqe.value + result.data.length;
        //************************************************************************************************ */
        //***get all Qcms of all Cours*********hada no************************ */
        saveCountAllQcmsClinique.value =
          saveCountAllQcmsClinique.value + result.data.length;
        //****************************************************************** */
        qcmNumberOfClinique.value[clnqIdex] = result.data.length;
        console.log(qcmNumberOfClinique.value[clnqIdex]);
        getQcms.value[clnqIdex] = result.data;
        setShowQcm((qcm) => [...qcm, getQcms.value[clnqIdex]]);
        //*******comming from save quizz***************************************** */
        if (!props.doneGetAllClinique) {
          //**statique************************************************************ */
          if (props.savePieStatiqueClinique === null) {
            getQcms.value[clnqIdex].forEach((element, index) => {
              saveCurrentCorretAnswer[index] = "";
              saveIsClickedCounter[index] = 0;
            });
            saveCurrentCurrentCorretAnswer.value[clnqIdex] =
              saveCurrentCorretAnswer;
            saveCurrentIsClickedCounter.value[clnqIdex] = saveIsClickedCounter;
            setSaveCorrectAnswerClinique(saveCurrentCurrentCorretAnswer.value);
            setSaveIsClickedCounterClinique(saveCurrentIsClickedCounter.value);
          }
          //************************************************************************************ */
          console.log("hey nanaodd");
          if (
            props.commingFrom === "quizz" ||
            props.SaveQcmIsAnswerClinique === null
          ) {
            console.log("hey nanao");
            getQcms.value[clnqIdex].forEach((element, index) => {
              saveCurrentVerifier[index] = "";
              saveCurrentVerifierAll[index] = "";
              saveCurrentQcmIsAnswer[index] = "";
              saveCurrentPecentage[index] = "";
              saveCurrentCorretAnswer[index] = "";
              saveIsClickedCounter[index] = 0;
            });

            saveCurrentVerRep.value[clnqIdex] = saveCurrentVerifier;
            saveCurrentVerRepAll.value[clnqIdex] = saveCurrentVerifierAll;
            saveCurrentQcmIsAnswr.value[clnqIdex] = saveCurrentQcmIsAnswer;
            saveCurrentPecentagefinal.value[clnqIdex] = saveCurrentPecentage;
            saveCurrentCurrentCorretAnswer.value[clnqIdex] =
              saveCurrentCorretAnswer;
            saveCurrentIsClickedCounter.value[clnqIdex] = saveIsClickedCounter;
            setSaveVerfieReponsesClinique(saveCurrentVerRep.value);
            setSaveClickSelectVerfieAllClinique(saveCurrentVerRepAll.value);
            setSaveQcmIsAnswerClinique(saveCurrentQcmIsAnswr.value);
            setSavePercentageCliniqueAmount(saveCurrentPecentagefinal.value);
            setSaveCorrectAnswerClinique(saveCurrentCurrentCorretAnswer.value);
            setSaveIsClickedCounterClinique(saveCurrentIsClickedCounter.value);
          }
        }
        //********done save empty propo***************************** */
        if (clnqIdex === getCasClinique.value.length - 1) {
          console.log("done upload qcmss");
          clnqIdexeCurrent.value = getCasClinique.value.length;
          loadProposition();
          setSaveDoneLoadQcmsCasClinique([
            ...saveDoneLoadQcmsCasClinique,
            true,
          ]);
        }
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      for (
        let clnqIdex = 0;
        clnqIdex < getCasClinique.value.length;
        clnqIdex++
      ) {
        //***initlaiszation************************************** */
        saveCurrentVerifier = [];
        saveCurrentVerifierAll = [];
        saveCurrentQcmIsAnswer = [];
        saveCurrentPecentage = [];
        //********************************************************* */
        const result = await axios.get(
          `https://goatqcm-instance.com/casclinique/${getCasClinique.value[clnqIdex].id}/qcms`
        );
        /***save kaml les qcms d'un seule cour***hada yetenesializa chq iteration de cour a 0************** */
        AllNbrQcmsOfCourEachCasCliniqe.value =
          AllNbrQcmsOfCourEachCasCliniqe.value + result.data.length;
        //************************************************************************************************ */
        //***get all Qcms of all Cours*********hada no************************ */
        saveCountAllQcmsClinique.value =
          saveCountAllQcmsClinique.value + result.data.length;
        //****************************************************************** */
        qcmNumberOfClinique.value[clnqIdex] = result.data.length;
        console.log(qcmNumberOfClinique.value[clnqIdex]);
        getQcms.value[clnqIdex] = result.data;
        setShowQcm((qcm) => [...qcm, getQcms.value[clnqIdex]]);
        if (!props.doneGetAllClinique) {
          //****verifier reponses******************************** */
          getQcms.value[clnqIdex].forEach((element, index) => {
            saveCurrentVerifier[index] = "";
            saveCurrentVerifierAll[index] = "";
            saveCurrentQcmIsAnswer[index] = "";
            saveCurrentPecentage[index] = "";
            saveCurrentCorretAnswer[index] = "";
            saveIsClickedCounter[index] = 0;
          });

          saveCurrentVerRep.value[clnqIdex] = saveCurrentVerifier;
          saveCurrentVerRepAll.value[clnqIdex] = saveCurrentVerifierAll;
          saveCurrentQcmIsAnswr.value[clnqIdex] = saveCurrentQcmIsAnswer;
          saveCurrentPecentagefinal.value[clnqIdex] = saveCurrentPecentage;
          saveCurrentCurrentCorretAnswer.value[clnqIdex] =
            saveCurrentCorretAnswer;
          saveCurrentIsClickedCounter.value[clnqIdex] = saveIsClickedCounter;

          setSaveVerfieReponsesClinique(saveCurrentVerRep.value);
          setSaveClickSelectVerfieAllClinique(saveCurrentVerRepAll.value);
          setSaveQcmIsAnswerClinique(saveCurrentQcmIsAnswr.value);
          setSavePercentageCliniqueAmount(saveCurrentPecentagefinal.value);
          setSaveCorrectAnswerClinique(saveCurrentCurrentCorretAnswer.value);
          setSaveIsClickedCounterClinique(saveCurrentIsClickedCounter.value);
        }
        //********done save empty propo***************************** */
      }
      console.log(getQcms.value);
      //setShowQcm(getQcms.value);
      console.log(getQcms.value);
      loadProposition();
    }
  };
  //********************************************************************** */
  //**load Proposition***************************************************************
  const loadProposition = async () => {
    saveCurrentQcms.value = [];
    //save nombre qcms ////////*************psk y9ra cas clinique apres qcms t3hm bah ybda les propo*********************** */
    setSaveQcmsNbrStatiqueClinique((QcmsNbrStatique) => [
      ...QcmsNbrStatique,
      AllNbrQcmsOfCourEachCasCliniqe.value,
    ]);

    //************************************************************************************************************************* */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      for (
        let clncIdex = indexCurrentCalinique.value;
        clncIdex < getCasClinique.value.length;
        clncIdex++
      ) {
        saveCurrentClinique.value[clncIdex] = [];

        for (
          let qcmIndex = 0;
          qcmIndex < getQcms.value[clncIdex].length;
          qcmIndex++
        ) {
          await axios
            .get(
              `https://goatqcm-instance.com/qcmsclinique/${getQcms.value[clncIdex][qcmIndex].id}/reponsesqcmClinique`
            )
            .then((result) => {
              //getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              //****fill **********************************************/
              console.log(props.doneGetAllClinique);
              if (!props.doneGetAllClinique) {
                saveCurrentPropo = [];
                result.data.forEach((element, index) => {
                  saveCurrentPropo[index] = "";
                });
              }

              //******************************************************** */
              console.log("fin get propo");
            });
          //***********save empty propo ****************************************** */
          if (!props.doneGetAllClinique) {
            saveCurrentClinique.value[clncIdex].push(saveCurrentPropo);

            if (qcmIndex === getQcms.value[clncIdex].length - 1) {
              console.log("meme length");
              setSavePropositionsClinique((prevState) => [
                ...prevState,
                saveCurrentClinique.value[clncIdex],
              ]);
            }
          }
        }

        setShowPorposition((p) => [...p, getQcms.value[clncIdex]]);
        if (clncIdex === getCasClinique.value.length - 1) {
          console.log("done upload qcmss");
          console.log("done upload qcmss");
          indexCurrentCalinique.value = getCasClinique.value.length;
          const doneLoadPropo = true;
          loadCasClinique(doneLoadPropo);
          setShowCancelQuizzPhone(true);
          //*****save quizz**************************************** */
          if (props.qcmType === "Cas Clinique") {
            if (props.commingFrom === "quizz") {
              setShowSaveCasCliniqueBtn(true);
              setShowUpdateCasCliniqueBtn(false);
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(false);
              setShowSaveSessionCasCliniqueBtn(true);
              setShowUpdateSessionCasCliniqueBtn(false);
              setShowSaveSessionQcmCasCliniqueBtn(false);
              setShowUpdateSessionQcmCasCliniqueBtn(false);
            } else if (props.commingFrom === "savequizz") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(true);
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(false);
              setShowSaveSessionCasCliniqueBtn(false);
              setShowUpdateSessionCasCliniqueBtn(false);
              setShowSaveSessionQcmCasCliniqueBtn(false);
              setShowUpdateSessionQcmCasCliniqueBtn(false);
            } else if (props.commingFrom === "savesession") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(false);
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(false);
              setShowSaveSessionCasCliniqueBtn(false);
              setShowUpdateSessionCasCliniqueBtn(true);
              setShowSaveSessionQcmCasCliniqueBtn(false);
              setShowUpdateSessionQcmCasCliniqueBtn(false);
            }
          } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
            if (props.commingFrom === "quizz") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(false);
              setShowSaveQcmCasCliniqueBtn(true);
              setShowUpdateQcmCasCliniqueBtn(false);
              setShowSaveSessionCasCliniqueBtn(false);
              setShowUpdateSessionCasCliniqueBtn(false);
              setShowSaveSessionQcmCasCliniqueBtn(true);
              setShowUpdateSessionQcmCasCliniqueBtn(false);
            } else if (props.commingFrom === "savequizz") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(false);
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(true);
              setShowSaveSessionCasCliniqueBtn(false);
              setShowUpdateSessionCasCliniqueBtn(false);
              setShowSaveSessionQcmCasCliniqueBtn(false);
              setShowUpdateSessionQcmCasCliniqueBtn(false);
            } else if (props.commingFrom === "savesession") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(false);
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(false);
              setShowSaveSessionCasCliniqueBtn(false);
              setShowUpdateSessionCasCliniqueBtn(false);
              setShowSaveSessionQcmCasCliniqueBtn(false);
              setShowUpdateSessionQcmCasCliniqueBtn(true);
            }
          }
        }
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      for (
        let clncIdex = 0;
        clncIdex < getCasClinique.value.length;
        clncIdex++
      ) {
        saveCurrentClinique.value[clncIdex] = [];

        for (
          let qcmIndex = 0;
          qcmIndex < getQcms.value[clncIdex].length;
          qcmIndex++
        ) {
          await axios
            .get(
              `https://goatqcm-instance.com/qcmsclinique/${getQcms.value[clncIdex][qcmIndex].id}/reponsesqcmClinique`
            )
            .then((result) => {
              //getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              //****fill **********************************************/
              if (!props.doneGetAllClinique) {
                saveCurrentPropo = [];
                result.data.forEach((element, index) => {
                  saveCurrentPropo[index] = "";
                });
              }

              //******************************************************** */
              console.log("fin get propo done");
            });

          //***********save empty propo ****************************************** */
          if (!props.doneGetAllClinique) {
            saveCurrentClinique.value[clncIdex].push(saveCurrentPropo);
            if (qcmIndex === getQcms.value[clncIdex].length - 1) {
              console.log("meme length");
              setSavePropositionsClinique((prevState) => [
                ...prevState,
                saveCurrentClinique.value[clncIdex],
              ]);
            }
            //********done save empty propo***************************** */
          }
          /******done all***************************************************** */
        }
        setShowPorposition((p) => [...p, getQcms.value[clncIdex]]);
        //***set done upload all cas clinique*********************** */
        if (
          clncIdex ===
          getCasClinique.value.length - 1
          //||localStorage.getItem("DoneClinqueShow") === true
        ) {
          //localStorage.setItem("DoneClinqueShow", true);
          doneGetAllClinique.value = true;
        }
        //***done upload cas clinique******************************** */
      }
    }
  };
  //********************************************************************** */
  function handlePrevClick({ event, value } = {}) {
    /***share screen************************************************************ */
    if (event) {
      currentIndex.value = currentIndex.value - 1;
    } else {
      currentIndex.value = Number(value);
      console.log(currentIndex.value);
    }

    setVisibleNoteQcm(false);
    setShowChatGpt(false);
    setSelectcasCliniqueIndex(currentIndex.value);
    setVisibiliteCasCliniqueIndex(currentIndex.value);
    //setVisibilitePorpoIndex(currentIndex.value);
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "CliniqueIndex-" + currentIndex.value,
          };
          stompClient.publish({
            destination: `/app/chat/${shareScreenCode}`,
            body: JSON.stringify(chatMessage),
          });
          console.log(chatMessage.content);

          setMessage("");
        }
      }
    }
    /*********************************************************** */
    setQcmIndex(0);
    if (currentIndex.value === -1) {
      //**all statique********************************************************************************************** */
      if (props.QcmSujetTypeSelected === "Par Cour") {
        //update statique pie***************************************************************
        savePieStatiqueClinique[2] =
          saveCountAllQcmsClinique.value -
          (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
        console.log(savePieStatiqueClinique);
        //********************************************************************************* */
        //update statique dounate***************************************************************
        for (
          let index = 0;
          index < SaveQcmsCourNameStatiqueClinique.length;
          index++
        ) {
          SaveEachLineStatiqueClinique[index][2] =
            SaveQcmsNbrStatiqueClinique[index] -
            (SaveEachLineStatiqueClinique[index][0] +
              SaveEachLineStatiqueClinique[index][1]);
        }
        console.log(SaveEachLineStatiqueClinique);
        //********************************************************************************* */
        setShowModalStatique(true);
        setShowModalStatiqueParCour(true);
      } else if (props.QcmSujetTypeSelected === "Par Sujet") {
        //update statique pie***************************************************************
        savePieStatiqueClinique[2] =
          saveCountAllQcmsClinique.value -
          (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
        console.log(savePieStatiqueClinique);
        //*********************************************************************************
        setShowModalStatique(true);
        setShowModalStatiqueParSujet(true);
        //********************************************************************************* */
      }
      //**end all statique********************************************************************************************** */
      console.log(currentIndex.value);
      setOpenBoardQcm(true);
    }
    console.log(currentIndex.value);
    if (props.qcmType === "Cas Clinique") {
      if (currentIndex.value > 0) {
        VisiblePrevBtn.value = true;
      } else if (currentIndex.value === 0) {
        VisiblePrevBtn.value = false;
      }
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (currentIndex.value === 0) {
        VisiblePrevBtn.value = true;
        console.log(VisiblePrevBtn.value);
      }
    }
    setShowDescRpnsBtn(false);
    setShowVerifierRpnsBtn(true);
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check prevbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }
    setShowDescQcm(false);
    VisibleNextBtn.value = true;
    setvisisbleDescInsert(false);
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
    setFileDisplay("");
    setFileDisplayEdite("");
  }

  //************************************************************************* */
  function handleNextClick({ event, value } = {}) {
    setVisibleNoteQcm(false);
    setShowChatGpt(false);
    //saveIncrValueOfeachClinique.value[VisibiliteCasCliniqueIndex] = 0;

    /*if (
      saveIncrValueOfeachClinique.value[VisibiliteCasCliniqueIndex] ===
      qcmNumberOfClinique.value[VisibiliteCasCliniqueIndex]
    ) {*/
    incrtValue.value = 0;
    saveQcmIndex.value = [];
    /***share screen************************************************************ */
    if (event) {
      currentIndex.value = currentIndex.value + 1;
    } else {
      currentIndex.value = Number(value);
      console.log(currentIndex.value);
    }

    setSelectcasCliniqueIndex(currentIndex.value);
    setVisibiliteCasCliniqueIndex(currentIndex.value);
    setQcmIndex(0);
    console.log(currentIndex.value);
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "CliniqueIndex+" + currentIndex.value,
          };
          stompClient.publish({
            destination: `/app/chat/${shareScreenCode}`,
            body: JSON.stringify(chatMessage),
          });
          console.log(chatMessage.content);

          setMessage("");
        }
      }
    }
    if (currentIndex.value === ShowCasClinique.length - 1) {
      VisibleNextBtn.value = false;
    }
    VisiblePrevBtn.value = true;

    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
    setFileDisplay("");
    setFileDisplayEdite("");

    setShowDescRpnsBtn(false);
    setShowVerifierRpnsBtn(true);
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check nextbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }
    setShowDescQcm(false);

    /*} else {
      toast.error(
        "Il y a une question à laquelle vous n'avez pas répondu dans ce cas Clinique "
      );
    }*/
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
    //***drope down************************************** */

    try {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter(
          (clinique) => clinique !== saveLastCliniqueOpenIndex.value
        )
      );
    } catch (Exception) {
      console.log("not click yet");
    }
    if (CasCliniqueClicked[currentIndex.value] !== currentIndex.value) {
      setCasCliniqueClicked(currentIndex.value);
    } else if (CasCliniqueClicked === currentIndex.value) {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter((clinique) => clinique !== currentIndex.value)
      );
    }

    saveLastCliniqueOpenIndex.value = currentIndex.value;
  }
  //*************************************************************************** */

  //*********************************************************** */
  function handleItemClick({ event, casCliniqueIndex } = {}) {
    console.log(casCliniqueIndex);
    setQcmIndex(0);
    incrtValue.value = 0;
    saveQcmIndex.value = [];

    currentIndex.value = Number(casCliniqueIndex);
    console.log(currentIndex.value);

    //currentIndex.value = casCliniqueIndex;
    setSelectcasCliniqueIndex(currentIndex.value);
    console.log(currentIndex.value);
    setVisibiliteCasCliniqueIndex(currentIndex.value);
    VisiblePrevBtn.value = true;
    VisibleNextBtn.value = true;
    /***share screen************************************************************ */
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "CliniqueClickIndex" + currentIndex.value,
          };
          stompClient.publish({
            destination: `/app/chat/${shareScreenCode}`,
            body: JSON.stringify(chatMessage),
          });
          console.log(chatMessage.content);

          setMessage("");
        }
      }
    }
    /**************************************************************************** */
    if (currentIndex.value === ShowCasClinique.length - 1) {
      VisibleNextBtn.value = false;
      VisiblePrevBtn.value = true;
    } else if (currentIndex.value === 0) {
      if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        VisibleNextBtn.value = true;
        VisiblePrevBtn.value = true;
      } else {
        VisibleNextBtn.value = true;
        VisiblePrevBtn.value = false;
      }
    }
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check nextbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }

    //***drope down************************************** */

    try {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter(
          (clinique) => clinique !== saveLastCliniqueOpenIndex.value
        )
      );
    } catch (Exception) {
      console.log("not click yet");
    }
    if (CasCliniqueClicked[currentIndex.value] !== currentIndex.value) {
      setCasCliniqueClicked(currentIndex.value);
    } else if (CasCliniqueClicked === currentIndex.value) {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter((clinique) => clinique !== currentIndex.value)
      );
    }

    saveLastCliniqueOpenIndex.value = currentIndex.value;
  }
  //********************************************************* */
  //*********************************************************** */

  function handlQcmClickNav({ event, indexqcmClnq } = {}) {
    currentQcmIndex.value = Number(indexqcmClnq);
    console.log(currentQcmIndex.value);

    /***share screen************************************************************ */
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "QcmClickIndex" + currentQcmIndex.value,
          };
          stompClient.publish({
            destination: `/app/chat/${shareScreenCode}`,
            body: JSON.stringify(chatMessage),
          });
          console.log(chatMessage.content);

          setMessage("");
        }
      }
    }
    setQcmIndex(currentQcmIndex.value);
    setShowDescQcm(false);
    setVisibleNoteQcm(false);
    setShowChatGpt(false);
  }
  //******************************************************************** */
  //delete function cas cliqnieu*//////////////////////////////////////////////////////////
  const DeleteCasClinique = async (casCliniqueId) => {
    currentCasCliniqueId.value = casCliniqueId;
    setModalDeleteCliniqueIsOpen(true);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCliniqueIsOpen(false);
    setModalDeleteCourIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //delete function*//////////////////////////////////////////////////////////
  const DeleteQcmClinque = async (qcmId) => {
    currentQcmCasCliniqueId.value = qcmId;
    setModalDeleteQcmCliniqueIsOpen(true);
  };

  function closeDeleteqcmCliniqueModalHandler() {
    setModalDeleteQcmCliniqueIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //******************************************************************* */
  const handlePorpoClick = (e) => {
    console.log(savePropositionsClinique);

    console.log(SaveVerfieReponsesClinique);
    console.log(SaveQcmIsAnswerClinique);
    console.log(SavePercentageCliniqueAmount);
    console.log(SaveClickSelectVerfieAllClinique);
    console.log(SaveCorrectAnswerClinique); //save somme of all propo
    console.log(SaveIsClickedCounterClinique);
    console.log(saveCountAllQcmsClinique.value);

    //**all statique********************************************************************************************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      //update statique pie***************************************************************
      savePieStatiqueClinique[2] =
        saveCountAllQcmsClinique.value -
        (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
      console.log(savePieStatiqueClinique);
      //********************************************************************************* */
      //update statique dounate***************************************************************
      for (
        let index = 0;
        index < SaveQcmsCourNameStatiqueClinique.length;
        index++
      ) {
        SaveEachLineStatiqueClinique[index][2] =
          SaveQcmsNbrStatiqueClinique[index] -
          (SaveEachLineStatiqueClinique[index][0] +
            SaveEachLineStatiqueClinique[index][1]);
      }
      console.log(SaveEachLineStatiqueClinique);
      //********************************************************************************* */
      setShowModalStatique(true);
      setShowModalStatiqueParCour(true);
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      //update statique pie***************************************************************
      savePieStatiqueClinique[2] =
        saveCountAllQcmsClinique.value -
        (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
      console.log(savePieStatiqueClinique);
      //*********************************************************************************
      setShowModalStatique(true);
      setShowModalStatiqueParSujet(true);
      //********************************************************************************* */
      //**end all statique********************************************************************************************** */
    }
  };
  const pieChartData = {
    labels: ["vrai", "faut", "pas répondu"],
    datasets: [
      {
        label: "Quizz Statique",
        data: [
          props.savePieStatique
            ? props.savePieStatique[0] + savePieStatiqueClinique[0]
            : savePieStatiqueClinique[0],
          props.savePieStatique
            ? props.savePieStatique[1] + savePieStatiqueClinique[1]
            : savePieStatiqueClinique[1],
          props.savePieStatique
            ? props.savePieStatique[2] + savePieStatiqueClinique[2]
            : savePieStatiqueClinique[2],
        ],
        backgroundColor: [
          "rgb(37, 176, 233,0.9)",
          "rgb(193,159,203,0.9)",
          "rgb(244, 180, 234,0.9)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {};
  const barChartData = {
    labels: ["vrai", "faut", "pas répondu"],
    datasets: [
      {
        label: "Quizz Statique",
        data: [
          props.savePieStatique
            ? props.savePieStatique[0] + savePieStatiqueClinique[0]
            : savePieStatiqueClinique[0],
          props.savePieStatique
            ? props.savePieStatique[1] + savePieStatiqueClinique[1]
            : savePieStatiqueClinique[1],
          props.savePieStatique
            ? props.savePieStatique[2] + savePieStatiqueClinique[2]
            : savePieStatiqueClinique[2],
        ],
        backgroundColor: ["#8f85fb", "#c19fcb", "#f5e1fd"],
        borderColor: ["#8f85fb", "#c19fcb", "#f5e1fd"],

        borderWidth: 1,
      },
    ],
  };
  const optionsBar = {};

  const dounateData = SaveEachLineStatiqueClinique.map((row, index) => ({
    labels: ["vrai", "faut", "pas répondu"],
    datasets: [
      {
        label: "Cours Statique",
        data: [
          SaveEachLineStatiqueClinique[index][0],
          SaveEachLineStatiqueClinique[index][1],
          SaveQcmsNbrStatiqueClinique[index] -
            (SaveEachLineStatiqueClinique[index][0] +
              SaveEachLineStatiqueClinique[index][1]),
        ],
        backgroundColor: [
          "rgb(37, 176, 233,0.9)",
          "rgb(193,159,203,0.9)",
          "rgb(244, 180, 234,0.9)",
        ],
        borderColor: [
          "rgb(37, 176, 233,0.9)",
          "rgb(193,159,203,0.9)",
          "rgb(244, 180, 234,0.9)",
        ],
        borderWidth: 1,
      },
    ],
  }));

  const optionsDounate = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  //***handle propo click**************************************************** */
  const handlePropoClick = async (
    e,
    VisibiliteCasCliniqueIndex,
    QcmIndex,
    indexPropofinal,
    propoId,
    qcmId,
    courName,
    comingFrom
  ) => {
    if (e?.preventDefault) e.preventDefault();
    console.log(courName);
    if (isToggled === "true") {
      if (comingFrom === cameFrome[0]) {
        console.log("is click on propo");
        const propoParametres = [
          VisibiliteCasCliniqueIndex,
          QcmIndex,
          indexPropofinal,
          propoId,
          qcmId,
          courName,
        ];
        console.log(propoParametres);
        if (stompClient && connected) {
          const chatMessage = {
            nickname,

            content: JSON.stringify(propoParametres),
          };
          stompClient.publish({
            destination: `/app/chat/${shareScreenCode}`,
            body: JSON.stringify(chatMessage),
          });
          setMessage("");
        }
        // isCall.current = false;
      }
    }
    //save proposition selected &&ClickedCounter*********************************************************
    const updatedArraySavePropositionsClinique = savePropositionsClinique.map(
      (innerArray) => [...innerArray]
    );
    const updatedSaveIsClickedCounterClinique = [
      ...SaveIsClickedCounterClinique,
    ];
    if (
      updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ][indexPropofinal] !== propoId
    ) {
      updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ][indexPropofinal] = propoId;
      //****update counter click**************************************** */
      updatedSaveIsClickedCounterClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ] =
        updatedSaveIsClickedCounterClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ] + 1;
      console.log("+1");
    } else {
      updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ][indexPropofinal] = "";
      //****update counter click**************************************** */
      updatedSaveIsClickedCounterClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ] =
        updatedSaveIsClickedCounterClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ] - 1;
    }

    setSavePropositionsClinique(updatedArraySavePropositionsClinique);
    setSaveIsClickedCounterClinique(updatedSaveIsClickedCounterClinique);
    //*************************************************************************************************
    //**************function one propo at least is clicked in this qcm ***************************** */
    const updatedClickedVerefieAllClinique = [
      ...SaveClickSelectVerfieAllClinique,
    ];

    if (
      updatedSaveIsClickedCounterClinique[VisibiliteCasCliniqueIndex][
        QcmIndex
      ] === 0
    ) {
      updatedClickedVerefieAllClinique[VisibiliteCasCliniqueIndex][QcmIndex] =
        "";
    } else {
      updatedClickedVerefieAllClinique[VisibiliteCasCliniqueIndex][QcmIndex] =
        QcmIndex;
    }

    setSaveClickSelectVerfieAllClinique(updatedClickedVerefieAllClinique);

    //********************************************************************************************** */

    //****augmenter slect count******************************************** */
    await axios
      .put(
        `https://goatqcm-instance.com/reponses/countselectclinique/${propoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
    //************************************************************************* */

    //******get all selected click********************************************** */
    const result = await axios.get(
      `${BASE_URL}/qcmsclinique/${qcmId}/reponsesqcmClinique`
    );
    saveAllCouentSelect.value = result.data;
    saveCurrentAmount = [];
    saveAllCouentSelect.value.forEach((element, index) => {
      saveCurrentAmount[index] = saveAllCouentSelect.value[index].countSelect;
    });
    console.log(saveCurrentAmount);
    const sum = saveCurrentAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    //*************************************************************************** */
    //********update perentage array******************************************** */
    const updatedCalcAmountCountSelect = [...SavePercentageCliniqueAmount];
    updatedCalcAmountCountSelect[VisibiliteCasCliniqueIndex][QcmIndex] = sum;
    setSavePercentageCliniqueAmount(updatedCalcAmountCountSelect);
    //*************************************************************************** */
    /****statique function***************************************************** */
    console.log(result.data[indexPropofinal].reponseBoolClinique);
    if (props.QcmSujetTypeSelected === "Par Cour") {
      //get cour index**********************************************************
      let indexParcourCourName = 0;
      let SaveCourIndex = 0;
      let isFound = false;

      while (isFound !== true) {
        console.log(SaveQcmsCourNameStatiqueClinique[indexParcourCourName]);
        if (
          courName === SaveQcmsCourNameStatiqueClinique[indexParcourCourName]
        ) {
          SaveCourIndex = indexParcourCourName;
          isFound = true;
          console.log(SaveCourIndex);
        }
        indexParcourCourName++;
      }
      /*************************************************************************** */
      if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] === propoId &&
        result.data[indexPropofinal].reponseBoolClinique === true &&
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] !==
          false
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = true;
        console.log("true");
        //update full pie***********************************************
        setSavePieStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[0] = newState[0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
        //update EachLineStatique***********************************************
        setSaveEachLineStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[SaveCourIndex][0] = newState[SaveCourIndex][0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
      } else if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] === propoId &&
        result.data[indexPropofinal].reponseBoolClinique === false
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = false;
        console.log("false");
        //update full pie***********************************************
        setSavePieStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[1] = newState[1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
        //update EachLineStatique***********************************************
        setSaveEachLineStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[SaveCourIndex][1] = newState[SaveCourIndex][1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
      } else if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] !== propoId &&
        updatedClickedVerefieAllClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ] === ""
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = "";
        console.log("nothing");
        if (savePieStatiqueClinique[0] !== 0) {
          setSavePieStatiqueClinique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[0] = newState[0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //update EachLineStatique***********************************************
          setSaveEachLineStatiqueClinique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[SaveCourIndex][0] = newState[SaveCourIndex][0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //*************************************************************** */
        } else if (savePieStatiqueClinique[1] !== 0) {
          setSavePieStatiqueClinique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[1] = newState[1] - 1; // Modify the first index
            return newState; // Return the updated array
          });
        }
        //update EachLineStatique***********************************************
        setSaveEachLineStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[SaveCourIndex][1] = newState[SaveCourIndex][1] - 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
      }
      //************************************************************************* */
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] === propoId &&
        result.data[indexPropofinal].reponseBoolClinique === true &&
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] !==
          false
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = true;
        console.log("true");
        //update full pie***********************************************
        setSavePieStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[0] = newState[0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
      } else if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] === propoId &&
        result.data[indexPropofinal].reponseBoolClinique === false
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = false;
        console.log("false");
        //update full pie***********************************************
        setSavePieStatiqueClinique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[1] = newState[1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
      } else if (
        updatedArraySavePropositionsClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ][indexPropofinal] !== propoId &&
        updatedClickedVerefieAllClinique[VisibiliteCasCliniqueIndex][
          QcmIndex
        ] === ""
      ) {
        SaveCorrectAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = "";
        console.log("nothing");
        if (savePieStatiqueClinique[0] !== 0) {
          setSavePieStatiqueClinique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[0] = newState[0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
        } else if (savePieStatiqueClinique[1] !== 0) {
          setSavePieStatiqueClinique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[1] = newState[1] - 1; // Modify the first index
            return newState; // Return the updated array
          });
        }
      }
    }
  };

  //**handleClickiVerifieReponse****************************************** */
  const handleClickiVerifieReponse = (VisibiliteCasCliniqueIndex, QcmIndex) => {
    //**desc******************** */

    const updatedClickedVerefie = [...SaveVerfieReponsesClinique];
    updatedClickedVerefie[VisibiliteCasCliniqueIndex][QcmIndex] = QcmIndex;
    setSaveVerfieReponsesClinique(updatedClickedVerefie);

    //****qcm is awnswer******************************************** */
    const updatedQcmIsAnswerClinique = [...SaveQcmIsAnswerClinique];
    updatedQcmIsAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = QcmIndex;
    setSaveQcmIsAnswerClinique(updatedQcmIsAnswerClinique);
    //****************************************************** */
  };
  //********************************************************************** */
  //****handle all reponses****************************************************************** */
  const handleClickiVerifieReponseAll = () => {
    //**check all select cas clinique***************************************** */
    let incrementClinique = 0;
    let incrQcmIndex = 0;
    let isEmpty = false;
    while (
      incrementClinique < SaveClickSelectVerfieAllClinique.length &&
      isEmpty === false
    ) {
      while (
        incrQcmIndex <
          SaveClickSelectVerfieAllClinique[incrementClinique].length &&
        isEmpty === false
      ) {
        if (
          SaveClickSelectVerfieAllClinique[incrementClinique][incrQcmIndex] ===
          ""
        ) {
          isEmpty = true;
          console.log(incrQcmIndex);
          setIsRepondeAll(false);
          IsRepondeAllSignal.value = false;
        }
        incrQcmIndex = incrQcmIndex + 1;
      }

      incrementClinique = incrementClinique + 1;
    }
    console.log(IsRepondeAll);
    //******************************************************************** */
    //*****check done reponde all qcmss****************************** */
    if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      let incrIndexQcm = 0;
      let isEmptyQcm = false;
      while (
        incrIndexQcm < props.SaveClickSelectVerfieAll.length &&
        isEmptyQcm === false
      ) {
        if (props.SaveClickSelectVerfieAll[incrIndexQcm] === "") {
          isEmptyQcm = true;
          console.log(incrIndexQcm);

          IsRepondeAllSignalQcm.value = false;
        }
        incrIndexQcm = incrIndexQcm + 1;
      }
    }
    ///********************************************************************* */
    if (
      IsRepondeAllSignal.value === false &&
      IsRepondeAllSignalQcm.value === false
    ) {
      setModalDoneQuizIsOpen(true);
      setShowNoSelectPropoMessage(
        "Il y a des questions à laquelle vous n'avez pas répondu dans cette quizz (Qcms,et CasClinique)"
      );
    } else if (IsRepondeAllSignal.value === false) {
      setShowNoSelectPropoMessage(
        "Il y a une question à laquelle vous n'avez pas répondu dans ces cas Clinique"
      );

      setModalDoneQuizIsOpen(true);
    } else if (IsRepondeAllSignalQcm.value === false) {
      console.log("immm  heree");
      setShowNoSelectPropoMessage(
        "Il y a des questions à laquelle vous n'avez pas répondu dans cette quizz"
      );
      setModalDoneQuizIsOpen(true);
    }
  };

  //********************************************************************** */
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setModalDoneQuizIsOpen(false);
    setShowModelActionsPhone(false);
    setShowModalStatique(false);
  }
  //************confirme true verifier reponses************************************ */
  function handlerConfirmShowAllReponse() {
    //**all statique********************************************************************************************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      //update statique pie***************************************************************
      savePieStatiqueClinique[2] =
        saveCountAllQcmsClinique.value -
        (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
      console.log(savePieStatiqueClinique);
      //********************************************************************************* */
      //update statique dounate***************************************************************
      for (
        let index = 0;
        index < SaveQcmsCourNameStatiqueClinique.length;
        index++
      ) {
        SaveEachLineStatiqueClinique[index][2] =
          SaveQcmsNbrStatiqueClinique[index] -
          (SaveEachLineStatiqueClinique[index][0] +
            SaveEachLineStatiqueClinique[index][1]);
      }
      console.log(SaveEachLineStatiqueClinique);
      //********************************************************************************* */
      setShowModalStatique(true);
      setShowModalStatiqueParCour(true);
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      //update statique pie***************************************************************
      savePieStatiqueClinique[2] =
        saveCountAllQcmsClinique.value -
        (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
      console.log(savePieStatiqueClinique);
      //*********************************************************************************
      setShowModalStatique(true);
      setShowModalStatiqueParSujet(true);
      //********************************************************************************* */
    }
    //**end all statique********************************************************************************************** */
    setSaveQcmIsAnswerClinique(
      JSON.parse(JSON.stringify(SaveClickSelectVerfieAllClinique))
    );

    //*****set if verier all reponse true**************************** */
    setVeriferAllreponseClicked(true);
    //********************************************************************* */
    setTrueFullInsertClrClinique(true);
    localStorage.setItem("IsCkickShowAllReponsesClinique", true);
    saveCurrentSelet.value = [];
    setModalDoneQuizIsOpen(false);
    /************************************************************************ */
    setVeriferAllreponseClicked(false);
    //********************************************************************* */
    setTrueFullInsertClrClinique(false);
  }
  function handlerCancelShowAllReponse() {
    setModalDoneQuizIsOpen(false);
  }

  //***show qcms liste*********************************** */
  const handleShowListeQcms = () => {
    setShowListQcms(!ShowListQcms);
  };
  //******************************************************** */
  const handleSaveCasCliniqueQuizzBtn = (
    sourceQuizzSessionName,
    sourceSaveBtn
  ) => {
    if (props.qcmType === "Cas Clinique") {
      handleSaveCasCliniqueQuizz(sourceQuizzSessionName, sourceSaveBtn);
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      handleSaveQcmCasCliniqueQuizz(sourceQuizzSessionName, sourceSaveBtn);
    }
  };
  const handleSaveCasCliniqueQuizz = async (
    sourceQuizzSessionName,
    sourceSaveBtn
  ) => {
    savePieStatiqueClinique[2] =
      saveCountAllQcmsClinique.value -
      (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);

    //************************************************ */
    let sourceCommingFrom;
    let saveQuizzSession;
    if (sourceSaveBtn === "savequizzsource") {
      sourceCommingFrom = "cliniquequizz";
      saveQuizzSession = SaveCasCliniqueQuizz;
    } else if (sourceSaveBtn === "savesessionsource") {
      sourceCommingFrom = "cliniquesession";
      saveQuizzSession = SaveCasCliniqueSession;
    }
    console.log(sourceCommingFrom);
    /******************************************** */

    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserCasClinique.id = resultUserFinal.id),
        (saveUserCasClinique.name = resultUserFinal.name),
        (saveUserCasClinique.lastname = resultUserFinal.lastname),
        (saveUserCasClinique.username = resultUserFinal.username),
        (saveUserCasClinique.password = resultUserFinal.password),
        (saveUserCasClinique.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    saveQuizzSession.ourUsers = saveUserCasClinique;
    if (sourceQuizzSessionName === "quizzname") {
      saveQuizzSession.nameCasCliniqueQuizz = casCliniqueQuizzName;
    } else if (sourceQuizzSessionName === "sessionname") {
      saveQuizzSession.nameCasCliniqueSession = props.sessionName;
    }

    saveQuizzSession.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    saveQuizzSession.selectedSourceExmn = props.SelectedSourceExmn;
    saveQuizzSession.moduleId = props.moduleId;
    saveQuizzSession.moduleName = props.moduleName;
    saveQuizzSession.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    saveQuizzSession.qcmType = props.qcmType;
    saveQuizzSession.minYearQcm = props.minYearQcm;
    saveQuizzSession.maxYearQcm = props.maxYearQcm;
    saveQuizzSession.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    saveQuizzSession.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    saveQuizzSession.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    saveQuizzSession.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    saveQuizzSession.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    /**statique Arrays*************************************************************** */
    saveQuizzSession.saveCorrectAnswerClinique = JSON.stringify(
      SaveCorrectAnswerClinique
    );
    saveQuizzSession.saveIsClickedCounterClinique = JSON.stringify(
      SaveIsClickedCounterClinique
    );
    saveQuizzSession.savePieStatiqueClinique = JSON.stringify(
      savePieStatiqueClinique
    );
    saveQuizzSession.saveEachLineStatiqueClinique = JSON.stringify(
      SaveEachLineStatiqueClinique
    );
    if (sourceQuizzSessionName === "quizzname") {
      saveQuizzSession.playListe = { id: playListe.id }; // only send ID
    }
    //******************************************************************************** */
    const currentDate = new DateObject({
      date: new Date(), // use system local time
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    saveQuizzSession.dateSaveQuizzSession = currentDate.format(
      "YYYY-MM-DD HH:mm:ss"
    );
    await axios
      .post(
        `https://goatqcm-instance.com/${sourceCommingFrom}`,
        saveQuizzSession,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        let fullSessionsListeLength = +localStorage.getItem(
          "fullSessionsListeLength"
        );

        /* if (fullSessionsListeLength >= 10) {
          handleDeleteSession();
          console.log("succes deleting");
        }*/

        if (sourceQuizzSessionName === "quizzname") {
          navigateHome("/quizz");
        } else if (sourceQuizzSessionName === "sessionname") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //********************************************************************* */
  const handleSaveQcmCasCliniqueQuizz = async (
    sourceQuizzSessionName,
    sourceSaveBtn
  ) => {
    savePieStatiqueClinique[2] =
      saveCountAllQcmsClinique.value -
      (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
    //************************************************ */
    let sourceCommingFrom;
    let saveQuizzSession;
    if (sourceSaveBtn === "savequizzsource") {
      sourceCommingFrom = "qcmcliniquequizz";
      saveQuizzSession = SaveQcmCasCliniqueQuizz;
    } else if (sourceSaveBtn === "savesessionsource") {
      sourceCommingFrom = "qcmcliniquesession";
      saveQuizzSession = SaveQcmCasCliniqueSession;
    }

    /****************************************************** */
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserCasClinique.id = resultUserFinal.id),
        (saveUserCasClinique.name = resultUserFinal.name),
        (saveUserCasClinique.lastname = resultUserFinal.lastname),
        (saveUserCasClinique.username = resultUserFinal.username),
        (saveUserCasClinique.password = resultUserFinal.password),
        (saveUserCasClinique.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    console.log(casCliniqueQuizzName);
    console.log(props.QcmSujetTypeSelected);
    console.log(props.SelectedSourceExmn);
    console.log(props.moduleId);
    console.log(props.moduleName);
    console.log(props.selectMultipleCours);

    saveQuizzSession.ourUsers = saveUserCasClinique;
    if (sourceQuizzSessionName === "quizzname") {
      saveQuizzSession.nameQcmCasCliniqueQuizz = casCliniqueQuizzName;
    } else if (sourceQuizzSessionName === "sessionname") {
      saveQuizzSession.nameQcmCasCliniqueSession = props.sessionName;
    }

    saveQuizzSession.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    saveQuizzSession.selectedSourceExmn = props.SelectedSourceExmn;
    saveQuizzSession.moduleId = props.moduleId;
    saveQuizzSession.moduleName = props.moduleName;
    saveQuizzSession.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    saveQuizzSession.qcmType = props.qcmType;
    saveQuizzSession.minYearQcm = props.minYearQcm;
    saveQuizzSession.maxYearQcm = props.maxYearQcm;
    //***proposition cas clinique*********************************************** */
    saveQuizzSession.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    saveQuizzSession.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    saveQuizzSession.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    saveQuizzSession.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    saveQuizzSession.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    //************************************************************************** */
    //*****proposition Qcm CasClinique****************************************** */
    saveQuizzSession.savePropositions = JSON.stringify(props.savePropositions);
    saveQuizzSession.saveClickSelectVerfieAll = JSON.stringify(
      props.SaveClickSelectVerfieAll
    );
    saveQuizzSession.saveVerfieReponses = JSON.stringify(
      props.SaveVerfieReponses
    );
    if (veriferAllreponseClicked === true) {
      saveQuizzSession.saveQcmIsAnswer = JSON.stringify(
        props.SaveClickSelectVerfieAll
      );
    } else if (veriferAllreponseClicked === false) {
      saveQuizzSession.saveQcmIsAnswer = JSON.stringify(props.SaveQcmIsAnswer);
    }

    saveQuizzSession.savePercentageAmount = JSON.stringify(
      props.SavePercentageAmount
    );
    //*************************************************************************** */
    //**statique ***************************************************************** */
    saveQuizzSession.saveCorrectAnswer = JSON.stringify(
      props.SaveCorrectAnswer
    );
    saveQuizzSession.saveIsClickedCounter = JSON.stringify(
      props.SaveIsClickedCounter
    );
    saveQuizzSession.savePieStatique = JSON.stringify(props.savePieStatique);
    saveQuizzSession.saveEachLineStatique = JSON.stringify(
      props.SaveEachLineStatique
    );
    //****************************************************************************** */
    /**statique Arrays*************************************************************** */
    saveQuizzSession.saveCorrectAnswerClinique = JSON.stringify(
      SaveCorrectAnswerClinique
    );
    saveQuizzSession.saveIsClickedCounterClinique = JSON.stringify(
      SaveIsClickedCounterClinique
    );
    saveQuizzSession.savePieStatiqueClinique = JSON.stringify(
      savePieStatiqueClinique
    );
    saveQuizzSession.saveEachLineStatiqueClinique = JSON.stringify(
      SaveEachLineStatiqueClinique
    );

    if (sourceSaveBtn === "savequizzsource") {
      saveQuizzSession.playListe = { id: playListe.id }; // only send ID
    }
    //******************************************************************************** */
    const currentDate = new DateObject({
      date: new Date(), // use system local time
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    saveQuizzSession.dateSaveQuizzSession = currentDate.format(
      "YYYY-MM-DD HH:mm:ss"
    );
    saveQuizzSession.existeCasClinique = true;
    saveQuizzSession.doneGetAllClinique = true;
    await axios
      .post(
        `https://goatqcm-instance.com/${sourceCommingFrom}`,
        saveQuizzSession,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        let fullSessionsListeLength = +localStorage.getItem(
          "fullSessionsListeLength"
        );

        if (fullSessionsListeLength >= 10) {
          handleDeleteSession();
          console.log("succes deleting");
        }
        if (sourceQuizzSessionName === "quizzname") {
          navigateHome("/quizz");
        } else if (sourceQuizzSessionName === "sessionname") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //********************************************************************* */

  //**************************************************** */
  //****update cas clinique*********************************** */

  const handleUpdateCasCliniqueQuizz = async () => {
    savePieStatiqueClinique[2] =
      saveCountAllQcmsClinique.value -
      (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
    let sourceCommingFrom;
    if (props.commingFrom === "savequizz") {
      sourceCommingFrom = "cliniquequizz";
    } else if (props.commingFrom === "savesession") {
      sourceCommingFrom = "cliniquesession";
    }
    //**************************************************** */
    const qcmQuizzId = localStorage.getItem("qcmquizzid");

    //****update cas clinique*********************************** */
    updateCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    updateCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    updateCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    updateCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    updateCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    //**statique ***************************************************************** */
    updateCasCliniqueQuizz.saveCorrectAnswerClinique = JSON.stringify(
      SaveCorrectAnswerClinique
    );
    updateCasCliniqueQuizz.saveIsClickedCounterClinique = JSON.stringify(
      SaveIsClickedCounterClinique
    );
    updateCasCliniqueQuizz.savePieStatiqueClinique = JSON.stringify(
      savePieStatiqueClinique
    );
    updateCasCliniqueQuizz.saveEachLineStatiqueClinique = JSON.stringify(
      SaveEachLineStatiqueClinique
    );
    //****************************************************************************** */

    await axios
      .put(
        `https://goatqcm-instance.com/${sourceCommingFrom}/${qcmQuizzId}`,
        updateCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("succes modification!");
        if (props.commingFrom === "savequizz") {
          navigateHome("/quizz");
        } else if (props.commingFrom === "savesession") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));
  };

  //************************************************************** */
  /*****done Quiz******************************************** */
  const closeModalSaveQcmQuizHandler = () => {
    setModalSaveQuizzIsOpen(false);
  };

  //**************************************************** */
  //****save cas clinique*********************************** */
  const handleUpdateQcmCasCliniqueQuizz = async () => {
    savePieStatiqueClinique[2] =
      saveCountAllQcmsClinique.value -
      (savePieStatiqueClinique[0] + savePieStatiqueClinique[1]);
    let sourceCommingFrom;
    if (props.commingFrom === "savequizz") {
      sourceCommingFrom = "qcmcliniquequizz";
    } else if (props.commingFrom === "savesession") {
      sourceCommingFrom = "qcmcliniquesession";
    }
    //**************************************************** */
    const qcmQuizzId = localStorage.getItem("qcmquizzid");

    //*****update qcm ************************************************************** */
    updateQcmCasCliniqueQuizz.savePropositions = JSON.stringify(
      props.savePropositions
    );
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAll = JSON.stringify(
      props.SaveClickSelectVerfieAll
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponses = JSON.stringify(
      props.SaveVerfieReponses
    );
    if (veriferAllreponseClicked === true) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveClickSelectVerfieAll
      );
    } else if (veriferAllreponseClicked === false) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveQcmIsAnswer
      );
    }
    updateQcmCasCliniqueQuizz.savePercentageAmount = JSON.stringify(
      props.SavePercentageAmount
    );
    //*********************************************************************************** */
    //****update cas clinque******************************************************* */
    updateQcmCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    updateQcmCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    updateQcmCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    //****************************************************************************** */
    //**statique ***************************************************************** */
    updateQcmCasCliniqueQuizz.saveCorrectAnswer = JSON.stringify(
      props.SaveCorrectAnswer
    );
    updateQcmCasCliniqueQuizz.saveIsClickedCounter = JSON.stringify(
      props.SaveIsClickedCounter
    );
    updateQcmCasCliniqueQuizz.savePieStatique = JSON.stringify(
      props.savePieStatique
    );
    updateQcmCasCliniqueQuizz.saveEachLineStatique = JSON.stringify(
      props.SaveEachLineStatique
    );
    //****************************************************************************** */
    //**statique ***************************************************************** */
    updateQcmCasCliniqueQuizz.saveCorrectAnswerClinique = JSON.stringify(
      SaveCorrectAnswerClinique
    );
    updateQcmCasCliniqueQuizz.saveIsClickedCounterClinique = JSON.stringify(
      SaveIsClickedCounterClinique
    );
    updateQcmCasCliniqueQuizz.savePieStatiqueClinique = JSON.stringify(
      savePieStatiqueClinique
    );
    updateQcmCasCliniqueQuizz.saveEachLineStatiqueClinique = JSON.stringify(
      SaveEachLineStatiqueClinique
    );
    //****************************************************************************** */
    await axios
      .put(
        `https://goatqcm-instance.com/${sourceCommingFrom}/${qcmQuizzId}`,
        updateQcmCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("succes modification!");
        if (props.commingFrom === "savequizz") {
          navigateHome("/quizz");
        } else if (props.commingFrom === "savesession") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));
  };

  //************************************************************** */
  const handleDeleteSession = async (event) => {
    let lastSessionId = localStorage.getItem("lastSessionId");
    let qcmtypesession = localStorage.getItem("qcmtypesession");

    let sourceSessio;
    if (qcmtypesession === "Qcm") {
      sourceSessio = "qcmsession";
      console.log("yes its qcm");
      console.log(lastSessionId);
    } else if (qcmtypesession === "Cas Clinique") {
      sourceSessio = "cliniquesession";
    } else if (qcmtypesession === "Tous (Qcm,Cas Clinique)") {
      sourceSessio = "qcmcliniquesession";
    }
    await axios.delete(
      `https://goatqcm-instance.com/${sourceSessio}/${lastSessionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  //************************************************************* */
  //******************************************* */
  const handleNoteQcmBtn = async () => {
    setVisibleNoteQcm(!visibleNoteQcm);
  };
  /***************************************************************** */
  const handleChatBtn = () => {
    console.log("hey walid");
    setShowDiscsussionDiv(true);
  };
  /*
  const getFile = (e) => {
    setFile(e.target.files[0]);
    setFileDisplay(URL.createObjectURL(e.target.files[0]));
  };
  / 
  const getFileEdite = (e) => {
    setFileEdite(e.target.files[0]);
    setFileDisplayEdite(URL.createObjectURL(e.target.files[0]));
  };
   */
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const getFile = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileDisplay(reader.result);
    };
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);

      setFile(e.target.files[0]);
    }
  };

  const getFileEdite = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileDisplayEdite(reader.result);
    };
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);

      setFileEdite(e.target.files[0]);
    }
  };

  const saveCrop = () => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelX = completedCrop.x * scaleX;
    const pixelY = completedCrop.y * scaleY;
    const pixelWidth = completedCrop.width * scaleX;
    const pixelHeight = completedCrop.height * scaleY;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      pixelX,
      pixelY,
      pixelWidth,
      pixelHeight,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const croppedDataUrl = canvas.toDataURL("image/png");
    setFileDisplay(croppedDataUrl); // replace preview
    setFileDisplayEdite(croppedDataUrl); // replace preview
    const fileObj = dataURLtoFile(croppedDataUrl, "cropped.png");
    setFile(fileObj);
    setFileEdite(fileObj);
    setOpen(false); // close cropper
  };
  function dataURLtoFile(dataUrl, filename) {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  //***plasylites/************************************************** */ */
  const handleCreatPlayListe = async () => {
    getAllPLayListe();
    console.log(userIdToken);
    newPlayListe.ourUsers = { id: userIdToken };
    newPlayListe.playlisteName = playListeName;
    console.log(newPlayListe);
    try {
      await axios.post(`https://goatqcm-instance.com/playliste`, newPlayListe);

      console.log("succes insert");
    } catch (err) {
      console.error("Failed to create PlayList:", err);
    }
  };

  const getAllPLayListe = async () => {
    let allPlayListe = await axios.get(
      `${BASE_URL}/playliste/specifiqueuser/${userIdToken}`
    );
    console.log(allPlayListe);
    setAllPLayListes(allPlayListe.data);
  };
  const handleOnchangePlayListe = async (playlisteId) => {
    let playListe = await axios.get(`${BASE_URL}/playliste/${playlisteId}`);
    setPlayListe(playListe.data);
    console.log(playListe.data);
  };
  //***************************************************************** */
  const handleChatGptBtn = async (qcmId) => {
    //setShowChatGptPremieum(true);
    setShowChatGpt(true);
    console.log(qcmId);
    qcmIdChatGptDeepSeek.value = qcmId;
  };
  return (
    <>
      {!OpenBoardQcm && (
        <>
          <NavigationBar
            changeetatsidebar={etatsidebare}
            cameFrom={"quizzboard"}
          />
          <div className={classes.addingdiv}>
            <div className={classes.sidebare}>
              {ShowSideBare && <Sidebar />}
            </div>

            {VisibleParSujet && (
              <div
                className={`${classes.parsujetscontainer} `}
                style={{ width: 310, height: 50, marginLeft: 10 }}
              >
                <select
                  defaultValue="year"
                  style={{ width: 100 }}
                  className={`form-select`}
                  id="year"
                  aria-label="Default select example"
                  onChange={SelectYearHndlerChange}
                >
                  <option value="year" disabled="disabled">
                    Année
                  </option>
                  {GetYearProps.map((year, index) => (
                    <option value={year} key={index}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  style={{ width: 190 }}
                  className={` form-select`}
                  id="groupepermutation"
                  aria-label="Default select example"
                  defaultValue="groupe"
                  onChange={SelectGroupePermHndlerChange}
                >
                  <option value="groupe" disabled="disabled">
                    Groupe/Permutaion
                  </option>
                  {GroupesPermut.map((groupepermutation, index) => (
                    <option key={index}>{groupepermutation}</option>
                  ))}
                </select>
              </div>
            )}
            {VisibleQmcContainer && isDesktopOrLaptop && (
              <div
                className={classes.contanerspace}
                data-theme={isDark ? "dark" : "light"}
              >
                <div className={classes.container_save_casclinique_timer}>
                  {ShowCancelQuizzPhone && (
                    <div className={classes.full_save_casclinique}>
                      {showSaveCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setModalSaveQuizzIsOpen(true);
                            setVisibleSaveQuizzEnter(false);
                            setVisiblePlayListe(true);
                            getAllPLayListe();
                          }}
                        >
                          Ajouter a la playList
                        </button>
                      )}
                      {showUpdateCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            handleUpdateCasCliniqueQuizz();
                          }}
                        >
                          Save modification
                        </button>
                      )}
                      {showSaveQcmCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setModalSaveQuizzIsOpen(true);
                            setVisibleSaveQuizzEnter(false);
                            setVisiblePlayListe(true);
                            getAllPLayListe();
                          }}
                        >
                           Ajouter a la playList
                        </button>
                      )}
                      {showUpdateQcmCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            handleUpdateQcmCasCliniqueQuizz();
                          }}
                        >
                          Save modification
                        </button>
                      )}

                      {showSaveSessionCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            handleSaveCasCliniqueQuizz(
                              sourceSessionName,
                              sourceSaveSessionBtn
                            );
                          }}
                        >
                          Fin Session
                        </button>
                      )}
                      {showUpdateSessionCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            handleUpdateCasCliniqueQuizz();
                          }}
                        >
                          Save Modification
                        </button>
                      )}

                      {showSaveSessionQcmCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            handleSaveQcmCasCliniqueQuizz(
                              sourceSessionName,
                              sourceSaveSessionBtn
                            );
                          }}
                        >
                          Fin Session
                        </button>
                      )}
                      {showUpdateSessionQcmCasCliniqueBtn && (
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            handleUpdateQcmCasCliniqueQuizz();
                          }}
                        >
                          Save modification
                        </button>
                      )}
                    </div>
                  )}

                  <div className={classes.fullchronotime}>
                    <div className={classes.timediv}>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[0].hours
                          : hours}
                        :
                      </span>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[1].minutes
                          : minutes}
                        :
                      </span>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[2].seconds
                          : seconds}
                      </span>
                    </div>
                    <div className={classes.timetbns}>
                      {ShowPlayBtn && (
                        <a>
                          <IoPlayCircleOutline
                            onClick={(e) => {
                              {
                                start();
                              }
                              setShowPauseBtn(true);
                              setShowPlayBtn(false);
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                        </a>
                      )}

                      {ShowPauseBtn && (
                        <a>
                          <IoPauseCircleOutline
                            onClick={(e) => {
                              setShowPlayBtn(true);
                              setShowPauseBtn(false);
                              {
                                pause();
                              }
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                        </a>
                      )}
                      <a>
                        <MdOutlineReplay
                          onClick={() => {
                            {
                              reset();
                            }
                          }}
                          style={{ width: 30, height: 30 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className={`${classes.quizcontainer} card text-white  py-1`}
                >
                  <div
                    className={`${classes.cliniqueqcmcontainer} card-body text-black`}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    {ShowCasClinique.map((CasClinique, indexCasClinique) => {
                      if (indexCasClinique === VisibiliteCasCliniqueIndex)
                        return (
                          <div key={indexCasClinique}>
                            <div className={`${classes.qcmInfoHeader}`}>
                              <div className={`${classes.qcmInfo} `}>
                                <ul
                                  className={`${classes.ulcatogorycourname} "list-group"`}
                                >
                                  <img src={courlogo} height="30%" width="20" />
                                  <li className="list-group-item">
                                    {CasClinique.coursMed.coursName}
                                  </li>
                                  <img
                                    src={externatlogo}
                                    height="50%"
                                    width="20"
                                  />
                                  <li className="list-group-item">
                                    {CasClinique.category}
                                  </li>
                                  <img
                                    src={groupelogo}
                                    height="50%"
                                    width="20"
                                  />
                                  {ShowGroupePermExternat && (
                                    <li className="list-group-item">
                                      ({CasClinique.casCliniqueGroupe})
                                    </li>
                                  )}
                                  <li className="list-group-item">
                                    {CasClinique.casCliniqueYear}
                                  </li>
                                  <div className={`${classes.goatlogo} `}>
                                    <img
                                      src={GoatLogo}
                                      height="40"
                                      width="70"
                                    />
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <li
                              className={`${classes.nmbrqcm} list-group-item`}
                              style={{ color: "#007FFF" }}
                            >
                              CasClinique {indexCasClinique + 1} sur{" "}
                              {ShowCasClinique.length}
                            </li>
                            {isParticipateAdmin && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) =>
                                  DeleteCasClinique(CasClinique.id)
                                }
                              >
                                Delete CasClinique
                              </button>
                            )}
                            <div
                              className={`${classes.cascliniquecontent} shadow `}
                              onCopy={disableCopyPaste}
                              onCut={disableCopyPaste}
                              onPaste={disableCopyPaste}
                              style={{
                                userSelect: "none",
                              }}
                            >
                              <p>{CasClinique.casCliniqueContent}</p>
                            </div>
                            <ImageClinique cliniqueId={CasClinique.id} />
                          </div>
                        );
                    })}
                    <div className={`${classes.qcmnbr_commentary_div} `}>
                      <div>
                        {ShowQcm.map((qcm, index) => {
                          if (index === VisibiliteCasCliniqueIndex) {
                            return (
                              <div className={classes.btnqcmclinique}>
                                <ul>
                                  {qcm.map((qcmCln, indexqcmClnq) => (
                                    <button
                                      style={{
                                        backgroundColor: backGroundBtn,
                                      }}
                                      onClick={(e) => {
                                        if (isToggled === "true") {
                                          if (stompClient && connected) {
                                            const chatMessage = {
                                              nickname,
                                              content:
                                                "QcmClickIndex" + indexqcmClnq,
                                            };
                                            stompClient.publish({
                                              destination: `/app/chat/${shareScreenCode}`,
                                              body: JSON.stringify(chatMessage),
                                            });
                                            console.log(chatMessage.content);

                                            setMessage("");
                                          }
                                        }
                                        setQcmIndex(indexqcmClnq);
                                        console.log(indexqcmClnq);

                                        setShowDescQcm(false);
                                        setQcmIdNote(qcmCln.id);

                                        try {
                                          if (
                                            saveCaseCliniqueIndex.value[
                                              VisibiliteCasCliniqueIndex
                                            ][indexqcmClnq] === indexqcmClnq
                                          ) {
                                            console.log(indexqcmClnq);
                                            console.log(
                                              VisibiliteCasCliniqueIndex
                                            );

                                            setShowDescRpnsBtn(true);
                                            setShowVerifierRpnsBtn(false);
                                            setSlectCliniquePropo(
                                              VisibiliteCasCliniqueIndex
                                            );
                                            setTrueInsertClrClick(true);
                                            setTrueInsertClr(indexqcmClnq);
                                          } else {
                                            setShowDescRpnsBtn(false);
                                            setShowVerifierRpnsBtn(true);
                                          }
                                        } catch (Exception) {
                                          console.log(
                                            "no check in this clinique"
                                          );
                                        }
                                        setShowDescQcm(false);

                                        setvisisbleDescInsert(false);
                                        setVisisbleDescUpdate(false);
                                      }}
                                      value={indexqcmClnq}
                                    >
                                      {indexqcmClnq + 1}
                                    </button>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                        })}
                      </div>
                      <div className={`${classes.full_note_commentary} `}>
                        <div className={`${classes.chatgpt} `}>
                          <img
                            src={chatgpt}
                            height="100%"
                            width="30"
                            onClick={(e) => {
                              handleChatGptBtn(QcmIdNote);
                            }}
                          />
                        </div>
                        <div className={`${classes.note} `}>
                          <img
                            src={noteimage}
                            height="100%"
                            width="30"
                            onClick={(e) => {
                              handleNoteQcmBtn();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {ShowQcm.map((qcmClinique, indexClinique) => {
                      if (indexClinique === VisibiliteCasCliniqueIndex) {
                        return (
                          <div key={VisibiliteCasCliniqueIndex}>
                            {qcmClinique.map((qcm, indexqcm) => {
                              if (indexqcm === QcmIndex) {
                                return (
                                  <div key={indexqcm}>
                                    {isParticipateAdmin && (
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-warning btn-sm"
                                          onClick={() =>
                                            navigateEditeQcm(
                                              `/editefullcasclinique`,
                                              {
                                                state: {
                                                  qcmId: qcm.id,
                                                  cours_id: courId,
                                                  casClinique_id:
                                                    qcm.casClinique.id,
                                                  qcmSource:
                                                    props.SelectedSourceExmn,
                                                },
                                              }
                                            )
                                          }
                                        >
                                          Edite Qcm
                                        </button>
                                        {isParticipateAdmin && (
                                          <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ marginLeft: 5 }}
                                            onClick={(e) =>
                                              testDescExsite(qcm.id)
                                            }
                                          >
                                            Ajouter Commentaire
                                          </button>
                                        )}
                                        {isParticipateAdmin && (
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={(e) =>
                                              DeleteQcmClinque(qcm.id)
                                            }
                                          >
                                            Delete qcm
                                          </button>
                                        )}
                                      </div>
                                    )}
                                    {visibleNoteQcm && (
                                      <NoteQcmClinique qcmId={qcm.id} />
                                    )}
                                    {visisbleDescInsert && (
                                      <div className={classes.imgdescdiv}>
                                        <div
                                          className={classes.fulldescription}
                                        >
                                          <div className={classes.imagediv}>
                                            <img
                                              onClick={() => setOpen(true)}
                                              src={eysezoom}
                                              style={{
                                                width: 25,
                                                height: 25,
                                                cursor: "pointer",
                                              }}
                                              alt="zoom"
                                            />

                                            {fileDisplay && !open && (
                                              <img
                                                src={fileDisplay}
                                                alt="preview"
                                              />
                                            )}
                                            <input
                                              type="file"
                                              onChange={getFile}
                                            />

                                            {open && fileDisplay && (
                                              <div
                                                className={
                                                  classes.cropContainer
                                                }
                                              >
                                                <ReactCrop
                                                  crop={crop}
                                                  onChange={(_, percentCrop) =>
                                                    setCrop(percentCrop)
                                                  }
                                                  onComplete={(c) =>
                                                    setCompletedCrop(c)
                                                  }
                                                >
                                                  <img
                                                    style={{
                                                      height: "95%",
                                                      width: "95%",
                                                      overflowY: "auto",
                                                    }}
                                                    ref={imgRef}
                                                    src={fileDisplay}
                                                    alt="crop-target"
                                                  />
                                                </ReactCrop>

                                                <div
                                                  className={
                                                    classes.cropButtons
                                                  }
                                                >
                                                  <button
                                                    className="btn btn-primary"
                                                    onClick={saveCrop}
                                                    disabled={
                                                      !completedCrop?.width ||
                                                      !completedCrop?.height
                                                    }
                                                  >
                                                    Save Crop
                                                  </button>
                                                  <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                      setOpen(false)
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div className={classes.descarea}>
                                            <textarea
                                              className="form-control"
                                              id="exampleFormControlTextarea1"
                                              onChange={(e) =>
                                                setDescription(e.target.value)
                                              }
                                            ></textarea>
                                          </div>
                                        </div>
                                        <button
                                          type="submit"
                                          className={`${classes.updtimage} btn btn-primary`}
                                          onClick={(e) => AjouterImage(qcm.id)}
                                        >
                                          Ajouter Image
                                        </button>

                                        <button
                                          className={`${classes.updtdesc} btn btn-primary`}
                                          type="submit"
                                          onClick={(e) => AjouterDesc(qcm.id)}
                                        >
                                          Ajouter Commentaire
                                        </button>
                                      </div>
                                    )}
                                    {VisisbleDescUpdate && (
                                      <div className={classes.imgdescdiv}>
                                        <div
                                          className={classes.fulldescription}
                                        >
                                          <div className={classes.imagediv}>
                                            <img
                                              onClick={() => setOpen(true)}
                                              src={eysezoom}
                                              style={{
                                                width: 25,
                                                height: 25,
                                                cursor: "pointer",
                                              }}
                                              alt="zoom"
                                            />
                                            {FileDisplayEdite && !open && (
                                              <img
                                                src={FileDisplayEdite}
                                                alt="preview"
                                              />
                                            )}
                                            <input
                                              type="file"
                                              onChange={getFileEdite}
                                            />
                                            {open && FileDisplayEdite && (
                                              <div
                                                className={
                                                  classes.cropContainer
                                                }
                                              >
                                                <ReactCrop
                                                  crop={crop}
                                                  onChange={(_, percentCrop) =>
                                                    setCrop(percentCrop)
                                                  }
                                                  onComplete={(c) =>
                                                    setCompletedCrop(c)
                                                  }
                                                >
                                                  <img
                                                    style={{
                                                      height: "95%",
                                                      width: "95%",
                                                      overflowY: "auto",
                                                    }}
                                                    ref={imgRef}
                                                    src={FileDisplayEdite}
                                                    alt="crop-target"
                                                  />
                                                </ReactCrop>

                                                <div
                                                  className={
                                                    classes.cropButtons
                                                  }
                                                >
                                                  <button
                                                    className="btn btn-primary"
                                                    onClick={saveCrop}
                                                    disabled={
                                                      !completedCrop?.width ||
                                                      !completedCrop?.height
                                                    }
                                                  >
                                                    Save Crop
                                                  </button>
                                                  <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                      setOpen(false)
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div className={classes.descarea}>
                                            <textarea
                                              className="form-control"
                                              id="exampleFormControlTextarea1"
                                              value={
                                                FullDescEdite.qcmDescription
                                              }
                                              onChange={(e) =>
                                                setFullDescEdite({
                                                  ...FullDescEdite,
                                                  qcmDescription:
                                                    e.target.value,
                                                })
                                              }
                                            ></textarea>
                                          </div>
                                        </div>
                                        <button
                                          type="submit"
                                          className={`${classes.updtimage} btn btn-primary`}
                                          onClick={(e) => UpdateImage(qcm.id)}
                                        >
                                          Update Image
                                        </button>
                                        <button
                                          type="button"
                                          className={`${classes.deeletefulldesc} btn btn-danger`}
                                          onClick={(e) =>
                                            deleteFullDesc(qcm.id)
                                          }
                                        >
                                          Delete
                                        </button>
                                        <button
                                          className={`${classes.updtdesc} btn btn-primary`}
                                          type="submit"
                                          onClick={(e) => UpdateDesc(qcm.id)}
                                        >
                                          Update Commentaire
                                        </button>
                                      </div>
                                    )}
                                    <div
                                      className={`${classes.qcmfeild} table-hover shadow`}
                                      onCopy={disableCopyPaste}
                                      onCut={disableCopyPaste}
                                      onPaste={disableCopyPaste}
                                      style={{
                                        userSelect: "none",
                                      }}
                                    >
                                      <p>{qcm.qcmCliniqueContent}</p>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        );
                        //}
                      }
                    })}
                    <div
                      className={`${classes.propofeild} card table-hover shadow`}
                    >
                      {ShowPorposition.map(
                        (PropositionClinique, QcmPropoIndex) => {
                          if (QcmPropoIndex === VisibiliteCasCliniqueIndex) {
                            return (
                              <div key={QcmPropoIndex}>
                                {PropositionClinique.map(
                                  (propofina, indexPropo) => {
                                    if (indexPropo === QcmIndex) {
                                      return (
                                        <div key={indexPropo}>
                                          <ul
                                            onCopy={disableCopyPaste}
                                            onCut={disableCopyPaste}
                                            onPaste={disableCopyPaste}
                                            style={{
                                              userSelect: "none",
                                            }}
                                            multiple={true}
                                            className={`${classes.ulpropo} list-group list-group-flush`}
                                          >
                                            {propofina[indexPropo].map(
                                              (propo, indexPropofinal) => {
                                                currentQcmIdOfPropo.value =
                                                  propo.qcmClinique.id;

                                                return (
                                                  <li
                                                    key={indexPropofinal}
                                                    value={propo.id}
                                                    style={{
                                                      backgroundColor:
                                                        SaveVerfieReponsesClinique[
                                                          VisibiliteCasCliniqueIndex
                                                        ][QcmIndex] === QcmIndex
                                                          ? propo.reponseBoolClinique ===
                                                            true
                                                            ? COLORS[1]
                                                            : savePropositionsClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex][
                                                                indexPropofinal
                                                              ] === propo.id &&
                                                              propo.reponseBoolClinique ===
                                                                false
                                                            ? COLORS[0]
                                                            : ""
                                                          : (TrueFullInsertClrClinique ===
                                                              true &&
                                                              SaveClickSelectVerfieAllClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex] ===
                                                                QcmIndex) ||
                                                            SaveQcmIsAnswerClinique[
                                                              VisibiliteCasCliniqueIndex
                                                            ][QcmIndex] ===
                                                              QcmIndex
                                                          ? propo.reponseBoolClinique ===
                                                            true
                                                            ? COLORS[1]
                                                            : savePropositionsClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex][
                                                                indexPropofinal
                                                              ] === propo.id &&
                                                              propo.reponseBoolClinique ===
                                                                false
                                                            ? COLORS[0]
                                                            : ""
                                                          : "",
                                                    }}
                                                    className={
                                                      savePropositionsClinique[
                                                        VisibiliteCasCliniqueIndex
                                                      ][QcmIndex][
                                                        indexPropofinal
                                                      ] === propo.id
                                                        ? "list-group-item active"
                                                        : "list-group-item"
                                                    }
                                                    onClick={(e) => {
                                                      handlePropoClick(
                                                        e,
                                                        VisibiliteCasCliniqueIndex,
                                                        QcmIndex,
                                                        indexPropofinal,
                                                        propo.id,
                                                        propo.qcmClinique.id,
                                                        propo.qcmClinique
                                                          .casClinique.coursMed
                                                          .coursName,
                                                        cameFrome[0]
                                                      );
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        AlphabetChoice[
                                                          (IndexAlphabetChoice =
                                                            IndexAlphabetChoice +
                                                            1)
                                                        ]
                                                      }
                                                      height="60%"
                                                      width="40"
                                                    />
                                                    {
                                                      propo.propositionQcmClinique
                                                    }
                                                    {SaveQcmIsAnswerClinique[
                                                      VisibiliteCasCliniqueIndex
                                                    ][QcmIndex] ===
                                                      QcmIndex && (
                                                      <div
                                                        className={`${classes.percentage} `}
                                                      >
                                                        {(
                                                          (propo.countSelect *
                                                            100) /
                                                          SavePercentageCliniqueAmount[
                                                            VisibiliteCasCliniqueIndex
                                                          ][QcmIndex]
                                                        ).toFixed(0)}
                                                        %
                                                      </div>
                                                    )}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      );
                                    }
                                  }
                                )}

                                <div className={classes.btnfooter}>
                                  {SaveQcmIsAnswerClinique[
                                    VisibiliteCasCliniqueIndex
                                  ][QcmIndex] === "" && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handleClickiVerifieReponse(
                                          VisibiliteCasCliniqueIndex,
                                          QcmIndex
                                        );

                                        //*******descreption**************************** */
                                        saveQcmIndex.value[QcmIndex] = QcmIndex;
                                        saveCaseCliniqueIndex.value[
                                          VisibiliteCasCliniqueIndex
                                        ] = saveQcmIndex.value;
                                        console.log(saveQcmIndex.value);
                                        console.log(
                                          saveCaseCliniqueIndex.value
                                        );
                                      }}
                                    >
                                      Vérifer la réponse
                                    </button>
                                  )}
                                  {(SaveVerfieReponsesClinique[
                                    VisibiliteCasCliniqueIndex
                                  ][QcmIndex] === QcmIndex ||
                                    SaveQcmIsAnswerClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === QcmIndex) && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handeldescription(
                                          currentQcmIdOfPropo.value
                                        );
                                      }}
                                    >
                                      Explication
                                    </button>
                                  )}

                                  {qcmType === "Cas Clinique" &&
                                    VisibiliteCasCliniqueIndex + 1 ===
                                      ShowQcm.length && (
                                      <button
                                        type="button"
                                        className={`${classes.btnsuivant} btn btn-warning`}
                                        onClick={(e) => {
                                          handleClickiVerifieReponseAll();
                                        }}
                                      >
                                        Voir tous les reponses
                                      </button>
                                    )}
                                  {qcmType === "Tous (Qcm,Cas Clinique)" &&
                                    VisibiliteCasCliniqueIndex + 1 ===
                                      ShowQcm.length && (
                                      <button
                                        type="button"
                                        className={`${classes.btnsuivant} btn btn-warning`}
                                        onClick={(e) => {
                                          handleClickiVerifieReponseAll();
                                        }}
                                      >
                                        Afficher tous les reponses
                                      </button>
                                    )}

                                  {VisibleNextBtn.value && (
                                    <button
                                      type="button"
                                      className={`${classes.btnsuivant} btn btn-warning`}
                                      onClick={(e) =>
                                        handleNextClick({ event: e })
                                      }
                                    >
                                      Suivant
                                    </button>
                                  )}
                                  {VisiblePrevBtn.value && (
                                    <button
                                      type="button"
                                      className={`${classes.btnPrecdent} btn btn-warning`}
                                      onClick={(e) =>
                                        handlePrevClick({ event: e })
                                      }
                                    >
                                      Précédent
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                  <div className={`${classes.qcmsliste}`}>
                    <div className={`${classes.qcmsliste_header}`}>
                      <h6>Liste CasClinique</h6>
                    </div>
                    <ul>
                      {ShowCasClinique.map((casClinique, casCliniqueIndex) => (
                        <>
                          <div key={casCliniqueIndex}>
                            <li
                              key={casCliniqueIndex}
                              value={casClinique.id}
                              className={
                                SelectcasCliniqueIndex === casCliniqueIndex
                                  ? "list-group-item active  "
                                  : "list-group-item"
                              }
                            >
                              <ul
                                className={`${classes.ul_clinique_clinique} list-group`}
                              >
                                <div
                                  onClick={(e) => {
                                    handleItemClick({
                                      event: e,
                                      casCliniqueIndex: casCliniqueIndex,
                                    });
                                  }}
                                >
                                  <a className={`${classes.title_casclinique}`}>
                                    Cas Clinique {casCliniqueIndex + 1}
                                  </a>
                                  <a>
                                    <IoMdArrowDropdown />
                                  </a>
                                </div>
                                {CasCliniqueClicked === casCliniqueIndex && (
                                  <>
                                    {ShowQcm.map((qcm, index) => {
                                      if (index === casCliniqueIndex) {
                                        return (
                                          <ul
                                            className={`${classes.ul_qcms_clinique}`}
                                          >
                                            {qcm.map((qcmCln, indexqcmClnq) => (
                                              <div
                                                key={indexqcmClnq}
                                                className={`${classes.div_qcm}`}
                                              >
                                                <a
                                                  onClick={(e) => {
                                                    handlQcmClickNav({
                                                      event: e,
                                                      indexqcmClnq:
                                                        indexqcmClnq,
                                                    });
                                                  }}
                                                >
                                                  Question {indexqcmClnq + 1}
                                                </a>
                                                {SaveClickSelectVerfieAllClinique[
                                                  casCliniqueIndex
                                                ][indexqcmClnq] ===
                                                  indexqcmClnq && (
                                                  <div
                                                    className={
                                                      classes.vl_select
                                                    }
                                                  ></div>
                                                )}
                                                {SaveQcmIsAnswerClinique[
                                                  casCliniqueIndex
                                                ][indexqcmClnq] ===
                                                  indexqcmClnq && (
                                                  <div
                                                    className={
                                                      classes.vl_answer
                                                    }
                                                  ></div>
                                                )}
                                              </div>
                                            ))}
                                          </ul>
                                        );
                                      }
                                    })}
                                  </>
                                )}
                              </ul>
                            </li>
                          </div>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>

                {ShowDescQcm && (
                  <DescriptionClinique
                    qcmIdPropsQcmDesc={qcmIdPropsQcmDesc.value}
                  />
                )}
              </div>
            )}
            {VisibleQmcContainer && isTabletOrMobile && (
              <div
                className={classes.modal_phone}
                data-theme={isDark ? "dark" : "light"}
              >
                <div className={classes.contanerspace_phone}>
                  <div
                    className={`${classes.quizcontainer_phone} card text-white  py-1`}
                  >
                    <div
                      className={classes.headerquizz_phone}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      <div className={classes.fullchronotime_phone}>
                        <div className={classes.timediv_phone}>
                          <span>
                            {props.qcmAndCliniqueTimer === true
                              ? props.watchValues[0].hours
                              : hours}
                            :
                          </span>
                          <span>
                            {props.qcmAndCliniqueTimer === true
                              ? props.watchValues[1].minutes
                              : minutes}
                            :
                          </span>
                          <span>
                            {props.qcmAndCliniqueTimer === true
                              ? props.watchValues[2].seconds
                              : seconds}
                          </span>
                        </div>
                        <div className={classes.timetbns_phone}>
                          {ShowPlayBtn && (
                            <a>
                              <IoPlayCircleOutline
                                onClick={(e) => {
                                  {
                                    start();
                                  }
                                  setShowPauseBtn(true);
                                  setShowPlayBtn(false);
                                }}
                                style={{ width: 20, height: 20 }}
                              />
                            </a>
                          )}

                          {ShowPauseBtn && (
                            <a>
                              <IoPauseCircleOutline
                                onClick={(e) => {
                                  setShowPlayBtn(true);
                                  setShowPauseBtn(false);
                                  {
                                    pause();
                                  }
                                }}
                                style={{ width: 20, height: 20 }}
                              />
                            </a>
                          )}
                          <a>
                            <MdOutlineReplay
                              onClick={() => {
                                {
                                  reset();
                                }
                              }}
                              style={{ width: 20, height: 20 }}
                            />
                          </a>
                        </div>
                      </div>

                      {ShowCancelQuizzPhone && (
                        <div className={classes.full_save_close_quizz}>
                          <div className={`${classes.closequizz_phone} `}>
                            <li
                              className={`${classes.homebtn_phone} list-group-item`}
                            >
                              <TfiClose
                                onClick={(e) => {
                                  setShowModelActionsPhone(true);
                                  setVisibleSaveQuizzEnter(false);
                                  setVisiblePlayListe(true);
                                }}
                              />
                            </li>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${classes.cliniqueqcmcontainer_phone} card-body text-black`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      {ShowCasClinique.map((CasClinique, indexCasClinique) => {
                        if (indexCasClinique === VisibiliteCasCliniqueIndex)
                          return (
                            <div key={indexCasClinique}>
                              <div className={`${classes.infoquizz_phone} `}>
                                <div
                                  className={`${classes.qcmInfoHeader_phone} `}
                                >
                                  <div
                                    className={`${classes.modulediv_phone} `}
                                  >
                                    <li
                                      className={`${classes.modulename} list-group-item`}
                                    >
                                      {props.moduleName}
                                    </li>
                                  </div>

                                  <div
                                    className={`${classes.qcmInfocatgrp_phone} `}
                                  >
                                    <li className="list-group-item">
                                      {CasClinique.category}-
                                    </li>
                                    <li className="list-group-item">
                                      {ShowGroupePermExternat && (
                                        <>({CasClinique.casCliniqueGroupe})- </>
                                      )}
                                      {CasClinique.casCliniqueYear}
                                    </li>
                                  </div>
                                </div>
                                <div
                                  className={`${classes.qcmcourimgname_phone} `}
                                >
                                  <li
                                    className={`${classes.courname_phone} list-group-item`}
                                  >
                                    {CasClinique.coursMed.coursName}
                                  </li>
                                </div>
                              </div>
                              <div className={`${classes.fullqcmnumbernote} `}>
                                <div
                                  className={`${classes.qcmcourqcmnbr_phone} `}
                                >
                                  {isParticipateAdmin && (
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={(e) =>
                                        DeleteCasClinique(CasClinique.id)
                                      }
                                    >
                                      Delete CasClinique
                                    </button>
                                  )}
                                  <li
                                    className={`${classes.nmbrqcm} list-group-item`}
                                    style={{ color: "#007FFF" }}
                                  >
                                    CasClinique {indexCasClinique + 1} sur{" "}
                                    {ShowCasClinique.length}
                                  </li>
                                </div>
                                <div
                                  className={`${classes.full_note_commentary_clinique_phone} `}
                                >
                                  <div className={`${classes.note_phone} `}>
                                    <img
                                      src={noteimage}
                                      height="100%"
                                      width="30"
                                      onClick={(e) => {
                                        handleNoteQcmBtn();
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`${classes.cascliniquecontent_phone}  `}
                                onCopy={disableCopyPaste}
                                onCut={disableCopyPaste}
                                onPaste={disableCopyPaste}
                                style={{
                                  userSelect: "none",
                                }}
                              >
                                <p>{CasClinique.casCliniqueContent}</p>
                              </div>
                              <ImageClinique cliniqueId={CasClinique.id} />
                            </div>
                          );
                      })}
                      <div
                        className={`${classes.qcmnbr_commentary_div_phone} `}
                      >
                        {ShowQcm.map((qcm, index) => {
                          if (index === VisibiliteCasCliniqueIndex) {
                            return (
                              <div className={classes.btnqcmclinique_phone}>
                                <ul>
                                  {qcm.map((qcmCln, indexqcmClnq) => (
                                    <button
                                      onClick={(e) => {
                                        if (isToggled === "true") {
                                          if (stompClient && connected) {
                                            const chatMessage = {
                                              nickname,
                                              content:
                                                "QcmClickIndex" + indexqcmClnq,
                                            };
                                            stompClient.publish({
                                              destination: `/app/chat/${shareScreenCode}`,
                                              body: JSON.stringify(chatMessage),
                                            });
                                            console.log(chatMessage.content);

                                            setMessage("");
                                          }
                                        }
                                        setQcmIndex(indexqcmClnq);
                                        console.log(indexqcmClnq);

                                        setShowDescQcm(false);
                                        setQcmIdNote(qcmCln.id);

                                        try {
                                          if (
                                            saveCaseCliniqueIndex.value[
                                              VisibiliteCasCliniqueIndex
                                            ][indexqcmClnq] === indexqcmClnq
                                          ) {
                                            console.log(indexqcmClnq);
                                            console.log(
                                              VisibiliteCasCliniqueIndex
                                            );

                                            setShowDescRpnsBtn(true);
                                            setShowVerifierRpnsBtn(false);
                                            setSlectCliniquePropo(
                                              VisibiliteCasCliniqueIndex
                                            );
                                            setTrueInsertClrClick(true);
                                            setTrueInsertClr(indexqcmClnq);
                                          } else {
                                            setShowDescRpnsBtn(false);
                                            setShowVerifierRpnsBtn(true);
                                          }
                                        } catch (Exception) {
                                          console.log(
                                            "no check in this clinique"
                                          );
                                        }
                                        setShowDescQcm(false);

                                        setvisisbleDescInsert(false);
                                        setVisisbleDescUpdate(false);
                                      }}
                                      value={indexqcmClnq}
                                    >
                                      {indexqcmClnq + 1}
                                    </button>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                        })}
                      </div>

                      {ShowQcm.map((qcmClinique, indexClinique) => {
                        if (indexClinique === VisibiliteCasCliniqueIndex) {
                          return (
                            <div key={VisibiliteCasCliniqueIndex}>
                              {qcmClinique.map((qcm, indexqcm) => {
                                if (indexqcm === QcmIndex) {
                                  return (
                                    <div key={indexqcm}>
                                      {isParticipateAdmin && (
                                        <div>
                                          <button
                                            type="button"
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                              navigateEditeQcm(
                                                `/editefullcasclinique`,
                                                {
                                                  state: {
                                                    qcmId: qcm.id,
                                                    cours_id: courId,
                                                    casClinique_id:
                                                      qcm.casClinique.id,
                                                    qcmSource:
                                                      props.SelectedSourceExmn,
                                                  },
                                                }
                                              )
                                            }
                                          >
                                            Edite Qcm
                                          </button>
                                          {isParticipateAdmin && (
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              style={{ marginLeft: 5 }}
                                              onClick={(e) =>
                                                testDescExsite(qcm.id)
                                              }
                                            >
                                              Ajouter Commentaire
                                            </button>
                                          )}
                                          {isParticipateAdmin && (
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={(e) =>
                                                DeleteQcmClinque(qcm.id)
                                              }
                                            >
                                              Delete qcm
                                            </button>
                                          )}
                                        </div>
                                      )}
                                      {visibleNoteQcm && (
                                        <NoteQcmClinique qcmId={qcm.id} />
                                      )}
                                      {visisbleDescInsert && (
                                        <div className={classes.imgdescdiv}>
                                          <div
                                            className={classes.fulldescription}
                                          >
                                            <div className={classes.imagediv}>
                                              <img src={fileDisplay} />
                                              <input
                                                type="file"
                                                onChange={getFile}
                                              ></input>
                                            </div>
                                            <div className={classes.descarea}>
                                              <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                onChange={(e) =>
                                                  setDescription(e.target.value)
                                                }
                                              ></textarea>
                                            </div>
                                          </div>
                                          <button
                                            type="submit"
                                            className={`${classes.updtimage} btn btn-primary`}
                                            onClick={(e) =>
                                              AjouterImage(qcm.id)
                                            }
                                          >
                                            Ajouter Image
                                          </button>

                                          <button
                                            className={`${classes.updtdesc} btn btn-primary`}
                                            type="submit"
                                            onClick={(e) => AjouterDesc(qcm.id)}
                                          >
                                            Ajouter Commentaire
                                          </button>
                                        </div>
                                      )}
                                      {VisisbleDescUpdate && (
                                        <div className={classes.imgdescdiv}>
                                          <div
                                            className={classes.fulldescription}
                                          >
                                            <div className={classes.imagediv}>
                                              <img
                                                src={FileDisplayEdite}
                                                onChange={getFileEdite}
                                              />
                                              <input
                                                type="file"
                                                onChange={getFileEdite}
                                              ></input>
                                            </div>
                                            <div className={classes.descarea}>
                                              <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                value={
                                                  FullDescEdite.qcmDescription
                                                }
                                                onChange={(e) =>
                                                  setFullDescEdite({
                                                    ...FullDescEdite,
                                                    qcmDescription:
                                                      e.target.value,
                                                  })
                                                }
                                              ></textarea>
                                            </div>
                                          </div>
                                          <button
                                            type="submit"
                                            className={`${classes.updtimage} btn btn-primary`}
                                            onClick={(e) => UpdateImage(qcm.id)}
                                          >
                                            Update Image
                                          </button>
                                          <button
                                            type="button"
                                            className={`${classes.deeletefulldesc} btn btn-danger`}
                                            onClick={(e) =>
                                              deleteFullDesc(qcm.id)
                                            }
                                          >
                                            Delete
                                          </button>
                                          <button
                                            className={`${classes.updtdesc} btn btn-primary`}
                                            type="submit"
                                            onClick={(e) => UpdateDesc(qcm.id)}
                                          >
                                            Update Commentaire
                                          </button>
                                        </div>
                                      )}
                                      <div
                                        className={`${classes.qcmfeild_phone} `}
                                        onCopy={disableCopyPaste}
                                        onCut={disableCopyPaste}
                                        onPaste={disableCopyPaste}
                                        style={{
                                          userSelect: "none",
                                        }}
                                      >
                                        <p>{qcm.qcmCliniqueContent}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          );
                          //}
                        }
                      })}
                      <div className={classes.propofeild_phone}>
                        {ShowPorposition.map(
                          (PropositionClinique, QcmPropoIndex) => {
                            if (QcmPropoIndex === VisibiliteCasCliniqueIndex) {
                              return (
                                <div key={QcmPropoIndex}>
                                  {PropositionClinique.map(
                                    (propofina, indexPropo) => {
                                      if (indexPropo === QcmIndex) {
                                        return (
                                          <div
                                            className={
                                              classes.propofeild_ul_phone
                                            }
                                            key={indexPropo}
                                          >
                                            <ul
                                              onCopy={disableCopyPaste}
                                              onCut={disableCopyPaste}
                                              onPaste={disableCopyPaste}
                                              style={{
                                                userSelect: "none",
                                              }}
                                              multiple={true}
                                              className={`${classes.ulpropo_phone} list-group list-group-flush`}
                                            >
                                              {propofina[indexPropo].map(
                                                (propo, indexPropofinal) => {
                                                  currentQcmIdOfPropo.value =
                                                    propo.qcmClinique.id;

                                                  return (
                                                    <li
                                                      key={indexPropofinal}
                                                      value={propo.id}
                                                      style={{
                                                        backgroundColor:
                                                          SaveVerfieReponsesClinique[
                                                            VisibiliteCasCliniqueIndex
                                                          ][QcmIndex] ===
                                                          QcmIndex
                                                            ? propo.reponseBoolClinique ===
                                                              true
                                                              ? COLORS[1]
                                                              : savePropositionsClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex][
                                                                  indexPropofinal
                                                                ] ===
                                                                  propo.id &&
                                                                propo.reponseBoolClinique ===
                                                                  false
                                                              ? COLORS[0]
                                                              : ""
                                                            : (TrueFullInsertClrClinique ===
                                                                true &&
                                                                SaveClickSelectVerfieAllClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex] ===
                                                                  QcmIndex) ||
                                                              SaveQcmIsAnswerClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex] ===
                                                                QcmIndex
                                                            ? propo.reponseBoolClinique ===
                                                              true
                                                              ? COLORS[1]
                                                              : savePropositionsClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex][
                                                                  indexPropofinal
                                                                ] ===
                                                                  propo.id &&
                                                                propo.reponseBoolClinique ===
                                                                  false
                                                              ? COLORS[0]
                                                              : ""
                                                            : "",
                                                      }}
                                                      className={
                                                        savePropositionsClinique[
                                                          VisibiliteCasCliniqueIndex
                                                        ][QcmIndex][
                                                          indexPropofinal
                                                        ] === propo.id
                                                          ? "list-group-item active"
                                                          : "list-group-item"
                                                      }
                                                      onClick={(e) => {
                                                        handlePropoClick(
                                                          e,
                                                          VisibiliteCasCliniqueIndex,
                                                          QcmIndex,
                                                          indexPropofinal,
                                                          propo.id,
                                                          propo.qcmClinique.id,
                                                          propo.qcmClinique
                                                            .casClinique
                                                            .coursMed.coursName,
                                                          cameFrome[0]
                                                        );
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          AlphabetChoice[
                                                            (IndexAlphabetChoice =
                                                              IndexAlphabetChoice +
                                                              1)
                                                          ]
                                                        }
                                                        height="60%"
                                                        width="40"
                                                      />
                                                      {
                                                        propo.propositionQcmClinique
                                                      }
                                                      {SaveQcmIsAnswerClinique[
                                                        VisibiliteCasCliniqueIndex
                                                      ][QcmIndex] ===
                                                        QcmIndex && (
                                                        <div
                                                          className={`${classes.percentage_phone} `}
                                                        >
                                                          {(
                                                            (propo.countSelect *
                                                              100) /
                                                            SavePercentageCliniqueAmount[
                                                              VisibiliteCasCliniqueIndex
                                                            ][QcmIndex]
                                                          ).toFixed(0)}
                                                          %
                                                        </div>
                                                      )}
                                                    </li>
                                                    //end retunr proposition
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </div>
                                        );
                                      }
                                    }
                                  )}

                                  <div className={classes.btnfooter_phone}>
                                    {SaveQcmIsAnswerClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === "" && (
                                      <FaRegCheckCircle
                                        className={`${classes.BntVerifierrpnse_phone} `}
                                        onClick={(e) => {
                                          handleClickiVerifieReponse(
                                            VisibiliteCasCliniqueIndex,
                                            QcmIndex
                                          );

                                          //*******descreption**************************** */
                                          saveQcmIndex.value[QcmIndex] =
                                            QcmIndex;
                                          saveCaseCliniqueIndex.value[
                                            VisibiliteCasCliniqueIndex
                                          ] = saveQcmIndex.value;
                                          console.log(saveQcmIndex.value);
                                          console.log(
                                            saveCaseCliniqueIndex.value
                                          );
                                        }}
                                      />
                                    )}
                                    {(SaveVerfieReponsesClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === QcmIndex ||
                                      SaveQcmIsAnswerClinique[
                                        VisibiliteCasCliniqueIndex
                                      ][QcmIndex] === QcmIndex) && (
                                      <button
                                        type="button"
                                        className={`${classes.button_10} `}
                                        onClick={(e) => {
                                          handeldescription(
                                            currentQcmIdOfPropo.value
                                          );
                                        }}
                                      >
                                        Explication
                                      </button>
                                    )}

                                    {qcmType === "Cas Clinique" &&
                                      VisibiliteCasCliniqueIndex + 1 ===
                                        ShowQcm.length && (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}
                                    {qcmType === "Tous (Qcm,Cas Clinique)" &&
                                      VisibiliteCasCliniqueIndex + 1 ===
                                        ShowQcm.length && (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}

                                    {VisibleNextBtn.value && (
                                      <div
                                        onClick={(e) =>
                                          handleNextClick({ event: e })
                                        }
                                      >
                                        <button
                                          className={classes.btnsuivant_phone}
                                        >
                                          suivant
                                          <img
                                            style={{
                                              marginLeft: 5,
                                              paddingBottom: 3,
                                            }}
                                            height="20"
                                            width="20"
                                            src={next}
                                            alt="next"
                                          />
                                        </button>
                                      </div>
                                    )}
                                    {VisiblePrevBtn.value && (
                                      <div
                                        onClick={(e) =>
                                          handlePrevClick({ event: e })
                                        }
                                      >
                                        <button
                                          className={classes.btnPrecdent_phone}
                                        >
                                          <img
                                            style={{
                                              marginRight: 2,
                                              paddingBottom: 3,
                                            }}
                                            height="20"
                                            width="20"
                                            src={prev}
                                            alt="prev"
                                          />
                                          precedent
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  {ShowDescQcm && (
                    <DescriptionClinique
                      qcmIdPropsQcmDesc={qcmIdPropsQcmDesc.value}
                    />
                  )}
                </div>
                <div
                  className={`${classes.full_listeqcm_phone}`}
                  data-theme={isDark ? "dark" : "light"}
                  style={{ width: ShowListQcms ? 180 : 10 }}
                >
                  {ShowListQcms && (
                    <div className={`${classes.qcmsliste_phone}`}>
                      <div className={`${classes.qcmsliste_header_phone}`}>
                        <h6>Liste CasClinique</h6>
                      </div>
                      <ul>
                        {ShowCasClinique.map(
                          (casClinique, casCliniqueIndex) => (
                            <>
                              <div key={casCliniqueIndex}>
                                <li
                                  key={casCliniqueIndex}
                                  value={casClinique.id}
                                  className={
                                    SelectcasCliniqueIndex === casCliniqueIndex
                                      ? "list-group-item active  "
                                      : "list-group-item"
                                  }
                                >
                                  <ul
                                    className={`${classes.ul_clinique_clinique_phone} list-group`}
                                  >
                                    <div
                                      onClick={(e) => {
                                        handleItemClick({
                                          event: e,
                                          casCliniqueIndex: casCliniqueIndex,
                                        });
                                      }}
                                    >
                                      <a
                                        className={`${classes.title_casclinique_phone}`}
                                      >
                                        Cas Clinique {casCliniqueIndex + 1}
                                      </a>
                                      <a>
                                        <IoMdArrowDropdown />
                                      </a>
                                    </div>
                                    {CasCliniqueClicked ===
                                      casCliniqueIndex && (
                                      <>
                                        {ShowQcm.map((qcm, index) => {
                                          if (index === casCliniqueIndex) {
                                            return (
                                              <ul
                                                className={`${classes.ul_qcms_clinique_phone}`}
                                              >
                                                {qcm.map(
                                                  (qcmCln, indexqcmClnq) => (
                                                    <div
                                                      key={indexqcmClnq}
                                                      className={`${classes.div_qcm_phone}`}
                                                    >
                                                      <a
                                                        onClick={(e) => {
                                                          handlQcmClickNav({
                                                            event: e,
                                                            indexqcmClnq:
                                                              indexqcmClnq,
                                                          });
                                                        }}
                                                      >
                                                        Question{" "}
                                                        {indexqcmClnq + 1}
                                                      </a>
                                                      {SaveClickSelectVerfieAllClinique[
                                                        casCliniqueIndex
                                                      ][indexqcmClnq] ===
                                                        indexqcmClnq && (
                                                        <div
                                                          className={
                                                            classes.vl_select_phone
                                                          }
                                                        ></div>
                                                      )}
                                                      {SaveQcmIsAnswerClinique[
                                                        casCliniqueIndex
                                                      ][indexqcmClnq] ===
                                                        indexqcmClnq && (
                                                        <div
                                                          className={
                                                            classes.vl_answer_phone
                                                          }
                                                        ></div>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                              </ul>
                                            );
                                          }
                                        })}
                                      </>
                                    )}
                                  </ul>
                                </li>
                              </div>
                            </>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  <div className={`${classes.iconlistqcm_phone}`}>
                    <img
                      src={dropright}
                      height="30"
                      width="30"
                      onClick={(e) => {
                        handleShowListeQcms();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {modalDeleteCourIsOpen && (
              <ModalDeleteFullDescClinique
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                qcmId_delete={qcmIddelete.value}
              />
            )}
            {modalDeleteCourIsOpen && (
              <BackdropDeleteCour onCancel={closeDeleteModalHandler} />
            )}

            {ModalDeleteCliniqueIsOpen && (
              <ModalDeleteCasClinique
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                casCliniqueId={currentCasCliniqueId.value}
              />
            )}
            {ModalDeleteCliniqueIsOpen && (
              <Backdrop onCancel={closeDeleteModalHandler} />
            )}
            {ModalDeleteQcmCliniqueIsOpen && (
              <ModalDeleteQcmCasClinique
                onCancel={closeDeleteqcmCliniqueModalHandler}
                onConfirm={closeDeleteqcmCliniqueModalHandler}
                qcmCasCliniqueId={currentQcmCasCliniqueId.value}
              />
            )}
            {ModalDeleteQcmCliniqueIsOpen && (
              <Backdrop onCancel={closeDeleteqcmCliniqueModalHandler} />
            )}
          </div>
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz}>
                <div className={classes.card_done_quiz_btns}>
                  <h6> {ShowNoSelectPropoMessage}</h6>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerConfirmShowAllReponse}
                  >
                    je sais,Afficher les reponses
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerCancelShowAllReponse}
                  >
                    Retour au Quiz
                  </button>
                </div>
              </div>
            </>
          )}
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}

          {isDesktopOrLaptop && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz}>
                {visiblePlayListe && (
                  <div className={classes.playliste}>
                    <div className={classes.playliste_input}>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nome de PlayListe"
                        onChange={(e) => setPlayListeName(e.target.value)}
                      />
                      <img
                        src={addplayliste}
                        height="70%"
                        width="25"
                        onClick={() => {
                          handleCreatPlayListe();
                        }}
                      />
                    </div>
                    <div className={classes.playlistesdiv}>
                      <div className={"form-check"}>
                        {allPLayListes.map((playliste, index) => (
                          <div key={index} className={classes.playlisteitem}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id={playliste.playlisteName}
                              value={playliste.id}
                              onChange={() => {
                                handleOnchangePlayListe(playliste.id);
                              }}
                            ></input>
                            <h6
                              className={`${classes.playlisteh6} form-check-label `}
                            >
                              {playliste.playlisteName}
                            </h6>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={classes.suivant_btn}>
                      <button
                        type="button"
                        style={{ marginTop: 10 }}
                        className="btn btn-info"
                        onClick={() => {
                          setVisiblePlayListe(false);
                          setVisibleSaveQuizzEnter(true);
                        }}
                      >
                        suivant
                      </button>{" "}
                    </div>
                  </div>
                )}

                {visibleSaveQuizzEnter && (
                  <div className={classes.save_quizz_conetent}>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nome de quizz"
                      onChange={(e) => setCasCliniqueQuizzName(e.target.value)}
                    />
                    <div className={classes.save_quizz_conetent_btns}>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setVisiblePlayListe(true);
                          setVisibleSaveQuizzEnter(false);
                        }}
                      >
                        précenent
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          handleSaveCasCliniqueQuizzBtn(
                            sourceQuizzName,
                            sourceSaveQuizzBtn
                          );
                        }}
                      >
                        Save Quizz
                      </button>{" "}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {isDesktopOrLaptop && ModalSaveQuizzIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalSaveQcmQuizHandler} />
          )}
          {isTabletOrMobile && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz_phone}>
                <div className={classes.card_done_quiz_btns_phone}>
                  <h6>
                    {" "}
                    Il y a des questions à laquelle vous n'avez pas répondu dans
                    cette quizz
                  </h6>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerConfirmShowAllReponse}
                  >
                    je sais,Afficher les reponses
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerCancelShowAllReponse}
                  >
                    Retour au Quiz
                  </button>
                </div>
              </div>
            </>
          )}
          {isTabletOrMobile &&
            (ModalDoneQuizIsOpen || ShowModelActionsPhone) && (
              <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
            )}

          {isTabletOrMobile && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz_phone}>
                {visiblePlayListe && (
                  <div className={classes.playliste_phone}>
                    <div className={classes.playliste_input_phone}>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nome de PlayListe"
                        onChange={(e) => setPlayListeName(e.target.value)}
                      />
                      <img
                        src={addplayliste}
                        height="70%"
                        width="25"
                        onClick={() => {
                          handleCreatPlayListe();
                        }}
                      />
                    </div>
                    <div className={classes.playlistesdiv_phone}>
                      <div className={"form-check"}>
                        {allPLayListes.map((playliste, index) => (
                          <div
                            key={index}
                            className={classes.playlisteitem_phone}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id={playliste.playlisteName}
                              value={playliste.id}
                              onChange={() => {
                                handleOnchangePlayListe(playliste.id);
                              }}
                            ></input>
                            <h6
                              className={`${classes.playlisteh6_phone} form-check-label `}
                            >
                              {playliste.playlisteName}
                            </h6>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={classes.suivant_btn_phone}>
                      <button
                        type="button"
                        style={{ marginTop: 10 }}
                        className="btn btn-info"
                        onClick={() => {
                          setVisiblePlayListe(false);
                          setVisibleSaveQuizzEnter(true);
                        }}
                      >
                        suivant
                      </button>{" "}
                    </div>
                  </div>
                )}

                {visibleSaveQuizzEnter && (
                  <div className={classes.save_quizz_conetent_phone}>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nome de quizz"
                      onChange={(e) => setCasCliniqueQuizzName(e.target.value)}
                    />
                    <div className={classes.save_quizz_conetent_btns_phone}>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          handleSaveCasCliniqueQuizzBtn(
                            sourceQuizzName,
                            sourceSaveQuizzBtn
                          );
                        }}
                      >
                        Save Quizz
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setVisiblePlayListe(true);
                          setVisibleSaveQuizzEnter(false);
                        }}
                      >
                        précenent
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {isTabletOrMobile && ModalSaveQuizzIsOpen && (
            <BackdropSaveQuizPhone onCancel={closeModalSaveQcmQuizHandler} />
          )}
          {isDesktopOrLaptop &&
            ShowModalStatique &&
            ShowModalStatiqueParCour &&
            props.qcmType === "Cas Clinique" && (
              <>
                <div className={classes.fullstatique}>
                  <div className={classes.bothfullstatique}>
                    <div className={classes.fullpiebarestatique}>
                      <div className={classes.piestatique}>
                        <Doughnut options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>
                    <div className={classes.fullrightstatiquediv}>
                      <div className={classes.headerbounate}>
                        <div
                          className={`${classes.cardbodynumber} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time}>
                            {saveAllNumberCasClinique.value} Cas Clinique
                          </h5>
                        </div>

                        <div
                          className={`${classes.cardbodycard_timer} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time}>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[0].hours
                                : hours}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[1].minutes
                                : minutes}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[2].seconds
                                : seconds}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className={classes.fulleachcours_clinique}>
                        <div className={classes.Qcm_CasClinique_Title_clinique}>
                          {" "}
                          Cas Clinique
                        </div>
                        {SaveQcmsCourNameStatiqueClinique.map(
                          (nomCour, index) => (
                            <div
                              key={index}
                              className={classes.eachbounatecour_clinique}
                            >
                              <div className={classes.namecourdounate}>
                                <div>{nomCour}</div>
                              </div>
                              <div className={classes.donatecour}>
                                <Doughnut
                                  options={optionsDounate}
                                  data={dounateData[index]}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          {isDesktopOrLaptop &&
            ShowModalStatique &&
            ShowModalStatiqueParCour &&
            props.qcmType === "Tous (Qcm,Cas Clinique)" && (
              <>
                <div className={classes.fullstatique}>
                  <div className={classes.bothfullstatique}>
                    <div className={classes.fullpiebarestatique}>
                      <div className={classes.piestatique}>
                        <Doughnut options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>

                    <div className={classes.fullrightstatiquediv}>
                      <div className={classes.headerbounate}>
                        <div
                          className={`${classes.cardbodynumber} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time}>
                            {props.nbrAllQclStatique} Questions
                          </h5>
                          <h5 className={classes.titlenumber_time}>
                            {saveAllNumberCasClinique.value} Cas Cliniques
                          </h5>
                        </div>
                        <div
                          className={`${classes.cardbodycard_timer} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time}>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[0].hours
                                : hours}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[1].minutes
                                : minutes}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[2].seconds
                                : seconds}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className={classes.fulleachcours_qcmclinique}>
                        <div className={classes.fulleachcours_eachqcmClinique}>
                          <div
                            className={
                              classes.Qcm_CasClinique_Title_qcmclinique
                            }
                          >
                            {" "}
                            Qcms
                          </div>
                          {props.SaveQcmsCourNameStatique.map(
                            (nomCourQcm, index) => (
                              <div
                                key={index}
                                className={classes.eachbounatecour_qcmclinique}
                              >
                                <div className={classes.namecourdounate}>
                                  <div>{nomCourQcm}</div>
                                </div>
                                <div className={classes.donatecour}>
                                  <Doughnut
                                    options={optionsDounate}
                                    data={props.dounateDataQcms[index]}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className={classes.fulleachcours_eachqcmClinique}>
                          <div
                            className={
                              classes.Qcm_CasClinique_Title_qcmclinique
                            }
                          >
                            {" "}
                            Cas Clinique
                          </div>
                          {SaveQcmsCourNameStatiqueClinique.map(
                            (nomCourClinique, index) => (
                              <div
                                key={index}
                                className={classes.eachbounatecour_qcmclinique}
                              >
                                <div className={classes.namecourdounate}>
                                  <div>{nomCourClinique}</div>
                                </div>
                                <div className={classes.donatecour}>
                                  <Doughnut
                                    options={optionsDounate}
                                    data={dounateData[index]}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          {isTabletOrMobile &&
            ShowModalStatique &&
            ShowModalStatiqueParCour &&
            props.qcmType === "Tous (Qcm,Cas Clinique)" && (
              <>
                <div className={classes.fullstatique_phone}>
                  <div className={classes.bothfullstatique_phone}>
                    <div className={classes.fullpiebarestatique_phone}>
                      <div className={classes.piestatique_phone}>
                        <Doughnut options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique_phone}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>

                    <div className={classes.fullrightstatiquediv_phone}>
                      <div className={classes.headerbounate_phone}>
                        <div
                          className={`${classes.cardbodynumber_phone} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time_phone}>
                            {props.nbrAllQclStatique} Questions
                          </h5>
                          <h5 className={classes.titlenumber_time_phone}>
                            {saveAllNumberCasClinique.value} Cas Cliniques
                          </h5>
                        </div>
                        <div
                          className={`${classes.cardbodycard_timer_phone} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time_phone}>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[0].hours
                                : hours}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[1].minutes
                                : minutes}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[2].seconds
                                : seconds}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className={classes.fulleachcours_qcmclinique_phone}>
                        <div
                          className={
                            classes.fulleachcours_eachqcmClinique_phone
                          }
                        >
                          <div
                            className={
                              classes.Qcm_CasClinique_Title_qcmclinique_phone
                            }
                          >
                            {" "}
                            Qcms
                          </div>
                          {props.SaveQcmsCourNameStatique.map(
                            (nomCourQcm, index) => (
                              <div
                                key={index}
                                className={
                                  classes.eachbounatecour_qcmclinique_phone
                                }
                              >
                                <div className={classes.namecourdounate_phone}>
                                  <div>{nomCourQcm}</div>
                                </div>
                                <div className={classes.donatecour_phone}>
                                  <Doughnut
                                    options={optionsDounate}
                                    data={props.dounateDataQcms[index]}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div
                          className={
                            classes.fulleachcours_eachqcmClinique_phone
                          }
                        >
                          <div
                            className={
                              classes.Qcm_CasClinique_Title_qcmclinique_phone
                            }
                          >
                            {" "}
                            Cas Clinique
                          </div>
                          {SaveQcmsCourNameStatiqueClinique.map(
                            (nomCourClinique, index) => (
                              <div
                                key={index}
                                className={
                                  classes.eachbounatecour_qcmclinique_phone
                                }
                              >
                                <div className={classes.namecourdounate_phone}>
                                  <div>{nomCourClinique}</div>
                                </div>
                                <div className={classes.donatecour_phone}>
                                  <Doughnut
                                    options={optionsDounate}
                                    data={dounateData[index]}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          {isTabletOrMobile &&
            ShowModalStatique &&
            ShowModalStatiqueParCour &&
            props.qcmType === "Cas Clinique" && (
              <>
                <div className={classes.fullstatique_phone}>
                  <div className={classes.bothfullstatique_phone}>
                    <div className={classes.fullpiebarestatique_phone}>
                      <div className={classes.piestatique_phone}>
                        <Doughnut options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique_phone}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>
                    <div className={classes.fullrightstatiquediv_phone}>
                      <div className={classes.headerbounate_phone}>
                        <div
                          className={`${classes.cardbodynumber_phone} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time_phone}>
                            {saveAllNumberCasClinique.value} Cas Clinique
                          </h5>
                        </div>

                        <div
                          className={`${classes.cardbodycard_timer_phone} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time_phone}>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[0].hours
                                : hours}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[1].minutes
                                : minutes}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[2].seconds
                                : seconds}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className={classes.fulleachcours_clinique_phone}>
                        <div
                          className={
                            classes.Qcm_CasClinique_Title_clinique_phone
                          }
                        >
                          {" "}
                          Cas Clinique
                        </div>
                        {SaveQcmsCourNameStatiqueClinique.map(
                          (nomCour, index) => (
                            <div
                              key={index}
                              className={classes.eachbounatecour_clinique_phone}
                            >
                              <div className={classes.namecourdounate_phone}>
                                <div>{nomCour}</div>
                              </div>
                              <div className={classes.donatecour_phone}>
                                <Doughnut
                                  options={optionsDounate}
                                  data={dounateData[index]}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          {isTabletOrMobile && ShowModalStatique && (
            <BackdropSaveQuizPhone onCancel={closeModalDoneQuizHandler} />
          )}
          {isDesktopOrLaptop && showChatGpt && (
            <div className={`${classes.chatgptdiv}`}>
              <ChatGptfinal qcmId={QcmIdNote} cameFrom="quizClinique" />
            </div>
          )}
          {isTabletOrMobile && showChatGpt && (
            <div className={`${classes.chatgptdiv_phone}`}>
              <ChatGptfinal
                qcmId={qcmIdChatGptDeepSeek.value}
                cameFrom="quizClinique"
              />
            </div>
          )}
          {isDesktopOrLaptop &&
            ShowModalStatique &&
            ShowModalStatiqueParSujet && (
              <>
                <div className={classes.fullstatique}>
                  <div className={classes.bothfullstatique}>
                    <div className={classes.fullpiebarestatique}>
                      <div className={classes.piestatique}>
                        <Pie options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          {isDesktopOrLaptop && ShowModalStatique && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}

          {isTabletOrMobile &&
            ShowModalStatique &&
            ShowModalStatiqueParSujet && (
              <>
                <div className={classes.fullstatique_phone}>
                  <div className={classes.bothfullstatique_phone}>
                    <div className={classes.fullpiebarestatique_phone}>
                      <div className={classes.piestatique_phone}>
                        <Pie options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique_phone}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          {isDesktopOrLaptop && ShowModalStatique && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
        </>
      )}
      {OpenBoardQcm && (
        <QuizBoard
          moduleName={props.moduleName}
          minYearQcm={props.minYearQcm}
          maxYearQcm={props.maxYearQcm}
          ExisteCasClinique={props.ExisteCasClinique}
          selectMultipleCours={props.selectMultipleCours}
          courId={courId}
          sessionName={props.sessionName}
          qcmType={qcmType}
          TrueFullInsertClr={
            JSON.parse(
              localStorage.getItem("IsCkickShowAllReponsesClinique")
            ) === true
          }
          QcmSujetTypeSelected={props.QcmSujetTypeSelected}
          getYear={props.getYear}
          getGroupePerm={props.getGroupePerm}
          QuizQcmQclinique={QuizQcmQclinique}
          moduleId={props.moduleId}
          SelectedSourceExmn={props.SelectedSourceExmn}
          backFromCliniqueAllQcmCliniqueprSujet={
            backFromCliniqueAllQcmCliniqueprSujet.value
          }
          minMaxYearParSujetsFinal={props.minMaxYearParSujetsFinal}
          checkParSjtBiologieClinique={props.checkParSjtBiologieClinique}
          savePropositions={props.savePropositions}
          SaveVerfieReponses={props.SaveVerfieReponses}
          SaveQcmIsAnswer={props.SaveQcmIsAnswer}
          SaveClickSelectVerfieAll={props.SaveClickSelectVerfieAll}
          SavePercentageAmount={props.SavePercentageAmount}
          doneGetAllClinique={doneGetAllClinique.value}
          savePropositionsClinique={savePropositionsClinique}
          SaveVerfieReponsesClinique={SaveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={SaveQcmIsAnswerClinique}
          TrueFullInsertClrClinique={TrueFullInsertClrClinique}
          SaveClickSelectVerfieAllClinique={SaveClickSelectVerfieAllClinique}
          veriferAllreponseClicked={props.veriferAllreponseClicked}
          SavePercentageCliniqueAmount={SavePercentageCliniqueAmount}
          qcmAndCliniqueTimer={true}
          isPassQcmClinique={isPassQcmClinique.value}
          watchValues={[
            { hours: props.watchValues[0].hours },
            { minutes: props.watchValues[1].minutes },
            { seconds: props.watchValues[2].seconds },
          ]}
          commingFrom={props.commingFrom}
          //Qcms State*********************************************************
          SaveCorrectAnswer={props.SaveCorrectAnswer}
          SaveIsClickedCounter={props.SaveIsClickedCounter}
          savePieStatique={props.savePieStatique}
          SaveEachLineStatique={props.SaveEachLineStatique}
          nbrAllQclStatique={props.nbrAllQclStatique}
          //clinique State*****************************************************
          SaveCorrectAnswerClinique={SaveCorrectAnswerClinique}
          SaveIsClickedCounterClinique={SaveIsClickedCounterClinique}
          savePieStatiqueClinique={savePieStatiqueClinique}
          SaveEachLineStatiqueClinique={SaveEachLineStatiqueClinique}
        />
      )}
      <Toaster />
      {ShowModelActionsPhone && isTabletOrMobile && (
        <div className={classes.full_save_casclinique_phone}>
          {showSaveCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                console.log("heyy");
                setModalSaveQuizzIsOpen(true);
                setShowModelActionsPhone(false);

                setVisibleSaveQuizzEnter(false);
                setVisiblePlayListe(true);
              }}
            >
               Ajouter a la playList
            </button>
          )}
          {showUpdateCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateCasCliniqueQuizz();
              }}
            >
              Save modification
            </button>
          )}
          {showSaveQcmCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                setModalSaveQuizzIsOpen(true);
                setShowModelActionsPhone(false);

                setVisibleSaveQuizzEnter(false);
                setVisiblePlayListe(true);
              }}
            >
               Ajouter a la playList
            </button>
          )}
          {showUpdateQcmCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateQcmCasCliniqueQuizz();
              }}
            >
              Save modification
            </button>
          )}

          {showSaveSessionCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleSaveCasCliniqueQuizz(
                  sourceSessionName,
                  sourceSaveSessionBtn
                );
              }}
            >
              Fin Session
            </button>
          )}
          {showUpdateSessionCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateCasCliniqueQuizz();
              }}
            >
              Save Modification
            </button>
          )}

          {showSaveSessionQcmCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleSaveQcmCasCliniqueQuizz(
                  sourceSessionName,
                  sourceSaveSessionBtn
                );
              }}
            >
              Fin Session
            </button>
          )}
          {showUpdateSessionQcmCasCliniqueBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateQcmCasCliniqueQuizz();
              }}
            >
              Save modification
            </button>
          )}
          <button
            type="button"
            style={{ marginTop: 8 }}
            className="btn btn-danger"
            onClick={() => {
              navigateHome("/goatqcm", {
                state: {
                  getUserName: username,
                  userId: userId,
                },
              });
            }}
          >
            Terminer
          </button>
        </div>
      )}
      {isDesktopOrLaptop && getDuiscussionDivStatus == "true" && (
        <ChatBox chatcode={codechatlocation} />
      )}
      {isTabletOrMobile && getDuiscussionDivStatus == "true" && (
        <ChatBox chatcode={codechatlocation} />
      )}
    </>
  );
}

export default QuizBoardClinique;
