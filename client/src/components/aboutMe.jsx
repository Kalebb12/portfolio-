import { AnimationContainer } from "./common/AnimationContainer";
import profile from "/profile.png";
const AboutMe = () => {
  const yearsOfExperience = new Date().getFullYear() - 2022;
  return (
    <AnimationContainer id="about-me" className="md:py-15 py-10 px-4 md:px-20">
      <div className="md:px-8 container mx-auto md:py-0 py-1 xl:flex-row flex flex-col gap-5 md:gap-10 xl:items-start items-center justify-between">
        <img src={profile} alt="" />
        <div className="flex flex-col gap-4">
          <div className="py-4">
            <h2 className="font-normal md:text-[48px] text-[28px]">
              About <span className="font-extrabold">Me</span>
            </h2>
          </div>
          <div className="flex gap-5 flex-col text-(--zinc-500)">
            <p className="">
              I'm a passionate, self-proclaimed designer who specializes in full
              stack development (React.js & Node.js). I am very enthusiastic
              about bringing the technical and visual aspects of digital
              products to life. User experience, pixel perfect design, and
              writing clear, readable, highly performant code matters to me.
            </p>
            <p className="">
              I began my journey as a web developer in 2022, and since then,
              I've continued to grow and evolve as a developer, taking on new
              challenges and learning the latest technologies along the way.
              Now, {yearsOfExperience} years after starting my web development
              journey, I'm building cutting-edge web applications using modern
              technologies such as Next.js, TypeScript, Nestjs, Tailwindcss,
              Supabase and much more.
            </p>
            <p className="">
              When I'm not in full-on developer mode, you can find me hovering
              around on twitter, witnessing the journey of early startups or
              enjoying some free time. You can follow me on Twitter where I
              share tech-related bites and build in public, or you can follow me
              on GitHub.
            </p>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default AboutMe;
