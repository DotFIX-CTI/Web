import { Funcionario } from "./funcionario";

interface JwtClaims {
  sub?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export function extrairFuncionarioDoToken(token: string): Funcionario | null {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;

    const base64Normal = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const claims: JwtClaims = JSON.parse(atob(base64Normal));

    const id =
      claims[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ?? claims.sub;
    const nome =
      claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const email =
      claims[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    if (!id && !email) return null;

    return {
      funcionarioID: Number(id),
      nome: nome ?? "",
      email: email ?? "",
    } as Funcionario;
  } catch {
    return null;
  }
}
