import axios from "axios";
class UserService {
  static baseURL = "https://goatqcm-instance.com";

  static async login(username, password) {
    //console.log(username);

    try {
      const response = await axios.post(`${UserService.baseURL}/auth/login`, {
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
      fetch("https://goatqcm-instance.com/auth/register", userData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.data);
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get(
        `${UserService.baseURL}/admin/get-all-users`,

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
        `${UserService.baseURL}/adminuserpartc/getuserbyname/${username}`,
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
        `${UserService.baseURL}/adminuser/get-profile`,

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
        `${UserService.baseURL}/admin/get-users/${userId}`,

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
        `${UserService.baseURL}/admin/delete/${userId}`,

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
        `${UserService.baseURL}/admin/update/${userId}`,
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
