// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post("http://localhost:5001/login", { username, password });
//   //     if (res.data.success) {
//   //       alert(res.data.message);
//   //       navigate("/Dashboard");
//   //     } else {
//   //       alert(res.data.message);
//   //     }
//   //   } catch (err) {
//   //     if (err.response && err.response.data.message) {
//   //       alert(err.response.data.message);
//   //     } else {
//   //       alert("Server error. Try again later.");
//   //     }
//   //   }
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     // Temporarily skip backend validation
//     // const res = await axios.post("http://localhost:5001/login", { username, password });

//     // Always successful
//     alert("Login successful! Redirecting to Dashboard...");
//     navigate("/Dashboard");

//   } catch (err) {
//     alert("Something went wrong, but still redirecting for testing...");
//     navigate("/Dashboard");
//   }
// };


//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
//       style={{
//         backgroundImage: "url('/images/bg.jpeg')", 
//       }}
//     >

//       <div className="absolute inset-0 bg-black/25"></div>

//       <div className="text-center mb-10 relative z-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
//           Welcome to Gamma Laundry & Dry Cleaning Center
//         </h1>
//         <p className="text-gray-100 mt-3 text-lg drop-shadow">
//           Quick, Reliable, Affordable Laundry Service
//         </p>
//       </div>

//       <div className="relative z-10 bg-white/95 shadow-2xl rounded-2xl p-8 w-80 md:w-96">
//         <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
//           Login to Continue
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-left text-gray-700 mb-1">Username</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter username"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-left text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform shadow-md"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline font-semibold">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Define your backend's URL
const API_URL = "http://localhost:8080/api/auth";

export default function LoginPage() {
  // Set defaults to make testing easier
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  // --- THIS IS THE CORRECT, FULLY CONNECTED LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Send the request to your Node.js backend
      const res = await axios.post(
        `${API_URL}/login`,
        {
          username,
          password,
        },
        {
          // 2. This is CRITICAL for sending/receiving session cookies
          withCredentials: true,
        }
      );

      // 3. Your backend sends status 200 on success.
      //    We ONLY navigate if the status is 200.
      if (res.status === 200) {
        // alert(res.data.message); // Optional: "Login successful"
        navigate("/Dashboard"); // Redirect to your main dashboard
      }
    } catch (err) {
      // 4. If credentials are wrong, axios throws an error.
      //    The 'catch' block will run, and the code above WILL NOT.
      if (err.response) {
        // The server responded with a status code (e.g., 401, 404)
        // This will show "Invalid Password!" or "User not found."
        alert(err.response.data.message);
      } else {
        // Network error or server is down
        alert("Server error. Try again.");
      }
      // We DO NOT navigate to dashboard here, so the user stays on the login page.
    }
  };
  // --- END OF FIXED LOGIC ---

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/bg.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/25"></div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to Gamma Laundry & Dry Cleaning Center
        </h1>
        <p className="text-gray-100 mt-3 text-lg drop-shadow">
          Quick, Reliable, Affordable Laundry Service
        </p>
      </div>

      <div className="relative z-10 bg-white/95 shadow-2xl rounded-2xl p-8 w-80 md:w-96">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Login to Continue
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}