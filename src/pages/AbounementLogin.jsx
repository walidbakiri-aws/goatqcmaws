import { useEffect, useState } from "react";

import classes from "./AbounementLogin.module.css";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";
import received from "../compenent/layout/img/received.png";
import seconnecter from "../compenent/layout/img/seconnecter.png";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import BackdropDeleteCour from "./BackdropDeleteCour";
function AbounementLogin(props) {
  const navigateValid = useNavigate();
  const navigateLogin = useNavigate();
  const user = props.user;
  const [VisibleAbounemet, setVisibleAbounemet] = useState(true);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);
  const [visibleSendRecueDiv, setVisibleSendRecueDiv] = useState(true);
  const [visibleSeConnecterDiv, setVisibleSeConnecterDiv] = useState(false);
  const abonnementName = useSignal("");
  const [showAlreadySentDiv, setShowAlreadySentDiv] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const abounementInf = [
    {
      nameAbn: "Résidanat 2026",
      priceAbn: "4500 DA",
    },
    {
      nameAbn: "1ér Année Médecine",
      priceAbn: "1500 DA",
    },
    {
      nameAbn: "2éme Année Médecine",
      priceAbn: "1500 DA",
    },
    {
      nameAbn: "3éme Année Médecine",
      priceAbn: "1500 DA",
    },
    {
      nameAbn: "4éme Année Médecine",
      priceAbn: "1500 DA",
    },
    {
      nameAbn: "5éme Année Médecine",
      priceAbn: "1500 DA",
    },
    {
      nameAbn: "6éme Année Médecine",
      priceAbn: "1500 DA",
    },
  ];
  /***************************************** */
  const UpdtAbnDeconnect = {
    stateActiveLogin: false,
  };
  //************************************************* */

  //***************************************************************** */

  //***************************************************************** */

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {});
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false); // controls Suivant visibility
  const [fileName, setFileName] = useState("Aucun fichier choisi");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "Aucun fichier choisi");
  };

  const handleSubmit = async () => {
    if (!email || !file) {
      alert("Email et image sont obligatoires !");
      return;
    }

    try {
      setIsLoading(true); // show loader

      let emailExists = false;

      try {
        const checkResponse = await axios.get(
          `https://goatqcm-instance.com/checkabounementuser/byemail/${email}`
        );
        if (checkResponse.status === 200) {
          emailExists = true;
        }
      } catch (error) {
        // If backend returns 404, treat as not found → safe to post
        if (error.response && error.response.status === 404) {
          emailExists = false;
        } else {
          console.warn("Vérification email ignorée:", error.message);
          // In case of 403 or network issue, assume it's not found to avoid blocking
          emailExists = false;
        }
      }

      // If email already exists → show popup and stop here
      if (emailExists) {
        setShowAlreadySentDiv(true);
        setVisibleSendRecueDiv(false);
        setVisibleSeConnecterDiv(false);
        setIsLoading(false);
        return;
      }

      // Proceed with POST if email not found
      const formData = new FormData();
      formData.append("email", email);
      formData.append("abonnement", abonnementName.value);
      formData.append("photo", file);

      await axios.post(
        "https://goatqcm-instance.com/checkabounementuser",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Le reçu a été envoyé avec succès !");
      setVisibleSendRecueDiv(false);
      setSuccess(true);
      setVisibleSeConnecterDiv(true);
      setEmail("");
      setFile(null);
      setShowAlreadySentDiv(false);
    } catch (err) {
      console.error("Erreur lors de l’envoi du reçu :", err);
      alert("Erreur lors de l’envoi du reçu");
    } finally {
      setIsLoading(false); // hide loader
    }
  };

  //*************************************************************** */
  const handleAbounerBtn = async (abnName) => {
    setVisibleAbounemet(false);
    setVisibleValideAbounemet(true);
    abonnementName.value = abnName;
  };
  //******************************************************************* */
  const handleVaildeAbn = async () => {
    UserService.logout();
    navigateValid("/");
  };
  //********************************************************************** */
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setShowAlreadySentDiv(false);
  }
  //**************************************************** */
  return (
    <>
      {isDesktopOrLaptop && (
        <>
          {VisibleAbounemet && (
            <div className={classes.abncard}>
              <div className={`${classes.cardabnprincipale} card py-1`}>
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Abounement</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abounementInf.map((abounement, index) => (
                      <tr key={index}>
                        <td>
                          <h5>{abounement.nameAbn}</h5>
                        </td>
                        <td>
                          <h5 style={{ color: "#318CE7" }}>
                            {abounement.priceAbn}
                          </h5>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) =>
                              handleAbounerBtn(abounement.nameAbn)
                            }
                          >
                            Abouner
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      {isTabletOrMobile && (
        <>
          {VisibleAbounemet && (
            <div className={classes.abncard_phone}>
              <div className={`${classes.cardabnprincipale_phone} card py-1`}>
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Abounement</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abounementInf.map((abounement, index) => (
                      <tr key={index}>
                        <td>
                          <h5>{abounement.nameAbn}</h5>
                        </td>
                        <td>
                          <h5 style={{ color: "#318CE7" }}>
                            {abounement.priceAbn}
                          </h5>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => handleAbounerBtn(index)}
                          >
                            Abouner
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {VisibleValideAbounemet && isDesktopOrLaptop && (
        <div className={`${classes.valideabncontainer} card text-center`}>
          <div className="card-header">
            <h5>Abounemet validation</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">Methode de paiement</h5>
            <div className={`${classes.paymentdiv} `}>
              <ul style={{ color: "#3457D5" }}>
                <h6> Paiment avec Baridi</h6>
                <li className="list-group-item" style={{ color: "#000000" }}>
                  <h6>RIP : 00799999001630355448</h6>
                </li>
                <h6> Paiment avec CCP</h6>
                <li className="list-group-item" style={{ color: "#000000" }}>
                  <h6>CCP : 16303554 clé 90 Bakiri walid</h6>
                </li>
              </ul>
            </div>

            {visibleSendRecueDiv && (
              <div
                className="card text-center p-3"
                style={{ maxWidth: "400px", margin: "auto" }}
              >
                <h5>Importer la preuve de paiement</h5>

                <input
                  style={{ width: "300px", margin: "5px", height: "50px" }}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>

                <div>
                  <h6>Reçu de paiement</h6>
                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <img src={received} alt="Upload" width="40" />
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />

                  <input
                    type="text"
                    value={fileName}
                    readOnly
                    className="form-control"
                  />
                </div>

                <button onClick={handleSubmit} className="btn btn-primary">
                  Envoyer
                </button>
              </div>
            )}
            {visibleSeConnecterDiv && (
              <div>
                {success && (
                  <button
                    type="button"
                    onClick={handleVaildeAbn}
                    className="btn btn-primary"
                  >
                    Suivant
                  </button>
                )}
                <img src={seconnecter} alt="Upload" width="400" height="500" />
              </div>
            )}
          </div>
        </div>
      )}

      {VisibleValideAbounemet && isTabletOrMobile && (
        <div className={`${classes.fullvalidecontainer_phone}  `}>
          <div
            className={`${classes.valideabncontainer_phone} card text-center`}
          >
            <div className="card-header">
              <h5>Abounemet validation</h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">Methode de paiement</h5>
              <div className={`${classes.paymentdiv_phone} `}>
                <ul style={{ color: "#3457D5" }}>
                  <h6> Paiment avec Baridi</h6>
                  <li className="list-group-item" style={{ color: "#000000" }}>
                    <h6>RIP : 00799999001630355448</h6>
                  </li>
                  <h6> Paiment avec CCP</h6>
                  <li className="list-group-item" style={{ color: "#000000" }}>
                    <h6>CCP : 16303554 clé 90 Bakiri walid</h6>
                  </li>
                </ul>
              </div>
              {visibleSendRecueDiv && (
                <div
                  className="card text-center p-3"
                  style={{ maxWidth: "400px", margin: "auto" }}
                >
                  <h5>Importer la preuve de paiement</h5>

                  <input
                    style={{ width: "300px", margin: "5px", height: "50px" }}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>

                  <div>
                    <h6>Reçu de paiement</h6>
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                      <img src={received} alt="Upload" width="40" />
                    </label>

                    <input
                      id="file-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />

                    <input
                      type="text"
                      value={fileName}
                      readOnly
                      className="form-control"
                    />
                  </div>

                  <button onClick={handleSubmit} className="btn btn-primary">
                    Envoyer
                  </button>
                </div>
              )}

              {visibleSeConnecterDiv && (
                <div>
                  {success && (
                    <button
                      type="button"
                      onClick={handleVaildeAbn}
                      className="btn btn-primary"
                    >
                      Suivant
                    </button>
                  )}{" "}
                  <img
                    src={seconnecter}
                    alt="Upload"
                    width="250"
                    height="300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showAlreadySentDiv && isDesktopOrLaptop && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            textAlign: "center",
            zIndex: 9999,
            width: 700,
            hight: 600,
          }}
        >
          <h5>Votre reçu a été déjà envoyé</h5>
          <p>Se connecter maintenant</p>
          <button
            onClick={handleVaildeAbn}
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Suivant
          </button>
          <img src={seconnecter} alt="Upload" width="250" height="300" />
        </div>
      )}
      {isDesktopOrLaptop && showAlreadySentDiv && <BackdropDeleteCour />}

      {showAlreadySentDiv && isTabletOrMobile && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            textAlign: "center",
            zIndex: 9999,
          }}
        >
          <h5>Votre reçu a été déjà envoyé</h5>
          <p>Se connecter maintenant</p>
          <button
            onClick={handleVaildeAbn}
            className="btn btn-primary"
            style={{ marginTop: "10px", marginBottom: "5px" }}
          >
            Suivant
          </button>
          <img src={seconnecter} alt="Upload" width="250" height="300" />
        </div>
      )}
      {isTabletOrMobile && showAlreadySentDiv && <BackdropDeleteCour />}

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px 50px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <h5 className="mt-3">Veuillez patienter, envoi en cours...</h5>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
export default AbounementLogin;
