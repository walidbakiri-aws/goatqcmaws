import { useEffect, useState, useRef } from "react";
import BtnAdd from "../compenent/layout/BtnAdd";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./Quiz.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import { FcPrevious } from "react-icons/fc";
import useLocalStorage from "use-local-storage";
function Quiz() {
  const [visibleCommenceBtn,setVisibleCommenceBtn]= useState(false);
  const [module, setModule] = useState([]);
  const radioRefs = useRef([]);
  const checkBoxAllCoursRefs = useRef([]);
  const [isChecked, setIsChecked] = useState(false);
  const refreshPage = useSignal(0);
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");
  let nameModule = useSignal("");
  let SelectedAllCours = useSignal("");
  const [CheckAllCours, setCheckAllCours] = useState(false);
  const [ShowQcmType, setShowQcmType] = useState(false);
  const [ShowSideBare, setShowSideBare] = useState(false);
  const typeQcmCasClinique = ["Qcm", "Cas Clinique", "Tous (Qcm,Cas Clinique)"];
  const TypeSujets = ["Par Cour", "Par Sujet"];
  const sourceExamn = ["Externat Blida", "Résidanat Blida"];
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
  const [selectAllCours, setSelectAllCours] = useState("");
  const QcmTypeSelected = useSignal("");
  const [QcmTypeSelectedCommenceBtn, setQcmTypeSelectedCommenceBtn] =
    useState("");
  const [QcmTypeSelectedRsdntExetrnt, setQcmTypeSelectedRsdntExetrnt] =
    useState("");
  const QcmSujetTypeSelected = useSignal("");
  const [QcmTypeParSjtParCours, setQcmTypeParSjtParCours] = useState("");
  const SelectedModule = useSignal(null);
  const [ModuleIdCommencerBtn, setModuleIdCommencerBtn] = useState("");

  const [SelectedCoursCommencerBtn, setSelectedCoursCommencerBtn] =
    useState("");
  //***********multiple cours********************************** */
  const [selectMultipleCours, setSelectMultipleCours] = useState([]);
  const [SelectedCours, setSelectedCours] = useState([]);
  const [selectMultipleCoursClinique, setSelectMultipleCoursClinique] =
    useState([]);
  const isMultipleCours = useSignal(false);
  let [minYearMultipleCours, setMinYearMultipleCours] = useState([]);
  let [maxYearMultipleCours, setMaxYearMultipleCours] = useState([]);
  let [minYearMultipleCoursClinique, setMinYearMultipleCoursClinique] =
    useState([]);
  let [maxYearMultipleCoursClinique, setMaxYearMultipleCoursClinique] =
    useState([]);
  //************************************************************** */
  const SelectedSourceExmn = useSignal("");
  let navigateBoardQuiz = useNavigate();
  const [MinMaxYearFinal, setMinMaxYearFinal] = useState([]);
  let minYearSaved = [];
  let minMaxYear = useSignal({});

  let minMaxYearParSujets = useSignal({});
  let minMaxYearParSujetsFinal = useSignal([]);
  const [MinYearValue, setMinYearValue] = useState("");
  const [MaxYearValue, setMaxYearValue] = useState("");
  const [VisibleQcmType, setVisibleQcmType] = useState(true);
  const [VisibleParCourDiv, setVisibleParCourDiv] = useState(true);
  const [VisibleMinMaxYear, setVisibleMinMaxYear] = useState(true);
  const [ShowSelectAllCoursDiv, setShowSelectAllCoursDiv] = useState(false);
  let QuizQcmQclinique = useSignal(false);
  let goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt = useSignal(true);
  let backFromCliniqueAllQcmCliniqueprSujet = useSignal(false);
  const [nextBtn, setNextBtn] = useState(true);
  const [prevBtn, setPrevBtn] = useState(false);
  const [showModuleDiv, setShowModuleDiv] = useState(true);
  const [showCoursDiv, setShowCoursDiv] = useState(false);
  const [userFinal, setUserFinal] = useState({});
  const ModuleNameSelected = useSignal("");
  const moduleName = useSignal("");
  const [AllCours, SetAllcours] = useState([]);
  const [CheckBiologieOrCliniqueParSjt, setCheckBiologieOrCliniqueParSjt] =
    useState("");
  let findMinYear = useSignal(false);
  let findMaxYear = useSignal(false);
  let findMinYearClinique = useSignal(false);
  const [ExisteCasClinique, setExisteCasClinique] = useState(false);
  let ExisteQcmInTous = useSignal(false);
  //********get All Modules ************************************************* */
  const [AllModules, setAllModules] = useState([]);
  //**************************liste cour data */***************
  useEffect(() => {
    localStorage.setItem("checkcascliniqueexiste", "false");
    if (window.localStorage) {
      if (!localStorage.getItem("reload")) {
        localStorage["reload"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("reload");
      }
    }
    console.log(username);
  }, [refreshPage.value]);
  //**************get user**************************************** */
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  //******parCours ParSujet**************************************************************/
  const handleRadioTypeSujet = (e) => {
    localStorage.setItem("DoneClinqueShow", false);
    localStorage.setItem("passQcmCasClinique", false);

    localStorage.setItem("IsCkickShowAllReponsesClinique", false);

    console.log(
      JSON.parse(localStorage.getItem("IsCkickShowAllReponsesClinique")) ===
        true
    );

    QcmSujetTypeSelected.value = e.target.value;
    setQcmTypeParSjtParCours(e.target.value);
    SetAllcours([]);
    if (QcmSujetTypeSelected.value === "Par Cour") {
      setVisibleMinMaxYear(true);
      setVisibleQcmType(true);
      setVisibleParCourDiv(true);
    }
    if (QcmSujetTypeSelected.value === "Par Sujet") {
      setVisibleMinMaxYear(false);
      setVisibleQcmType(false);
      //setVisibleParCourDiv(false);
    }
  };
  //**********************************************************************
  /****externat residanat blida**************************************************** */
  const handleRadioSourceExamn = (e) => {
    SelectedSourceExmn.value = e.target.value;
    //QcmTypeSelected.value = e.target.value;
    setQcmTypeSelectedRsdntExetrnt(e.target.value);
    getUser();

    // loadMinMaxYearParSujet();

    if (SelectedSourceExmn.value === "Résidanat Blida") {
      if (QcmSujetTypeSelected.value === "Par Sujet") {
        setVisibleQcmType(false);
        setVisibleMinMaxYear(false);
      } else if (QcmSujetTypeSelected.value === "Par Cour") {
        setVisibleQcmType(true);
        setVisibleMinMaxYear(true);
      }
    } else if (SelectedSourceExmn.value === "Externat Blida") {
      if (QcmSujetTypeSelected.value === "Par Cour") {
        setVisibleQcmType(true);
        setVisibleMinMaxYear(true);
      } else if (QcmSujetTypeSelected.value === "Par Sujet") {
        setVisibleQcmType(false);
        setVisibleMinMaxYear(false);
      }
    }
  };
  //******************************************************************* */
  //*******handle Change Module**********************************************
  const handleChangeModule = (e) => {
    setModule({ ...module, existCasclinique: true });
    /****type qcm  iniialisation************** */
    radioRefs.current.forEach((radio) => {
      if (radio) radio.checked = false;
    });
    setSelectMultipleCours("");
    try {
      document.getElementById("flexRadioAllCours").checked = false;
    } catch (Exception) {
      console.log("sdsd");
    }

    /****************************************** */
    setSelectMultipleCours([]); //initialiszer for check each time change module
    setMinMaxYearFinal([]);
    setMaxYearValue("");
    SelectedModule.value = e.target.value;
    setModuleIdCommencerBtn(e.target.value);
    console.log(SelectedModule.value);
    getModuleName(SelectedModule.value);
    if (SelectedModule.value < 18) {
      setCheckBiologieOrCliniqueParSjt("BiologieParSujet");
    } else if (SelectedModule.value >= 18) {
      setCheckBiologieOrCliniqueParSjt("CliniqueParSujet");
    }

    if (QcmTypeParSjtParCours === "Par Sujet") {
      console.log(QcmSujetTypeSelected.value);
      QcmTypeSelected.value = "Tous (Qcm,Cas Clinique)";
      loadMinMaxYears();
      loadMinMaxYearParSujet();
      console.log(QcmTypeSelected.value);
      setVisibleMinMaxYear(false);
      setVisibleQcmType(false);
      // loadCoursOfModule();
    }
    /*if (SelectedSourceExmn.value === "Résidanat Blida") {
      QcmTypeSelected.value = "Tous (Qcm,Cas Clinique)";
    }*/
    setMinYearValue([""]);
    setMaxYearValue([""]);

    setPrevBtn(true);

    setShowModuleDiv(false);
    setShowCoursDiv(true);
    loadCoursOfModule();
    setShowSelectAllCoursDiv(true);
  };
  //****************************************************************************/
  //*******handle Change Cours************************************************
  const handleChangeCours = async (e) => {
    setSelectedCoursCommencerBtn(e.target.value);
    document.getElementById("Qcm").checked = false;
    document.getElementById("Cas Clinique").checked = false;
    document.getElementById("Tous (Qcm,Cas Clinique)").checked = false;

    setMinMaxYearFinal([""]);

    const value = e.target.value;
    //****get single cour****************************************************** */
    if (e.target.checked) {
      setSelectedCours([...SelectedCours, value]);
    } else {
      setSelectedCours(SelectedCours.filter((cour) => cour !== value));
    }

    //************************************************************************ */
    if (e.target.checked) {
      try {
        setSelectMultipleCours([...selectMultipleCours, value]);

        //**************get min max multiople cours */
        const result = await axios.get(
          `https://goatqcm-instance.com/qcms/get_minmax_year/${value}/${QcmTypeSelectedRsdntExetrnt}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMinYearMultipleCours((minYear) => [...minYear, result.data[0]]);

        setMaxYearMultipleCours((maxYear) => [...maxYear, result.data[1]]);
      } catch (Exception) {
        console.log("no year of this qcm");
      }
      try {
        setSelectMultipleCoursClinique([...selectMultipleCoursClinique, value]);

        //**************get min max multiople cours */
        const resultClinique = await axios.get(
          `https://goatqcm-instance.com/casclinique/get_minmax_year/${value}/${QcmTypeSelectedRsdntExetrnt}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMinYearMultipleCoursClinique((minYear) => [
          ...minYear,
          resultClinique.data[0],
        ]);

        setMaxYearMultipleCoursClinique((maxYear) => [
          ...maxYear,
          resultClinique.data[1],
        ]);
      } catch (Exception) {
        console.log("no year of this casClinique");
      }

      //********************************************** */
    } else {
      //************delete year of qcm*********************************************************** */

      try {
        setSelectMultipleCours(
          selectMultipleCours.filter((cour) => cour !== value)
        );

        console.log(SelectedSourceExmn.value);
        //**************get min max multiople cours */
        const result = await axios.get(
          `https://goatqcm-instance.com/qcms/get_minmax_year/${value}/${QcmTypeSelectedRsdntExetrnt}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(result.data[0]);
        console.log(result.data[1]);
        findMinYear.value = false;

        while (findMinYear.value === false) {
          for (let i = 0; i < minYearMultipleCours.length; i++) {
            if (minYearMultipleCours[i] === result.data[0]) {
              console.log("existe");
              minYearMultipleCours.splice(i, 1);
              maxYearMultipleCours.splice(i, 1);
              findMinYear.value = true;
            }
          }
        }
      } catch (Exception) {
        console.log("qcm has no year to delete");
      }
      //*****************end delete year of deselect qcm**************************************************/
      //************delete year of casClinique*********************************************************** */
      try {
        setSelectMultipleCoursClinique(
          selectMultipleCoursClinique.filter((cour) => cour !== value)
        );
        console.log(SelectedSourceExmn.value);
        //**************get min max multiople cours */
        const resultClinique = await axios.get(
          `https://goatqcm-instance.com/casclinique/get_minmax_year/${value}/${QcmTypeSelectedRsdntExetrnt}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(resultClinique.data[0]);
        console.log(resultClinique.data[1]);
        findMinYearClinique.value = false;

        while (findMinYearClinique.value === false) {
          for (let i = 0; i < minYearMultipleCoursClinique.length; i++) {
            if (minYearMultipleCoursClinique[i] === resultClinique.data[0]) {
              console.log("existe");
              minYearMultipleCoursClinique.splice(i, 1);
              maxYearMultipleCoursClinique.splice(i, 1);
              findMinYearClinique.value = true;
            }
          }
        }
      } catch (Exception) {
        console.log("qcm has no year to delete");
      }
      //*****************end delete year of deselect casClinique****************************/
    }
  };
  //****************************************************************************/
  //*******handle handleChangeCours************************************************
  const handleSelectAllCours = async (e) => {
    setVisibleMinMaxYear(false);
    console.log(AllCours.length);
    //****get single cour****************************************************** */
    if (e.target.checked) {
      setSelectMultipleCours([
        ...SelectedCours,
        ...AllCours.map((course) => course.id),
      ]);
      checkBoxAllCoursRefs.current.forEach((radio) => {
        if (radio) radio.checked = true;
      });

      //**************get min max multiople cours */

      if (SelectedSourceExmn.value === "Résidanat Blida") {
        setMinYearMultipleCours((minYear) => [...minYear, "2015"]);

        setMaxYearMultipleCours((maxYear) => [...maxYear, "2025"]);
      } else if (SelectedSourceExmn.value === "Externat Blida") {
        setMinYearMultipleCours((minYear) => [...minYear, "2017"]);

        setMaxYearMultipleCours((maxYear) => [...maxYear, "2025"]);
      }

      //**************get min max multiople cours */
      let indexCour = 0;
      let isFind = false;
      while (indexCour < AllCours.length && isFind === false) {
        try {
          const resultClinique = await axios.get(
            `https://goatqcm-instance.com/casclinique/get_minmax_year/${AllCours[indexCour].id}/${QcmTypeSelectedRsdntExetrnt}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (SelectedSourceExmn.value === "Résidanat Blida") {
            setMinYearMultipleCoursClinique((minYear) => [...minYear, "2015"]);

            setMaxYearMultipleCoursClinique((maxYear) => [...maxYear, "2025"]);
          } else if (SelectedSourceExmn.value === "Externat Blida") {
            setMinYearMultipleCoursClinique((minYear) => [...minYear, "2017"]);

            setMaxYearMultipleCoursClinique((maxYear) => [...maxYear, "2025"]);
          }
          if (resultClinique.data.length > 0) {
            setVisibleMinMaxYear(true);
            if (SelectedSourceExmn.value === "Résidanat Blida") {
              setMinYearMultipleCoursClinique((minYear) => [
                ...minYear,
                "2015",
              ]);

              setMaxYearMultipleCoursClinique((maxYear) => [
                ...maxYear,
                "2025",
              ]);
            } else if (SelectedSourceExmn.value === "Externat Blida") {
              setMinYearMultipleCoursClinique((minYear) => [
                ...minYear,
                "2017",
              ]);

              setMaxYearMultipleCoursClinique((maxYear) => [
                ...maxYear,
                "2025",
              ]);
            }
            isFind = true;
            setVisibleMinMaxYear(true);
          }
        } catch (Exception) {
          console.log("no year of this casClinique");
        }

        indexCour++;
        if (indexCour === AllCours.length) {
          setVisibleMinMaxYear(true);
        }
      }
    } else {
      setSelectMultipleCours("");
      checkBoxAllCoursRefs.current.forEach((radio) => {
        if (radio) radio.checked = false;
      });
      setExisteCasClinique(false);
    }
    console.log(maxYearMultipleCoursClinique);
    if (maxYearMultipleCoursClinique.length > 0) {
      setExisteCasClinique(true);
    }
    //************************************************************************ */
  };
  //****************************************************************************** */
  //*******qcm casclinique toutes************************************************
  const handleRadioQcmType = (e) => {
    console.log(SelectedCoursCommencerBtn);
    QcmTypeSelected.value = e.target.value;
    setQcmTypeSelectedCommenceBtn(e.target.value);
    console.log(QcmTypeSelected.value);
    // loadMinMaxYearParSujet();

    if (QcmSujetTypeSelected.value === "Par Cour") {
      if (QcmTypeSelected.value !== "Tous (Qcm,Cas Clinique)") {
        console.log(QcmTypeSelected.value);
        loadMinMaxYears();
    
        setVisibleMinMaxYear(true);
      } else if (QcmTypeSelected.value === "Tous (Qcm,Cas Clinique)") {
        loadMinMaxYears();

        setVisibleMinMaxYear(false);
      }
    } else if (QcmSujetTypeSelected.value === "Par Sujet") {
      if (QcmTypeSelected.value !== "Tous (Qcm,Cas Clinique)") {
        console.log(QcmTypeSelected.value);
        loadMinMaxYears();

        loadMinMaxYearParSujet();
      } else {
        setVisibleMinMaxYear(false);
      }
      if (QcmTypeSelected.value === "Tous (Qcm,Cas Clinique)") {
        console.log(QcmTypeSelected.value);
        loadMinMaxYears();
        loadMinMaxYearParSujet();
      } else {
        setVisibleMinMaxYear(false);
      }
    }
  };
  //*************************************************************************** */
  //*****get user********************************************************** */
  const getUser = async () => {
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      console.log(resultUserFinal);

      if (resultUserFinal.role === "ADMIN") {
        loadAllModules();
      } else {
        checkUserAbn(resultUserFinal);
        console.log("not admin");
      }
    } catch (error) {
      console.log("Error fetching profile information", error);
    }
  };
  //********************************************************************* */
  //****get user with abounement****************************** */
  const checkUserAbn = async (getresultUserFinal) => {
    console.log(getresultUserFinal.id);
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${getresultUserFinal.id}`
      );
      nameModule.value = result.data.nameAbn;
      if (nameModule.value === "Résidanat 2024") {
        loadAllModules();
      }
      if (nameModule.value === "Résidanat 2025") {
        loadAllModules();
      } else {
        loadSpefecModulesYear(nameModule.value);
      }
    } catch (Excpetion) {
      console.log("no abonner found");
    }
  };

  //************************************************************** */
  //load les modules de selction options*************************************
  const loadSpefecModulesYear = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/medmodule/year/${nameModule.value}`
    );
    setAllModules(result.data);
  };
  //*********************************************************************** */

  //**load module pour affhier fe select********************************
  const loadAllModules = async () => {
    setAllModules([]);
    SetAllcours([]);
    const result = await axios.get(
      "https://goatqcm-instance.com/medmodule/getall/module",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAllModules(result.data);
  };
  //********************************************************************** */
  //load all cours pour afficher de selection module *************************

  const loadCoursOfModule = async () => {
    if (SelectedSourceExmn.value === "Externat Blida") {
      const result = await axios.get(
        `https://goatqcm-instance.com/module/${SelectedModule}/cours`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetAllcours(result.data);
      console.log("externat abn");
    } else if (SelectedSourceExmn.value === "Résidanat Blida") {
      const result = await axios.get(
        `https://goatqcm-instance.com/module/${SelectedModule}/cours/Résidanat Blida`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetAllcours(result.data);
      console.log("rsdnt abn");
    }

    console.log(SelectedModule.value);
  };
  //************************************************************************* */

  //**********************get module name************************************** */
  const getModuleName = async (moduleId) => {
    const result = await axios.get(`https://goatqcm-instance.com/module/${moduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    moduleName.value = result.data.moduleName;
  };

  //************************************************************************** */

  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************************* */

  //************************************************************************* */
  function handelShowTypeQcm() {
    setShowQcmType(!ShowQcmType);
  }
  //************************************************************************** */

  //****load min max par sujet************************************************* */
  const loadMinMaxYearParSujet = async () => {
    console.log(QcmTypeSelected.value);
    if (QcmTypeSelected.value === "Qcm") {
      console.log(SelectedSourceExmn.value);
      try {
        const result = await axios.get(
          `https://goatqcm-instance.com/qcms/get_minmax_year/parsujet/${SelectedModule.value}/${SelectedSourceExmn.value}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        minMaxYearParSujets.value = result.data;
        console.log(minMaxYearParSujets.value);
      } catch {
        console.log("module not selected");
      }
    } else if (QcmTypeSelected.value === "Cas Clinique") {
      try {
        const result = await axios.get(
          `https://goatqcm-instance.com/casclinique/get_minmax_year/parsujet/${SelectedModule.value}/${SelectedSourceExmn.value}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        minMaxYearParSujets.value = result.data;
        console.log(minMaxYearParSujets.value);
      } catch {
        console.log("module not selected");
      }
    } else if ((QcmTypeSelected.value = "Tous (Qcm,Cas Clinique)")) {
      console.log("walidd");
      try {
        const result = await axios.get(
          `https://goatqcm-instance.com/qcms/get_minmax_year/parsujet/${SelectedModule.value}/${SelectedSourceExmn.value}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        minMaxYearParSujets.value = result.data;
        console.log(minMaxYearParSujets.value);
        if (minMaxYearParSujets.value.length > 0) {
          setExisteCasClinique(true);
        } else if (minMaxYearParSujets.value.length === 0) {
          setExisteCasClinique(false);
        }
      } catch {
        console.log("module not selected");
      }
    }
    let maxIndex = 0;
    //**get max fin indice********************* */
    for (let i = 0; i < years.length; i++) {
      if (years[i] === minMaxYearParSujets.value[1]) {
        maxIndex = i;
      }
    }
    //**************************************** */

    let incMin = 0;
    console.log(minMaxYearParSujets.value[0]);
    for (let i = 0; i < years.length; i++) {
      if (years[i] === minMaxYearParSujets.value[0]) {
        for (let inc = i; inc <= maxIndex; inc++) {
          minMaxYearParSujetsFinal.value[incMin] = years[inc];
          console.log();
          incMin++;
        }
      }
    }

    console.log(minMaxYearParSujetsFinal.value);
  };
  //*************************************************************************** */
  //**load Proposition***************************************************************
  const loadMinMaxYears = async () => {
    //***is select multiple cours ****************** */
    console.log("residanat we here");
    minMaxYear = [{}];
    if (selectMultipleCours.length > 1) {
      isMultipleCours.value = true;
    } else if (selectMultipleCours.length === 1) {
      isMultipleCours.value = false;
    }
    //*********************************************** */
    console.log(isMultipleCours.value);
    console.log(SelectedCoursCommencerBtn);

    if (isMultipleCours.value === true) {
      if (QcmTypeSelected.value === "Qcm") {
        try {
          console.log(minYearMultipleCours);
          console.log(maxYearMultipleCours);

          let MinMaxMultipleFinal = [];
          MinMaxMultipleFinal[0] = Math.min(...minYearMultipleCours).toString();
          MinMaxMultipleFinal[1] = Math.max(...maxYearMultipleCours).toString();

          minMaxYear = MinMaxMultipleFinal;
          console.log(minMaxYear);
        } catch {
          console.log("Cours not selected");
        }
      } else if (QcmTypeSelected.value === "Cas Clinique") {
        try {
          console.log(minYearMultipleCoursClinique);
          console.log(maxYearMultipleCoursClinique);

          let MinMaxMultipleFinalClinique = [];
          MinMaxMultipleFinalClinique[0] = Math.min(
            ...minYearMultipleCoursClinique
          ).toString();
          MinMaxMultipleFinalClinique[1] = Math.max(
            ...maxYearMultipleCoursClinique
          ).toString();

          minMaxYear = MinMaxMultipleFinalClinique;
          console.log(minMaxYear);
        } catch {
          console.log("Cours not selected");
        }
      } else if (QcmTypeSelected.value === "Tous (Qcm,Cas Clinique)") {
        console.log("we here");
        //****check if qcm existe************************************* */
        console.log(minYearMultipleCours);
        if (QcmSujetTypeSelected.value === "Par Cour") {
          if (minYearMultipleCours && minYearMultipleCours.length > 0) {
            ExisteQcmInTous.value = true;
          } else {
            QcmTypeSelected.value = "Cas Clinique";
            ExisteQcmInTous.value = false;
          }
        }
        //*********************************************************** */
        let minYear = [];
        let maxYear = [];

        minYear[0] = Math.min(...minYearMultipleCours).toString();
        minYear[1] = Math.min(...minYearMultipleCoursClinique).toString();

        maxYear[0] = Math.max(...maxYearMultipleCours).toString();
        maxYear[1] = Math.max(...maxYearMultipleCoursClinique).toString();
        console.log(minYear);
        console.log(maxYear);

        let MinMaxMultipleFinalClinique = [];
        MinMaxMultipleFinalClinique[0] = Math.min(...minYear).toString();
        MinMaxMultipleFinalClinique[1] = Math.max(...maxYear).toString();
        console.log(minYearMultipleCoursClinique);
        console.log(maxYearMultipleCoursClinique);

        minMaxYear = MinMaxMultipleFinalClinique;
        console.log(minMaxYear);
        if (maxYearMultipleCoursClinique.length > 0) {
          console.log(minYearMultipleCoursClinique.length);
          setExisteCasClinique(true);
          setVisibleCommenceBtn(true);
        } else if (maxYearMultipleCoursClinique.length === 0) {
          console.log(minYearMultipleCoursClinique.length);
          setExisteCasClinique(false);
          setVisibleCommenceBtn(true);
        }
        setMinYearValue(minMaxYear[0]);
        setMaxYearValue(minMaxYear[1]);
      }
    } else if (isMultipleCours.value === false) {
      console.log("we jst select one cour");
      if (QcmTypeSelected.value === "Qcm") {
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/qcms/get_minmax_year/${SelectedCours[0]}/${QcmTypeSelectedRsdntExetrnt}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          minMaxYear = result.data;
          console.log(minMaxYear);
        } catch {
          console.log("Cours not selected");
        }
      } else if (QcmTypeSelected.value === "Cas Clinique") {
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/casclinique/get_minmax_year/${SelectedCours[0]}/${QcmTypeSelectedRsdntExetrnt}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          minMaxYear = result.data;
          console.log(minMaxYear);
        } catch {
          console.log("Cours not selected");
        }
      } else if (QcmTypeSelected.value === "Tous (Qcm,Cas Clinique)") {
        console.log("we hereoooo");

        let minQcmYear = [];
        let minCliniqueYear = [];
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/qcms/get_minmax_year/${SelectedCours[0]}/${QcmTypeSelectedRsdntExetrnt}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          minQcmYear = result.data;
          console.log(result.data.length);
          if (QcmSujetTypeSelected.value === "Par Cour") {
            ExisteQcmInTous.value = true;
          }
          console.log(minMaxYear);
        } catch {
          if (QcmSujetTypeSelected.value === "Par Cour") {
            QcmTypeSelected.value = "Cas Clinique";
            ExisteQcmInTous.value = false;
          }
          console.log("Cours not selected");
        }
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/casclinique/get_minmax_year/${SelectedCours[0]}/${QcmTypeSelectedRsdntExetrnt}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          minCliniqueYear = result.data;
          console.log(minCliniqueYear);
        } catch {
          console.log("Cours not selected");
        }

        let minYear = [];
        let maxYear = [];

        minYear[0] = Math.min(...minQcmYear).toString();
        minYear[1] = Math.min(...minCliniqueYear).toString();

        maxYear[0] = Math.max(...minQcmYear).toString();
        maxYear[1] = Math.max(...minCliniqueYear).toString();
        console.log(minYear);
        console.log(maxYear);
        console.log(minCliniqueYear);
        if (minCliniqueYear.length > 0) {
          console.log(minCliniqueYear.length);
          setExisteCasClinique(true);
          setVisibleCommenceBtn(true);
        } else if (minCliniqueYear.length === 0) {
          console.log(minCliniqueYear.length);
          setExisteCasClinique(false);
          setVisibleCommenceBtn(true);
        }
        let MinMaxMultipleFinalClinique = [];
        MinMaxMultipleFinalClinique[0] = Math.min(...minYear).toString();
        MinMaxMultipleFinalClinique[1] = Math.max(...maxYear).toString();

        minMaxYear = MinMaxMultipleFinalClinique;
        console.log(minMaxYear);
        setMinYearValue(minMaxYear[0]);
        setMaxYearValue(minMaxYear[1]);
      }
    }

    //***************get min max of table year********************************** */
    let maxIndex = 0;
    console.log(minMaxYear);
    //**get max fin indice********************* */
    for (let i = 0; i < years.length; i++) {
      if (years[i] === minMaxYear[1]) {
        maxIndex = i;
      }
    }
    //**************************************** */

    let incMin = 0;
    console.log(minMaxYear[0]);
    for (let i = 0; i < years.length; i++) {
      if (years[i] === minMaxYear[0]) {
        for (let inc = i; inc <= maxIndex; inc++) {
          minYearSaved[incMin] = years[inc];
          console.log();
          incMin++;
        }
      }
    }
    console.log(minYearSaved);
    setMinMaxYearFinal(minYearSaved);
    //******end upload ***************************************************** */
  };
  //********************************************************************** */
  function minYearHandler(event) {
    setMinYearValue(event.target.value);
    console.log(MaxYearValue);
  }
  function maxYearHandler(event) {
    setMaxYearValue(event.target.value);
    console.log(MinYearValue);
  }
  //******************************************************************* */ */
  //**********************************************************************
  function handelCommencerBnt() {
    //<QuizFilter courId={SelectedCours.value} qcmType={QcmTypeSelected.value} />;
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        ExisteCasClinique: ExisteCasClinique,
        selectMultipleCours: selectMultipleCours,
        moduleName: moduleName.value,
        courId: SelectedCours[0],
        checkParSjtBiologieClinique: CheckBiologieOrCliniqueParSjt,
        qcmType: ExisteCasClinique ? QcmTypeSelected.value : "Qcm",
        QcmSujetTypeSelected: QcmTypeParSjtParCours,
        SelectedSourceExmn: QcmTypeSelectedRsdntExetrnt,
        minYearQcm: MinYearValue,
        maxYearQcm: MaxYearValue,
        moduleId: ModuleIdCommencerBtn,
        minMaxYearParSujetsFinal: minMaxYearParSujetsFinal.value,
        QuizQcmQclinique: QuizQcmQclinique,

        goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt:
          goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt.value,
        backFromCliniqueAllQcmCliniqueprSujet:
          backFromCliniqueAllQcmCliniqueprSujet.value,
        commingFrom: "quizz",
      },
    });
  }
  //******************************************************************* */ */()
  function handleNextBtn() {
    setPrevBtn(true);
    setNextBtn(false);
    setShowModuleDiv(false);
    setShowCoursDiv(true);
  }
  function hanlePrevBtn() {
    setNextBtn(true);
    setPrevBtn(false);
    setShowModuleDiv(true);
    setShowCoursDiv(false);
  }

  const handleShowCours = () => {
    console.log(ExisteQcmInTous.value);
    console.log(ExisteCasClinique);
    console.log(minYearMultipleCours);
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
            <button onClick={handleShowCours}>test</button>
            <div className={classes.allcards}>
              <div className={`${classes.qcmmodele} table-hover shadow`}>
                <div
                  className={classes.cadrheader}
                  style={{ background: "#9370db " }}
                >
                  Type d'examens
                </div>
                <div
                  className={`${classes.typesujetsourcesexamn_full}  card-body`}
                >
                  <div className={classes.typesujetsourcesexamn}>
                    <div className={classes.childtypesujetsourcesexamn}>
                      {TypeSujets.map((typeSujet, index) => (
                        <div key={index} className={classes.typesujet}>
                          <input
                            key={index}
                            className="form-check-input fs-6 "
                            type="radio"
                            name="typesujet"
                            value={typeSujet}
                            id="typesujetsqcmcasclinique"
                            onChange={handleRadioTypeSujet}
                          />

                          <h6 className={`${classes.typesujeth6}`}>
                            {typeSujet}
                          </h6>
                        </div>
                      ))}
                    </div>

                    <div className={classes.childtypesujetsourcesexamn}>
                      {sourceExamn.map((sourceExamen, index) => (
                        <div key={index} className={classes.typesujet}>
                          <input
                            key={index}
                            className="form-check-input fs-6 "
                            type="radio"
                            name="sourceExamen"
                            value={sourceExamen}
                            id="sourcesujetsqcmcasclinique"
                            onChange={handleRadioSourceExamn}
                          />
                          <h6 className={`${classes.typesujeth6}`}>
                            {sourceExamen}
                          </h6>
                        </div>
                      ))}
                    </div>
                    <div className={classes.vl}></div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.modulecoursdiv} table-hover shadow `}
                style={{ border: "1px solid #A0A0A0", width: "90%" }}
              >
                <div
                  className={classes.cadrheader}
                  style={{ background: "#9370db " }}
                >
                  Modules
                </div>
                <div className={`${classes.modulecours_full}  card-body`}>
                  <div className={classes.childmodulecoursdiv}>
                    <div className={"form-check"}>
                      {AllModules.map((module, index) => (
                        <div key={index} className={classes.moduleitem}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id={module.moduleName}
                            value={module.id}
                            onChange={handleChangeModule}
                          ></input>
                          <h6
                            className={`${classes.typesujeth6} form-check-label `}
                          >
                            {module.moduleName}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.childmodulecoursdiv}>
                    {VisibleParCourDiv && (
                      <>
                        <div className="form-check">
                          <div className={classes.moduleitem}>
                            <input
                              className="form-check-input fs-6 "
                              type="checkbox"
                              id="flexRadioAllCours"
                              name="flexRadioAllCours"
                              onChange={handleSelectAllCours}
                            />

                            <h6
                              className={`${classes.typesujeth6} form-check-label `}
                            >
                              Sélectionner Tous
                            </h6>
                          </div>
                        </div>
                        <div className="form-check">
                          {AllCours.map((cour, index) => (
                            <div key={cour.id} className={classes.moduleitem}>
                              <input
                                className="form-check-input fs-6 "
                                type="checkbox"
                                name="flexRadioDefaultCours"
                                ref={(el) =>
                                  (checkBoxAllCoursRefs.current[index] = el)
                                }
                                id={cour.coursName}
                                value={cour.id}
                                onChange={handleChangeCours}
                              />

                              <h6
                                className={`${classes.typesujeth6} form-check-label `}
                              >
                                {cour.coursName}
                              </h6>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={classes.vlmodule}></div>
                </div>
              </div>
              <div
                className={`${classes.qcmtype} table-hover shadow`}
                style={{ border: "1px solid #A0A0A0" }}
              >
                {VisibleQcmType && (
                  <div>
                    <div
                      className={classes.cadrheader}
                      style={{ background: "#9370db " }}
                    >
                      Type (Qcm,Cas Clinique)
                    </div>

                    <div className={`${classes.qcmtypecontent} card-body `}>
                      {typeQcmCasClinique.map((typeQcm, index) => (
                        <div key={index} className={classes.typeqcm}>
                          <input
                            className="form-check-input fs-6 "
                            type="radio"
                            name="typeqcm"
                            ref={(el) => (radioRefs.current[index] = el)}
                            value={typeQcm}
                            id={typeQcm}
                            onChange={handleRadioQcmType}
                          />
                          <h6 className={`${classes.typeqcmlabel} `}>
                            {typeQcm}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {VisibleMinMaxYear && (
                <div
                  className={`${classes.yearSelectCard} table-hover shadow`}
                  style={{ border: "1px solid #A0A0A0" }}
                >
                  <div
                    className={classes.cadrheader}
                    style={{ background: "#9370db " }}
                  >
                    Year Qcm
                  </div>
                  <div className={` card-body`}>
                    <div className={`${classes.yearSelectBody}`}>
                      <select
                        style={{ width: 160 }}
                        className={`form-select`}
                        id="yearselect"
                        aria-label="Default select example"
                        onChange={minYearHandler}
                        value={MinYearValue}
                      >
                        <option value="" disabled="disabled">
                          Select Min Year
                        </option>
                        {MinMaxYearFinal.map((minyear, index) => (
                          <option key={index}>{minyear}</option>
                        ))}
                      </select>
                      <select
                        style={{ width: 160 }}
                        className={` form-select`}
                        id="yearselect"
                        aria-label="Default select example"
                        onChange={maxYearHandler}
                        value={MaxYearValue}
                      >
                        <option value="" disabled="disabled">
                          Select Max Year
                        </option>
                        {MinMaxYearFinal.map((minyear, index) => (
                          <option key={index}>{minyear}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
             {visibleCommenceBtn &&<div className={classes.btnCommencer}>
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{
                    width: 120,
                    float: "right",
                  }}
                  onClick={handelCommencerBnt}
                >
                  Commencer
                </button>
              </div>}
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.contanerspacephone}>
            <div className={classes.allcardsphone}>
              <div
                className={`${classes.qcmmodelephone} card text-white bg-light mb-3`}
                style={{ border: "1px solid #A0A0A0" }}
              >
                <div className="card-header" style={{ background: "#9370db " }}>
                  Type d'examens
                </div>
                <div
                  className={`${classes.typesujetsourcesexamnphone} card-body`}
                >
                  <div className={classes.childtypesujetsourcesexamnphone}>
                    {TypeSujets.map((typeSujet, index) => (
                      <div key={index} className={classes.typesujet}>
                        <input
                          key={index}
                          className="form-check-input fs-6 "
                          type="radio"
                          name="typesujet"
                          value={typeSujet}
                          id="typesujetsqcmcasclinique"
                          onChange={handleRadioTypeSujet}
                        />
                        <label className="form-check-label fs-6 ">
                          {typeSujet}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className={classes.childtypesujetsourcesexamnphone}>
                    {sourceExamn.map((sourceExamen, index) => (
                      <div key={index} className={classes.typesujet}>
                        <input
                          key={index}
                          className="form-check-input fs-6 "
                          type="radio"
                          name="sourceExamen"
                          value={sourceExamen}
                          id="typesujetsqcmcasclinique"
                          onChange={handleRadioSourceExamn}
                        />
                        <label className="form-check-label fs-6 ">
                          {sourceExamen}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`${classes.modulecoursdivphone} card text-white bg-light mb-3 `}
              >
                <div
                  className={`card-header `}
                  style={{ background: "#9370db " }}
                >
                  Modules
                </div>

                <div className="card-body">
                  <div className={classes.nextprevbtn}>
                    {prevBtn && (
                      <i onClick={hanlePrevBtn} className={classes.prevbtn}>
                        <FcPrevious />
                      </i>
                    )}
                    <h6>{ModuleNameSelected.value}</h6>
                  </div>
                  {showModuleDiv && (
                    <div className={classes.childmodulecoursdivphone}>
                      <div className={"form-check"}>
                        {AllModules.map((module, index) => (
                          <div key={index} className={classes.moduleitem_phone}>
                            <input
                              className="form-check-input"
                              type="radio"
                              id="modulenameid"
                              value={module.id}
                              onChange={handleChangeModule}
                              onClick={(e) => {
                                ModuleNameSelected.value = module.moduleName;
                              }}
                            ></input>

                            <label className="form-check-label fs-6  ">
                              {module.moduleName}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {showCoursDiv && (
                    <div className={classes.childmodulecoursdivphone}>
                      {VisibleParCourDiv && (
                        <>
                          <div className="form-check">
                            <div className={classes.moduleitem_phone}>
                              <input
                                className="form-check-input fs-6 "
                                type="checkbox"
                                id="flexRadioAllCours"
                                name="flexRadioDefaultCours"
                                onChange={handleSelectAllCours}
                              />
                              <label className="form-check-label fs-6 ">
                                Selecionner Tous
                              </label>
                            </div>
                          </div>
                          <div className="form-check">
                            {AllCours.map((cour, index) => (
                              <div
                                key={cour.id}
                                className={classes.moduleitem_phone}
                              >
                                <input
                                  className="form-check-input fs-6 "
                                  type="checkbox"
                                  name="flexRadioDefaultCours"
                                  ref={(el) =>
                                    (checkBoxAllCoursRefs.current[index] = el)
                                  }
                                  id={cour.coursName}
                                  value={cour.id}
                                  onChange={handleChangeCours}
                                />
                                <label className="form-check-label fs-6 ">
                                  {cour.coursName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${classes.qcmtype_phone} card text-white mb-3 `}
                style={{ border: "1px solid #A0A0A0" }}
              >
                {VisibleQcmType && (
                  <div>
                    <div
                      className="card-header text-white"
                      style={{ background: "#9370db" }}
                      onClick={handelShowTypeQcm}
                    >
                      Type (Qcm,Cas Clinique)
                    </div>

                    <div
                      className={`${classes.qcmtypecontent_phone} card-body `}
                    >
                      {typeQcmCasClinique.map((typeQcm, index) => (
                        <div key={index} className={classes.typeqcm_phone}>
                          <input
                            className="form-check-input fs-6 "
                            type="radio"
                            name="typeqcm"
                            value={typeQcm}
                            id={typeQcm}
                            onChange={handleRadioQcmType}
                          />
                          <label className="form-check-label fs-6 ">
                            {typeQcm}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {VisibleMinMaxYear && (
                <div
                  className={`${classes.yearSelectCardphone} card text-white bg-light mb-3`}
                  style={{ border: "1px solid #A0A0A0" }}
                >
                  <div
                    className="card-header"
                    style={{ background: "#9370db " }}
                  >
                    Year Qcm
                  </div>
                  <div className={` card-body`}>
                    <div className={`${classes.yearSelectBodyphone}`}>
                      <select
                        style={{ width: 160 }}
                        className={`form-select`}
                        id="yearselect"
                        aria-label="Default select example"
                        onChange={minYearHandler}
                        value={MinYearValue}
                      >
                        <option value="" disabled="disabled">
                          Select Min Year
                        </option>
                        {MinMaxYearFinal.map((minyear, index) => (
                          <option key={index}>{minyear}</option>
                        ))}
                      </select>
                      <select
                        style={{ width: 160 }}
                        className={` form-select`}
                        id="yearselect"
                        aria-label="Default select example"
                        onChange={maxYearHandler}
                        value={MaxYearValue}
                      >
                        <option value="" disabled="disabled">
                          Select Max Year
                        </option>
                        {MinMaxYearFinal.map((minyear, index) => (
                          <option key={index}>{minyear}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
                {visibleCommenceBtn &&<div className={classes.btnCommencer}>
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{
                    width: 120,
                    position: "absolute",
                    right: 0,
                  }}
                  onClick={handelCommencerBnt}
                >
                  Commencer
                </button>
              </div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Quiz;
