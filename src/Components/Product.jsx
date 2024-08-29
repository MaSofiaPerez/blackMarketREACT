import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/product/${product.id}`)
    }

    return (
        <div className=" bg-white p-4 shadow-lg rounded flex flex-col 
        justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
            <div onClick={handleClick} className="cursor-pointer flex-grow">
                <img src={product.pictures[0]} alt={product.title} className="w-full h-40 object-contain rounded mb-4" />
                <div className="flex flex-col flex-grow">
                    <h4 className="text-lg font-bold">{product.title}</h4>
                    <p className="text-lg text-gray-700 font-semibold mb-2">{product.unit_price}</p>
                </div>
            </div>
        </div>
    );
};

export default Product;