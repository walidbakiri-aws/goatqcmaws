import { useEffect, useState } from "react";

import classes from "./AbounementLogin.module.css";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";

function AbounementLogin(props) {
  const navigateValid = useNavigate();
  const navigateLogin = useNavigate();
  const user = props.user;
  const [VisibleAbounemet, setVisibleAbounemet] = useState(true);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);

  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "2000 DA",
    },
    {
      nameAbn: "Résidanat 2026",
      priceAbn: "4600 DA",
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

  //*************************************************************** */
  const handleAbounerBtn = async (abnIndex) => {
    setVisibleAbounemet(false);
    setVisibleValideAbounemet(true);
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
            <button
              type="button"
              onClick={() => handleVaildeAbn()}
              className="btn btn-primary"
            >
              c bon j'ai déja payé
            </button>
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
              <a
                href="/home"
                style={{ marginRight: 10 }}
                className="btn btn-danger"
              >
                Annuler
              </a>
              <button
                type="button"
                onClick={() => handleVaildeAbn()}
                className="btn btn-primary"
              >
                c bon j'ai déja payé
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
export default AbounementLogin;
