import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    @Get() // Parametre une route GET
    getHello(): string { // ts => indique le type retourne par la methode (securite)
        return this.appService.getHello(); // appelle getHello() dans app.service.ts et retourne le resultat
    }

// Le constructeur sert ici a injecter en private la dependance AppService a la racine de this 
constructor(private readonly appService: AppService) {}
}