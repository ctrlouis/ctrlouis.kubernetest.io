# Kubernetes

<img title="kubernetes-logo" src="./assets/images/kubernetes.png" alt="" data-align="center">

Kubernetes (K8's) est un système **open-source** permettant **d'automatiser le déploiement, la mise à l'échelle et la gestion des applications conteneurisées**.

Il prend tout son sens dans les ecosystèmes actuels, où le **déploiement automatique** des applications dans le **cloud** est devenu la norme.

Cependant, l'outil ne s'arrête pas là puisqu'il se charge aussi d'autres aspects tels que la **mise à l'échelle automatique** (scalabilité) et permet donc **d'optimiser les performances** des applications déployées.

Kubernetes tend à se rendre indispensable puisque de nos jours nous assistons à une **augmentation considérable d'architectures microservices** dans lesquelles chaque **service** n'est ni plus ni moins qu'une **application à part entière**.

## Conteneurs

Puisqu'il s'agit d'un **orchestrateur**, Kubernetes doit être associé à un **système de conteneurs** tel que Docker.

Les **conteneurs** font donc parti intégrante de l'environnement Kubernetes, si bien qu'il est difficile de comprendre l'intêret de Kubernetes s'il on ne connaît pas ou peu Docker ou des logiciels de virtualisation similaires.

## Primitives

Kubernetes est basé sur un ensemble d'objets que l'on appelle des **primitives**.

Ces **primitives** sont empolyées pour représenter l'état que et le comportement que vous souhaitez attribuer à votre **cluster**.

Toutes les primitives sont listées et dans la [documentation officielle](https://kubernetes.io/docs/concepts/overview/working-with-objects/) mais voici une liste des **principales primitives**, permettant de démystifier le fonctionnement de Kubernetes :

### Cluster

Un **cluster** n'est ni plus ni moins qu'un **ensemble de machine** ([nodes](/kubernetes.html#nodes)) exécutant Kubernetes ainsi que les **conteneurs** qu'il orchèstre.

<img src="./assets/images/cluster.svg" title="cluster" alt="" data-align="center">

### Nodes

Au sein d'un **cluster**, on ne parle plus de machines mais de **nodes** (noeuds en anglais).

Un **node** n'est donc ni plus ni moins qu'une **machine**, souvent virtuelle, executant Kubernetes et faisant partie d'un **cluster**.

Il existe néanmoins deux types de nodes : les **master nodes** et les **worker nodes**.

Dans la **majorité des cas** et de la même manière que sur l'illustration ci-dessus, les architectures sont composée d'un **master node** et de plusieurs **worker nodes**.

Ainsi, chaque **cluster** est composé d'au moins un **master** et un **worker node** mais il est néanmoins possible de créer un **cluster** à **node unique**, ce dernier jouant le rôle de **master et de worker** (voir la [section minikube](/tools/minikube)).

#### Master node

Le **master node** est l'élément principal de l'architecture puisque c'est en son sein que toutes les actions vont êtres effecutées et que les fonctionnalités internes de Kubernetes vont fonctionner.

En effet, la communication entre le cluster et l'extérieur se fait par le biais du **master node** puisque c'est lui qui est chargé, entre autre, de **dirigier les worker nodes**, de mettre en place le **système de fichiers** de Kubernetes (voir [la documentation](https://kubernetes.io/fr/docs/concepts/overview/components/#etcd)) ou encore de **traiter les commandes** passées depuis le **CLI** de Kubernetes (voir [la documentation](https://kubernetes.io/fr/docs/reference/kubectl/overview/)).

Pour résumer, le **master node** est le **chef d'orchestre de votre cluster**.

#### Worker node

Les **worker nodes** sont les élémentes du **cluster** sur lesquels sont déployées les applications.

Ainsi, au sein d'un même **cluster** il est possible de retrouver 1 comme 50 **worker nodes**.

Ces derniers sont composés de plusieurs éléments :

- **Kubelet** : l'orchestrateur Kubernetes.
- **Un système de conteneurs** : très souvent **Docker**.
- **Watchendpoint** : permet de suivre les logs et les performances en temps réel.

::: warning Note
Au sein d'un même **worker node**, il est tout à fait possible de déployer **plusieurs applications différentes**.
:::

### Pod

Un **pod** est un ensemble d'un ou plusieurs conteneurs **colocalisés**.

L'intêret du pod est qu'il permet de déployer des conteneurs qui partagent une même **interface réseau** et un même **système de fichiers**.

C'est donc au sein d'un **pod** que les applications vont réellement tourner.

On pourrait par exemple imaginer un **pod** dans lequel tournerait une application Web composée d'un **conteneur MongoDB** et d'un **conteneur NodeJS** qui pourraient ainsi **communiquer ensemble** pour se transmettre des données.

![pods](./assets/images/pods.svg "pods")

::: warning Note
Au sein d'un cluster, il est possible de **multiplier un même pod** de sorte à obtenir **plusieurs instances de la même application**. 

Dans ce cas, on parlera de **réplicas**.
:::

### Déploiement

Un déploiement permet de décrire un **état désiré** d'un application au sein d'un **cluster**.

Pour faire simple, un déploiement permet de configurer une application et d'indiquer au **cluster** le nombre d'instances (réplicas) à créer.

### Service

Un service est une primitive qui peut jouer le rôle d'intermédiaire entre internet et un **cluster**. 

Il permet **d'exposer un déploiement** afin de rendre les applications accessible depuis n'importe où.

Cependant, un service peut également être utilisé au sein d'un cluster afin de créer un pont de communication entre pods.

## Scalabilité

Une des forces de Kubernetes est **l'automatisation de la mise à l'échelle**.

Pour la suite, admettons que nous avons déployé un cluster sur lequel tournent nos applications.

### Réplicas

Au sein d'un **worker node**, il est possible d'indiquer à Kubernetes de cloner des **pods** afin d'y rediriger le trafic et ainsi ne pas être confronté à une situation de surcharge.

Ces clones sont appelés **réplicas** et il est possible d'en ajouter et en supprimer à la vollée.

Ainsi, on peut tout à faire créer un cluster et déployer un **pod** en indiquant à Kubernetes d'en créer 1 **réplicas** si on estime que ce service ne sera pas beaucoup solicité, et à l'inverse créé un **pod** en demandant la création de 100 réplicas.

Il peut arriver qu'une **forte augmentation du trafic** soit la source d'une surcharge de vos applications. Dans ce cas il est tout à fait possible de programmer Kubernetes pour qu'il crée automatiquement des

::: danger Attention

Les **worker nodes** ne peuvent contenir qu'un nombre limité de **pods**. Il n'est donc pas possible d'y ajouter des réplicas à l'infini.

:::

### Surcharge des worker nodes

Il s'agit ici du **scénario le plus critique** pour votre **cluster** : vous faites face à une montée en charge et vos **worker nodes** sont pleins, vous ne pouvez donc pas y ajouter de nouveaux **réplicas**.

Que faire ?

Afin de permettre à votre **cluster** d'encaisser cette montée en charge, il suffit simplement de démarrer un nouveau **worker node** sur lequel vous aurez la possibilité d'ajouter des réplicas.

Lors de la redescente de la charge, Kubernetes se chargera de supprimer les répliquas puis d'arrêter le/les **worker nodes** de "secours".

De cette manière, on s'assure d'avoir une architecture **capable d'encaisser des montées en charge uniquement lorsque nécessaire**.

## Manipuler les primitives

Pour créer et configurer votre **cluster**, déployer ou exposer des **applications** et bien plus encore, Kubernetes propose un **CLI** : `kubectl`.

### CLI

Cet outil propose un **large set de commandes** permettant **d'intéragir** avec votre **cluster** :

- **Liste de tous les noeuds** de votre cluster :

```
kubectl get nodes -A
```

- **Creation d'un déploiement** :

```
kubectl create deployment nginx-deployment --image=nginx/nginx:1.14.2 --replicas=2 
```

- **Liste de touts les déploiements** de votre cluster :

```
kubectl get deployments -A
```

- **Description d'un déploiement** :

```
kubectl describe deployment nginx-deployment
```

- **Exposer un déploiement** :

```
kubectl expose deployment nginx-deployment --type=LoadBalancer --name=nginx-service
```

- **Récupérer les informations d'un service** :

```
kubectl get service nginx-service
```

- **Accéder à un service** :

```
curl http://<ip-externe-du-service>:<port>
```

- **Supprimer un service** :

```
kubectl delete service nginx-service
```

- **Supprimer un déploiement** :

```
kubectl delete deployment nginx-deployment
```

### Fichier de configuration

Au vu du très grand nombre de primitives et de fonctionnalités proposées par Kubernetes, il peut vite être difficile et laborieux de configurer un cluster à l'aide du **CLI**.

Il est donc possible de **créer** et **configurer des objets** dans des **fichiers YAML**.

#### Exemple de configuration

Voici un exemple de fichier décrivant la configuration d'un **déploiement** :

**`mon-deploiment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Rapidement, on peut comprend que l'on indique à Kubernetes que l'on souhaite créer un **déploiement** nommé `nginx-deployment`, pour lequel on souhaite créer **2 réplicas** dans lesquels tournent un **conteneur** `nginx` exposé sur le port `80`.

#### Appliquer une configuration

Une fois la configuration terminé, il n'y a plus qu'à **lancer une commande** pour **l'appliquer** et ainsi **créer l'object souhaité** :

```
kubectl apply -f ./mon-deploiement.yaml
```

Il est ainsi possible de créer **n'importe quel objet** de l'API Kubernetes à partir d'un **fichier YAML** puis de le **manipuler normalement** à l'aide du **CLI**
