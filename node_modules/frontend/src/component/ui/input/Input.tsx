/** @format */
import style from "./Input.module.css";

interface InputTxtProps {
  placeholder?: string;
  type?: string;
  isRound: boolean;
}

export const InputTxt: React.FC<InputTxtProps> = ({
  placeholder = "",
  type = "text",
  isRound = false,
}) => {
  const radious = isRound ? "999px" : "";

  return (
    <input
      style={{ borderRadius: radious }}
      type={type}
      placeholder={placeholder}
      className={style.inputTxt}></input>
  );
};
