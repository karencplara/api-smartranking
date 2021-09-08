import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name)

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
      const { email } = createPlayerDto;

      const findPlayer = await this.playerModel.findOne({email}).exec();

      if (findPlayer) {
        throw new BadRequestException(`Jogador com o e-mail ${email} já cadastrado`)
      }

      const playerCreated = new this.playerModel(createPlayerDto);
      return await playerCreated.save();
    }

    async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
      const findPlayer = await this.playerModel.findOne({_id}).exec();

      if(!findPlayer) {
        throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
      }
      await this.playerModel.findOneAndUpdate({_id}, 
        {$set: updatePlayerDto}).exec();
       
    }

    async listAllPlayers(): Promise<Player[]> {
      return await this.playerModel.find().exec();
    }
    async listPlayerId(_id: string) : Promise<Player> {
      const findPlayer = await this.playerModel.findOne({_id}).exec();
      if(!findPlayer) {
        throw new NotFoundException(`Jogador com id ${_id} não foi encontrado`)
      }
      return findPlayer;
    }

    async deletePlayer(_id): Promise<any> {
      const findPlayer = await this.playerModel.findOne({_id}).exec();

      if(!findPlayer) {
        throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
      }
      return await this.playerModel.deleteOne({_id}).exec();
    }

}