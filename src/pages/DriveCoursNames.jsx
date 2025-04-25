import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DriveCoursNames.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import playsessionicon from "../compenent/layout/img/playsession.png";
import detail from "../compenent/layout/img/detailicon.png";
import UserService from "../compenent/layout/service/UserService";
import ModalDetailSession from "./ModalDetailSession";
import Backdrop from "./Backdrop";
import { useLocation } from "react-router-dom";

function DriveCoursNames() {
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  const { state } = useLocation();
  const { module } = state;

  const [loading, setLoading] = useState(true);
  const [isAuthenticatedDrive, setIsAuthenticatedDrive] = useState(false);
  //******************************************************* */
  const [pdfFiles, setPdfFiles] = useState([]);
  const apiKey = "AIzaSyDgDQMVIvBOYK7Yb4580FxtvjCMErrOJRQ";
  function extractFolderId(driveUrl) {
    const match = driveUrl.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }

  const url = module.driveLinkModuleName;
  const folderId = extractFolderId(url);
  //************************************************** */
  useEffect(() => {
    const fetchPDFs = async () => {
      const query = `'${folderId}' in parents and mimeType='application/pdf' and trashed = false`;
      const fields = "files(id, name)";
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        query
      )}&fields=${encodeURIComponent(fields)}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setPdfFiles(data.files || []);
        console.log(data.files);
      } catch (err) {
        console.error("Error fetching PDF files:", err);
      }
    };

    fetchPDFs();
  }, []);

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
            <div className={classes.quizzContainer}>
              <div className={classes.header}>
                <div>
                  <h2>
                    <span>{module.moduleName}</span>
                  </h2>
                  <p>Votre nouvelle plateforme de cours</p>
                </div>
                <div>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleDriverLinks(yearsMed[index]);
                    }}
                  >
                    Consulter
                  </button>
                </div>
              </div>

              {pdfFiles.map((file, index) => (
                <div className={classes.fullcour_nbrcour}>
                  <div className={classes.eachcour}>
                    <li className="list-group-item" key={file.id}>
                      {file.name}
                    </li>
                  </div>
                  <div className={classes.cournmbr}>{index}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div className={classes.quizzContainer_phone}></div>
        )}
      </div>
    </>
  );
}

export default DriveCoursNames;
