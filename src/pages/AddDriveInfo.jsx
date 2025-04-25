import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./AddDriveInfo.module.css";
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
function AddDriveInfo() {
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  const [AllModules, setAllModules] = useState([]);
  const [SelectModuleName, setSelectModuleName] = useState("");
  const [FileDisplayEdite, setFileDisplayEdite] = useState("");
  const [fileEdite, setFileEdite] = useState();
  let getModuleName = "";
  let getFinalModuelName = useSignal("");
  let letGetModuleId = useSignal("");
  const [module, setModule] = useState({
    driveLink: "",
    driveLinkModuleName: "",
    moduleName: "",
  });
  const [moduleDriveName, setModuleDriveName] = useState({
    driveLinkModuleName: "",
    driveLink: "",
    moduleName: "",
  });
  useEffect(() => {
    loadModulesSelet();
  }, []);
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

  //load les modules de selction options*************************************
  const loadModulesSelet = async () => {
    const result = await axios.get(
      "https://goatqcm-instance.com/medmodule/getall/module",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAllModules(result.data);
  };
  //*********************************************************************** */
  //************************************************************************* */

  const handleChange = (event) => {
    getModuleName = event.target.value;
    setSelectModuleName(getModuleName);
    getFinalModuelName.value = event.target.value;
    AllModules.map((getModule) => {
      try {
        if (getModule.moduleName === getModuleName) {
          letGetModuleId.value = getModule.id;
          getSelectedModule(letGetModuleId.value);
          console.log(letGetModuleId.value);
        }
      } catch {}
    });
  };
  //load all cours pour afficher *******************************************
  const getSelectedModule = async (getModuleId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/module/${getModuleId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result.data);
    console.log(getFinalModuelName.value);
    setModule({
      ...module,
      driveLinkModuleName: result.data.driveLinkModuleName,
      moduleName: getFinalModuelName.value,
    });
    setModuleDriveName({
      ...moduleDriveName,
      driveLink: result.data.driveLink,
      moduleName: getFinalModuelName.value,
    });
  };
  //************************************************************************* */
  //***get image from local distination and display it****** */
  const getFileEdite = (e) => {
    setFileEdite(e.target.files[0]);
    setFileDisplayEdite(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */
  ///*****update image************************************** */
  const UpdateImage = async () => {
    console.log(letGetModuleId.value);
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(
        `https://goatqcm-instance.com/module/updateimage/${letGetModuleId.value}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */

  const onSubmitModule = async (event) => {
    console.log("im in module drive");
    event.preventDefault(); // Prevent page reload
    console.log(module);
    await axios
      .put(`https://goatqcm-instance.com/module/${letGetModuleId.value}`, module, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("success updating");
      })
      .catch((err) => console.log(err));
  };
  //************************************************************* */
  const onSubmitModuleDriveName = async (event) => {
    console.log("im in name cour");
    event.preventDefault(); // Prevent page reload
    console.log(moduleDriveName);
    await axios
      .put(
        `https://goatqcm-instance.com/module/${letGetModuleId.value}`,
        moduleDriveName,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("success updating");
      })
      .catch((err) => console.log(err));
  };
  //************************************************************* */
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
              <div
                style={{ marginLeft: 600, width: 300 }}
                className="container"
              >
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={SelectModuleName}
                  onChange={handleChange}
                >
                  <option value="selectval">Select Module</option>
                  {AllModules.map((Module, index) => (
                    <option key={index} value={Module.moduleName}>
                      {Module.moduleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.imagediv}>
                <img src={FileDisplayEdite} onChange={getFileEdite} />
                <input type="file" onChange={getFileEdite}></input>
              </div>
              <button
                type="submit"
                className={`${classes.updtimage} btn btn-primary`}
                onClick={(e) => UpdateImage()}
              >
                Update Image
              </button>
              <div className={classes.updatelinkdrive}>
                <label style={{ marginBottom: 10 }}>Insert drive Link</label>
                <div className="d-flex justify-content-center">
                  <div className="input-group w-auto">
                    <input
                      style={{ width: 700 }}
                      type={"text"}
                      className="form-control"
                      placeholder="Add Cours"
                      aria-describedby="button-addon1"
                      onChange={(e) =>
                        setModule({ ...module, driveLink: e.target.value })
                      }
                    />
                    <button
                      className="btn btn-primary mx-1"
                      type="button"
                      id="button-addon1"
                      onClick={(e) => {
                        onSubmitModule(e);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={classes.updatelinkdrive}
                style={{ marginLeft: 130 }}
              >
                <label style={{ marginBottom: 10 }}>
                  Insert link module name
                </label>
                <div className="d-flex justify-content-center">
                  <div className="input-group w-auto">
                    <input
                      style={{ width: 700 }}
                      type={"text"}
                      className="form-control"
                      placeholder="Add cour name drive"
                      aria-describedby="button-addon2"
                      onChange={(e) =>
                        setModuleDriveName({
                          ...moduleDriveName,
                          driveLinkModuleName: e.target.value,
                        })
                      }
                    />
                    <button
                      className="btn btn-danger mx-1"
                      type="button"
                      id="button-addon2"
                      onClick={(e) => {
                        onSubmitModuleDriveName(e);
                      }}
                    >
                      Adding
                    </button>
                  </div>
                </div>
              </div>
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

export default AddDriveInfo;
