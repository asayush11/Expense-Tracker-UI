import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthState = (props) => {
  const [authToken, setAuthToken] = useState("")
  
  const refreshAuthToken = () => {
    setAuthToken("");
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, refreshAuthToken }}>
      {props.children}
    </AuthContext.Provider>
  )

}
export default AuthState;