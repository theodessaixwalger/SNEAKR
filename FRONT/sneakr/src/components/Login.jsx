import React, { useState } from "react";
import { Facebook, Twitter, Mail } from "lucide-react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const socialIcons = [
    { icon: <Facebook size={20} />, color: "hover:text-blue-600" },
    { icon: <Twitter size={20} />, color: "hover:text-blue-400" },
    { icon: <Mail size={20} />, color: "hover:text-red-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier,
            password,
          }),
        }
      );
      console.log("test");
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        window.location.href = '/';
      } else {
        alert(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("Error login");
    }
  };

  return (
    <div className="flex items-center justify-center mt-18">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">Login using social networks</p>
          <div className="flex justify-center space-x-4 mb-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href="#"
                className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-colors ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-gray-300 absolute w-full"></div>
          <span className="bg-white px-4 text-gray-500 relative">OR</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="identifier"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-500 hover:text-blue-600">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
