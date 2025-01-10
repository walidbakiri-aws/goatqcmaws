import { useEffect, useState } from "react";
import classes from "./ImageClinique.module.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

function ImageClinique(props) {
  const [SrcImageLink, setSrcImageLink] = useState("");
  const [VisibleImageDiv, setVisibleImageDiv] = useState(false);
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
    getFullDesc(props.cliniqueId);
  }, []);

  const getFullDesc = async (cliniqueId) => {
    try {
      const fullDescResult = await axios.get(
        `https://goatqcm-instance.com/image/casclinique/descqcm/${cliniqueId}`
      );
      console.log(fullDescResult);
      setVisibleImageDiv(true);
      setSrcImageLink(
        `https://goatqcm-instance.com/image/casclinique/${props.cliniqueId}/${fullDescResult.data.imageName}`
      );
    } catch (Exception) {
      setVisibleImageDiv(false);
      console.log("not get id");
    }
  };
  return (
    <>
      {VisibleImageDiv && (
        <>
          {isDesktopOrLaptop && (
            <div className={`${classes.imagedesc} shadow `}>
              <img src={SrcImageLink} />
            </div>
          )}
          {isTabletOrMobile && (
            <div className={`${classes.imagedesc_phone} shadow `}>
              <img src={SrcImageLink} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ImageClinique;
