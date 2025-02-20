import { useEffect, useState } from "react";
import classes from "./ModalReg.module.css";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
import successreg from "../img/successreg.png";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
function ModalReg(props) {
  const navigate = useNavigate();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  useEffect(() => {}, []);

  const handleSeConnect = () => {
    navigate("/");
  };

  return (
    <>
      {isDesktopOrLaptop && (
        <div className={`${classes.modal} `}>
          <div>
            <div>
              <h6>Success registration</h6>
            </div>
            <div>
              <img src={successreg} />
            </div>
            <div className={`${classes.connectdiv} `}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSeConnect}
              >
                Se Connecter
              </button>
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={`${classes.modal_phone} `}>
          <div>
            <div>
              <h6>Success registration</h6>
            </div>
            <div>
              <img src={successreg} />
            </div>
            <div className={`${classes.connectdiv_phone} `}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSeConnect}
              >
                Se Connecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalReg;
