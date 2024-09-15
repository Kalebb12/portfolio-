import logo from "/logo.svg"
const Footer = () => {
    return ( 
        <div className="md:px-20 md:py-6  py-5 px-4 bg-[var(--black)] text-[var(--white)]">
            <div className="flex items-center justify-between md:px-8">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="logo white" className="w-[27px] h-[28px]"/>
                    <h2  className="font-bold sm:text-[20px] text-[17px]">Personal</h2>
                </div>

                <div>
                    <p className="font-medium md:font-semibold md:text-[16px] text-[12px]">@ 2019-2023 Personal</p>
                    <p className="font-medium md:font-semibold md:text-[16px] text-[12px]">Cee Jay</p>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;