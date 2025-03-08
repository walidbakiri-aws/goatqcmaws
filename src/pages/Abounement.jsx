import { useEffect, useState } from "react";

import classes from "./Home.module.css";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UserService from "../compenent/layout/service/UserService";

import "react-toastify/dist/ReactToastify.css";

function Abounement(props) {
  const navigateValid = useNavigate();
  const user = props.user;
  const [VisibleAbounemet, setVisibleAbounemet] = useState(true);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);
  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "3000 DA ",
    },
    {
      nameAbn: "1ér Année Médecine",
      priceAbn: "1100 DA",
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
  const userFinal = {
    id: user.id,
    name: user.name,
    lasname: user.lastname,
    password: user.password,
    role: user.role,
  };

  //***************************************************************** */
  const [Abounement, setAbounemet] = useState({
    nameAbn: "",
    dateDbtAbn: "",
    dateExpdAbn: "",
    statusAbn: false,
    stateActiveLogin: false,
    adresseIp: "",
    ourUsers: userFinal,
  });

  //***************************************************************** */
  useEffect(() => {
    console.log(user);
  });

  //*************************************************************** */
  const handleAbounerBtn = async (abnIndex) => {
    const getFullAbn = abounementInf[abnIndex];
    Abounement.nameAbn = getFullAbn.nameAbn;

    setVisibleAbounemet(false);
    setVisibleValideAbounemet(true);
  };
  //******************************************************************* */
  const handleVaildeAbn = async () => {
    await axios
      .post("https://goatqcm-instance.com/abounement", Abounement)
      .then((res) => {
        toast.success(
          "votre abounemet a éte confirmer , visite la page pour continue"
        );

        UserService.logout();
        navigateValid("/");
      })
      .catch((err) => console.log(err));
  };
  //********************************************************************** */

  return (
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
      {VisibleValideAbounemet && (
        <div className={`${classes.valideabncontainer} card text-center`}>
          <div className="card-header">
            <h5>Abounemet validation</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">Methode de paiement</h5>
            <div className={`${classes.paymentdiv} `}>
              <ul style={{ color: "#3457D5" }}>
                <h6> 1-Paiment avec CCP</h6>
                <li className="list-group-item" style={{ color: "#000000" }}>
                  <h6>RIP : 00799999001630355448</h6>
                </li>
                <li className="list-group-item" style={{ color: "#000000" }}>
                  <h6>CCP : 16303554 clé 90 Bakiri walid</h6>
                </li>
              </ul>
              <ul style={{ color: "#3457D5" }}>
                <h6>2-A fin de terminer le paiment clicki sur Confirmer</h6>
              </ul>
            </div>
            <a
              href="/home"
              style={{ marginRight: 10 }}
              className="btn btn-danger"
            >
              Cancel
            </a>
            <button
              type="button"
              onClick={() => handleVaildeAbn()}
              className="btn btn-primary"
            >
              Confirmer
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}
export default Abounement;
