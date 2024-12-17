import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import SearchBar from "./Searchbar";

const Product = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const favIcon = (
    <Heart size={20} className="cursor-pointer hover:text-red-500" />
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/products?populate=image"
        );
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider">
            The Best Shoes
          </h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {product.image?.formats?.medium?.url && (
                <img
                  src={`http://localhost:1337${product.image.formats.medium.url}`}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h2>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button className="bg-black text-white py-2 px-4 rounded-md font-bold uppercase tracking-wider hover:bg-gray-800">
                  <a href={`/product/${product.documentId}`}>View Details</a>
                </button>
                <div>{favIcon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-wider">
            &copy; 2024 Foot Unlocker. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Product;
