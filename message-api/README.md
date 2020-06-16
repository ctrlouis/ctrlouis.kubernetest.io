# Demo

## Objectif

- **Mise en place d'un deploiement, service et volume**

***

## Etapes

```
docker run \
  --name=mongo \
  --rm \
  --network=net mongo


sudo docker run --name message-api -p 8080:3000 --network=net -e MONGO_URL=mongodb://mongo:27017/dev -d ctrlouis/message-api:1.1
```