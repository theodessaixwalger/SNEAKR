import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLastSegment = () => {
    const pathSegments = window.location.pathname.split("/");
    return pathSegments[pathSegments.length - 1];
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = getLastSegment();
      const API_URL = `http://localhost:1337/api/products/${productId}?populate=image`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const result = await response.json();
        setProduct(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 p-4 animate-pulse">
        Chargement...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-4 font-semibold">
        Erreur : {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-32 bg-gray-100 h-screen">
      <div className="grid md:grid-cols-2 items-start">
        <div className="flex items-center justify-center">
          <img
            src={`http://localhost:1337${product.image.formats.medium.url}`}
            alt={product.name}
            className="w-[450px] h-[350px] object-cover rounded-3xl"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-fnac-blue drop-shadow-md">
            {product.name}
          </h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
