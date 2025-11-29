import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
const Navbar = () => {
  return (
    <header className="fixed top-0 z-20 w-full p-4 sm:px-20 sm:py-4 glass">
      <div className="flex container mx-auto items-center justify-between sm:px-8 max-w-[1300px]">
        <Link
          to="#"
          onClick={() => {
            window.scroll(0, 0);
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-3xl font-bold">&lt; Caleb &gt;</h2>
          </div>
        </Link>

        {/* Getting the Links from Navlink constants*/}
        <ul className="items-center hidden gap-8 list-none lg:flex">
          {navLinks.map((link, i) => {
            return (
              <a
                href={`#${link.url}`}
                key={i}
                className="font-semibold text-[20px] hover:text-(--neutral)"
              >
                {link.title}
              </a>
            );
          })}
        </ul>

        <a href="/calebResume.pdf" target="_blank" download="caleb-resume">
          <button className="bg-black text-white flex items-center py-2 px-3 gap-2 rounded-sm hover:bg-(--neutral) border border-black active:text-black active:bg-white">
            Resume <FiDownload width={20} height={20} />
          </button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
