import { Document } from 'mongoose';

export interface Player extends Document {
  readonly cellphone: string;
  readonly email: string;
  name: string;
  ranking: string;
  positionRanking: number;
  urlPhotoPlayer: string;
}
