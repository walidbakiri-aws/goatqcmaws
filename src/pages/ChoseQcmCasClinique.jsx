import { useSignal } from "@preact/signals-react/runtime";
import BtnAdd from "../compenent/layout/BtnAdd";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./ChoseQcmCasClinique.module.css";
import { useEffect, useState } from "react";
import AddQcm from "./AddQcm";
import AddCasClinique from "./AddCasClinique";
import { useNavigate, useParams } from "react-router-dom";
function ChoseQcmCasClinique() {
  const [QcmLayout, setQcmLayout] = useState(false);
  const [CasCliniqueLayout, setCasCliniqueLayout] = useState(false);
  const modeles = ["Qcm", "Cas Clinique"];
  const Modele = useSignal("");
  let { cours_id } = useParams();
  //**************handel select type Qcm cas Clinique********* */
  let navigateQcm = useNavigate();
  let navigateCasClinique = useNavigate();
  const handleChangeModele = (event) => {
    Modele.value = event.target.value;
    console.log(Modele.value);
    if (Modele.value === "Qcm") {
      setQcmLayout(true);
      setCasCliniqueLayout(false);
      let path = `/cours/${cours_id}/qcms`;
      navigateQcm(path);
    } else if (Modele.value === "Cas Clinique") {
      setCasCliniqueLayout(true);
      setQcmLayout(false);
      let path = `/cours/${cours_id}/casclinique`;
      navigateCasClinique(path);
    }
  };

  //******************************************************** */
  return (
    <>
      <NavigationBar />

      <div className={classes.selectqcm}>
        <select
          className="form-select"
          aria-label="Default select example"
          value={Modele}
          onChange={handleChangeModele}
        >
          <option value="" disabled="disabled">
            Select Qcm Modele
          </option>
          {modeles.map((modele, index) => (
            <option key={index}>{modele}</option>
          ))}
        </select>
      </div>
      {QcmLayout && <AddQcm qcmModel={Modele.value} />}
      {CasCliniqueLayout && <AddCasClinique qcmModel={Modele.value} />}
    </>
  );
}
export default ChoseQcmCasClinique;
