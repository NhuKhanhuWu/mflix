/** @format */

function Footer() {
  return (
    <footer className="border-t-2 border-[#df2143] bg-gray-900 text-white px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Logo */}
      <div className="text-[#df2143] text-2xl font-bold">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>

      {/* Fake Links */}
      <ul className="flex gap-6 text-2xl md:text-xl text-gray-300">
        <li className="hover:text-[#df2143] transition cursor-pointer">
          Terms of Service
        </li>
        <li className="hover:text-[#df2143] transition cursor-pointer">
          Privacy Policy
        </li>
        <li className="hover:text-[#df2143] transition cursor-pointer">
          Contact
        </li>
        <li className="hover:text-[#df2143] transition cursor-pointer">
          Help Center
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
