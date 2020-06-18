# Demo

## Objectif

- **Mise en place d'un deploiement, service et volume**

***

## Etapes

#### Création de l'image docker
```
docker build -t <username>/message-api:1.0 .
```

#### Création du network
```
docker network create net
```

#### Création et lancement du container mongo
```
docker run \
  --name=mongo \
  --rm \
  --network=net mongo
```

#### Création et lancement de l'API message attaché au container mongo
```
sudo docker run --name message-api -p 8080:3000 --network=net -e MONGO_URL=mongodb://mongo:27017/dev -d ctrlouis/message-api:1.1
```

####  Deploiment sur Kubernetes
```
kubectl apply -f ./kube/persistant-volume.yaml
kubectl apply -f ./kube/mongo.yaml
kubectl apply -f ./kube/message-api.yaml
```

#### Voir la liste des services
Permets de voir les IPs et PORTS des services du Cluster
On va pouvoir récupéré ici l'adresse IP de message-api ainsi que son port pour s'y connecter.
```
kubectl get services
```

#### Crée un message dans la base Mongo via l'API
```
POST HTTP://${MINIKUBE_IP}:${MESSAGE-API_POD_PORT}/messages
{
  "username": "Testeur",<br/>
  "text": "Test nouveau message"
}
```

#### Visualiser les messages dans la base Mongo
```
GET HTTP://${MINIKUBE_IP}:${MESSAGE-API_POD_PORT}/messages
```