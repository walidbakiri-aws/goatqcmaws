import classes from "./BackdropSaveQuizPhone.module.css";
function BackdropSaveQuizPhone(props) {
  return (
    <div className={`${classes.backdrop} `} onClick={props.onCancel}></div>
  );
}
export default BackdropSaveQuizPhone;
