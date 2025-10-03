import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./NewAbonnement.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import UserService from "../compenent/layout/service/UserService";

function NewAbonnement() {
  const [ShowSideBare, setShowSideBare] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const [abonnements, setAbonnements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    fetchAbonnements();
  }, []);

  const fetchAbonnements = async () => {
    try {
      const res = await axios.get(
        "https://goatqcm-instance.com/admin/checkabounement",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAbonnements(res.data);
    } catch (err) {
      console.error(
        "Erreur lors du chargement:",
        err.response?.data || err.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet abonnement ?")) return;
    try {
      await axios.delete(
        `https://goatqcm-instance.com/admin/checkabounement/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAbonnements((prev) => prev.filter((abn) => abn.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <NavigationBar changeetatsidebar={setShowSideBare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>

        {isDesktopOrLaptop && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer}>
              <h3>Liste des Abonnements</h3>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Abonnement</th>
                    <th>Photo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {abonnements.map((abn) => (
                    <tr key={abn.id}>
                      <td>{abn.email}</td>
                      <td>{abn.abonnement}</td>
                      <td>
                        {abn.photo && (
                          <img
                            src={`data:image/jpeg;base64,${abn.photo}`}
                            alt="preuve"
                            width="60"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setSelectedImage(
                                `data:image/jpeg;base64,${abn.photo}`
                              )
                            }
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(abn.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
{isTabletOrMobile && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer}>
              <h3>Liste des Abonnements</h3>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Abonnement</th>
                    <th>Photo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {abonnements.map((abn) => (
                    <tr key={abn.id}>
                      <td>{abn.email}</td>
                      <td>{abn.abonnement}</td>
                      <td>
                        {abn.photo && (
                          <img
                            src={`data:image/jpeg;base64,${abn.photo}`}
                            alt="preuve"
                            width="60"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setSelectedImage(
                                `data:image/jpeg;base64,${abn.photo}`
                              )
                            }
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(abn.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.quizzContainer_phone}></div>
        )}

        {/* Image modal */}
        {selectedImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="preview"
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default NewAbonnement;
