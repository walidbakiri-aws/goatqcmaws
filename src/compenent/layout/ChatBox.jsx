import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./ChatBox.module.css";
import UserService from "./service/UserService";
import { useLocation } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";

function ChatBox(props) {
  let [ShowDiscsussionDiv, setShowDiscsussionDiv] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [chatroom, setChatroom] = useState("default");
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("tokengoat");
  const codechat = localStorage.getItem("codechat");
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
    if (ShowDiscsussionDiv === false) {
      setShowDiscsussionDiv(true);
    }
    console.log(ShowDiscsussionDiv);
    getUser();

    if (!chatroom.trim()) return;

    fetch(`https://goatqcm-instance.com/chat/history/${chatroom}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    const client = new Client({
      webSocketFactory: () => new SockJS("https://goatqcm-instance.com/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/messages/${chatroom}`, (frame) => {
          const receivedMessage = JSON.parse(frame.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
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
  const sendMessage = () => {
    if (message.trim() && stompClient && connected) {
      const chatMessage = { nickname, content: message };
      stompClient.publish({
        destination: `/app/chat/${chatroom}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };

  return (
    <>
      {ShowDiscsussionDiv && isDesktopOrLaptop && (
        <div className={styles.chatContainer}>
          <div className={styles.discussionheader}>
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
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {ShowDiscsussionDiv && isTabletOrMobile && (
        <div className={styles.chatContainer_phone}>
          <div className={styles.discussionheader_phone}>
            <div className={styles.closeicon_phone}>
              <TfiClose
                onClick={(e) => {
                  setShowDiscsussionDiv(false);
                }}
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

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageInput}
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
