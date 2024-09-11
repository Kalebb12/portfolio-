const ProjectComponent = ({ project, index: i }) => {
  return (
      <div
        className={`${
          i % 2 === 1 && "lg:flex-row-reverse"
        } lg:flex-row flex-col flex items-center gap-5 xl:gap-10 py-5 `}
      >
          <img
            src={project.img}
            className="xl:min-w-[594px] lg:min-w-[454px] object-cover rounded-[18px] "
            alt={`${project.name} img`}
          />
        <div className="flex flex-col gap-6">
          <h1 className="text-white lg:text-[48px] text-[24px] font-extrabold">{`0${
            i + 1
          }`}</h1>
          <h2 className="lg:text-[32px] text-[20px] font-extrabold xl:font-bold text-white">{project.name}</h2>
          <p className="text-[var(--zinc-500)] text-justify">{project.des}</p>
        </div>
      </div>
  );
};

export default ProjectComponent;
