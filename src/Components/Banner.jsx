const Banner = () => {
  return (
    <div className="relative bg-banner bg-cover bg-no-repeat min-h-[200px] max-h-[400px]">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Bienvenidos a Blackmarket</h2>
      </div>
    </div>
  );
};

export default Banner;