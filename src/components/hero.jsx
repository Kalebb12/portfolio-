import { aboutMe } from "../constants";
import SocialLinks from "./common/socialLinks";
import heroImg from "/hero.png"
const Hero = () => {
  return (
    <section className="mt-[90px] sm:py-[60px] px-4 py-10 sm:px-[80px] ">
      <div className="xl:px-8 xl:py-[110px] lg:bg-[url(/hero.png)]  bg-no-repeat bg-right-top lg:block flex flex-col gap-12 items-center">
      <img src={heroImg} alt="heroImg" className="lg:hidden" />
        <div className="flex flex-col gap-5 xl:gap-12 xl:w-[600px] ">
          <h1 className="font-normal md:text-[48px] text-[28px] tracking-[-2%]">
            Hello I’am{" "}
            <span className="font-extrabold">
              Caleb John.
              <br /> FullStack{" "}
            </span>
            <span className="text-outline font-extrabold">
              Developer
            </span>{" "}
            <br />
            Based in <span className="font-extrabold">Nigeria</span>
          </h1>

          <div className="flex flex-col gap-4">
            <p className="text-[var(--zinc-500)] tracking-[2%]">{aboutMe}</p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
