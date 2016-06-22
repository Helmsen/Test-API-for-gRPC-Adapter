# Generic gRPC adapter

* adapts a gRPC API and provides the methods as a GraphQL API
* adapts the service specified in volume/main.proto
* change configuration in docker-compose.yml or runWithoutContainer.sh
  * change location of the proto file
  * change host of the gRPC server
  * change port of the gRPC server
* use ```docker-compose up --build``` to build and run the adapter with docker
* use the bash script ```runWithoutContainer.sh``` to run the adapter without docker
