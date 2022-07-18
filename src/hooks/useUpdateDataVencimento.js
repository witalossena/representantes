import React, { useState } from "react";
import Api from "../services/api";

export const handleDataVencimento = () => {
  const [response, set_response] = useState(null);

  const UpdateDataVencimento = async (Data, IdEmpresa) => {

    console.log({Data, IdEmpresa});

    let res;

    res = await Api.post(`representante/cliente/UpdateDataVencimento`, {
      Data,
      IdEmpresa
    });
  };

  return {
    UpdateDataVencimento: UpdateDataVencimento,
  };
};
