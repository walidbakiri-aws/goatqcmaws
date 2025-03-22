import axios from "axios";
class UserService {
  static BASE_URL = "https://goatqcm-instance.com";

  static async login(username, password) {
    //console.log(username);

    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        username,
        password,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.message);

      throw err;
    }
  }
  static async register(userData) {
    console.log(userData);
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: {
            Accept: "application/json ",
            "Content-Type": "multipart/form-data",
          },
          //withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  /*
  static async register(userData) {
    try {
      const response = await fetch(`${UserService.BASE_URL}/auth/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }*/

  static async getAllUsers(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async getUserByuserName(username, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuserpartc/getuserbyname/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.ourUsers);
      console.log("we found user");
      return response.data.ourUsers;
    } catch (err) {
      throw err;
    }
  }

  static async getYourProfil(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async getUserById(userId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${userId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${userId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      console.log(userData);
      const response = await axios.put(
        `${UserService.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /*Authentification checker*/
  static logout() {
    localStorage.removeItem("tokengoat");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("isAlreadyUserValidate");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("tokengoat");
    return !!token;
  }
  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }
  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
  static isParticipate() {
    const role = localStorage.getItem("role");
    return role === "PARTICIPATE";
  }
  static isParticipateAdmin() {
    return this.isAuthenticated() && (this.isAdmin() || this.isParticipate());
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
