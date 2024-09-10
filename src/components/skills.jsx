import { skillsList } from "../constants";
const Skills = () => {
  return (
    <section className="py-[60px] px-[80px]" id="skills">
      <div className="flex flex-col items-center px-8 gap-5">
        <h2 className="font-normal text-[48px]">
          My <span className="font-extrabold">Skills</span>
        </h2>

        <div className="py-5 flex items-center gap-[71px] flex-wrap justify-center">
          {skillsList.map((skill, index) => {
            return (
              <div key={index} className="flex flex-col gap-8 items-center hover:bg-[var(--black)] transition-all hover:text-white justify-center w-[186px] h-[186px] rounded border-2 p-6 border-[var(--black)]">
                <i className={`${skill.icon} text-[40px]`}></i>
                <span className="text-lg">{skill.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;