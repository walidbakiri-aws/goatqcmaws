import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../service/UserService";
import classes from "./UserManagementPage.module.css";
import NavigationBar from "../NavigationBar";
import Sidebar from "../../../pages/Sidebar";
import LogOutAllDevices from "../../../pages/LogOutAllDevices";
import Backdrop from "../../../pages/Backdrop";
import { useSignal } from "@preact/signals-react";
import FindUser from "./FindUser";
function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const saveUserId = useSignal("");
  const [finUserModel, setFinUserModel] = useState(false);
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("tokengoat");
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.log("Error fetching users :", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      //promt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want delete this user!"
      );

      const token = localStorage.getItem("tokengoat");
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  //************************************************* */
  function closeModalHandlerFindUser() {
    setFinUserModel(false);
  }
  //*********************************************** */
  //************************************************* */
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  //*********************************************** */
  const LogOutUser = async (userId) => {
    saveUserId.value = userId;
    setMoladIsOpen(true);
  };

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        <div className={classes.contanerspace}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setFinUserModel(true)}
          >
            Search
          </button>
          <div className="container">
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
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
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
                          onClick={() => LogOutUser(user.id)}
                          className="btn btn-info mx-2"
                        >
                          LogOut
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {finUserModel && (
        <FindUser onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}
      {finUserModel && <Backdrop onCancel={closeModalHandlerFindUser} />}
      {modalIsOpen && (
        <LogOutAllDevices
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
          userId={saveUserId.value}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}
export default UserManagementPage;
