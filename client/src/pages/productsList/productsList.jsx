import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getFruitsData,
  setProductDetails,
} from "../../store/slices/fruitsSlice";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const category = {
  houseHold: "HOUSE HOLD NEEDS",
};

const ProductsList = () => {
  const { fruitsData, isLoading, productDetails, cart } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredFruits, setFilteredFruits] = useState([]);

  const maxVisiblePages = 5;

  useEffect(() => {
    dispatch(getFruitsData(currentPage)).then((response) => {
      setTotalPages(parseInt(response?.payload?.totalPages) || 1);
      setTotalResults(parseInt(response?.payload?.totalResults) || 0);
    });
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredFruits(fruitsData);
    } else {
      setFilteredFruits(
        fruitsData.filter((item) =>
          item?.name?.toLowerCase()?.includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, fruitsData]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    dispatch(addToCart(item));
  };

  const onClickEachProduct = (product) => {
    dispatch(setProductDetails(product));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex md:flex-row md:justify-between flex-col">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-semibold mb-6">
            Total Products {totalResults}
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <div className="md:w-[60%] border-2 border-black bg-white rounded-full flex h-8 items-center gap-2 my-4">
            <IoSearch className="text-2xl ml-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none px-3 text-sm bg-white w-full h-6 rounded-3xl"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <p className="text-sm  items-center space-x-2 hidden md:flex">
            <FaShoppingCart className="text-lg text-gray-700" />
            <span className="font-bold text-gray-800">{cart?.length || 0}</span>
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredFruits?.map((eachItem) => {
            if (eachItem?.id !== null) {
              return (
                <Link
                  className="nav-link"
                  key={eachItem?.id}
                  to={`details/${eachItem?.id}`}
                >
                  <div
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md flex flex-col gap-3"
                    onClick={() => onClickEachProduct(eachItem)} // Set product details when clicked
                  >
                    <img
                      src="https://res.cloudinary.com/db0f83m76/image/upload/v1732702842/product_mndflg.jpg"
                      alt="product"
                      className="w-full h-32 object-cover rounded"
                    />
                    <h2
                      className="text-sm font-medium text-gray-800 mt-2 truncate"
                      title={eachItem?.name}
                    >
                      {eachItem?.name || "Untitled"}
                    </h2>
                    <div className="flex justify-between items-center">
                      <p>Rs.{eachItem?.mrp?.mrp || "N/A"}</p>
                      <FaShoppingCart
                        className="text-xl cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAddToCart(eachItem, event);
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            }
            return null;
          })}

          {filteredFruits?.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {currentPage > Math.ceil(maxVisiblePages / 2) && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              1
            </button>
            <span className="px-2">...</span>
          </>
        )}

        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
