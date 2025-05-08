import BtnAdd from "./BtnAdd";
import classes from "./NavigationBar.module.css";
import goatlogonavbare from "./goatlogonavbare.png";
import { useEffect, useState } from "react";
import UserService from "./service/UserService";
//import ModalChat from "./ModalChat";
import Backdrop from "./Backdrop";
import { useMediaQuery } from "react-responsive";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import axios from "axios";
import ChatBox from "./ChatBox";
import messanger from "../layout/img/messanger.png";
function NavigationBar(props) {
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */

  const [BtnNav, setBtnNav] = useState(true);
  const navButtonHndler = () => {
    setBtnNav(true);
    if (BtnNav === true) {
      setBtnNav(false);
    }
  };

  const [modalIsOpen, setMoladIsOpen] = useState(false);
  //************************************************************* */
  const [ShowDiscsussionDiv, setShowDiscsussionDiv] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const [showButtonChoseFirstAction, setShowButtonChoseFirstAction] =
    useState(true);
  const [showAddNewChat, setshowAddNewChat] = useState(false);
  const [showEnterCodeChat, setShowEnterCodeChat] = useState(false);

  const [showFullChatDiv, setShowFullChatDiv] = useState(true);
  const [chat, setChat] = useState({
    chatName: "",
    chatCode: "",
    ourUsers: {},
  });
  const [codeChat, setCodeChat] = useState("");
  let saveUser = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };

  let dicsussion = useSignal("");

  /*********************************************** */
  function closeModalHandler() {
    setMoladIsOpen(false);
  }
  const handleChatBtn = () => {
    setshowAddNewChat(false);
    setShowEnterCodeChat(false);
    console.log("hey walid");
    setMoladIsOpen(true);
    loadChatUserId(userId);
  };

  /***model chat************************************************************* */

  useEffect(() => {}, []);

  //****button action////////////////////////////////////////// */
  const handlecodediscussionBtn = () => {
    setShowButtonChoseFirstAction(false);
    setShowEnterCodeChat(true);
  };
  const handlenewdiscussion = () => {
    setShowButtonChoseFirstAction(false);
    setshowAddNewChat(true);
  };
  //****button action******************************************
  /**********add new chat************************************ */
  const handleAddChat = async (e) => {
    e.preventDefault();
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUser.id = resultUserFinal.id),
        (saveUser.name = resultUserFinal.name),
        (saveUser.lastname = resultUserFinal.lastname),
        (saveUser.username = resultUserFinal.username),
        (saveUser.password = resultUserFinal.password),
        (saveUser.role = resultUserFinal.role);

      console.log(saveUser);
    } catch (Exception) {
      console.log("user not found");
    }
    console.log(saveUser);
    chat.ourUsers = saveUser;

    axios
      .post("https://goatqcm-instance.com/chat", chat, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("succes insert chat");
        toast.success("successful ajouter nouvelle discussion!");
        setShowFullChatDiv(false);
      })
      .catch((err) => console.log(err));
  };
  /**************************************************************** */
  /**********add frined chat************************************ */
  const handleAddChatFriend = async (chatName, chatCode) => {
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUser.id = resultUserFinal.id),
        (saveUser.name = resultUserFinal.name),
        (saveUser.lastname = resultUserFinal.lastname),
        (saveUser.username = resultUserFinal.username),
        (saveUser.password = resultUserFinal.password),
        (saveUser.role = resultUserFinal.role);

      console.log(saveUser);
    } catch (Exception) {
      console.log("user not found");
    }
    console.log(saveUser);
    console.log(chatName);
    console.log(chatCode);
    chat.ourUsers = saveUser;
    chat.chatName = chatName;
    chat.chatCode = chatCode;
    axios
      .post("https://goatqcm-instance.com/chat", chat, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("succes insert chat");
        toast.success("successful ajouter nouvelle discussion!");
        setShowFullChatDiv(false);
      })
      .catch((err) => console.log(err));
  };
  /**************************************************************** */
  const handleFindDiscussion = async (e) => {
    e.preventDefault();
    console.log(codeChat);
    const resultLoadChat = await axios.get(
      `https://goatqcm-instance.com/chat/getbycodechat/${codeChat}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(resultLoadChat.data);
    if (resultLoadChat.data.length < 6) {
      for (let inc = 0; inc < resultLoadChat.data.length; inc++) {
        if (resultLoadChat.data[inc].ourUsers.id !== userId) {
          handleAddChatFriend(
            resultLoadChat.data[inc].chatName,
            resultLoadChat.data[inc].chatCode
          );
        }
      }
    } else {
      toast.error("cette discussion est deja contient 5 personnes!");
    }
  };

  /***get  chat by userID***************************************************** */
  const loadChatUserId = async (getUserId) => {
    setShowDiscsussionDiv(false);
    console.log(getUserId);
    try {
      const resultLoadChat = await axios.get(
        `https://goatqcm-instance.com/chat/getbyuserid/${getUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resultLoadChat.data);
      if (resultLoadChat.data.length > 0) {
        // setShowButtonChoseFirstAction(false);
        console.log("mama");
        dicsussion.value = resultLoadChat.data[0].chatName;

        /***open discussion**************************** */
        localStorage.setItem("showdiscussiondiv", "true");
        localStorage.setItem("codechatlocation", dicsussion.value);
        console.log(ShowDiscsussionDiv);

        setShowDiscsussionDiv(true);
        setMoladIsOpen(false);
        /********************************************** */
      } else {
        setShowButtonChoseFirstAction(true);
      }
    } catch (Exception) {}
  };

  return (
    <>
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="p-4">
          <h5 className="text-body-emphasis h4">Collapsed content</h5>
          <span className="text-body-secondary">
            Toggleable via the navbar brand.
          </span>
        </div>
      </div>

      {isDesktopOrLaptop && (
        <nav className={`${classes.navdiv} navbar navbar-dark `}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                navButtonHndler(), props.changeetatsidebar(BtnNav);
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <BtnAdd />
            <img
              src={goatlogonavbare}
              height="100%"
              width="80"
              style={{ marginRight: 870 }}
            />
            <img
              src={messanger}
              height="100%"
              width="80"
              onClick={(e) => {
                handleChatBtn();
              }}
              style={{ width: 50, height: 50 }}
            />
          </div>

          {modalIsOpen && (
            <>
              {showFullChatDiv && (
                <div className={`${classes.modal} `}>
                  {showButtonChoseFirstAction && (
                    <div className={`${classes.buttonchose} `}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handlecodediscussionBtn();
                        }}
                      >
                        Entrer le Code discussion
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewdiscussion();
                        }}
                      >
                        Crée une nouvelle discussion
                      </button>
                    </div>
                  )}
                  {showAddNewChat && (
                    <form className={`${classes.addnewchat} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Nome discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) =>
                            setChat({ ...chat, chatName: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          placeholder="Code discussion"
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) =>
                            setChat({ ...chat, chatCode: e.target.value })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleAddChat(e);
                        }}
                      >
                        Crée
                      </button>
                    </form>
                  )}
                  {showEnterCodeChat && (
                    <div className={`${classes.addnewchat} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Entrer code de discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => setCodeChat(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleFindDiscussion(e);
                        }}
                      >
                        Ouvrir
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Toaster />
            </>
          )}
          {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
          {ShowDiscsussionDiv && <ChatBox chatcode={dicsussion.value} />}
        </nav>
      )}
      {isTabletOrMobile && (
        <nav className={`${classes.navdiv_phone} navbar navbar-dark `}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                navButtonHndler(), props.changeetatsidebar(BtnNav);
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <BtnAdd />
            <img
              src={goatlogonavbare}
              height="100%"
              width="60"
              style={{ marginRight: 5 }}
            />
            <img
              src={messanger}
              height="100%"
              width="30"
              onClick={(e) => {
                handleChatBtn();
              }}
            />
          </div>

          {modalIsOpen && (
            <>
              {showFullChatDiv && (
                <div className={`${classes.modal_phone} `}>
                  {showButtonChoseFirstAction && (
                    <div className={`${classes.buttonchose_phone} `}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handlecodediscussionBtn();
                        }}
                      >
                        Entrer le Code discussion
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewdiscussion();
                        }}
                      >
                        Crée une nouvelle discussion
                      </button>
                    </div>
                  )}
                  {showAddNewChat && (
                    <form className={`${classes.addnewchat_phone} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Nome discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) =>
                            setChat({ ...chat, chatName: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          placeholder="Code discussion"
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) =>
                            setChat({ ...chat, chatCode: e.target.value })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleAddChat(e);
                        }}
                      >
                        Crée
                      </button>
                    </form>
                  )}
                  {showEnterCodeChat && (
                    <div className={`${classes.addnewchat_phone} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Entrer code de discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => setCodeChat(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleFindDiscussion(e);
                        }}
                      >
                        Ouvrir
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Toaster />
            </>
          )}
          {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
          {ShowDiscsussionDiv && <ChatBox chatcode={dicsussion.value} />}
        </nav>
      )}
    </>
  );
}

export default NavigationBar;
