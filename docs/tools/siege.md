---
title: Siege
prev: /tools/minikube
---

# Siege


## Installation

1. Installez le packet siege (**admin**) :
```
apt-get install siege -y
```

2. Génerer le fichier de configuration :
```
siege.config
```

## Utilisation

### Lancer un siege
```
siege <website/url.com>
```

### Paramètres :
- `-c` : le nombre d'utilisateur simultanné
- `-t` : la durée de la requête. Specifier S pour secondes, M pour minutes et H pour Heures. Ex: -t 30s pour 30 secondes
- `-r` : le nombre de fois a effectuer la requête
 
## Sources

- [Site officiel](https://www.joedog.org/)
- [Github](https://github.com/JoeDog/siege)
- [Test de monté en charge avec l'outils Siege (en)](https://www.tecmint.com/load-testing-web-servers-with-siege-benchmarking-tool/)
