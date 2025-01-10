import classes from "./Backdrop.module.css";
function BackdropDeleteCour(props) {
  return (
    <div className={`${classes.backdrop} `} onClick={props.onCancel}></div>
  );
}
export default BackdropDeleteCour;
