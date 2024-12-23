import { Research } from '../research/research-api.types';

export interface SpaceObjectDto {
  name: string;
  photoUrl: string;
  description: string;
  location: string;
}

export interface SpaceObject {
  id: number;
  name: string;
  photoUrl: string;
  description: string;
  location: string;
  researches: Research[] | null;
}
