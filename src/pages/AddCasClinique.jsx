import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./AddCasClinique.module.css";
import BtnAddQcm from "../compenent/layout/BtnAddQcm";
import BtnDeleteEditCasClinique from "../compenent/layout/BtnDeleteEditCasClinique";
import AddQcmCasClinique from "./AddQcmCasClinique";
function AddCasClinique(props) {
  const [Year, setYear] = useState("");
  const [Groupe, setGroupe] = useState("");
  const [ShowQcmClinique, setShowQcmClinique] = useState(false);
  let { cours_id } = useParams();
  const token = localStorage.getItem("tokengoat");

  let getModel = "";
  let getYear = "";
  let getGroupe = "";
  let QcmId = "";
  const category = ["Externat Blida", "Résidanat Blida"];
  let getCategory = "";
  const [Category, setCategory] = useState("");
  const [VisibleGroupe, setVisibleGroupe] = useState(false);
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
    "2025",
  ];

  const [CasClinique, SetCasClinique] = useState({
    casCliniqueContent: "",
    casCliniqueGroupe: "",
    casCliniqueYear: "",
    qcmCliniqueModele: props.qcmModel,
    coursMed: {},
  });
  const [AddQcmClinique, setAddQcmClinique] = useState(false);
  const [btnAddQcm, setbtnAddQcm] = useState(true);
  const [btnDeleteEditQcm, setbtnDeleteEditQcm] = useState(false);

  //**load Cas Clinique**************************************************** */

  //************************************************************************ */
  //********get Cour me id ************************************************* */
  const getCour = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cours/${cours_id}`
    );
    console.log(result);
    CasClinique.coursMed = result.data;
  };
  //************************************************************************* */

  //*******handel onChanges Select*********************************** */

  const handleChangeYear = (event) => {
    getYear = event.target.value;
    setYear(getYear);
    CasClinique.casCliniqueYear = getYear;
    getCour();
  };
  const handleChangeGroupe = (event) => {
    getGroupe = event.target.value;
    setGroupe(getGroupe);
    CasClinique.casCliniqueGroupe = getGroupe;
  };
  const handleChangeCategory = (event) => {
    getCategory = event.target.value;
    setCategory(getCategory);
    CasClinique.category = getCategory;
    if (getCategory === "Externat Blida") {
      setVisibleGroupe(true);
    } else if (getCategory === "Résidanat Blida") {
      setVisibleGroupe(false);
    }
  };
  //************************************************************************* */
  //***************************************************************** */
  useEffect(() => {
    //loadLastqcm();
    console.log(cours_id);
  }, []);
  //****************submit qcm ****************************************/
  const onSubmitCasClinique = async (event) => {
    event.preventDefault();
    console.log(CasClinique);
    await axios
      .post("https://goatqcm-instance.com/casclinique", CasClinique, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddQcmClinique(true);
        setbtnAddQcm(false);

        setShowQcmClinique(true);
      })
      .catch((err) => console.log(err));
  };
  //**********************************************************************

  const CasCliniqueEdit = [
    CasClinique.casCliniqueContent,
    CasClinique.casCliniqueGroupe,
    CasClinique.casCliniqueYear,
    CasClinique.qcmCliniqueModele,
  ];
  //********************************************************************** */
  return (
    <>
      <div className={classes.addingdiv}>
        <form onSubmit={(e) => onSubmitCasClinique(e)}>
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
              required
              style={{ marginRight: 20 }}
              className={"form-select"}
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
                style={{ marginRight: 20 }}
                className={"form-select"}
                aria-label="Default select example"
                value={Groupe}
                onChange={handleChangeGroupe}
                required
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

          <div style={{ marginBottom: 20, width: 700 }} className="form-group">
            <textarea
              className="form-control"
              rows="8"
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
              {btnAddQcm && (
                <BtnAddQcm typeQcmCasClinique={"Add CasClinique"} />
              )}
            </div>
          </div>
        </form>
        <div>
          {ShowQcmClinique && <AddQcmCasClinique qcmModel={props.qcmModel} />}
        </div>
      </div>
    </>
  );
}
export default AddCasClinique;
