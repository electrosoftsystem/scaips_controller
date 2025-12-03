function NavBar({ isDarkMode }) {
  const navBg = isDarkMode
    ? "bg-gray-900 shadow-black/20"
    : "bg-white shadow-md";
  const logoText = isDarkMode ? "text-white" : "text-black";

  return (
    <nav className={`${navBg} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div
              className={`text-2xl font-bold flex gap-0 items-center ${logoText}`}
            >
              <img
                src="/titlelogo.png"
                alt="logo"
                width={50}
                height={35}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
