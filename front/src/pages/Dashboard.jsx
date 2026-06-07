import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {

const user = JSON.parse(localStorage.getItem("user"));
const [name, setName] = useState(user?.name || "");
const [phone, setPhone] = useState(user?.phone || "");
const [address, setAddress] = useState(user?.address || "");
const [currentPassword,setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [darkMode, setDarkMode] = useState(false);
const navigate = useNavigate();

const [image, setImage] = useState(null);

const handleUpdateProfile = async () =>
{
  try {
const formData = new FormData();

formData.append("image", image);
formData.append("email", user.email);

await axios.put(

  "http://localhost:5000/api/auth/upload-image",formData
);

toast.success("Image Uploaded");
} catch (err) 
 {
  console.log(err);
  toast.error("Image Uploaded Failed");
 }
};

const updateProfile = async () => {
try {
const res = await axios.put(
"http://localhost:5000/api/auth/update-profile",
{
email: user.email,
name,
phone,
address,
}
);

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  toast.success("Profile Updated");
} catch (err) {
  toast.error("Update Failed");
}
};
const changePassword = async () => {
  try {
    await axios.put(
      "http://localhost:5000/api/auth/change-password",
      {
        email: user.email,
        currentPassword,
        newPassword,
      }
    );

    toast.success("Password Changed");
  } catch {
    toast.error("Password Change Failed");
  }
};
const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
};
<img
  src={`http://localhost:5000/uploads/${user?.profileImage}`}
  alt="Profile"
  width="150"
/>
return (
  <div className={darkMode ? "dashboard dark" : "dashboard"}>
    <div className="dashboard-card">
      <h1>Dashboard</h1>
      <h3>Welcome Back, {user?.name}👋</h3>
      <p><strong>Email:</strong>  {user?.email}</p>
      <h3>Profile Information</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <input
         type="file"
         accept="image/*"
         onChange={(e) => setImage(e.target.files[0])}
      />
      

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      
      <button
        className="update-btn"
        onClick={async () => {
          await handleUpdateProfile();
          await updateProfile();
        }}
      >
        Update Profile
      </button>
     
<button onClick={() => setDarkMode(!darkMode)}>🌙Dark Mode</button>
      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
);
}

export default Dashboard;