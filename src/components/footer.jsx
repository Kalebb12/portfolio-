const Footer = () => {
  return (
    <div className="px-4 py-5 text-white bg-black md:px-20 md:py-6">
      <div className="container flex items-center justify-between mx-auto md:px-8">
        <h2 className="text-2xl font-bold">&lt; Caleb &gt;</h2>

        <p className="font-medium flex items-center gap-2 md:font-semibold md:text-[16px] text-[12px]">
          <span>Made with</span><img src="/heart.svg" alt="love." />
        </p>
      </div>
    </div>
  );
};

export default Footer;
