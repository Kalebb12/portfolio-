import logo from "/logo.svg"
const Footer = () => {
    return ( 
        <div className="px-20 py-6 bg-[var(--black)] text-[var(--white)]">
            <div className="flex items-center justify-between px-8">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="logo white" />
                    <h2  className="font-bold text-[20px]">Personal</h2>
                </div>

                <div>
                    <p className="font-semibold">@ 2019-2023 Personal</p>
                    <p className="font-semibold">Cee Jay</p>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;