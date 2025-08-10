import { useEffect, useState } from "react";

import classes from "./AbounementPhone.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ramadan from "../compenent/layout/img/Ramadan.png";

import logparsujet from "../compenent/layout/img/logparsujet.mp4";
import logchatdeep from "../compenent/layout/img/logchatdeep.mp4";
import logpub from "../compenent/layout/img/logpub.mp4";
import logdiscu from "../compenent/layout/img/logdiscu.jpg";
import logcomment from "../compenent/layout/img/logcomment.jpg";
import logshareecran from "../compenent/layout/img/logshareecran.mp4";

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
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>Résidanat 2025</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>2000 </span>DA<br></br>
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
            <span>4500 </span>DA<br></br>
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
      <div className={classes.fullpub}>
        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            Révision intelligente, double efficacité ! <br />
            🚀 Par cours →<br />
            Progression structurée <br />
            🎯 Par sujets →<br /> Maîtrise ciblée Préparation simplifiée
            ↠maximisez votreréussite ! ✨
          </div>
          <div className={classes.puboptionimgvideo}>
            <video
              style={{}}
              src={logparsujet}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            📊 Statistiques de Réponses : Votre Boussole Pédagogique ! 🔍
            <br />
            Analysez les tendances, suivez la progression, agissez avec
            précision.
            <br />
            Des données claires pour des décisions éclairées ! 🚀
          </div>
          <div className={classes.puboptionimgvideo}>
            <img
              style={{ width: 300, height: 400, marginLeft: 30 }}
              src={statique}
            ></img>
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            🚀 Nouvelle fonctionnalité sur Goat Community ! Exprime-toi
            librement comme sur Facebook : <br />✅ Publie ce que tu veux, quand
            tu veux <br />✅ En mode anonyme si tu préfères rester discret{" "}
            <br />✅ Commente les statuts des autres <br />✅ Collabore
            facilement avec d’autres étudiants pour partager des idées et
            avancer ensemble !
          </div>
          <div className={classes.puboptionimgvideo}>
            <video style={{}} src={logpub} autoPlay loop muted playsInline />
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />

        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            🚀 ✨Faisons des QCM ensemble en temps réel Avec goat messanger !
          </div>
          <div className={classes.puboptionimgvideo}>
            <img
              style={{ width: 300, height: 400, marginLeft: 30 }}
              src={logdiscu}
            ></img>
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            ✨Les commentaires sur des QCMs d'après les étudiants !
          </div>
          <div className={classes.puboptionimgvideo}>
            <img
              style={{ width: 300, height: 400, marginLeft: 30 }}
              src={logcomment}
            ></img>
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
        <div className={classes.puboption_phone}>
          <div className={classes.puboptiontext_phone}>
            🚀 Faites des QCM avec vos amis en temps réel
            <br />
            ✅ Ouvrir un canal (maximum 5 amis)
            <br />
            ✅ Partage d’écran (tout ce qui se passe chez chaque participant est
            visible par tous — comme sur Zoom, mais ici tout le monde peut
            participer)
            <br />
            ✅ N’importe quel membre peut contribuer à la résolution des
            questions
            <br />
            ✅ Technologie peer-to-peer
            <br />
            ✅ Toute réponse donnée par un membre apparaît pour tout le monde !
            <br />
          </div>
          <div className={classes.puboptionimgvideo}>
            <video
              style={{}}
              src={logshareecran}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <hr className={`${classes.hr_phone} `} />
      </div>
    </>
  );
}
export default AbounementPhone;
