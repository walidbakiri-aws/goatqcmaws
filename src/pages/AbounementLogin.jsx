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
function AbounementLogin(props) {
  const navigateValid = useNavigate();
  const navigateLogin = useNavigate();
  const user = props.user;
  const [VisibleAbounemet, setVisibleAbounemet] = useState(true);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);
  const abonnementName = useSignal("");

  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "2000 DA",
    },
    {
      nameAbn: "Résidanat 2026",
      priceAbn: "4900 DA",
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

    const formData = new FormData();
    formData.append("email", email);
    formData.append("abonnement", abonnementName.value); // fixed value
    formData.append("photo", file);

    try {
      await axios.post(
        "https://goatqcm-instance.com/checkabounement",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccess(true);
      alert("Données envoyées avec succès !");
      setEmail("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi");
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
    navigateValid("/register");
  };
  //********************************************************************** */

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
            <a
              href="/home"
              style={{ marginRight: 10 }}
              className="btn btn-danger"
              onClick={() => {
                navigateValid("/");
              }}
              to="/"
            >
              Annuler
            </a>
            {success && (
              <button
                type="button"
                onClick={handleVaildeAbn}
                className="btn btn-primary"
              >
                Suivant
              </button>
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
              <a
                href="/home"
                style={{ marginRight: 10 }}
                className="btn btn-danger"
              >
                Annuler
              </a>
              {success && (
                <button
                  type="button"
                  onClick={handleVaildeAbn}
                  className="btn btn-primary"
                >
                  Suivant
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
export default AbounementLogin;
