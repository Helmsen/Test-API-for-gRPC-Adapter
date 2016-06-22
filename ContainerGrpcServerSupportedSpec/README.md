# gRPC Server supported by the adapter

* implements the service specified in volume/main.proto
* change configuration in docker-compose.yml or runWithoutContainer.sh
  * change location of the proto file
  * change port to listen on
* use ```docker-compose up --build``` to build and run the server with docker
* use the bash script ```runWithoutContainer.sh``` to run the server without docker
* the provided gRPC adapter (ContainerGraphQlServer) supports all protobuf and gRPC specs which are used by this server
