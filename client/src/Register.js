import { useState } from "react";

export default function Register() {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      body : JSON.stringify({username, password}),
      headers: {"Content-Type" : "application/json"},
    });
    // console.log(response);
    if(response.status === 200){
      alert('Registration successful.');
    }
    else{
      alert('Registration failed.');
    }
  }

  return(
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input  type="text" 
              placeholder="type work-email" 
              name="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}/>
      <input  type="password" 
              placeholder="type password"
              name="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}