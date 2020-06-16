![Logo Kubeadm](/assets/images/kubeadm-small.png)

# Kubeadm

## Installation
1. Install kubeadm, kubelet and kubectl :
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

2. Choose and install a network add-on :


## Sources :
- [Installer Kubeadm (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Création d'un cluster de contrôle unique (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
- [Création d'un cluster de haute disponibilité (en)](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
- [Installation des addons net (en)](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network)