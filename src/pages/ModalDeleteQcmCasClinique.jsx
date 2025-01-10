import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
function ModalDeleteQcmCasClinique(props) {
  const token = localStorage.getItem("tokengoat");
  const [passwordConfirm, setPasswordConfirm] = useState();

  function cancelHandler() {
    props.onCancel();
  }
  function confirmeHanler() {
    console.log(passwordConfirm);
    if (passwordConfirm === "123456") {
      console.log("kaka");
      onSubmitDeleteCour();
    }
  }
  useEffect(() => {
    console.log(props.qcmCasCliniqueId);
  }, []);

  const onSubmitDeleteCour = async (event) => {
    await axios
      .delete(
        `https://goatqcm-instance.com/qcmsclinique/${props.qcmCasCliniqueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        props.onConfirm();
        console.log("succes deleting");
      })
      .catch((err) => console.log(err));
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
          setPasswordConfirm(e.target.value);
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
        onClick={() => {
          confirmeHanler();
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default ModalDeleteQcmCasClinique;
