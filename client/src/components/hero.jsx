import { aboutMe } from "../constants";
import { AnimationContainer } from "./common/AnimationContainer";
import SocialLinks from "./common/socialLinks";
import heroImg from "/hero.png";
const Hero = () => {
  return (
    <AnimationContainer className="mt-22 sm:py-15 px-4 py-10 sm:px-20 ">
      <div className="xl:px-8 xl:py-27 lg:bg-[url(/hero.png)] container mx-auto  bg-no-repeat bg-top-right lg:block flex flex-col gap-12 items-center">
        <img src={heroImg} alt="heroImg" className="lg:hidden" />
        <div className="flex flex-col gap-5 xl:gap-12 xl:w-150 ">
          <h1 className="font-normal md:text-[48px] text-[28px] tracking-[-2%]">
            Hello I'am{" "}
            <span className="font-extrabold">
              Caleb John.
              <br /> FullStack{" "}
            </span>
            <span className="font-extrabold text-outline">Developer</span>{" "}
            <br />
            Based in <span className="font-extrabold">Nigeria</span>
          </h1>

          <div className="flex flex-col gap-4">
            <p className="text-(--zinc-500) tracking-[2%]">{aboutMe}</p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default Hero;
