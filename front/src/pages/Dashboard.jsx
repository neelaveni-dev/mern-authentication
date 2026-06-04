import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard(){

  const user = JSON.parse(
    localStorage.getItem("user")
  );  
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};
    return(
        <div>
            <h1>Dashboard</h1>
            <h2>
                Welcome {user?.name}
            </h2>

            <button onClick={logout}>
             Logout
            </button>
        </div>
    );
}


export default Dashboard;