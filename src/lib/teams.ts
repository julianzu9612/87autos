export type Player = {
  number: number;
  name: string;
  position: "Handler" | "Cutter" | "Hybrid";
};

export type Team = {
  id: string;
  name: string;
  players: Player[];
  wins?: number;
  losses?: number;
  rank?: number;
  city?: string;
};

const positionCycle: Player["position"][] = ["Handler", "Cutter", "Hybrid"];

const euforiaRoster: Player[] = [
  { number: 1, name: "John Quiroga", position: positionCycle[0] },
  { number: 4, name: "Luis Tapias", position: positionCycle[1] },
  { number: 7, name: "David Gómez", position: positionCycle[2] },
  { number: 9, name: "German Quiroga", position: positionCycle[0] },
  { number: 10, name: "Michael Espinosa", position: positionCycle[1] },
  { number: 11, name: "Juan Montenegro", position: positionCycle[2] },
  { number: 12, name: "Juan Rodríguez", position: positionCycle[0] },
  { number: 14, name: "Juan Guzmán", position: positionCycle[1] },
  { number: 16, name: "Rafael Reyes", position: positionCycle[2] },
  { number: 26, name: "Federico Bautista", position: positionCycle[0] },
  { number: 29, name: "Felipe Bohórquez", position: positionCycle[1] },
  { number: 31, name: "Camilo Gutiérrez", position: positionCycle[2] },
  { number: 38, name: "Jaime Segura", position: positionCycle[0] },
  { number: 41, name: "Juan Cárdenas", position: positionCycle[1] },
  { number: 43, name: "Diego Sanabria", position: positionCycle[2] },
  { number: 47, name: "Diego Copete", position: positionCycle[0] },
  { number: 49, name: "Daniel Chica", position: positionCycle[1] },
  { number: 50, name: "Oscar Soler", position: positionCycle[2] },
  { number: 51, name: "Sergio Castañeda", position: positionCycle[0] },
  { number: 53, name: "Esteban Rincón", position: positionCycle[1] },
  { number: 1, name: "Juan Ramírez", position: positionCycle[2] },
  { number: 54, name: "Hector Ordoñez", position: positionCycle[0] },
  { number: 55, name: "Alfredo Fajardo", position: positionCycle[1] },
  { number: 56, name: "Cristian Mendoza", position: positionCycle[2] },
  { number: 63, name: "Juan Pérez", position: positionCycle[0] },
  { number: 77, name: "Carlos Vergara", position: positionCycle[1] },
  { number: 71, name: "Juan Díaz", position: positionCycle[2] },
  { number: 74, name: "Juan Olivella", position: positionCycle[0] },
  { number: 33, name: "Rafael Ferreira", position: positionCycle[1] },
  { number: 75, name: "Diego Suarez", position: positionCycle[2] },
  { number: 77, name: "Martín Serrano", position: positionCycle[0] },
  { number: 78, name: "Pablo Daza", position: positionCycle[1] },
  { number: 82, name: "Brandon Bohórquez", position: positionCycle[2] },
  { number: 96, name: "Andres Higuera", position: positionCycle[0] },
  { number: 97, name: "Iván García", position: positionCycle[1] },
];

const discountryRoster: Player[] = [
  { number: 0, name: "Milton Álvarez", position: positionCycle[0] },
  { number: 1, name: "José Vargas", position: positionCycle[1] },
  { number: 4, name: "Miguel Barrera", position: positionCycle[2] },
  { number: 8, name: "Nicolás Ferrer", position: positionCycle[0] },
  { number: 10, name: "Jair Fandiño", position: positionCycle[1] },
  { number: 11, name: "Christian Escobar", position: positionCycle[2] },
  { number: 13, name: "Juan García", position: positionCycle[0] },
  { number: 14, name: "Néstor Ávila", position: positionCycle[1] },
  { number: 21, name: "Michael Monroy", position: positionCycle[2] },
  { number: 22, name: "Juan Beltrán", position: positionCycle[0] },
  { number: 23, name: "Jeisson Sastre", position: positionCycle[1] },
  { number: 27, name: "Genardo Carranza", position: positionCycle[2] },
  { number: 29, name: "Fabian Castiblanco", position: positionCycle[0] },
  { number: 30, name: "David Ospina", position: positionCycle[1] },
  { number: 32, name: "Andrés Hernández", position: positionCycle[2] },
  { number: 66, name: "Esteban Campuzano", position: positionCycle[0] },
  { number: 73, name: "Cristian Navarro", position: positionCycle[1] },
  { number: 77, name: "Sebastián Parra", position: positionCycle[2] },
  { number: 81, name: "Juan Rico", position: positionCycle[0] },
  { number: 94, name: "Camilo Laverde", position: positionCycle[1] },
  { number: 79, name: "Jaime Campos", position: positionCycle[2] },
];

export const teams: Team[] = [
  {
    id: "euforia",
    name: "Euforia",
    players: euforiaRoster,
    wins: 5,
    losses: 0,
    rank: 1,
    city: "Bogotá",
  },
  {
    id: "discountry",
    name: "Discountry",
    players: discountryRoster,
    wins: 4,
    losses: 1,
    rank: 2,
    city: "Bogotá",
  },
  {
    id: "rocket",
    name: "Rocket",
    players: [],
    wins: 3,
    losses: 2,
    rank: 3,
    city: "Bogotá",
  },
  {
    id: "lanceros",
    name: "Lanceros",
    players: [],
    wins: 3,
    losses: 2,
    rank: 4,
    city: "Bogotá",
  },
  {
    id: "makawa",
    name: "Makawa",
    players: [],
    wins: 2,
    losses: 3,
    rank: 5,
    city: "Medellín",
  },
  {
    id: "d-crash",
    name: "D-Crash",
    players: [],
    wins: 2,
    losses: 3,
    rank: 6,
    city: "Cali",
  },
];

export function getTeamById(id: string) {
  return teams.find((team) => team.id === id);
}
