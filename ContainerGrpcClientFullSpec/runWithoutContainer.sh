#!/bin/bash

export API_PROTO_PATH="./volume/main.proto"
export GRPC_SERVER_HOST="localhost"
export GRPC_SERVER_PORT=50001

node grpcClient.js

