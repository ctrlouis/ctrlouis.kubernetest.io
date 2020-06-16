## Scale pods number
```
kubectl scale --replicas=2 deployment/simple-api
```

## Update image
1. Update image :
```
kubectl set image deployments/simple-api simple-api:1.1
```
2. Apply the update :
```
kubectl rollout status deployments/simple-api
```
Or rollback :
```
kubectl rollout undo deployments/simple-api
```