import React from 'react';

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="mb-4">
            <input 
                type="text" 
                placeholder="Buscar productos" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
};

export default SearchBar;
