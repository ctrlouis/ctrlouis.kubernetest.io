---
title: Minikube
prev: /tools/kubeadm
next: /tools/siege
---

# Minikube

![Logo minikube](../assets/images/minikube.png)

**Minikube** est un outil permettant de découvrir **Kubernetes**.

Il exécute un **cluster à noeud unique** (à la fois **master** et **worker**), au sein d'une **machine virtuelle** sur votre ordinateur.

**Minikube** permet donc à n'importe qui d'essayer **Kubernetes** sans avoir accès à une flotte de machines pour composer un cluster.

## Prérequis

- Docker


## Installation

### Téléchargement

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
```

### Variable d'envrionnement

```
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

## Démarrage

Pour démarrer un cluster il suffit de lancer la commande suivante : 

```
minikube start
```

## Intéragir avec votre cluster

### Dashboard

**Minikube** intègre le **Dashboard** Kubernetes (voir la [section Dashboard](/tools/dashboard)) et propose une commande pour le démarrer :

```
minikube dashboard
```

### CLI

En plus d'un **set de commmandes** qui sont propres à **Minikube** et puisqu'il s'agit d'un **cluster** Kubernetes, il est possible d'avoir recours au CLI de Kubernetes pour intéragir avec lui (voir la [section Manipuler les primitives](/kubernetes.html#manipuler-les-primitives))

## Sources

- [Installer Minikube (fr)](https://kubernetes.io/fr/docs/tasks/tools/install-minikube/)
- [Installer Minikube (en)](https://kubernetes.io/docs/tasks/tools/install-minikube/)
