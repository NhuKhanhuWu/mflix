/** @format */

interface SeactionHeader {
  title: string;
  link?: string;
  id?: string;
}

const SectionHeader: React.FC<SeactionHeader> = ({ title, link, id }) => {
  return (
    <div
      className="flex justify-between items-center border-b-2 border-[#df2143] pb-2 mb-6 mx-6"
      id={id}>
      <h2 className="text-3xl font-semibold text-brand-red uppercase">
        {title}
      </h2>
      {link && (
        <a href={link} className="text-xl link">
          See more
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
