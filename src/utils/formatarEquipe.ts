const mapaLocais: Record<string, string> = {
  "Zona Sul": "ZS",
  "Zona Norte": "ZN",
  "Zona Leste": "ZL",
  "Zona Oeste": "ZO",
  Centro: "CTR",
};

export function formatarNomeEquipe(nome: string) {
  for (const [local, sigla] of Object.entries(mapaLocais)) {
    const regex = new RegExp(local, "i");

    if (regex.test(nome)) {
      return nome.replace(regex, sigla);
    }
  }
  return nome;
}
