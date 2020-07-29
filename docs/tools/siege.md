---
title: Siege
prev: /tools/minikube
---

# Siege

**Siege** est un **outil de benchmarking open-source** permettant de **simuler une montée en charge**.

C'est un bon moyen pour **tester la robustesse** d'un **cluster** Kubernetes.

## Installation

1. Installez le packet :

```
sudo apt-get install siege -y
```

2. Génerer le fichier de configuration :
```
siege.config
```

## Utilisation

L'utilisation est très simple, il suffit de taper la commande `siege`, suivie de l'url de destination.

### Lancer un siege

```
siege <url-de-destination>
```

### Paramètres

- `-c` : le nombre d'utilisateur simultanné.
- `-t` : la durée de la requête.
- `-r` : le nombre de fois a effectuer la requête.
 
## Sources

- [Site officiel](https://www.joedog.org/)
- [Github](https://github.com/JoeDog/siege)
- [Test de monté en charge avec Siege (en)](https://www.tecmint.com/load-testing-web-servers-with-siege-benchmarking-tool/)
