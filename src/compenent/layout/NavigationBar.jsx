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
import sharescreenicon from "../layout/img/share.png";
import globmessage from "../layout/img/globmessage.png";
import ShareScreenTagel from "./ShareScreenTagel";
import ChatBoxGlobal from "./ChatBoxGlobal";

function NavigationBar(props) {
  //******************************************************************* */
  const [messageCount, setMessageCount] = useState(
    Number(localStorage.getItem("messageCount")) || 0
  );
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

  //************************************************************* */
  const [ShowDiscsussionDiv, setShowDiscsussionDiv] = useState(false);
  const [ShowShareScreenDiv, setShowShareScreenDiv] = useState(false);
  const token = localStorage.getItem("tokengoat");
  const username = localStorage.getItem("username");
  let userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  /************chat function********************************************************************************************* */
  const [modalGlobChatIsOpen, setModalGlobChatIsOpen] = useState(false);
  const [ShowDiscsussionGlobChatDiv, setShowDiscsussionGlobChatDiv] =
    useState(false);
  const [modalIsOpen, setMoladIsOpen] = useState(false);
  const [showButtonChoseFirstAction, setShowButtonChoseFirstAction] =
    useState(true);
  const [showAddNewChat, setshowAddNewChat] = useState(false);

  const [showFullChatDiv, setShowFullChatDiv] = useState(true);
  const [showEnterCodeChat, setShowEnterCodeChat] = useState(false);
  const [chat, setChat] = useState({
    chatName: "",
    chatCode: "",
    ourUsers: {},
  });
  const [codeChat, setCodeChat] = useState("");
  let dicsussion = useSignal("");
  let dicsussionglobchat = useSignal("globchatgoatqcm");
  /************end var********************************************************************************************* */
  /************sharescreen function********************************************************************************************* */
  const [modalIsOpenShare, setMoladIsOpenShare] = useState(false);
  const [showButtonChoseFirstActionShare, setShowButtonChoseFirstActionShare] =
    useState(true);
  const [showAddNewShare, setshowAddNewShare] = useState(false);

  const [showFullShareDiv, setShowFullShareDiv] = useState(true);
  const [showEnterCodeShare, setShowEnterCodeShare] = useState(false);
  const [share, setShare] = useState({
    shareScreenName: "",
    shareScreenCode: "",
    ourUsers: {},
  });
  const [codeShare, setCodeShare] = useState("");
  let screensharecode = useSignal("");
  const [getChatCountFinal, setGetChatCountFinal] = useState("");

  /************end var********************************************************************************************* */

  let saveUser = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };

  /************chat function********************************************************************************************* */

  /*********************************************** */
  function closeModalHandler() {
    setMoladIsOpen(false);
    setShowDiscsussionDiv(false);
  }
  const handleChatBtn = async (e) => {
    loadChatUserId(userId);
    setshowAddNewChat(false);
    setShowEnterCodeChat(false);
    console.log("hey walid");
    setMoladIsOpen(true);
  };
  const handleChatGobablBtn = async (e) => {
    setModalGlobChatIsOpen(true);
    setShowDiscsussionGlobChatDiv(!ShowDiscsussionGlobChatDiv);
    console.log(getChatCountFinal);
    localStorage.setItem("messageCount", getChatCountFinal);
    setGetChatCountFinal("0");

    console.log(Number(localStorage.getItem("messageCount")));
    window.dispatchEvent(new Event("newGlobalMessage"));
  };

  /***model chat************************************************************* */

  useEffect(() => {
    getChatCount();

    console.log(Number(localStorage.getItem("messageCount")));

    /*window.addEventListener("newGlobalMessage", handleMessageUpdate);

    return () => {
      window.removeEventListener("newGlobalMessage", handleMessageUpdate);
    };*/
  }, []);
  const getChatCount = async (e) => {
    const resultgetChatCount = await axios.get(
      `https://goatqcm-instance.com/chatcount/1`
    );
    console.log(Number(localStorage.getItem("messageCount")));
    console.log(resultgetChatCount.data.chatCount);
    setGetChatCountFinal(
      resultgetChatCount.data.chatCount -
        Number(localStorage.getItem("messageCount"))
    );
  };
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
    console.log("mama");
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
        dicsussion.value = resultLoadChat.data[0].chatCode;

        console.log(ShowDiscsussionDiv);
        //  setShowDiscsussionDiv(false);
        setShowDiscsussionDiv(!ShowDiscsussionDiv);
        setMoladIsOpen(false);
        /********************************************** */
      } else {
        setShowButtonChoseFirstAction(true);
      }
    } catch (Exception) {}
  };
  /************end chat function********************************************************************************************* */
  /**
 
  /************share function********************************************************************************************* */

  /*********************************************** */
  function closeModalHandler() {
    setMoladIsOpen(false);
    setMoladIsOpenShare(false);
    setShowShareScreenDiv(false);
  }
  const handleShareBtn = async (e) => {
    getChatCount();
    loadShareUserId(userId);
    setshowAddNewShare(false);
    setShowEnterCodeShare(false);
    console.log("hey walid");
    setMoladIsOpenShare(true);
  };

  /***model share************************************************************* */

  //****button action////////////////////////////////////////// */
  const handleCodeShareScreenBtn = () => {
    setShowButtonChoseFirstActionShare(false);
    setShowEnterCodeShare(true);
  };
  const handlenewShareScreen = () => {
    setShowButtonChoseFirstActionShare(false);
    setshowAddNewShare(true);
  };
  //****button action******************************************
  /**********add new chat************************************ */
  const handleAddShare = async (e) => {
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
    share.ourUsers = saveUser;

    axios
      .post("https://goatqcm-instance.com/sharescreen", share, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("succes insert Screen Share");
        toast.success("successful ajouter nouvelle Screen Share!");

        setMoladIsOpenShare(false);
        setShowShareScreenDiv(false);
      })
      .catch((err) => console.log(err));
  };
  /**************************************************************** */
  /**********add frined chat************************************ */
  const handleAddShareFriend = async (shareName, shareCode) => {
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

    share.ourUsers = saveUser;
    share.shareScreenName = shareName;
    share.shareScreenCode = shareCode;
    axios
      .post("https://goatqcm-instance.com/sharescreen", share, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("succes insert sharescreen");
        toast.success("successful ajouter nouvelle sharescreen!");

        setMoladIsOpenShare(false);
        setShowShareScreenDiv(false);
      })
      .catch((err) => console.log(err));
  };
  /**************************************************************** */
  const handleFindShare = async (e) => {
    e.preventDefault();
    console.log(codeShare);
    const resultLoadShare = await axios.get(
      `https://goatqcm-instance.com/sharescreen/getbycodeshare/${codeShare}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(resultLoadShare.data);
    if (resultLoadShare.data.length < 6) {
      for (let inc = 0; inc < resultLoadShare.data.length; inc++) {
        if (resultLoadShare.data[inc].ourUsers.id !== userId) {
          handleAddShareFriend(
            resultLoadShare.data[inc].shareScreenName,
            resultLoadShare.data[inc].shareScreenCode
          );
        }
      }
    } else {
      toast.error("cette Share Screen est deja contient 5 personnes!");
    }
  };

  /***get  chat by userID***************************************************** */
  const loadShareUserId = async (getUserId) => {
    console.log("mama");
    console.log(getUserId);
    try {
      const resultLoadShare = await axios.get(
        `https://goatqcm-instance.com/sharescreen/getbyuserid/${getUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resultLoadShare.data);
      if (resultLoadShare.data.length > 0) {
        // setShowButtonChoseFirstAction(false);
        console.log("mama");
        screensharecode.value = resultLoadShare.data[0].shareScreenCode;

        /***open discussion**************************** */

        // localStorage.setItem("codesharescreenlocation", screensharecode.value);
        console.log(ShowShareScreenDiv);
        //  setShowDiscsussionDiv(false);
        setShowShareScreenDiv(!ShowShareScreenDiv);
        setMoladIsOpenShare(false);
        /********************************************** */
      } else {
        setShowButtonChoseFirstActionShare(true);
      }
    } catch (Exception) {}
  };
  /************end share function********************************************************************************************* */

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
              style={{ marginRight: 800 }}
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
            <div className={`${classes.globmessage} `}>
              <span className={`${classes.nbrGlobMessage} `}>
                {getChatCountFinal}
              </span>
              <img
                src={globmessage}
                height="100%"
                width="80"
                onClick={(e) => {
                  handleChatGobablBtn();
                }}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <img
              src={sharescreenicon}
              height="100%"
              width="80"
              onClick={(e) => {
                handleShareBtn();
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
                        Entre Code discussion
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewdiscussion();
                        }}
                      >
                        Cree nouvelle discussion
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

          {ShowDiscsussionGlobChatDiv && (
            <ChatBoxGlobal chatglobcode={dicsussionglobchat.value} />
          )}

          {modalIsOpenShare && (
            <>
              {showFullShareDiv && (
                <div className={`${classes.modal} `}>
                  {showButtonChoseFirstActionShare && (
                    <div className={`${classes.buttonchose} `}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleCodeShareScreenBtn();
                        }}
                      >
                        Entre Code partage
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewShareScreen();
                        }}
                      >
                        Cree nouvelle Partage Quizz
                      </button>
                    </div>
                  )}
                  {showAddNewShare && (
                    <form className={`${classes.addnewchat} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Nome discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) =>
                            setShare({
                              ...share,
                              shareScreenName: e.target.value,
                            })
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
                            setShare({
                              ...share,
                              shareScreenCode: e.target.value,
                            })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleAddShare(e);
                        }}
                      >
                        Crée
                      </button>
                    </form>
                  )}
                  {showEnterCodeShare && (
                    <div className={`${classes.addnewchat} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Entrer code de discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => setCodeShare(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleFindShare(e);
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
          {modalIsOpenShare && <Backdrop onCancel={closeModalHandler} />}
          {ShowShareScreenDiv && <Backdrop onCancel={closeModalHandler} />}
          {ShowShareScreenDiv && (
            <ShareScreenTagel screensharecode={screensharecode.value} />
          )}
        </nav>
      )}
      {isTabletOrMobile && (
        <nav className={`${classes.navdiv_phone} navbar navbar-dark `}>
          <div className="container-fluid">
            {props.cameFrom === "quizzboard" ? (
              <button> </button>
            ) : (
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ marginRight: -25, height: 32, marginTop: -5 }}
                onClick={() => {
                  navButtonHndler();
                  props.changeetatsidebar(BtnNav);
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}

            <BtnAdd />
            <img
              src={goatlogonavbare}
              height="100%"
              width="50"
              style={{ marginRight: 2, marginLeft: -6 }}
            />
            <img
              src={messanger}
              height="100%"
              width="25"
              onClick={(e) => {
                handleChatBtn(e);
              }}
              style={{ marginLeft: 5 }}
            />
            <div className={`${classes.globmessage_phone} `}>
              <span className={`${classes.nbrGlobMessage_phone} `}>
                {getChatCountFinal}
              </span>
              <img
                src={globmessage}
                height="100%"
                width="25"
                onClick={(e) => {
                  handleChatGobablBtn(e);
                }}
              />
            </div>
            <img
              src={sharescreenicon}
              height="100%"
              width="25"
              onClick={(e) => {
                handleShareBtn();
              }}
              style={{ width: 30, height: 30, marginLeft: 5 }}
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
                        Entre Code discussion
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewdiscussion();
                        }}
                      >
                        Cree nouvelle discussion
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
          {ShowDiscsussionGlobChatDiv && (
            <ChatBoxGlobal chatglobcode={dicsussionglobchat.value} />
          )}
          {modalIsOpenShare && (
            <>
              {showFullShareDiv && (
                <div className={`${classes.modal_phone} `}>
                  {showButtonChoseFirstActionShare && (
                    <div className={`${classes.buttonchose_phone} `}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleCodeShareScreenBtn();
                        }}
                      >
                        Entre Code partage
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          handlenewShareScreen();
                        }}
                      >
                        Cree nouvelle Partage Quizz
                      </button>
                    </div>
                  )}
                  {showAddNewShare && (
                    <form className={`${classes.addnewchat_phone} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Nome discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) =>
                            setShare({
                              ...share,
                              shareScreenName: e.target.value,
                            })
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
                            setShare({
                              ...share,
                              shareScreenCode: e.target.value,
                            })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleAddShare(e);
                        }}
                      >
                        Crée
                      </button>
                    </form>
                  )}
                  {showEnterCodeShare && (
                    <div className={`${classes.addnewchat_phone} `}>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Entrer code de discussion"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => setCodeShare(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleFindShare(e);
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
          {modalIsOpenShare && <Backdrop onCancel={closeModalHandler} />}
          {ShowShareScreenDiv && <Backdrop onCancel={closeModalHandler} />}
          {ShowShareScreenDiv && (
            <ShareScreenTagel screensharecode={screensharecode.value} />
          )}
        </nav>
      )}
    </>
  );
}

export default NavigationBar;
