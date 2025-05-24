import { useState } from "react";

function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    let data = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await data.json();
    alert(res.message);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Create an account</h2>
      <p className="mb-6 text-sm text-gray-400">
        Already have an account? <a className="text-purple-400 underline cursor-pointer">Log in</a>
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 bg-[#1f1f2e] text-white border border-gray-600 rounded-md outline-none"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-[#1f1f2e] text-white border border-gray-600 rounded-md outline-none"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-[#1f1f2e] text-white border border-gray-600 rounded-md outline-none"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <div className="flex items-center space-x-2">
          <input type="checkbox" className="accent-purple-500" />
          <label className="text-sm text-gray-400">
            I agree to the <span className="text-purple-400 underline">Terms & Conditions</span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
        >
          Create account
        </button>

        <div className="text-center text-gray-500 text-sm">or register with</div>

        <div className="flex gap-3 justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="google" />
            Google
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
            <img src="https://img.icons8.com/ios-filled/24/000000/mac-os.png" alt="apple" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup; 