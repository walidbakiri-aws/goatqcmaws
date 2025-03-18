import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import classes from "./RegistrationPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import { useSignal } from "@preact/signals-react";
import logologingoat from "../img/logologingoat.png";
import ModalReg from "./ModalReg";
import BackdropReg from "./BackdropReg";
function RegistrationPage() {
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [confirmePasswrord, setConfirmePasswrord] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    role: "USER",
  });
  const userState = {
    stateActive: false,
    users: {},
  };
  let checkExisteUser = useSignal(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.username = formData.username.toLowerCase().trim(); // Added trim()

    try {
      if (formData.password !== confirmePasswrord) {
        toast.error("Les mots de passe ne correspondent pas!");
        return;
      }

      if (formData.password.length < 4) {
        toast.error("Le mot de passe doit contenir au moins 4 caractères!");
        return;
      }

      await UserService.register(formData);
      toast.success("Inscription réussie!");
      navigate("/");

      // Reset form only on success
      setFormData({
        name: "",
        lastname: "",
        username: "",
        password: "",
      });
      setConfirmePasswrord("");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Erreur lors de l'inscription");
    }
  };
  const handleCancel = async (e) => {
    navigate("/");
  };
  //********************************************** */
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  //-----------------------------------------------------
  const shoModal = () => {
    setMoladIsOpen(true);
  };

  const testbtn = () => {
    console.log(formData.username);
    console.log(formData.password);
  };
  return (
    <div className={classes.loginform}>
      {isTabletOrMobile && (
        <>
          <div className={classes.wrapperphone}>
            <h1>S’inscrire</h1>
            <form onSubmit={handleSubmit}>
              <div className={classes.wrapperinputphone}>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Prénom"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Nom de famille"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />

                <input
                  className={`${classes.inputusername} form-control`}
                  type="email"
                  placeholder="Email"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />

                <input
                  type={"password"}
                  className="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <input
                  type={"password"}
                  className="form-control"
                  placeholder="Confirm mot de passe"
                  name="confirmepassword"
                  id="confirmepassword"
                  value={confirmePasswrord}
                  onChange={(e) => {
                    setConfirmePasswrord(e.target.value);
                  }}
                />
              </div>
              <div className={classes.btnform}>
                <button
                  type="submit"
                  className={`${classes.btninscret} btn btn-success`}
                >
                  S'inscrire
                </button>
                <button
                  type="submit"
                  onClick={handleCancel}
                  className={`${classes.btncancel} btn btn-danger`}
                  to="/"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isDesktopOrLaptop && (
        <>
          <div className={classes.fullloginpage}>
            <div className={classes.child_phone}>
              <button onClick={testbtn}>test</button>
              <div className={classes.logoimage}>
                <img src={logologingoat}></img>
              </div>
            </div>
            <div className={classes.child_phone}>
              <div className={classes.wrapper}>
                <h1>S’inscrire</h1>
                <form onSubmit={handleSubmit}>
                  <div className={classes.wrapperinput}>
                    <input
                      type={"text"}
                      className="form-control"
                      placeholder="Prénom"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />

                    <input
                      type={"text"}
                      className="form-control"
                      placeholder="Nom de famille"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      className={`${classes.inputusername} form-control`}
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />

                    <input
                      type={"password"}
                      className="form-control"
                      placeholder="Mot de passe"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />

                    <input
                      type={"password"}
                      className="form-control"
                      placeholder="Confirm mot de passe"
                      name="confirmepassword"
                      id="confirmepassword"
                      value={confirmePasswrord}
                      onChange={(e) => {
                        setConfirmePasswrord(e.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.btnform}>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={`${classes.btninscret} btn btn-success`}
                    >
                      S'inscrire
                    </button>
                    <button
                      type="submit"
                      onClick={handleCancel}
                      className={`${classes.btncancel} btn btn-danger`}
                      to="/"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {modalIsOpen && <ModalReg onCancel={closeModalHandler} />}
      {modalIsOpen && <BackdropReg />}
      <Toaster />
    </div>
  );
}
export default RegistrationPage;
