---
title: Simple API
next: /tests/message
---

# Simple API

En prenant l'exemple d'une **micro application** renvoyant des données à propos du **pod** dans lequel elle est exectuée, nous avons pu aborder et manipuler les **primitives fondamentales** du Kubernetes. 

Requête :

```
curl http://<ip-externe>:<port>/pods
```

Réponse :

```json
{
  "node_name":"minikube",
  "pod_name":"simple-api-7fc677fb78-cjgnj",
  "pod_namespace":"default",
  "pod_ip":"172.17.0.4",
  "pod_service_account":"default"
}                                                           
```

## Objectifs

- Mettre en place un **déploiement**
- **Scaler** d'application
- **Mettre à jour** l'image de l'application
- Effectuer un **Rollback**

## Déploiement

Nous verrons ici comment créer un **déploiement** à partir d'une **image** Docker.

### Création de l'image

Dans un premier temps, il est nécessaire de **créer et publier une image** sur le [Docker Hub](https://hub.docker.com) afin de la rendre **accessible** pour Kubernetes.

1. Création de l'image

```
docker build -t <username>/simple-api:1.0 simple-api/
```

2. Upload de l'image

```
docker push <username>/simple-api:1.0
```

### Configuration

Il suffit ensuite de créer une nouveau **déploiement** en y spécifiant de nom de notre **image**.

1. Création du déploiment depuis un fichier de configuration

**`simple-api.yaml`**

````yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: simple-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: simple-api
  template:
    metadata:
      labels:
        app: simple-api
    spec:
      containers:
        - name: app
          image: nekika/kubernetest-simple-api:1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: MY_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: MY_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: MY_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: MY_POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: MY_POD_SERVICE_ACCOUNT
              valueFrom:
                fieldRef:
                  fieldPath: spec.serviceAccountName
          imagePullPolicy: Always
````

Depuis le **master node** :

```
kubectl apply -f simple-api.yaml
```

2. Verification du deploiement

```
kubectl get deployment
```

3. Verification des pods

```
kubectl get pods
```

## Scaling

Une fois le **déploiement** créé, il est très simple **d'ajouter ou supprimer des réplicas**.

1. Modification du nombre de replicas

```
kubectl scale --replicas=2 deployment/simple-api
```

2. Verification du nombre de pods

```
kubectl get pods
```

## Mise à jour de l'application

Il peut arriver que l'on ait besoin de **mettre à jour l'image** sur laquelle est basée un conteneur d'un **déploiement**.

### Mise à jour de l'image

1. Build de la nouvelle version

```
docker build -t <username>/simple-api:1.1 simple-api/
```

2. Upload de la nouvelle version

```
docker push <username>/simple-api:1.1 simple-api/
```

### Mise à jour du déploiement

1. Mise à jour de l'image dans le déploiement

```
kubectl set image deployments/simple-api app=<username>/simple-api:1.1
```

2. Validation de la  mise à jour

```
kubectl rollout status deployments/simple-api
```

## Rollback

Dans le cas où on commet une erreur de mise à jour, il est possible de **revenir en arrière**.

1. Mise à jour vers une image inexistante

```
kubectl set image deployments/simple-api app=<username>/simple-api:1.2
```

2. Rollback

```
kubectl rollout undo deployments/simple-api
```

## Sources

- [Tuto nodejs/k8](https://learnk8s.io/nodejs-kubernetes-guide)

