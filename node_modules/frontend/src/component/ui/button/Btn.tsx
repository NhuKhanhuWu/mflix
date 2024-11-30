/** @format */
import style from "./Button.module.css";

interface BtnProps {
  txt: string;
  callback?: () => void;
  isPrimary?: boolean;
}

export const Btn: React.FC<BtnProps> = ({
  txt,
  callback = () => {},
  isPrimary = false,
}) => {
  const btnType = isPrimary ? style.primary : style.secondary;

  return (
    <button className={`${style.btn} ${btnType}`} onClick={() => callback()}>
      {txt}
    </button>
  );
};
