# Aide-mémoire

## Kubectl

### Lister les ressources (nodes, deployments, pods, service,...):
```
kubectl get <resources>
```

### Supprimer un deploiement :
```
kubectl delete -f <deployments>
```

## Minikube

### Démarrer Minikube :
```
Minikube start
```

### Obtenir l'url d'un service :
```
Minikube service <service-name>
```

## Sources
- [Aide mémoire Kubectl (fr)](https://kubernetes.io/docs/reference/kubectl/cheatsheet/), [Aide mémoire Kubectl (en)](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)