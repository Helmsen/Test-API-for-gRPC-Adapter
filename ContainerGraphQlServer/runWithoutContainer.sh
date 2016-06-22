#!/bin/bash
export API_HOST="localhost"
export API_PORT=50001
export API_PROTO_PATH=./volume/main.proto

node graphQlServer.js 50002
