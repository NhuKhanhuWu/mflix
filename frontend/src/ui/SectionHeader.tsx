/** @format */

interface SeactionHeader {
  title: string;
  link?: string;
}

const SectionHeader: React.FC<SeactionHeader> = ({ title, link }) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-[#df2143] pb-2 mb-6 mx-6">
      <h2 className="text-3xl font-semibold text-brand-red uppercase">
        {title}
      </h2>
      <a href={link} className="text-xl link">
        See more
      </a>
    </div>
  );
};

export default SectionHeader;
