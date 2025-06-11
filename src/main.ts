import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module'; // import du fichier app.module.ts

async function bootstrap() {
    // await permet d'attendre qu'un processus (une promesse) soit realise
    const app = await NestFactory.create(AppModule); // instancie l'app Nest en suivant les regles de AppModule
    await app.listen(3000);
} 
bootstrap();