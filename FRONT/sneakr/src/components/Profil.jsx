import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Cookie from "js-cookie";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookie.get("token");

        if (!token) {
          navigate("/login");
          throw new Error("Token non trouvé dans les cookies");
        }

        const response = await fetch("http://localhost:1337/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();

        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleDisconnect = () => {
    Cookie.remove("token", { path: '/profil' })
    window.location.href = '/login';
    alert("Disconnect");
  };

  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Profil Utilisateur
      </h1>
      {userData ? (
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Nom :</span>{" "}
            {userData.username}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Email :</span>{" "}
            {userData.email}
          </p>
          <div className="flex space-x-4">
            <Link to="/profiledit" className="w-full">
              <button className="w-full bg-black text-white py-2 mt-4 rounded-md font-bold uppercase tracking-wider hover:bg-gray-800">
                Edit Profile
              </button>
            </Link>
            <button 
              onClick={handleDisconnect}
              className="w-full bg-red-600 text-white py-2 mt-4 rounded-md font-bold uppercase tracking-wider hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Pas de données utilisateur disponibles.
        </p>
      )}
    </div>
  );
};

export default Profil;