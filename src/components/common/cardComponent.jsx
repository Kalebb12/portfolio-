const CardComponent = ({bg="white", text="--neutral" , hr="black"}) => {
  return (
    <div className={`bg-${bg} text-[var(${text})] xSm:w-[370px] w-full rounded-[20px] flex shadow-custom1 flex-col justify-center items-center p-10 gap-6`}>
      <img src="/man.png" alt="" />
      <p>
        I recently had to jump on 10+ different calls across eight different
        countries to find the right owner.
      </p>
      <hr className={`w-[120px] border border-${hr}`} />
      <h2 className="font-semibold text-[20px]">Evren Shah</h2>
      <span className="font-semibold">Designer</span>
    </div>
  );
};

export default CardComponent;
