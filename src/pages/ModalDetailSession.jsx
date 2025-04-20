import { useEffect, useState } from "react";
import classes from "./ModalDetailSession.module.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useSignal } from "@preact/signals-react";
function ModalDetailSession(props) {
  const [allCours, setAllCours] = useState([]);
  const token = localStorage.getItem("tokengoat");
  const quizInfo = ["Nome de quizz :", "Module : ", "Année : ", "Cours : "];
  function cancelHandler(props) {
    props.onCancel();
  }
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
  //load les cours**********************************************
  const loadModulesSelet = async () => {
    const coursId = JSON.parse(props.detailQuizz.selectMultipleCours);
    for (let inc = 0; inc < coursId.length; inc++) {
      const result = await axios.get(
        `https://goatqcm-instance.com/cours/${coursId[inc]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result.data);
      setAllCours((cour) => [...cour, result.data.coursName]);
    }
  };
  //*********************************************************************** */
  useEffect(() => {
    loadModulesSelet();
    console.log(JSON.parse(props.detailQuizz.selectMultipleCours));
  }, []);
  //************************************************************* */

  return (
    <>
      {isDesktopOrLaptop && (
        <div className={`${classes.modal} `}>
          <div className={`${classes.infocontent} `}>
            <ul className={`${classes.infonames} list-group`}>
              <li className="list-group-item">{quizInfo[0]}</li>
              <li className="list-group-item">{quizInfo[1]}</li>
              <li className="list-group-item">{quizInfo[2]}</li>
              <li className="list-group-item">{quizInfo[3]}</li>
            </ul>
            <ul className={`${classes.infovalue} list-group`}>
              <li className="list-group-item">
                {" "}
                {props.detailQuizz.nameQcmQuizz}
                {props.detailQuizz.nameCasCliniqueQuizz}
                {props.detailQuizz.nameQcmCasCliniqueQuizz}
              </li>
              <li className="list-group-item">
                {" "}
                {props.detailQuizz.moduleName}
              </li>
              <ul className={`${classes.year} list-group`}>
                <li class="list-group-item">
                  {props.detailQuizz.minYearQcm} /{" "}
                  {props.detailQuizz.maxYearQcm}
                </li>
              </ul>
              <ul className={`${classes.full_listecours} list-group`}>
                {allCours.map((cour, index) => (
                  <li
                    className={`${classes.listecours} list-group-item`}
                    key={index}
                  >
                    {" "}
                    - {cour}.
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={`${classes.modal_phone} `}>
          <div className={`${classes.infocontent_phone} `}>
            <ul className={`${classes.infonames_phone} list-group`}>
              <li className="list-group-item">{quizInfo[0]}</li>
              <li className="list-group-item">{quizInfo[1]}</li>
              <li className="list-group-item">{quizInfo[2]}</li>
              <li className="list-group-item">{quizInfo[3]}</li>
            </ul>
            <ul className={`${classes.infovalue_phone} list-group`}>
              <li className="list-group-item">
                {props.detailQuizz.nameQcmQuizz}
                {props.detailQuizz.nameCasCliniqueQuizz}
                {props.detailQuizz.nameQcmCasCliniqueQuizz}
              </li>
              <li className="list-group-item">
                {props.detailQuizz.moduleName}
              </li>
              <ul className={`${classes.year_phone} list-group`}>
                <li class="list-group-item">
                  {props.detailQuizz.minYearQcm} /{" "}
                  {props.detailQuizz.maxYearQcm}
                </li>
              </ul>
              <ul className={`${classes.full_listecours_phone} list-group`}>
                {allCours.map((cour, index) => (
                  <li
                    className={`${classes.listecours_phone} list-group-item`}
                    key={index}
                  >
                    {" "}
                    - {cour}.
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDetailSession;
