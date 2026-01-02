import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { FiPenTool } from "react-icons/fi";
const Navbar = () => {
  return (
    <header className="fixed top-0 z-20 w-full p-4 sm:px-20 sm:py-4 glass">
      <div className="flex container mx-auto items-center justify-between sm:px-8 max-w-325">
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

        <a
          href="https://drive.google.com/file/d/1s5aWnFn4Rdthh34CFSm770izj13UL1Ax/view?usp=drive_link"
          target="_blank"
        >
          <button className="bg-black text-white flex items-center py-2 px-3 gap-2 rounded-sm hover:bg-(--neutral) border border-black active:text-black active:bg-white">
            Resume <FiPenTool />
          </button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
