import React, { useState, useEffect } from "react";
import Select from "react-select";
import classes from "./AddQcm.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { effect, signal, useSignal } from "@preact/signals-react";
//import { ToastContainer, Toaster, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Construction } from "@mui/icons-material";

function AddQcm(props) {
  const token = localStorage.getItem("tokengoat");

  const [ValidatEnterQcm, setValidatEnterQcm] = useState(false);
  const modeles = ["Qcm(modele1)", "Qcm(modele2)", "Cas Clinique(modele3)"];
  const [Modele, setModele] = useState("");
  const [Year, setYear] = useState("");
  const [Category, setCategory] = useState("");
  const [Groupe, setGroupe] = useState("");
  const [emptyFile, setEmptyFile] = useState();
  let { cours_id } = useParams();
  const valDesc = "foued";
  //******************************************** */
  const [checkBoxPropo, setcheckBoxPropo] = useState({
    checkBoxPropo1: false,
    checkBoxPropo2: false,
    checkBoxPropo3: false,
    checkBoxPropo4: false,
    checkBoxPropo5: false,
  });
  const getFinalCheckBox = useSignal([]);
  //********************************************** */
  const [desc, setDesc] = useState({
    qcmExplication: "mama",
  });
  let getModel = "";
  let getYear = "";
  let getCategory = "";
  let getGroupe = "";
  let QcmId = "";
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
  ];
  const category = ["Externat Blida", "Résidanat Blida"];
  const [VisibleGroupe, setVisibleGroupe] = useState(false);

  const [Qcm, SetQcm] = useState({
    id: "",
    qcmContent: "",
    qcmModele: props.qcmModel,
    qcmYear: "",
    qcmGroupe: "",
    coursMed: {},
  });

  //****************porposition variable************************************************
  const [Proposition, setProposition] = useState({
    propositionQcm: "",
    reponseBool: "",
    qcmStandard: {},
  });
  let navigateGetQcm = useNavigate();
  let CurrentPropo = "";
  let CurrentBoolReponse = false;
  let InputProposition = useSignal(["", "", "", "", ""]);
  let getCrntInputPropo1 = useSignal("");
  let getCrntInputPropo2 = useSignal("");
  let getCrntInputPropo3 = useSignal("");
  let getCrntInputPropo4 = useSignal("");
  let getCrntInputPropo5 = useSignal("");

  let InputCheckBox = useSignal([false, false, false, false, false]);
  const NombrePropo = ["4 Proposition", "5 Proposition"];
  const { propositionQcm, reponseBool, qcmStandard: qcmStandard } = Proposition;
  let getLast = useSignal({});
  const NbrPropoSelect = useSignal("");
  let Nbrpropotion = "";
  const [ShowFifthPropo, setShowFifthPropo] = useState(true);
  const testIsEmptyCheckPropo = useSignal(true);
  //****************************************************************** */
  useEffect(() => {
    //loadLastqcm();
  }, []);
  //************************************************************************/
  //********get Cour me id ************************************************* */
  const getCour = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cours/${cours_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    Qcm.coursMed = result.data;
  };
  //************************************************************************* */

  //*******handel onChanges Select*********************************** */
  /*const handleChangeModele = (event) => {
    getModel = event.target.value;
    setModele(getModel);
    Qcm.qcmModele = getModel;
  };*/
  const handleChangeYear = (event) => {
    getYear = event.target.value;
    setYear(getYear);
    Qcm.qcmYear = getYear;
    getCour();
  };
  const handleChangeGroupe = (event) => {
    getGroupe = event.target.value;
    setGroupe(getGroupe);
    Qcm.qcmGroupe = getGroupe;
  };
  const handleChangeCategory = (event) => {
    getCategory = event.target.value;
    setCategory(getCategory);
    Qcm.category = getCategory;
    if (getCategory === "Externat Blida") {
      setVisibleGroupe(true);
    } else if (getCategory === "Résidanat Blida") {
      setVisibleGroupe(false);
    }
  };
  //***************************************************************** */

  //****************submit qcm ****************************************/
  const onSubmitQcm = async (event) => {
    event.preventDefault();
    await axios
      .post("https://goatqcm-instance.com/qcms", Qcm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(Qcm);
        loadLastqcm();
        setValidatEnterQcm(true);

        // formData.append("qcmstandard", Qcm);
      })
      .catch((err) => console.log(err));
  };

  //**********************************************************************

  //**************************************************************************
  //const QcmEdit = [Qcm.qcmContent, Qcm.qcmModele, Qcm.qcmGroupe, Qcm.qcmYear];
  //********************************************************************** */
  const transferReponse = () => {
    if (NbrPropoSelect.value == "4 Proposition") {
      for (let i = 0; i <= 3; i++) {
        if (i == 0) {
          getFinalCheckBox.value[0] = checkBoxPropo.checkBoxPropo1;
          console.log(getFinalCheckBox.value[0]);
        }
        if (i == 1) {
          getFinalCheckBox.value[1] = checkBoxPropo.checkBoxPropo2;
          console.log(getFinalCheckBox.value[1]);
        }
        if (i == 2) {
          getFinalCheckBox.value[2] = checkBoxPropo.checkBoxPropo3;
          console.log(getFinalCheckBox.value[2]);
        }
        if (i == 3) {
          getFinalCheckBox.value[3] = checkBoxPropo.checkBoxPropo4;
          console.log(getFinalCheckBox.value[3]);
        }
      }
    } else if (NbrPropoSelect.value == "5 Proposition") {
      for (let i = 0; i <= 4; i++) {
        if (i == 0) {
          getFinalCheckBox.value[0] = checkBoxPropo.checkBoxPropo1;
          console.log(getFinalCheckBox.value[0]);
        }
        if (i == 1) {
          getFinalCheckBox.value[1] = checkBoxPropo.checkBoxPropo2;
          console.log(getFinalCheckBox.value[1]);
        }
        if (i == 2) {
          getFinalCheckBox.value[2] = checkBoxPropo.checkBoxPropo3;
          console.log(getFinalCheckBox.value[2]);
        }
        if (i == 3) {
          getFinalCheckBox.value[3] = checkBoxPropo.checkBoxPropo4;
          console.log(getFinalCheckBox.value[3]);
        }
        if (i == 4) {
          getFinalCheckBox.value[4] = checkBoxPropo.checkBoxPropo5;
          console.log(getFinalCheckBox.value[4]);
        }
      }
    }
  };
  //*************Methode Proposition**********************************************
  //**********add Propositions****************************************** */
  const onSubmitPropositions = async (event) => {
    console.log(checkBoxPropo);
    transferReponse();
    console.log(NbrPropoSelect.value);
    console.log(getFinalCheckBox.value[0]);
    onCheckEmpty();

    if (testIsEmptyCheckPropo.value === false) {
      console.log(checkBoxPropo);
      //event.preventDefault();

      if (NbrPropoSelect.value == "4 Proposition") {
        for (let i = 0; i <= 3; i++) {
          CurrentPropo = InputProposition.value[i];

          Proposition.propositionQcm = CurrentPropo;
          Proposition.reponseBool = getFinalCheckBox.value[i];

          await axios
            .post("https://goatqcm-instance.com/reponses", Proposition, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {})
            .catch((err) => console.log(err));
        }
        toast.success("successful Adding Qcm!");
      } else if (NbrPropoSelect.value == "5 Proposition") {
        for (let i = 0; i <= 4; i++) {
          CurrentPropo = InputProposition.value[i];

          Proposition.propositionQcm = CurrentPropo;
          Proposition.reponseBool = getFinalCheckBox.value[i];

          await axios
            .post("https://goatqcm-instance.com/reponses", Proposition, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              initilaizationInput();
            })
            .catch((err) => console.log(err));
        }
      }
      toast.success("successful Adding Qcm!");
      initilaizationInput();
      setcheckBoxPropo({
        checkBoxPropo1: false,
        checkBoxPropo2: false,
        checkBoxPropo3: false,
        checkBoxPropo4: false,
        checkBoxPropo5: false,
      });
    } else {
      console.log(Proposition.qcmStandard.id);
      if (ValidatEnterQcm === true) {
        deleteLastQcm(Proposition.qcmStandard.id);
      }
      toast.error("Check au minimum une proposition");
    }
  };
  //*****delete Qcm if not Enter************************************************* */
  const deleteLastQcm = async (getQcmId) => {
    await axios.delete(`https://goatqcm-instance.com/qcms/${getQcmId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  //***************************************************************************** */
  //**********check empty check********************************************* */
  function onCheckEmpty() {
    console.log(getFinalCheckBox.value);
    testIsEmptyCheckPropo.value = true;
    if (NbrPropoSelect.value == "4 Proposition") {
      for (let i = 0; i <= 3; i++) {
        if (getFinalCheckBox.value[i] === true) {
          testIsEmptyCheckPropo.value = false;
          console.log("is checked");
        }
      }
    } else if (NbrPropoSelect.value == "5 Proposition") {
      for (let i = 0; i <= 4; i++) {
        if (getFinalCheckBox.value[i] === true) {
          testIsEmptyCheckPropo.value = false;
          console.log("is checked");
        }
      }
    }
  }
  //************************************************************************* */
  //******initial input****************************************************** */
  function initilaizationInput() {
    document.getElementById("qcmarea").value = "";
    if (document.getElementById("category").value === "Externat Blida") {
      document.getElementById("groupeselect").value = "";
    }
    document.getElementById("yearselect").value = "";
    document.getElementById("nbrpropositionselect").value = "";
    document.getElementById("checkbox1").checked = false;
    document.getElementById("checkbox2").checked = false;
    document.getElementById("checkbox3").checked = false;
    document.getElementById("checkbox4").checked = false;
    if (NbrPropoSelect.value == "5 Proposition") {
      document.getElementById("checkbox5").checked = false;
    }
    document.getElementById("propo1").value = "";
    document.getElementById("propo2").value = "";
    document.getElementById("propo3").value = "";
    document.getElementById("propo4").value = "";
    document.getElementById("propo5").value = "";
  }
  //************************************************************************* */
  //load all cours pour afficher de selection module *************************
  const loadLastqcm = async () => {
    const resultLasQcm = await axios.get(
      `https://goatqcm-instance.com/qcms/get_last_id/${cours_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(resultLasQcm.data);

    getLast = resultLasQcm.data;
    Proposition.qcmStandard = getLast;
    onSubmitPropositions();
  };
  //************************************************************************* */

  //*******check box proposition 1**********************************************
  let isCheckedPropo1 = useSignal(false);
  const onHandelCheckProp1 = () => {
    if (document.getElementById("checkbox1").checked === true) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo1: true,
      };
      setcheckBoxPropo(updateCheckBox);
    } else if (document.getElementById("checkbox1").checked === false) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo1: false,
      };
      setcheckBoxPropo(updateCheckBox);
    }
  };
  //****************************************************************************/
  //*******check box proposition 1**********************************************
  let isCheckedPropo2 = useSignal(false);
  const onHandelCheckProp2 = () => {
    if (document.getElementById("checkbox2").checked === true) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo2: true,
      };
      setcheckBoxPropo(updateCheckBox);
    } else if (document.getElementById("checkbox2").checked === false) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo2: false,
      };
      setcheckBoxPropo(updateCheckBox);
    }
  };
  //****************************************************************************/
  //*******check box proposition 2**********************************************

  //****************************************************************************/
  //*******check box proposition 3**********************************************
  let isCheckedPropo3 = useSignal(false);
  const onHandelCheckProp3 = () => {
    if (document.getElementById("checkbox3").checked === true) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo3: true,
      };
      setcheckBoxPropo(updateCheckBox);
    } else if (document.getElementById("checkbox3").checked === false) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo3: false,
      };
      setcheckBoxPropo(updateCheckBox);
    }
  };
  //****************************************************************************/
  //*******check box proposition 4**********************************************
  let isCheckedPropo4 = useSignal(false);
  const onHandelCheckProp4 = () => {
    if (document.getElementById("checkbox4").checked === true) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo4: true,
      };
      setcheckBoxPropo(updateCheckBox);
    } else if (document.getElementById("checkbox4").checked === false) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo4: false,
      };
      setcheckBoxPropo(updateCheckBox);
    }
  };
  //****************************************************************************/
  //*******check box proposition 4**********************************************
  let isCheckedPropo5 = useSignal(false);
  const onHandelCheckProp5 = () => {
    if (document.getElementById("checkbox5").checked === true) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo5: true,
      };
      setcheckBoxPropo(updateCheckBox);
    } else if (document.getElementById("checkbox5").checked === false) {
      const updateCheckBox = {
        ...checkBoxPropo,
        checkBoxPropo5: false,
      };
      setcheckBoxPropo(updateCheckBox);
    }
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

  //***********************************************************************/
  return (
    <>
      <div className={classes.addingdiv}>
        <form onSubmit={(e) => onSubmitQcm(e)}>
          <div className={classes.child} style={{ marginRight: 10 }}>
            <div
              style={{
                marginBottom: 0,
                marginLeft: 10,
                width: 700,
                display: "flex",
              }}
              className="container"
            >
              <select
                style={{ marginRight: 20 }}
                required
                className={"form-select"}
                id="yearselect"
                aria-label="Default select example"
                value={Year}
                onChange={handleChangeYear}
              >
                <option value="" disabled="disabled">
                  Select Year
                </option>
                {years.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
              </select>
              <select
                style={{ marginRight: 20 }}
                required
                className={"form-select"}
                id="category"
                aria-label="Default select example"
                value={Category}
                onChange={handleChangeCategory}
              >
                <option value="" disabled="disabled">
                  Select Category
                </option>
                {category.map((categor, index) => (
                  <option key={index}>{categor}</option>
                ))}
              </select>
              {VisibleGroupe && (
                <select
                  required
                  style={{ marginRight: 20 }}
                  className={"form-select"}
                  id="groupeselect"
                  aria-label="Default select example"
                  value={Groupe}
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
            </div>

            <div
              style={{ marginBottom: 20, width: 700 }}
              className="form-group"
            >
              <textarea
                className="form-control"
                required
                id="qcmarea"
                rows="8"
                style={{ marginBottom: 20, marginLeft: 10 }}
                onChange={(e) => SetQcm({ ...Qcm, qcmContent: e.target.value })}
              ></textarea>
              <div
                style={{
                  marginLeft: 10,

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
                  value={NbrPropoSelect}
                  onChange={handleChangeNbrPropos}
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
                    type="text"
                    required
                    id="propo1"
                    className="form-control"
                    placeholder="Enter proposition"
                    style={{
                      height: 40,
                    }}
                    onChange={(e) => {
                      getCrntInputPropo1.value = e.target.value;
                      InputProposition.value[0] = getCrntInputPropo1.value;
                    }}
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
                    placeholder="Enter proposition"
                    style={{ height: 40 }}
                    onChange={(e) => {
                      getCrntInputPropo2.value = e.target.value;
                      InputProposition.value[1] = getCrntInputPropo2.value;
                    }}
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
                      value={isCheckedPropo3.value}
                      onChange={onHandelCheckProp3}
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter proposition"
                    id="propo3"
                    style={{ height: 40 }}
                    onChange={(e) => {
                      getCrntInputPropo3.value = e.target.value;
                      InputProposition.value[2] = getCrntInputPropo3.value;
                    }}
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
                      value={isCheckedPropo4.value}
                      onChange={onHandelCheckProp4}
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter proposition"
                    id="propo4"
                    style={{ height: 40 }}
                    onChange={(e) => {
                      getCrntInputPropo4.value = e.target.value;
                      InputProposition.value[3] = getCrntInputPropo4.value;
                    }}
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
                        value={isCheckedPropo5.value}
                        onChange={onHandelCheckProp5}
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Enter proposition"
                      id="propo5"
                      style={{ height: 40 }}
                      onChange={(e) => {
                        getCrntInputPropo5.value = e.target.value;
                        InputProposition.value[4] = getCrntInputPropo5.value;
                      }}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    float: "right",
                  }}
                >
                  Add Qcm
                </button>
              </div>
            </div>
          </div>
        </form>
        <Link type="button" to="/goatqcm" className="btn btn-danger">
          Terminer
        </Link>
      </div>

      <Toaster />
    </>
  );
}
export default AddQcm;
