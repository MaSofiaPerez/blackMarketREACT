const Banner = () => {
  return (
    <div className="relative bg-banner bg-cover bg-no-repeat min-h-[200px] max-h-[400px]">
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" p-6 max-w-xl mx-auto bg-opacity-60 ml-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
          Compra en Minutos Disfruta en Horas
        </h2>
      </div>
    </div>
  </div>
  );
};

export default Banner;