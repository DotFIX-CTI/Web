import { formatarNomeEquipe } from "@/utils/formatarEquipe";
import { Equipe } from "./equipe";

export const equipesMock: Equipe[] = [
  {
    equipeID: 1,
    nomeEquipe: formatarNomeEquipe("Alpha - Centro"),
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
    membros: [
      { id: 101, nome: "Arthur Sales", email: "arthur.sales@empresa.com" },
      { id: 102, nome: "Diego Castro", email: "diego.castro@empresa.com" },
    ],
  },
  {
    equipeID: 2,
    nomeEquipe: formatarNomeEquipe("Bravo - Zona Sul"),
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
    membros: [
      { id: 103, nome: "Lucas Mendes", email: "lucas.mendes@empresa.com" },
      { id: 104, nome: "Camila Rocha", email: "camila.rocha@empresa.com" },
    ],
  },
  {
    equipeID: 3,
    nomeEquipe: formatarNomeEquipe("Charlie - ABC"),
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
    membros: [
      { id: 105, nome: "Rafael Lima", email: "rafael.lima@empresa.com" },
      { id: 106, nome: "Bruno Costa", email: "bruno.costa@empresa.com" },
    ],
  },
  {
    equipeID: 4,
    nomeEquipe: formatarNomeEquipe("Delta - Zona Leste"),
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
    membros: [
      { id: 107, nome: "Fernanda Alves", email: "fernanda.alves@empresa.com" },
      { id: 108, nome: "Thiago Souza", email: "thiago.souza@empresa.com" },
    ],
  },
  {
    equipeID: 5,
    nomeEquipe: formatarNomeEquipe("Echo - Zona Norte"),
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
    membros: [
      { id: 109, nome: "Gabriel Santos", email: "gabriel.santos@empresa.com" },
      { id: 110, nome: "Mariana Dias", email: "mariana.dias@empresa.com" },
    ],
  },
  {
    equipeID: 6,
    nomeEquipe: formatarNomeEquipe("Alpha - Centro"),
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
    membros: [
      { id: 111, nome: "Pedro Henrique", email: "pedro.henrique@empresa.com" },
      {
        id: 112,
        nome: "Juliana Martins",
        email: "juliana.martins@empresa.com",
      },
    ],
  },
  {
    equipeID: 7,
    nomeEquipe: formatarNomeEquipe("Bravo - Zona Sul"),
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
    membros: [
      {
        id: 113,
        nome: "Matheus Oliveira",
        email: "matheus.oliveira@empresa.com",
      },
      {
        id: 114,
        nome: "Vinícius Pereira",
        email: "vinicius.pereira@empresa.com",
      },
    ],
  },
  {
    equipeID: 8,
    nomeEquipe: formatarNomeEquipe("Charlie - ABC"),
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
    membros: [
      {
        id: 115,
        nome: "Rodrigo Ferreira",
        email: "rodrigo.ferreira@empresa.com",
      },
      { id: 116, nome: "Larissa Gomes", email: "larissa.gomes@empresa.com" },
    ],
  },
  {
    equipeID: 9,
    nomeEquipe: formatarNomeEquipe("Delta - Zona Leste"),
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
    membros: [
      { id: 117, nome: "Felipe Barbosa", email: "felipe.barbosa@empresa.com" },
      { id: 118, nome: "Amanda Ribeiro", email: "amanda.ribeiro@empresa.com" },
    ],
  },
  {
    equipeID: 10,
    nomeEquipe: formatarNomeEquipe("Echo - Zona Norte"),
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
    membros: [
      {
        id: 119,
        nome: "Gustavo Carvalho",
        email: "gustavo.carvalho@empresa.com",
      },
      {
        id: 120,
        nome: "Beatriz Nogueira",
        email: "beatriz.nogueira@empresa.com",
      },
    ],
  },
  {
    equipeID: 11,
    nomeEquipe: formatarNomeEquipe("Alpha - Centro"),
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
    membros: [
      {
        id: 121,
        nome: "Leonardo Teixeira",
        email: "leonardo.teixeira@empresa.com",
      },
      { id: 122, nome: "Caio Moreira", email: "caio.moreira@empresa.com" },
    ],
  },
  {
    equipeID: 12,
    nomeEquipe: formatarNomeEquipe("Bravo - Zona Sul"),
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
    membros: [
      {
        id: 123,
        nome: "Eduardo Azevedo",
        email: "eduardo.azevedo@empresa.com",
      },
      {
        id: 124,
        nome: "Patrícia Vieira",
        email: "patricia.vieira@empresa.com",
      },
    ],
  },
  {
    equipeID: 13,
    nomeEquipe: formatarNomeEquipe("Charlie - ABC"),
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
    membros: [
      { id: 125, nome: "Marcelo Duarte", email: "marcelo.duarte@empresa.com" },
      { id: 126, nome: "Renata Campos", email: "renata.campos@empresa.com" },
    ],
  },
  {
    equipeID: 14,
    nomeEquipe: formatarNomeEquipe("Delta - Zona Leste"),
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
    membros: [
      { id: 127, nome: "André Monteiro", email: "andre.monteiro@empresa.com" },
      {
        id: 128,
        nome: "Daniela Freitas",
        email: "daniela.freitas@empresa.com",
      },
    ],
  },
  {
    equipeID: 15,
    nomeEquipe: formatarNomeEquipe("Echo - Zona Norte"),
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
    membros: [
      {
        id: 129,
        nome: "Henrique Correia",
        email: "henrique.correia@empresa.com",
      },
      { id: 130, nome: "Tatiane Barros", email: "tatiane.barros@empresa.com" },
    ],
  },
  {
    equipeID: 16,
    nomeEquipe: formatarNomeEquipe("Alpha - Centro"),
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
    membros: [
      { id: 131, nome: "igor Pinto", email: "igor.pinto@empresa.com" },
      {
        id: 132,
        nome: "Natália Cardoso",
        email: "natalia.cardoso@empresa.com",
      },
    ],
  },
  {
    equipeID: 17,
    nomeEquipe: formatarNomeEquipe("Bravo - Zona Sul"),
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
    membros: [
      { id: 133, nome: "Fábio Mendes", email: "fabio.mendes@empresa.com" },
      { id: 134, nome: "Vanessa Araujo", email: "vanessa.araujo@empresa.com" },
    ],
  },
  {
    equipeID: 18,
    nomeEquipe: formatarNomeEquipe("Charlie - ABC"),
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
    membros: [
      { id: 135, nome: "Samuel Rocha", email: "samuel.rocha@empresa.com" },
      {
        id: 136,
        nome: "Carolina Borges",
        email: "carolina.borges@empresa.com",
      },
    ],
  },
  {
    equipeID: 19,
    nomeEquipe: formatarNomeEquipe("Delta - Zona Leste"),
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
    membros: [
      { id: 137, nome: "Ricardo Neves", email: "ricardo.neves@empresa.com" },
      {
        id: 138,
        nome: "Priscila Moraes",
        email: "priscila.moraes@empresa.com",
      },
    ],
  },
  {
    equipeID: 20,
    nomeEquipe: formatarNomeEquipe("Echo - Zona Norte"),
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
    membros: [
      {
        id: 139,
        nome: "Alexandre Farias",
        email: "alexandre.farias@empresa.com",
      },
      { id: 140, nome: "Débora Macedo", email: "debora.macedo@empresa.com" },
    ],
  },
];