import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../service/UserService";
import classes from "./FindUser.module.css";
import NavigationBar from "../NavigationBar";
import Sidebar from "../../../pages/Sidebar";
import LogOutAllDevices from "../../../pages/LogOutAllDevices";
import Backdrop from "../../../pages/Backdrop";
import { useSignal } from "@preact/signals-react";
function FindUser() {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const saveUserId = useSignal("");
  const [showUserDiv, setShowUserDiv] = useState(false);
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  /***************************************** */
  const UpdtAbnDeconnect = {
    stateActiveLogin: false,
  };
  //************************************************* */

  const [userName, setUserName] = useState("");

  useEffect(() => {}, []);
  //********************************************************* */
  const fetchUsers = async () => {
    console.log(userName);
    try {
      const token = localStorage.getItem("tokengoat");

      const response = await UserService.getUserByuserName(userName, token);
      setUser(response);

      console.log(response);
    } catch (error) {
      console.log("Error fetching users :", error);
    }
  };
  /******************************************************** */
  //***delete user********************************************* */
  const deleteUser = async (userId) => {
    try {
      //promt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want delete this user!"
      );

      const token = localStorage.getItem("tokengoat");
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  //*********************************************************** */

  //*********************************************** */
  //**update login etate active********************************
  const updateEtatLoginDeconnect = async (userId) => {
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

  ///*********fnd user************************** */
  const handleFindUser = () => {
    fetchUsers();
    setShowUserDiv(true);
  };
  //******************************************* */
  return (
    <>
      <div className={classes.modal}>
        <div className="container">
          <div className="py-4">
            <div className={classes.searchediv}>
              <input
                type={"text"}
                name="yearName"
                required
                placeholder="Enter confirmation password "
                className="form-control"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => {
                  handleFindUser();
                }}
              >
                Search
              </button>
            </div>
            {showUserDiv && (
              <div className="py-4">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">LastName</th>
                      <th scope="col">UserName</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tr>
                    <td>#</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link
                        to={`/admin/get-users/${user.id}`}
                        className="btn btn-primary mx-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/update-user/${user.id}`}
                        className="btn btn-outline-primary mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger mx-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => updateEtatLoginDeconnect(user.id)}
                        className="btn btn-info mx-2"
                      >
                        LogOut
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default FindUser;
