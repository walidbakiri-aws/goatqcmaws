import classes from "./BackdropReg.module.css";
function BackdropReg(props) {
  return (
    <div className={`${classes.backdrop} `} onClick={props.onCancel}></div>
  );
}
export default BackdropReg;
