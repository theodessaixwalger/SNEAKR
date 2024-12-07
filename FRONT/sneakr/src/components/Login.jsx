import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Facebook, 
  Twitter, 
  Mail,
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const socialIcons = [
    { icon: <Facebook size={20} />, color: "hover:text-blue-600" },
    { icon: <Twitter size={20} />, color: "hover:text-blue-400" },
    { icon: <Mail size={20} />, color: "hover:text-red-500" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log('Login successful');
    } else {
      alert('Please enter your email and password!');
    }
  };

  return (
    <div className="flex items-center justify-center mt-18">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
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
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <span className="bg-white px-4 text-gray-500 relative">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">No account?</p>
          <a href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;