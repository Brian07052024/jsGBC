export interface Juego {
  id: string;
  titulo: string;
  anio: number;
  genero: string;
  portada: string;
  /** Ruta de la ROM dentro de /public. null = todavia no tenemos el archivo. */
  rom: string | null;
  /** Color de acento para el resplandor y los textos del carrusel. */
  acento: string;
}

export const JUEGOS: Juego[] = [
  {
    id: 'pokemon',
    titulo: 'Pokemon',
    anio: 1999,
    genero: 'RPG',
    portada: '/pokemon.jpg',
    rom: 'pokemon.gbc',
    acento: '#f5c518'
  },
  {
    id: 'zelda',
    titulo: 'The Legend of Zelda',
    anio: 1993,
    genero: 'Aventura',
    portada: '/zelda.jpg',
    rom: null,
    acento: '#34d399'
  },
  {
    id: 'mario',
    titulo: 'Super Mario',
    anio: 1989,
    genero: 'Plataformas',
    portada: '/mario.jpg',
    rom: null,
    acento: '#ef4444'
  },
  {
    id: 'kirby',
    titulo: 'Kirby',
    anio: 1992,
    genero: 'Plataformas',
    portada: '/kirby.jpg',
    rom: null,
    acento: '#f472b6'
  },
  {
    id: 'zelda',
    titulo: 'The Legend of Zelda',
    anio: 1993,
    genero: 'Aventura',
    portada: '/zelda.jpg',
    rom: null,
    acento: '#34d399'
  },
];
