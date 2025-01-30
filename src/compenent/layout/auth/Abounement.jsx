import classes from "./Abounement.module.css";

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
            <div className={`${classes.card_content}`}>
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
          <div className={classes.card}>
            <div className={`${classes.card_title}`}>
              <h2>1ér Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1100</span>DA
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
            </div>
          </div>
        </div>
        <div className={classes.fullabaounement}>
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
                  <i className="fa fa-check-circle"></i>3éme Année Medecine
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
              <h2>4éme Année</h2>
              <p>
                <i className="fa fa-rupee"></i>
                <span>1500</span>DA
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Abounement;
