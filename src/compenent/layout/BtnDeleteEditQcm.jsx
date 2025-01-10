import axios from "axios";
import { useEffect, useState } from "react";
function BtnDeleteEditQcm(props) {
  let getLastQcm = {};
  const [getQcmId, setgetQcmId] = useState("");
  const [editQcm, seteditQcm] = useState({
    qcmContent: "",
    modele: "",
    qcmGroupe: "",
    qcmYear: "",
  });
  /*qcmContent: props.qcmEdit[1]
    modele: props.QcmEdit.qcmEdit[2]
    qcmGroupe: props.editQcm.qcmEdit[3]
    qcmYear: props.editQcm.qcmEdit[4]*/

  useEffect(() => {
    console.log("helllo use effect");
    loadLastqcm();
  }, []);
  //load Last Qcm shows to get his ID***************************************************
  const loadLastqcm = async () => {
    const resultLasQcm = await axios.get(
      "https://goatqcm-instance.com/qcms/get_last_id"
    );
    getLastQcm = resultLasQcm.data;
    setgetQcmId(getLastQcm.id);
    console.log(getLastQcm.id);
  };
  //************************************************************************* */
  //delete Last Qcm************************************************************
  const deleteLstQcm = async () => {
    //loadLastqcm();
    await axios.delete(`https://goatqcm-instance.com/qcms/${getQcmId}`);
  };
  //***************************************************************************

  //*************************************************************************
  function LoadLastUpdatQcm() {
    (editQcm.qcmContent = props.qcmEdit[0]),
      (editQcm.modele = props.qcmEdit[1]),
      (editQcm.qcmGroupe = props.qcmEdit[2]),
      (editQcm.qcmYear = props.qcmEdit[3]);
  }
  //************************************************************************ */
  //********Update Last Qcm*****************************************************
  const updateQcmHendler = async () => {
    LoadLastUpdatQcm();

    await axios
      .put(`https://goatqcm-instance.com/qcms/${getQcmId}`, editQcm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************************* */

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
        onClick={deleteLstQcm}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={updateQcmHendler}
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

export default BtnDeleteEditQcm;
