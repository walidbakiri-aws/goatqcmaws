import { useNavigate } from "react-router-dom";
import classes from "./BtnAdd.module.css";
import UserService from "./service/UserService";
function BtnAdd() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isParticipateAdmin = UserService.isParticipateAdmin();

  //*****function link to**************
  let navigateYear = useNavigate();
  const routeChangeYaer = () => {
    let path = `/medicalyear`;
    navigateYear(path);
  };
  //**************************************
  //*****function link to**************
  let navigateModule = useNavigate();
  const routeChangeModule = () => {
    let path = `/module`;
    navigateModule(path);
  };
  //**************************************
  //*****function link to**************
  let navigateCours = useNavigate();
  const routeChangeCours = () => {
    let path = `/cours`;
    navigateCours(path);
  };
  //**************************************
  /*
  //*****function link to**************
  let navigateQcms = useNavigate();
  const routeChangeQcms = () => {
    let path = `/qcms`;
    navigateQcms(path);
  };
  //***************************************/
  return (
    <>
      <div className={classes.btncontainer}>
        {isAuthenticated && isAdmin && (
          <div>
            <button
              onClick={routeChangeYaer}
              type="button"
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
            >
              add Year
            </button>
            <button
              onClick={routeChangeModule}
              type="button"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
            >
              Add Module
            </button>
          </div>
        )}
        {isParticipateAdmin && (
          <button
            onClick={routeChangeCours}
            type="button"
            className="btn btn-warning"
            style={{ marginRight: "10px" }}
          >
            Add Cours
          </button>
        )}
      </div>
    </>
  );
}

export default BtnAdd;
