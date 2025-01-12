## commands used => 

`docker compose up -d` :  
* start and run container in docker compose.yml 
* -d (detached mode) runs the containers in the background without attaching them to your terminal.
* `--build` this will forces build new image

`docker compose logs`: 
* to see the logs for the containers `-f` for real time

`docker compose down -v `: 
* to stop containers 
* remove volumes 
* remove network 

`docker exec -it postgres-db psql -U user -d myappdb`
* logged in as user 
* with database name myappdb

`docker stats express-app`
* show resourse usage 

`docker network inspect networking_name` 
* see information about network like container and ip for gateway for this containers

## attack docker to cotainer && isntall docker compose plugin
* **first** attach docker to container
```
docker run -d \
  --name jenkins \
  --privileged \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v jenkins_home:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lt
```
* **second** install docker compose plugin inside container
```
mkdir -p ~/.docker/cli-plugins/
curl -SL "https://github.com/docker/compose/releases/download/v2.32.2/docker-compose-$(uname -s)-$(uname -m)" -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version
docker compose up -d
```


## Intergration between jenkins and github (webhooks)

`1-` we need to use smee.io Webhook payload delivery service because our application needs to respond to webhooks, you'll need some way to expose localhost to the internet.`https://smee.io/`

`2-` after do steps in the website run thing command 

`smee -u https://smee.io/tFnDwmfOvXVmgHY --target http://localhost:8080/github-webhook/
` replace url with the userl given to you 