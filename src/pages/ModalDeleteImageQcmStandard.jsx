import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
function ModalDeleteImageQcmStandard(props) {
  let passwordConfirm = "";

  function cancelHandler() {
    props.onCancel();
  }
  function confirmeHanler() {
    if (props.qcmId) {
      if (passwordConfirm === "FPGAveraWALID") {
        onSubmitDeleteCour();
      }
    }
    props.onConfirm();
  }
  useEffect(() => {
    console.log(props.qcmId);
  }, []);

  const onSubmitDeleteCour = async (event) => {
    await axios.delete(
      `https://goatqcm-instance.com/image/qcmstandard/deletefullimage/${props.courId}`
    );
  };
  //************************************************************* */

  return (
    <div className={`${classes.modal} `}>
      <input
        type={"text"}
        name="yearName"
        required
        placeholder="Enter confirmation password "
        className="form-control"
        onChange={(e) => {
          passwordConfirm = e.target.value;
        }}
      />
      <button
        className={`${classes.cancelbtn} btn btn-danger `}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      <button
        className={`${classes.confirmbtn} btn btn-info `}
        type="submit"
        onClick={confirmeHanler}
      >
        Confirm
      </button>
    </div>
  );
}

export default ModalDeleteImageQcmStandard;
