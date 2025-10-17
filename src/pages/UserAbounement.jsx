// src/pages/UserAbounement.jsx
import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./UserAbounement.module.css";
import DateObject from "react-date-object";
import { useSignal } from "@preact/signals-react";

function UserAbounement() {
  const [userAbn, setUsersAbn] = useState([]);
  const [paidList, setPaidList] = useState([]); // 🟢 store all paid emails
  const [ShowSideBare, setShowSideBare] = useState(false);
  const setExpdDateUpdate = useSignal("");

  const token = localStorage.getItem("tokengoat");
  const Date = new DateObject();

  const UpdtAbn = {
    dateDbtAbn: "",
    dateExpdAbn: "",
    statusAbn: "",
  };

  const abounementDates = [
    { nameAbn: "Résidanat 2024", dateExp: "2024-10-28" },
    { nameAbn: "Résidanat 2025", dateExp: "2025-10-28" },
    { nameAbn: "Résidanat 2026", dateExp: "2026-10-28" },
    { nameAbn: "1ér Année Médecine", dateExp: "2026-10-20" },
    { nameAbn: "2éme Année Médecine", dateExp: "2026-10-20" },
    { nameAbn: "3éme Année Médecine", dateExp: "2026-10-20" },
    { nameAbn: "4éme Année Médecine", dateExp: "2026-10-20" },
    { nameAbn: "5éme Année Médecine", dateExp: "2026-10-20" },
    { nameAbn: "6éme Année Médecine", dateExp: "2026-10-20" },
  ];

  function etatsidebare(etat) {
    setShowSideBare(etat);
  }

  // 🟢 Load data on mount
  useEffect(() => {
    loadAllAbounement();
    loadPaidEmails();
  }, []);

  // 🟣 Get all Abounements (pending validation)
  const loadAllAbounement = async () => {
    try {
      const result = await axios.get(
        "https://goatqcm-instance.com/admin/abounement/allusers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsersAbn(result.data);
    } catch (err) {
      console.error("Erreur lors du chargement des abounements:", err);
    }
  };

  // 🟢 Load all paid emails from CheckAbounement
  const loadPaidEmails = async () => {
    try {
      const res = await axios.get(
        "https://goatqcm-instance.com/admin/checkabounement",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(res.data)) {
        const emails = res.data
          .map((item) => item.email?.trim().toLowerCase())
          .filter(Boolean);
        console.log("✅ All paid emails:", emails);
        setPaidList(emails);
      } else {
        console.warn("⚠️ Unexpected response format:", res.data);
        setPaidList([]);
      }
    } catch (err) {
      console.error("❌ Erreur lors du chargement des paiements:", err);
    }
  };

  // 🟣 Validate subscription
  const handleValidateBtn = async (getAbnId, getAbnName, email) => {
    const match = abounementDates.find((a) => a.nameAbn === getAbnName);
    if (match) setExpdDateUpdate.value = match.dateExp;

    UpdtAbn.dateDbtAbn = Date.format("YYYY-MM-DD");
    UpdtAbn.dateExpdAbn = setExpdDateUpdate.value;
    UpdtAbn.statusAbn = true;

    try {
      await axios.put(
        `https://goatqcm-instance.com/admin/updateabounement/${getAbnId}`,
        UpdtAbn,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ After success, delete the CheckAbounement by email
      await deleteCheckAbn(email);

      // Optional: refresh table
      await loadAllAbounement();
      await loadPaidEmails();

      console.log(
        `✅ Validation done and CheckAbounement deleted for ${email}`
      );
    } catch (err) {
      console.error("Erreur lors de la validation:", err);
    }
  };

  // 🧹 Delete CheckAbounement by email
  const deleteCheckAbn = async (email) => {
    try {
      await axios.delete(
        `https://goatqcm-instance.com/admin/checkabounement/byemail/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Erreur lors de la suppression du reçu:", err);
    }
  };
  const handleDeteleUser = async (userId) => {
    try {
      await axios.delete(`https://goatqcm-instance.com/abounement/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadAllAbounement();
      loadPaidEmails();
    } catch (err) {
      console.error("Erreur lors de la suppression du reçu:", err);
    }
  };
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
                    <th>#</th>
                    <th>Id</th>
                    <th>Name Abounement</th>
                    <th>User Email</th>
                    <th>Status</th>
                    <th>Validat</th>
                    <th>Delate</th>
                  </tr>
                </thead>
                <tbody>
                  {userAbn.map((user, index) => {
                    const email = user.ourUsers.username || "";
                    const isPaid = paidList.includes(email.toLowerCase());
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.nameAbn}</td>
                        <td>{email}</td>
                        <td>
                          {isPaid ? (
                            <span
                              style={{
                                backgroundColor: "#d4edda",
                                color: "#155724",
                                padding: "5px 10px",
                                borderRadius: "10px",
                                fontWeight: "600",
                              }}
                            >
                              ✅ Payé
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#f8d7da",
                                color: "#721c24",
                                padding: "5px 10px",
                                borderRadius: "10px",
                                fontWeight: "600",
                              }}
                            >
                              ❌ Non payé
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              handleValidateBtn(user.id, user.nameAbn)
                            }
                          >
                            Valider
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeteleUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
