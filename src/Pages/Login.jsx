/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// ✅ Simple UI components
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg font-medium transition-transform duration-200
    bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md 
    hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    text-sm shadow-sm transition ${className}`}
  />
);

const Card = ({ children, className = "", ...props }) => (
  <div
    {...props}
    className={`bg-white shadow-xl rounded-2xl border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-5 ${className}`}>{children}</div>
);
const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
);
const CardDescription = ({ children }) => (
  <p className="text-gray-500 text-sm mt-1">{children}</p>
);
const CardContent = ({ children }) => <div>{children}</div>;

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-semibold block mb-1 text-gray-700"
  >
    {children}
  </label>
);

// ✅ Main Component
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", name: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserProfile(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      alert("Please fill in all fields");
      return;
    }
    if (isSignUp && !loginForm.name) {
      alert("Please enter your name");
      return;
    }

    const profile = {
      email: loginForm.email,
      name: isSignUp ? loginForm.name : loginForm.email.split("@")[0],
      bio: "Welcome to my profile!",
      location: "Earth",
      joinDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    setUserProfile(profile);
    setIsLoggedIn(true);
    setLoginForm({ email: "", password: "", name: "" });
    alert(isSignUp ? "Account created successfully!" : "Logged in successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setUserProfile(null);
    setIsLoggedIn(false);
    setIsEditing(false);
    alert("Logged out!");
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        name: editForm.name || userProfile.name,
        bio: editForm.bio || userProfile.bio,
        location: editForm.location || userProfile.location,
      };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      setIsEditing(false);
      setEditForm({ name: "", bio: "", location: "" });
      alert("Profile updated!");
    }
  };

  const startEditing = () => {
    if (userProfile) {
      setEditForm({
        name: userProfile.name,
        bio: userProfile.bio || "",
        location: userProfile.location || "",
      });
      setIsEditing(true);
    }
  };

  // ✅ Profile page after login
  if (isLoggedIn && userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
        <Card className="max-w-4xl w-full overflow-hidden p-0">
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute top-4 right-4">
              <Button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-white text-gray-800 shadow-md hover:shadow-lg hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-4xl font-bold shadow-2xl border-4 border-white">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{userProfile.name}</h1>
                <p className="text-gray-500 text-lg">{userProfile.email}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gray-50 shadow-inner border">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">Bio</h3>
                <p className="mt-2 text-gray-600">{userProfile.bio}</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 shadow-inner border">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">Location</h3>
                <p className="mt-2 text-gray-600">{userProfile.location}</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 shadow-inner border">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">Member Since</h3>
                <p className="mt-2 text-gray-600">{userProfile.joinDate}</p>
              </div>
            </div>

            {/* Edit button */}
            <div className="mt-8 flex justify-center md:justify-end">
              <Button
                onClick={startEditing}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Edit Profile
              </Button>
            </div>

            {/* Edit form */}
            {isEditing && (
              <form
                onSubmit={handleEditProfile}
                className="mt-8 p-6 bg-white rounded-xl shadow-lg border space-y-5"
              >
                <div>
                  <Label htmlFor="editName">Name</Label>
                  <Input
                    id="editName"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="editBio">Bio</Label>
                  <Input
                    id="editBio"
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input
                    id="editLocation"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Where are you from?"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <Button type="submit" className="px-6 py-2 rounded-full">
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ✅ Login / Signup Page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="max-w-md w-full p-6">
        <CardHeader className="text-center">
          <CardTitle>{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={loginForm.name}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
