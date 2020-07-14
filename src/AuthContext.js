import React from "react";

const AuthContext = React.createContext({
  spotifyAuthToken: "",
  spotifyLogin: () => {},
});

export default AuthContext;
