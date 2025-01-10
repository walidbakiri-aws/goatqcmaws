import React, { useState, useEffect } from "react";
import axios from "axios";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import classes from "./ListModuleCours.module.css";
import { useSignal } from "@preact/signals-react/runtime";
import { useNavigate } from "react-router-dom";

function ListModuleCours(props) {
  const SelectedModule = useSignal(null);
  const SelectedCours = useSignal("");
  let navigateBoardQuiz = useNavigate();
  //************************************************************* */
  useEffect(() => {
    loadAllModules();
  }, []);

  return (
    <>
      <div className={classes.childmodulecoursdiv}>
        <div className={"form-check"}>
          {AllModules.map((module, index) => (
            <div key={index} className={classes.moduleitem}>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={module.moduleName}
                value={module.id}
                onChange={handleChangeModule}
              ></input>

              <label className="form-check-label fs-6  ">
                {module.moduleName}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.childmodulecoursdiv}>
        <div className="form-check">
          {AllCours.map((cour, index) => (
            <div key={cour.id} className={classes.moduleitem}>
              <input
                className="form-check-input fs-6 "
                type="checkbox"
                value={cour.id}
                onChange={handleChangeCours}
                id="flexCheckDefault"
              />
              <label className="form-check-label fs-6 ">{cour.coursName}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.btnCommencer}>
        <button
          type="button"
          className="btn btn-success "
          style={{
            width: 120,
            position: "absolute",
            right: 0,
          }}
          onClick={handelCommencerBnt}
        >
          Commencer
        </button>
      </div>
    </>
  );
}

export default ListModuleCours;
