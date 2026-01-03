export const ProjectSkeleton = ({ i }) => {
  return (
    <div
      className={`${
        i % 2 === 1 && "lg:flex-row-reverse"
      } lg:flex-row flex-col flex items-center gap-5 xl:gap-10 py-5 grow`}
    >
      <div className="xl:min-w-148 w-full h-80 lg:min-w-113 aspect-2/1 object-cover rounded-[18px] bg-gray-600 animate-pulse"></div>
      <div className="flex flex-col item-start w-full gap-6 grow">
        <div className="size-35 bg-gray-600 animate-pulse rounded-sm"></div>
        <div className="h-15 bg-gray-600 animate-pulse w-1/2 rounded-sm"></div>
        <div className="h-25 bg-gray-600 animate-pulse rounded-sm"></div>
      </div>
    </div>
  );
};
