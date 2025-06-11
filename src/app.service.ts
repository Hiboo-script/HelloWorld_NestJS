import { Injectable } from '@nestjs/common';

@Injectable() // decorateur qui permet a NestJS de trouver AppService lors de l'injection dans AppController
export class AppService {
    // methode de AppService tres simple !
    getHello(): string {
        return "Hello World !";
    }
}