# gRPC Server supported by the adapter

* implements the service specified in volume/main.proto
* change configuration in docker-compose.yml or runWithoutContainer.sh
  * change location of the proto file
  * change port to listen on
* use ```docker-compose up --build``` to build and run the server with docker
* use the bash script ```runWithoutContainer.sh``` to run the server without docker
* the provided gRPC adapter (ContainerGraphQlServer) supports all protobuf and gRPC specs which are used by this server

## Protobuf and gRPC Features
Implemented Features:
* comments
* all primitive data types like int and string
* enums
* complex data types (messages as message parameter)
* repeated message parameters
* streamed output messages


## Features to implement:
* nested messages
* streamed input and output messages
* streamed input messages
* import and import public
* data type any
* oneof
* maps
* package declaration within messages
* options
