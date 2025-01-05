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