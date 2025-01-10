import classes from "./AddCours.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import BackdropDeleteCour from "./BackdropDeleteCour";
import ModalDeleteCour from "./ModalDeleteCour";
function AddCours() {
  const token = localStorage.getItem("tokengoat");

  const [AllModules, setAllModules] = useState([]);
  const [AllCoursOfModule, setAllYearsOfModule] = useState([]);
  const [SelectValCour, setSelectValCour] = useState("");
  const currentCourId = useSignal("");
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const [year, setYear] = useState({
    yearName: "",
  });
  const [Cours, setCours] = useState({
    coursName: "",
    moduleMed: {},
  });
  let getModuleName = "";
  let letGetModuleId = useSignal("");

  useEffect(() => {}, []);
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://goatqcm-instance.com/cours", Cours, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        loadSpecfModule(letGetModuleId.value);
        loadCoursOfModule(letGetModuleId.value);
      })
      .catch((err) => console.log(err));
  };

  //load les modules de selction options*************************************
  const loadModulesSelet = async () => {
    const result = await axios.get(
      "https://goatqcm-instance.com/medmodule/getall/module",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setAllModules(result.data);
  };
  //*********************************************************************** */

  //load specefique module por ajouter module a cours table******************
  const loadSpecfModule = async (letGetModuleId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/module/${letGetModuleId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    Cours.moduleMed = result.data;
  };

  //************************************************************************* */

  //load all cours pour afficher de selection module *************************
  const loadCoursOfModule = async (letGetModuleId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/module/${letGetModuleId}/cours`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAllYearsOfModule(result.data);
  };
  //************************************************************************* */

  const handleClickModule = (event) => {
    loadModulesSelet();
  };
  const handleChange = (event) => {
    getModuleName = event.target.value;
    setSelectValCour(getModuleName);

    AllModules.map((getModule) => {
      try {
        if (getModule.moduleName === getModuleName) {
          letGetModuleId.value = getModule.id;
          loadSpecfModule(letGetModuleId.value);
          loadCoursOfModule(letGetModuleId.value);
          // console.log(getModule.moduleName);
        }
      } catch {}
    });
  };

  //edite  function*//////////////////////////////////////////////////////////
  function EditeHandler(courId) {
    setMoladIsOpen(true);
    currentCourId.value = courId;
  }
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  /////////////////////////////////////////////////////////////////////////////
  //delete function*//////////////////////////////////////////////////////////
  const deletCours = async (courId) => {
    currentCourId.value = courId;
    setModalDeleteCourIsOpen(true);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        <div className={classes.contanerspace}>
          <div className={`${classes.quizcontainer} `}>
            <div style={{ marginLeft: 600, width: 300 }} className="container">
              <select
                className="form-select"
                aria-label="Default select example"
                value={SelectValCour}
                onChange={handleChange}
                onClick={handleClickModule}
              >
                <option value="selectval">Select Module</option>
                {AllModules.map((Module, index) => (
                  <option key={index} value={Module.moduleName}>
                    {Module.moduleName}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <label>Cours</label>
              <div className="d-flex justify-content-center">
                <div className="input-group w-auto">
                  <input
                    type={"text"}
                    required
                    className="form-control"
                    placeholder="Add Cours"
                    aria-describedby="button-addon1"
                    onChange={(e) =>
                      setCours({ ...Cours, coursName: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-primary mx-1"
                    type="submit"
                    id="button-addon1"
                    data-mdb-ripple-color="dark"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            <section>
              <table className="table table-bordered table-hover shadow">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Cours List</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {AllCoursOfModule.map((getCours, index) => (
                    <tr key={getCours.id}>
                      <th scope="row" key={index}>
                        {getCours.id}
                      </th>
                      <td>
                        <Link to={`/cours/${getCours.id}`}>
                          {getCours.coursName}
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            EditeHandler(getCours.id);
                          }}
                        >
                          Edite
                        </button>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deletCours(getCours.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <Modal
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
          courId={currentCourId.value}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      {modalDeleteCourIsOpen && (
        <ModalDeleteCour
          onCancel={closeDeleteModalHandler}
          onConfirm={closeDeleteModalHandler}
          courId={currentCourId.value}
        />
      )}
      {modalDeleteCourIsOpen && (
        <BackdropDeleteCour onCancel={closeDeleteModalHandler} />
      )}
    </>
  );
}

export default AddCours;
