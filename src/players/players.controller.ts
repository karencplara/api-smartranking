import { Delete, Param, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlayersValidationParametersPipe } from './pipes/player-validation-parameters.pipe';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto, 
    @Param('_id', PlayersValidationParametersPipe) _id: string): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDto);
  }

  @Get()
  async listPlayers(): Promise<Player[]> {
    return await this.playersService.listAllPlayers();
  }

  @Get('/:_id')
  async listPlayersID(@Param('_id', PlayersValidationParametersPipe) _id: string): Promise<Player> {
    return await this.playersService.listPlayerId(_id);
  }

  @Delete('/:_id')
  async deletePlayer(@Param('_id', PlayersValidationParametersPipe) _id:string): Promise<void> {
    this.playersService.deletePlayer(_id);
  }
}
