# TEZEA CHANTIERS Portail web
 Les étapes d'installation du projet : 
# Cloner le repository 

```console
git clone https://github.com/Skinz3/Front-End-Web.git
```
### Installer les dépendances via npm

```console
npm install
```

Remarque : il est conseillé d'utiliser npm pour ce projet et non yarn!

### I-Lancer le projet en mode local : 

```console
npm start
```
### II-Build le projet pour le déploiement 

```console
ng build --prod
```
Vous le trouverez tous les éléments build dans dist/tezea-chantiers

Ensuite positionnez-vous dans dist/tezea-chantiers, appuyez les 2 touches suivantes en même temps : 
```console
ctrl+L
```
Copiez le chemin et exécutez la commande suivant pour copier fichiers dans /dist/tezea-chantiers vers le serveur : 
```java
scp -r <LE_CHEMIN_QUE_VOUS_AVEZ_COPIEZ_VIA_CTRL+L> ubuntu@5.196.8.112:/home/ubuntu/
```
Un mot de passe vous sera demander : 

```console
vJVgFqCdgV2Z
```

### II-1) Se connecter sur le serveur
Ouvrez un terminal et exécutez les commandes suivantes : 
1- 
```console
ssh ubuntu@5.196.8.112
```
2- Mot de passe : 
```console
vJVgFqCdgV2Z
```
3- 
```console
export PATH=/usr/bin/:$PATH
```

### II-2) Déploiement suite : 
Une fois connété sur le serveur, exécutez les commandes suivantes : 

```console
sudo mv /home/ubuntu/tezea-chantiers /var/www
```

```console
sudo rm -rf /var/www/html
```

```console
sudo mv /var/www/tezea-chantiers /var/www/html
```
Voilà! Le front a été déplyé avec succès! allez sur [An Internal Link](chantier.tezea/fr) 
