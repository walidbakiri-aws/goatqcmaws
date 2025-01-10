import classes from "./BackdropQuiz.module.css";
function BackdropQuiz(props) {
  return (
    <div className={`${classes.backdrop} `} onClick={props.onCancel}></div>
  );
}
export default BackdropQuiz;
