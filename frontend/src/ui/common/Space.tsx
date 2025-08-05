/** @format */

interface SpaceProps {
  space?: string;
}

const Space: React.FC<SpaceProps> = ({ space = "1rem" }) => {
  return <div style={{ height: space }}></div>;
};

export default Space;
