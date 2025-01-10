import { useEffect, useState } from "react";
import BtnAdd from "../compenent/layout/BtnAdd";
import NavigationBar from "../compenent/layout/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Home.module.css";
import toast, { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import Abounement from "./Abounement";
import UserService from "../compenent/layout/service/UserService";
import SidebarHome from "./SidebarHome";

function Home() {
  const [userFinal, setUserFinal] = useState({});
  const { state } = useLocation();

  const [visibleAbounemet, setVisibleAbounemet] = useState(false);
  const [VisibleValideAbounemet, setVisibleValideAbounemet] = useState(false);

  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  useEffect(() => {
    getUser();
  }, []);

  //**************get user**************************************** */
  const getUser = async () => {
    console.log("we heerr");
    try {
      const token = localStorage.getItem("tokengoat");
      let getUserName = localStorage.getItem("username");
      const resultUserFinal = await UserService.getUserByuserName(
        getUserName,
        token
      );
      console.log(resultUserFinal);
      console.log(token);
      setUserFinal(resultUserFinal);
      checkUserAbn(resultUserFinal);
    } catch (error) {
      console.log("Error fetching profile information", error);
    }
  };
  //********************************************************************* */
  //****check if user get abounement****************************** */
  const checkUserAbn = async (getresultUserFinal) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/abounement/${getresultUserFinal.id}`
    );

    if (result.data !== null) {
      setVisibleAbounemet(false);
      setVisibleValideAbounemet(true);
      console.log("visible false");
      console.log(result.data);
    } else {
      setVisibleAbounemet(true);
      console.log("visible true");
    }
  };
  //************************************************************** */
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>
          {ShowSideBare && <SidebarHome />}
        </div>
        <div className={classes.contanerspace}>
          {visibleAbounemet && <Abounement user={userFinal} />}
        </div>
      </div>
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
                <h6>2-A fin de terminer le paiment Contact la page: goatqcm</h6>
                <a
                  style={{ display: "table-cell" }}
                  href="https://www.facebook.com/profile.php?id=61568288563214"
                  target="_blank"
                >
                  https://www.facebook.com/profile.php?id=61568288563214
                </a>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
