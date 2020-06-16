![Logo kubernertes](/assets/images/kubernetes-big-transparent.png)

# Découverte de l'outil Kubernetes

## Contexte
La multiplication des architectures distribuées à base de micro-services fait qu'il devient
nécessaire de pouvoir les gérer plus facilement. Parmis les outils utiles, il y a Kubernetes, un outil
d'orchestration de containers.

## Objectif du projet
L'objectif est de comprendre le fonctionnement et grands principes de cet outil open-source.
Particulièrement adapté pour la gestion de vos images Docker, vous pourrez apprécier à travers
ce projet la facilité qu'apporte ce type d'outil dans la distribution et la mise à l'échelle de vos
applications en fonction du trafic et des contraintes de disponibilité.

## Descriptif détaillé des tâches
Pour bien comprendre l'intérêt de ce type d'outil, une mise en application est nécessaire. Un
environnement d'évaluation devra être mis en place, à l'aide de simples PC sous Linux faisant
tourner des images Docker. Partant de cette infrastructure, vous mettrez en place Kubernetes
afin d'administrer facilement ces machaines et tester le comportement lors de montée en charge
ou indisponibilité de machine.
Plusieurs types de services pourront être exploités (de la simple page Web dynamique à des
services plus complets de type Wordpress), et ce afin de présenter les avantages de l'outil.
Les notions de base de Docker seront acquis en début de projet afin de bien appréhender les
concepts attachés à ces outils.

## Premiers pas
- Découvrir la documentation autour de l'outil : https://kubernetes.io/ ainsi que plusieurs
tutoriels explicatifs tels que https://kubernetes.io/fr/docs/tutorials/kubernetes-basics/ ou
encore https://journaldunadminlinux.fr/tutoriel-installez-facilement-un-cluster-kubernetes-s
ous-debian-ou-centos/ et https://auth0.com/blog/kubernetes-tutorial-step-by-step-introduct
ion-to-basic-concepts/
- Etudier les différentes fonctionnalités proposées ainsi que les autres services liés tels que
traefik (https://docs.traefik.io/getting-started/quick-start/)
- La montée en charge devra être gérée par vos soins à l'aide d'outils simples tels que Siege
ou ab afin de valider le concept de provisionnement
- Déployer un petit service web autour de l'outil à l'aide d'une environnement virtualisé
(Docker ou autre)

## Attentes principales du projet
- Un retour d'expérience sur les difficultés et avantages rencontrés est attendu
- Un environnement fonctionnel composé de plusieurs Dockers, gérés par Kubernetes

## Intérêt pour les étudiants
- Découvrir une nouvelle approche de gestion d'application en micro services portée par une
infrastructure distribuée à l'aide de Kubernetes.
- Comprendre les mécanismes de routage et de répartion de charge à traver ces outils de
dernière génération