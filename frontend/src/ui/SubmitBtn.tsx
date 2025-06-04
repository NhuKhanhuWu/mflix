/** @format */

const SubmitBtn: React.FC<{ isPending: boolean; btnTxt: string }> = ({
  isPending,
  btnTxt,
}) => {
  return (
    <button
      type="submit"
      className={`btn primary-btn w-full ${
        isPending && "primary-btn-disable"
      }`}>
      {isPending ? "Loading..." : btnTxt}
    </button>
  );
};

export default SubmitBtn;
