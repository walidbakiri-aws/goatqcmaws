import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
function ModalDeleteCasClinique(props) {
  const token = localStorage.getItem("tokengoat");

  const [passwordConfirm, setPasswordConfirm] = useState();

  function cancelHandler() {
    props.onCancel();
  }
  function confirmeHanler() {
    if (passwordConfirm === "123456") {
      onSubmitDeleteCour();
      props.onConfirm();
    }
  }
  useEffect(() => {
    console.log("mama mala");
    console.log(props.casCliniqueId);
  }, []);

  const onSubmitDeleteCour = async (event) => {
    await axios
      .delete(
        `https://goatqcm-instance.com/casclinique/${props.casCliniqueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("succes deleting");
      });
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
        onClick={confirmeHanler}
      >
        Confirm
      </button>
    </div>
  );
}

export default ModalDeleteCasClinique;
