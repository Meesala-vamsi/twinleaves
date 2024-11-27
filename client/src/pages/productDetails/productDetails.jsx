import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, setProductDetails } from "../../store/slices/fruitsSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.products.productDetails);

  useEffect(() => {
    if (!productDetails || productDetails.id !== id) {
      dispatch(setProductDetails({ id }));
    }
  }, [id, productDetails, dispatch]);

  useEffect(() => {
    if (productDetails && productDetails.id !== id) {
      navigate("/");
    }
  }, [productDetails, id, navigate]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      <img
        src={
          "https://res.cloudinary.com/db0f83m76/image/upload/v1732702842/product_mndflg.jpg"
        }
        alt={productDetails?.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-semibold mt-4">{productDetails?.name}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic fugiat
        similique, odio praesentium sint sed sunt officia perferendis minima
        accusantium facilis nobis reprehenderit dignissimos expedita maxime
        doloribus numquam nisi tenetur.
      </p>
      <p className="text-gray-600">{productDetails?.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-medium">
          Price: Rs. {productDetails?.mrp?.mrp}
        </p>
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={() => {
            dispatch(addToCart(productDetails));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
