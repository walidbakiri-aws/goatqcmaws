import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriversYearsLinks.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useHref, useNavigate } from "react-router-dom";
import backsave from "../compenent/layout/img/backsave.png";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import ModalDetail from "./ModalDetail";
import Backdrop from "./Backdrop";
import toast, { Toaster } from "react-hot-toast";

import { useLocation } from "react-router-dom";
function DriversYearsLinks() {
  const [modalDetalIsOpen, setModalDetalIsOpen] = useState(false);
  const [showDivDeleteDetail, setShowDivDeleteDetail] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  const { state } = useLocation();
  const { yearMed } = state;
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let navigateBoardQuiz = useNavigate();
  //************************************************************************* */

  useEffect(() => {
    console.log(yearMed);
  }, []);
  //******************************************************************* */
  const yearsName = {
    firstYear: "1ér Année Médecine",
    secondeYear: "2éme Année Médecine",
    thirdYear: "3éme Année Médecine",
    fourthYear: "4éme Année Médecine",
    fifthYear: "5éme Année Médecine",
    sixYear: "6éme Année Médecine",
    samediYear: "Samedi Pédagogique",
  };

  const yearsLinks25 = {
    firstYear:
      "https://drive.google.com/drive/folders/1iz7iuU_Cf8rjG_UNYq7rTvQdoelcAkYb?usp=drive_link",
    secondeYear:
      "https://drive.google.com/drive/folders/1UjaxyXp8pU56jlz-F7K-MGECj2pheF21?usp=drive_link",
    thirdYear:
      "https://drive.google.com/drive/folders/19p1WjOICMCWFyGkIdiPmb8w3ejy6P_sc?usp=drive_link",
    fourthYear:
      "https://drive.google.com/drive/folders/1-9r7Hk6zoUX69cuzWCr6ZqZ5BCBXpwqS?usp=drive_link",
    fifthYear:
      "https://drive.google.com/drive/folders/1gmTor--nOGEfKVU_5ZJ1aEf0QErBR159?usp=drive_link",
    sixYear:
      "https://drive.google.com/drive/folders/1k-NZ5fBemEoD-dPMrD2fMdbJePMYO1ez?usp=drive_link",
    samediYear: "Samedi Pédagogique",
  };
  const yearsLinks24 = {
    firstYear:
      "https://drive.google.com/drive/folders/1-0NO8jm-_mZSEoMMQs6AKHVVBM4xmcBx?usp=drive_link",
    secondeYear:
      "https://drive.google.com/drive/folders/1-6W9tWl1xMB5GZ1UphUU_tspeeJ4GSPt?usp=drive_link",
    thirdYear:
      "https://drive.google.com/drive/folders/1-O_WyBVCwphpKeyKYu0CP0rv0BSnaQBH?usp=drive_link",
    fourthYear:
      "https://drive.google.com/drive/folders/1cmcbPdtR1b9zg_sVpuv767IozJs40yus?usp=drive_link",
    fifthYear:
      "https://drive.google.com/drive/folders/1FfKDrTo9Btj6ET9tFtMVXmd1P8OZ3h9F?usp=drive_link",
    sixYear:
      "https://drive.google.com/drive/folders/1k-NZ5fBemEoD-dPMrD2fMdbJePMYO1ez?usp=drive_link",
    samediYear:
      "https://drive.google.com/drive/folders/10cw4PZi97bvBqq6mmX0lInkK-80aZXZQ?usp=drive_link",
  };
  //**************************************************************** */
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */

  const handleOpenDrivelLink2025 = (getYearMed) => {
    if (getYearMed === yearsName.firstYear) {
      window.location.href = yearsLinks25.firstYear;
    } else if (getYearMed === yearsName.secondeYear) {
      window.location.href = yearsLinks25.secondeYear;
    } else if (getYearMed === yearsName.thirdYear) {
      window.location.href = yearsLinks25.thirdYear;
    } else if (getYearMed === yearsName.fourthYear) {
      window.location.href = yearsLinks25.fourthYear;
    } else if (getYearMed === yearsName.fifthYear) {
      window.location.href = yearsLinks25.fifthYear;
    } else if (getYearMed === yearsName.sixYear) {
      window.location.href = yearsLinks25.sixYear;
    } else if (getYearMed === yearsName.internatYear) {
      window.location.href = yearsLinks25.internatYear;
    } else if (getYearMed === yearsName.samediYear) {
      console.log("mmmm");
      toast.error("sont pas encore commencé!");
    }
  };
  const handleOpenDrivelLink2024 = (getYearMed) => {
    if (getYearMed === yearsName.firstYear) {
      window.location.href = yearsLinks24.firstYear;
    } else if (getYearMed === yearsName.secondeYear) {
      window.location.href = yearsLinks24.secondeYear;
    } else if (getYearMed === yearsName.thirdYear) {
      window.location.href = yearsLinks24.thirdYear;
    } else if (getYearMed === yearsName.fourthYear) {
      window.location.href = yearsLinks24.fourthYear;
    } else if (getYearMed === yearsName.fifthYear) {
      window.location.href = yearsLinks24.fifthYear;
    } else if (getYearMed === yearsName.sixYear) {
      window.location.href = yearsLinks24.sixYear;
    } else if (getYearMed === yearsName.internatYear) {
      window.location.href = yearsLinks24.internatYear;
    } else if (getYearMed === yearsName.samediYear) {
      console.log("mmmm");
      toast.error("sont pas encore commencé!");
    }
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
                    handleOpenDrivelLink2025(yearMed);
                  }}
                  className={`${classes.cardyearbodyfirst} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}>2024/2025</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleOpenDrivelLink2024(yearMed);
                  }}
                  className={`${classes.cardyearbodyseconde} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle}>2023/2024</h5>
                </div>
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
                    handleOpenDrivelLink2025(yearMed);
                  }}
                  className={`${classes.cardyearbodyfirst_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>2024/2025</h5>
                </div>
              </div>
              <div
                className={`${classes.cardyear_phone} card bg-c-yellow order-card   `}
              >
                <div
                  onClick={() => {
                    handleOpenDrivelLink2024(yearMed);
                  }}
                  className={`${classes.cardyearbodyseconde_phone} card-body text-white bg-primary  `}
                >
                  <h5 className={classes.cartitle_phone}>2023/2024</h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default DriversYearsLinks;
