FROM ubuntu:14.04

MAINTAINER Wilhelm Stephan, Leon Graser, Dominik Bäßler

# Install packages
# ---------------
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y software-properties-common && \
    apt-get install -y python-software-properties && \
    apt-get install -y curl && \
    apt-get clean

# Install nodejs
# --------------
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
    sudo apt-get update && \
    sudo apt-get install -y nodejs

# Folder structure
# ----------------
RUN mkdir -p /fapra
RUN mkdir -p /api

# Files
# -----
COPY node_modules /fapra/node_modules
COPY graphQlServer.js /fapra/graphQlServer.js
COPY grpcParser.js /fapra/grpcParser.js
COPY grpcPegParser.js /fapra/grpcPegParser.js
COPY genericGrpcClient.js /fapra/genericGrpcClient.js
COPY apiDescriptionGenerator.js /fapra/apiDescriptionGenerator.js
COPY main.proto /api/main.proto

# Environment variables
# ----------------------
ENV API_HOST=192.168.10.21
ENV API_PORT=50001
ENV API_PROTO_PATH=/api/main.proto

VOLUME /api
EXPOSE 50002
CMD ["node", "/fapra/graphQlServer.js", "50002"]

