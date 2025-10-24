// src/pages/ChatGptfinal.jsx
import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./Chatgpt.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import playsessionicon from "../compenent/layout/img/playsession.png";
import detail from "../compenent/layout/img/detailicon.png";
import UserService from "../compenent/layout/service/UserService";
import ModalDetailSession from "./ModalDetailSession";
import Backdrop from "./Backdrop";
import fullchatgpt from "../compenent/layout/img/fullchatgpt.png";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function ChatGptfinal(props) {
  // ------------------ API KEYS ------------------
  const API_KEY_1 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_1;
  const API_KEY_2 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_2;
  const API_KEY_3 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_3;
  const API_KEY_4 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_4;
  const API_KEY_5 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_5;
  const API_KEY_6 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_6;
  const API_KEY_7 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_7;
  const API_KEY_8 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_8;
  const API_KEY_9 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_9;
  const API_KEY_10 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_10;

  const systemMessage = { role: "system", content: "" };

  // ------------------ SIDEBAR ------------------
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  // ------------------ USER INFO ------------------
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  let getQcmContent = useSignal("");

  // ------------------ UI ------------------
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    getQcm(props.qcmId);
  }, []);

  const getQcm = async (qcmId) => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcms/${qcmId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const content = result.data.qcmContent;

    const response = await axios.get(
      `https://goatqcm-instance.com/qcms/${qcmId}/reponses`
    );
    const allPropositions = response.data.propositionQcm || [];

    const propTexts = response.data.map((item, index) => {
      const letter = String.fromCharCode(65 + index);
      return `${letter}. ${item.propositionQcm}`;
    });

    setInputValue(content + propTexts.join("\n"));
  };

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  // ------------------ RETRY SYSTEM ------------------
  async function processMessageToChatGPT(chatMessages) {
    const apiKeys = [
      API_KEY_1,
      API_KEY_2,
      API_KEY_3,
      API_KEY_4,
      API_KEY_5,
      API_KEY_6,
      API_KEY_7,
      API_KEY_8,
      API_KEY_9,
      API_KEY_10,
    ];

    let apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo-0613",
      messages: [systemMessage, ...apiMessages],
    };

    let responseData = null;
    let success = false;

    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKeys[i]}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        if (!response.ok) {
          console.warn(`API key ${i + 1} failed (${response.status})`);
          continue;
        }

        const data = await response.json();

        if (data?.choices?.[0]?.message?.content) {
          responseData = data;
          success = true;
          break;
        }
      } catch (err) {
        console.error(`Error with API key ${i + 1}:`, err);
        continue;
      }
    }

    if (!success) {
      setMessages([
        ...chatMessages,
        {
          message: "⚠️ All API keys failed. Please try again later.",
          sender: "ChatGPT",
        },
      ]);
      setIsTyping(false);
      return;
    }

    setMessages([
      ...chatMessages,
      { message: responseData.choices[0].message.content, sender: "ChatGPT" },
    ]);
    setIsTyping(false);
  }

  // ------------------ RENDER ------------------
  return (
    <>
      {isDesktopOrLaptop && (
        <>
          <div className={`${classes.fulllogo}`}>
            <img src={fullchatgpt} height="50" width="50" />
          </div>
          <div
            style={{ position: "relative", height: "800px", width: "700px" }}
          >
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={
                    isTyping ? (
                      <TypingIndicator content="ChatGpt is typing" />
                    ) : null
                  }
                >
                  {messages.map((message, i) => (
                    <Message
                      key={i}
                      model={{
                        message: message.message,
                        sentTime: message.sentTime,
                        sender: message.sender,
                        direction:
                          message.sender === "user" ? "outgoing" : "incoming",
                        position: "single",
                      }}
                    />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Type message here"
                  value={inputValue}
                  onChange={(val) => setInputValue(val)}
                  onSend={() => {
                    handleSend(inputValue);
                    setInputValue("");
                  }}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </>
      )}
      {isTabletOrMobile && (
        <>
          <div className={`${classes.quizzContainer_phone}`}>
            <div className={`${classes.fulllogo_phone}`}>
              <img src={fullchatgpt} height="50" width="50" />
            </div>
            <div
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <MainContainer>
                <ChatContainer>
                  <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={
                      isTyping ? (
                        <TypingIndicator content="ChatGpt is typing" />
                      ) : null
                    }
                  >
                    {messages.map((message, i) => (
                      <Message
                        key={i}
                        model={{
                          message: message.message,
                          sentTime: message.sentTime,
                          sender: message.sender,
                          direction:
                            message.sender === "user" ? "outgoing" : "incoming",
                          position: "single",
                        }}
                      />
                    ))}
                  </MessageList>
                  <MessageInput
                    placeholder="Type message here"
                    value={inputValue}
                    onChange={(val) => setInputValue(val)}
                    onSend={() => {
                      handleSend(inputValue);
                      setInputValue("");
                    }}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChatGptfinal;
