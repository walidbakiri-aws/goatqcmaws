import { useState } from "react";
import Sidebar from "../../pages/Sidebar";
import BtnAdd from "./BtnAdd";
import classes from "./NavigationBar.module.css";
import goatlogonavbare from "./goatlogonavbare.png";
import UserService from "./service/UserService";

function NavigationBar(props) {
  const [BtnNav, setBtnNav] = useState(true);
  const navButtonHndler = () => {
    setBtnNav(true);
    if (BtnNav === true) {
      setBtnNav(false);
    }
  };
  const [modalIsOpen, setMoladIsOpen] = useState(false);

  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  return (
    <>
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="p-4">
          <h5 className="text-body-emphasis h4">Collapsed content</h5>
          <span className="text-body-secondary">
            Toggleable via the navbar brand.
          </span>
        </div>
      </div>
      <nav className={`${classes.navdiv} navbar navbar-dark `}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              navButtonHndler(), props.changeetatsidebar(BtnNav);
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <BtnAdd />
          <img src={goatlogonavbare} height="100%" width="80" />
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
