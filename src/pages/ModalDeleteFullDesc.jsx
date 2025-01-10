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
    if (props.qcmId_delete) {
      if (passwordConfirm === "FPGAveraWALID") {
        onSubmitDeleteCour();
      }
    }
    props.onConfirm();
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

export default ModalDeleteFullDesc;
