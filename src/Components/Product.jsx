import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/product/${product.id}`)
    }

    return (
        <div className="min-w-[200px] bg-white p-4 shadow-lg rounded flex flex-col justify-between">
            <div onClick={handleClick} className="cursor-pointer flex-grow">
                <img src={product.pictures[0]} alt={product.title} className="w-full h-40 object-cover rounded mb-2" />
                <h4 className="text-lg font-bold">{product.title}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">{product.unit_price}</p>
            </div>
            <div className="mb-4">
                <AddToCartButton productId={product.id} />
            </div>
        </div>
    );
};

export default Product;