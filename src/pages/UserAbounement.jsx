import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./UserAbounement.module.css";
import DateObject from "react-date-object";
import { useSignal } from "@preact/signals-react";

function UserAbounement() {
  const [userAbn, setUsersAbn] = useState([]);
  const UpdtAbn = {
    dateDbtAbn: "",
    dateExpdAbn: "",
    statusAbn: "",
  };
  const setExpdDateUpdate = useSignal("");
  const abounementDates = [
    {
      nameAbn: "Résidanat 2025",
      dateExp: "2025-10-18",
    },
    {
      nameAbn: "Résidanat 2026",
      dateExp: "2026-10-18",
    },
    {
      nameAbn: "1ér Année Médecine",
      dateExp: "2025-07-29",
    },
    {
      nameAbn: "2éme Année Médecine",
      dateExp: "2025-07-29",
    },
    {
      nameAbn: "3éme Année Médecine",
      dateExp: "2025-07-29",
    },
    {
      nameAbn: "4éme Année Médecine",
      dateExp: "2025-07-29",
    },
    {
      nameAbn: "5éme Année Médecine",
      dateExp: "2025-07-29",
    },
    {
      nameAbn: "6éme Année Médecine",
      dateExp: "2025-07-29",
    },
  ];
  const token = localStorage.getItem("tokengoat");
  const Date = new DateObject();
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  useEffect(() => {
    loadAllAbounement();
  }, []);
  //**get all abounement not validate*************************** */

  const loadAllAbounement = async () => {
    const result = await axios.get(
      "https://goatqcm-instance.com/admin/abounement/allusers",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUsersAbn(result.data);
  };
  //************************************************************** */
  //****************submit qcm ****************************************/
  const handleValidateBtn = async (getAbnId, getAbnName) => {
    console.log(getAbnName);
    for (let i = 0; i < abounementDates.length; i++) {
      if (abounementDates[i].nameAbn === getAbnName) {
        setExpdDateUpdate.value = abounementDates[i].dateExp;
        console.log(setExpdDateUpdate.value);
      }
    }
    console.log("we her");
    UpdtAbn.dateDbtAbn = Date.format("YYYY-MM-DD");
    UpdtAbn.dateExpdAbn = setExpdDateUpdate.value;
    UpdtAbn.statusAbn = true;
    await axios
      .put(
        `https://goatqcm-instance.com/admin/updateabounement/${getAbnId}`,
        UpdtAbn,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  //**********************************************************************
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        <div className={classes.contanerspace}>
          <div className="container">
            <div className="py-4">
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name Abounement</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userAbn.map((user, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{user.id}</td>
                      <td>{user.nameAbn}</td>
                      <td>{user.ourUsers.username}</td>
                      <td>
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={(e) => {
                            handleValidateBtn(user.id, user.nameAbn);
                          }}
                        >
                          Validate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAbounement;
