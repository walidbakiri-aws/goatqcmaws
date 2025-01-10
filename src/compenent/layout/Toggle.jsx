import "./Toggle.css";
import { useMediaQuery } from "react-responsive";
function Toggle({ handleChange, isChecked }) {
  //************************************************************* */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  /******************************************************************* */
  return (
    <>
      {isDesktopOrLaptop && (
        <div className="desktoptoggle">
          <div className="toggle-container">
            <input
              type="checkbox"
              id="check"
              className="toggle"
              onChange={handleChange}
              checked={isChecked}
            />
            <label htmlFor="check" style={{ fontSize: 18 }}>
              Dark Mode
            </label>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="phonetoggle">
          <div className="toggle-container">
            <input
              type="checkbox"
              id="check"
              className="togglephone"
              onChange={handleChange}
              checked={isChecked}
            />
            <label htmlFor="check" style={{ fontSize: 12 }}>
              Dark Mode
            </label>
          </div>
        </div>
      )}
    </>
  );
}
export default Toggle;
