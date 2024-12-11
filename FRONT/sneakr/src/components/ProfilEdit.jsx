import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          window.location.href = "/profil";
          throw new Error("Token non trouvé");
        }
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
        setUserId(data.id);
        setEditedData({ username: data.username, email: data.email });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      // Utiliser userId dans l'URL de la requête
      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedData),
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const updatedData = await response.json();
      setUserData(updatedData);
      alert("Edit successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  if (error) return <div className="text-red-500">Erreur : {error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Profil Utilisateur
      </h1>
      {userData ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={editedData.username || ""}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={editedData.email || ""}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Enregistrer
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Chargement des données utilisateur...</p>
      )}
    </div>
  );
};

export default Profil;
