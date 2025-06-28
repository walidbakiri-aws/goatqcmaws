import { useEffect, useState } from "react";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import classes from "./NoteQcm.module.css";
import UserService from "../compenent/layout/service/UserService";
import useLocalStorage from "use-local-storage";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import { useMediaQuery } from "react-responsive";
function NoteQcm(props) {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");
  const [visibleImgeBigFormat, setVisibleImgeBigFormat] = useState(false);
  const getResultNote = useSignal();
  const userFinal = { id: "", name: "", lastname: "", password: "", role: "" };
  const saveUserQcm = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };
  //*****description variable********************** */
  const [file, setFile] = useState();
  const [fileEdite, setFileEdite] = useState();
  const [fileDisplay, setFileDisplay] = useState();
  const [FileDisplayEdite, setFileDisplayEdite] = useState("");
  const [LoadImage, setLoadImage] = useState("");
  const [noteQcm, setNoteQcm] = useState("");
  const [VisisbleDescUpdate, setVisisbleDescUpdate] = useState(false);
  const [visisbleDescInsert, setvisisbleDescInsert] = useState(false);
  const [noteQcmEdite, setNoteQcmEdite] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    noteQcm: "",
    qcmStandard: {},
    ourUsers: {},
  });
  //************************************************************************ */
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  useEffect(() => {
    console.log(username);
    console.log(token);
    testDescExsite(props.qcmId);
    console.log(props.qcmId);
  }, []);

  //***get image from local distination and display it****** */
  const getFile = (e) => {
    setFile(e.target.files[0]);
    setFileDisplay(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */
  //***store image to database*************************** */
  const AjouterImage = async (qcmId) => {
    testDescExsite(qcmId);

    const result = await axios.get(
      `https://goatqcm-instance.com/qcms/${qcmId}`
    );

    //****get user*************************************** */
    console.log(username);
    console.log(token);
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );

      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.username = resultUserFinal.username),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    console.log(result.data);
    console.log(saveUserQcm);
    formData.append("image", file);
    formData.append("qcmStandard", JSON.stringify(result.data));
    formData.append("OurUsers", JSON.stringify(saveUserQcm));
    axios
      .post("https://goatqcm-instance.com/noteqcm/uploadimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("succes insert image");
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //***store description to database*************************** */
  const AjouterDesc = async (qcmId) => {
    testDescExsite(qcmId);
    const result = await axios.get(
      `https://goatqcm-instance.com/qcms/${qcmId}`
    );
    console.log(result.data);
    /***get user***************************************************** */

    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      console.log(resultUserFinal);
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.username = resultUserFinal.username),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    //***************************************************************** */
    const formData = new FormData();
    formData.append("noteqcm", noteQcm);
    formData.append("qcmStandard", JSON.stringify(result.data));
    formData.append("OurUsers", JSON.stringify(saveUserQcm));
    console.log("TOKEN:", token);
    axios
      .post("https://goatqcm-instance.com/noteqcm/uploanoteqcm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setvisisbleDescInsert(false);
      })
      .catch((err) => {
        console.error("Status:", err.response?.status);
        console.error("Headers:", err.response?.headers);
        console.error("Body:", err.response?.data);
      });
  };
  //******************************************************* */
  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    console.log(qcmId);
    console.log(userId);

    try {
      const fullDescResultiniial = await axios.get(
        `https://goatqcm-instance.com/noteqcm/${qcmId}/${userId}`
      );
      console.log(fullDescResultiniial.data.id);
      getResultNote.value = await axios.get(
        `https://goatqcm-instance.com/noteqcm/${fullDescResultiniial.data.id}`
      );
      console.log(getResultNote.value.data.imageName);
    } catch (Exception) {}

    if (getResultNote.value) {
      try {
        setNoteQcmEdite(getResultNote.value.data);

        setFileDisplayEdite(
          `https://goatqcm-instance.com/noteqcm/image/${getResultNote.value.data.id}/${getResultNote.value.data.imageName}`
        );

        setLoadImage(getResultNote.value.data);
        setvisisbleDescInsert(false);
        setVisisbleDescUpdate(true);
      } catch (Exception) {}
    } else {
      setvisisbleDescInsert(true);
      setVisisbleDescUpdate(false);
    }
    //getFullDesc.value = fullDescResult.data;
  };
  //******************************************* *
  //***get image from local distination and display it****** */
  const getFileEdite = (e) => {
    setFileEdite(e.target.files[0]);
    setFileDisplayEdite(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */
  ///*****update image************************************** */
  const UpdateImage = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(
        `https://goatqcm-instance.com/noteqcm/updateimage/${getResultNote.value.data.id}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  ///*****update description************************************** */
  const UpdateDesc = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("noteqcm", noteQcmEdite.noteQcm);
    await axios
      .put(
        `https://goatqcm-instance.com/noteqcm/${getResultNote.value.data.id}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (qcmId) => {
    await axios.delete(
      `https://goatqcm-instance.com/noteqcm/${getResultNote.value.data.id}`
    );
    console.log("hry");
    /* qcmIddelete.value = qcmId;
      setModalDeleteCourIsOpen(true);*/
  };
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setVisibleImgeBigFormat(false);
  }
  //**************************************************** */
  const handleZoomBtnImage = () => {
    setVisibleImgeBigFormat(true);
    console.log("walid");
  };
  return (
    <>
      {isDesktopOrLaptop && visisbleDescInsert && (
        <div className={classes.imgdescdiv}>
          <div className={classes.fulldescription}>
            <div className={classes.imagediv}>
              <img src={fileDisplay} />
              <input type="file" onChange={getFile}></input>
            </div>
            <div className={classes.descarea}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                onChange={(e) => setNoteQcm(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className={`${classes.updtimage} btn btn-primary`}
            onClick={(e) => AjouterImage(props.qcmId)}
          >
            Ajouter Image
          </button>

          <button
            className={`${classes.updtdesc} btn btn-primary`}
            type="submit"
            onClick={(e) => AjouterDesc(props.qcmId)}
          >
            Ajouter Commentaire
          </button>
        </div>
      )}
      {isDesktopOrLaptop && VisisbleDescUpdate && (
        <div className={classes.imgdescdiv}>
          <div className={classes.fulldescription}>
            <div
              className={classes.imagediv}
              onClick={(e) => handleZoomBtnImage()}
            >
              <img src={FileDisplayEdite} onChange={getFileEdite} />
              <input type="file" onChange={getFileEdite}></input>
            </div>
            <div className={classes.descarea}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                value={noteQcmEdite.noteQcm}
                onChange={(e) =>
                  setNoteQcmEdite({
                    ...noteQcmEdite,
                    noteQcm: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className={`${classes.updtimage} btn btn-primary`}
            onClick={(e) => UpdateImage(props.qcmId)}
          >
            Update Image
          </button>

          <button
            type="button"
            className={`${classes.deeletefulldesc} btn btn-danger`}
            onClick={(e) => deleteFullDesc(props.qcmId)}
          >
            Delete
          </button>
          <button
            className={`${classes.updtdesc} btn btn-primary`}
            type="submit"
            onClick={(e) => UpdateDesc(props.qcmId)}
          >
            Update Commentaire
          </button>
        </div>
      )}

      {isTabletOrMobile && visisbleDescInsert && (
        <div className={classes.imgdescdiv_phone}>
          <div className={classes.fulldescription_phone}>
            <div className={classes.imagediv_phone}>
              <img src={fileDisplay} />
              <input type="file" onChange={getFile}></input>
            </div>
            <button
              type="submit"
              className={`${classes.updtimage_phone} btn btn-primary`}
              onClick={(e) => AjouterImage(props.qcmId)}
            >
              Ajouter Image
            </button>
            <div className={classes.descarea_phone}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                onChange={(e) => setNoteQcm(e.target.value)}
              ></textarea>
              <button
                className={`${classes.updtdesc_phone} btn btn-primary`}
                type="submit"
                onClick={(e) => AjouterDesc(props.qcmId)}
              >
                Ajouter Commentaire
              </button>
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && VisisbleDescUpdate && (
        <div className={classes.imgdescdiv_phone}>
          <div className={classes.fulldescription_phone}>
            <div
              className={classes.imagediv_phone}
              onClick={(e) => handleZoomBtnImage()}
            >
              <img src={FileDisplayEdite} onChange={getFileEdite} />
              <input type="file" onChange={getFileEdite}></input>
            </div>
            <button
              type="submit"
              className={`${classes.updtimage_phone} btn btn-primary`}
              onClick={(e) => UpdateImage(props.qcmId)}
            >
              Update Image
            </button>
            <div className={classes.descarea_phone}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                value={noteQcmEdite.noteQcm}
                onChange={(e) =>
                  setNoteQcmEdite({
                    ...noteQcmEdite,
                    noteQcm: e.target.value,
                  })
                }
              ></textarea>
              <button
                className={`${classes.updtdesc_phone} btn btn-primary`}
                type="submit"
                onClick={(e) => UpdateDesc(props.qcmId)}
              >
                Update Commentaire
              </button>
            </div>
            <button
              type="button"
              className={`${classes.deeletefulldesc_phone} btn btn-danger`}
              onClick={(e) => deleteFullDesc(props.qcmId)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isDesktopOrLaptop && visibleImgeBigFormat && (
        <>
          <div className={classes.fullzoomimage}>
            <img src={FileDisplayEdite} />
            <input type="file" onChange={getFileEdite}></input>
          </div>
        </>
      )}
      {isDesktopOrLaptop && visibleImgeBigFormat && (
        <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
      )}
    </>
  );
}
export default NoteQcm;
