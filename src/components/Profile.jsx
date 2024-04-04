import { useState, useEffect } from "react";

// We do not have a global state manager like Redux yet, so we just get the current user from the authservice
import AuthService from "../services/AuthService";

const Profile = () => {
  // This is the local state currentUser for this Profile component
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); // Initialize to current settings from localstorage

  // The function passed to useEffect is a callback function. This will be called after the component renders
  useEffect( () => {
    const user = AuthService.getCurrentUser();
    // Only update currentuser state if loggedin user is changed
    if(currentUser.username != user.username) 
      setCurrentUser(user); // setting a local state variabel will trigger a new rendering...

  }, [currentUser]) // ... to avoid infinte loop, useEffect calls set which triggers useeffect and so on, we give the possible state variabel which should not trigger again...
  

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "} {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
    </div>
  );
};

export default Profile;