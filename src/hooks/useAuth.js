import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../context/userContext";
import Api from "../services/api";
import Cookies from "js-cookie";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, set_token] = useState(null);
  const [error, set_error] = useState(null);
  const [message, set_message] = useState("");
  const [isLoading, set_loading] = useState(false);

  const handleLogin = async (CNPJCPF, SENHA) => {
    let res = null;

    set_loading(true);

    if (CNPJCPF && SENHA) {
      res = await Api.post(`login`, { CNPJCPF, SENHA });

      // console.log(res.data);

      if (res.data) {
        Cookies.set("token", JSON.stringify(res.data));
        set_token(res.data);
        set_loading(false);
        navigate("/dashboard");
      }

      if (!res.data) {
        set_loading(false);
        set_error(true);
        set_message("cpf/cnpj ou senha incorreto. Verifique!");
      }
    }

    if (!(CNPJCPF && SENHA)) {
      set_error(true);
      set_loading(false);
      set_message("Nenhum campo pode ficar vazio. Verifique!");
    }
  };

  const handleLogout = async () => {

    navigate("/", { replace: true });
    // set_token(null);
    // Cookies.remove("token");
  };

  const value = {
    set_token,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    error,
    message,
    isLoading,
    set_message,
    set_error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { set_token } = useAuth();

  let token_cookie = Cookies.get("token");

  if (token_cookie) {
    set_token(token_cookie);
  }

  if (!token_cookie) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
