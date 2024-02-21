import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navi = useNavigate();
  const [UserName] = useState("kminchelle");
  const [Password] = useState("0lelplR");

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      navi('/home');
    }
  }, [navi]);

  const LogIn = async (e) => {
    e.preventDefault();
    if (!UserName || !Password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: UserName,
          password: Password,
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response)
        localStorage.setItem('login', JSON.stringify(data)); 
        navi('/home');
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div>
      <h1>This is a login page</h1>
      <br /> <br />
      <form>
        <input
          type="text"
          placeholder="Enter username"
          value={UserName}
          readOnly  
        />
        <br /><br />
        <input
          type="password"
          placeholder="Enter Password"
          value={Password}
          readOnly  
        />
        <br /> <br />
        <button type="submit" onClick={LogIn}>Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
