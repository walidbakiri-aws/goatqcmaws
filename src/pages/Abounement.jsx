import { useEffect, useState } from "react";

import classes from "./Home.module.css";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";

function Abounement(props) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigateValid = useNavigate();
  const user = props.user;
  const [VisibleAbounemet, setVisibleAbounemet] = useState(true);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);
  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "800 DA ",
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
        console.log("eyy");
        UserService.logout();
        navigateValid("/");
      })
      .catch((err) => console.log(err));
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
            
            
             
            <button
              type="button"
              onClick={() => handleVaildeAbn()}
              className="btn btn-primary"
            >
               Click ici pour Confirmer
            </button>
          </div>
        </div>
      )}
       {VisibleValideAbounemet && isTabletOrMobile && (
        <div className={`${classes.valideabncontainer_phone} card text-center`}>
          <div className="card-header">
            <h5>Abounemet validation</h5>
          </div>
          <div className="card-body">
            
             
           
            <button
              type="button"
              onClick={() => handleVaildeAbn()}
              className="btn btn-primary"
            >
              Click ici pour Confirmer
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
export default Abounement;
