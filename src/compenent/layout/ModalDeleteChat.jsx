import { useEffect, useState } from "react";
import UserService from "./service/UserService";
import classes from "./ModalDeleteChat.module.css";

import axios from "axios";
import { useSignal } from "@preact/signals-react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import sendmessage from "../layout/img/sendmessage.png";

function ModalDeleteChat(props) {
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");
  const [discussion, setDiscussion] = useState([]);
  const [ShowodalDeleteChat, setShowodalDeleteChat] = useState(true);
  const navigate = useNavigate();
  let chatId = useSignal("");
  useEffect(() => {
    console.log(props.codechat);
    loadChatUserId();
  }, []);
  /***get  chat by userID***************************************************** */
  const loadChatUserId = async () => {
    try {
      const resultLoadChat = await axios.get(
        `http://localhost:8080/chat/getbyuserid/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      chatId.value = resultLoadChat.data[0].id;
      setDiscussion(resultLoadChat.data[0]);
      console.log(resultLoadChat.data[0]);
    } catch (Exception) {}
  };
  /**************************************************************** */
  const handleneDeteleChat = async () => {
    await axios.delete(`http://localhost:8080/chat/${chatId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setShowodalDeleteChat(false);
  };
  return (
    <>
      {isDesktopOrLaptop && ShowodalDeleteChat && (
        <div className={`${classes.modal} `}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">nop de chat</th>
                <th scope="col">code de chat</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{discussion.id}</td>
                <td>{discussion.chatName}</td>
                <td>{discussion.chatCode}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      handleneDeteleChat();
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {isTabletOrMobile && ShowodalDeleteChat && (
        <div className={`${classes.modal_phone} `}>
          <ul className="list-group">
            <li className="list-group-item">{discussion.id}</li>
            <li className="list-group-item">{discussion.chatName}</li>
            <li className="list-group-item">{discussion.chatCode}</li>
            <li className="list-group-item">
              {" "}
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  handleneDeteleChat();
                }}
              >
                Supprimer
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ModalDeleteChat;
