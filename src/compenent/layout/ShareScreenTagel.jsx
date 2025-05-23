import { useEffect, useState } from "react";
import UserService from "./service/UserService";
import classes from "./ShareScreenTagel.module.css";

import axios from "axios";
import { useSignal } from "@preact/signals-react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function ShareScreenTagel(props) {
  //******************************************************************* */

  const [isToggled, setIsToggled] = useState(false);
  const [shareScreen, setShareScreen] = useState([]);
  const [ShowlodalShare, setShowlodalShare] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");
  const codesharescreen = useSignal("");
  useEffect(() => {
    console.log(props.screensharecode);
    loadShareUserId();
  }, []);
  /********Share***************************************************/
  const loadShareUserId = async () => {
    try {
      const resultLoadChat = await axios.get(
        `https://goatqcm-instance.com/sharescreen/getbyuserid/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShareScreen(resultLoadChat.data[0]);
      setShowlodalShare(true);
      setIsToggled(resultLoadChat.data[0].isSharing);
      codesharescreen.value = resultLoadChat.data[0].shareScreenCode;
      console.log(resultLoadChat.data[0].isSharing);
      console.log(resultLoadChat.data);
    } catch (Exception) {}
  };
  /**************************************************************** */
  const handleneDeteleShareScreen = async () => {
    await axios.delete(
      `https://goatqcm-instance.com/sharescreen/${shareScreen.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setShowlodalShare(false);
  };

  /************************************************************************ */
  const handleToggle = async () => {
    const newState = !isToggled;
    setIsToggled(newState);
    console.log(codesharescreen.value);
    localStorage.removeItem("codeSharingCode");
    try {
      setMessages([]);
      await fetch(
        `https://goatqcm-instance.com/chat/clear/${codesharescreen.value}`,
        {
          method: "POST",
        }
      );
    } catch (Exception) {}
    try {
      await axios.put(
        `https://goatqcm-instance.com/sharescreen/${shareScreen.id}/status`,
        { isSharing: newState },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("isSharingState", String(newState));
      localStorage.setItem("codeSharingCode", codesharescreen.value);
      toast.success("Status updated successfully");
      let shareScreenCode = localStorage.setItem(
        "sharescreencode",
        shareScreen.shareScreenCode
      );
    } catch (error) {
      setIsToggled(!newState); // Revert on error
      toast.error("Failed to update sharing status");
    }
  };
  /******************************************************************* */

  return (
    <>
      {isDesktopOrLaptop && ShowlodalShare && (
        <>
          <div className={`${classes.modal} `}>
            <div className={classes.toggleContainer}>
              <div
                className={`${classes.toggleSwitch} ${
                  isToggled ? classes.active : ""
                }`}
                onClick={handleToggle}
              >
                <div className={classes.slider}></div>
              </div>
              <p>Status: {isToggled ? "true" : "false"}</p>
            </div>
            <div className={`${classes.shareInfo} `}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">nop de chat</th>
                    <th scope="col">code de chat</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{shareScreen.id}</td>
                    <td>{shareScreen.shareScreenName}</td>
                    <td>{shareScreen.shareScreenCode}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => {
                          handleneDeteleShareScreen();
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {isTabletOrMobile && ShowlodalShare && (
        <>
          <div className={`${classes.modal_phone} `}>
            <div className={classes.toggleContainer_phone}>
              <div
                className={`${classes.toggleSwitch_phone} ${
                  isToggled ? classes.active : ""
                }`}
                onClick={handleToggle}
              >
                <div className={classes.slider_phone}></div>
              </div>
              <p>Status: {isToggled ? "true" : "false"}</p>
            </div>
            <div className={`${classes.shareInfo_phone} `}>
              <ul className="list-group">
                <li className="list-group-item">id: {shareScreen.id}</li>
                <li className="list-group-item">
                  nom: {shareScreen.shareScreenName}
                </li>
                <li className="list-group-item">
                  code: {shareScreen.shareScreenCode}
                </li>
                <li className="list-group-item">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      handleneDeteleShareScreen();
                    }}
                  >
                    Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
}

export default ShareScreenTagel;
