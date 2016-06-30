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
COPY grpcClient.js /fapra/grpcClient.js
COPY main.proto /api/main.proto

# Environment variables
# ---------------------
ENV API_PROTO_PATH=/api/main.proto
ENV GRPC_SERVER_HOST=192.168.10.21
ENV GRPC_SERVER_PORT=50001


VOLUME /api
CMD ["node", "/fapra/grpcClient.js"]


