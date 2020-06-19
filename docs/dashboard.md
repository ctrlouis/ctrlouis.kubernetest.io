# Dashboard / Tableau de bord


## Installation

### Minikube

Lancer `minikube dashboard` activera le proxy et ouvrira l'url vers le dashboard dans votre navigateur.

### Kubeadm

Plusieurs méthodes sont disponible

1. Déploiement du tableau de bord :
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended.yaml
```

> ***
> Le tableau de bord est préinstallé avec Minkube
> ***


## Utilisation

Plusieurs methode d'accés sont possible en fonction de l'installation de votre node master (local ou distante) :

- **kubectl proxy** : accés local
- **kubectl port-forward** : accés local
- **NodePort** : accés distant

### kubectl proxy

1. Démarrer le serveur proxy local :
```
kubectl proxy
```

2. Accéder au tableau de bord :
```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

> ***
> Avec minikube, la commande `minikube dashboard` démarre le serveur proxy
> et ouvre l'url du tableau de bord dans votre navigateur par défaut
> ***

### kubectl port-forward

1. Executer le port-forward :
```
kubectl port-forward -n kubernetes-dashboard service/kubernetes-dashboard 8080:443
```

2. Accéder au tableau de bord :
```
https://localhost:8080
```

### NodePort

1. Déploiement du compte de service et du role de cluster pour autoriser l'accés avec token :
```
kubectl apply -f kube/admin-account.yaml
kubectl apply -f kube/cluster-role.yaml
```

2. Editez le service `kubernetes-dashboard` en changeant `type: ClusterIP` en `type: NodePort` :
```
kubectl -n kubernetes-dashboard edit service kubernetes-dashboard
```

3. Récuperer le node port exposé :
```
kubectl -n kubernetes-dashboard get service kubernetes-dashboard
```

4. Accéder au tableau de bord :
```
https://<node-ip>:<nodePort>
```

5. Récuperer le token d'authentification :
```
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

## Sources

- [Tableau de bord (fr)](https://kubernetes.io/fr/docs/tasks/access-application-cluster/web-ui-dashboard/)
- [Tableau de bord (en)](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
- [Creation d'un utilisateur pour acces a distance (en)](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)
- [Acceder au tableau de bord (en)](https://github.com/kubernetes/dashboard/tree/master/docs/user/accessing-dashboard)