import { useEffect, useState } from "react";
import classes from "./Modal.module.css";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
function Modal(props) {
  const token = localStorage.getItem("tokengoat");

  const [year, setYear] = useState([]);
  const [module, setModule] = useState([]);
  const [cour, setCour] = useState([]);
  const placeHoldInput = useSignal("");
  const getInputValue = useSignal([]);
  function cancelHandler() {
    props.onCancel();
  }
  function confirmeHanler() {
    if (props.yearId) {
      onSubmitYear();
    }
    if (props.moduleId) {
      onSubmitModule();
    }
    if (props.courId) {
      onSubmitCour();
    }
    props.onConfirm();
  }
  useEffect(() => {
    if (props.yearId) {
      loadYear();
      console.log("year modal");
    }
    if (props.moduleId) {
      loadModule();
      console.log("module modal");
    }
    if (props.courId) {
      loadCour();
      console.log("cour modal");
    }
  }, []);

  //****Load Year////////////////////////////////////////// */
  const loadYear = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/medicalyear/${props.yearId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getInputValue.value = result.data;
    placeHoldInput.value = getInputValue.value.yearName;

    setYear(result.data);

    console.log(result.data);
  };

  const onSubmitYear = async (event) => {
    await axios
      .put(`https://goatqcm-instance.com/medicalyear/${year.id}`, year, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(year.yearName);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************* */

  //****Load module////////////////////////////////////////// */
  const loadModule = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/module/${props.moduleId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getInputValue.value = result.data;
    placeHoldInput.value = getInputValue.value.moduleName;

    setModule(result.data);
    console.log(result.data);
  };

  const onSubmitModule = async (event) => {
    await axios
      .put(`https://goatqcm-instance.com/module/${module.id}`, module, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(module.moduleName);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************* */
  //****Load module////////////////////////////////////////// */
  const loadCour = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cours/${props.courId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getInputValue.value = result.data;
    placeHoldInput.value = getInputValue.value.coursName;

    setCour(result.data);
    console.log(result.data);
  };

  const onSubmitCour = async (event) => {
    await axios
      .put(`https://goatqcm-instance.com/cours/${cour.id}`, cour, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(cour.coursName);
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
        className="form-control"
        placeholder={placeHoldInput.value}
        onChange={(e) => {
          if (props.yearId) {
            setYear({ ...year, yearName: e.target.value });
          }
          if (props.moduleId) {
            setModule({ ...module, moduleName: e.target.value });
          }
          if (props.courId) {
            setCour({ ...cour, coursName: e.target.value });
          }
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

export default Modal;
