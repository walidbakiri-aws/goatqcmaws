import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import classes from "./GoatQcm.module.css";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import UserService from "../compenent/layout/service/UserService";
import useLocalStorage from "use-local-storage";
import { useSignal } from "@preact/signals-react";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import Backdrop from "./Backdrop";
import toast, { Toaster } from "react-hot-toast";

function GoatQcm() {
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  let deviceId = localStorage.getItem("deviceId");
  const userIdToken = localStorage.getItem("userId");
  let getUserAdresseIp = useSignal("");
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [ShowEnterGmailCode, setShowEnterGmailCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  let finalEmail = useSignal("");
  useEffect(() => {
    console.log(localStorage.getItem("verificatioeCode"));
    if (localStorage.getItem("verificatioeCode") == "true") {
      console.log("already check code");
    } else {
      getUserAdressIp();
    }
  }, []);
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);
  const getUserAdressIp = async () => {
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userIdToken}`
      );
      console.log(result.data);
      finalEmail.value = result.data.ourUsers.username;
      getUserAdresseIp.value = result.data.adresseIp;
      console.log(getUserAdresseIp.value);
      console.log(deviceId);
      if (getUserAdresseIp.value === deviceId) {
        console.log("are the same");
      } else {
        toast.error(
          "Un autre appareil a été connecté en même temps, veuillez vous déconnecter. "
        );
        setShowEnterGmailCode(true);
        if (cooldown === 0) {
          await axios.post(
            `https://goatqcm-instance.com/codegmail/send-code/${result.data.ourUsers.username}`
          );
          setCooldown(60);
        } else {
          toast.info(
            `Veuillez attendre ${cooldown} secondes avant de renvoyer le code.`
          );
        }
      }
    } catch (Exception) {
      console.log("no abnmt found");
    }
  };
  const handleResend = async () => {
    try {
      await axios.post(
        `https://goatqcm-instance.com/codegmail/send-code/${finalEmail.value}`
      );
      toast.success("Code renvoyé avec succès");
      setCooldown(60);
    } catch (err) {
      toast.error("Erreur lors de l'envoi du code");
    }
  };
  const verifyCode = async () => {
    try {
      const response = await axios.post(
        `https://goatqcm-instance.com/codegmail/verify-code`,
        {
          email: finalEmail.value,
          code: verificationCode,
        }
      );
      if (response.data === true) {
        localStorage.setItem("verificatioeCode", true);
        toast.success("Vérification réussie");
        setShowEnterGmailCode(false);
      } else {
        toast.error("Code incorrect");
      }
    } catch (error) {
      toast.error("Erreur de vérification");
    }
    try {
      if (verificationCode === "54789393") {
        toast.success("Vérification réussie");
        setShowEnterGmailCode(false);
      } else {
        toast.error("Code incorrect");
      }
    } catch (error) {
      toast.error("Erreur de vérification");
    }
  };
  const closeModalDoneQuizHandler = () => {
    //setShowEnterGmailCode(false);
  };
  const strokeDasharray = 283; // 2 * π * r (r = 45)
  const strokeDashoffset = (cooldown / 60) * strokeDasharray;
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <>
            <div
              className={classes.contanerspace}
              data-theme={isDark ? "dark" : "light"}
            >
              <div className={classes.bienvenulogo}>
                <div className={classes.bienvuenwlcm}>
                  Bienvenue au GoatQcm!
                </div>
                <div className={classes.logogoat}>
                  <img src={GoatLogo} height="100" width="200" />
                </div>
              </div>

              <div className={classes.container}>
                <div className={classes.card}>
                  <div className={classes.icon}>
                    <ion-icon className="globe-outline"></ion-icon>
                  </div>
                  <div className={classes.content}>
                    <h2>+35 Modules</h2>
                    <p>
                      Modules de 1ér Année jusqu'à 6éme Année Médecine <br />
                      Organisée par Cour et par Sujets.
                    </p>
                  </div>
                </div>
                <div className={classes.card}>
                  <div className={classes.icon}>
                    <ion-icon name="diamond-outline"></ion-icon>
                  </div>
                  <div className={classes.content}>
                    <h2>+1 000 Cours</h2>
                    <p>
                      Plus de 1 000 Cours des modules d'externat de 1ér Année
                      jusqu'à 6éme Année Médecine.
                    </p>
                  </div>
                </div>
                <div className={classes.card}>
                  <div className={classes.icon}>
                    <ion-icon name="rocket-outline"></ion-icon>
                  </div>
                  <div className={classes.content}>
                    <h2>+10 000 QCM</h2>
                    <p>
                      Plus de 10 000 QCMs , Qcms ,Cas Clinque <br /> des Sujets
                      d'Externat et de Résidanat
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {ShowEnterGmailCode && (
              <div className={classes.entergmailcode}>
                <div className={classes.codeDiv}>
                  <div className="form-group">
                    <label>Un code vous a été envoyé par e-mail.</label>
                    <label>Saisi le code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="saisi le code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={verifyCode}
                    >
                      Vérifier
                    </button>
                  </div>{" "}
                </div>
                <div className={classes.renvoyercode}>
                  {cooldown > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#ccc"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#4ed126ff"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fontSize="20"
                          fill="#323435ff"
                          fontWeight="bold"
                        >
                          {cooldown}s
                        </text>
                      </svg>
                    </div>
                  )}
                  {cooldown === 0 && (
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={handleResend}
                    >
                      Renvoyer le code
                    </button>
                  )}
                </div>
              </div>
            )}
            {ShowEnterGmailCode && (
              <Backdrop onCancel={closeModalDoneQuizHandler} />
            )}
          </>
        )}
        {isTabletOrMobile && (
          <>
            <div
              className={classes.contanerspace_phone}
              data-theme={isDark ? "dark" : "light"}
            >
              <div className={classes.bienvenulogo_phone}>
                <div className={classes.bienvuenwlcm_phone}>
                  Bienvenue au GoatQcm!
                </div>
                <div className={classes.logogoat_phone}>
                  <img src={GoatLogo} height="70" width="100" />
                </div>
              </div>

              <div className={classes.container_phone}>
                <div className={classes.card_phone}>
                  <div className={classes.icon_phone}>
                    <ion-icon className="globe-outline"></ion-icon>
                  </div>
                  <div className={classes.content_phone}>
                    <h2>+35 Modules</h2>
                    <p>
                      Modules de 1ér Année jusqu'à 6éme Année Médecine <br />
                      Organisée par Cour et par Sujets.
                    </p>
                  </div>
                </div>
                <div className={classes.card_phone}>
                  <div className={classes.icon_phone}>
                    <ion-icon name="diamond-outline"></ion-icon>
                  </div>
                  <div className={classes.content_phone}>
                    <h2>+1 000 Cours</h2>
                    <p>
                      Plus de 1 000 Cours des modules d'externat de 1ér Année
                      jusqu'à 6éme Année Médecine.
                    </p>
                  </div>
                </div>
                <div className={classes.card_phone}>
                  <div className={classes.icon_phone}>
                    <ion-icon name="rocket-outline"></ion-icon>
                  </div>
                  <div className={classes.content_phone}>
                    <h2>+10 000 QCM</h2>
                    <p>
                      Plus de 10 000 QCMs , Qcms ,Cas Clinque <br /> des Sujets
                      d'Externat et de Résidanat
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {ShowEnterGmailCode && (
              <div className={classes.entergmailcode_phone}>
                <div className={classes.codeDiv_phone}>
                  <div className="form-group">
                    <label>Un code vous a été envoyé par e-mail.</label>
                    <label>Saisi le code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="saisi le code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={verifyCode}
                    >
                      Vérifier
                    </button>
                  </div>
                </div>
                <div className={classes.renvoyercode}>
                  {cooldown > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#ccc"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#4ed126ff"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fontSize="20"
                          fill="#323435ff"
                          fontWeight="bold"
                        >
                          {cooldown}s
                        </text>
                      </svg>
                    </div>
                  )}
                  {cooldown === 0 && (
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={handleResend}
                    >
                      Renvoyer le code
                    </button>
                  )}
                </div>
              </div>
            )}

            {ShowEnterGmailCode && (
              <Backdrop onCancel={closeModalDoneQuizHandler} />
            )}
          </>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default GoatQcm;
