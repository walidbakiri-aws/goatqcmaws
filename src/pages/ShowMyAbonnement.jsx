import { useEffect, useState } from "react";
import BtnAdd from "../compenent/layout/BtnAdd";
import NavigationBar from "../compenent/layout/NavigationBar";

import classes from "./ShowMyAbonnement.module.css";
import axios from "axios";
import myabnmtimg from "../compenent/layout/img/myabnmtimg.jpeg";
import "react-toastify/dist/ReactToastify.css";
import Abounement from "./Abounement";
import UserService from "../compenent/layout/service/UserService";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./Sidebar";

function ShowMyAbonnement() {
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");

  const [getUerInfo, setGetUerInfo] = useState([]);
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  useEffect(() => {
    getUser();
  }, []);
  //************************************************************************ */
  //*****get user********************************************************** */
  const getUser = async () => {
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      checkUserAbn(resultUserFinal.id);
      console.log(resultUserFinal);
    } catch (error) {
      console.log("Error fetching profile information", error);
    }
  };
  //********************************************************************* */
  //****get user with abounement****************************** */
  const checkUserAbn = async (userId) => {
    console.log(userId);
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userId}`
      );
      setGetUerInfo(result.data);
    } catch (Excpetion) {
      console.log("no abonner found");
    }
  };
  //********************************************************************* */
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <div className={classes.contanerspace}>
            <body className={classes.body}>
              <article className={classes.article}>
                <section className={classes.card}>
                  <div className={classes.text_content}>
                    <h3>{getUerInfo.nameAbn}</h3>
                    <p>
                      <ul>
                        <li>Date de Souscription : {getUerInfo.dateDbtAbn}</li>
                        <li>Date d'expiration : {getUerInfo.dateExpdAbn}</li>
                      </ul>
                    </p>
                    <a href="/goatqcm">Accueil</a>
                  </div>
                  <div className={classes.visual}>
                    <img src={myabnmtimg} />
                  </div>
                </section>
              </article>
            </body>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.contanerspace_phone}>
            <body className={classes.body_phone}>
              <article className={classes.article_phone}>
                <section className={classes.card_phone}>
                  <div className={classes.text_content_phone}>
                    <h3>{getUerInfo.nameAbn}</h3>
                    <p>
                      <ul
                        className={`${classes.text_content_ul_phone} list-group`}
                      >
                        <li className="list-group-item">
                          Date de Souscription : <br />
                          {getUerInfo.dateDbtAbn}
                        </li>
                        <li className="list-group-item">
                          Date d'expiration : <br />
                          {getUerInfo.dateExpdAbn}
                        </li>
                      </ul>
                    </p>
                    <a href="/goatqcm">Accueil</a>
                  </div>
                  <div className={classes.visual_phone}>
                    <img src={myabnmtimg} />
                  </div>
                </section>
              </article>
            </body>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowMyAbonnement;
