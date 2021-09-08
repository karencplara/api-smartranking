import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
  cellphone: {type: String},
  email: { type: String, unique: true},
  name: String,
  ranking: String,
  positionRanking: Number,
  urlPhotoPlayer: String,
}, {timestamps: true, collection: 'players'});
