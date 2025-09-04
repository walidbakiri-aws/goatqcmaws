import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
function ModalDeleteFullDesc(props) {
  const token = localStorage.getItem("tokengoat");

  let passwordConfirm = "";

  function cancelHandler() {
    props.onCancel();
  }
  function confirmeHanler() {
    onSubmitDeleteCour();
  }
  useEffect(() => {
    console.log(props.qcmId_delete);
  }, []);

  const onSubmitDeleteCour = async (event) => {
    await axios.delete(
      `https://goatqcm-instance.com/fulldesc/deletefulldesc/${props.qcmId_delete}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    props.onConfirm();
  };
  //************************************************************* */

  return (
    <div className={`${classes.modal} `}>
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

export default ModalDeleteFullDesc;
