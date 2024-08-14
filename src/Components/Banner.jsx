import React from 'react';

const Banner = () => {
  return (
    <div className="bg-cover bg-center h-64 text-white flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x300')" }}>
      <h2 className="text-4xl font-bold">Bienvenidos a BlackMarket</h2>
    </div>
  );
};

export default Banner;