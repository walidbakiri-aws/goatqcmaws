import React, { useEffect, useState } from "react";
import classes from "./GoatWelcome.module.css";
import { json, Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import axios from "axios";
import Abounement from "./Abounement";
import { useSignal } from "@preact/signals-react";
import { useMediaQuery } from "react-responsive";
import AbounementPhone from "../../../pages/AbounementPhone";
import goatimg from "../img/goatimg.png";
import logologingoat from "../img/logologingoat.png";
import { jwtDecode } from "jwt-decode";
import LogOutAllDevices from "../../../pages/LogOutAllDevices";
import Backdrop from "../../../pages/Backdrop";

import toast, { Toaster } from "react-hot-toast";
function GoatWelcome() {
  const [username, setUserName] = useState("");
  const userAbnId = useSignal("");
  const userAbnValidAbn = useSignal("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let validateEtat = useSignal("");
  const navigate = useNavigate();
  const [VisibleLoginPhone, setVisibleLoginPhone] = useState(false);
  const [VisibleImagebtn, setVisibleImagebtn] = useState(true);
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  let userStateEctive = useSignal(false);
  const saveUserId = useSignal("");
  const saveUserName = useSignal("");
  let usernameToken = localStorage.getItem("username");
  let checkUserDemandeAbn = useSignal(false);
  //let userIdToken = localStorage.getItem("userId");
  let token = localStorage.getItem("tokengoat");
  let userHasAbn = useSignal(false);
  let getAbnIfExist = useSignal([]);
  //***************************************************************** */
  const UpdtAbn = {
    stateActiveLogin: true,
  };

  //******************************************************************* */
  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  const UpdtAbnAdressIp = {
    adresseIp: "",
  };
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const [userIdTkn, setUserIdTkn] = useState(
    +localStorage.getItem("userId") || 0
  );
  //***registre******************************************************** */
  const handleResiterBtn = (e) => {
    navigate("/register");
  };
  //***************************************************************** */

  const checkUserHasAbn = async (userIdLocal) => {
    localStorage.getItem("userId");
    console.log(userIdLocal);
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userIdLocal}`
      );
      console.log(result.data.statusAbn);
      userHasAbn.value = true;
      if (result.data.statusAbn === true) {
        console.log(userHasAbn.value);
        navigate("/goatqcm", {
          state: { getUserName: usernameToken, userId: userIdLocal },
        });
        window.location.reload();
      } else if (result.data.statusAbn === false) {
        console.log("register but his abn not valide");
        navigate("/home", {
          state: { getUserName: usernameToken },
        });
        window.location.reload();
      }
    } catch (Exception) {
      userHasAbn.value = false;
      console.log(userHasAbn.value);
      navigate("/");
    }
  };

  useEffect(() => {
    try {
      // console.log(localStorage.getItem("userId"));
      if (localStorage.getItem("tokengoat") !== null) {
        checkUserHasAbn(localStorage.getItem("userId"));
      } else if (localStorage.getItem("tokengoat") === null) {
        console.log("no current uer is log");
      }
    } catch (Exception) {}
  }, []);

  return (
    <>
      <div className={classes.fulcontainer}>
        {isTabletOrMobile && (
          <div>
            <div className={classes.fullloginpagephone}>
              <div className={classes.goatimagephone}>
                <img src={logologingoat} />
              </div>
              <button
                onClick={(e) => {
                  navigate("/login");
                }}
                className={classes.button_instagram}
              >
                <span className={classes.gradient}></span>Connection
              </button>
            </div>
          </div>
        )}

        {isDesktopOrLaptop && (
          <div className={classes.fullloginpage}>
            <div className={classes.child_phone}>
              <div className={classes.logoimage}>
                <img src={logologingoat}></img>
              </div>
            </div>
            <div className={classes.child_phone}>
              <div>
                <div className={classes.fulllogine}>
                  <div className={classes.goatimage}>
                    <img />
                  </div>
                  <button
                    onClick={(e) => {
                      navigate("/login");
                    }}
                    className={classes.button_instagram}
                  >
                    <span className={classes.gradient}></span>Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isDesktopOrLaptop && <Abounement />}

        {isTabletOrMobile && <AbounementPhone />}
      </div>
      <Toaster />
    </>
  );
}

export default GoatWelcome;
