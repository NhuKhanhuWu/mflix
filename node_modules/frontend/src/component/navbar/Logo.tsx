/** @format */
import LogoImg from "../../../public/mflix_logo.png";

interface LogoProps {
  url?: string;
  width?: number;
}

const Logo: React.FC<LogoProps> = ({ url = "/", width = 8 }) => {
  return (
    <a href={url}>
      <img
        src={LogoImg}
        alt="mflix_logo"
        style={{ width: `${width}rem` }}></img>
    </a>
  );
};

export default Logo;
