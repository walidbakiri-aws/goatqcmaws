import classes from "./BackdropDoneQuiz.module.css";
function BackdropDoneQuiz(props) {
  return (
    <div className={`${classes.backdrop} `} onClick={props.onCancel}></div>
  );
}
export default BackdropDoneQuiz;
