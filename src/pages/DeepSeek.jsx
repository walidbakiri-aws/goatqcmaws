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
  const API_KEY =
    "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";
  // "Explain things like you would to a 10 year old learning how to code."
  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content: "",
  };
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);

  /*********adresse Ip***************************** */
  let ipAdresse = useSignal("");
  let getUserAdresseIp = useSignal("");
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //************************************************* */
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isOnlyAdmin = UserService.adminOnly();
  let getQcmContent = useSignal("");
  //******************************************************************* */
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
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
    console.log(response.data);
    const allPropositions = response.data.propositionQcm || [];

    const propTexts = response.data.map((item, index) => {
      const letter = String.fromCharCode(65 + index); // A=65
      return `${letter}. ${item.propositionQcm}`;
    });
    console.log(propTexts);
    //setPropositions(propTexts); // ["A. Paroxystique", "B. En coup de poignard", ...]

    //setQcmContent(content);
    setInputValue(content + propTexts); // <-- set in MessageInput
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
    console.log(message);
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "DeepSeek") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "DeepSeek",
          },
        ]);
        setIsTyping(false);
      });
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
                    setInputValue(""); // reset input after send
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
              <img src={deepseek} height="50" width="50" />
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
                      setInputValue(""); // reset input after send
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

export default DeepSeek;
