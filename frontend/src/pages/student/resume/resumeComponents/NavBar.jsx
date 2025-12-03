function NavBar({ isDarkMode }) {
  const navBg = isDarkMode ? "bg-gray-900 shadow-black/20" : "bg-white shadow-md";
  const logoText = isDarkMode ? "text-white" : "text-black";

  return (
    <nav className={`${navBg} transition-colors ml-[183px] w-[237mm]`}>
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/newlogo-removebg-preview.png"
              alt="logo"
              width={50}
              height={35}
              className="object-contain"
            />
           
          </div>

          {/* Optional Nav Links */}
          {/* <div className="flex space-x-4">
            <a href="#hero" className={`hover:underline ${logoText}`}>Home</a>
            <a href="#projects" className={`hover:underline ${logoText}`}>Projects</a>
            <a href="#contact" className={`hover:underline ${logoText}`}>Contact</a>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
