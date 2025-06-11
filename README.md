### Installer les dépendances et maj

*Dans cette partie je m'intéresse à produire un environnement de code propre pour travailler avec **NestJs** et apprendre à l'utiliser dans les meilleurs conditions*

#### I - Gestion de NVM

NVM est un gestionnaire de version pour node.js (Node Version Manager) ! Par principe pour
gérer plusieurs projets node et jongler entre les versions il est indispensable de le maitriser.

##### a) Connaître la dernière LTS disponible

Tout va directement être géré sur curl vers le dépot git officiel de **nvm**
```bash
curl -s https://api.github.com/repos/nvm-sh/nvm/releases/latest | grep tag_name
```

Ici nous obtenon en sortie : 
```bash
  "tag_name": "v0.40.3",
```

##### b) installer/Mettre à jour NVM

La dernière version stable serait donc la v0.40.3, nous pouvons l'installer et rester
serein un moment car NVM est rétrocompatible et très peu mis à jour en général !

Pour l'installer on procède ainsi :
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
````
**ATTENTION** : *Cette étape sera la même pour les mise à jour, il n'y a pas de commande d'update spécifique pour **NVM**.*

Une fois **NVM** mis à jour/installé, pour n'importe quel support il suffit de redémarrer le terminal pour recharger 
l'environnement, mais si nous le souhaitons, sur mac nous pouvons procéder ainsi sans redémarrer :
```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
```

Il nous suffit pour finir de vérifier la version installer avec cette commande :
```bash
nvm -v
```

#### II - Mettre à jour node et NPM

Pour avoir un bon environnement pour NestJs nous allons avoir besoin d'un node et **NPM** (Node Package Manager) à jour car
**NestJs** sera justement géré avec **NPM**.

*Dans mon cas node est déjà installé sur mon support mais ce qui va suivre s'applique aussi bien pour ceux qui ne l'ont
pas encore installé et c'est grâce à la puissance de **NVM**.*

##### a) installation/mise à jour

Vous pouvez installer ou mettre à jour vers la LTS à la fois **node** et **NPM** en une seule commande très simple :
```bash
nvm install --lts
```

Il est aussi possible d'installer une version spécifique de **node** et de **NPM** ainsi:
```bash
nvm install 20.11.1
```
Ici **node** sera installé dans la version 20.11.1 et **NPM** sera installé dans la version dans laquelle il est fourni par défaut pour cette version de **node**.

Il est ensuite possible de vérifier les versions installé ainsi :
```bash
node -v && npm -v
```
##### b) gestion de MAJ avec NVM

### Initialisation d'un projet NestJS

*Pour me familiariser avec la structure du projet j'ai choisi de faire la mise en place
et l'installation manuellement étape par étape et écrire les fichiers uns à uns.*

#### I - package.json

Ce fichier est requis pour chaque projet **node**, il centralise les informations importantes du projet (versions, modules utilisés etc...).

On l'initialise ainsi :
```bash
npm init -y
```
l'option permet de passer les étapes ou on écrit ligne par ligne le fichier.

#### II - installation de NestJS et ses dépendances

**NestJS**, c’est un gros écosystème composé de plusieurs briques indépendantes.
Pour bien organiser tout ça, ces briques sont rangées dans un groupe spécial appelé un *scope*, ici nommé @nestjs.
Le @ sert à dire : "ce module fait partie de la famille NestJS."

Par exemple : @nestjs/core, @nestjs/common, @nestjs/testing…
Ce sont comme des modules officiels du projet, chacun avec un rôle précis.

Pour notre part nous allons installer :
 - @nestjs/core : le moteur du framework
 - @nestjs/common : tout un tas de fonctionnalités de bases dont on parlera plus tard
 - @nestjs/express-platform : moteur HTTP "express" (module node pour gérer les routes en js natif) 
 - rxjs : Des fonctions de programmation asynchrone avancées -> programmation réactive
 - reflect-metadata : gestion des métadonnées pour ne pas perdre des informations à la compilation ts -> js

 l'installation est assez simple :
 ```bash
 npm install @nestjs/core @nestjs/common @nestjs/platform-express rxjs reflect-metadata
 ```

Normalement il ne doit y avoir aucun soucis à l'installation nous pouvons maintenant nous occuper
d'installer les outils **TypeScript** qui est le vrai langage de **NestJS**.

Cela inclut :
 - typescript : compilateur qui transforme ts -> js
 - ts-node : un executeur qui permet de dynamiquement executer du ts comme un langage interprété
 - @types/node : les différents types spécifiques pour la programmation node

 Nous allons devoir préciser --save-dev pour que les paquets soient rajouté à l'environnement de dev dans le package.json (car le projet final doit être compilé donc pas en **TypeScript**)
 ```bash
 npm install --save-dev typescript ts-node @types/node
 ```

