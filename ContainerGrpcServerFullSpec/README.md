# gRPC Server

* implements the service specified in volume/main.proto
* change configuration in docker-compose.yml or runWithoutContainer.sh
  * change location of the proto file
  * change port to listen on
* use ```docker-compose up --build``` to build and run the server with docker
* use the bash script ```runWithoutContainer.sh``` to run the server without docker
* this server implements a set of protobuf and gRPC specs which at least will be supported by the adapters final version
* we try to support all protobuf and gRPC specs - so if we implement new features, we will add them here

## Protobuf and gRPC Features
Implemented Features:
* comments
* all primitive data types like int and string
* enums
* complex data types (messages as message parameter)
* repeated message parameters
* nested messages
* streamed input messages
* streamed output messages
* streamed input and output messages

## Features to implement:
* import and import public
* data type any
* oneof
* maps
* package declaration within messages
* options
