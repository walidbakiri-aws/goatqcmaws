import { useEffect, useState } from "react";

import classes from "./AbounementPhone.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ramadan from "../compenent/layout/img/Ramadan.png";
import deuxversionlogin from "../compenent/layout/img/deuxversionlogin.png";
import statique from "../compenent/layout/img/statique.jpg";
import "react-toastify/dist/ReactToastify.css";

function AbounementPhone() {
  const navigateValid = useNavigate();

  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "2000 DA",
    },
    {
      nameAbn: "Externat Blida",
      priceAbn: "500 DA",
    },
  ];

  //***************************************************************** */
  useEffect(() => {});

  return (
    <>
      <div className={classes.fullpub}>
        <div className={classes.parcoursujetpub_phone}>
          <div className={classes.parcoursujetpubtext_phone}>
            Révision intelligente, double efficacité ! <br />
            🚀 Par cours →<br />
            Progression structurée <br />
            🎯 Par sujets →<br /> Maîtrise ciblée Préparation simplifiée
            ↠maximisez votreréussite ! ✨
          </div>
          <div className={classes.deuxversionlogin}>
            <img
              style={{ width: 240, height: 200 }}
              src={deuxversionlogin}
            ></img>
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
        <div className={classes.statique_phone}>
          <div className={classes.statiquetext_phone}>
            📊 Statistiques de Réponses : Votre Boussole Pédagogique ! 🔍
            <br />
            Analysez les tendances, suivez la progression, agissez avec
            précision.
            <br />
            Des données claires pour des décisions éclairées ! 🚀
          </div>
          <div className={classes.statiqueicon}>
            <img style={{ width: 200, height: 240 }} src={statique}></img>
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>Résidanat 2025</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>2000 </span>DA
            <br></br>
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
       <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>Résidanat 2026</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>4500 </span>DA
            <br></br>
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>1ér Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 1ér Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>2éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 2éme Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>3éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 3éme Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>4éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 4éme Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>5éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 5éme Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>6éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>500</span>DA
          </p>
        </div>
        <div className={`${classes.card_content_phone}`}>
          <ul>
            <li>
              <i className="fa fa-check-circle"></i>Tous les Modules 6éme Année
            </li>

            <li>
              <i className="fa fa-check-circle"></i>Correction Fiable
            </li>
            <li>
              <i className="fa fa-check-circle"></i>Avec Explication
            </li>
          </ul>
          <button>
            <a href="/register">Registrer</a>
          </button>
        </div>
      </div>
    </>
  );
}
export default AbounementPhone;
