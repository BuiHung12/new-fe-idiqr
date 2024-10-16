

const HeaderNew = () => {

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* Logo hoặc Tên */}
          <div className="text-xl font-bold text-gray-900 dark:text-white">MyApp</div>
        </div>
        {/* Menu */}
        <nav className="flex items-center gap-6">
          <a href="#home" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNew;
