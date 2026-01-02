const CardComponent = ({bg="white", text="--neutral" , hr="black" ,testimony}) => {
  return (
    <div className={`bg-${bg} text-[var(${text})] max-w-[370px] rounded-[20px] flex shadow-custom1 flex-col justify-center items-center p-10 gap-6`}>
      <img src="/man.png" alt="" />
      <p>
        {testimony.quote}
      </p>
      <hr className={`w-[120px] border border-${hr}`} />
      <h2 className="font-semibold text-[20px]">{testimony.name}</h2>
      <span className="font-semibold">{testimony.role}</span>
    </div>
  );
};

export default CardComponent;
