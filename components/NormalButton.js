const NormalButton = ({ children, extraStyle }) => {
  return (
    <button
      className={`btn btn-outline btn-info ${extraStyle ? extraStyle : ""}`}
    >
      {children}
    </button>
  );
};

export default NormalButton;
