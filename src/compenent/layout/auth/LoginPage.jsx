import React, { useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
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
function LoginPage() {
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
  const [showPassword, setShowPassword] = useState(false);
  const refreshPage = useSignal(0);

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
    UserService.logout();
    navigate("/register");
  };
  //***************************************************************** */
  useEffect(() => {
    if (window.localStorage) {
      if (!localStorage.getItem("reload")) {
        localStorage["reload"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("reload");
      }
    }
    console.log(username);
  }, [refreshPage.value]);
  //****submit login button************************************ */
  const handlerSubmit = async (e) => {
    UserService.logout();
    e.preventDefault();

    try {
      const userData = await UserService.login(username, password);
      localStorage.setItem("tokengoat", userData.token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("username", username);
      console.log(userData);
      const FullUser = await UserService.getUserByuserName(
        username,
        localStorage.getItem("tokengoat")
      );
      localStorage.setItem("userId", FullUser.id);
      getUser(username, userData.token, userData.role);
    } catch (error) {
      console.log(error);
      toast.error("votre mote de pass est incorrect!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  //*********************************************************************************** */
  //*****get user********************************************************** */
  const getUser = async (getUsername, getToken, getRole) => {
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        getUsername,
        getToken
      );

      getUserAbn(resultUserFinal.id, getRole);
    } catch (error) {
      console.log("Error fetching profile information", error);
    }
  };
  //********************************************************************* */
  //****check if user get abounement****************************** */
  const getUserAbn = async (getresultUserFinalId, userValidateAbn) => {
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${getresultUserFinalId}`
      );
      getAbnIfExist.value = result.data;
      console.log(getAbnIfExist.value);
    } catch (Exception) {
      console.log("his abonnement not existe");
    }
    if (getAbnIfExist.value !== null) {
      if (getAbnIfExist.value.statusAbn === true) {
        fetchIp(getresultUserFinalId);
        navigate("/goatqcm", {
          state: { getUserName: username, userId: getresultUserFinalId },
        });
      } else if (getAbnIfExist.value.statusAbn === false) {
        console.log("we in home not confirm yet");
        navigate("/home", {
          state: { getUserName: username },
        });
      }
    } else if (getAbnIfExist.value === null) {
      console.log("not demande yet");
      navigate("/home", {
        state: { getUserName: username },
      });
    }

    if (userValidateAbn === "ADMIN") {
      navigate("/goatqcm", {
        state: { getUserName: username },
      });
    }
  };
  //************************************************************** */

  //**************get user**************************************** */
  //****get ip adress and location user******************************* */
  const fetchIp = async (userId) => {
    try {
      const response = await fetch("https://api.ipify.org");
      const data = await response.text();
      ipAdresse.value = data;
      updateAdresseIp(ipAdresse.value, userId);
    } catch (error) {
      console.error("failed to fetch IP:", error);
    }
  };
  //****************************************************************** */
  //**update login etate active********************************
  const updateAdresseIp = async (adressIp, userId) => {
    console.log(adressIp);
    UpdtAbnAdressIp.adresseIp = adressIp;

    await axios
      .put(
        `https://goatqcm-instance.com/auth/updateAdresseip/${userId}`,
        UpdtAbnAdressIp
      )
      .then((res) => {})
      .catch((err) =>
        console.log("user not have abnt yet to update adress ip")
      );
  };
  //********************************************************************** */
  const testbtn = () => {
    console.log(username);
    console.log(password);
  };
  return (
    <>
      <div className={classes.fulcontainer}>
        {isTabletOrMobile && (
          <div className={classes.fullloginpagephone}>
            <div className={classes.wrapperphone}>
              <h1>Login</h1>

              <form onSubmit={handlerSubmit}>
                <div className={classes.logininputphone}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={username}
                      onChange={(e) =>
                        setUserName(e.target.value.toLowerCase())
                      }
                    />
                  </div>
                  <div className={classes.password_div_phone}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Password Visible"
                          : "Password Invisible."
                      }
                      className="text-black dark:text-white"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 select-none  cursor-pointer h-6 absolute top-2 right-2"
                          tabindex="-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={classes.wrapperregisterlinkphone}>
                  <button type="submit" className="btn btn-primary">
                    Se Connecter
                  </button>
                </div>
              </form>
              <div className={classes.registertbn_phone}>
                <button
                  style={{ marginTop: 10 }}
                  type="button"
                  href="/register"
                  onClick={handleResiterBtn}
                >
                  Créer nouveau compte?
                </button>
              </div>
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
              <div className={classes.wrapper}>
                <h1>Login</h1>

                <form onSubmit={handlerSubmit}>
                  <div className={classes.logininput}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={username}
                        onChange={(e) =>
                          setUserName(e.target.value.toLowerCase())
                        }
                      />
                    </div>
                    <div className={classes.password_div}>
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword
                            ? "Password Visible"
                            : "Password Invisible."
                        }
                        className="text-black dark:text-white"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 select-none  cursor-pointer h-6 absolute top-2 right-2"
                            tabindex="-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={classes.wrapperregisterlink}>
                    <button type="submit" className="btn btn-primary">
                      Se Connecter
                    </button>
                  </div>
                </form>
                <div className={classes.registertbn}>
                  <button
                    className="btn btn-success"
                    style={{ marginTop: 10 }}
                    type="button"
                    href="/register"
                    onClick={handleResiterBtn}
                  >
                    Créer nouveau compte?
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

export default LoginPage;
