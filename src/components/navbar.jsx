import logo from "/logo-black.svg";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { glass } from "../styles";
const Navbar = () => {
  return (
    <nav className={`sm:px-20 sm:py-4 p-4 fixed  top-0 w-full ${glass}`}>
      <div className="flex items-center justify-between sm:px-8 max-w-[1300px]">
        <Link
          to="#"
          onClick={() => {
            window.scroll(0, 0);
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="logo" className="object-contain w-10 h-10 text-black" />
            <h2 className="font-bold text-[20px]">Personal</h2>
          </div>
        </Link>

        {/* Getting the Links from Navlink constants*/}
        <ul className="items-center hidden gap-8 list-none lg:flex">
          {navLinks.map((link, i) => {
            return (
              <a
                href={`#${link.url}`}
                key={i}
                className="font-semibold text-[20px] hover:text-[var(--neutral)]"
              >
                {link.title}
              </a>
            );
          })}
        </ul>

        <a href="/calebResume.pdf" target="_blank" download="caleb-resume">
          <button className="bg-[var(--black)] text-[var(--white)] flex items-center py-2 px-3 gap-2 rounded-sm hover:bg-[var(--neutral)] border border-black active:text-black active:bg-white">
            Resume <FiDownload width={20} height={20} />
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
