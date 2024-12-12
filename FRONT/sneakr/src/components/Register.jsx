import React, { useState } from "react";
import { Facebook, Twitter, Mail } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const socialIcons = [
    { icon: <Facebook size={20} />, color: "hover:text-blue-600" },
    { icon: <Twitter size={20} />, color: "hover:text-blue-400" },
    { icon: <Mail size={20} />, color: "hover:text-red-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords not same!");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        window.location.href = '/login';
      } else {
        alert(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center mt-18">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">Register using social networks</p>
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
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
