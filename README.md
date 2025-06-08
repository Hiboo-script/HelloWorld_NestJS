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