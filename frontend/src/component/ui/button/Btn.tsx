/** @format */
import style from "./Button.module.css";

interface BtnProps {
  children?: React.ReactNode;
  callback?: () => void;
  isPrimary?: boolean;
}

export const Btn: React.FC<BtnProps> = ({
  children,
  callback = () => {},
  isPrimary = false,
}) => {
  const btnType = isPrimary ? style.primary : style.secondary;

  return (
    <button className={`${style.btn} ${btnType}`} onClick={() => callback()}>
      {children}
    </button>
  );
};
