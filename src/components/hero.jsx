import { aboutMe } from "../constants";
import SocialLinks from "./common/socialLinks";
const Hero = () => {
  return (
    <section className="mt-[90px] my-[60px] mx-[80px] ">
      <div className="px-8 py-[110px] xl:bg-[url(/hero.png)]  bg-no-repeat bg-right-top">
        <div className="flex flex-col gap-12 xl:w-[600px]">
          <h1 className="font-normal text-[48px] tracking-[-2%]">
            Hello I’am{" "}
            <span className="font-extrabold">
              Caleb John.
              <br /> FullStack{" "}
            </span>
            <span className="text-outline text-[48px] font-extrabold">
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
