import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./ChatBoxGlobal.module.css";
import UserService from "./service/UserService";
import { useLocation } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";
import sendmessage from "../layout/img/sendmessage.png";
import settings from "../layout/img/settings.png";
import ModalDeleteChat from "./ModalDeleteChat";
import Backdrop from "./Backdrop";
function ChatBoxGlobal(props) {
  const [modalIsDteleChat, setModalIsDteleChat] = useState(false);
  let [ShowDiscsussionDiv, setShowDiscsussionDiv] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [chatroom, setChatroom] = useState("default");
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isAnonyme, setIsAnonyme] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("tokengoat");

  let userId = localStorage.getItem("userId");
  let saveUser = {
    name: "",
  };
  const location = useLocation();
  const chatCode = props.chatcode;
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  useEffect(() => {
    // clearChat();
    if (ShowDiscsussionDiv === false) {
      setShowDiscsussionDiv(true);
    }
    console.log(ShowDiscsussionDiv);
    getUser();
    //if (!chatroom.trim()) return;

    fetch(`https://goatqcm-instance.com/chat/history/${chatroom}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .then((data) => console.log(data));

    const client = new Client({
      webSocketFactory: () => new SockJS("https://goatqcm-instance.com/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/messages/${chatroom}`, (frame) => {
          const receivedMessage = JSON.parse(frame.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          // Increment localStorage message count
          const prevCount = Number(localStorage.getItem("messageCount")) || 0;
          const newCount = prevCount + 1;
          localStorage.setItem("messageCount", newCount);

          // Notify all listeners
          window.dispatchEvent(new Event("newGlobalMessage"));
          /*  localStorage.setItem(
            "messageCount",
            Number(localStorage.getItem("messageCount")) + 1
          );*/
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setConnected(false);
      setMessages([]);
    };
  }, [chatroom]);
  const clearChat = async () => {
    try {
      setMessages([]);
      await fetch(`https://goatqcm-instance.com/chat/clear/${chatroom}`, {
        method: "POST",
      });
    } catch (Exception) {}
  };
  //*********getUser************************************************** */
  const getUser = async () => {
    console.log(userId);
    console.log(token);
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );

      (saveUser.name = resultUserFinal.name), console.log(saveUser);
      console.log(resultUserFinal.name);
      setNickname(resultUserFinal.name);
      setChatroom(chatCode);
    } catch (Exception) {
      console.log("user not found");
    }
  };
  //*****************************************************************
  const sendMessage = async () => {
    if (message.trim() && stompClient && connected) {
      const chatMessage = {
        nickname: isAnonyme ? "Anonyme" : nickname,
        content: message,
      };
      stompClient.publish({
        destination: `/app/chat/${chatroom}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };
  const handlesettingBtn = async () => {
    /*****clear chat**************************************************************/
    /*setMessages([]);
    await fetch(`http://localhost:8080/chat/clear/${chatroom}`, {
      method: "POST",
    });*/
    /***********************************************************************/

    setModalIsDteleChat(true);
    setShowDiscsussionDiv(false);
  };
  function closeModalHandler() {
    setModalIsDteleChat(false);
    setShowDiscsussionDiv(false);
    localStorage.setItem("showdiscussiondiv", "false");
  }
  return (
    <>
      {ShowDiscsussionDiv && isDesktopOrLaptop && (
        <div className={styles.chatContainer}>
          <div className={styles.discussionheader}>
            <div className={styles.settings}>
              <img
                src={settings}
                height="24"
                width="25"
                onClick={(e) => {
                  handlesettingBtn();
                }}
                disabled={!message.trim()}
              />
            </div>
            <div className={styles.toggleAnonyme}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isAnonyme}
                  onChange={(e) => setIsAnonyme(e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
              <span className={styles.anonymeLabel}>Anonyme</span>
            </div>

            <div className={styles.closeicon}>
              <TfiClose
                onClick={(e) => {
                  setShowDiscsussionDiv(false);
                }}
              />
            </div>
          </div>

          <div className={styles.messageList}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageItem} ${
                  msg.nickname === nickname ? styles.sent : styles.received
                }`}
              >
                <div className={styles.fulldiscussion}>
                  <div className={styles.nickname}>{msg.nickname}</div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>{msg.content}</div>
                  </div>
                  <div className={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageInput}
            />
            <img
              src={sendmessage}
              style={{ marginTop: 5 }}
              height="30"
              width="30"
              onClick={sendMessage}
              disabled={!message.trim()}
            />
          </div>
        </div>
      )}
      {ShowDiscsussionDiv && isTabletOrMobile && (
        <div className={styles.chatContainer_phone}>
          <div className={styles.discussionheader_phone}>
            <div className={styles.toggleAnonyme_phone}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isAnonyme}
                  onChange={(e) => setIsAnonyme(e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
              <span className={styles.anonymeLabel_phone}>Anonyme</span>
            </div>
            <div className={styles.closeicon_phone}>
              <TfiClose
                onClick={(e) => {
                  setShowDiscsussionDiv(false);
                }}
              />
            </div>
            <div className={styles.settings_phone}>
              <img
                src={settings}
                height="24"
                width="25"
                onClick={(e) => {
                  handlesettingBtn();
                }}
                disabled={!message.trim()}
              />
            </div>
          </div>

          <div className={styles.messageList_phone}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageItem_phone} ${
                  msg.nickname === nickname ? styles.sent : styles.received
                }`}
              >
                <div className={styles.fulldiscussion_phone}>
                  <div className={styles.nickname_phone}>{msg.nickname}</div>
                  <div className={styles.messageContent_phone}>
                    <div className={styles.messageText_phone}>
                      {msg.content}
                    </div>
                  </div>
                  <div className={styles.timestamp_phone}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.inputContainer_phone}>
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageInput}
            />
            <img
              style={{ marginTop: 5 }}
              src={sendmessage}
              height="30"
              width="30"
              onClick={sendMessage}
              disabled={!message.trim()}
            />
          </div>
        </div>
      )}
      {modalIsDteleChat && <Backdrop onCancel={closeModalHandler} />}
      {modalIsDteleChat && <ModalDeleteChat codechat={chatCode} />}
    </>
  );
}

export default ChatBoxGlobal;
