import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://agendamento:dbrwOcPuwELQblrV@cluster0.jy0yr.mongodb.net/smartranking?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true}),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
