import classes from "./AddYear.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavigationBar from "../compenent/layout/NavigationBar";
import BtnAdd from "../compenent/layout/BtnAdd";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

import { useSignal } from "@preact/signals-react/runtime";
function AddYear() {
  const currentYearId = useSignal("");
  const token = localStorage.getItem("tokengoat");

  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const [year, setYear] = useState({
    yearName: "",
  });

  const { yearName } = year;
  useEffect(() => {
    loadYears();
  }, []);

  const [AllYears, setAllYears] = useState([]);
  const loadYears = async () => {
    const result = await axios.get("https://goatqcm-instance.com/medicalyear", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllYears(result.data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://goatqcm-instance.com/medicalyear", year, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(year.yearName);
        loadYears();
      })
      .catch((err) => console.log(err));
  };

  const deletYear = async (id) => {
    await axios.delete(`https://goatqcm-instance.com/medicalyear/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadYears();
  };
  function EditeHandler(yearId) {
    setMoladIsOpen(true);
    currentYearId.value = yearId;
  }
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        <div className={classes.contanerspace}>
          <div className={`${classes.quizcontainer} `}>
            <form onSubmit={(e) => onSubmit(e)}>
              <label>Medical Year</label>
              <div className="d-flex justify-content-center">
                <div className="input-group w-auto">
                  <input
                    type={"text"}
                    required
                    className="form-control"
                    placeholder="Add Year"
                    aria-describedby="button-addon1"
                    onChange={(e) =>
                      setYear({ ...year, yearName: e.target.value })
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
                    <th>Year List</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {AllYears.map((year, index) => (
                    <tr key={year.id}>
                      <th scope="row" key={index}>
                        {year.id}
                      </th>
                      <td>{year.yearName}</td>
                      <td className="mx-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => EditeHandler(year.id)}
                        >
                          Edite
                        </button>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deletYear(year.id)}
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
          yearId={currentYearId.value}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}
export default AddYear;
