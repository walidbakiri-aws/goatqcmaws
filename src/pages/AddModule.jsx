import axios from "axios";
import classes from "./AddModule.module.css";
import React, { useState, useEffect } from "react";
import { effect } from "@preact/signals-react";
import NavigationBar from "../compenent/layout/NavigationBar";
import BtnAdd from "../compenent/layout/BtnAdd";
import { useSignal } from "@preact/signals-react";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
function AddModule() {
  const token = localStorage.getItem("tokengoat");

  const [AllYearsOfModule, setAllYearsOfModule] = useState([]);
  const [AllModules, setAllModules] = useState([]);
  const [SelectValYear, setSelectValyear] = useState("");
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  let getYearName = "";
  let letGetId = useSignal("");
  const [Module, setModule] = useState({
    moduleName: "",
    yearMed: {},
  });
  const currentModuleId = useSignal("");
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://goatqcm-instance.com/module", Module, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        loadSpecfYear(letGetId.value);
        loadMuduleOfYear(letGetId.value);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadYear();
  }, []);

  //**load module pour affhier fe select********************************
  const loadYear = async () => {
    const result = await axios.get("https://goatqcm-instance.com/medicalyear", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllYearsOfModule(result.data);
  };
  //********************************************************************** */

  //load specefique module pour ajour fe cours table***********************
  const loadSpecfYear = async (letGetId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/medicalyear/${letGetId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    Module.yearMed = result.data;
  };
  //********************************************************************** */

  //load all cours pour afficher *******************************************
  const loadMuduleOfYear = async (getYearID) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/medicalyear/${getYearID}/module`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAllModules(result.data);
  };
  //************************************************************************* */

  const handleChange = (event) => {
    getYearName = event.target.value;
    setSelectValyear(getYearName);

    AllYearsOfModule.map((getYear) => {
      try {
        if (getYear.yearName === getYearName) {
          letGetId.value = getYear.id;
          loadSpecfYear(letGetId.value);
          loadMuduleOfYear(letGetId.value);
          console.log(letGetId.value);
          console.log(Module.yearMed);
        }
      } catch {}
    });
  };

  //delete function*//////////////////////////////////////////////////////////
  const deletModule = async (moduleId) => {
    await axios.delete(`https://goatqcm-instance.com/module/${moduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadMuduleOfYear(letGetId.value);
  };
  //////////////////////////////////////////////////////////////////////////////

  //**********eidte module*********************** */
  function EditeHandler(moduleId) {
    setMoladIsOpen(true);
    currentModuleId.value = moduleId;
  }
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  //********************************************** */

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
                value={SelectValYear}
                onChange={handleChange}
              >
                <option value="" disabled="disabled">
                  Select Year
                </option>
                {AllYearsOfModule.map((YearModule, index) => (
                  <option key={index} value={YearModule.yearName}>
                    {YearModule.yearName}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <label>Modules</label>
              <div className="d-flex justify-content-center">
                <div className="input-group w-auto">
                  <input
                    type={"text"}
                    required
                    className="form-control"
                    placeholder="Add Module"
                    aria-describedby="button-addon1"
                    onChange={(e) =>
                      setModule({ ...Module, moduleName: e.target.value })
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
                    <th>Modules List</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {AllModules.map((getModule, index) => (
                    <tr key={getModule.id}>
                      <th scope="row" key={index}>
                        {getModule.id}
                      </th>
                      <td>{getModule.moduleName}</td>
                      <td className="mx-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => EditeHandler(getModule.id)}
                        >
                          Edite
                        </button>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deletModule(getModule.id)}
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
          moduleId={currentModuleId.value}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}
export default AddModule;
