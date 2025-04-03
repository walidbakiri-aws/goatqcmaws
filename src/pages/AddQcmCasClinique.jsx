import React, { useState, useEffect } from "react";
import classes from "./AddQcm.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
function AddQcmCasClinique(props) {
  const token = localStorage.getItem("tokengoat");
  let { cours_id } = useParams();
  const [ValidatEnterQcm, setValidatEnterQcm] = useState(false);

  const [QcmCasClinique, SetQcmCasClinique] = useState({
    qcmCliniqueContent: "",
    qcmCliniqueExplication: "",
    casClinique: {},
  });

  //****************porposition variable************************************************
  const [Proposition, setProposition] = useState({
    propositionQcmClinique: "",
    reponseBoolClinique: "",
    qcmClinique: {},
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

  const { propositionQcmClinique, reponseBoolClinique, qcmClinique } =
    Proposition;
  let getLast = useSignal({});
  const NbrPropoSelect = useSignal("");
  let Nbrpropotion = "";
  const [ShowFifthPropo, setShowFifthPropo] = useState(true);
  const testIsEmptyCheckPropo = useSignal(true);
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
  //****************************************************************** */
  useEffect(() => {
    getCasClinique();
  }, []);
  //************************************************************************/
  //********get last cas clinique ******************************************** */
  const getCasClinique = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/casclinique/get_last_id/${cours_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    QcmCasClinique.casClinique = result.data;
  };
  //************************************************************************* */

  //****************submit qcm ****************************************/
  const onSubmitQcm = async (event) => {
    event.preventDefault();
    await axios
      .post("https://goatqcm-instance.com/qcmsclinique", QcmCasClinique, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setValidatEnterQcm(true);
        loadLastQcmCasClinique();

        // console.log(Proposition.qcmStandard);
      })
      .catch((err) => console.log(err));
  };
  //*************************************************************************
  const loadLastQcmCasClinique = async () => {
    console.log(QcmCasClinique.casClinique);
    const resultLasQcm = await axios.get(
      `https://goatqcm-instance.com/qcmsclinique/get_last_id/${QcmCasClinique.casClinique.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    Proposition.qcmClinique = resultLasQcm.data;
    onSubmitPropositions();
  };
  //************************************************************************* */
  //********************************************************************** */
  const transferReponse = () => {
    if (NbrPropoSelect == "4 Proposition") {
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
    } else if (NbrPropoSelect == "5 Proposition") {
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
    console.log(Proposition.qcmClinique);
    transferReponse();

    onCheckEmpty();
    if (testIsEmptyCheckPropo.value === false) {
      if (NbrPropoSelect == "4 Proposition") {
        for (let i = 0; i <= 3; i++) {
          console.log(getFinalCheckBox.value[i]);
          CurrentPropo = InputProposition.value[i];
          Proposition.propositionQcmClinique = CurrentPropo;
          Proposition.reponseBoolClinique = getFinalCheckBox.value[i];

          await axios
            .post(
              "https://goatqcm-instance.com/reponsesclinique",
              Proposition,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {})
            .catch((err) => console.log(err));
        }
        toast.success("successful Adding casClinique!");
        initilaizationInput();
        setcheckBoxPropo({
          checkBoxPropo1: false,
          checkBoxPropo2: false,
          checkBoxPropo3: false,
          checkBoxPropo4: false,
        });
      } else if (NbrPropoSelect == "5 Proposition") {
        for (let i = 0; i <= 4; i++) {
          console.log(getFinalCheckBox.value[i]);
          CurrentPropo = InputProposition.value[i];
          Proposition.propositionQcmClinique = CurrentPropo;
          Proposition.reponseBoolClinique = getFinalCheckBox.value[i];

          await axios
            .post(
              "https://goatqcm-instance.com/reponsesclinique",
              Proposition,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {})
            .catch((err) => console.log(err));
        }
        toast.success("successful Adding casClinique!");
        initilaizationInput();
        setcheckBoxPropo({
          checkBoxPropo1: false,
          checkBoxPropo2: false,
          checkBoxPropo3: false,
          checkBoxPropo4: false,
          checkBoxPropo5: false,
        });
      }
    } else {
      if (ValidatEnterQcm === true) {
        deleteLastQcm(Proposition.qcmClinique.id);
      }

      toast.error("Check au minimum une proposition");
    }
  };
  //********************************************************************* */
  //*****delete Qcm if not Enter************************************************* */
  const deleteLastQcm = async (getQcmId) => {
    await axios.delete(
      `https://goatqcm-instance.com/qcmsclinique/${getQcmId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  //***************************************************************************** */

  //**********check empty check********************************************* */
  function onCheckEmpty() {
    testIsEmptyCheckPropo.value = true;
    if (NbrPropoSelect == "4 Proposition") {
      for (let i = 0; i <= 3; i++) {
        if (getFinalCheckBox.value[i] === true) {
          testIsEmptyCheckPropo.value = false;
          console.log("is checked");
        }
      }
    } else if (NbrPropoSelect == "5 Proposition") {
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
  function handletest() {
    console.log(checkBoxPropo.checkBoxPropo1);
    console.log(checkBoxPropo.checkBoxPropo2);
    console.log(checkBoxPropo.checkBoxPropo3);
    console.log(checkBoxPropo.checkBoxPropo4);
    console.log(checkBoxPropo.checkBoxPropo5);
    console.log("check how to show");

    getFinalCheckBox.value = checkBoxPropo;
    console.log(getFinalCheckBox.index);

    // getFinalCheckBox.value = checkBoxPropo.data;
  }
  //**************************
  return (
    <>
      <form onSubmit={(e) => onSubmitQcm(e)}>
        <div className={classes.child} style={{ marginRight: 10 }}>
          <div style={{ width: 700 }} className="form-group">
            <h6 style={{ marginLeft: 12 }}>Qcm</h6>
            <textarea
              className="form-control"
              required
              id="qcmarea"
              rows="8"
              style={{ marginLeft: 10 }}
              onChange={(e) =>
                SetQcmCasClinique({
                  ...QcmCasClinique,
                  qcmCliniqueContent: e.target.value,
                })
              }
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
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter proposition"
                  id="propo1"
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
                  className="form-control"
                  placeholder="Enter proposition"
                  id="propo2"
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

        <Link type="button" to="/goatqcm" className="btn btn-danger">
          Terminer
        </Link>
      </form>
      <Toaster />
      <button
        onClick={(e) => {
          handletest();
        }}
      >
        test
      </button>
    </>
  );
}

export default AddQcmCasClinique;
