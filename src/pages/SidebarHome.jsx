import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import { BiLogOut } from "react-icons/bi";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import UserService from "../compenent/layout/service/UserService";
function SidebarHome() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  //***************************************************************** */
  const UpdtAbnDeconnect = {
    stateActiveLogin: false,
  };

  //******************************************************************* */

  //**update login etate active********************************
  const updateEtatLogin = async () => {
    const userId = localStorage.getItem("userId");
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
  const handleLogout = (e) => {
    updateEtatLogin();
    UserService.logout();
  };
  return (
    <>
      <div
        className={`${classes.sidebar} d-flex flex-column justify-space-between text-white border p-2 vh-100`}
      >
        {isAuthenticated && (
          <li className="nav-link text-black fs-6">
            <Link to={"/"} onClick={handleLogout}>
              <BiLogOut className={classes.icons} />
              <span className="fs-6 p-2">Déconnecter </span>
            </Link>
          </li>
        )}
      </div>
    </>
  );
}
export default SidebarHome;
