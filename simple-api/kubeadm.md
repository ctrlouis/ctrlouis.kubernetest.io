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

2. Install required network add-on (calico) :


## Sources :
- Installing kubeadm : https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
- Creating Highly Available clusters with kubeadm :
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/
- Install network add-ons : https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network