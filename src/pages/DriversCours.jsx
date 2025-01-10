import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriversCours.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import backsave from "../compenent/layout/img/backsave.png";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import ModalDetail from "./ModalDetail";
import Backdrop from "./Backdrop";
function DriversCours() {
  const [modalDetalIsOpen, setModalDetalIsOpen] = useState(false);
  const [showDivDeleteDetail, setShowDivDeleteDetail] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  let navigateDriverLinks = useNavigate();
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let navigateBoardQuiz = useNavigate();
  //************************************************************************* */
  const yearsMed = {
    firstYear: "1ér Année Médecine",
    secondeYear: "2éme Année Médecine",
    thirdYear: "3éme Année Médecine",
    fourthYear: "4éme Année Médecine",
    fifthYear: "5éme Année Médecine",
    sixYear: "6éme Année Médecine",
    samediYear: "Samedi Pédagogique",
  };
  useEffect(() => {}, []);
  //******************************************************************* */
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const handleDriverLinks = (getYearMed) => {
    console.log("walidddd");
    navigateDriverLinks(`/driverslinks`, {
      state: {
        yearMed: getYearMed,
      },
    });
  };

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.biologiediv}>
              <div
                className={`${classes.cardyear} card bg-c-blue order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.firstYear);
                  }}
                  className={`${classes.cardyearbodyfirst} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 1ér Année Médecine</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.secondeYear);
                  }}
                  className={`${classes.cardyearbodyseconde} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 2éme Année Médecine</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear} card bg-c-green order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.thirdYear);
                  }}
                  className={`${classes.cardyearbodythird} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 3éme Année Médecine</h5>
                </div>
              </div>
            </div>
            <div className={classes.cliniquediv}>
              <div
                className={`${classes.cardyear} card bg-c-blue order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.fourthYear);
                  }}
                  className={`${classes.cardyearbodyfourth} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 4ér Année Médecine</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.fifthYear);
                  }}
                  className={`${classes.cardyearbodyfifth} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 5éme Année Médecine</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear} card bg-c-green order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.sixYear);
                  }}
                  className={`${classes.cardyearbodysix} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}> 6éme Année Médecine</h5>
                </div>
              </div>
            </div>
            <div className={`${classes.cardyear} card bg-c-green order-card  `}>
              <div
                onClick={() => {
                  handleDriverLinks(yearsMed.samediYear);
                }}
                className={`${classes.cardyearbodysamedi} card-body text-white bg-primary  `}
              >
                <h5 className={classes.cartitle}> Samedi Pédagogique</h5>
              </div>
            </div>
          </div>
        )}

        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.biologiediv_phone}>
              <div
                className={`${classes.cardyear_phone} card bg-c-blue order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.firstYear);
                  }}
                  className={`${classes.cardyearbodyfirst_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    1ér Année Médecine
                  </h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear_phone} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.secondeYear);
                  }}
                  className={`${classes.cardyearbodyseconde_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    2éme Année Médecine
                  </h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear_phone} card bg-c-green order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.thirdYear);
                  }}
                  className={`${classes.cardyearbodythird_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    3éme Année Médecine
                  </h5>
                </div>
              </div>
            </div>
            <div className={classes.cliniquediv_phone}>
              <div
                className={`${classes.cardyear_phone} card bg-c-blue order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.fourthYear);
                  }}
                  className={`${classes.cardyearbodyfourth_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    4ér Année Médecine
                  </h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear_phone} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.fifthYear);
                  }}
                  className={`${classes.cardyearbodyfifth_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    5éme Année Médecine
                  </h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear_phone} card bg-c-green order-card  `}
              >
                <div
                  onClick={() => {
                    handleDriverLinks(yearsMed.sixYear);
                  }}
                  className={`${classes.cardyearbodysix_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>
                    {" "}
                    6éme Année Médecine
                  </h5>
                </div>
              </div>
            </div>
            <div
              className={`${classes.cardyearsamedi_phone} card bg-c-green order-card  `}
            >
              <div
                onClick={() => {
                  handleDriverLinks(yearsMed.samediYear);
                }}
                className={`${classes.cardyearbodysamedi_phone} card-body text-white bg-primary  `}
              >
                <h5 className={classes.cartitle_phone}> Samedi Pédagogique</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default DriversCours;
