# Kubernetes

<img title="kubernetes-logo" src="./assets/images/kubernetes.png" alt="" data-align="center">

Kubernetes (K8's) est un système open-source permettant d'automatiser le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.

Il prend tout son sens dans les ecosystèmes actuels, où le déploiement automatique des applications est devenu la norme.

Cependant, l'outil ne s'arrête pas là puisqu'il se charge aussi d'autres aspects tels que la mise à l'échelle (scalabilité) et permet donc d'optimiser les performances des applications déployées.

Kubernetes tend à se rendre indispensable puisque de nos jours nous assistons à une augmentation considérable d'architectures microservices dans lesquelles chaque service n'est ni plus ni moins qu'une application à part entière.

## Conteneurs

Puisqu'il s'agit d'un orchestrateur, Kubernetes doit être associé à un système de conteneurs tel que Docker.

Les conteneurs font donc parti intégrante de l'environnement Kubernetes, si bien qu'il est difficile de comprendre l'intêret de Kubernetes s'il on ne connaît pas ou peu Docker ou des logiciels de virtualisation similaires.

## Primitives

Kubernetes est basé sur un ensemble d'objets que l'on appelle des **primitives**.

### Cluster

Un cluster n'est ni plus ni moins qu'un ensemble de machine exécutant Kubernetes ainsi que les conteneurs qu'il orchèstre.

<img src="./assets/images/cluster.svg" title="cluster" alt="" data-align="center">

### Nodes

Au sein d'un **cluster**, on ne parle plus de machines mais de **nodes** (noeuds).

Un **node** n'est donc ni plus ni moins qu'une machine, souvent virtuelle, qui fait partie du **cluster**.

#### Master node

Le **master** est l'élément principal de l'architecture puisque c'est en son sein que toutes les actions vont êtres effecutées et que les fonctionnalités internes de Kubernetes vont fonctionner.

Il dirige les **worker** qui composent le reste du cluster.

#### Worker node

Ce sont sur les **worker node** que l'on va déployer les applications.

La majorité du temps, on retrouve une architecture composée de deux types de **nodes** : le **master** et le/les **worker**.

Chaque **cluster** est composé au moins d'un **worker**, et il est possible de créer un **cluster** avec un seul **node**, agissant comme **master** et comme **worker**.

### Pod

Un **pod** est un ensemble d'un ou plusieurs conteneurs **colocalisés**.

L'intêret du pod est qu'il permet de déployer des conteneurs qui partagent une même **interface réseau** et un même **système de fichiers**.

C'est donc au sein d'un **pod** que les applications vont tourner.

![pods](./assets/images/pods.svg "pods")

Notons qu'au sein d'un cluster, il est possible de multiplier un même pod de sorte à obtenir plusieurs instances de la même application. Dans ce cas, on parlera de **replicas**.

### Service

Un service est une primitive qui peut jouer le rôle d'intermédiaire entre internet et un **cluster**. 

Il permet **d'exposer le cluster** afin de rendre les applications accessible depuis n'importe où.

Cependant, un service peut également être utilisé au sein d'un cluster afin de créer un pont de communication entre pods.

## Scalabilité

Une des forces de Kubernetes est l'automatisation de la mise à l'échelle.

Pour la suite, admettons que nous avons déployé un cluster sur lequel tournent nos applications.

Dans le cas d'une **augmentation de trafic**, il est possible d'indiquer à Kubernetes d'ajouter des **pods** au sein de **workers nodes**.

Néanmoins, les **worker nodes** ne peuvent contenir qu'un nombre limité de **pods**.

Dans ce cas, Kubernetes se chargera de créer un (ou plusieurs) nouveau **worker node** et y ajoutera des **replicas** afin d'absorber la charge.

Lors de la redescente de la charge, Kubernetes se chargera d'arrêtes les répliquas et de supprimer les workers nodes qu'il a rajouté. 

 De cette manière, on s'assure d'avoir une architecture capable d'encaisser des montées en charge uniquement lorsque nécessaire.
