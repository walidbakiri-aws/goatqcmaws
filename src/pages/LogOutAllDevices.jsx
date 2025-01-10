import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
import UserService from "../compenent/layout/service/UserService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useSignal } from "@preact/signals-react";
function LogOutAllDevices(props) {
  const navigatelogin = useNavigate();
  const token = localStorage.getItem("tokengoat");

  /***************************************** */
  const UpdtAbnDeconnect = {
    stateActiveLogin: false,
  };
  //************************************************* */
  function confirmeHanler() {
    updateEtatLoginDeconnect(props.userId);
    props.onConfirm();
  }
  useEffect(() => {
    console.log(props.userId);
  }, []);

  //************************************************************* */
  //**update login etate active********************************
  const updateEtatLoginDeconnect = async (userId) => {
    await axios
      .put(
        `https://goatqcm-instance.com/auth/updateabounemente_etatlogin/${userId}`,
        UpdtAbnDeconnect
      )
      .then((res) => {})
      .catch((err) =>
        console.log("user not have abnt yet to update his state login")
      );
  };
  //********************************************************************** */
  return (
    <div className={`${classes.modal} `}>
      <h6>vous êtes déjà connecté dans un autre appareil</h6>
      <button
        className={`${classes.confirmbtn} btn btn-info `}
        type="submit"
        onClick={confirmeHanler}
      >
        Déconnect tous les appareilles
      </button>
    </div>
  );
}

export default LogOutAllDevices;
