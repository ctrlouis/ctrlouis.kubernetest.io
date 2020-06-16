![Logo Kubeadm](/assets/images/kubeadm-small.png)

# Kubeadm

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
> 1. `swapoff -a`
> 1. Desactiver l'espace swap : `swapoff -v /swapfile` (lancez la commande en admin)
> 2. Supprimez la ligne *`/swapfile swap swap defaults 0 0`* du fichier *`/etc/fstab`*
> ***

3. Telecharger les fichiers de configuration de Kubeadm (en admin) :
```
kubeadm config images pull
```

***

## Configuration du noeud maitre
1. Lancer Kubeadm (en admin) :
```
kubeadm init
```

2. Récuperer la ligne fournit a la fin de la commande `kubeadm init`. Elle permet de connecter les noeuds esclave, et ressemble a ceci :
```
kubeadm join XX.XX.X.X:XXXX --token azert.dj64kglr89fhre \
    --discovery-token-ca-cert-hash sha256:650b0883499a31ce099c6ca8533d0h485ke8d15a1b18e1bcbdb0431337a8cd32a0915
```

1. Configurer Kubeadm pour etre utiliser sans être admin (en admin) :
```
kubeadm init
```

4. Choisissez une add-on network [ici](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network) et installez la. Exemple d'installation avec Calico
```
kubectl apply -f https://docs.projectcalico.org/v3.8/manifests/calico.yaml
```

***

## Configuration du noeud esclave

1. Lancer la commande récuperer sur le noeud master lors de son initialisation.

2. Verifier la présence du nouveau noeud grâce a la commande 
```
kubectl get pods
```

> ***
> Connaitre le noeud sur lequel est edployé un pod :
> ```
> kubectl get pods --output=wide
> ```
> ***
***

## Sources :
- [Installer Kubeadm (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Création d'un cluster de contrôle unique (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
- [Création d'un cluster de haute disponibilité (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
- [Installation des addons net (en)](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network)
- [Supprimer l'espace swap (en)](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/)