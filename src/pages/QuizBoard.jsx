import { useEffect, useRef, useState, useCallback } from "react";
import messanger from "../compenent/layout/img/messanger.png";

import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./QuizBoard.module.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import { useSignal } from "@preact/signals-react";
import { useLocation } from "react-router-dom";
import QuizBoardClinique from "./QuizBoardClinique";
import { useNavigate } from "react-router-dom";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import externatlogo from "../compenent/layout/externatlogo.svg";
import courlogo from "../compenent/layout/courlogo.svg";
import groupelogo from "../compenent/layout/groupelogo.svg";
import A from "../compenent/layout/img/A.png";
import B from "../compenent/layout/img/B.png";
import C from "../compenent/layout/img/C.png";
import D from "../compenent/layout/img/D.png";
import E from "../compenent/layout/img/E.png";
import eysezoom from "../compenent/layout/img/eysezoom.png";
import next from "../compenent/layout/img/next.png";
import prev from "../compenent/layout/img/prev.png";
import closecommentary from "../compenent/layout/img/closecommentary.png";
import upimagecommentary from "../compenent/layout/img/upimagecommentary.png";

import pub from "../compenent/layout/img/pub.png";
import chatgpt from "../compenent/layout/img/chatgpt.png";
import deepseek from "../compenent/layout/img/deepseek.png";
import axiosRetry from "axios-retry";
import DateObject from "react-date-object";

