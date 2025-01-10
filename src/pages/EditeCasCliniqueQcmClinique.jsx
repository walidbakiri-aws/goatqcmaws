import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./EditeCasCliniqueQcmClinique.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditeCasCliniqueQcmClinique(props) {
  const token = localStorage.getItem("tokengoat");

  //---------QcmClinique Variable-----------------------------------------------------------------------
  const resultGetLoadPropo = useSignal([]);
  const [LoadPropoEditFinal, setLoadPropoEditFinal] = useState({
    frstPropoEdite: "",
    scndPropoEdite: "",
    thirtheenPropoEdite: "",
    fourtheenPropoEdite: "",
    fifteenPropoEdite: "",
  });
  const [EditeNmbrPropo, setEditeNmbrPropo] = useState("");
  const [FirstPropoEdite, setFirstPropoEdite] = useState("");
  const [SecondePropoEdite, setSecondePropoEdite] = useState("");
  const [ThirdPropoEdite, setThirdPropoEdite] = useState("");
  const [FourthPropoEdite, setFourthPropoEdite] = useState("");
  const [FifthPropoEdite, setFifthPropoEdite] = useState("");

  const [Qcm, SetQcm] = useState({
    qcmCliniqueContent: "",
    qcmCliniqueExplication: "",
    casClinique: {},
  });

  //****************porposition variable************************************************
  const [Proposition, setProposition] = useState({
    propositionQcm: "",
    reponseBool: "",
    qcmStandard: {},
  });
  let navigateDeleteCasClinique = useNavigate();
  let CurrentPropo = "";
  let CurrentBoolReponse = false;
  let InputProposition = useSignal(["", "", "", "", ""]);

  let InputCheckBox = useSignal([false, false, false, false, false]);
  const NombrePropo = ["4 Proposition", "5 Proposition"];
  const { propositionQcm, reponseBool, qcmStandard: qcmStandard } = Proposition;
  let getLast = useSignal({});
  const NbrPropoSelect = useSignal("");
  let Nbrpropotion = "";
  const [ShowFifthPropo, setShowFifthPropo] = useState(true);
  const testIsEmptyCheckPropo = useSignal(true);
  const [VisibiliteGroupepPermut, setVisibiliteGroupepPermut] = useState(true);
  //****************************************************************** */
  //--------------------------------------------------------------------------------------------------------

  //----------Cas Clinique Variable----------------------------------------------------------
  const { state } = useLocation();
  const { qcmSource, qcmId, cours_id, casClinique_id } = state;
  let getLastCasClinique = useSignal({});

  let getYear = "";
  let getGroupe = "";
  const category = ["Externat Blida", "Résidanat Blida"];
  let getCategory = "";
  const groupes = [
    "Biologie",
    "G-01",
    "G-02",
    "G-03",
    "G-04",
    "G-05",
    "G-06",
    "p-01",
    "p-02",
    "p-03",
    "p-04",
    "p-05",
    "p-06",
    "Rattrapage",
  ];

  const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

  const [CasClinique, SetCasClinique] = useState({
    casCliniqueContent: "",
    casCliniqueGroupe: "",
    casCliniqueYear: "",
    category: "",
    qcmCliniqueModele: props.qcmModel,
    coursMed: {},
  });
  //-----------------------------------------------------------------------------------------------------------
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
  const [FullDescEdite, setFullDescEdite] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmStandard: {},
  });
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const qcmIddelete = useSignal("");
  //***get image from local distination and display it****** */
  const getFile = (e) => {
    setFile(e.target.files[0]);
    setFileDisplay(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */
  //***get image from local distination and display it****** */
  const getFileEdite = (e) => {
    setFileEdite(e.target.files[0]);
    setFileDisplayEdite(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */

  //------------Cas Clinique Methodes---------------------------------------------------------------------------
  //**load Cas Clinique**************************************************** */
  const LoadLastCasClinique = async () => {
    const resultLasQcm = await axios.get(
      `https://goatqcm-instance.com/casclinique/${casClinique_id}`
    );
    getLastCasClinique = resultLasQcm.data;
    SetCasClinique(getLastCasClinique);
    // Proposition.qcmStandard = getLast;
    console.log(resultLasQcm.data);
    //loadProposition(getLastCasClinique.id);
  };
  //************************************************************************* */
  //********get Cour from id ************************************************* */
  const getCour = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cours/${cours_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    CasClinique.coursMed = result.data;
  };
  //************************************************************************* */

  //*******handel onChanges Select*********************************** */

  const handleChangeYear = (event) => {
    getYear = event.target.value;

    CasClinique.casCliniqueYear = getYear;
    getCour();
  };
  const handleChangeGroupe = (event) => {
    getGroupe = event.target.value;

    CasClinique.casCliniqueGroupe = getGroupe;
  };
  const handleChangeCategory = (event) => {
    getCategory = event.target.value;

    CasClinique.category = getCategory;
  };
  //************************************************************************* */
  //*****delete cas clinique************************************************* */
  const deleteCasCliniqueHandler = async () => {
    await axios
      .delete(`https://goatqcm-instance.com/casclinique/${casClinique_id}`)
      .then((res) => {
        toast.success("successful deleting!");
        navigateDeleteCasClinique(`/goatqcm`);
      });
  };
  //***************************************************************************** */
  //***************************************************************** */
  useEffect(() => {
    //loadLastqcm();
    if (qcmSource === "Résidanat Blida") {
      setVisibiliteGroupepPermut(false);
    }
    LoadLastCasClinique();
    loadLastqcm();
    console.log(qcmId);
    console.log(cours_id);
    console.log(casClinique_id);
  }, []);
  //**************************************************************************** */
  //****************submit casClinique ****************************************/
  const onSubmitCasClinique = async (event) => {
    event.preventDefault();
    await axios
      .put(
        `https://goatqcm-instance.com/casclinique/${casClinique_id}`,
        CasClinique
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  //*********************************************************************** */

  //-----------------------------------------------------------------------------------------------------

  //----------QcmCasClinique Methodes--------------------------------------------------------------------------

  //****************submit qcm ****************************************/
  const onSubmitQcm = async (event) => {
    console.log(LoadPropoEditFinal.frstPropoEdite);
    event.preventDefault();

    await axios
      .put(`https://goatqcm-instance.com/qcmsclinique/${qcmId}`, Qcm)
      .then((res) => {
        onSubmitPropositions();
        // console.log(Proposition.qcmStandard);
      })
      .catch((err) => console.log(err));
  };
  //**********************************************************************

  //*************Methode Proposition**********************************************
  //**********add Propositions****************************************** */
  const onSubmitPropositions = async (event) => {
    onCheckEmpty();
    if (testIsEmptyCheckPropo.value === false) {
      //event.preventDefault();
      console.log(Proposition.qcmStandard);

      if (resultGetLoadPropo.value.length == 4) {
        for (let i = 0; i <= 3; i++) {
          CurrentPropo = InputProposition.value[i];
          CurrentBoolReponse = InputCheckBox.value[i];
          Proposition.propositionQcmClinique = CurrentPropo;
          Proposition.reponseBoolClinique = CurrentBoolReponse;

          await axios
            .put(
              `https://goatqcm-instance.com/reponsesclinique/${resultGetLoadPropo.value[i].id}`,
              Proposition
            )
            .then((res) => {})
            .catch((err) => console.log(err));
        }
      } else if (resultGetLoadPropo.value.length == 5) {
        InputProposition.value[0] = FirstPropoEdite;
        InputProposition.value[1] = SecondePropoEdite;
        InputProposition.value[2] = ThirdPropoEdite;
        InputProposition.value[3] = FourthPropoEdite;
        InputProposition.value[4] = FifthPropoEdite;

        for (let i = 0; i <= 4; i++) {
          CurrentPropo = InputProposition.value[i];
          CurrentBoolReponse = InputCheckBox.value[i];
          console.log(InputCheckBox.value[i]);
          Proposition.propositionQcmClinique = CurrentPropo;
          Proposition.reponseBoolClinique = CurrentBoolReponse;

          await axios
            .put(
              `https://goatqcm-instance.com/reponsesclinique/${resultGetLoadPropo.value[i].id}`,
              Proposition
            )
            .then((res) => {})
            .catch((err) => console.log(err));
        }
      }
      toast.success("successful Adding Qcm!");
    } else {
      toast.error("Check au minimum une proposition");
    }
  };
  /*******end Methode proposition********************************************** */

  //**********check empty check********************************************* */
  function onCheckEmpty() {
    testIsEmptyCheckPropo.value = true;

    if (resultGetLoadPropo.value.length == 4) {
      for (let i = 0; i <= 3; i++) {
        if (InputCheckBox.value[i] === true) {
          testIsEmptyCheckPropo.value = false;
          console.log("is checked");
        }
      }
    } else if (resultGetLoadPropo.value.length == 5) {
      console.log(InputCheckBox.value[1]);
      for (let i = 0; i <= 4; i++) {
        if (InputCheckBox.value[i] === true) {
          console.log(InputCheckBox.value[i]);
          testIsEmptyCheckPropo.value = false;
          console.log("is checked");
          console.log(resultGetLoadPropo.value.length);
        }
      }
    }
  }
  //************************************************************************* */

  //load all cours pour afficher de selection module *************************
  const loadLastqcm = async () => {
    const resultLasQcm = await axios.get(
      `https://goatqcm-instance.com/qcmsclinique/${qcmId}`
    );
    getLast = resultLasQcm.data;
    SetQcm(getLast);
    // Proposition.qcmStandard = getLast;
    console.log(resultLasQcm.data);
    loadProposition(getLast.id);
  };
  //************************************************************************* */
  //**load Proposition***************************************************************
  const loadProposition = async (getQcmId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmsclinique/${getQcmId}/reponsesqcmClinique`
    );

    resultGetLoadPropo.value = result.data;

    setLoadPropoEditFinal(resultGetLoadPropo.value);
    console.log(resultGetLoadPropo.value);

    setEditeNmbrPropo(resultGetLoadPropo.value.length + " " + "Proposition");
    if (resultGetLoadPropo.value.length === 5) {
      setFirstPropoEdite(resultGetLoadPropo.value[0].propositionQcmClinique);
      setSecondePropoEdite(resultGetLoadPropo.value[1].propositionQcmClinique);
      setThirdPropoEdite(resultGetLoadPropo.value[2].propositionQcmClinique);
      setFourthPropoEdite(resultGetLoadPropo.value[3].propositionQcmClinique);
      setFifthPropoEdite(resultGetLoadPropo.value[4].propositionQcmClinique);

      //***set checkBox from loadPorposition*********************************** */
      document.getElementById("checkbox1").checked =
        resultGetLoadPropo.value[0].reponseBoolClinique;
      isCheckedPropo1.value = resultGetLoadPropo.value[0].reponseBoolClinique;
      InputCheckBox.value[0] = resultGetLoadPropo.value[0].reponseBoolClinique;

      document.getElementById("checkbox2").checked =
        resultGetLoadPropo.value[1].reponseBoolClinique;
      isCheckedPropo2.value = resultGetLoadPropo.value[1].reponseBoolClinique;
      InputCheckBox.value[1] = resultGetLoadPropo.value[1].reponseBoolClinique;

      document.getElementById("checkbox3").checked =
        resultGetLoadPropo.value[2].reponseBoolClinique;
      isCheckedPropo3.value = resultGetLoadPropo.value[2].reponseBoolClinique;
      InputCheckBox.value[2] = resultGetLoadPropo.value[2].reponseBoolClinique;

      document.getElementById("checkbox4").checked =
        resultGetLoadPropo.value[3].reponseBoolClinique;
      isCheckedPropo4.value = resultGetLoadPropo.value[3].reponseBoolClinique;
      InputCheckBox.value[3] = resultGetLoadPropo.value[3].reponseBoolClinique;

      document.getElementById("checkbox5").checked =
        resultGetLoadPropo.value[4].reponseBoolClinique;
      isCheckedPropo5.value = resultGetLoadPropo.value[4].reponseBoolClinique;
      InputCheckBox.value[4] = resultGetLoadPropo.value[4].reponseBoolClinique;

      //****************************************************************** */
    } else if (resultGetLoadPropo.value.length === 4) {
      setFirstPropo(resultGetLoadPropo.value[0].propositionQcmClinique);
      setSecondePropoEdite(resultGetLoadPropo.value[1].propositionQcmClinique);
      setThirdPropoEdite(resultGetLoadPropo.value[2].propositionQcmClinique);
      setFourthPropoEdite(resultGetLoadPropo.value[3].propositionQcmClinique);

      //***set checkBox from loadPorposition*********************************** */
      document.getElementById("checkbox1").checked =
        resultGetLoadPropo.value[0].reponseBoolClinique;
      isCheckedPropo1.value = resultGetLoadPropo.value[0].reponseBoolClinique;
      InputCheckBox.value[0] = resultGetLoadPropo.value[0].reponseBoolClinique;

      document.getElementById("checkbox2").checked =
        resultGetLoadPropo.value[1].reponseBoolClinique;
      isCheckedPropo2.value = resultGetLoadPropo.value[1].reponseBoolClinique;
      InputCheckBox.value[1] = resultGetLoadPropo.value[1].reponseBoolClinique;

      document.getElementById("checkbox3").checked =
        resultGetLoadPropo.value[2].reponseBoolClinique;
      isCheckedPropo3.value = resultGetLoadPropo.value[2].reponseBoolClinique;
      InputCheckBox.value[2] = resultGetLoadPropo.value[2].reponseBoolClinique;

      document.getElementById("checkbox4").checked =
        resultGetLoadPropo.value[3].reponseBoolClinique;
      isCheckedPropo4.value = resultGetLoadPropo.value[3].reponseBoolClinique;
      InputCheckBox.value[3] = resultGetLoadPropo.value[3].reponseBoolClinique;
    }

    console.log(LoadPropoEditFinal);
    // console.log(EditeNmbrPropo);
  };
  //********************************************************************** */

  //*******check box proposition 1**********************************************
  let isCheckedPropo1 = useSignal(false);
  const onHandelCheckProp1 = () => {
    isCheckedPropo1.value = !isCheckedPropo1.value;
    InputCheckBox.value[0] = isCheckedPropo1.value;

    console.log(InputCheckBox.value[0]);
  };
  //****************************************************************************/
  //*******check box proposition 2**********************************************
  let isCheckedPropo2 = useSignal(false);
  const onHandelCheckProp2 = () => {
    isCheckedPropo2.value = !isCheckedPropo2.value;
    InputCheckBox.value[1] = isCheckedPropo2.value;
    console.log(InputCheckBox.value[1]);
  };
  //****************************************************************************/
  //*******check box proposition 3**********************************************
  let isCheckedPropo3 = useSignal(false);
  const onHandelCheckProp3 = () => {
    isCheckedPropo3.value = !isCheckedPropo3.value;
    InputCheckBox.value[2] = isCheckedPropo3.value;
    console.log(InputCheckBox.value[2]);
  };
  //****************************************************************************/
  //*******check box proposition 4**********************************************
  let isCheckedPropo4 = useSignal(false);
  const onHandelCheckProp4 = () => {
    isCheckedPropo4.value = !isCheckedPropo4.value;
    InputCheckBox.value[3] = isCheckedPropo4.value;
    console.log(InputCheckBox.value[3]);
  };
  //****************************************************************************/
  //*******check box proposition 4**********************************************
  let isCheckedPropo5 = useSignal(false);
  const onHandelCheckProp5 = () => {
    isCheckedPropo5.value = !isCheckedPropo5.value;
    InputCheckBox.value[4] = isCheckedPropo5.value;
    console.log(InputCheckBox.value[4]);
  };
  //****************************************************************************/
  //*****select Nobre Proposition***********************************************
  const handleChangeNbrPropos = (event) => {
    Nbrpropotion = event.target.value;
    NbrPropoSelect.value = Nbrpropotion;
    if (NbrPropoSelect == "4 Proposition") {
      setShowFifthPropo(false);
    } else if (NbrPropoSelect == "5 Proposition") {
      setShowFifthPropo(true);
    }
  };
  //************************************************************************* */
  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    console.log(qcmId);
    const fullDescResult = await axios.get(
      `https://goatqcm-instance.com/image/casclinique/descqcm/${qcmId}`
    );

    console.log(fullDescResult.data);
    if (fullDescResult.data !== null) {
      setFullDescEdite(fullDescResult.data);
      setFileDisplayEdite(
        `https://goatqcm-instance.com/image/casclinique/${qcmId}/${fullDescResult.data.imageName}`
      );

      setLoadImage(fullDescResult.data);
      setvisisbleDescInsert(false);
      setVisisbleDescUpdate(true);
    } else {
      console.log("no qcm id existe in image");
      setvisisbleDescInsert(true);
      setVisisbleDescUpdate(false);
    }
    //getFullDesc.value = fullDescResult.data;
  };
  //******************************************* */
  ///*****update image************************************** */
  const UpdateImage = async (cliniqueId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(
        `https://goatqcm-instance.com/image/casclinique/updateimage/${cliniqueId}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
        //navigateHome("/home");
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */

  //***store image to database*************************** */
  const AjouterImage = async (cliniqueId) => {
    testDescExsite(cliniqueId);

    const result = await axios.get(
      `https://goatqcm-instance.com/casclinique/${cliniqueId}`
    );
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    formData.append("image", file);
    formData.append("clinique", JSON.stringify(result.data));
    axios
      .post(
        "https://goatqcm-instance.com/image/casclinique/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setvisisbleDescInsert(false);
        //navigateHome("/home");
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */

  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (cliniqueId) => {
    await axios.delete(
      `https://goatqcm-instance.com/image/casclinique/deletefullimage/${cliniqueId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setVisisbleDescUpdate(false);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //---------------------------------------------------------------------------------------------------------
  return (
    <>
      <div className={classes.addingdiv}>
        <div
          style={{
            marginLeft: 250,
          }}
        >
          Add Cas Clinique
        </div>
        <div
          style={{
            paddingTop: 20,
            marginLeft: 10,

            width: 700,
            display: "flex",
          }}
          className="container"
        >
          <select
            style={{ marginRight: 20 }}
            className={"form-select"}
            aria-label="Default select example"
            value={CasClinique.casCliniqueYear}
            onChange={handleChangeYear}
          >
            <option value="" disabled="disabled">
              Select Year
            </option>
            {years.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
          {VisibiliteGroupepPermut && (
            <select
              style={{ marginRight: 20 }}
              className={"form-select"}
              aria-label="Default select example"
              value={CasClinique.casCliniqueGroupe}
              onChange={handleChangeGroupe}
            >
              <option value="" disabled="disabled">
                Select Groupe/Permutation
              </option>
              {groupes.map((groupe, index) => (
                <option key={index}>{groupe}</option>
              ))}
            </select>
          )}
          {VisibiliteGroupepPermut && (
            <select
              style={{ marginRight: 20 }}
              required
              className={"form-select"}
              id="category"
              aria-label="Default select example"
              value={CasClinique.category}
              onChange={handleChangeCategory}
            >
              <option value="" disabled="disabled">
                Select Category
              </option>
              {category.map((categor, index) => (
                <option key={index}>{categor}</option>
              ))}
            </select>
          )}
        </div>
        <h6>Cas Clinique </h6>
        <form onSubmit={(e) => onSubmitCasClinique(e)}>
          <div style={{ marginBottom: 20, width: 700 }} className="form-group">
            <textarea
              className="form-control"
              rows="8"
              value={CasClinique.casCliniqueContent}
              style={{ marginBottom: 20, marginLeft: 10 }}
              onChange={(e) =>
                SetCasClinique({
                  ...CasClinique,
                  casCliniqueContent: e.target.value,
                })
              }
            ></textarea>
            <div
              style={{
                marginLeft: 10,
                marginBottom: 20,
                display: "flex",
              }}
            >
              <button
                style={{
                  paddingRight: 10,
                  width: 160,
                }}
                type="submit"
                className="btn btn-warning"
              >
                Edite Cas Clinique
              </button>
              <button
                style={{
                  marginLeft: 10,
                  paddingRight: 20,
                  marginRight: 10,
                }}
                type="button"
                className="btn btn-danger"
                onClick={deleteCasCliniqueHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginLeft: 5 }}
          onClick={(e) => testDescExsite(casClinique_id)}
        >
          Update Image Clinique
        </button>
        {visisbleDescInsert && (
          <div className={classes.imgdescdiv}>
            <div className={classes.fulldescription}>
              <div className={classes.imagediv}>
                <img src={fileDisplay} />
                <input type="file" onChange={getFile}></input>
              </div>
            </div>
            <button
              type="submit"
              className={`${classes.updtimage} btn btn-primary`}
              onClick={(e) => AjouterImage(casClinique_id)}
            >
              Ajouter Image
            </button>
          </div>
        )}
        {VisisbleDescUpdate && (
          <div className={classes.imgdescdiv}>
            <div className={classes.fulldescription}>
              <div className={classes.imagediv}>
                <img src={FileDisplayEdite} onChange={getFileEdite} />
                <input type="file" onChange={getFileEdite}></input>
              </div>
            </div>
            <button
              type="submit"
              className={`${classes.updtimage} btn btn-primary`}
              onClick={(e) => UpdateImage(casClinique_id)}
            >
              Update Image
            </button>
            <button
              type="button"
              className={`${classes.deeletefulldesc} btn btn-danger`}
              onClick={(e) => deleteFullDesc(casClinique_id)}
            >
              Delete Image
            </button>
          </div>
        )}
        <div>
          <form onSubmit={(e) => onSubmitQcm(e)}>
            <div className={classes.child} style={{ marginRight: 10 }}>
              <div
                style={{ marginBottom: 20, width: 700, marginRight: 10 }}
                className="form-group"
              >
                <h6>Qcm </h6>
                <textarea
                  className="form-control"
                  required
                  id="qcmarea"
                  rows="8"
                  value={Qcm.qcmCliniqueContent}
                  style={{ marginBottom: 20, marginLeft: 10 }}
                  onChange={(e) =>
                    SetQcm({ ...Qcm, qcmCliniqueContent: e.target.value })
                  }
                ></textarea>
                <div
                  style={{
                    marginLeft: 10,
                    marginBottom: 20,
                    display: "flex",
                  }}
                ></div>
              </div>
            </div>
            <div className={classes.child}>
              <div className={classes.propositionQcmdiv}>
                <div style={{ marginTop: 5, marginBottom: 5, width: 250 }}>
                  <select
                    className="form-select"
                    required
                    id="nbrpropositionselect"
                    aria-label="Default select example"
                    onChange={handleChangeNbrPropos}
                    value={EditeNmbrPropo}
                  >
                    <option value="" disabled="disabled">
                      Select Nombre Proposition
                    </option>
                    {NombrePropo.map((NbrPropo, index) => (
                      <option key={index}>{NbrPropo}</option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    marginBottom: 20,
                    width: 600,
                    height: 40,
                  }}
                >
                  <div className="input-group mb-3">
                    <div
                      className="input-group-text"
                      style={{
                        backgroundColor: "GrayText",
                      }}
                    >
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        id="checkbox1"
                        value={isCheckedPropo1.value}
                        onChange={onHandelCheckProp1}
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                    <input
                      type={"text"}
                      required
                      value={FirstPropoEdite}
                      className="form-control"
                      name="frstPropoEdite"
                      style={{
                        height: 40,
                      }}
                      onChange={(e) =>
                        setFirstPropoEdite(e.target.value) +
                        console.log(FirstPropoEdite)
                      } /*
                      setLoadPropoEditFinal({
                        ...LoadPropoEditFinal,
                        frstPropoEdite: e.target.value,
                      })*/
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div
                      className="input-group-text"
                      style={{
                        backgroundColor: "GrayText",
                      }}
                    >
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        id="checkbox2"
                        value={isCheckedPropo2.value}
                        onChange={onHandelCheckProp2}
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      id="propo2"
                      className="form-control"
                      value={SecondePropoEdite}
                      style={{ height: 40 }}
                      onChange={(e) =>
                        setSecondePropoEdite(e.target.value) +
                        console.log(SecondePropoEdite)
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div
                      className="input-group-text"
                      style={{
                        backgroundColor: "GrayText",
                      }}
                    >
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        id="checkbox3"
                        onChange={onHandelCheckProp3}
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={ThirdPropoEdite}
                      id="propo3"
                      style={{ height: 40 }}
                      onChange={(e) =>
                        setThirdPropoEdite(e.target.value) +
                        console.log(ThirdPropoEdite)
                      }
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div
                      className="input-group-text"
                      style={{
                        backgroundColor: "GrayText",
                      }}
                    >
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        id="checkbox4"
                        onChange={onHandelCheckProp4}
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="propo4"
                      value={FourthPropoEdite}
                      style={{ height: 40 }}
                      onChange={(e) =>
                        setFourthPropoEdite(e.target.value) +
                        console.log(FourthPropoEdite)
                      }
                    />
                  </div>
                  {ShowFifthPropo && (
                    <div className="input-group mb-3">
                      <div
                        className="input-group-text"
                        style={{
                          backgroundColor: "GrayText",
                        }}
                      >
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          id="checkbox5"
                          onChange={onHandelCheckProp5}
                          aria-label="Checkbox for following text input"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="propo5"
                        value={FifthPropoEdite}
                        id="propo5"
                        //value={FifthPropoEdite}
                        style={{ height: 40 }}
                        onChange={(e) =>
                          setFifthPropoEdite(e.target.value) +
                          console.log(FifthPropoEdite)
                        }
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{
                      float: "right",
                    }}
                  >
                    Edite Qcm
                  </button>
                </div>
              </div>
            </div>
            <Link type="button" to="/goatqcm" className="btn btn-danger">
              Terminer
            </Link>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
export default EditeCasCliniqueQcmClinique;
