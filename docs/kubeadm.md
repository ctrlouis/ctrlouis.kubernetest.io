![Logo Kubeadm](/assets/images/kubeadm-small.png)

# Kubeadm

## Prérequis

- Docker

***

## Installation
1. Letting iptables see bridged traffic
```
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```

2. Install kubeadm, kubelet and kubectl :
```
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

> ***
> /!\ Kubelet ne fonctionne pas avec un espace swap actif
> 1. Désactiver le swap : `swapoff -a`
> OU
> 1. Supprimer le volume swap : `swapoff -v /swapfile` **(admin)**
> 2. Supprimez la ligne *`/swapfile swap swap defaults 0 0`* du fichier *`/etc/fstab`*
> ***

3. Telecharger les fichiers de configuration de Kubeadm (en admin) :
```
kubeadm config images pull
```

***

## Configuration du noeud maitre

> ***
> Dans cette example de configuration, l'add-on réseau utilisé est Calico.
> ***

1. Choisissez une add-on réseau [ici](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network). Prenez en compte la configuration nécessaire. Pour Calico, le prerequis est d'ajouter le paramètre `--pod-network-cidr 192.168.0.0/16` lors de la commande d'initialisation.

2. Initialiser le noeud maitre de Kubeadm **(admin)** :
```
kubeadm init --pod-network-cidr=192.168.0.0/16
```

3. Configurer kubectl *(aussi retourné par `kubeadm init`)*:
```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

4. Récuperer la ligne retourné par `kubeadm init`. Garder la pour initialiser les noeuds esclave. Elle ressemble a ceci :
```
kubeadm join XX.XX.X.X:XXXX --token azert.dj64kglr89fhre \
    --discovery-token-ca-cert-hash sha256:650b0883499a31ce099c6ca8533d0h485ke8d15a1b18e1bcbdb0431337a8cd32a0915
```

5. Déployer l'add-on réseau choisi [ici](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network) et installez la.
```
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

6. Attendez que tout les pods aient été initialisés (status Running) avec la commande suivante :
```
watch kubectl get pods --all-namespaces
```
*(ctrl + c pour quitter)*

7. (facultatif) Supprimer la tainte du noeud maitre pour qu'il soit utilisé pour lancer des pods.
```
kubectl taint nodes --all node-role.kubernetes.io/master-
```

***

## Configuration du noeud esclave

1. Lancer la commande récuperer sur le noeud master lors de son initialisation.

2. Verifier la présence du nouveau noeud grâce a la commande 
```
kubectl get pods
```

***

## Rénitialisation d'un noeud

1. Réinitialisation du noeud **(admin)** :
```
kubeadm reset
```

2. Suppression du fichier de configuration (empêche d'obtenir des erreurs lors de la nouvelle configuration du noeud)
```
rm ~/.kube/config
```

***

## Astuces

> ***
> Connaitre le noeud sur lequel est edployé un pod :
> ```
> kubectl get pods --output=wide
> ```
> ***

> ***
> Ajouter le parametre `-w` pour suivre les mise à jours en direct :
> ```
> kubectl get nodes -w
> kubectl get deployments -w
> kubectl get pods -w
> ```
> ***
***

## Sources :
- [Installer Kubeadm (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Création d'un cluster de contrôle unique (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
- [Création d'un cluster de haute disponibilité (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
- [Installation des addons net (en)](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network)
- [Démarrage rapide Calico (en)](https://docs.projectcalico.org/getting-started/kubernetes/quickstart)
- [Supprimer l'espace swap (en)](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/)
- [Comment créer un cluster Kubernetes en utilisant Kubeadm sur Ubuntu 18.04 (en)](https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-ubuntu-18-04)