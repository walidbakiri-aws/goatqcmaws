function BtnAddQcm(props) {
  return (
    <button
      style={{
        paddingRight: 10,
        width: 150,
      }}
      type="submit"
      className="btn btn-primary"
    >
      {props.typeQcmCasClinique}
    </button>
  );
}
export default BtnAddQcm;
