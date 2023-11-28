import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function Login() {
  const[username, setUsername] = useState('');  
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false); 
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:8080/login", {
      method : 'POST',
      body : JSON.stringify({username, password}),
      headers : {"Content-Type" : "application/json"},
      credentials : 'include',
    });

    if(response.ok){ // if valid credentials redirect to home page
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else{
      alert('Wrong Credentials');
    }
  }

  if(redirect) {
    return <Navigate to={'/'} /> ;
  }

  return(
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text" 
              placeholder="Enter your work email"
              value={username}
              onChange={ev => setUsername(ev.target.value)} />
      <input type="password" 
              placeholder="Password" 
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
      <button>Login</button>
    </form>
  );
}