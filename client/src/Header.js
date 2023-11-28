import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {

  const{setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials : 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    }).catch(err=> {
      console.log(err);
    })
  }, []);

  function logout(){
    fetch("http://localhost:8080/logout", {
      credentials : 'include',
      method : 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return(
    <header>
      <Link to="/" className="logo">WhisperNet</Link>
      
      
      <nav>

        {username && (
          <>
            <span className="username">Hello, {username}</span>
            <Link to={'/create'}>Create Post</Link>
            {/* <select>
              <option></option>
              <option></option>
            </select> */}
            <a onClick={logout}>Logout</a>
            
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </nav>
    </header>
  );
}