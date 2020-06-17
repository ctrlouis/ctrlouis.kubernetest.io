![Logo Kubeadm](/assets/images/minikube.png)

# Minikube

## Prérequis

- Docker

***

## Installation

1. Télécharger minikube :
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
```
2. Ajouter Minikube dans le path :
```
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

## Utilisation

- Démarrer Minikube :
```
Minikube start
```

- Obtenir l'url vers un service :
```
Minikube Service <nom-du-service>
```

## Sources

- [Installer Minikube](https://kubernetes.io/fr/docs/tasks/tools/install-minikube/)