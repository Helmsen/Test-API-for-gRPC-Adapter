#!/bin/bash

export API_PROTO_PATH="./main.proto"
export GRPC_SERVER_PORT=50001
node grpcServer.js
