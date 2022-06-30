import React, { useContext, useState } from "react";
import { AuthContext } from "../context/userContext";
import Api from "../services/api";
import Cookies from "js-cookie";

export function GetUserRepresentante() {
  const [userRepresentantes_Data, set_userRepresentantes_Data] = useState([]);
  const [isLoading, set_isLoading] = useState(false);

  const handleGetUserRepresentantes = async () => {
    let res = null;

    let representante = Cookies.get("token");

    if (representante) {
      representante = JSON.parse(representante);
    }

    let IDREPRESENTANTE = representante.representante.IDREPRESENTANTE;

    res = await Api.post(`representante/cliente`, { IDREPRESENTANTE });
    set_userRepresentantes_Data(res.data.clientes);
  };

  const handleSearchUserRepresentante = async (
    userRepresentateData,
    status
  ) => {
    let res = null;

    let representante = Cookies.get("token");

    if (representante) {
      representante = JSON.parse(representante);
    }

    let IDREPRESENTANTE = representante.representante.IDREPRESENTANTE;
    set_isLoading(true)
    res = await Api.post(`representante/cliente/search`, {
      IDREPRESENTANTE,
      userRepresentateData,
      status,
    });
    console.log(res.data);
    set_isLoading(false)
    set_userRepresentantes_Data(res.data.clientes);
  };

  const handleSearchUserRepresentanteStatus = async (status) => {
    let res = null;

    let representante = Cookies.get("token");


    if (representante) {
      representante = JSON.parse(representante);
    }

    let IDREPRESENTANTE = representante.representante.IDREPRESENTANTE;

    res = await Api.post(`representante/cliente/searchStatus`, { IDREPRESENTANTE, status });
    console.log(res.data);
    set_userRepresentantes_Data(res.data.clientes);
  };
  

  return {
    userRepresentantes_Data: userRepresentantes_Data,
    handleGetUserRepresentantes: handleGetUserRepresentantes,
    handleSearchUserRepresentante: handleSearchUserRepresentante,
    handleSearchUserRepresentanteStatus: handleSearchUserRepresentanteStatus,
    isLoading: isLoading
  };
}
