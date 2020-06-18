# Demo

## Objectif

- **Mise en place d'un deploiement**
- **Scaling d'application**
- **Mise à jour**
- **Rollback**

***

## Etapes

### Premier deploiement

1. Création de l'image docker
```
docker build -t <username>/simple-api:1.0 simple-api/
```

2. Upload de l'image docker
```
docker push <username>/simple-api:1.0 simple-api/
```

3. Deploiement de l'application
```
kubectl apply -f kube/simple-api.yaml
```

4. Verification du deploiement
```
kubectl get deployment
```

5. Verification des pods
```
kubectl get pods
```

***

### Scaling de pods

1. Scale pods
```
kubectl scale --replicas=2 deployment/simple-api
```
2. Verification du nombre de pods
```
kubectl get pods
```

***

### Mise à jour de l'application

1. Mise à jour de l'image docker
```
docker build -t <username>/simple-api:1.1 simple-api/
```

2. Upload de l'image docker mise à jour
```
docker push <username>/simple-api:1.1 simple-api/
```

3. Mise à jour de l'image dans kubernetes
```
kubectl set image deployments/simple-api app=<username>/simple-api:1.1

```

4. Validation de la  mise à jour
```
kubectl rollout status deployments/simple-api
```

***

### Rollback de mise à jour defaillante

1. Mise à jour vers une image inexistante
```
kubectl set image deployments/simple-api app=<username>/simple-api:1.2
```

2. Rollback
```
kubectl rollout undo deployments/simple-api
```


# Sources

- [Tuto nodejs/k8](https://learnk8s.io/nodejs-kubernetes-guide)
