import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BtnDeleteEditCasClinique(props) {
  let getLastCasClinique = {};
  const getCasCliniqueId = useSignal("");

  const [editCasClinique, seteditCasClinique] = useState({
    casCliniqueContent: "",
    casCliniqueGroupe: "",
    qcmCliniqueModele: "",
    casCliniqueYear: "",
  });
  const token = localStorage.getItem("token");
  let { cours_id } = useParams();
  /*qcmContent: props.qcmEdit[1]
    modele: props.QcmEdit.qcmEdit[2]
    qcmGroupe: props.editQcm.qcmEdit[3]
    qcmYear: props.editQcm.qcmEdit[4]*/

  useEffect(() => {
    console.log("helllo use effect");
    loadLastCasClinique();
  }, []);
  //load Last Qcm shows to get his ID***************************************************
  const loadLastCasClinique = async () => {
    const resultLasCasClinique = await axios.get(
      `https://goatqcm-instance.com/casclinique/get_last_id/${cours_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getLastCasClinique = resultLasCasClinique.data;
    getCasCliniqueId.value = getLastCasClinique.id;
    console.log(getCasCliniqueId.value);
  };
  //************************************************************************* */
  //delete Last Qcm************************************************************
  const deleteLstCasClinique = async () => {
    //loadLastqcm();
    await axios.delete(
      `https://goatqcm-instance.com/casclinique/${getCasCliniqueId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  //***************************************************************************

  //*************************************************************************
  function LoadLastUpdatCasClinique() {
    (editCasClinique.casCliniqueContent = props.CasCliniqueEdit[0]),
      (editCasClinique.casCliniqueGroupe = props.CasCliniqueEdit[1]),
      (editCasClinique.casCliniqueYear = props.CasCliniqueEdit[2]),
      (editCasClinique.qcmCliniqueModele = props.CasCliniqueEdit[3]);
  }
  //************************************************************************ */
  //********Update Last Qcm*****************************************************
  const updateCasCliniqueHendler = async () => {
    LoadLastUpdatCasClinique();

    await axios
      .put(
        `https://goatqcm-instance.com/casclinique/${getCasCliniqueId}`,
        editCasClinique,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************************* */*

  return (
    <div
      style={{
        paddingLeft: 10,
        display: "flex",
      }}
    >
      <button
        style={{
          paddingRight: 20,
          marginRight: 10,
        }}
        type="button"
        className="btn btn-danger"
        onClick={deleteLstCasClinique}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={updateCasCliniqueHendler}
        style={{
          paddingRight: 20,
        }}
        className="btn btn-warning"
      >
        Edite
      </button>
    </div>
  );
}

export default BtnDeleteEditCasClinique;
