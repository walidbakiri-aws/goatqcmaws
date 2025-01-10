import { useEffect, useState } from "react";
import classes from "./Description.module.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import UserService from "../compenent/layout/service/UserService";

function DescriptionClinique(props) {
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isParticipateAdmin = UserService.isParticipateAdmin();

  //************************************************************************ */
  const [FullDescription, setFullDescription] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmClinique: {},
  });
  const [SrcImageLink, setSrcImageLink] = useState("");
  const [displyImage, setDiplayImage] = useState(false);
  const [displayDesc, setDisplayDesc] = useState(false);
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }
  useEffect(() => {
    // document.onmousedown = killCopy;

    console.log(props.qcmIdPropsQcmDesc);
    getFullDesc(props.qcmIdPropsQcmDesc);
  }, []);

  const getFullDesc = async (qcmId) => {
    console.log(qcmId);
    const fullDescResult = await axios.get(
      `https://goatqcm-instance.com/fulldesc/clinique/descqcm/${qcmId}`
    );
    setFullDescription(fullDescResult.data);
    if (fullDescResult.data.imageName.length !== 0) {
      setSrcImageLink(
        `https://goatqcm-instance.com/image/clinique/${props.qcmIdPropsQcmDesc}/${fullDescResult.data.imageName}`
      );
      console.log(fullDescResult.data);
      setDiplayImage(true);
    } else {
      setDiplayImage(false);
    }

    if (fullDescResult.data.qcmDescription !== null) {
      setDisplayDesc(true);
    } else {
      setDisplayDesc(false);
    }
  };
  return (
    <>
      {isDesktopOrLaptop && (
        <div className={`${classes.fulldesccontainer} `}>
          <div className={`${classes.desccontainer} shadow `}>
            {displyImage && (
              <div className={`${classes.imagedesc} shadow `}>
                <img src={SrcImageLink} />
              </div>
            )}
            {displayDesc && (
              <div className={`${classes.carddesc} table-hover  `}>
                <p className="card-text">{FullDescription.qcmDescription}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={`${classes.desccontainer_phone} shadow `}>
          {displyImage && (
            <div className={`${classes.imagedesc_phone} shadow `}>
              <img src={SrcImageLink} />
            </div>
          )}
          {displayDesc && (
            <div className={`${classes.carddesc_phone} table-hover  `}>
              <p className="card-text">{FullDescription.qcmDescription}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DescriptionClinique;
