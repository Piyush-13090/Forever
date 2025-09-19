import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [isNewUser, setIsNewUser] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Login") {
      setIsLoggedIn(true);
      setUser({ name: "Piyush", email: "test@example.com" });
      setIsNewUser(false);
    } else {
      setIsLoggedIn(true);
      setUser({ name: "New User", email: "signup@example.com" });
      setIsNewUser(true);
      setCountdown(3);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentState("Login");
  };

  // ✅ Countdown for new users -> then redirect to homepage
  useEffect(() => {
    if (isLoggedIn && isNewUser) {
      if (countdown === 0) {
        navigate("/"); // redirect to homepage
      }
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isNewUser, countdown, navigate]);

  // ✅ Show welcome screen for new user
  if (isLoggedIn && isNewUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <h1 className="text-2xl font-bold mb-4">
          🎉 Welcome, {user?.name} 🎉
        </h1>
        <p className="text-lg">Redirecting to homepage in {countdown}...</p>
      </div>
    );
  }

  // ✅ If logged in (existing user) -> Profile Page
  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Welcome Back, {user?.name} 👋</h1>
        <p className="mb-6">Email: {user?.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    );
  }

  // ✅ Otherwise show Login / Sign Up form
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl"> {currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>

      <div className="w-full px-3 py-2 flex flex-col gap-4">
        {currentState === "Sign Up" && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400"
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-400"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-400"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 "
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default Login;
