import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  userInfo: null,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [tempToken, setTempToken] = useState();
  const [userInfo, setUserInfo] = useState();
  // {
  //   age: 36,
  //   avatar_url: "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
  //   first_name: "Alan",
  //   interests: "I enjoy playing football",
  //   last_name: "Knobs",
  //   username: "cronaldo",
  // }
  const [isDevServer, setIsDevServer] = useState(false);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    setTempToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user-info");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    tempToken,
    setTempToken,
    authenticate: authenticate,
    logout: logout,
    userInfo,
    setUserInfo,
    isDevServer,
    setIsDevServer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
