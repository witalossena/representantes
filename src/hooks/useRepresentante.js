import React, { useState } from "react";
import Api from "../services/api";

export const useRepresentante = () => {
  const [response, set_response] = useState(null);

  const handleRepresentanteActivation = async (CODCLIENTE, ATIVADESATIVA) => {
    let res;

    res = await Api.post(`representante/AtivaDesativa`, {
      CODCLIENTE,
      ATIVADESATIVA,
    });
    set_response(res.data);
  };

  return {
    handleRepresentanteActivation: handleRepresentanteActivation,
    response: response,
  };
};
