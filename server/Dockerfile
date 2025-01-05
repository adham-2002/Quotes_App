FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN node -v && npm -v

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD ["node", "src/app.js"]
