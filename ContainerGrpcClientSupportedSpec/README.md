# gRPC client for server located in ContainerGrpcServerSupportedSpecs

* a standalone gRPC client for the service specified in volume/main.proto (corresponds to the server located in ContainerGrpcServerSupportedSpecs)
* change configuration in docker-compose.yml or runWithoutContainer.sh
  * change location of the proto file
  * change host of the gRPC server
  * change port of the gRPC server
* use ```docker-compose up --build``` to build and run the server with docker
* use the bash script ```runWithoutContainer.sh``` to run the server without docker
