import { useEffect, useState } from "react";

import classes from "./AbounementPhone.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function AbounementPhone() {
  const navigateValid = useNavigate();

  const abounementInf = [
    {
      nameAbn: "Résidanat 2025",
      priceAbn: "4500 DA",
    },
    {
      nameAbn: "Externat Blida",
      priceAbn: "1500 DA",
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
            <ul>
              <li>
                <span>4500</span>DA
              </li>
              <li>
                <span>2 x 4000</span>DA
              </li>
              <li>
                <span>3 x 3500</span>DA
              </li>
            </ul>
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>1ér Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1100</span>DA
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>2éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1500</span>DA
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>3éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1500</span>DA
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>4éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1500</span>DA
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>5éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1500</span>DA
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
        </div>
      </div>
      <div className={classes.cardfinal_phone}>
        <div className={`${classes.card_title_phone}`}>
          <h2>6éme Année Médecine</h2>
          <p>
            <i className="fa fa-rupee"></i>
            <span>1500</span>DA
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
        </div>
      </div>
    </>
  );
}
export default AbounementPhone;
