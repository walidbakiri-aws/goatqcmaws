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
  /*const API_KEY_1 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_1;
  const API_KEY_2 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_2;
  const API_KEY_3 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_3;
  const API_KEY_4 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_4;
  const API_KEY_5 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_5;
  const API_KEY_6 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_6;
  const API_KEY_7 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_7;
  const API_KEY_8 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_8;
  const API_KEY_9 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_9;
  const API_KEY_10 = import.meta.env.VITE_OPENAI_API_KEY_CHAT_10;
*/

  const API_KEY_1 =
    "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";
  const API_KEY_2 =
    "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";
  /*const API_KEY_3 =
    "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";
  const API_KEY_4 =
    "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";
  const API_KEY_5 =
    "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";
  const API_KEY_6 =
    "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";
  const API_KEY_7 =
    "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";
  const API_KEY_8 =
    "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";
  const API_KEY_9 =
    "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";
  const API_KEY_10 =
    "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";*/

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
      /* API_KEY_3,
      API_KEY_4,
      API_KEY_5,
      API_KEY_6,
      API_KEY_7,
      API_KEY_8,
      API_KEY_9,
      API_KEY_10,*/
    ];

    let apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-4", // Change this from "gpt-3.5-turbo-0613" to "gpt-4"
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