import smileimoji from "../compenent/layout/img/smileimoji.png";
import sendcomentary from "../compenent/layout/img/sendcomentary.png";
import noteimage from "../compenent/layout/img/note.png";
import comment from "../compenent/layout/img/comment.png";
import dropright from "../compenent/layout/img/dropright.png";
import jadore from "../compenent/layout/img/jadore.png";
import { AiOutlineComment } from "react-icons/ai";
import BackdropQuiz from "./BackdropQuiz";
import ChatGptfinal from "./ChatGptfinal";
import UserService from "../compenent/layout/service/UserService";
import BackdropDeleteCour from "./BackdropDeleteCour";
import ModalDeleteFullDesc from "./ModalDeleteFullDesc";
import toast, { Toaster } from "react-hot-toast";
import Description from "./Description";
import ImageQcm from "./ImageQcm";
import { useMediaQuery } from "react-responsive";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { LegendToggleOutlined, Margin, Style } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import useLocalStorage from "use-local-storage";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import { faWhiskeyGlass } from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropright } from "react-icons/io";
import { useStopwatch } from "react-timer-hook";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoPauseCircleOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import Backdrop from "./Backdrop";
import BackdropSaveQuizPhone from "./BackdropSaveQuizPhone.jsx";
import { TfiClose } from "react-icons/tfi";
import { BsSave } from "react-icons/bs";
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
import NoteQcm from "./NoteQcm.jsx";
import ChatBox from "../compenent/layout/ChatBox.jsx";
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
import DeepSeek from "./DeepSeek.jsx";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
function QuizBoard(props) {
  const userIdToken = localStorage.getItem("userId");
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const navigatLogin = useNavigate();
  let currentIndexFetch = 0;
  let lastTriggeredIndex = 0;
  const [ShowDiscsussionDiv, setShowDiscsussionDiv] = useState(false);
  //**chat Box*************************************************************** */
  const getDuiscussionDivStatus = localStorage.getItem("showdiscussiondiv");
  const codechatlocation = localStorage.getItem("codechatlocation");
  //************************************************************************ */
  // Retry config: 3 retries, with exponential backoff
  axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      return axiosRetry.isNetworkError(error) || error.code === "ECONNABORTED";
    },
  });
  const Date = new DateObject();
  const sourceBtnSaveQuizz = "saveQuizz";
  const sourceBtnSaveSession = "saveSession";
  const BASE_URL = "https://goatqcm-instance.com";
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  let navigateLogin = useNavigate();
  let navigateEditeQcm = useNavigate();
  let navigateHome = useNavigate();
  let navigateDeleteQcmHandler = useNavigate();
  const years = [
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
    "2025",
  ];
  const [shoYearBackFromCliniqueParSujet, setshoYearBackFromCliniqueParSujet] =
    useState(false);
  const [ShowSideBare, setShowSideBare] = useState(false);
  const [ShowQcm, setShowQcm] = useState([]);

  let getQcms = useSignal([]);
  const resultGetLoadPropo = useSignal([]);
  const resultGetLoadQcms = useSignal([]);
  const [ShowPropositions, setShowPropositions] = useState([]);
  const currentIndex = useSignal(0);
  const [VisibiliteQcmIndex, setVisibiliteQcmIndex] = useState(0);
  //******multiple cours *****************************/
  const doneUplaodQcm = useSignal(true);
  let incCours = useSignal(0);
  let incCmntr = useSignal(0);
  //************************************************** */
  const [VisibilitePorpoIndex, setVisibilitePorpoIndex] = useState(0);
  const VisibleNextBtn = useSignal(true);
  const VisiblePrevBtn = useSignal(false);

  const COLORS = ["#fd5c63", "#17B169", "#FFC72C"];
  const [TrueInsertClr, setTrueInsertClr] = useState("");
  const [TrueInsertClrClick, setTrueInsertClrClick] = useState("");
  let [TrueFullInsertClr, setTrueFullInsertClr] = useState(false);
  let selectSaveIndex = useSignal([]);
  let AlphabetChoice = [A, B, C, D, E];
  let IndexAlphabetChoice = useSignal(-1);
  const [OpenBoardClinique, setOpenBoardClinique] = useState(false);
  const [VisibleParSujet, setVisibleParSujet] = useState(false);
  const [VisibleQmcContainer, setVisibleQmcContainer] = useState(false);
  const [GroupesPermut, setGroupesPermut] = useState([]);
  const [GetYearProps, setGetYearProps] = useState([]);
  const [VisibleGroupeChange, setVisibleGroupeChange] = useState("true");
  let getYear = useSignal("");
  let getGroupePerm = useSignal("");
  let getCurrentYear = "";
  let getCurrentGroupePerm = "";
  let getCasCliniqueLength = 0;
  const finalgetCasCliniqueLength = useSignal("");
  const [getlengthCasCliniqueParSjr, setgetlengthCasCliniqueParSjr] =
    useState("");
  /*const { state } = useLocation();
  const { courId, qcmType } = state;*/
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isParticipateAdmin = UserService.isParticipateAdmin();
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");

  //******SideBare Change************************************* */
  //***************show descr***************************************** */
  const [qcmIdPropsQcmDesc, setQcmIdPropsQcmDesc] = useState("");

  const [ShowDescQcm, setShowDescQcm] = useState(false);
  const [ShowVerifierRpnsBtn, setShowVerifierRpnsBtn] = useState(true);
  const [ShowDescRpnsBtn, setShowDescRpnsBtn] = useState(false);
  const saveQcmIndex = useSignal([]);
  //******************************************************************** */
  //***********description methodes********************************************************* */
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
  const [visibleNoteQcm, setVisibleNoteQcm] = useState(false);

  const [FullDescEdite, setFullDescEdite] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmStandard: {},
  });
  //************************************************************************ */
  let saveAllQcms = useSignal([]);
  const userFinal = { id: "", name: "", lastname: "", password: "", role: "" };
  //*************commentary******************************************************************************** */
  const numberCommentaryQcm = useSignal([]);
  const [qcmCommentary, setQcmCommentary] = useState([]);
  const numbreCommentaryFinal = useSignal([]);
  const [visibleCommentaryStudent, setVisibleCommentaryStudent] =
    useState(false);

  const [CommentaryUpdate, setCommentaryUpdate] = useState({
    likes: "",
  });
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [ShowListQcms, setShowListQcms] = useState(false);
  //***************************************************************** */

  const [Commentary, setCommentary] = useState({
    commentaryStudent: "",
    ourUsers: {},
    qcmStandard: {},
  });
  const [list, setList] = useState([]);
  let saveEachCommentary = useSignal([]);
  //************************************************* */

  //****save propo selected******************************************* */
  let [savePropositions, setSavePropositions] = useState([]);
  let saveCurrentPropo = [];
  const [SaveVerfieReponses, setSaveVerfieReponses] = useState([]);
  const [SaveQcmIsAnswer, setSaveQcmIsAnswer] = useState([]);
  const [SaveClickSelectVerfieAll, setSaveClickSelectVerfieAll] = useState([]);
  let [SaveCorrectAnswer, setSaveCorrectAnswer] = useState([]);
  const [SaveIsClickedCounter, setSaveIsClickedCounter] = useState([]);
  const doneFirstUplaod = useSignal(false);
  const [isAnonyme, setIsAnonyme] = useState(false);
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
  //*****save qcm******************************************* */
  const saveUserQcm = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };
  //*********commnetaire************************************************** */
  const getUser = async () => {
    console.log(userId);
    console.log(token);
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role),
        (save.ourUsers = userFinal);
    } catch (Exception) {
      console.log("user not found");
    }
  };
  //***************************************************************** **************************************/

  //********DoneQuiz********************************************* */
  const [ModalDoneQuizIsOpen, setModalDoneQuizIsOpen] = useState(false);
  //*****get qcm Commentary****************************************** */

  const getQcmCommentary = async (qcmId) => {
    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    console.log(result.data);
    Commentary.qcmStandard = result.data;
  };
  //******************************************************************** */
  const [isDisabled, setDisabled] = useState(false);
  //***************************************************************************** */
  const [countJadore, setCountJadore] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  //******************************************************************* */
  //*****responde all ***********************************************// */
  const [IsRepondeAll, setIsRepondeAll] = useState(true);
  const IsRepondeAllSignal = useSignal(true);
  //****************************************************************** */
  //******percentage************************************** */
  const saveAllCouentSelect = useSignal([]);
  let [SavePercentageAmount, setSavePercentageAmount] = useState([]);
  let saveCurrentAmount = [];
  //********************************************************* */

  const [SaveQcmQuizz, setSaveQcmQuizz] = useState({
    nameQcmQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    dateSaveQuizzSession: "",
    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
    ourUsers: {},
  });
  const [SaveQcmSession, setSaveQcmSession] = useState({
    nameQcmSession: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    dateSaveQuizzSession: "",
    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
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

  let [ShowCancelQuizzPhone, setShowCancelQuizzPhone] = useState(false);
  let [showSaveQcmBtn, setShowSaveQcmBtn] = useState(false);
  let [showUpdateQcmBtn, setShowUpdateQcmBtn] = useState(false);
  let [showSaveSessionQcmBtn, setShowSaveSessionQcmBtn] = useState(false);
  let [showUpdateSessionQcmBtn, setShowUpdateSessionQcmBtn] = useState(false);
  const [ModalSaveQuizzIsOpen, setModalSaveQuizzIsOpen] = useState(false);
  const [qcmQuizzName, setQcmQuizzName] = useState("");
  const doneFirstUplaodSaveQcm = useSignal(false);
  //********************************************************* */
  const [ShowModelActionsPhone, setShowModelActionsPhone] = useState(false);
  //****update qcmquizz************************************** */
  const [updateQcmQuizz, setUpdateQcmQuizz] = useState({
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    saveCorrectAnswer: "",
    saveIsClickedCounter: "",
    savePieStatique: "",
    saveEachLineStatique: "",
  });
  //********************************************************** */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const disableCopyPaste = (e) => {
    e.preventDefault();
  };
  //*********************************************************************** */
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const qcmIddelete = useSignal("");
  //**************************** */
  const [ExisteNote, setExisteNote] = useState(false);

  //****select liste qcms ***************************** */
  const [SelectQcmIndex, setSelectQcmIndex] = useState("");

  //******Statique**************************************** */
  const [ShowModalStatiqueParCour, setShowModalStatiqueParCour] =
    useState(false);
  const [ShowModalStatiqueParSujet, setShowModalStatiqueParSujet] =
    useState(false);
  const [ShowModalStatique, setShowModalStatique] = useState(false);
  const [savePieStatique, setSavePieStatique] = useState([0, 0, 0]);
  const [SaveQcmsNbrStatique, setSaveQcmsNbrStatique] = useState([]);
  const [SaveQcmsCourNameStatique, setSaveQcmsCourNameStatique] = useState([]);
  const [SaveEachLineStatique, setSaveEachLineStatique] = useState([]);
  const newStateEachLineStatique = [];
  const [showCreatPub, setShowCreatPub] = useState(false);
  let [newPost, setNewPost] = useState({
    content: "",
    anonyme: false,
    ourUsers: { id: userIdToken },
  });
  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    const fullDescResult = await axios.get(
      `${BASE_URL}/fulldesc/descqcm/${qcmId}`
    );

    console.log(fullDescResult.data);
    if (fullDescResult.data !== null) {
      setFullDescEdite(fullDescResult.data);
      setFileDisplayEdite(
        `${BASE_URL}/image/${qcmId}/${fullDescResult.data.imageName}`
      );

      setLoadImage(fullDescResult.data);
      setvisisbleDescInsert(false);
      setVisisbleDescUpdate(true);
    } else {
      setvisisbleDescInsert(true);
      setVisisbleDescUpdate(false);
    }
    //getFullDesc.value = fullDescResult.data;
  };
  //******************************************* */
  const handleNoteQcmBtn = async (qcmId) => {
    testNoteExsite(qcmId);
    setVisibleNoteQcm(!visibleNoteQcm);
  };
  //****test if desc existe******************** */
  const testNoteExsite = async (qcmId) => {
    console.log(qcmId);
    console.log(userId);

    try {
      const fullDescResultiniial = await axios.get(
        `https://goatqcm-instance.com/noteqcm/${qcmId}/${userId}`
      );
      console.log(fullDescResultiniial.data);
      setExisteNote(true);
    } catch (Exception) {}
  };
  //******************************************* *

  ///*****update image************************************** */
  const UpdateImage = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(`${BASE_URL}/image/updateimage/${qcmId}`, formData)
      .then((res) => {
        console.log("success updating");
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
      .put(`${BASE_URL}/image/updatedesc/${qcmId}`, formData)
      .then((res) => {
        console.log("success updating");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  //***store image to database*************************** */
  const AjouterImage = async (qcmId) => {
    testDescExsite(qcmId);

    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    formData.append("image", file);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/uploadimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //***store description to database*************************** */
  const AjouterDesc = async (qcmId) => {
    testDescExsite(qcmId);
    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    const formData = new FormData();
    formData.append("desc", description);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/uploadesc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (qcmId) => {
    qcmIddelete.value = qcmId;
    setModalDeleteCourIsOpen(true);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //*****end of description methods**************************************************************************** */

  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************************* */
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }
  const [shoCopyParModule, setShoCopyParModule] = useState(true);

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
  const [showChatGpt, setShowChatGpt] = useState(false);
  const [showDeepSeek, setShowDeepSeek] = useState(false);
  let qcmIdChatGptDeepSeek = useSignal("");
  let deviceId = localStorage.getItem("deviceId");
  /**share screen variable********************************************************* */

  useEffect(() => {
    /**share screen **************************************************************************** */
    console.log(isToggled);
    console.log(shareScreenCode);
    console.log(props.doneGetAllClinique);
    //getUserShare();

    /**share screen ***************************************************************************** */

    console.log(props.sessionsLength);
    console.log(props.selectMultipleCours[0]);
    //***suizzDashboard********************************************** */
    console.log(props.QcmSujetTypeSelected); //parCours /parSujet
    console.log(props.SelectedSourceExmn); //Externat/Residanant
    console.log(props.moduleId); //module id
    console.log(props.selectMultipleCours); //cours Ids
    console.log(props.qcmType); //Qcm/casClinique/Qcm et casClinque
    console.log(props.minYearQcm); //minYear-parCours)
    console.log(props.maxYearQcm); //minMax-parCours)
    //************************************************************** */
    console.log(props.ExisteCasClinique);
    /* console.log(props.checkParSjtBiologieClinique);
     console.log(props.TrueFullInsertClr); 
     console.log(props.savePropositionsClinique);
   
    console.log(props.minMaxYearParSujetsFinal);
    console.log(props.QuizQcmQclinique);*/

    console.log(props.backFromCliniqueAllQcmCliniqueprSujet);
    if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
        console.log("hulaaaaaa");
        //setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        //loadyearQcmsParSujet();
        loadQcms();
      }
      // if (props.goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt === true) {
      if (props.SelectedSourceExmn === "Externat Blida") {
        setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
      } else if (props.SelectedSourceExmn === "Résidanat Blida") {
        console.log("weclom resdtn");
        setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
        setVisibleGroupeChange(false);
      }
      //}
      // loadQcms();
      //} else if (props.QuizQcmQclinique === true) {
      /* setVisibleParSujet(true);
        setVisibleQmcContainer(true);*/

      //  }
    } else if (props.QcmSujetTypeSelected === "Par Cour") {
      setVisibleParSujet(false);
      setVisibleQmcContainer(true);
      loadQcms();
    }
    //Qcms State*****************************************************
    console.log("Qcms State**");
    console.log(props.SaveCorrectAnswer);
    console.log(props.SaveIsClickedCounter);
    console.log(props.savePieStatique);
    console.log(props.SaveEachLineStatique);
    //clinique State*****************************************************
    console.log("clinique State**");
    console.log(props.SaveCorrectAnswerClinique);
    console.log(props.SaveIsClickedCounterClinique);
    console.log(props.SaveEachLineStatiqueClinique);
    console.log(props.savePieStatiqueClinique);
    /***************************************************************************************************/
    // loadShareUserId();
    //if (!chatroom.trim()) return;
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
      await fetch(`https://goatqcm-instance.com/chat/clear/${shareScreenCode}`, {
        method: "POST",
      });
    } catch (Exception) {}
  };
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

        if (latest.content.startsWith("QcmIndex+")) {
          const indexQcm = latest.content.slice("QcmIndex+".length);
          console.log(indexQcm);
          handleNextClick({ value: indexQcm });
        } else if (latest.content.startsWith("QcmIndex-")) {
          const indexQcm = latest.content.slice("QcmIndex-".length);
          console.log(indexQcm);
          handlePrevClick({ value: indexQcm });
        } else if (latest.content.startsWith("QcmClickIndex")) {
          const indexQcm = latest.content.slice("QcmClickIndex".length);
          console.log(indexQcm);
          handleItemClick({ qcmIndex: indexQcm });
        } else {
          console.log("hruuu");
          const parsedArray = JSON.parse(latest.content);
          try {
            if (Array.isArray(parsedArray) && parsedArray.length === 5) {
              const [propoId, QcmIndex, indexPropo, qcmId, courName] =
                parsedArray;

              handlePropoClick(
                undefined,
                propoId,
                QcmIndex,
                indexPropo,
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
  //***get years props*************************** *****************************/
  function loadyearQcmsParSujet() {
    setGetYearProps((GetYearProps) => props.minMaxYearParSujetsFinal);
  }
  //*************************************************************************** */
  //**load Qcm***************************************************************
  const loadQcms = async (doneLoadpropoBack) => {
    //**load Save propo************************************************ */
    if (
      props.backFromCliniqueAllQcmCliniqueprSujet === true &&
      doneFirstUplaod.value === false
    ) {
      doneFirstUplaod.value === true;
      console.log("hujaaaaaaaaa");
      setSavePropositions(props.savePropositions);
      setSaveVerfieReponses(props.SaveVerfieReponses);
      setTrueFullInsertClr(props.TrueFullInsertClr);
      setSaveClickSelectVerfieAll(props.SaveClickSelectVerfieAll);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      setSavePercentageAmount(props.SavePercentageAmount);
      if (props.TrueFullInsertClr === true) {
        setSaveQcmIsAnswer(props.SaveClickSelectVerfieAll);
      }
      setSaveCorrectAnswer(props.SaveCorrectAnswer);
      setSaveIsClickedCounter(props.SaveIsClickedCounter);
      setSavePieStatique(props.savePieStatique);
      setSaveEachLineStatique(props.SaveEachLineStatique);

      console.log(props.SaveClickSelectVerfieAll);
      console.log(props.TrueFullInsertClr);
    }
    //***************************************************************** */
    //**load Save propo************************************************ */

    if (
      props.commingFrom === "savequizz" &&
      doneFirstUplaodSaveQcm.value === false
    ) {
      doneFirstUplaodSaveQcm.value === true;
      console.log("hujaaaaaaaaa");
      setSavePropositions(props.savePropositions);
      setSaveVerfieReponses(props.SaveVerfieReponses);
      setSaveClickSelectVerfieAll(props.SaveClickSelectVerfieAll);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      setSavePercentageAmount(props.SavePercentageAmount);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      //****statique************************************************* */
      if (props.savePieStatique !== null) {
        setSaveCorrectAnswer(props.SaveCorrectAnswer);
        setSaveIsClickedCounter(props.SaveIsClickedCounter);
        setSavePieStatique(props.savePieStatique);
        setSaveEachLineStatique(props.SaveEachLineStatique);
      }
    } else if (
      props.commingFrom === "savesession" &&
      doneFirstUplaodSaveQcm.value === false
    ) {
      doneFirstUplaodSaveQcm.value === true;
      console.log("hujaaaaaaaaa");
      setSavePropositions(props.savePropositions);
      setSaveVerfieReponses(props.SaveVerfieReponses);
      setSaveClickSelectVerfieAll(props.SaveClickSelectVerfieAll);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      setSavePercentageAmount(props.SavePercentageAmount);
      //****statique************************************************* */
      if (props.savePieStatique !== null) {
        setSaveCorrectAnswer(props.SaveCorrectAnswer);
        setSaveIsClickedCounter(props.SaveIsClickedCounter);
        setSavePieStatique(props.savePieStatique);
        setSaveEachLineStatique(props.SaveEachLineStatique);
      }
    }
    //***************************************************************** */

    //*** Qcm Type Qcm and Cas Clinique methodes---------------------------------------------- */
    if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
      if (props.QcmSujetTypeSelected === "Par Cour") {
        doneLoadpropoBack = true;
        doneUplaodQcm.value = doneLoadpropoBack;
        console.log(incCours.value);
        console.log(doneUplaodQcm.value);
        console.log(props.selectMultipleCours.length);
        let incIndexSaveLine = 0;
        while (
          doneUplaodQcm.value === true &&
          incCours.value < props.selectMultipleCours.length
        ) {
          if (incCours.value === props.selectMultipleCours.length - 1) {
            setShowCancelQuizzPhone(true);
            console.log("we good show it");
          }
          doneUplaodQcm.value = false;
          try {
            const result = await axios.get(
              `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            getQcms.value = result.data;
            saveAllQcms.value = result.data;
            if (result.data.length > 0) {
              //save nombre qcms ////////***************************************************** */
              setSaveQcmsCourNameStatique((QcmsCourNameStatique) => [
                ...QcmsCourNameStatique,
                result.data[0].coursMed.coursName,
              ]);
              //***************************************************************************** */
              //save nombre qcms ////////***************************************************** */
              setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                ...QcmsNbrStatique,
                result.data.length,
              ]);
              //***************************************************************************** */

              if (
                props.backFromCliniqueAllQcmCliniqueprSujet !== true &&
                props.commingFrom !== "savesession" &&
                props.commingFrom !== "savequizz"
              ) {
                newStateEachLineStatique.push([0, 0, result.data.length]);
                setSaveEachLineStatique(newStateEachLineStatique);
              }
              //****************************************************************************** */
              //***exception add statiqe session et savequizz********************************* */
              if (
                props.savePieStatique === null &&
                (props.commingFrom === "savesession" ||
                  props.commingFrom === "savequizz")
              ) {
                newStateEachLineStatique.push([0, 0, result.data.length]);
                setSaveEachLineStatique(newStateEachLineStatique);
              }
              //******************************************************************************* */
            }
          } catch {
            console.log("qmc not find");
          }
          incCours.value = incCours.value + 1;
          if (saveAllQcms.value.length > 0) {
            for (let inc = 0; inc < getQcms.value.length; inc++) {
              setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);

              numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
              if (inc === getQcms.value.length - 1) {
                loadProposition();
                getCommentNbr(numberCommentaryQcm.value);
                doneUplaodQcm.value = false;
              }
            }
            setVisibiliteQcmIndex(currentIndex.value);
          } else {
            if (incCours.value <= props.selectMultipleCours.length) {
              doneUplaodQcm.value = true;
            }

            console.log("no clinique found");
          }
        }
        if (getQcms.value.length === 1) {
          VisibleNextBtn.value = false;
          VisiblePrevBtn.value = false;
        } else if (getQcms.value.length > 1) {
          setVisibiliteQcmIndex(0);
          VisibleNextBtn.value = true;
        }
      } else if (props.QcmSujetTypeSelected === "Par Sujet") {
        console.log("mamaaa");
        const getCurrentGroupePerm =
          document.getElementById("groupepermutation").value;
        const getCurrentYear = document.getElementById("year").value;
        try {
          const result = await axios.get(
            `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
          );
          if (result.data.length > 0) {
            //save nombre qcms ////////***************************************************** */
            setSaveQcmsNbrStatique((QcmsNbrStatique) => [
              ...QcmsNbrStatique,
              result.data.length,
            ]);
            //***************************************************************************** */
          }
          currentIndex.value = 0;
          setVisibiliteQcmIndex(0);
          setShowQcm([]);
          setShowPropositions([]);
          getQcms.value = result.data;
          setShowQcm(getQcms.value);

          if (getQcms.value.length === 1) {
            VisibleNextBtn.value = false;
            VisiblePrevBtn.value = false;
          } else if (getQcms.value.length > 1) {
            setVisibiliteQcmIndex(0);
            VisibleNextBtn.value = true;
          }
          console.log(getQcms.value);
          loadProposition();
        } catch {
          console.log("qmc not find");
        }
        //***get commentary number************************************* */
        for (let i = 0; i < getQcms.value.length; i++) {
          numberCommentaryQcm.value[i] = getQcms.value[i].id;
        }
        getCommentNbr(numberCommentaryQcm.value);
        //*************************************************************** */
      }
    }
    //-------------------------------------------------------------------------------------- */
    //*** Tous (Qcm,Cas Clinique methodes------------------------------------------------------ */
    else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (props.QcmSujetTypeSelected === "Par Cour") {
        console.log("par cours ");
        if (props.SelectedSourceExmn === "Externat Blida") {
          doneLoadpropoBack = true;
          doneUplaodQcm.value = doneLoadpropoBack;
          console.log(incCours.value);
          console.log(doneUplaodQcm.value);
          console.log(props.selectMultipleCours.length);

          while (
            doneUplaodQcm.value === true &&
            incCours.value < props.selectMultipleCours.length
          ) {
            if (incCours.value === props.selectMultipleCours.length - 1) {
              setShowCancelQuizzPhone(true);
              console.log("we good walidd");
            }
            doneUplaodQcm.value = false;
            try {
              const result = await axios.get(
                `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              getQcms.value = result.data;
              saveAllQcms.value = result.data;
              console.log(result.data);
              if (result.data.length > 0) {
                //save nombre qcms ////////*****************************************************
                setSaveQcmsCourNameStatique((QcmsCourNameStatique) => [
                  ...QcmsCourNameStatique,
                  result.data[0].coursMed.coursName,
                ]);
                //*****************************************************************************
                //save nombre qcms ////////*****************************************************
                setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                  ...QcmsNbrStatique,
                  result.data.length,
                ]);
                //*****************************************************************************

                if (
                  props.backFromCliniqueAllQcmCliniqueprSujet !== true &&
                  props.commingFrom !== "savesession" &&
                  props.commingFrom !== "savequizz"
                ) {
                  newStateEachLineStatique.push([0, 0, result.data.length]);
                  setSaveEachLineStatique(newStateEachLineStatique);
                }
                //******************************************************************************
                //***exception add statiqe session et savequizz*********************************
                if (
                  props.savePieStatique === null &&
                  (props.commingFrom === "savesession" ||
                    props.commingFrom === "savequizz")
                ) {
                  newStateEachLineStatique.push([0, 0, result.data.length]);
                  setSaveEachLineStatique(newStateEachLineStatique);
                }
                //*******************************************************************************
              }
            } catch {
              console.log("qmc not find");
            }
            incCours.value = incCours.value + 1;
            if (saveAllQcms.value.length > 0) {
              for (let inc = 0; inc < getQcms.value.length; inc++) {
                setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);
                numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
                if (inc === getQcms.value.length - 1) {
                  loadProposition();
                  getCommentNbr(numberCommentaryQcm.value);
                  doneUplaodQcm.value = false;
                }
              }
            } else {
              if (incCours.value <= props.selectMultipleCours.length) {
                doneUplaodQcm.value = true;
              }
            }
          }

          if (props.ExisteCasClinique === true) {
            finalgetCasCliniqueLength.value = 1;
            setgetlengthCasCliniqueParSjr(
              finalgetCasCliniqueLength.value.length
            );
          } else {
            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length > 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
          }

          //********************************************************************************* */

          //***get commentary number************************************* */
          for (let i = 0; i < getQcms.value.length; i++) {
            numberCommentaryQcm.value[i] = getQcms.value[i].id;
          }
          getCommentNbr(numberCommentaryQcm.value);
          //*************************************************************** */
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          console.log("resdnt hulaa ");

          console.log(props.ExisteCasClinique);
          console.log(props.selectMultipleCours[0]);
          doneLoadpropoBack = true;
          doneUplaodQcm.value = doneLoadpropoBack;
          console.log(incCours.value);
          console.log(doneUplaodQcm.value);
          console.log(props.selectMultipleCours.length);

          while (
            doneUplaodQcm.value === true &&
            incCours.value < props.selectMultipleCours.length
          ) {
            if (incCours.value === props.selectMultipleCours.length - 1) {
              setShowCancelQuizzPhone(true);
            }
            doneUplaodQcm.value = false;
            try {
              const result = await axios.get(
                `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (result.data.length > 0) {
                //save nombre qcms ////////***************************************************** */
                setSaveQcmsCourNameStatique((QcmsCourNameStatique) => [
                  ...QcmsCourNameStatique,
                  result.data[0].coursMed.coursName,
                ]);
                //***************************************************************************** */
                //save nombre qcms ////////***************************************************** */
                setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                  ...QcmsNbrStatique,
                  result.data.length,
                ]);
                //***************************************************************************** */
                //***************************************************************************** */

                if (
                  props.backFromCliniqueAllQcmCliniqueprSujet !== true &&
                  (props.commingFrom !== "savesession" ||
                    props.commingFrom !== "savequizz")
                ) {
                  newStateEachLineStatique.push([0, 0, result.data.length]);
                  setSaveEachLineStatique(newStateEachLineStatique);
                }
                //****************************************************************************** */
                //***exception add statiqe session et savequizz********************************* */
                if (
                  props.savePieStatique === null &&
                  (props.commingFrom === "savesession" ||
                    props.commingFrom === "savequizz")
                ) {
                  newStateEachLineStatique.push([0, 0, result.data.length]);
                  setSaveEachLineStatique(newStateEachLineStatique);
                }
                //******************************************************************************* */
                getQcms.value = result.data;
                saveAllQcms.value = result.data;
              }
            } catch {
              console.log("qmc not find");
            }
            incCours.value = incCours.value + 1;
            if (saveAllQcms.value.length > 0) {
              for (let inc = 0; inc < getQcms.value.length; inc++) {
                setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);
                numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
                if (inc === getQcms.value.length - 1) {
                  loadProposition();
                  getCommentNbr(numberCommentaryQcm.value);
                  doneUplaodQcm.value = false;
                }
              }
            } else {
              if (incCours.value <= props.selectMultipleCours.length) {
                doneUplaodQcm.value = true;
              }
            }
          }

          if (props.ExisteCasClinique === true) {
            console.log("we ffff");
            finalgetCasCliniqueLength.value = 1;
            setgetlengthCasCliniqueParSjr(
              finalgetCasCliniqueLength.value.length
            );
          } else {
            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length > 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
          }
        }

        //***get commentary number************************************* */
        for (let i = 0; i < getQcms.value.length; i++) {
          numberCommentaryQcm.value[i] = getQcms.value[i].id;
        }
        getCommentNbr(numberCommentaryQcm.value);
        //*************************************************************** */
        //****end par cours********************************** */
      } else if (props.QcmSujetTypeSelected === "Par Sujet") {
        if (props.SelectedSourceExmn === "Externat Blida") {
          console.log(getGroupePerm.value);

          if (props.checkParSjtBiologieClinique === "CliniqueParSujet") {
            console.log("we here clinque ");
            if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
              console.log(props.getYear);
              console.log(props.getGroupePerm);
              //****get clinique length***************************************** */
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
              finalgetCasCliniqueLength.value = getCasCliniqueLength;
              setgetlengthCasCliniqueParSjr(getresultCasClinqiue.data.length);
              console.log(finalgetCasCliniqueLength.value);
              try {
                const result = await axios.get(
                  `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
                );
                if (result.data.length > 0) {
                  //save nombre qcms ////////***************************************************** */
                  setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                    ...QcmsNbrStatique,
                    result.data.length,
                  ]);
                  //***************************************************************************** */
                }
                currentIndex.value = 0;
                setVisibiliteQcmIndex(0);
                setShowQcm([]);
                setShowPropositions([]);
                getQcms.value = result.data;
                setShowQcm(getQcms.value);
                if (getQcms.value.length === 1) {
                  //hadi chufha apres
                  VisibleNextBtn.value = false;
                  VisiblePrevBtn.value = false;
                } else if (getQcms.value.length >= 1) {
                  setVisibiliteQcmIndex(0);
                  VisibleNextBtn.value = true;
                }
                console.log(getQcms.value);
                loadProposition();

                //***get length cas clinique******************************************** */

                //*********************************************************************** */
              } catch {
                console.log("qmc not find");
              }
              //***get commentary number************************************* */
              for (let i = 0; i < getQcms.value.length; i++) {
                numberCommentaryQcm.value[i] = getQcms.value[i].id;
              }
              getCommentNbr(numberCommentaryQcm.value);
              //*************************************************************** */
            } else {
              getCurrentYear = document.getElementById("year").value;

              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getGroupePerm.value}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
              finalgetCasCliniqueLength.value = getCasCliniqueLength;
              setgetlengthCasCliniqueParSjr(getCasCliniqueLength);
              console.log(finalgetCasCliniqueLength.value);
              try {
                const result = await axios.get(
                  `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getCurrentYear}/${getGroupePerm.value}/${props.SelectedSourceExmn}`
                );
                //save nombre qcms ////////***************************************************** */
                setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                  ...QcmsNbrStatique,
                  result.data.length,
                ]);
                //***************************************************************************** */
                currentIndex.value = 0;
                setVisibiliteQcmIndex(0);
                setShowQcm([]);
                setShowPropositions([]);
                getQcms.value = result.data;
                setShowQcm(getQcms.value);
                if (getQcms.value.length === 1) {
                  //hadi chufha apres
                  VisibleNextBtn.value = false;
                  VisiblePrevBtn.value = false;
                } else if (getQcms.value.length >= 1) {
                  setVisibiliteQcmIndex(0);
                  VisibleNextBtn.value = true;
                }
                console.log(getQcms.value);
                loadProposition();

                //***get length cas clinique******************************************** */

                //*********************************************************************** */
              } catch {
                console.log("qmc not find");
              }
              //***get commentary number************************************* */
              for (let i = 0; i < getQcms.value.length; i++) {
                numberCommentaryQcm.value[i] = getQcms.value[i].id;
              }
              getCommentNbr(numberCommentaryQcm.value);
              //*************************************************************** */
            }

            //******************************************************************** */
          } else if (props.checkParSjtBiologieClinique === "BiologieParSujet") {
            if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
              console.log("we back from");
              try {
                getCurrentYear = props.getYear;
                getCurrentGroupePerm = props.getGroupePerm;
                const getresultCasClinqiue = await axios.get(
                  `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
                );
                getCasCliniqueLength = getresultCasClinqiue.data.length;
                finalgetCasCliniqueLength.value = getCasCliniqueLength;
                setgetlengthCasCliniqueParSjr(getCasCliniqueLength);
                console.log(finalgetCasCliniqueLength.value);
              } catch (Exception) {}
            } else {
              console.log("we start");
              try {
                getCurrentYear = getYear.value;
                getCurrentGroupePerm = getGroupePerm.value;

                getCurrentYear = document.getElementById("year").value;

                const getresultCasClinqiue = await axios.get(
                  `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
                );
                getCasCliniqueLength = getresultCasClinqiue.data.length;
                finalgetCasCliniqueLength.value = getCasCliniqueLength;
                setgetlengthCasCliniqueParSjr(getCasCliniqueLength);
                console.log(finalgetCasCliniqueLength.value);
                console.log("we here biologie");
                console.log(getCurrentGroupePerm);
              } catch (Exception) {}
            }

            try {
              const result = await axios.get(
                `${BASE_URL}/qcms/getqcqms/biologie/${props.moduleId}/${getCurrentYear}/Biologie`
              );
              if (result.data.length > 0) {
                //save nombre qcms ////////***************************************************** */
                setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                  ...QcmsNbrStatique,
                  result.data.length,
                ]);
                //***************************************************************************** */
              }
              currentIndex.value = 0;
              setVisibiliteQcmIndex(0);
              setShowQcm([]);
              setShowPropositions([]);
              getQcms.value = result.data;
              setShowQcm(getQcms.value);
              if (getQcms.value.length === 1) {
                //hadi chufha apres
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getQcms.value.length >= 1) {
                setVisibiliteQcmIndex(0);
                VisibleNextBtn.value = true;
              }
              console.log(getQcms.value);
              loadProposition();
            } catch {
              console.log("qmc not find");
            }
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
            //*************************************************************** */
          }

          /////
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          //  if (props.QuizQcmQclinique === true) {

          if (props.backFromCliniqueAllQcmCliniqueprSujet === false) {
            //************get length of cas clinique if existe***************************** */
            try {
              getYear.value = document.getElementById("year").value;
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
              );
              //getCasCliniqueLength = getresultCasClinqiue.data.length;
              setgetlengthCasCliniqueParSjr(getresultCasClinqiue.data.length);
            } catch (Exception) {
              console.log("no cas clinique pr ParSujet Residanat");
              setgetlengthCasCliniqueParSjr(0);
            }
            //*************************************************************************************************** */
            const result = await axios.get(
              `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
            );
            if (result.data.length > 0) {
              //save nombre qcms ////////***************************************************** */
              setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                ...QcmsNbrStatique,
                result.data.length,
              ]);
              //***************************************************************************** */
            }
            currentIndex.value = 0;
            setVisibiliteQcmIndex(0);
            setShowQcm([]);
            setShowPropositions([]);
            getQcms.value = result.data;
            setShowQcm(getQcms.value);

            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length >= 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
            //***************************** */
            console.log(getQcms.value);
            loadProposition();
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
            //*************************************************************** */
          } else if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
            setVisibleParSujet(true);
            setVisibleGroupeChange(false);

            //***********get length cas clinique*************************************** */
            try {
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
            } catch (Exception) {
              console.log("no cas clinique pr ParSujet Residanat");
              setgetlengthCasCliniqueParSjr(0);
            }
            //*********************************************************************** */
            const result = await axios.get(
              `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
            );
            if (result.data.length > 0) {
              //save nombre qcms ////////***************************************************** */
              setSaveQcmsNbrStatique((QcmsNbrStatique) => [
                ...QcmsNbrStatique,
                result.data.length,
              ]);
              //***************************************************************************** */
            }
            currentIndex.value = 0;
            setVisibiliteQcmIndex(0);
            setShowQcm([]);
            setShowPropositions([]);
            getQcms.value = result.data;
            setShowQcm(getQcms.value);
            if (getCasCliniqueLength === 0) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getCasCliniqueLength >= 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
            console.log(getQcms.value);
            loadProposition();
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
          }
          //*************************************************************** */
          //   }
        }
      }
    }
    //***end Tous (Qcm,Cas Clinique------------------------------------------------- */
  };
  //********************************************************************** */
  //**load Proposition***************************************************************
  const loadProposition = async () => {
    if (props.QcmSujetTypeSelected === "Par Cour") {
      for (let increment = 0; increment < getQcms.value.length; increment++) {
        //****save verifier reponses******************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          if (props.commingFrom === "quizz") {
            setSaveVerfieReponses((repVerifier) => [...repVerifier, ""]);
            setSaveQcmIsAnswer((QcmIsAnswer) => [...QcmIsAnswer, ""]);
            setSaveClickSelectVerfieAll((clickSelect) => [...clickSelect, ""]);
            setSavePercentageAmount((percentage) => [...percentage, ""]);
            setSaveCorrectAnswer((CorrectAnswer) => [...CorrectAnswer, ""]);
            setSaveIsClickedCounter((ClickedCounter) => [...ClickedCounter, 0]);
          }
          //***exception add statiqe session et savequizz********************************* */
          if (
            props.savePieStatique === null &&
            (props.commingFrom === "savesession" ||
              props.commingFrom === "savequizz")
          ) {
            setSaveCorrectAnswer((CorrectAnswer) => [...CorrectAnswer, ""]);
            setSaveIsClickedCounter((ClickedCounter) => [...ClickedCounter, 0]);
          }
          //******************************************************************************* */
        }
        const result = await axios.get(
          `${BASE_URL}/qcms/${getQcms.value[increment].id}/reponses`
        );
        if (increment === getQcms.value.length - 1) {
          //if (props.qcmType === "Qcm") {
          if (props.commingFrom === "quizz") {
            console.log("hupaa");
            setShowSaveQcmBtn(true);
            setShowUpdateQcmBtn(false);
            setShowSaveSessionQcmBtn(true);
            setShowUpdateSessionQcmBtn(false);
          } else if (props.commingFrom === "savequizz") {
            setShowSaveQcmBtn(false);
            setShowUpdateQcmBtn(true);
            setShowSaveSessionQcmBtn(false);
            setShowUpdateSessionQcmBtn(false);
          } else if (props.commingFrom === "savesession") {
            setShowSaveQcmBtn(false);
            setShowUpdateQcmBtn(false);
            setShowSaveSessionQcmBtn(false);
            setShowUpdateSessionQcmBtn(true);
          }
          // }
          console.log("get all prpos");
          doneUplaodQcm.value = true;
          if (incCours.value < props.selectMultipleCours.length) {
            loadQcms(doneUplaodQcm.value);
          }
        }
        resultGetLoadPropo.value[increment] = result.data;
        //***save propositions*************************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          if (props.commingFrom === "quizz") {
            saveCurrentPropo = [];
            resultGetLoadPropo.value[increment].forEach((element, index) => {
              saveCurrentPropo[index] = "";
            });
            setSavePropositions((p) => [...p, saveCurrentPropo]);
          }
        }
        //*********************************************************************** */
        setShowPropositions((p) => [...p, resultGetLoadPropo.value[increment]]);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      console.log("mmom");

      for (let i = 0; i < getQcms.value.length; i++) {
        //**save verifier reponses***************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          setSaveVerfieReponses((repVerifier) => [...repVerifier, ""]);
          setSaveQcmIsAnswer((QcmIsAnswer) => [...QcmIsAnswer, ""]);
          setSaveClickSelectVerfieAll((clickSelect) => [...clickSelect, ""]);
          setSavePercentageAmount((percentage) => [...percentage, ""]);
          setSaveCorrectAnswer((CorrectAnswer) => [...CorrectAnswer, ""]);
          setSaveIsClickedCounter((ClickedCounter) => [...ClickedCounter, 0]);
        }
        const result = await axios.get(
          `${BASE_URL}/qcms/${getQcms.value[i].id}/reponses`
        );
        console.log(result.data);
        resultGetLoadPropo.value[i] = result.data;
        console.log(getQcms.value[i].id);
        console.log(i);
        //***save propositions*************************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          saveCurrentPropo = [];
          resultGetLoadPropo.value[i].forEach((element, index) => {
            saveCurrentPropo[index] = "";
          });
          setSavePropositions((p) => [...p, saveCurrentPropo]);
        }
        //*********************************************************************** */
        //console.log(resultGetLoadPropo.value[0]);
        setShowPropositions((p) => [...p, resultGetLoadPropo.value[i]]);
      }
    }

    /*console.log(resultGetLoadPropo.value.length);
    console.log(getQcms.value.length);
    console.log(resultGetLoadPropo.value);*/
  };
  //********************************************************************** */
  //********handel qcm change**********************************************
  function handlePrevClick({ event, value } = {}) {
    setShowChatGpt(false);
    setShowDeepSeek(false);
    if (event) {
      currentIndex.value = currentIndex.value - 1;
    } else {
      currentIndex.value = Number(value);
      console.log(currentIndex.value);
    }
    setExisteNote(false);
    setVisibleNoteQcm(false);
    setVisibleCommentaryStudent(false);
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
    setFileDisplay("");
    setFileDisplayEdite("");
    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);
    /***share screen************************************************************ */
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "QcmIndex-" + currentIndex.value,
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
    if (currentIndex.value > 0) {
      VisiblePrevBtn.value = true;
    } else {
      VisiblePrevBtn.value = false;
    }
    VisibleNextBtn.value = true;

    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
  }

  //****check if user get abounement****************************** */

  const getUserAdressIp = async () => {
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userIdToken}`
      );
      getUserAdresseIp.value = result.data.adresseIp;
      console.log(getUserAdresseIp.value);
      if (getUserAdresseIp.value === deviceId) {
        console.log("are the same");
      } else {
        toast.error(
          "Un autre appareil a été connecté en même temps, veuillez vous déconnecter. "
        );
        setTimeout(() => {
          UserService.logout();
          navigatLogin("/");
          // navigate("/");
        }, 5000);
      }
    } catch (Exception) {
      console.log("no abnmt found");
    }
  };
  //*************************************************************** */
  function updateIndex(newIndex) {
    currentIndexFetch = newIndex;

    if (
      currentIndexFetch > 0 &&
      currentIndexFetch % 5 === 0 &&
      currentIndexFetch !== lastTriggeredIndex
    ) {
      lastTriggeredIndex = currentIndexFetch;
      getUserAdressIp();
    }
  }
  function handleNextClick({ event, value } = {}) {
    setShowChatGpt(false);
    setShowDeepSeek(false);
    updateIndex(currentIndex.value);
    clearChat();
    console.log(value);
    console.log(currentIndex.value);
    /***share screen************************************************************ */
    if (event) {
      currentIndex.value = currentIndex.value + 1;
    } else {
      currentIndex.value = Number(value);
      console.log(currentIndex.value);
    }
    setExisteNote(false);
    setVisibleNoteQcm(false);
    setVisibleCommentaryStudent(false);
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
    setFileDisplay("");
    setFileDisplayEdite("");
    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);
    VisibleNextBtn.value = true;
    VisiblePrevBtn.value = true;
    console.log(currentIndex.value);
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "QcmIndex+" + currentIndex.value,
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
    //*****check if kayn cas clinique*********************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (props.ExisteCasClinique === false) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (props.ExisteCasClinique === true) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        //*******all statique*****************************************************************************************

        if (props.QcmSujetTypeSelected === "Par Cour") {
          //update statique pie***************************************************************
          savePieStatique[2] =
            ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
          console.log(savePieStatique);
          //********************************************************************************* */
          //update statique dounate***************************************************************
          for (
            let index = 0;
            index < SaveQcmsCourNameStatique.length;
            index++
          ) {
            SaveEachLineStatique[index][2] =
              SaveQcmsNbrStatique[index] -
              (SaveEachLineStatique[index][0] + SaveEachLineStatique[index][1]);
          }
          console.log(SaveEachLineStatique);
          //********************************************************************************* */
          setShowModalStatique(true);
          setShowModalStatiqueParCour(true);
        }
        //*******end all statique*****************************************************************************************
        setOpenBoardClinique(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (finalgetCasCliniqueLength.value === 0) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (finalgetCasCliniqueLength.value > 0) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        //*******all statique*****************************************************************************************

        if (props.QcmSujetTypeSelected === "Par Sujet") {
          //update statique pie***************************************************************
          savePieStatique[2] =
            ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
          console.log(savePieStatique);
          setShowModalStatique(true);
          setShowModalStatiqueParSujet(true);
          //********************************************************************************* */
        }
        //*******end all statique*****************************************************************************************
        setOpenBoardClinique(true);
      }
    }
    //************************************************************************ */
    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
    selectSaveIndex.value = [];
  }

  const deleteQcmHndler = async (getQcmId) => {
    await axios.delete(`${BASE_URL}/qcms/${getQcmId}`).then((res) => {
      navigateDeleteQcmHandler(`/home`);
    });
  };
  //********************************************************************************** */
  //*****par sujets Methodes********************************************************* */
  const SelectYearHndlerChange = async (e) => {
    if (props.SelectedSourceExmn === "Externat Blida") {
      console.log(props.SelectedSourceExmn);
      getYear.value = document.getElementById("year").value;
      const result = await axios.get(
        `${BASE_URL}/qcms/get_groupes_year/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      document.getElementById("groupepermutation").options[0].selected = true;
      setGroupesPermut(result.data);
      console.log(result.data);
      if (props.QcmSujetTypeSelected === "Par Cours") {
        setVisibleQmcContainer(false);
      } else {
        console.log("is par sjuets ");
      }
      console.log(getYear);
    } else if (props.SelectedSourceExmn === "Résidanat Blida") {
      loadQcms();
    }
  };
  //********************************************************************************** */
  const SelectGroupePermHndlerChange = async (e) => {
    getGroupePerm.value = document.getElementById("groupepermutation").value;
    console.log(getGroupePerm.value);
    setVisibleParSujet(true);
    /******intializer **************************************************************** */
    setShowQcm([]);
    console.log(currentIndex.value);
    resultGetLoadPropo.value = [];
    currentIndex.value = 0;
    getQcms.value.length = 0;
    setShowPropositions([]);
    setSaveClickSelectVerfieAll([]);
    setSavePropositions([]);
    setSaveQcmIsAnswer([]);
    setSaveVerfieReponses([]);
    setTrueFullInsertClr([]);
    setSavePercentageAmount([]);
    setSelectQcmIndex(0);
    setVisibiliteQcmIndex(0);

    //******************************************************************************* */
    loadQcms();
    setVisibleQmcContainer(true);
  };
  //********************************************************************************** */
  //****description******************************************************************* */
  const handeldescription = async (qcmId) => {
    console.log(qcmId);
    setShowDescQcm(true);
    setQcmIdPropsQcmDesc(qcmId);
  };
  //*********************************************************************************** */

  const handYearClick = () => {
    if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
      //window.location.reload();
    }
  };
  //********commentary Section****************************************************************** */
  //**get nbr commentary******************************************
  const getCommentNbr = async (qcmsIds) => {
    //console.log(qcmsIds);

    for (let i = 0; i < qcmsIds.length; i++) {
      const result = await axios.get(
        `${BASE_URL}/commentary/qcm/${qcmsIds[i]}`
      );
      numbreCommentaryFinal.value[incCmntr.value] = result.data.length;
      incCmntr.value = incCmntr.value + 1;
    }

    //numberCommentaryQcm
  };

  //********************************************************************** */
  //**commentary student************************************ */
  const handleCommentaryBtn = (qcmId) => {
    console.log(qcmId);
    getQcmCommentary(qcmId);
    getUser();

    getCommentaryQcm(qcmId);
    setVisibleCommentaryStudent(true);
    setShowDeepSeek(false);
    setShowChatGpt(false);
  };
  //************************************************************ */

  //**get all commentary of qcms******************************************
  const getCommentaryQcm = async (qcmId) => {
    saveEachCommentary.value = [];
    setQcmCommentary([]);

    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/commentary/qcm/${qcmId}`
      );

      const comments = result.data;
      console.log(comments);
      // For each comment, fetch image if available
      for (let comment of comments) {
        if (comment.imageName) {
          const imgRes = await axios.get(
            `${BASE_URL}/commentary/image/${comment.id}`,
            {
              responseType: "blob",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          comment.imageUrl = URL.createObjectURL(imgRes.data);
        }
      }

      saveEachCommentary.value = comments;
      setQcmCommentary(comments);
    } catch (err) {
      console.error("Error fetching commentary:", err);
    }
  };

  //********************************************************************** */
  //****************submit qcm ****************************************/

  const handlejadorebtn = async (commentaryId, commentaryLikes, qcmId) => {
    setCountJadore(commentaryLikes + 1);
    CommentaryUpdate.likes = commentaryLikes + 1;
    await axios
      .put(`${BASE_URL}/commentary/${commentaryId}`, CommentaryUpdate)
      .then((res) => {
        getCommentaryQcm(qcmId);
      })
      .catch((err) => console.log(err));
  };
  //**********************************************************************

  //**************************************************************** */
  const handlesendComment = async () => {
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );

      const formData = new FormData();
      formData.append("commentaryStudent", inputStr);
      formData.append("anonyme", isAnonyme);
      formData.append("qcmId", Commentary.qcmStandard.id);
      formData.append("userId", resultUserFinal.id);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await axios.post("https://goatqcm-instance.com/commentary/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh commentary list
      getCommentaryQcm(Commentary.qcmStandard.id);

      // Reset input
      setInputStr("");
      setSelectedFile(null);
      setIsAnonyme(false);
    } catch (err) {
      console.log(err);
    }
  };

  //**************************************************************** */
  //***close commentay************************************************ */
  const handleCloseCommentaryBtn = () => {
    setVisibleCommentaryStudent(false);
  };
  //******************************************************************* */
  const handlePorpoClick = (e) => {
    //console.log(props.selectMultipleCours);
    console.log(savePropositions); // save id of each proposition clicked
    console.log(SaveClickSelectVerfieAll); //save qcmIndex that have minimum one proposition has been cliked.
    console.log(SaveVerfieReponses); //save qcmIndex that has verifier button Clicked.
    console.log(SaveQcmIsAnswer); //save index qcmIndex that has verifier all reponses button clicked.
    console.log(SavePercentageAmount); //save somme of all propo
    console.log(SaveCorrectAnswer); //save somme of all propo
    console.log(SaveIsClickedCounter);
    console.log(SaveEachLineStatique);

    //*******all statique*****************************************************************************************

    if (props.QcmSujetTypeSelected === "Par Cour") {
      //update statique pie***************************************************************
      savePieStatique[2] =
        ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
      console.log(savePieStatique);
      //********************************************************************************* */
      //update statique dounate***************************************************************
      for (let index = 0; index < SaveQcmsCourNameStatique.length; index++) {
        SaveEachLineStatique[index][2] =
          SaveQcmsNbrStatique[index] -
          (SaveEachLineStatique[index][0] + SaveEachLineStatique[index][1]);
      }
      console.log(SaveEachLineStatique);
      //********************************************************************************* */
      setShowModalStatique(true);
      setShowModalStatiqueParCour(true);
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      //update statique pie***************************************************************
      savePieStatique[2] =
        ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
      console.log(savePieStatique);
      setShowModalStatique(true);
      setShowModalStatiqueParSujet(true);
      //********************************************************************************* */
    }
    //*******end all statique*****************************************************************************************
  };
  const pieChartData = {
    labels: ["vrai", "faut", "pas répondu"],
    datasets: [
      {
        label: "Quizz Statique",
        data: [savePieStatique[0], savePieStatique[1], savePieStatique[2]],
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
        data: [savePieStatique[0], savePieStatique[1], savePieStatique[2]],
        backgroundColor: ["#8f85fb", "#c19fcb", "#f5e1fd"],
        borderColor: ["#8f85fb", "#c19fcb", "#f5e1fd"],
        borderWidth: 1,
      },
    ],
  };
  const optionsBar = {};

  const dounateData = SaveEachLineStatique.map((row, index) => ({
    labels: ["vrai", "faut", "pas répondu"],
    datasets: [
      {
        label: "Cours Statique",
        data: [
          SaveEachLineStatique[index][0],
          SaveEachLineStatique[index][1],
          SaveQcmsNbrStatique[index] -
            (SaveEachLineStatique[index][0] + SaveEachLineStatique[index][1]),
        ],
        backgroundColor: [
          "rgb(37, 176, 233,0.9)",
          "rgb(193,159,203,0.9)",
          "rgb(244, 180, 234,0.9)",
        ],
        borderColor: [
          "rgb(337, 176, 233,0.9)",
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
    propoId,
    QcmIndex,
    indexPropo,
    qcmId,
    courName,
    comingFrom
  ) => {
    if (e?.preventDefault) e.preventDefault();
    console.log(comingFrom);
    console.log(isToggled);
    if (isToggled === "true") {
      if (comingFrom === cameFrome[0]) {
        console.log("is click on propo");
        const propoParametres = [
          propoId,
          QcmIndex,
          indexPropo,
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
    console.log(courName);
    //initialiser TrueFullInsertClr************************
    setTrueFullInsertClr(false);
    //save proposition selected &&ClickedCounter*********************************************************
    const updatedArraySavePropositions = savePropositions.map((innerArray) => [
      ...innerArray,
    ]);
    const updatedSaveIsClickedCounter = [...SaveIsClickedCounter];
    if (updatedArraySavePropositions[QcmIndex][indexPropo] !== propoId) {
      //****update propoId************************************************* */
      updatedArraySavePropositions[QcmIndex][indexPropo] = propoId;
      //****update counter click**************************************** */
      updatedSaveIsClickedCounter[QcmIndex] =
        updatedSaveIsClickedCounter[QcmIndex] + 1;
      console.log("+1");
    } else {
      //****update propoId************************************************* */
      updatedArraySavePropositions[QcmIndex][indexPropo] = "";
      //****update counter click**************************************** */
      updatedSaveIsClickedCounter[QcmIndex] =
        updatedSaveIsClickedCounter[QcmIndex] - 1;
      console.log("-1");
    }
    setSavePropositions(updatedArraySavePropositions);
    setSaveIsClickedCounter(updatedSaveIsClickedCounter);
    //************************************************************************************************* */

    //*******function one propo at least is clicked in this qcm ****************************************** */
    const updatedClickedVerefieAll = [...SaveClickSelectVerfieAll];
    if (updatedSaveIsClickedCounter[QcmIndex] === 0) {
      updatedClickedVerefieAll[QcmIndex] = "";
    } else {
      updatedClickedVerefieAll[QcmIndex] = QcmIndex;
    }
    setSaveClickSelectVerfieAll(updatedClickedVerefieAll);
    //******************************************************************************************************/

    //****augmenter slect count******************************************** */
    await axios
      .put(`https://goatqcm-instance.com/reponses/countselect/${propoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    //************************************************************************* */

    //******get all selected click********************************************** */
    const result = await axios.get(`${BASE_URL}/qcms/${qcmId}/reponses`);
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
    const updatedCalcAmountCountSelect = [...SavePercentageAmount];
    updatedCalcAmountCountSelect[QcmIndex] = sum;
    setSavePercentageAmount(updatedCalcAmountCountSelect);
    //*************************************************************************** */

    console.log(updatedCalcAmountCountSelect);

    //********************************************************************** */
    /****statique function***************************************************** */
    console.log(updatedArraySavePropositions[QcmIndex][indexPropo]);

    //get cour index**********************************************************
    if (props.QcmSujetTypeSelected === "Par Cour") {
      let indexParcourCourName = 0;
      let SaveCourIndex = 0;
      let isFound = false;

      while (isFound !== true) {
        console.log(SaveQcmsCourNameStatique[indexParcourCourName]);
        if (courName === SaveQcmsCourNameStatique[indexParcourCourName]) {
          SaveCourIndex = indexParcourCourName;
          isFound = true;
          console.log(SaveCourIndex);
        }
        indexParcourCourName++;
      }
      /*************************************************************************** */
      if (
        updatedArraySavePropositions[QcmIndex][indexPropo] === propoId &&
        result.data[indexPropo].reponseBool === true &&
        SaveCorrectAnswer[QcmIndex] !== false
      ) {
        SaveCorrectAnswer[QcmIndex] = true;
        console.log("true");
        //update full pie***********************************************
        setSavePieStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[0] = newState[0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
        //update EachLineStatique***********************************************
        setSaveEachLineStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[SaveCourIndex][0] = newState[SaveCourIndex][0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
      } else if (
        updatedArraySavePropositions[QcmIndex][indexPropo] === propoId &&
        result.data[indexPropo].reponseBool === false
      ) {
        SaveCorrectAnswer[QcmIndex] = false;
        //update full pie***********************************************
        setSavePieStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[1] = newState[1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
        //update EachLineStatique***********************************************
        setSaveEachLineStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[SaveCourIndex][1] = newState[SaveCourIndex][1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */
        console.log("false");
      } else if (
        updatedArraySavePropositions[QcmIndex][indexPropo] !== propoId &&
        updatedClickedVerefieAll[QcmIndex] === ""
      ) {
        SaveCorrectAnswer[QcmIndex] = "";
        if (savePieStatique[0] !== 0) {
          setSavePieStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[0] = newState[0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //update EachLineStatique***********************************************
          setSaveEachLineStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[SaveCourIndex][0] = newState[SaveCourIndex][0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //*************************************************************** */
        } else if (savePieStatique[1] !== 0) {
          setSavePieStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[1] = newState[1] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //update EachLineStatique***********************************************
          setSaveEachLineStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[SaveCourIndex][1] = newState[SaveCourIndex][1] - 1; // Modify the first index
            return newState; // Return the updated array
          });
          //*************************************************************** */
        }

        console.log("nothing");
        console.log(savePieStatique);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      /*************************************************************************** */
      if (
        updatedArraySavePropositions[QcmIndex][indexPropo] === propoId &&
        result.data[indexPropo].reponseBool === true &&
        SaveCorrectAnswer[QcmIndex] !== false
      ) {
        SaveCorrectAnswer[QcmIndex] = true;
        console.log("true");
        //update full pie***********************************************
        setSavePieStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[0] = newState[0] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //***************************************************************
      } else if (
        updatedArraySavePropositions[QcmIndex][indexPropo] === propoId &&
        result.data[indexPropo].reponseBool === false
      ) {
        SaveCorrectAnswer[QcmIndex] = false;
        //update full pie***********************************************
        setSavePieStatique((prevState) => {
          const newState = [...prevState]; // Copy the existing array
          newState[1] = newState[1] + 1; // Modify the first index
          return newState; // Return the updated array
        });
        //*************************************************************** */

        console.log("false");
      } else if (
        updatedArraySavePropositions[QcmIndex][indexPropo] !== propoId &&
        updatedClickedVerefieAll[QcmIndex] === ""
      ) {
        SaveCorrectAnswer[QcmIndex] = "";
        if (savePieStatique[0] !== 0) {
          setSavePieStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[0] = newState[0] - 1; // Modify the first index
            return newState; // Return the updated array
          });
        } else if (savePieStatique[1] !== 0) {
          setSavePieStatique((prevState) => {
            const newState = [...prevState]; // Copy the existing array
            newState[1] = newState[1] - 1; // Modify the first index
            return newState; // Return the updated array
          });
        }

        console.log("nothing");
      }
    }
    //************************************************************************* */
  };

  //********************************************************************** */
  //**handleClickiVerifieReponse****************************************** */
  const handleClickiVerifieReponse = (QcmIndex) => {
    setTrueInsertClrClick(true);
    setShowVerifierRpnsBtn(false);

    const updatedClickedVerefie = [...SaveVerfieReponses];
    updatedClickedVerefie[QcmIndex] = QcmIndex;
    setSaveVerfieReponses(updatedClickedVerefie);

    //***this qcm is has been answer************************* */
    const updatedIsAnswer = [...SaveQcmIsAnswer];
    updatedIsAnswer[QcmIndex] = QcmIndex;
    setSaveQcmIsAnswer(updatedIsAnswer);
    //*********************************************************** */
  };
  //********************************************************************** */
  //****handle all reponses****************************************************************** */
  const handleClickiVerifieReponseAll = () => {
    console.log(SaveClickSelectVerfieAll);
    //*****check done reponde all qcmss****************************** */
    let incrIndex = 0;
    let isEmpty = false;
    while (incrIndex < SaveClickSelectVerfieAll.length && isEmpty === false) {
      if (SaveClickSelectVerfieAll[incrIndex] === "") {
        isEmpty = true;
        console.log(incrIndex);
        setIsRepondeAll(false);
        IsRepondeAllSignal.value = false;
      }
      incrIndex = incrIndex + 1;
    }
    ///********************************************************************* */
    console.log(IsRepondeAll);
    if (IsRepondeAllSignal.value === false) {
      setModalDoneQuizIsOpen(true);
    }
  };

  //********************************************************************** */
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setModalDoneQuizIsOpen(false);
    setShowModalStatique(false);
    setShowCreatPub(false);
    setOpen(false);
  }
  //**************************************************** */
  function handlerConfirmShowAllReponse() {
    //*******all statique*****************************************************************************************

    if (props.QcmSujetTypeSelected === "Par Cour") {
      //update statique pie***************************************************************
      savePieStatique[2] =
        ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
      console.log(savePieStatique);
      //********************************************************************************* */
      //update statique dounate***************************************************************
      for (let index = 0; index < SaveQcmsCourNameStatique.length; index++) {
        SaveEachLineStatique[index][2] =
          SaveQcmsNbrStatique[index] -
          (SaveEachLineStatique[index][0] + SaveEachLineStatique[index][1]);
      }
      console.log(SaveEachLineStatique);
      //********************************************************************************* */
      setShowModalStatique(true);
      setShowModalStatiqueParCour(true);
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      //update statique pie***************************************************************
      savePieStatique[2] =
        ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
      console.log(savePieStatique);
      setShowModalStatique(true);
      setShowModalStatiqueParSujet(true);
      //********************************************************************************* */
    }
    //*******end all statique*****************************************************************************************
    //***this qcm is has been answer************************* */

    setSaveQcmIsAnswer(SaveClickSelectVerfieAll);
    //*********************************************************** */
    setTrueFullInsertClr(true);
    //setShowVerifierRpnsBtn(false);
    setModalDoneQuizIsOpen(false);
  }
  function handlerCancelShowAllReponse() {
    setModalDoneQuizIsOpen(false);
  }
  //*********************************************************** */

  function handleItemClick({ event, qcmIndex } = {}) {
    currentIndex.value = Number(qcmIndex);
    console.log(currentIndex.value);

    console.log(currentIndex.value);
    setExisteNote(false);
    setVisibleNoteQcm(false);
    setVisibleCommentaryStudent(false);

    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);

    /***share screen************************************************************ */
    if (event) {
      console.log(isToggled);
      if (isToggled === "true") {
        if (stompClient && connected) {
          const chatMessage = {
            nickname,
            content: "QcmClickIndex" + currentIndex.value,
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

    VisibleNextBtn.value = true;
    VisiblePrevBtn.value = true;

    //*****check if kayn cas clinique*********************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (props.ExisteCasClinique === false) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (props.ExisteCasClinique === true) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (finalgetCasCliniqueLength.value === 0) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (finalgetCasCliniqueLength.value > 0) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    }
    //**************************************************** */

    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
    selectSaveIndex.value = [];
    if (currentIndex.value === 0) {
      VisiblePrevBtn.value = false;
    }
  }
  //***************************************************************************************** */
  //***show qcms liste*********************************** */
  const handleShowListeQcms = () => {
    setShowListQcms(!ShowListQcms);
  };

  //*********************************************************** */
  //**save qcm funtions************************************************************ */
  const handleSaveQcmQuizz = (sourceBtnSaveQuizzSession) => {
    if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
      handleSaveQcm(sourceBtnSaveQuizzSession);
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (props.ExisteCasClinique === true) {
        handleSaveQcmCasCliniqueQuizz(sourceBtnSaveQuizzSession);
      } else if (props.ExisteCasClinique === false) {
        handleSaveQcm(sourceBtnSaveQuizzSession);
      }
    }
  };
  const handleSaveQcm = async (getSourceBtnSaveQuizzSession) => {
    savePieStatique[2] =
      ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.username = resultUserFinal.username),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    let saveQcmQuizzSession;
    let sourceCommingFrom;
    if (getSourceBtnSaveQuizzSession === "saveQuizz") {
      saveQcmQuizzSession = SaveQcmQuizz;
      saveQcmQuizzSession.nameQcmQuizz = qcmQuizzName;
      sourceCommingFrom = "qcmquizz";
    } else if (getSourceBtnSaveQuizzSession === "saveSession") {
      saveQcmQuizzSession = SaveQcmSession;
      saveQcmQuizzSession.nameQcmSession = props.sessionName;
      sourceCommingFrom = "qcmsession";
    }
    saveQcmQuizzSession.ourUsers = saveUserQcm;

    saveQcmQuizzSession.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    saveQcmQuizzSession.selectedSourceExmn = props.SelectedSourceExmn;
    saveQcmQuizzSession.moduleId = props.moduleId;
    saveQcmQuizzSession.moduleName = props.moduleName;
    saveQcmQuizzSession.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    saveQcmQuizzSession.qcmType = "Qcm";
    saveQcmQuizzSession.minYearQcm = props.minYearQcm;
    saveQcmQuizzSession.maxYearQcm = props.maxYearQcm;
    saveQcmQuizzSession.savePropositions = JSON.stringify(savePropositions);
    saveQcmQuizzSession.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    saveQcmQuizzSession.saveVerfieReponses = JSON.stringify(SaveVerfieReponses);
    saveQcmQuizzSession.saveQcmIsAnswer = JSON.stringify(SaveQcmIsAnswer);
    //**statique ***************************************************************** */
    saveQcmQuizzSession.saveCorrectAnswer = JSON.stringify(SaveCorrectAnswer);
    saveQcmQuizzSession.saveIsClickedCounter =
      JSON.stringify(SaveIsClickedCounter);
    saveQcmQuizzSession.savePieStatique = JSON.stringify(savePieStatique);
    saveQcmQuizzSession.saveEachLineStatique =
      JSON.stringify(SaveEachLineStatique);
    //****************************************************************************** */
    saveQcmQuizzSession.savePercentageAmount =
      JSON.stringify(SavePercentageAmount);
    saveQcmQuizzSession.dateSaveQuizzSession = Date.format(
      "YYYY-MM-dd hh:mm:ss"
    );
    console.log(Date.format("YYYY-MM-dd hh:mm:ss"));
    await axios
      .post(`https://goatqcm-instance.com/${sourceCommingFrom}`, saveQcmQuizzSession, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let fullSessionsListeLength = +localStorage.getItem(
          "fullSessionsListeLength"
        );

        if (fullSessionsListeLength >= 10) {
          handleDeleteSession();
          console.log("succes deleting");
        }
        if (getSourceBtnSaveQuizzSession === "saveQuizz") {
          navigateHome("/quizz");
        } else if (getSourceBtnSaveQuizzSession === "saveSession") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //******************************************************************************* */
  //********************************************************************* */
  const handleSaveQcmCasCliniqueQuizz = async (sourceSaveBtn) => {
    savePieStatique[2] =
      ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
    //************************************************ */
    let sourceCommingFrom;
    let saveQuizzSession;
    if (sourceSaveBtn === "saveQuizz") {
      saveQuizzSession = SaveQcmCasCliniqueQuizz;
      console.log(saveQuizzSession);
      sourceCommingFrom = "qcmcliniquequizz";

      saveQuizzSession.nameQcmCasCliniqueQuizz = qcmQuizzName;
    } else if (sourceSaveBtn === "saveSession") {
      saveQuizzSession = SaveQcmCasCliniqueSession;
      sourceCommingFrom = "qcmcliniquesession";
      console.log(saveQuizzSession);
      saveQuizzSession.nameQcmCasCliniqueSession = props.sessionName;
    }

    /****************************************************** */
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.username = resultUserFinal.username),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */

    console.log(props.QcmSujetTypeSelected);
    console.log(props.SelectedSourceExmn);
    console.log(props.moduleId);
    console.log(props.moduleName);
    console.log(props.selectMultipleCours);

    saveQuizzSession.ourUsers = saveUserQcm;
    /* if (sourceQuizzSessionName === "quizzname") {
        saveQuizzSession.nameQcmCasCliniqueQuizz = casCliniqueQuizzName;
      } else if (sourceQuizzSessionName === "sessionname") {
        saveQuizzSession.nameQcmCasCliniqueSession = "session";
      }*/

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
      props.savePropositionsClinique
    );
    saveQuizzSession.saveClickSelectVerfieAllClinique = JSON.stringify(
      props.SaveClickSelectVerfieAllClinique
    );
    saveQuizzSession.saveVerfieReponsesClinique = JSON.stringify(
      props.SaveVerfieReponsesClinique
    );
    saveQuizzSession.saveQcmIsAnswerClinique = JSON.stringify(
      props.SaveQcmIsAnswerClinique
    );
    saveQuizzSession.savePercentageCliniqueAmount = JSON.stringify(
      props.SavePercentageCliniqueAmount
    );
    //************************************************************************** */

    //*****proposition Qcm CasClinique****************************************** */
    saveQuizzSession.savePropositions = JSON.stringify(savePropositions);
    saveQuizzSession.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    saveQuizzSession.saveVerfieReponses = JSON.stringify(SaveVerfieReponses);
    console.log(props.veriferAllreponseClicked);
    if (props.veriferAllreponseClicked === true) {
      saveQuizzSession.saveQcmIsAnswer = JSON.stringify(
        SaveClickSelectVerfieAll
      );
    } else if (
      props.veriferAllreponseClicked === false ||
      props.veriferAllreponseClicked === undefined
    ) {
      console.log(props.veriferAllreponseClicked);
      saveQuizzSession.saveQcmIsAnswer = JSON.stringify(SaveQcmIsAnswer);
    }

    saveQuizzSession.savePercentageAmount =
      JSON.stringify(SavePercentageAmount);
    //*************************************************************************** */

    //**statique ***************************************************************** */
    saveQuizzSession.saveCorrectAnswer = JSON.stringify(SaveCorrectAnswer);
    saveQuizzSession.saveIsClickedCounter =
      JSON.stringify(SaveIsClickedCounter);
    saveQuizzSession.savePieStatique = JSON.stringify(savePieStatique);
    saveQuizzSession.saveEachLineStatique =
      JSON.stringify(SaveEachLineStatique);
    //****************************************************************************** */
    /**statique Arrays*************************************************************** */
    saveQuizzSession.saveCorrectAnswerClinique = JSON.stringify(
      props.SaveCorrectAnswerClinique
    );
    saveQuizzSession.saveIsClickedCounterClinique = JSON.stringify(
      props.SaveIsClickedCounterClinique
    );
    saveQuizzSession.savePieStatiqueClinique = JSON.stringify(
      props.savePieStatiqueClinique
    );
    saveQuizzSession.saveEachLineStatiqueClinique = JSON.stringify(
      props.SaveEachLineStatiqueClinique
    );
    //******************************************************************************** */
    saveQuizzSession.dateSaveQuizzSession = Date.format("YYYY-MM-dd hh:mm:ss");
    saveQuizzSession.existeCasClinique = true;
    console.log(props.doneGetAllClinique);
    if (!props.doneGetAllClinique) {
      saveQuizzSession.doneGetAllClinique = false;
      console.log("is false");
    } else {
      console.log("is true");
      saveQuizzSession.doneGetAllClinique = true;
    }

    await axios
      .post(`https://goatqcm-instance.com/${sourceCommingFrom}`, saveQuizzSession, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let fullSessionsListeLength = +localStorage.getItem(
          "fullSessionsListeLength"
        );

        /*  if (fullSessionsListeLength >= 10) {
          handleDeleteSession();
          console.log("succes deleting");
        }*/
        if (sourceSaveBtn === "saveQuizz") {
          navigateHome("/quizz");
        } else if (sourceSaveBtn === "saveSession") {
          navigateHome("/savesession");
        }
      })
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //********************************************************************* */
  const handleUpdateQcmQuizzFilter = () => {
    if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
      handleUpdateQcmQuizz();
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (props.ExisteCasClinique === true) {
        handleUpdateQcmCasCliniqueQuizz();
      } else if (props.ExisteCasClinique === true) {
        handleUpdateQcmQuizz();
      }
    }
  };
  //****save cas clinique*********************************** */
  const handleUpdateQcmCasCliniqueQuizz = async () => {
    savePieStatique[2] =
      ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
    let sourceCommingFrom;
    if (props.commingFrom === "savequizz") {
      sourceCommingFrom = "qcmcliniquequizz";
    } else if (props.commingFrom === "savesession") {
      sourceCommingFrom = "qcmcliniquesession";
    }
    //**************************************************** */
    const qcmQuizzId = localStorage.getItem("qcmquizzid");

    //*****update qcm ************************************************************** */
    updateQcmCasCliniqueQuizz.savePropositions =
      JSON.stringify(savePropositions);
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponses =
      JSON.stringify(SaveVerfieReponses);
    console.log(props.veriferAllreponseClicked);
    if (props.veriferAllreponseClicked === true) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        SaveClickSelectVerfieAll
      );
    } else if (
      props.veriferAllreponseClicked === false ||
      props.veriferAllreponseClicked === undefined
    ) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer =
        JSON.stringify(SaveQcmIsAnswer);
    }
    updateQcmCasCliniqueQuizz.savePercentageAmount =
      JSON.stringify(SavePercentageAmount);
    //*********************************************************************************** */

    //****update cas clinque******************************************************* */
    console.log(props.doneGetAllClinique);

    updateQcmCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      props.savePropositionsClinique
    );
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      props.SaveClickSelectVerfieAllClinique
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      props.SaveVerfieReponsesClinique
    );
    updateQcmCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      props.SaveQcmIsAnswerClinique
    );
    updateQcmCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      props.SavePercentageCliniqueAmount
    );

    //**statique ***************************************************************** */
    updateQcmCasCliniqueQuizz.saveCorrectAnswer =
      JSON.stringify(SaveCorrectAnswer);
    updateQcmCasCliniqueQuizz.saveIsClickedCounter =
      JSON.stringify(SaveIsClickedCounter);
    updateQcmCasCliniqueQuizz.savePieStatique = JSON.stringify(savePieStatique);
    updateQcmCasCliniqueQuizz.saveEachLineStatique =
      JSON.stringify(SaveEachLineStatique);
    //****************************************************************************** */

    //**statique ***************************************************************** */

    updateQcmCasCliniqueQuizz.saveCorrectAnswerClinique = JSON.stringify(
      props.SaveCorrectAnswerClinique
    );
    updateQcmCasCliniqueQuizz.saveIsClickedCounterClinique = JSON.stringify(
      props.SaveIsClickedCounterClinique
    );
    updateQcmCasCliniqueQuizz.savePieStatiqueClinique = JSON.stringify(
      props.savePieStatiqueClinique
    );
    updateQcmCasCliniqueQuizz.saveEachLineStatiqueClinique = JSON.stringify(
      props.SaveEachLineStatiqueClinique
    );

    //****************************************************************************** */
    console.log(updateQcmCasCliniqueQuizz);
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
  //***update qcm quizz************************************************************* */
  const handleUpdateQcmQuizz = async () => {
    savePieStatique[2] =
      ShowQcm.length - (savePieStatique[0] + savePieStatique[1]);
    console.log(savePieStatique);
    let sourceCommingFrom;
    if (props.commingFrom === "savequizz") {
      sourceCommingFrom = "qcmquizz";
    } else if (props.commingFrom === "savesession") {
      sourceCommingFrom = "qcmsession";
    }
    //***************************************************** */

    const qcmQuizzId = localStorage.getItem("qcmquizzid");
    console.log(qcmQuizzId);
    updateQcmQuizz.savePropositions = JSON.stringify(savePropositions);
    updateQcmQuizz.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    updateQcmQuizz.saveVerfieReponses = JSON.stringify(SaveVerfieReponses);
    updateQcmQuizz.saveQcmIsAnswer = JSON.stringify(SaveQcmIsAnswer);
    updateQcmQuizz.savePercentageAmount = JSON.stringify(SavePercentageAmount);
    //**statique ***************************************************************** */
    updateQcmQuizz.saveCorrectAnswer = JSON.stringify(SaveCorrectAnswer);
    updateQcmQuizz.saveIsClickedCounter = JSON.stringify(SaveIsClickedCounter);
    updateQcmQuizz.savePieStatique = JSON.stringify(savePieStatique);
    updateQcmQuizz.saveEachLineStatique = JSON.stringify(SaveEachLineStatique);
    //****************************************************************************** */
    console.log(updateQcmQuizz);

    await axios
      .put(
        `https://goatqcm-instance.com/${sourceCommingFrom}/${qcmQuizzId}`,
        updateQcmQuizz,
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

  //********************************************************************************* */

  const closeModalSaveQcmQuizHandler = () => {
    setModalSaveQuizzIsOpen(false);
    setShowModelActionsPhone(false);
  };
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
  const handleChatBtn = () => {
    console.log("hey walid");
    console.log("hey walid");
    setShowDiscsussionDiv(true);
  };
  const handleChatGptBtn = async (qcmId) => {
    setShowChatGpt(true);
    setShowDeepSeek(false);
    qcmIdChatGptDeepSeek.value = qcmId;
  };
  const handleDeepSeekBtn = async (qcmId) => {
    setShowDeepSeek(true);
    setShowChatGpt(false);
    qcmIdChatGptDeepSeek.value = qcmId;
  };

  const handlePostSubmit = async (e) => {
    console.log(userIdToken);
    newPost.ourUsers = { id: userIdToken };
    newPost.content = newPost.content + inputValue;
    console.log(newPost);
    try {
      await axios.post(`https://goatqcm-instance.com/publiction/posts`, newPost);
      setNewPost({
        content: "",
        anonyme: false,
        ourUsers: { id: userIdToken },
      });
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };
  let [inputValue, setInputValue] = useState("");
  const showPubFunction = async (qcmId) => {
    setInputValue("");
    setShowCreatPub(true);
    setNewPost({
      content: "",
      anonyme: false,
      ourUsers: { id: userIdToken },
    });
    let result = await axios.get(`https://goatqcm-instance.com/qcms/${qcmId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let contentqcm = result.data.qcmContent;

    let response = await axios.get(
      `https://goatqcm-instance.com/qcms/${qcmId}/reponses`
    );
    console.log(response.data);
    let allPropositions = response.data.propositionQcm || [];

    const propTexts = response.data.map((item, index) => {
      let letter = String.fromCharCode(65 + index); // A=65
      return `${letter}. ${item.propositionQcm}`;
    });
    console.log(propTexts);
    //setPropositions(propTexts); // ["A. Paroxystique", "B. En coup de poignard", ...]

    //setQcmContent(content);
    setInputValue(contentqcm + propTexts); // <-- set in MessageInput
  };

  //***get image from local distination and display it****** */
  /*
  const getFile = (e) => {
    setFile(e.target.files[0]);
    setFileDisplay(URL.createObjectURL(e.target.files[0]));
  };

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
  const handleTestBtn = () => {
    console.log(savePieStatique);
  };
  return (
    <>
      {!OpenBoardClinique && (
        <>
          <NavigationBar
            changeetatsidebar={etatsidebare}
            cameFrom={"quizzboard"}
          />
          <div className={classes.addingdiv}>
            <div
              className={classes.sidebare}
              data-theme={isDark ? "dark" : "light"}
            >
              {ShowSideBare && <Sidebar />}
            </div>

            {VisibleQmcContainer && isDesktopOrLaptop && (
              <div
                className={classes.contanerspace}
                data-theme={isDark ? "dark" : "light"}
              >
                <button
                  onClick={() => {
                    handleTestBtn();
                  }}
                >
                  test
                </button>
                {VisibleParSujet && isDesktopOrLaptop && (
                  <div
                    className={`${classes.parsujetscontainer} `}
                    style={{
                      width: 310,
                      height: 50,
                      margintop: 50,
                      marginBottom: 10,
                    }}
                  >
                    <select
                      defaultValue="year"
                      style={{ width: 100 }}
                      className={`form-select`}
                      id="year"
                      aria-label="Default select example"
                      onChange={SelectYearHndlerChange}
                      onClick={(e) => {
                        handYearClick();
                      }}
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
                    {VisibleGroupeChange && (
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
                    )}
                  </div>
                )}
                <div className={classes.container_save_qcm_timer}>
                  {ShowCancelQuizzPhone && (
                    <div className={classes.full_save_qcm}>
                      {showSaveSessionQcmBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            handleSaveQcmQuizz(sourceBtnSaveSession);
                          }}
                        >
                          Fin Session
                        </button>
                      )}
                      {showUpdateSessionQcmBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            handleUpdateQcmQuizzFilter();
                          }}
                        >
                          Save Modification
                        </button>
                      )}
                      {showSaveQcmBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setModalSaveQuizzIsOpen(true);
                          }}
                        >
                          Sauvegarder Qcm
                        </button>
                      )}
                      {showUpdateQcmBtn && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            handleUpdateQcmQuizzFilter();
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

                <div className={classes.fullqcmcontainer_commentary}>
                  <div
                    className={`${classes.quizcontainer} card text-white py-1`}
                  >
                    <div
                      className={`${classes.qcmpropocontainer} card-body text-black`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      {ShowQcm.map((qcm, index) => {
                        if (index === currentIndex.value) {
                          return (
                            <div key={currentIndex.value}>
                              <div className={`${classes.qcmInfoHeader} `}>
                                <div className={`${classes.qcmInfo} `}>
                                  <ul
                                    className={`${classes.ulcatogorycourname} "list-group"`}
                                  >
                                    <img
                                      src={courlogo}
                                      height="30%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      {qcm.coursMed.coursName}
                                    </li>
                                    <img
                                      src={externatlogo}
                                      height="50%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      {qcm.category}
                                    </li>
                                    <img
                                      src={groupelogo}
                                      height="50%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      ({qcm.qcmGroupe}) {qcm.qcmYear}
                                    </li>
                                  </ul>
                                </div>
                                <div className={`${classes.goatlogo} `}>
                                  <img src={GoatLogo} height="40" width="70" />
                                </div>
                              </div>
                              <div
                                className={`${classes.qcmnbr_commentary_div} `}
                              >
                                <div>
                                  <li
                                    className={`${classes.nmbrqcm} list-group-item`}
                                    style={{ color: "#007FFF" }}
                                  >
                                    Question {currentIndex.value + 1} sur{" "}
                                    {ShowQcm.length}
                                  </li>
                                </div>
                                <div
                                  className={`${classes.full_note_commentary} `}
                                >
                                  <div
                                    className={`${classes.pubshare} `}
                                    style={{ marginRight: 5 }}
                                  >
                                    <img
                                      src={pub}
                                      height="100%"
                                      width="30"
                                      onClick={() => {
                                        showPubFunction(qcm.id);
                                      }}
                                    />
                                  </div>
                                  <div className={`${classes.chatgpt} `}>
                                    <img
                                      src={chatgpt}
                                      height="100%"
                                      width="30"
                                      onClick={(e) => {
                                        handleChatGptBtn(qcm.id);
                                      }}
                                    />
                                  </div>
                                  <div className={`${classes.deepseek} `}>
                                    <img
                                      src={deepseek}
                                      height="100%"
                                      width="30"
                                      onClick={(e) => {
                                        handleDeepSeekBtn(qcm.id);
                                      }}
                                    />
                                  </div>
                                  <div className={`${classes.note} `}>
                                    <img
                                      src={noteimage}
                                      height="100%"
                                      width="30"
                                      onClick={(e) => {
                                        handleNoteQcmBtn(qcm.id);
                                      }}
                                    />
                                  </div>
                                  <div className={`${classes.commentary} `}>
                                    <span className={`${classes.nbrComent} `}>
                                      {
                                        numbreCommentaryFinal.value[
                                          currentIndex.value
                                        ]
                                      }
                                    </span>
                                    <img
                                      src={comment}
                                      height="50%"
                                      width="20"
                                      onClick={(e) => {
                                        handleCommentaryBtn(qcm.id);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              {isParticipateAdmin && (
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={() =>
                                      navigateEditeQcm(`/editeqcm`, {
                                        state: {
                                          qcmId: qcm.id,
                                          cours_id: props.courId,
                                          qcmSource: props.SelectedSourceExmn,
                                        },
                                      })
                                    }
                                  >
                                    Edite Qcm
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-info btn-sm"
                                    onClick={(e) => deleteQcmHndler(qcm.id)}
                                  >
                                    Delete Qcm
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ marginLeft: 5 }}
                                    onClick={(e) => testDescExsite(qcm.id)}
                                  >
                                    Ajouter Commentaire
                                  </button>
                                </div>
                              )}
                              {visibleNoteQcm && <NoteQcm qcmId={qcm.id} />}
                              {visisbleDescInsert && (
                                <div className={classes.imgdescdiv}>
                                  <div className={classes.fulldescription}>
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
                                        <img src={fileDisplay} alt="preview" />
                                      )}
                                      <input type="file" onChange={getFile} />

                                      {open && fileDisplay && (
                                        <div className={classes.cropContainer}>
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

                                          <div className={classes.cropButtons}>
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
                                              onClick={() => setOpen(false)}
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
                                  <div className={classes.fulldescription}>
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
                                        <div className={classes.cropContainer}>
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

                                          <div className={classes.cropButtons}>
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
                                              onClick={() => setOpen(false)}
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
                                        value={FullDescEdite.qcmDescription}
                                        onChange={(e) =>
                                          setFullDescEdite({
                                            ...FullDescEdite,
                                            qcmDescription: e.target.value,
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
                                    onClick={(e) => deleteFullDesc(qcm.id)}
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
                              {shoCopyParModule && (
                                <div
                                  onCopy={disableCopyPaste}
                                  onCut={disableCopyPaste}
                                  onPaste={disableCopyPaste}
                                  style={{
                                    userSelect: "none",
                                  }}
                                  className={`${classes.qcmfeild}  table-hover shadow`}
                                >
                                  <p>{qcm.qcmContent}</p>
                                </div>
                              )}
                              {shoCopyParModule === false && (
                                <div className={`${classes.qcmfeild}  `}>
                                  <p>{qcm.qcmContent}</p>
                                </div>
                              )}
                              <ImageQcm qcmId={qcm.id} />
                            </div>
                          );
                        }
                      })}

                      <div className={`${classes.propofeild} card `}>
                        {ShowPropositions.map((Proposition, QcmPropoIndex) => {
                          if (QcmPropoIndex === currentIndex.value) {
                            return (
                              <>
                                <ul
                                  onCopy={disableCopyPaste}
                                  onCut={disableCopyPaste}
                                  onPaste={disableCopyPaste}
                                  style={{
                                    userSelect: "none",
                                  }}
                                  key={QcmPropoIndex}
                                  multiple={true}
                                  className={`${classes.ulpropo} list-group list-group-flush`}
                                >
                                  {Proposition.map((propo, indexPropo) => (
                                    <li
                                      key={indexPropo}
                                      value={propo.id}
                                      style={{
                                        backgroundColor:
                                          SaveVerfieReponses[
                                            currentIndex.value
                                          ] === currentIndex.value
                                            ? propo.reponseBool === true
                                              ? COLORS[1]
                                              : savePropositions[
                                                  currentIndex.value
                                                ][indexPropo] === propo.id &&
                                                propo.reponseBool === false
                                              ? COLORS[0]
                                              : ""
                                            : (SaveClickSelectVerfieAll[
                                                currentIndex.value
                                              ] === currentIndex.value &&
                                                TrueFullInsertClr === true) ||
                                              SaveQcmIsAnswer[
                                                currentIndex.value
                                              ] === currentIndex.value
                                            ? propo.reponseBool === true
                                              ? COLORS[1]
                                              : savePropositions[
                                                  currentIndex.value
                                                ][indexPropo] === propo.id &&
                                                propo.reponseBool === false
                                              ? COLORS[0]
                                              : ""
                                            : "",
                                      }}
                                      className={
                                        savePropositions[currentIndex.value][
                                          indexPropo
                                        ] === propo.id
                                          ? "list-group-item active  "
                                          : "list-group-item"
                                      }
                                      onClick={(e) => {
                                        handlePropoClick(
                                          e,
                                          propo.id,
                                          currentIndex.value,
                                          indexPropo,
                                          propo.qcmStandard.id,
                                          propo.qcmStandard.coursMed.coursName,
                                          cameFrome[0]
                                        );
                                      }}
                                    >
                                      <img
                                        src={
                                          AlphabetChoice[
                                            (IndexAlphabetChoice =
                                              IndexAlphabetChoice + 1)
                                          ]
                                        }
                                        height="30"
                                        width="30"
                                      />
                                      {propo.propositionQcm}
                                      {SaveQcmIsAnswer[currentIndex.value] ===
                                        currentIndex.value && (
                                        <div
                                          className={`${classes.percentage} `}
                                        >
                                          {(
                                            (propo.countSelect * 100) /
                                            SavePercentageAmount[
                                              currentIndex.value
                                            ]
                                          ).toFixed(0)}
                                          %
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                                <div className={`${classes.btnfooter} `}>
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
                                  {SaveQcmIsAnswer[currentIndex.value] ===
                                    "" && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handleClickiVerifieReponse(
                                          currentIndex.value
                                        );

                                        setTrueInsertClr(currentIndex.value);

                                        saveQcmIndex.value[currentIndex.value] =
                                          currentIndex.value;
                                        console.log(
                                          saveQcmIndex.value[currentIndex.value]
                                        );
                                      }}
                                    >
                                      Vérifer la réponse
                                    </button>
                                  )}
                                  {(SaveQcmIsAnswer[currentIndex.value] ===
                                    currentIndex.value ||
                                    SaveVerfieReponses[currentIndex.value] ===
                                      currentIndex.value) && (
                                    <button
                                      type="button"
                                      disabled={isDisabled}
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handeldescription(
                                          Proposition[0].qcmStandard.id
                                        );
                                      }}
                                    >
                                      Explication
                                    </button>
                                  )}
                                  {VisibleNextBtn.value ? (
                                    <button
                                      type="button"
                                      className={`${classes.btnsuivant} btn btn-warning`}
                                      onClick={(e) =>
                                        handleNextClick({ event: e })
                                      }
                                    >
                                      Suivant
                                    </button>
                                  ) : (
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
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${classes.qcmsliste}`}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    <div className={`${classes.qcmsliste_header}`}>
                      <h6>Liste Qcms</h6>
                    </div>
                    <ul className="list-group">
                      {ShowQcm.map((Qcm, QcmIndex) => (
                        <li
                          key={QcmIndex}
                          value={Qcm.id}
                          className={
                            SelectQcmIndex === QcmIndex
                              ? "list-group-item active  "
                              : "list-group-item"
                          }
                          onClick={(e) => {
                            handleItemClick({ event: e, qcmIndex: QcmIndex });
                          }}
                        >
                          Question {QcmIndex + 1}
                          {SaveClickSelectVerfieAll[QcmIndex] === QcmIndex && (
                            <div className={classes.vl_select}></div>
                          )}
                          {SaveQcmIsAnswer[QcmIndex] === QcmIndex && (
                            <div className={classes.vl_answer}></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {visibleCommentaryStudent && (
                    <div className={`${classes.commentarydiv}`}>
                      <div
                        className={`${classes.anonymecmntre} form-check form-switch vertical-switch my-2 ms-1`}
                      >
                        <input
                          style={{ width: 40, height: 25 }}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={isAnonyme}
                          onChange={(e) => setIsAnonyme(e.target.checked)}
                        />
                        <label className="form-check-label">Anonyme</label>
                      </div>
                      {qcmCommentary.map((commentary, index) => (
                        <div
                          key={index}
                          className={`${classes.commentary_likes}`}
                        >
                          <div
                            className={`${classes.eachcommentary} card`}
                            style={{ backgroundColor: "#F5F5F5" }}
                          >
                            <h6>
                              {commentary.anonyme
                                ? "Anonyme"
                                : `${commentary.ourUsers.name}`}
                            </h6>
                            {commentary.commentaryStudent && (
                              <p>{commentary.commentaryStudent}</p>
                            )}
                            {commentary.imageName && (
                              <img
                                src={`https://goatqcm-instance.com/commentary/image/${commentary.id}`}
                                alt="commentary"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  marginTop: "8px",
                                }}
                              />
                            )}
                          </div>
                          <div className={`${classes.likes}`}>
                            <div className={`${classes.btnjadore}`}>
                              <button
                                onClick={(e) => {
                                  {
                                    handlejadorebtn(
                                      commentary.id,
                                      commentary.likes,
                                      commentary.qcmStandard.id
                                    );
                                  }
                                }}
                              >
                                j'adore
                              </button>
                            </div>

                            <div className={`${classes.btnjadore_icon}`}>
                              <h6>{commentary.likes}</h6>

                              <img src={jadore} height="50%" width="20" />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div
                        className={`${classes.inputcommentary} input-group `}
                      >
                        <div className={`${classes.custom_search}`}>
                          {/* Text input */}
                          <input
                            type="text"
                            className={`${classes.custom_search_input} form-control`}
                            placeholder="Commenter"
                            value={inputStr}
                            onChange={(e) => setInputStr(e.target.value)}
                          />
                          {selectedFile && (
                            <div className="preview">
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="preview"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  borderRadius: "8px",
                                  marginTop: "8px",
                                }}
                              />
                            </div>
                          )}

                          {/* Right side icons (emoji, upload, send) */}
                          <div
                            className={`${classes.custom_search_botton} picker-container`}
                          >
                            <div className={`${classes.imojiicon_btnsend}`}>
                              {/* Emoji button */}
                              <img
                                className="emoji-icon"
                                src={smileimoji}
                                height="70%"
                                width="25"
                                onClick={() => setShowPicker((val) => !val)}
                              />

                              {/* Hidden file input */}
                              <input
                                type="file"
                                accept="image/*"
                                id="fileUpload"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                  setSelectedFile(e.target.files[0])
                                }
                              />

                              {/* Upload icon instead of input */}
                              <img
                                src={upimagecommentary}
                                alt="Upload"
                                height="70%"
                                width="25"
                                className="cursor-pointer"
                                onClick={() =>
                                  document.getElementById("fileUpload").click()
                                }
                              />

                              {/* Send button */}
                              <img
                                onClick={handlesendComment}
                                src={sendcomentary}
                                height="70%"
                                width="25"
                              />
                            </div>
                          </div>

                          {/* Emoji picker container */}
                          <div className={`${classes.pickerdiv}`} />
                        </div>
                      </div>
                      {showPicker && (
                        <Picker
                          style={{ width: "100%" }}
                          onEmojiClick={(emojiObject) => {
                            setInputStr(
                              (prevMsg) => prevMsg + emojiObject.emoji
                            );
                            setShowPicker(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                {ShowDescQcm && (
                  <Description qcmIdPropsQcmDesc={qcmIdPropsQcmDesc} />
                )}
                {showChatGpt && (
                  <div className={`${classes.chatgptdiv}`}>
                    <ChatGptfinal qcmId={qcmIdChatGptDeepSeek.value} />
                  </div>
                )}
                {showDeepSeek && (
                  <div className={`${classes.chatgptdiv}`}>
                    <DeepSeek qcmId={qcmIdChatGptDeepSeek.value} />
                  </div>
                )}
                {showCreatPub && (
                  <div
                    className={classes.fullinputshow}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handlePostSubmit();
                        setShowCreatPub(false);
                      }}
                    >
                      <div className={classes.creatposttitle}>
                        Cree Publication
                      </div>
                      <hr className={`${classes.hr} `} />
                      <div
                        className={`${classes.anonyme} form-check form-switch vertical-switch my-2 ms-1`}
                      >
                        <input
                          style={{ width: 60, height: 30 }}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="anonymousSwitch"
                          checked={newPost.anonyme}
                          onChange={(e) =>
                            setNewPost({
                              ...newPost,
                              anonyme: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="anonymousSwitch"
                        >
                          Publie comme anonyme
                        </label>
                      </div>
                      <div className={classes.pubtextarea}>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Ajouter ton question!"
                          value={newPost.content}
                          onChange={(e) =>
                            setNewPost({
                              ...newPost,
                              content: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div
                        className={classes.qcmdisplay}
                        style={{
                          userSelect: "none", // Prevent text selection
                          WebkitUserSelect: "none", // Safari/Chrome
                          MozUserSelect: "none", // Firefox
                          msUserSelect: "none", // IE/Edge
                        }}
                      >
                        {inputValue}
                      </div>
                      <hr className={`${classes.hr} `} />

                      <div className={classes.pustpubbutton}>
                        <button type="submit" className="btn btn-primary">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {VisibleQmcContainer && isTabletOrMobile && (
              <div className={classes.modal_phone}>
                <div className={classes.contanerspace_phone}>
                  <div className={classes.fullqcmcontainer_commentary}>
                    <div
                      className={`${classes.quizcontainer_phone} card text-white py-1`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      <div className={classes.headerquizz_phone}>
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
                        <div className={classes.full_save_close_quizz}>
                          {ShowCancelQuizzPhone && (
                            <>
                              <div className={`${classes.closequizz_phone} `}>
                                <li
                                  className={`${classes.homebtn} list-group-item`}
                                >
                                  <TfiClose
                                    onClick={(e) => {
                                      setShowModelActionsPhone(true);
                                    }}
                                  />
                                </li>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {VisibleParSujet && (
                        <div
                          className={`${classes.parsujetscontainer_phone} `}
                          style={{ width: 200, height: 40, marginLeft: 5 }}
                        >
                          <select
                            defaultValue="year"
                            style={{ width: 100, fontSize: 15 }}
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
                          {VisibleGroupeChange && (
                            <select
                              style={{ width: 110, fontSize: 15 }}
                              className={` form-select`}
                              id="groupepermutation"
                              aria-label="Default select example"
                              defaultValue="groupe"
                              onChange={SelectGroupePermHndlerChange}
                            >
                              <option value="groupe" disabled="disabled">
                                Groupe
                              </option>
                              {GroupesPermut.map((groupepermutation, index) => (
                                <option key={index}>{groupepermutation}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}

                      <div
                        className={`${classes.qcmpropocontainer_phone} card-body text-black`}
                        data-theme={isDark ? "dark" : "light"}
                      >
                        {ShowQcm.map((qcm, index) => {
                          if (index === currentIndex.value) {
                            return (
                              <div key={index}>
                                <div className={`${classes.modulediv_phone} `}>
                                  <div className={`${classes.child_phone} `}>
                                    <li
                                      className={`${classes.modulename} list-group-item`}
                                    >
                                      {props.moduleName}
                                    </li>
                                  </div>
                                </div>
                                <hr className={`${classes.hr_phone} `} />
                                <div
                                  className={`${classes.qcmInfoHeader_phone} `}
                                >
                                  <div
                                    className={`${classes.qcmInfocatgrp_phone} `}
                                  >
                                    <li className="list-group-item">
                                      {qcm.category}-
                                    </li>

                                    <li className="list-group-item">
                                      ({qcm.qcmGroupe}) {qcm.qcmYear}
                                    </li>
                                  </div>
                                </div>
                                <hr className={`${classes.hr_phone} `} />
                                <div
                                  className={`${classes.qcmcourqcmnbr_phone} `}
                                >
                                  <div
                                    className={`${classes.qcmcourimgname_phone} `}
                                  >
                                    <img
                                      src={courlogo}
                                      height="30%"
                                      width="20"
                                    />
                                    <li
                                      className={`${classes.courname_phone} list-group-item`}
                                    >
                                      {qcm.coursMed.coursName}
                                    </li>
                                  </div>
                                  <hr className={`${classes.hr_phone} `} />
                                  <div
                                    className={`${classes.qcmnbr_commentary_div_phone} `}
                                  >
                                    <div className={`${classes.nmbrqcm_phone}`}>
                                      <li
                                        className="list-group-item"
                                        style={{ color: "#007FFF" }}
                                      >
                                        Question {currentIndex.value + 1} sur{" "}
                                        {ShowQcm.length}
                                      </li>
                                    </div>
                                    <div
                                      className={`${classes.full_note_commentary_phone} `}
                                    >
                                      <div className={`${classes.pubcreat} `}>
                                        <img
                                          src={pub}
                                          height="80%"
                                          width="25"
                                          onClick={(e) => {
                                            showPubFunction(qcm.id);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className={`${classes.chatgpt_phone} `}
                                      >
                                        <img
                                          src={chatgpt}
                                          height="100%"
                                          width="25"
                                          onClick={(e) => {
                                            handleChatGptBtn(qcm.id);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className={`${classes.deepseek_phone} `}
                                      >
                                        <img
                                          src={deepseek}
                                          height="100%"
                                          width="25"
                                          onClick={(e) => {
                                            handleDeepSeekBtn(qcm.id);
                                          }}
                                        />
                                      </div>
                                      <div className={`${classes.note_phone} `}>
                                        <img
                                          src={noteimage}
                                          height="100%"
                                          width="25"
                                          onClick={(e) => {
                                            handleNoteQcmBtn();
                                          }}
                                        />
                                      </div>
                                      <div
                                        className={`${classes.commentary_phone} `}
                                      >
                                        <span
                                          className={`${classes.nbrComent_phone} `}
                                        >
                                          {numbreCommentaryFinal.value[index]}
                                        </span>
                                        <img
                                          src={comment}
                                          height="40"
                                          width="25"
                                          onClick={(e) => {
                                            handleCommentaryBtn(qcm.id);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {isParticipateAdmin && (
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-warning btn-sm"
                                      onClick={() =>
                                        navigateEditeQcm(`/editeqcm`, {
                                          state: {
                                            qcmId: qcm.id,
                                            cours_id: props.courId,
                                            qcmSource: props.SelectedSourceExmn,
                                          },
                                        })
                                      }
                                    >
                                      Edite Qcm
                                    </button>
                                    <button
                                      type="submit"
                                      className="btn btn-info btn-sm"
                                      onClick={(e) => deleteQcmHndler(qcm.id)}
                                    >
                                      Delete Qcm
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      style={{ marginLeft: 5 }}
                                      onClick={(e) => testDescExsite(qcm.id)}
                                    >
                                      Ajouter Commentaire
                                    </button>
                                  </div>
                                )}
                                {visibleNoteQcm && <NoteQcm qcmId={qcm.id} />}
                                {visisbleDescInsert && (
                                  <div className={classes.imgdescdiv}>
                                    <div className={classes.fulldescription}>
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
                                    <div className={classes.fulldescription}>
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
                                          value={FullDescEdite.qcmDescription}
                                          onChange={(e) =>
                                            setFullDescEdite({
                                              ...FullDescEdite,
                                              qcmDescription: e.target.value,
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
                                      onClick={(e) => deleteFullDesc(qcm.id)}
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
                                  className={`${classes.qcmfeild_phone}`}
                                  data-theme={isDark ? "dark" : "light"}
                                  onCopy={disableCopyPaste}
                                  onCut={disableCopyPaste}
                                  onPaste={disableCopyPaste}
                                  style={{
                                    userSelect: "none",
                                  }}
                                >
                                  <p>{qcm.qcmContent}</p>
                                </div>
                                <ImageQcm qcmId={qcm.id} />
                              </div>
                            );
                          }
                        })}
                        <div className={`${classes.propofeild_phone} card `}>
                          {ShowPropositions.map(
                            (Proposition, QcmPropoIndex) => {
                              if (QcmPropoIndex === currentIndex.value) {
                                return (
                                  <>
                                    <ul
                                      onCopy={disableCopyPaste}
                                      onCut={disableCopyPaste}
                                      onPaste={disableCopyPaste}
                                      style={{
                                        userSelect: "none",
                                      }}
                                      key={QcmPropoIndex}
                                      multiple={true}
                                      className={`${classes.ulpropo_phone} list-group list-group-flush`}
                                      data-theme={isDark ? "dark" : "light"}
                                    >
                                      {Proposition.map((propo, indexPropo) => (
                                        <li
                                          key={indexPropo}
                                          value={propo.id}
                                          style={{
                                            backgroundColor:
                                              SaveVerfieReponses[
                                                currentIndex.value
                                              ] === currentIndex.value
                                                ? propo.reponseBool === true
                                                  ? COLORS[1]
                                                  : savePropositions[
                                                      currentIndex.value
                                                    ][indexPropo] ===
                                                      propo.id &&
                                                    propo.reponseBool === false
                                                  ? COLORS[0]
                                                  : ""
                                                : (SaveClickSelectVerfieAll[
                                                    currentIndex.value
                                                  ] === currentIndex.value &&
                                                    TrueFullInsertClr ===
                                                      true) ||
                                                  SaveQcmIsAnswer[
                                                    currentIndex.value
                                                  ] === currentIndex.value
                                                ? propo.reponseBool === true
                                                  ? COLORS[1]
                                                  : savePropositions[
                                                      currentIndex.value
                                                    ][indexPropo] ===
                                                      propo.id &&
                                                    propo.reponseBool === false
                                                  ? COLORS[0]
                                                  : ""
                                                : "",
                                          }}
                                          className={
                                            savePropositions[
                                              currentIndex.value
                                            ][indexPropo] === propo.id
                                              ? "list-group-item active  "
                                              : "list-group-item"
                                          }
                                          onClick={(e) => {
                                            handlePropoClick(
                                              e,
                                              propo.id,
                                              currentIndex.value,
                                              indexPropo,
                                              propo.qcmStandard.id,
                                              propo.qcmStandard.coursMed
                                                .coursName,
                                              cameFrome[0]
                                            );
                                          }}
                                        >
                                          <img
                                            src={
                                              AlphabetChoice[
                                                (IndexAlphabetChoice =
                                                  IndexAlphabetChoice + 1)
                                              ]
                                            }
                                            height="30"
                                            width="30"
                                          />
                                          {propo.propositionQcm}
                                          {SaveQcmIsAnswer[
                                            currentIndex.value
                                          ] === currentIndex.value && (
                                            <div
                                              className={`${classes.percentage_phone} `}
                                            >
                                              {(
                                                (propo.countSelect * 100) /
                                                SavePercentageAmount[
                                                  currentIndex.value
                                                ]
                                              ).toFixed(0)}
                                              %
                                            </div>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                    <div
                                      className={`${classes.btnfooter_phone} `}
                                    >
                                      {VisiblePrevBtn.value && (
                                        <div
                                          onClick={(e) =>
                                            handlePrevClick({ event: e })
                                          }
                                        >
                                          <button
                                            className={
                                              classes.btnPrecdent_phone
                                            }
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
                                      {SaveQcmIsAnswer[currentIndex.value] ===
                                        "" && (
                                        <FaRegCheckCircle
                                          className={`${classes.BntVerifierrpnse_phone} `}
                                          onClick={(e) => {
                                            handleClickiVerifieReponse(
                                              currentIndex.value
                                            );

                                            setTrueInsertClr(
                                              currentIndex.value
                                            );

                                            saveQcmIndex.value[
                                              currentIndex.value
                                            ] = currentIndex.value;
                                            console.log(
                                              saveQcmIndex.value[
                                                currentIndex.value
                                              ]
                                            );
                                          }}
                                        />
                                      )}
                                      {(SaveQcmIsAnswer[currentIndex.value] ===
                                        currentIndex.value ||
                                        SaveVerfieReponses[
                                          currentIndex.value
                                        ] === currentIndex.value) && (
                                        <button
                                          type="button"
                                          className={`${classes.button_10} `}
                                          onClick={(e) => {
                                            handeldescription(
                                              Proposition[0].qcmStandard.id
                                            );
                                          }}
                                        >
                                          Explication
                                        </button>
                                      )}
                                      {VisibleNextBtn.value ? (
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
                                      ) : (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}
                                    </div>
                                  </>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {ShowDescQcm && (
                    <Description qcmIdPropsQcmDesc={qcmIdPropsQcmDesc} />
                  )}
                  {showChatGpt && (
                    <div className={`${classes.chatgptdiv_phone}`}>
                      <ChatGptfinal qcmId={qcmIdChatGptDeepSeek.value} />
                    </div>
                  )}
                  {showDeepSeek && (
                    <div className={`${classes.chatgptdiv_phone}`}>
                      <DeepSeek qcmId={qcmIdChatGptDeepSeek.value} />
                    </div>
                  )}
                </div>
                <div
                  className={`${classes.full_listeqcm_phone}`}
                  data-theme={isDark ? "dark" : "light"}
                  style={{ width: ShowListQcms ? 180 : 10 }}
                >
                  {ShowListQcms && (
                    <div className={`${classes.listeqcm_phone}`}>
                      <div className={`${classes.qcmsliste_header_phone}`}>
                        <h6>Liste Qcms</h6>
                      </div>
                      <ul className="list-group">
                        {ShowQcm.map((Qcm, QcmIndex) => (
                          <li
                            key={QcmIndex}
                            value={Qcm.id}
                            className={
                              SelectQcmIndex === QcmIndex
                                ? "list-group-item active  "
                                : "list-group-item"
                            }
                            onClick={(e) => {
                              handleItemClick({ event: e, qcmIndex: QcmIndex });
                            }}
                          >
                            Question {QcmIndex + 1}
                            {SaveClickSelectVerfieAll[QcmIndex] ===
                              QcmIndex && (
                              <div className={classes.vl_select_phone}></div>
                            )}
                            {SaveQcmIsAnswer[QcmIndex] === QcmIndex && (
                              <div className={classes.vl_answer_phone}></div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className={`${classes.iconlistqcm}`}>
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
                {visibleCommentaryStudent && (
                  <div className={`${classes.commentarydiv_phone} `}>
                    <li
                      className={`${classes.close_commentary_phone} list-group-item`}
                    >
                      <img
                        src={closecommentary}
                        height="30"
                        width="30"
                        onClick={(e) => {
                          handleCloseCommentaryBtn();
                        }}
                      />
                    </li>
                    <div
                      className={`${classes.anonymecmntre_phone} form-check form-switch vertical-switch my-2 ms-1`}
                    >
                      <input
                        style={{ width: 40, height: 25 }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={isAnonyme}
                        onChange={(e) => setIsAnonyme(e.target.checked)}
                      />
                      <label className="form-check-label">Anonyme</label>
                    </div>
                    {qcmCommentary.map((commentary, index) => (
                      <div id={index}>
                        <div className={`${classes.commentary_likes_phone}`}>
                          <div
                            className={`${classes.eachcommentary_phone} card`}
                            style={{ backgroundColor: "#F5F5F5" }}
                          >
                            <h6>
                              {commentary.anonyme
                                ? "Anonyme"
                                : `${commentary.ourUsers.name} `}
                            </h6>

                            <h5>{commentary.commentaryStudent}</h5>
                            {commentary.imageName && (
                              <img
                                src={`https://goatqcm-instance.com/commentary/image/${commentary.id}`}
                                alt="commentary"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  marginTop: "8px",
                                }}
                              />
                            )}
                          </div>
                          <div className={`${classes.likes_phone}`}>
                            <div className={`${classes.btnjadore_phone}`}>
                              <button
                                onClick={(e) => {
                                  {
                                    handlejadorebtn(
                                      commentary.id,
                                      commentary.likes,
                                      commentary.qcmStandard.id
                                    );
                                  }
                                }}
                              >
                                j'adore
                              </button>
                            </div>

                            <div className={`${classes.btnjadore_icon_phone}`}>
                              <h6>{commentary.likes}</h6>

                              <img src={jadore} height="50%" width="20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={`${classes.inputcommentary_phone} input-group `}
                    >
                      <div className={`${classes.custom_search_phone}`}>
                        {/* Text input */}
                        <input
                          type="text"
                          className={`${classes.custom_search_input_phone} form-control`}
                          placeholder="Commenter"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                        />
                        {selectedFile && (
                          <div className="preview">
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="preview"
                              style={{
                                width: "100%",
                                height: "200px",
                                borderRadius: "8px",
                                marginTop: "8px",
                              }}
                            />
                          </div>
                        )}

                        {/* Right side icons (emoji, upload, send) */}
                        <div
                          className={`${classes.custom_search_botton_phone} picker-container`}
                        >
                          <div className={`${classes.imojiicon_btnsend_phone}`}>
                            {/* Emoji button */}
                            <img
                              className="emoji-icon"
                              src={smileimoji}
                              height="70%"
                              width="25"
                              onClick={() => setShowPicker((val) => !val)}
                            />

                            {/* Hidden file input */}
                            <input
                              type="file"
                              accept="image/*"
                              id="fileUpload"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                setSelectedFile(e.target.files[0])
                              }
                            />

                            {/* Upload icon instead of input */}
                            <img
                              src={upimagecommentary}
                              alt="Upload"
                              height="70%"
                              width="25"
                              className="cursor-pointer"
                              onClick={() =>
                                document.getElementById("fileUpload").click()
                              }
                            />

                            {/* Send button */}
                            <img
                              onClick={handlesendComment}
                              src={sendcomentary}
                              height="70%"
                              width="25"
                            />
                          </div>
                        </div>

                        {/* Emoji picker container */}
                        <div className={`${classes.pickerdiv_phone}`} />
                      </div>
                    </div>
                    {showPicker && (
                      <Picker
                        style={{ width: "100%" }}
                        onEmojiClick={(emojiObject) => {
                          setInputStr((prevMsg) => prevMsg + emojiObject.emoji);
                          setShowPicker(false);
                        }}
                      />
                    )}
                  </div>
                )}
                {showCreatPub && (
                  <div
                    className={classes.fullinputshow_phone}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handlePostSubmit();
                        setShowCreatPub(false);
                      }}
                    >
                      <div className={classes.creatposttitle_phone}>
                        Cree Publication
                      </div>
                      <hr className={`${classes.hr_phone} `} />
                      <div
                        className={`${classes.anonyme_phone} form-check form-switch vertical-switch my-2 ms-1`}
                      >
                        <input
                          style={{ width: 35, height: 20 }}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="anonymousSwitch"
                          checked={newPost.anonyme}
                          onChange={(e) =>
                            setNewPost({
                              ...newPost,
                              anonyme: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="anonymousSwitch"
                        >
                          anonyme
                        </label>
                      </div>
                      <div className={classes.pubtextarea_phone}>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Ajouter ton question!"
                          value={newPost.content}
                          onChange={(e) =>
                            setNewPost({
                              ...newPost,
                              content: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div
                        className={classes.qcmdisplay_phone}
                        style={{
                          userSelect: "none", // Prevent text selection
                          WebkitUserSelect: "none", // Safari/Chrome
                          MozUserSelect: "none", // Firefox
                          msUserSelect: "none", // IE/Edge
                        }}
                      >
                        {inputValue}
                      </div>
                      <hr className={`${classes.hr_phone} `} />

                      <div className={classes.pustpubbutton_phone}>
                        <button type="submit" className="btn btn-primary">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {VisibleQmcContainer && isTabletOrMobile && <BackdropQuiz />}
            {modalDeleteCourIsOpen && (
              <ModalDeleteFullDesc
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                qcmId_delete={qcmIddelete.value}
              />
            )}
            {modalDeleteCourIsOpen && (
              <BackdropDeleteCour onCancel={closeDeleteModalHandler} />
            )}
          </div>
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz}>
                <div className={classes.card_done_quiz_btns}>
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
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isDesktopOrLaptop && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz}>
                <div className={classes.save_quizz_conetent}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nome de quizz"
                    onChange={(e) => setQcmQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      handleSaveQcmQuizz(sourceBtnSaveQuizz);
                    }}
                  >
                    Save Qcm Quizz
                  </button>
                </div>
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
          {isTabletOrMobile && ModalDoneQuizIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isTabletOrMobile && showCreatPub && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isTabletOrMobile && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz_phone}>
                <div className={classes.save_quizz_conetent_phone}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nome de quizz"
                    onChange={(e) => setQcmQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      handleSaveQcmQuizz(sourceBtnSaveQuizz);
                    }}
                  >
                    Save Qcm Quizz
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={closeModalSaveQcmQuizHandler}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </>
          )}
          {isTabletOrMobile &&
            (ModalSaveQuizzIsOpen || ShowModelActionsPhone) && (
              <BackdropSaveQuizPhone onCancel={closeModalSaveQcmQuizHandler} />
            )}
          {isDesktopOrLaptop &&
            ShowModalStatique &&
            ShowModalStatiqueParCour && (
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
                    <div className={classes.fulleachcours}>
                      <div className={classes.headerbounate}>
                        <div
                          className={`${classes.cardbodynumber} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time}>
                            {ShowQcm.length} Questions
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

                      {SaveQcmsCourNameStatique.map((nomCour, index) => (
                        <div key={index} className={classes.eachbounatecour}>
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
                      ))}
                    </div>
                  </div>
                </div>
              </>
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
          {isDesktopOrLaptop && open && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isDesktopOrLaptop && showCreatPub && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}

          {isTabletOrMobile &&
            ShowModalStatique &&
            ShowModalStatiqueParCour && (
              <>
                <div
                  style={{ overflowY: "scroll", overflowX: "scroll" }}
                  className={classes.fullstatique_phone}
                >
                  <div className={classes.bothfullstatique_phone}>
                    <div className={classes.fullpiebarestatique_phone}>
                      <div className={classes.piestatique_phone}>
                        <Doughnut options={options} data={pieChartData} />
                      </div>
                      <div className={classes.piestatique_phone}>
                        <Bar options={optionsBar} data={barChartData} />
                      </div>
                    </div>
                    <div className={classes.fulleachcours_phone}>
                      <div className={classes.headerbounate_phone}>
                        <div
                          className={`${classes.cardbodynumber_phone} card-body    `}
                        >
                          <h5 className={classes.titlenumber_time_phone}>
                            {ShowQcm.length} Questions
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

                      {SaveQcmsCourNameStatique.map((nomCour, index) => (
                        <div
                          key={index}
                          className={classes.eachbounatecour_phone}
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
                      ))}
                    </div>
                  </div>
                </div>
              </>
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
          {isTabletOrMobile && ShowModalStatique && (
            <BackdropSaveQuizPhone onCancel={closeModalDoneQuizHandler} />
          )}

          {isDesktopOrLaptop &&
            getDuiscussionDivStatus == "true" &&
            ShowDiscsussionDiv && <ChatBox chatcode={codechatlocation} />}
          {isTabletOrMobile &&
            getDuiscussionDivStatus == "true" &&
            ShowDiscsussionDiv && <ChatBox chatcode={codechatlocation} />}
        </>
      )}
      {OpenBoardClinique && (
        <QuizBoardClinique
          selectMultipleCours={props.selectMultipleCours}
          moduleName={props.moduleName}
          qcmType={props.qcmType}
          TrueFullInsertClr={TrueFullInsertClr}
          QcmSujetTypeSelected={props.QcmSujetTypeSelected}
          getYear={getYear.value || props.getYear}
          minYearQcm={props.minYearQcm}
          maxYearQcm={props.maxYearQcm}
          getGroupePerm={getGroupePerm.value || props.getGroupePerm}
          minMaxYearParSujetsFinal={props.minMaxYearParSujetsFinal}
          moduleId={props.moduleId}
          sessionName={props.sessionName}
          ExisteCasClinique={props.ExisteCasClinique}
          SelectedSourceExmn={props.SelectedSourceExmn}
          checkParSjtBiologieClinique={props.checkParSjtBiologieClinique}
          savePropositions={savePropositions}
          SaveVerfieReponses={SaveVerfieReponses}
          doneGetAllClinique={props.doneGetAllClinique}
          IsRepondeAllSignal={IsRepondeAllSignal.value}
          SaveClickSelectVerfieAll={SaveClickSelectVerfieAll}
          SaveQcmIsAnswer={SaveQcmIsAnswer}
          savePropositionsClinique={props.savePropositionsClinique}
          SaveVerfieReponsesClinique={props.SaveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={props.SaveQcmIsAnswerClinique}
          TrueFullInsertClrClinique={props.TrueFullInsertClrClinique}
          SavePercentageCliniqueAmount={props.SavePercentageCliniqueAmount}
          SaveClickSelectVerfieAllClinique={
            props.SaveClickSelectVerfieAllClinique
          }
          SavePercentageAmount={SavePercentageAmount}
          test={true}
          qcmAndCliniqueTimer={true}
          watchValues={[
            {
              hours:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[0].hours
                  : hours,
            },
            {
              minutes:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[1].minutes
                  : minutes,
            },
            {
              seconds:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[2].seconds
                  : seconds,
            },
          ]}
          commingFrom={props.commingFrom}
          //Qcms State*****************************************************
          SaveCorrectAnswer={SaveCorrectAnswer}
          SaveIsClickedCounter={SaveIsClickedCounter}
          savePieStatique={savePieStatique}
          SaveQcmsCourNameStatique={SaveQcmsCourNameStatique}
          SaveEachLineStatique={SaveEachLineStatique}
          nbrAllQclStatique={ShowQcm.length}
          dounateDataQcms={dounateData}
          //**********************************************************************
          //clinique State********************************************************
          SaveCorrectAnswerClinique={props.SaveCorrectAnswerClinique}
          SaveIsClickedCounterClinique={props.SaveIsClickedCounterClinique}
          savePieStatiqueClinique={props.savePieStatiqueClinique}
          SaveEachLineStatiqueClinique={props.SaveEachLineStatiqueClinique}
        />
      )}
      {ShowModelActionsPhone && isTabletOrMobile && (
        <div className={classes.full_save_qcm_phone}>
          {showSaveSessionQcmBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleSaveQcmQuizz(sourceBtnSaveSession);
              }}
            >
              Fin Session
            </button>
          )}
          {showUpdateSessionQcmBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateQcmQuizzFilter();
              }}
            >
              Save Modification
            </button>
          )}
          {showSaveQcmBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                setModalSaveQuizzIsOpen(true);
                setShowModelActionsPhone(false);
              }}
            >
              Sauvegarder Qcm
            </button>
          )}
          {showUpdateQcmBtn && (
            <button
              type="button"
              style={{ marginBottom: 8, width: 200 }}
              className="btn btn-primary"
              onClick={() => {
                handleUpdateQcmQuizzFilter();
              }}
            >
              Save modification
            </button>
          )}
          <button
            type="button"
            style={{ marginTop: 5 }}
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
      <Toaster />
    </>
  );
}
export default QuizBoard;
