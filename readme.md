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

Here’s an improved version of your steps for attaching Docker to the container, installing Docker Compose, and integrating Jenkins with GitHub using webhooks:

---

## **1. Attaching Docker to Jenkins Container**

In order to allow Jenkins running inside a container to use Docker on the host system, we need to attach the Docker socket. This enables Jenkins to manage Docker containers directly from within its container.

### **Steps:**
```bash
docker run -d \
  --name jenkins \
  --privileged \
  -v /var/run/docker.sock:/var/run/docker.sock \  # Mount Docker socket
  -v jenkins_home:/var/jenkins_home \  # Persist Jenkins data
  -p 8080:8080 \  # Jenkins Web UI
  -p 50000:50000 \  # Jenkins agent communication
  jenkins/jenkins:lts  # Use the Jenkins LTS image
```

Explanation:
- `--privileged` allows the Jenkins container to interact with Docker on the host.
- `-v /var/run/docker.sock:/var/run/docker.sock` ensures that Docker commands issued from inside the Jenkins container are forwarded to the host's Docker daemon.
- `-v jenkins_home:/var/jenkins_home` persists Jenkins data so it survives container restarts.

---

## **2. Installing Docker Compose Plugin Inside Jenkins Container**

Docker Compose is used to define and run multi-container Docker applications. To allow Jenkins to use Docker Compose from within the container, follow these steps:

### **Steps:**
```bash
# Install Docker Compose plugin
mkdir -p ~/.docker/cli-plugins/  # Create the directory for Docker Compose plugin
curl -SL "https://github.com/docker/compose/releases/download/v2.32.2/docker-compose-$(uname -s)-$(uname -m)" -o ~/.docker/cli-plugins/docker-compose  # Download Docker Compose
chmod +x ~/.docker/cli-plugins/docker-compose  # Make it executable
docker compose version  # Verify installation
```

Explanation:
- This installs Docker Compose as a plugin within Docker CLI in your Jenkins container, enabling Jenkins to run `docker compose` commands.

---

## **3. GitHub Webhook Integration with Jenkins**

### **Using Smee.io for Webhook Payload Delivery:**
To allow Jenkins to respond to GitHub push events, we need to expose localhost to the internet. Smee.io is a service that helps tunnel local webhook payloads to a publicly accessible URL.

### **Steps:**

1. **Setup Smee.io Webhook Tunnel:**

   - Go to [Smee.io](https://smee.io/) and click "Start a New Channel."
   - This will provide you with a URL that forwards requests to your local Jenkins instance.

2. **Run Smee Command:**

   Open a terminal and run the following command to link the Smee.io service with your local Jenkins webhook URL:

   ```bash
   smee -u https://smee.io/your-channel-id --target http://localhost:8080/github-webhook/
   ```

   Replace `your-channel-id` with the channel ID provided by Smee.io. This will forward incoming webhook requests from GitHub to Jenkins.

3. **Configure GitHub Webhook:**
   - Go to your GitHub repository.
   - Navigate to **Settings > Webhooks > Add webhook**.
   - In the **Payload URL**, enter the URL provided by Smee.io (e.g., `https://smee.io/your-channel-id`).
   - Set the content type to `application/json`.
   - Select the events you want to trigger the webhook (e.g., **Push events**).

4. **Test Webhook:**
   After configuring the webhook in GitHub, push changes to your GitHub repository. Jenkins should trigger automatically, receiving the webhook payload and starting the appropriate jobs.

---