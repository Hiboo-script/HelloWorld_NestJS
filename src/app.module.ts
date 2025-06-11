import { Module } from '@nestjs/common'; // import de notre premier decorateur
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Decorateur Module indique a NestJS ce qu'est AppModule
@Module({
    imports : [],
    controllers : [AppController],
    providers: [AppService],
})
export class AppModule {} // rend accessible AppModule a main.ts