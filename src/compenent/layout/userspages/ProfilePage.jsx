import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../service/UserService";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("tokengoat");
      //const response = await UserService.getYourProfil(token);
      const response = await UserService.getYourProfil(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.log("Error fetching profile information", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4"> User Information</h2>
          <div className="card">
            <div className="card-header">
              Detailes of user id:
              <ul className="lise-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: {profileInfo.name}</b>
                </li>
                <li className="list-group-item">
                  <b>LastName: {profileInfo.lastname}</b>
                </li>
                <li className="list-group-item">
                  <b>username:{profileInfo.username}</b>
                </li>
              </ul>
            </div>
          </div>
          {profileInfo.role === "ADMIN" && (
            <Link
              className="btn btn-primary my-2"
              to={`/update-user/${profileInfo.id}`}
            >
              Update this Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
/*

*/
