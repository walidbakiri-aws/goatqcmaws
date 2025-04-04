import classes from "./Abounement.module.css";
import ramadan from "../img/Ramadan.png";

function Abounement() {
  const abdounement = [
    {
      AbdounmentName: "Résidant",
      AbdounementDesc: "tous les modules 2éme jsq 6éme Année",
    },
    {
      AbdounmentName: "Résidant",
      AbdounementDesc: "tous les modules 2éme jsq 6éme Année",
    },
  ];

  return (
    <>
      <div className={classes.container}>
        <div className={classes.fullabaounement}>
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>Résidanat 2025</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>4500 </span>DA<br></br>
                
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <img src={ramadan} height="160px" width="100%" />
            </div>
          </div>
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>1ér Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>500</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i>1ér Année Medecine
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
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>2éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1500</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <div className={`${classes.card_title}`}>
                <p>
                  <i className="fa fa-rupee"></i>
                  <span>u-03 300</span> DA<br></br>
                  <span>2 X 500</span>DA
                </p>
              </div>
              <button>
                <a href="/register">Registrer</a>
              </button>
            </div>
          </div>
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>3éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1500</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i>2éme Année Medecine
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
        </div>
        <div className={classes.fullabaounement}>
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>4éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1000</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i>4éme Année Medecine
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

          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>5éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1500</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i>5éme Année Medecine
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
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>6éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1500</span>DA
              </p>
            </div>
            <div className={`${classes.card_content}`}>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i>6éme Année Medecine
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
        </div>
      </div>
    </>
  );
}

export default Abounement;
