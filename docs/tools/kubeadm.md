---
title: Kubeadm
prev: /tools/dashboard
next: /tools/minikube
---

# Kubeadm

![logo-kubeadm](../assets/images/kubeadm.png)

**Kubeadm** est un outil certifié par Kubernetes, permettant de démarrer rapidement un **cluster** à master unique.

Il effectue les actions nécessaires afin d'obtenir un cluster minimal mais fonctionnel et en état de marche.

Comme pour [Minikube](/tools/minikube), **Kubeadm** est un bon moyen pour découvrir et essayer Kubernetes.

## Prérequis

- Docker
- Au moins 2 machines (physiques ou virtuelles) dôtées de Kubernetes

## Installation

### iptables

Laisser `iptables` observer le trafic : 

```
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```

### Paquets

Installer `kubeadm`, `kubelet` and `kubectlz` :

```
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install -y kubeadm kubelet kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

::: danger Attention
**Kubelet** ne fonctionne pas avec un espace swap actif :
1. Désactiver le swap : `swapoff -a`

OU

1. Supprimer le volume swap : `swapoff -v /swapfile` **(admin)**
2. Supprimez la ligne `/swapfile swap swap defaults 0 0` dans le fichier `/etc/fstab`
:::

### Fichiers de configuration

Telecharger les fichiers de configuration de Kubeadm (en admin) :

```
kubeadm config images pull
```

***

## Configuration

### Master node

#### 1. Add-on réseau

Un **add-on réseau** est nécessaire afin de **définir la manière dont les différents noeuds doivent communiquer entre eux**.

Choisissez un add-on [ici](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network) et prenez en compte la configuration nécessaire.

::: warning Note
Dans cette exemple de configuration nous avons recours à Calico, voir cet [article](https://medium.com/flant-com/calico-for-kubernetes-networking-792b41e19d69) qui présente la combiniason de Calico/Kubernetes.
::: 

Pour Calico, il est nécessaire d'ajouter le paramètre `--pod-network-cidr 192.168.0.0/16` à la commande d'initialisation.

#### 2. Initialisation

```
kubeadm init --pod-network-cidr=192.168.0.0/16
```

#### 3. Configuration kubectl

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

#### 4. Récuperer la ligne retourné par `kubeadm init`

Cette ligne permettra aux **worker nodes** de rejoindre le cluster, elle devrait ressembler à ceci :

```
kubeadm join XX.XX.X.X:XXXX --token azert.dj64kglr89fhre \
    --discovery-token-ca-cert-hash sha256:650b0883499a31ce099c6ca8533d0h485ke8d15a1b18e1bcbdb0431337a8cd32a0915
```

#### 5. Déployer l'add-on réseau

```
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

#### 6. Initialisation des pods

Attendez que touts les pods aient été initalisés grâce à la commande suivante :

```
watch kubectl get pods --all-namespaces
```

*(`ctrl + c` pour quitter)*

#### 7. Supprimer la tainte - *Facultatif*

```
kubectl taint nodes --all node-role.kubernetes.io/master-
```

### Worker node

#### 1. Rejoindre le cluster

Lancer la commande renvoyée par l'initailsation du **master node** (voir [Master node - étape 4.](/tools/kubeadm.html#master-node)).

#### 2. Verifier la présence du nouveau noeud

Depuis le **master node** :

```
kubectl get nodes
```

### Rénitialisation d'un noeud

#### Réinitialisation

Depuis le noeud à réinitialiser :

```
kubeadm reset
```

#### Suppression du fichier de configuration 

Ceci empêche d'obtenir des erreurs lors de la nouvelle configuration du noeud :

```
rm ~/.kube/config
```

## Astuces

Connaitre le noeud sur lequel est déployé un pod :

```
kubectl get pods --output=wide
```


Ajouter le parametre `-w` pour suivre les mise à jours en direct :
```
kubectl get nodes -w
kubectl get deployments -w
kubectl get pods -w
```

## Sources
- [Installer Kubeadm (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Création d'un cluster de contrôle unique (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
- [Création d'un cluster de haute disponibilité (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
- [Installation des addons net (en)](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network)
- [Démarrage rapide Calico (en)](https://docs.projectcalico.org/getting-started/kubernetes/quickstart)
- [Supprimer l'espace swap (en)](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/)
- [Comment créer un cluster Kubernetes en utilisant Kubeadm sur Ubuntu 18.04 (en)](https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-ubuntu-18-04)
