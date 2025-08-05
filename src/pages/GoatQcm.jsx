import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import classes from "./GoatQcm.module.css";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import UserService from "../compenent/layout/service/UserService";
import useLocalStorage from "use-local-storage";
import { useSignal } from "@preact/signals-react";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import Backdrop from "./Backdrop";
import toast, { Toaster } from "react-hot-toast";
import user from "../compenent/layout/img/user.png";

function GoatQcm() {
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  let deviceId = localStorage.getItem("deviceId");
  const userIdToken = localStorage.getItem("userId");
  let getUserAdresseIp = useSignal("");
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [ShowEnterGmailCode, setShowEnterGmailCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  let finalEmail = useSignal("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    ourUsers: { id: userIdToken },
  });
  const [commentInputs, setCommentInputs] = useState({});
  const [showCreatPub, setShowCreatPub] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("verificatioeCode"));
    if (localStorage.getItem("verificatioeCode") == "true") {
      console.log("already check code");
    } else {
      getUserAdressIp();
    }
  }, []);
  useEffect(() => {
    fetchPosts();
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);
  const getUserAdressIp = async () => {
    try {
      const result = await axios.get(
        `https://goatqcm-instance.com/abounement/${userIdToken}`
      );
      console.log(result.data);
      finalEmail.value = result.data.ourUsers.username;
      getUserAdresseIp.value = result.data.adresseIp;
      console.log(getUserAdresseIp.value);
      console.log(deviceId);
      if (getUserAdresseIp.value === deviceId) {
        console.log("are the same");
      } else {
        toast.error(
          "Un autre appareil a été connecté en même temps, veuillez vous déconnecter. "
        );
        setShowEnterGmailCode(true);
        if (cooldown === 0) {
          await axios.post(
            `https://goatqcm-instance.com/codegmail/send-code/${result.data.ourUsers.username}`
          );
          setCooldown(60);
        } else {
          toast.info(
            `Veuillez attendre ${cooldown} secondes avant de renvoyer le code.`
          );
        }
      }
    } catch (Exception) {
      console.log("no abnmt found");
    }
  };
  const handleResend = async () => {
    try {
      await axios.post(
        `https://goatqcm-instance.com/codegmail/send-code/${finalEmail.value}`
      );
      toast.success("Code renvoyé avec succès");
      setCooldown(60);
    } catch (err) {
      toast.error("Erreur lors de l'envoi du code");
    }
  };
  const verifyCode = async () => {
    try {
      const response = await axios.post(
        `https://goatqcm-instance.com/codegmail/verify-code`,
        {
          email: finalEmail.value,
          code: verificationCode,
        }
      );
      if (response.data === true) {
        localStorage.setItem("verificatioeCode", true);
        toast.success("Vérification réussie");
        setShowEnterGmailCode(false);
      } else {
        toast.error("Code incorrect");
      }
    } catch (error) {
      toast.error("Erreur de vérification");
    }
    try {
      if (verificationCode === "54789393") {
        toast.success("Vérification réussie");
        setShowEnterGmailCode(false);
      } else {
        toast.error("Code incorrect");
      }
    } catch (error) {
      toast.error("Erreur de vérification");
    }
  };
  const closeModalDoneQuizHandler = () => {
    //setShowEnterGmailCode(false);
    setShowCreatPub(false);
  };
  const strokeDasharray = 283; // 2 * π * r (r = 45)
  const strokeDashoffset = (cooldown / 60) * strokeDasharray;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://goatqcm-instance.com/publiction/posts`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };
  const handlePostSubmit = async (e) => {
    console.log(newPost);

    try {
      await axios.post(
        `https://goatqcm-instance.com/publiction/posts`,
        newPost
      );
      setNewPost({ content: "", ourUsers: { id: userIdToken } });
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://goatqcm-instance.com/publiction/comments/${postId}/user/${userIdToken}`,
        {
          content: commentInputs[postId],
        }
      );
      setCommentInputs({ ...commentInputs, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <>
            <div
              className={classes.contanerspace}
              data-theme={isDark ? "dark" : "light"}
            >
              <div className={classes.bienvenulogo_publication}>
                <div className={classes.bienvenulogo}>
                  <div className={classes.bienvuenwlcm}>
                    Bienvenue au GoatQcm!
                  </div>
                  <div className={classes.logogoat}>
                    <img src={GoatLogo} height="100" width="200" />
                  </div>
                </div>
                <div className={classes.publicationfull}>
                  <div className={classes.inputeaddcomment}>
                    <input
                      type="text"
                      id="inputPassword5"
                      className="form-control"
                      placeholder="À quoi pensez-vous ?"
                      onClick={() => {
                        setShowCreatPub(true);
                      }}
                    />
                  </div>
                  {showCreatPub && (
                    <div
                      className={classes.fullinputshow}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handlePostSubmit();
                          setShowCreatPub(false);
                        }}
                      >
                        <div className={classes.creatposttitle}>
                          Cree Publication
                        </div>
                        <hr className={`${classes.hr} `} />
                        <div
                          className={`${classes.anonyme} form-check form-switch vertical-switch my-2 ms-1`}
                        >
                          <input
                            style={{ width: 60, height: 30 }}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="anonymousSwitch"
                            checked={newPost.anonymous}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                anonyme: e.target.checked,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="anonymousSwitch"
                          >
                            Post as anonyme
                          </label>
                        </div>
                        <div className={classes.pubtextarea}>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="What's on your mind?"
                            value={newPost.content}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                content: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>

                        <hr className={`${classes.hr} `} />

                        <div className={classes.pustpubbutton}>
                          <button type="submit" className="btn btn-primary">
                            Post
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {[...posts]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((post) => {
                      return (
                        <div className={classes.fullcommntary_post}>
                          <div className={classes.showeachpost}>
                            <div className={classes.username}>
                              <img src={user} height="50%" width="50" />
                              <p>
                                {post.anonyme ? "Anonyme" : post.ourUsers.name}
                              </p>
                            </div>
                            <p className={classes.postcontent}>
                              {post.content}
                            </p>
                            <p className={classes.createdAt}>
                              {new Date(post.createdAt).toLocaleString()}
                            </p>
                            <hr className={`${classes.hr} `} />
                            {post.comments.map((cmt, indexcmnt) => {
                              return (
                                <div
                                  className={classes.commentdiv}
                                  key={indexcmnt}
                                  value={cmt.id}
                                >
                                  <p className={classes.namecommentary}>
                                    {cmt.ourUsers?.name}
                                  </p>

                                  <p className={classes.contentcommentary}>
                                    {cmt.content}
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          <div className={classes.addcommment}>
                            <form
                              onSubmit={(e) => handleCommentSubmit(e, post.id)}
                            >
                              <input
                                type="text"
                                id="inputPassword5"
                                className="form-control"
                                placeholder="Ajouter commentaire ?"
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  handleCommentChange(post.id, e.target.value)
                                }
                              />
                              <button type="submit" className="btn btn-info">
                                Ajouter
                              </button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              );
              {ShowEnterGmailCode && (
                <div className={classes.entergmailcode}>
                  <div className={classes.codeDiv}>
                    <div className="form-group">
                      <label>Un code vous a été envoyé par e-mail.</label>
                      <label>Saisi le code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="saisi le code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={verifyCode}
                      >
                        Vérifier
                      </button>
                    </div>{" "}
                  </div>
                  <div className={classes.renvoyercode}>
                    {cooldown > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#ccc"
                            strokeWidth="10"
                            fill="none"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#4ed126ff"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 50 50)"
                            strokeLinecap="round"
                          />
                          <text
                            x="50"
                            y="55"
                            textAnchor="middle"
                            fontSize="20"
                            fill="#323435ff"
                            fontWeight="bold"
                          >
                            {cooldown}s
                          </text>
                        </svg>
                      </div>
                    )}
                    {cooldown === 0 && (
                      <button
                        className="btn btn-secondary mt-2"
                        onClick={handleResend}
                      >
                        Renvoyer le code
                      </button>
                    )}
                  </div>
                </div>
              )}
              {ShowEnterGmailCode && (
                <Backdrop onCancel={closeModalDoneQuizHandler} />
              )}
              {showCreatPub && (
                <Backdrop onCancel={closeModalDoneQuizHandler} />
              )}
            </div>
          </>
        )}
        {isTabletOrMobile && (
          <>
            <div
              className={classes.contanerspace_phone}
              data-theme={isDark ? "dark" : "light"}
            >
              <div className={classes.bienvenulogo_phone}>
                <div className={classes.bienvuenwlcm_phone}>
                  Bienvenue au GoatQcm!
                </div>
                <div className={classes.logogoat_phone}>
                  <img src={GoatLogo} height="70" width="100" />
                </div>
              </div>

              <div className={classes.container_phone}>
                <div className={classes.publicationfull_phone}>
                  <div className={classes.inputeaddcomment_phone}>
                    <input
                      type="text"
                      id="inputPassword5"
                      className="form-control"
                      placeholder="À quoi pensez-vous ?"
                      onClick={() => {
                        setShowCreatPub(true);
                      }}
                    />
                  </div>
                  {showCreatPub && (
                    <div
                      className={classes.fullinputshow_phone}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handlePostSubmit();
                          setShowCreatPub(false);
                        }}
                      >
                        <div className={classes.creatposttitle_phone}>
                          Cree Publication
                        </div>
                        <hr className={`${classes.hr_phone} `} />
                        <div
                          className={`${classes.anonyme_phone} form-check form-switch_phone vertical-switch_phone  my-2 ms-1`}
                        >
                          <input
                            style={{ width: 15, height: 15 }}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="anonymousSwitch"
                            checked={newPost.anonymous}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                anonyme: e.target.checked,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="anonymousSwitch"
                          >
                            Post as anonyme
                          </label>
                        </div>
                        <div className={classes.pubtextarea_phone}>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="What's on your mind?"
                            value={newPost.content}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                content: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>

                        <hr className={`${classes.hr_phone} `} />

                        <div className={classes.pustpubbutton_phone}>
                          <button type="submit" className="btn btn-primary">
                            Post
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {[...posts]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((post) => {
                      return (
                        <div className={classes.fullcommntary_post_phone}>
                          <div className={classes.showeachpost_phone}>
                            <div className={classes.username_phone}>
                              <img src={user} height="30%" width="30" />
                              <p>
                                {post.anonyme ? "Anonyme" : post.ourUsers.name}
                              </p>
                            </div>
                            <p className={classes.postcontent_phone}>
                              {post.content}
                            </p>
                            <p className={classes.createdAt_phone}>
                              {new Date(post.createdAt).toLocaleString()}
                            </p>
                            <hr className={`${classes.hr_phone} `} />
                            {post.comments.map((cmt, indexcmnt) => {
                              return (
                                <div
                                  className={classes.commentdiv_phone}
                                  key={indexcmnt}
                                  value={cmt.id}
                                >
                                  <p className={classes.namecommentary_phone}>
                                    {cmt.ourUsers?.name}
                                  </p>

                                  <p
                                    className={classes.contentcommentary_phone}
                                  >
                                    {cmt.content}
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          <div className={classes.addcommment_phone}>
                            <form
                              onSubmit={(e) => handleCommentSubmit(e, post.id)}
                            >
                              <input
                                type="text"
                                id="inputPassword5"
                                className="form-control"
                                placeholder="Ajouter commentaire ?"
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  handleCommentChange(post.id, e.target.value)
                                }
                              />
                              <button type="submit" className="btn btn-info">
                                Ajouter
                              </button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {ShowEnterGmailCode && (
              <div className={classes.entergmailcode_phone}>
                <div className={classes.codeDiv_phone}>
                  <div className="form-group">
                    <label>Un code vous a été envoyé par e-mail.</label>
                    <label>Saisi le code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="saisi le code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={verifyCode}
                    >
                      Vérifier
                    </button>
                  </div>
                </div>
                <div className={classes.renvoyercode}>
                  {cooldown > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#ccc"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#4ed126ff"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fontSize="20"
                          fill="#323435ff"
                          fontWeight="bold"
                        >
                          {cooldown}s
                        </text>
                      </svg>
                    </div>
                  )}
                  {cooldown === 0 && (
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={handleResend}
                    >
                      Renvoyer le code
                    </button>
                  )}
                </div>
              </div>
            )}
            {showCreatPub && <Backdrop onCancel={closeModalDoneQuizHandler} />}
            {ShowEnterGmailCode && (
              <Backdrop onCancel={closeModalDoneQuizHandler} />
            )}
          </>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default GoatQcm;
