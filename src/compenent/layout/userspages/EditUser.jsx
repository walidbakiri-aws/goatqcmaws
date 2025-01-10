import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";

function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = localStorage.getItem("tokengoat");
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    username: "",
    role: "",
  });
  useEffect(() => {
    console.log(userId);
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const response = await UserService.getUserById(userId, token);
      const { name, lastname, username, role } = response.ourUsers;
      setUserData({ name, lastname, username, role });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.updateUser(userId, userData, token);
      console.log(res);
      // Redirect to profile page or display a success message
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  //-----------------------------------------------------
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Edit User</h2>
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                LastName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="lastname"
                value={userData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Role" className="form-label">
                Role
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your email adresse"
                name="role"
                value={userData.role}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-info">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditUser;
