import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./DeepSeek.module.css";
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
import deepseek from "../compenent/layout/img/deepseek.png";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function DeepSeek(props) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const systemMessage = {
    role: "system",
    content: "",
  };

  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  let getQcmContent = useSignal("");

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
    setInputValue(content + "\n" + propTexts.join("\n"));
  };

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hi, I'm DeepSeek,How can I help you today?",
      sentTime: "just now",
      sender: "DeepSeek",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === "DeepSeek" ? "assistant" : "user",
      content: msg.message,
    }));

    const apiRequestBody = {
      model: "deepseek/deepseek-chat-v3:free",
      messages: [systemMessage, ...apiMessages],
    };

    const maxRetries = 3;
    let delay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        if (response.status === 429) {
          if (attempt < maxRetries) {
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2;
            continue;
          } else {
            throw new Error("Rate limit exceeded. Please try again later.");
          }
        }

        const data = await response.json();
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "DeepSeek",
          },
        ]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.error(err.message);
        if (attempt === maxRetries) {
          setMessages([
            ...chatMessages,
            {
              message:
                "Sorry, we're experiencing high load. Please try again later.",
              sender: "DeepSeek",
            },
          ]);
          setIsTyping(false);
        }
      }
    }
  }

  return (
    <>
      {isDesktopOrLaptop && (
        <>
          <div className={`${classes.fulllogo}`}>
            <img src={deepseek} height="50" width="50" />
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
                      <TypingIndicator content="DeepSeek is typing" />
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
          <div className={`${classes.fulllogo_phone}`}>
            <img src={deepseek} height="50" width="50" />
          </div>
          <div style={{ position: "relative", height: "400px", width: "100%" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={
                    isTyping ? (
                      <TypingIndicator content="DeepSeek is typing" />
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
    </>
  );
}

export default DeepSeek;
