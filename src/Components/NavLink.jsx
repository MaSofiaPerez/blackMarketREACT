import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children, className = '' }) => {
    return (
        <Link
            to={to}
            className={`text-gray-700 font-medium text-lg hover:underline p-2 rounded-lg block ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
