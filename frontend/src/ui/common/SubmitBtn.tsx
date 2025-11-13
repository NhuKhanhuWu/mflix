/** @format */

const SubmitBtn: React.FC<{
  isPending: boolean;
  btnTxt: string;
  width?: string;
}> = ({ isPending, btnTxt, width = "100%" }) => {
  return (
    <button
      style={{ width: width }}
      type="submit"
      className={`btn primary-btn w-full h-fit ${
        isPending && "primary-btn-disable"
      }`}>
      {isPending ? "Loading..." : btnTxt}
    </button>
  );
};

export default SubmitBtn;
