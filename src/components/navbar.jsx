import logo from "/logo.png";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import {glass} from "../styles"
const Navbar = () => {
  return (
    <nav className={`sm:px-20 sm:py-6 p-4 fixed top-0 w-full ${glass}`}>
      <div className="flex items-center justify-between px-8">
        <Link to="#" onClick={()=>{window.scroll(0,0)}}>
          <div className="flex gap-2 sm:gap-3 items-center">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <h2 className="font-bold text-[20px]">Personal</h2>
          </div>
        </Link>

        {/* Getting the Links from Navlink constants*/}
        <ul className="list-none gap-8 flex items-center">
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

        {/* //TODO: Add link to download resume */}
        <button className="bg-[var(--black)] text-[var(--white)] flex items-center py-2 px-3 gap-2 rounded-sm hover:bg-[var(--neutral)] border border-black active:text-black active:bg-white">
          Resume <FiDownload width={20} height={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