#### III - Configuration du compilateur TypeScript

*On va devoir initialiser un fichier de configuration pour la compilation avec tsx !
Il lira ce fichier avant de compiler pour décider de quelle manière il va traiter notre code.*

Pour cela on utilise npx qui est dans la même ligné que npm mais qui ce coup-ci ne sert pas à la gestion
des packages mais à leur execution en ligne de commande. Nous l'utilisons pour executer tsx et initialiser 
le fichier de configuration :
```bash
npx tsx --init
```
Nous avons désormais un fichier de configuration tsconfig.json par défaut :
 - target: es2016 -> Version de js trop ancienne pour des projets modernes de **NestJS**
 - module: commonjs -> Système d'importation des modules de node, parfait pour notre projet !
 - strict: true -> Bon reflexe de programmation pour que le compilateur soit un peu exigeant sur le code
 - esModuleInterop: true -> Permet des imports modernes en plus de ceux de commonjs 
 - skipLibCheck: true -> Bloque les erreurs provenant de Libs externes (**NestJS** est très verbeux)
 - forceConsistentCasingInFileNames: true -> protège la casse dans les noms d'imports (maj/min)

Nous allons devoir modifier certaines choses mais il y a déjà des paramètres qui nous conviennent
**petite note**: *il nous manque la partie : "include" : [src] qui permet de limiter les fichiers à compiler au dossier ./src
sans cette précision tsx compile tous les .ts qu'il trouve sous-dossiers inclus.*

Voici le fichier *tsconfig.json* mis à jour pour nos projets:
```json
{
    "compilerOptions" : {
        "target": "es2020",
        "experimentalDecorators": true, // Insert les décorateurs (nous y reviendrons)
        "emitDecoratorMetadata": true, // Permet les metadatas nécessaire pour le typage comme on disait auparavant
        "module": "commonjs",
        "moduleResolution": "node", // permet de résoudre les modules importés de manière moderne
        "outDir": "./dist", // precise ou nous devons écrire le projet compilé !
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    },
    "include": ["src"] // compile que ce qui se trouve dans ./src
}
```

#### IV - Ecriture et organisation des fichiers de base

*Ici il sera nécessaire d'aller voir les fichiers dans ./src, avec les connaissances
que nous avons nous sommes maintenant en mesure de mieux comprendre ce qu'il se passe !*

-**Explication de certains termes**-:
 - *Décorateur* : propre à NestJS, sous la forme '@Module' ou '@Get' ils typent une classe auprès de NestJS:
    - afin qu'il sache ce qu'il est sensé en faire
    - qu'il gère les imports/exports/dépendances à la compilation
    - qu'il injecte des métadonnées de configuration suivant les types
 - *constructeur* : Gère essentiellement les routes Get, Post..
 - *service* : Gère la logique métier du projet, toutes les fonctions mise en place par le dev !
 - *hook* : Les "événements" naturels de NestJS (initialisation d'un module, fermeture d'un module...)
    - exemple d'utilité : la fermeture d'une connexion à une BDD lorsque l'application ferme.

 -**Structure du projet**-
 ```
src/
├── main.ts
├── app.module.ts
├── app.controller.ts
└── app.service.ts
```
-> *Allez lire les fichiers pour mieux comprendre*

#### V - executer le projet

*Maintenant que tous nos fichiers sont bien écrits il est temps de faire tourner le projet !*

-**Rajouter un bouton ON**-

En théorie pour lancer le projet (sans le compiler explicitement) nous devrions procéder ainsi :
```bash
ts-node src/main.ts
```

mais classiquement pour les projets **node** il est d'usage de mettre en route un projet autrement, on 
va donc ajouter au *package.json* les lignes suivante : 
```json
"scripts" : {
    "start" : "ts-node src/main.ts"
}
```

Nous sommes donc en mesure de mettre en route le projet ainsi :
```bash
npm run start
```
-**Build complet du projet**-

Ici le script sert pour les phases de test mais il serait utile d'étoffer un peu avec des scripts de build !
On enrichie un peu *package.json* :
```json
"scripts": {
    "start": "ts-node src/main.ts",
    "build": "tsc",
    "start:prod": "node dist/main.js"
}
```

### Cloner, installer et executer le projet

Dans le terminal rendez-vous dans le dossier ou vous voulez cloner le projet :
```bash
git clone https://github.com/Hiboo-script/HelloWorld_NestJS.git
cd HelloWorld_NestJS/
npm install
npm run start
```

*Assurez vous d'avoir **node** et **npm** sinon revenez au début du document !*


